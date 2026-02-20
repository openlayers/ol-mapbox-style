/*
ol-mapbox-style - Use Mapbox/MapLibre Style objects with OpenLayers
Copyright 2016-present ol-mapbox-style contributors
License: https://raw.githubusercontent.com/openlayers/ol-mapbox-style/master/LICENSE
*/

import {
  Color,
  convertFunction,
  createPropertyExpression,
  derefLayers,
  featureFilter as createFilter,
  isExpression,
  isFunction,
  v8 as spec,
} from '@maplibre/maplibre-gl-style-spec';

import mb2css from 'mapbox-to-css-font';
import {Feature} from 'ol';
import Map from 'ol/Map.js';
import {distance} from 'ol/coordinate.js';
import {getCenter} from 'ol/extent.js';
import {toPromise} from 'ol/functions.js';
import {GeometryCollection} from 'ol/geom.js';
import RenderFeature from 'ol/render/Feature.js';
import Circle from 'ol/style/Circle.js';
import Fill from 'ol/style/Fill.js';
import Icon from 'ol/style/Icon.js';
import Stroke from 'ol/style/Stroke.js';
import Style from 'ol/style/Style.js';
import Text from 'ol/style/Text.js';
import {cameraObj, styleConfig, wrapImageExtraArgs} from './expressions.js';
import {applyLetterSpacing, wrapText} from './text.js';
import {
  clearFunctionCache,
  createCanvas,
  defaultResolutions,
  deg2rad,
  drawIconHalo,
  drawSDF,
  emptyObj,
  getFilterCache,
  getFunctionCache,
  getStyleFunctionKey,
  getZoomForResolution,
} from './util.js';

/**
 * @typedef {import("ol/layer/Vector").default} VectorLayer
 * @typedef {import("ol/layer/VectorTile").default} VectorTileLayer
 * @typedef {import("ol/style/Style").StyleFunction} StyleFunction
 * @typedef {import('./util.js').ResourceType} ResourceType
 */

/** @typedef {string|Request|Response|Promise<string|Request|Response>|Object<string, string|Request|Response|Promise<string|Request|Response>>} SpriteImageUrl */

/**
 * @typedef {Object} SpriteImage
 * @property {HTMLImageElement|HTMLCanvasElement} image Image
 * @property {Array<number>} size Size
 * @property {boolean} [unSDFed] Image has been unSDFed
 */

/** @typedef {Object<string, SpriteImage>} SpriteImages */

const types = {
  'Point': 1,
  'MultiPoint': 1,
  'LineString': 2,
  'MultiLineString': 2,
  'Polygon': 3,
  'MultiPolygon': 3,
};
const anchor = {
  'center': [0.5, 0.5],
  'left': [0, 0.5],
  'right': [1, 0.5],
  'top': [0.5, 0],
  'bottom': [0.5, 1],
  'top-left': [0, 0],
  'top-right': [1, 0],
  'bottom-left': [0, 1],
  'bottom-right': [1, 1],
};

const expressionData = function (rawExpression, propertySpec) {
  let compiledExpression = createPropertyExpression(
    rawExpression,
    propertySpec,
  );
  if (compiledExpression.result === 'error') {
    const wrappedExpression = wrapImageExtraArgs(rawExpression);
    if (wrappedExpression !== rawExpression) {
      compiledExpression = createPropertyExpression(
        wrappedExpression,
        propertySpec,
      );
    }
  }
  if (compiledExpression.result === 'error') {
    const err = compiledExpression.value[0];
    // eslint-disable-next-line no-console
    console.error(
      'Error parsing expression:',
      rawExpression,
      err.key,
      err.message,
    );
    // fallback to default value
    return {
      evaluate: () => {
        return propertySpec.default;
      },
    };
  }
  return compiledExpression.value;
};

let renderFeatureCoordinates, renderFeature;

/**
 * @private
 * @param {Object} layer Gl object layer.
 * @param {string} layoutOrPaint 'layout' or 'paint'.
 * @param {string} property Feature property.
 * @param {Object} feature Gl feature.
 * @param {Object} [functionCache] Function cache.
 * @param {Object} [featureState] Feature state.
 * @return {?} Value.
 */
export function getValue(
  layer,
  layoutOrPaint,
  property,
  feature,
  functionCache,
  featureState,
) {
  const layerId = layer.id;
  if (!functionCache) {
    functionCache = {};
    console.warn('No functionCache provided to getValue()'); // eslint-disable-line no-console
  }
  if (!functionCache[layerId]) {
    functionCache[layerId] = {};
  }
  const functions = functionCache[layerId];
  if (!functions[property]) {
    let value = (layer[layoutOrPaint] || emptyObj)[property];
    const propertySpec =
      spec[`${layoutOrPaint}_${layer.type}`] &&
      spec[`${layoutOrPaint}_${layer.type}`][property];
    if (value === undefined) {
      if (propertySpec) {
        value = propertySpec.default;
      }
    }
    let isExpr = isExpression(value);
    if (!isExpr && isFunction(value)) {
      value = convertFunction(value, propertySpec);
      isExpr = true;
    }
    if (isExpr) {
      const compiledExpression = expressionData(value, propertySpec);
      functions[property] =
        compiledExpression.evaluate.bind(compiledExpression);
    } else {
      const type = propertySpec ? propertySpec.type : typeof value;
      if (type === 'color' || type === 'colorArray') {
        value = Color.parse(value);
      }

      let hasExpr = false;
      if (type === 'array') {
        for (let i = 0; i < value.length; ++i) {
          const item = value[i];
          if (isExpression(item) || isFunction(item)) {
            hasExpr = true;
            break;
          }
        }
      }
      if (hasExpr) {
        const itemPropertySpec = Object.assign({}, propertySpec, {
          type: propertySpec.value,
        });
        const itemExpressions = [];
        for (let i = 0; i < value.length; ++i) {
          let item = value[i];
          if (!isExpression(item) && isFunction(item)) {
            item = convertFunction(item, itemPropertySpec);
          }
          if (isExpression(item)) {
            const compiledExpression = expressionData(item, itemPropertySpec);
            itemExpressions.push(
              compiledExpression.evaluate.bind(compiledExpression),
            );
          } else {
            itemExpressions.push(function () {
              return item;
            });
          }
        }
        functions[property] = function (
          globalProperties,
          feature,
          featureState,
        ) {
          const result = [];
          for (let i = 0; i < itemExpressions.length; ++i) {
            result[i] = itemExpressions[i](
              globalProperties,
              feature,
              featureState,
            );
          }
          return result;
        };
      } else {
        functions[property] = function () {
          return value;
        };
      }
    }
  }
  return functions[property](cameraObj, feature, featureState);
}

/**
 * @private
 * @param {Object} layer Gl object layer.
 * @param {Object} feature Gl feature.
 * @param {"icon"|"text"} prefix Style property prefix.
 * @param {Object} [functionCache] Function cache.
 * @return {"declutter"|"obstacle"|"none"} Value.
 */
function getDeclutterMode(layer, feature, prefix, functionCache) {
  const allowOverlap = getValue(
    layer,
    'layout',
    `${prefix}-allow-overlap`,
    feature,
    functionCache,
  );
  if (!allowOverlap) {
    return 'declutter';
  }
  const ignorePlacement = getValue(
    layer,
    'layout',
    `${prefix}-ignore-placement`,
    feature,
    functionCache,
  );
  if (!ignorePlacement) {
    return 'obstacle';
  }
  return 'none';
}

/**
 * @private
 * @param {string} layerId Layer id.
 * @param {?} filter Filter.
 * @param {Object} feature Feature.
 * @param {Object} [filterCache] Filter cache.
 * @return {boolean} Filter result.
 */
function evaluateFilter(layerId, filter, feature, filterCache) {
  if (!filterCache) {
    console.warn('No filterCache provided to evaluateFilter()'); // eslint-disable-line no-console
  }
  if (!(layerId in filterCache)) {
    try {
      filterCache[layerId] = createFilter(filter).filter;
    } catch (e) {
      console.warn('Filter will evaluate to false: ' + e.message); // eslint-disable-line no-console
      filterCache[layerId] = function () {
        return false;
      };
    }
  }
  return filterCache[layerId](cameraObj, feature);
}

let renderTransparentEnabled = false;

/**
 * Configure whether features with a transparent style should be rendered. When
 * set to `true`, it will be possible to hit detect content that is not visible,
 * like transparent fills of polygons, using `ol/layer/Layer#getFeatures()` or
 * `ol/Map#getFeaturesAtPixel()`
 * @param {boolean} enabled Rendering of transparent elements is enabled.
 * Default is `false`.
 */
export function renderTransparent(enabled) {
  if (enabled !== renderTransparentEnabled) {
    clearFunctionCache();
    renderTransparentEnabled = enabled;
  }
}

/**
 * @private
 * @param {?} color Color.
 * @param {number} [opacity] Opacity.
 * @return {string} Color.
 */
function colorWithOpacity(color, opacity) {
  if (color) {
    if (!renderTransparentEnabled && (color.a === 0 || opacity === 0)) {
      return undefined;
    }
    const a = color.a;
    opacity = opacity === undefined ? 1 : opacity;
    return a === 0
      ? 'transparent'
      : 'rgba(' +
          Math.round((color.r * 255) / a) +
          ',' +
          Math.round((color.g * 255) / a) +
          ',' +
          Math.round((color.b * 255) / a) +
          ',' +
          a * opacity +
          ')';
  }
  return color;
}

const templateRegEx = /\{[^{}}]*\}/g;

/**
 * @private
 * @param {string} text Text.
 * @param {Object} properties Properties.
 * @return {string} Text.
 */
function fromTemplate(text, properties) {
  return text.replace(templateRegEx, function (match) {
    return properties[match.slice(1, -1)] || '';
  });
}

/**
 * @private
 * @param {string} icon Icon identifier (with prefix if not 'default')
 * @param {SpriteImages} spriteImages Sprite images.
 * @return {SpriteImage} Image.
 */
export function getSpriteImageForIcon(icon, spriteImages) {
  let prefix = icon.split(':')[0];
  if (prefix === icon) {
    prefix = 'default';
  }
  return spriteImages[prefix];
}

let recordLayer = false;

/**
 * Turns recording of the Mapbox/MapLibre Style's `layer` on and off. When turned on,
 * the layer that a rendered feature belongs to will be set as the feature's
 * `mapbox-layer` property.
 * @param {boolean} record Recording of the style layer is on.
 */
export function recordStyleLayer(record = false) {
  recordLayer = record;
}

export const styleFunctionArgs = {};

/**
 * **Caution**: This is a low level API, which is only useful for advanced use cases.
 * If you want to crete a map or layer group from an entire Mapbox/MapLibre style, use
 * the `apply()` function. If you want to create a vector layer from a single
 * source of a Mapbox/MapLibre style, use the `applyStyle()` function. If you want to
 * create a vector tile layer from a single source of a Mapbox/MapLibre style, use either
 * the `applyStyle()` function or the `MapboxVectorLayer` constructor.
 *
 * Creates a style function from the `glStyle` object for all layers that use
 * the specified `source`, which needs to be a `"type": "vector"` or
 * `"type": "geojson"` source and applies it to the specified OpenLayers layer.
 *
 * Two additional properties will be set on the provided layer:
 *
 *  * `mapbox-source`: The `id` of the Mapbox/MapLibre Style document's source that the
 *    OpenLayers layer was created from. Usually `apply()` creates one
 *    OpenLayers layer per Mapbox/MapLibre Style source, unless the layer stack has
 *    layers from different sources in between.
 *  * `mapbox-layers`: The `id`s of the Mapbox/MapLibre Style document's layers that are
 *    included in the OpenLayers layer.
 *
 * This function also works in a web worker. In worker mode, the main thread needs
 * to listen to messages from the worker and respond with another message to make
 * sure that sprite image loading works:
 *
 * ```js
 *  worker.addEventListener('message', event => {
 *   if (event.data.action === 'loadImage') {
 *     const image = new Image();
 *     image.crossOrigin = 'anonymous';
 *     image.addEventListener('load', function() {
 *       createImageBitmap(image, 0, 0, image.width, image.height).then(imageBitmap => {
 *         worker.postMessage({
 *           action: 'imageLoaded',
 *           image: imageBitmap,
 *           src: event.data.src
 *         }, [imageBitmap]);
 *       });
 *     });
 *     image.src = event.data.src;
 *   }
 * });
 * ```
 *
 * @param {VectorLayer|VectorTileLayer} olLayer OpenLayers layer to
 * apply the style to. In addition to the style, the layer will get two
 * properties: `mapbox-source` will be the `id` of the `glStyle`'s source used
 * for the layer, and `mapbox-layers` will be an array of the `id`s of the
 * `glStyle`'s layers.
 * @param {string|Object} glStyle Mapbox/MapLibre Style object.
 * @param {string|Array<string>} sourceOrLayers `source` key or an array of layer `id`s
 * from the Mapbox/MapLibre Style object. When a `source` key is provided, all layers for
 * the specified source will be included in the style function. When layer `id`s
 * are provided, they must be from layers that use the same source.
 * @param {Array<number>} resolutions
 * Resolutions for mapping resolution to zoom level.
 * @param {Object} spriteData Sprite data from the url specified in
 * the Mapbox/MapLibre Style object's `sprite` property. Only required if a `sprite`
 * property is specified in the Mapbox/MapLibre Style object.
 * @param {SpriteImageUrl} spriteImageUrl Sprite image url for the sprite
 * specified in the Mapbox/MapLibre Style object's `sprite` property. Only required if a
 * `sprite` property is specified in the Mapbox/MapLibre Style object. If multiple `sprite`s
 * are defined in the style object, this has to be an object with the sprite id as key and the
 * sprite image URL as value.
 * @param {function(Array<string>, string=):Array<string>} getFonts Function that
 * receives a font stack and the url template from the GL style's `metadata['ol:webfonts']`
 * property (if set) as arguments, and returns a (modified) font stack that
 * is available. Font names are the names used in the Mapbox/MapLibre Style object. If
 * not provided, the font stack will be used as-is. This function can also be
 * used for loading web fonts.
 * @param {function(VectorLayer|VectorTileLayer, string):HTMLImageElement|HTMLCanvasElement|string|undefined} [getImage]
 * Function that returns an image or a URL for an image name. If the result is an HTMLImageElement, it must already be
 * loaded. The layer can be used to call layer.changed() when the loading and processing of the image has finished.
 * This function can be used for icons not in the sprite or to override sprite icons.
 * @return {StyleFunction} Style function for use in
 * `ol.layer.Vector` or `ol.layer.VectorTile`.
 */
export function stylefunction(
  olLayer,
  glStyle,
  sourceOrLayers,
  resolutions = defaultResolutions,
  spriteData = undefined,
  spriteImageUrl = undefined,
  getFonts = undefined,
  getImage = undefined,
) {
  if (typeof glStyle == 'string') {
    glStyle = JSON.parse(glStyle);
  }
  if (glStyle.schema) {
    for (const key in glStyle.schema) {
      const config = glStyle.schema[key];
      if ('default' in config) {
        styleConfig[key] = config.default;
      }
    }
  }
  if (glStyle.version != 8) {
    throw new Error('glStyle version 8 required.');
  }
  styleFunctionArgs[getStyleFunctionKey(glStyle, olLayer)] =
    Array.from(arguments);

  /** @type {SpriteImages} */
  const spriteImages = {};

  if (
    typeof spriteImageUrl === 'string' ||
    spriteImageUrl instanceof Request ||
    spriteImageUrl instanceof Response ||
    spriteImageUrl instanceof Promise
  ) {
    spriteImageUrl = {'default': spriteImageUrl};
  }

  for (const prefix in spriteImageUrl) {
    const imageUrl = spriteImageUrl[prefix];
    toPromise(() => imageUrl).then(async (imageUrl) => {
      let blobUrl;
      if (typeof Image !== 'undefined') {
        const img = new Image();
        if (typeof imageUrl === 'string') {
          img.crossOrigin = 'anonymous';
          img.src = imageUrl;
        } else {
          let response;
          if (imageUrl instanceof Request) {
            response = await fetch(imageUrl);
          } else if (imageUrl instanceof Response) {
            response = imageUrl;
          }
          const blob = await response.blob();
          blobUrl = URL.createObjectURL(blob);
          img.src = blobUrl;
        }
        img.addEventListener('load', function load() {
          img.removeEventListener('load', load);
          spriteImages[prefix] = {
            image: img,
            size: [img.width, img.height],
          };
          olLayer.changed();
          if (blobUrl) {
            URL.revokeObjectURL(blobUrl);
          }
        });
        img.addEventListener('error', function error() {
          URL.revokeObjectURL(blobUrl);
          img.removeEventListener('error', error);
        });
      } else if (
        typeof WorkerGlobalScope !== 'undefined' &&
        self instanceof WorkerGlobalScope // eslint-disable-line
      ) {
        const worker = /** @type {*} */ (self);
        // Main thread needs to handle 'loadImage' and dispatch 'imageLoaded'
        worker.postMessage({
          action: 'loadImage',
          src: imageUrl,
        });
        worker.addEventListener('message', function handler(event) {
          if (
            event.data.action === 'imageLoaded' &&
            event.data.src === imageUrl
          ) {
            spriteImages[prefix] = {
              image: event.data.image,
              size: [event.data.image.width, event.data.image.height],
            };
          }
        });
      }
    });
  }

  /** @type {*} */
  const allLayers = derefLayers(glStyle.layers);

  const layersBySourceLayer = {};
  const mapboxLayers = [];

  const iconImageCache = {};
  const patternCache = {};
  const functionCache = getFunctionCache(glStyle);
  const filterCache = getFilterCache(glStyle);

  let mapboxSource;
  for (let i = 0, ii = allLayers.length; i < ii; ++i) {
    const layer = allLayers[i];
    const layerId = layer.id;
    if (
      (typeof sourceOrLayers == 'string' && layer.source == sourceOrLayers) ||
      (Array.isArray(sourceOrLayers) && sourceOrLayers.indexOf(layerId) !== -1)
    ) {
      const sourceLayer = layer['source-layer'];
      if (!mapboxSource) {
        mapboxSource = layer.source;
        const source = glStyle.sources[mapboxSource];
        if (!source) {
          throw new Error(`Source "${mapboxSource}" is not defined`);
        }
        const type = source.type;
        if (type !== 'vector' && type !== 'geojson') {
          throw new Error(
            `Source "${mapboxSource}" is not of type "vector" or "geojson", but "${type}"`,
          );
        }
      } else if (layer.source !== mapboxSource) {
        throw new Error(
          `Layer "${layerId}" does not use source "${mapboxSource}`,
        );
      }
      let layers = layersBySourceLayer[sourceLayer];
      if (!layers) {
        layers = [];
        layersBySourceLayer[sourceLayer] = layers;
      }
      layers.push({
        layer: layer,
        index: i,
      });
      mapboxLayers.push(layerId);
    }
  }

  const textHalo = new Stroke();
  const textColor = new Fill();

  const styles = [];

  /**
   * @param {import("ol/Feature").default|import("ol/render/Feature").default} feature Feature.
   * @param {number} resolution Resolution.
   * @param {string} [onlyLayer] Calculate style for this layer only.
   * @return {Array<import("ol/style/Style").default>} Style.
   */
  const styleFunction = function (feature, resolution, onlyLayer) {
    const layerProperty =
      //@ts-ignore
      olLayer.getSource?.()?.format_?.layerName_ ?? 'mvt:layer';
    const properties = feature.getProperties();
    const layers = layersBySourceLayer[properties[layerProperty]];
    if (!layers) {
      return undefined;
    }
    let zoom = resolutions.indexOf(resolution);
    if (zoom == -1) {
      zoom = getZoomForResolution(resolution, resolutions);
    }
    cameraObj.zoom = zoom;
    cameraObj.distanceFromCenter = 0;
    const featureGeometry = feature.getGeometry();

    if (featureGeometry instanceof GeometryCollection) {
      const geoms = featureGeometry.getGeometries();

      for (const geom of geoms) {
        const subFeature = new Feature({
          ...properties,
          geometry: geom,
        });

        styleFunction(subFeature, resolution, onlyLayer);
      }

      return styles.length > 0 ? styles : undefined;
    }

    const type = types[featureGeometry.getType()];

    const map = olLayer.get('map');
    if (map && map instanceof Map && type === 1) {
      const size = map.getSize();
      if (size) {
        const mapCenter = map.getView().getCenter();
        const featureCenter = getCenter(featureGeometry.getExtent());
        cameraObj.distanceFromCenter =
          distance(mapCenter, featureCenter) / resolution / size[1];
      }
    }
    const f = {
      id: feature.getId(),
      properties: properties,
      type: type,
    };
    const featureState = olLayer.get('mapbox-featurestate')[feature.getId()];
    let stylesLength = -1;
    let featureBelongsToLayer;
    for (let i = 0, ii = layers.length; i < ii; ++i) {
      const layerData = layers[i];
      const layer = layerData.layer;
      const layerId = layer.id;
      if (onlyLayer !== undefined && onlyLayer !== layerId) {
        continue;
      }

      const layout = layer.layout || emptyObj;
      const paint = layer.paint || emptyObj;
      const visibility = getValue(
        layer,
        'layout',
        'visibility',
        f,
        functionCache,
        featureState,
      );
      if (
        visibility === 'none' ||
        ('minzoom' in layer && zoom < layer.minzoom) ||
        ('maxzoom' in layer && zoom >= layer.maxzoom)
      ) {
        continue;
      }
      const filter = layer.filter;
      if (!filter || evaluateFilter(layerId, filter, f, filterCache)) {
        featureBelongsToLayer = layer;
        let color, opacity, fill, stroke, strokeColor, style;
        const index = layerData.index;
        if (
          type == 3 &&
          (layer.type == 'fill' || layer.type == 'fill-extrusion')
        ) {
          opacity = getValue(
            layer,
            'paint',
            layer.type + '-opacity',
            f,
            functionCache,
            featureState,
          );
          if (layer.type + '-pattern' in paint) {
            const fillIcon = getValue(
              layer,
              'paint',
              layer.type + '-pattern',
              f,
              functionCache,
              featureState,
            );
            if (fillIcon) {
              const icon =
                typeof fillIcon === 'string'
                  ? fromTemplate(fillIcon, properties)
                  : fillIcon.toString();
              const spriteImage = getSpriteImageForIcon(icon, spriteImages);
              if (spriteData && spriteData[icon] && spriteImage) {
                ++stylesLength;
                style = styles[stylesLength];
                if (
                  !style ||
                  !style.getFill() ||
                  style.getStroke() ||
                  style.getText()
                ) {
                  style = new Style({
                    fill: new Fill(),
                  });
                  styles[stylesLength] = style;
                }
                fill = style.getFill();
                style.setZIndex(index);
                const icon_cache_key = icon + '.' + opacity;
                let pattern = patternCache[icon_cache_key];
                if (!pattern) {
                  const spriteImageData = spriteData[icon];
                  const canvas = createCanvas(
                    spriteImageData.width,
                    spriteImageData.height,
                  );
                  const ctx = /** @type {CanvasRenderingContext2D} */ (
                    canvas.getContext('2d')
                  );
                  ctx.globalAlpha = opacity;
                  ctx.drawImage(
                    spriteImage.image,
                    spriteImageData.x,
                    spriteImageData.y,
                    spriteImageData.width,
                    spriteImageData.height,
                    0,
                    0,
                    spriteImageData.width,
                    spriteImageData.height,
                  );
                  pattern = ctx.createPattern(canvas, 'repeat');
                  patternCache[icon_cache_key] = pattern;
                }
                fill.setColor(pattern);
              }
            }
          } else {
            color = colorWithOpacity(
              getValue(
                layer,
                'paint',
                layer.type + '-color',
                f,
                functionCache,
                featureState,
              ),
              opacity,
            );
            if (layer.type + '-outline-color' in paint) {
              strokeColor = colorWithOpacity(
                getValue(
                  layer,
                  'paint',
                  layer.type + '-outline-color',
                  f,
                  functionCache,
                  featureState,
                ),
                opacity,
              );
            }
            if (!strokeColor) {
              strokeColor = color;
            }
            if (color || strokeColor) {
              ++stylesLength;
              style = styles[stylesLength];
              if (
                !style ||
                (color && !style.getFill()) ||
                (!color && style.getFill()) ||
                (strokeColor && !style.getStroke()) ||
                (!strokeColor && style.getStroke()) ||
                style.getText()
              ) {
                style = new Style({
                  fill: color ? new Fill() : undefined,
                  stroke: strokeColor ? new Stroke() : undefined,
                });
                styles[stylesLength] = style;
              }
              if (color) {
                fill = style.getFill();
                fill.setColor(color);
              }
              if (layer.type === 'fill-extrusion') {
                const height = getValue(
                  layer,
                  'paint',
                  'fill-extrusion-height',
                  f,
                  functionCache,
                  featureState,
                );
                // For fill-extrusion, we darken the stroke color based on height
                // This gives a pseudo-3D effect
                if (height > 0) {
                  // Darken factor: clamps between 0.1 and 0.9 based on height
                  // Higher extrusion = darker outline
                  const darkenFactor = Math.max(
                    0.1,
                    0.9 - Math.min(height, 225) / 280,
                  );
                  if (strokeColor && strokeColor !== 'transparent') {
                    const rgba = Color.parse(strokeColor);
                    strokeColor = `rgba(${Math.round(rgba.r * 255 * darkenFactor)},${Math.round(rgba.g * 255 * darkenFactor)},${Math.round(rgba.b * 255 * darkenFactor)},${rgba.a})`;
                  }
                }
              }
              if (strokeColor) {
                stroke = style.getStroke();
                stroke.setColor(strokeColor);
                stroke.setWidth(0.5);
              }
              style.setZIndex(index);
            }
          }
        }
        if (type != 1 && layer.type == 'line') {
          if (!('line-pattern' in paint)) {
            color = colorWithOpacity(
              getValue(
                layer,
                'paint',
                'line-color',
                f,
                functionCache,
                featureState,
              ),
              getValue(
                layer,
                'paint',
                'line-opacity',
                f,
                functionCache,
                featureState,
              ),
            );
          } else {
            color = undefined;
          }
          const width = getValue(
            layer,
            'paint',
            'line-width',
            f,
            functionCache,
            featureState,
          );
          if (color && width > 0) {
            ++stylesLength;
            style = styles[stylesLength];
            if (
              !style ||
              !style.getStroke() ||
              style.getFill() ||
              style.getText()
            ) {
              style = new Style({
                stroke: new Stroke(),
              });
              styles[stylesLength] = style;
            }
            stroke = style.getStroke();
            stroke.setLineCap(
              getValue(
                layer,
                'layout',
                'line-cap',
                f,
                functionCache,
                featureState,
              ),
            );
            stroke.setLineJoin(
              getValue(
                layer,
                'layout',
                'line-join',
                f,
                functionCache,
                featureState,
              ),
            );
            stroke.setMiterLimit(
              getValue(
                layer,
                'layout',
                'line-miter-limit',
                f,
                functionCache,
                featureState,
              ),
            );
            stroke.setColor(color);
            stroke.setWidth(width);
            stroke.setLineDash(
              paint['line-dasharray']
                ? getValue(
                    layer,
                    'paint',
                    'line-dasharray',
                    f,
                    functionCache,
                    featureState,
                  ).map(function (x) {
                    return x * width;
                  })
                : null,
            );
            style.setZIndex(index);
          }
        }

        let hasImage = false;
        let text = null;
        let placementAngle = 0;
        let icon, iconImg, skipLabel;
        if ((type == 1 || type == 2) && 'icon-image' in layout) {
          const iconImage = getValue(
            layer,
            'layout',
            'icon-image',
            f,
            functionCache,
            featureState,
          );
          if (iconImage) {
            icon =
              typeof iconImage === 'string'
                ? fromTemplate(iconImage, properties)
                : iconImage.toString();
            let styleGeom = undefined;
            const imageElement = getImage ? getImage(olLayer, icon) : undefined;
            const spriteImage = getSpriteImageForIcon(icon, spriteImages);
            if (
              (spriteData && spriteData[icon] && spriteImage) ||
              imageElement
            ) {
              const iconRotationAlignment = getValue(
                layer,
                'layout',
                'icon-rotation-alignment',
                f,
                functionCache,
                featureState,
              );
              if (type == 2) {
                const geom = /** @type {*} */ (feature.getGeometry());
                // ol package and ol-debug.js only
                if (geom.getFlatMidpoint || geom.getFlatMidpoints) {
                  const extent = geom.getExtent();
                  const size = Math.sqrt(
                    Math.max(
                      Math.pow((extent[2] - extent[0]) / resolution, 2),
                      Math.pow((extent[3] - extent[1]) / resolution, 2),
                    ),
                  );
                  if (size > 150) {
                    //FIXME Do not hard-code a size of 150
                    const midpoint =
                      geom.getType() === 'MultiLineString'
                        ? geom.getFlatMidpoints()
                        : geom.getFlatMidpoint();
                    if (!renderFeature) {
                      renderFeatureCoordinates = [NaN, NaN];
                      renderFeature = new RenderFeature(
                        'Point',
                        renderFeatureCoordinates,
                        [],
                        2,
                        {},
                        undefined,
                      );
                    }
                    styleGeom = renderFeature;
                    renderFeatureCoordinates[0] = midpoint[0];
                    renderFeatureCoordinates[1] = midpoint[1];
                    const placement = getValue(
                      layer,
                      'layout',
                      'symbol-placement',
                      f,
                      functionCache,
                      featureState,
                    );
                    if (
                      placement === 'line' &&
                      iconRotationAlignment === 'map'
                    ) {
                      const stride = geom.getStride();
                      const coordinates = geom.getFlatCoordinates();
                      for (
                        let i = 0, ii = coordinates.length - stride;
                        i < ii;
                        i += stride
                      ) {
                        const x1 = coordinates[i];
                        const y1 = coordinates[i + 1];
                        const x2 = coordinates[i + stride];
                        const y2 = coordinates[i + stride + 1];
                        const minX = Math.min(x1, x2);
                        const maxX = Math.max(x1, x2);
                        const xM = midpoint[0];
                        const yM = midpoint[1];
                        const dotProduct =
                          (y2 - y1) * (xM - x1) - (x2 - x1) * (yM - y1);
                        if (
                          Math.abs(dotProduct) < 0.001 && //midpoint is aligned with the segment
                          xM <= maxX &&
                          xM >= minX //midpoint is on the segment and not outside it
                        ) {
                          placementAngle = Math.atan2(y1 - y2, x2 - x1);
                          break;
                        }
                      }
                    }
                  }
                }
              }
              if (type !== 2 || styleGeom) {
                const iconSize = getValue(
                  layer,
                  'layout',
                  'icon-size',
                  f,
                  functionCache,
                  featureState,
                );
                const iconColor =
                  paint['icon-color'] !== undefined
                    ? getValue(
                        layer,
                        'paint',
                        'icon-color',
                        f,
                        functionCache,
                        featureState,
                      )
                    : null;
                if (!iconColor || iconColor.a !== 0) {
                  const haloColor = getValue(
                    layer,
                    'paint',
                    'icon-halo-color',
                    f,
                    functionCache,
                    featureState,
                  );
                  const haloWidth = getValue(
                    layer,
                    'paint',
                    'icon-halo-width',
                    f,
                    functionCache,
                    featureState,
                  );
                  let iconCacheKey = `${icon}.${iconSize}.${haloWidth}.${haloColor}`;
                  if (iconColor !== null) {
                    iconCacheKey += `.${iconColor}`;
                  }
                  iconImg = iconImageCache[iconCacheKey];
                  if (!iconImg) {
                    const declutterMode = getDeclutterMode(
                      layer,
                      f,
                      'icon',
                      functionCache,
                    );
                    let displacement;
                    if ('icon-offset' in layout) {
                      displacement = getValue(
                        layer,
                        'layout',
                        'icon-offset',
                        f,
                        functionCache,
                        featureState,
                      ).slice(0);
                      displacement[0] *= iconSize;
                      displacement[1] *= -iconSize;
                    }
                    let color = iconColor
                      ? [
                          iconColor.r * 255,
                          iconColor.g * 255,
                          iconColor.b * 255,
                          iconColor.a,
                        ]
                      : undefined;
                    if (imageElement) {
                      const iconOptions = {
                        color: color,
                        rotateWithView: iconRotationAlignment === 'map',
                        displacement: displacement,
                        declutterMode: declutterMode,
                        scale: iconSize,
                      };
                      if (typeof imageElement === 'string') {
                        // it is a src URL
                        iconOptions.src = imageElement;
                      } else {
                        iconOptions.img = imageElement;
                        iconOptions.imgSize = [
                          imageElement.width,
                          imageElement.height,
                        ];
                      }
                      iconImg = new Icon(iconOptions);
                    } else {
                      const spriteImageData = spriteData[icon];
                      let img, size, offset;
                      if (haloWidth) {
                        if (spriteImageData.sdf) {
                          img = drawIconHalo(
                            drawSDF(
                              spriteImage.image,
                              spriteImageData,
                              iconColor || [0, 0, 0, 1],
                            ),
                            {
                              x: 0,
                              y: 0,
                              width: spriteImageData.width,
                              height: spriteImageData.height,
                              pixelRatio: spriteImageData.pixelRatio,
                            },
                            haloWidth,
                            haloColor,
                          );
                          color = undefined; // do not tint haloed icons
                        } else {
                          img = drawIconHalo(
                            spriteImage.image,
                            spriteImageData,
                            haloWidth,
                            haloColor,
                          );
                        }
                      } else {
                        if (spriteImageData.sdf) {
                          if (!spriteImage.unSDFed) {
                            const spriteImageUnSDFed = drawSDF(
                              spriteImage.image,
                              {
                                x: 0,
                                y: 0,
                                width: spriteImage.size[0],
                                height: spriteImage.size[1],
                              },
                              {r: 1, g: 1, b: 1, a: 1},
                            );
                            spriteImage.image = spriteImageUnSDFed;
                            spriteImage.unSDFed = true;
                          }
                        }
                        img = spriteImage.image;
                        size = [spriteImageData.width, spriteImageData.height];
                        offset = [spriteImageData.x, spriteImageData.y];
                      }
                      iconImg = new Icon({
                        color: color,
                        img: img,
                        // @ts-ignore
                        imgSize: spriteImage.size,
                        size: size,
                        offset: offset,
                        rotateWithView: iconRotationAlignment === 'map',
                        scale: iconSize / spriteImageData.pixelRatio,
                        displacement: displacement,
                        declutterMode: declutterMode,
                      });
                    }
                    iconImageCache[iconCacheKey] = iconImg;
                  }
                }
                if (iconImg) {
                  ++stylesLength;
                  style = styles[stylesLength];
                  if (
                    !style ||
                    !style.getImage() ||
                    style.getFill() ||
                    style.getStroke()
                  ) {
                    style = new Style();
                    styles[stylesLength] = style;
                  }
                  style.setGeometry(styleGeom);
                  iconImg.setRotation(
                    placementAngle +
                      deg2rad(
                        getValue(
                          layer,
                          'layout',
                          'icon-rotate',
                          f,
                          functionCache,
                          featureState,
                        ),
                      ),
                  );
                  iconImg.setOpacity(
                    getValue(
                      layer,
                      'paint',
                      'icon-opacity',
                      f,
                      functionCache,
                      featureState,
                    ),
                  );
                  iconImg.setAnchor(
                    anchor[
                      getValue(
                        layer,
                        'layout',
                        'icon-anchor',
                        f,
                        functionCache,
                        featureState,
                      )
                    ],
                  );
                  style.setImage(iconImg);
                  text = style.getText();
                  style.setText(undefined);
                  style.setZIndex(index);
                  hasImage = true;
                  skipLabel = false;
                }
              } else {
                skipLabel = true;
              }
            }
          }
        }

        if (type == 1 && layer.type === 'circle') {
          ++stylesLength;
          style = styles[stylesLength];
          if (
            !style ||
            !style.getImage() ||
            style.getFill() ||
            style.getStroke()
          ) {
            style = new Style();
            styles[stylesLength] = style;
          }
          const circleRadius =
            'circle-radius' in paint
              ? getValue(
                  layer,
                  'paint',
                  'circle-radius',
                  f,
                  functionCache,
                  featureState,
                )
              : 5;
          const circleStrokeColor = colorWithOpacity(
            getValue(
              layer,
              'paint',
              'circle-stroke-color',
              f,
              functionCache,
              featureState,
            ),
            getValue(
              layer,
              'paint',
              'circle-stroke-opacity',
              f,
              functionCache,
              featureState,
            ),
          );

          const circleTranslate = getValue(
            layer,
            'paint',
            'circle-translate',
            f,
            functionCache,
            featureState,
          );
          const circleColor = colorWithOpacity(
            getValue(
              layer,
              'paint',
              'circle-color',
              f,
              functionCache,
              featureState,
            ),
            getValue(
              layer,
              'paint',
              'circle-opacity',
              f,
              functionCache,
              featureState,
            ),
          );
          const circleStrokeWidth = getValue(
            layer,
            'paint',
            'circle-stroke-width',
            f,
            functionCache,
            featureState,
          );
          const cache_key =
            circleRadius +
            '.' +
            circleStrokeColor +
            '.' +
            circleColor +
            '.' +
            circleStrokeWidth +
            '.' +
            circleTranslate[0] +
            '.' +
            circleTranslate[1];

          iconImg = iconImageCache[cache_key];
          if (!iconImg) {
            iconImg = new Circle({
              radius: circleRadius,
              displacement: [circleTranslate[0], -circleTranslate[1]],
              stroke:
                circleStrokeColor && circleStrokeWidth > 0
                  ? new Stroke({
                      width: circleStrokeWidth,
                      color: circleStrokeColor,
                    })
                  : undefined,
              fill: circleColor
                ? new Fill({
                    color: circleColor,
                  })
                : undefined,
              declutterMode: 'none',
            });
            iconImageCache[cache_key] = iconImg;
          }
          style.setImage(iconImg);
          text = style.getText();
          style.setText(undefined);
          style.setGeometry(undefined);
          style.setZIndex(index);
          hasImage = true;
        }

        let label, font, textLineHeight, textSize, letterSpacing, maxTextWidth;
        if ('text-field' in layout) {
          textSize = Math.round(
            getValue(
              layer,
              'layout',
              'text-size',
              f,
              functionCache,
              featureState,
            ),
          );
          const fontArray = getValue(
            layer,
            'layout',
            'text-font',
            f,
            functionCache,
            featureState,
          );
          textLineHeight = getValue(
            layer,
            'layout',
            'text-line-height',
            f,
            functionCache,
            featureState,
          );
          font = mb2css(
            getFonts
              ? getFonts(
                  fontArray,
                  glStyle.metadata
                    ? glStyle.metadata['ol:webfonts']
                    : undefined,
                )
              : fontArray,
            textSize,
            textLineHeight,
          );
          if (!font.includes('sans-serif')) {
            font += ',sans-serif';
          }
          letterSpacing = getValue(
            layer,
            'layout',
            'text-letter-spacing',
            f,
            functionCache,
            featureState,
          );
          maxTextWidth = getValue(
            layer,
            'layout',
            'text-max-width',
            f,
            functionCache,
            featureState,
          );
          const textField = getValue(
            layer,
            'layout',
            'text-field',
            f,
            functionCache,
            featureState,
          );
          if (typeof textField === 'object' && textField.sections) {
            if (textField.sections.length === 1) {
              label = textField.toString();
            } else {
              label = textField.sections.reduce((acc, chunk, i) => {
                const fonts = chunk.fontStack
                  ? chunk.fontStack.split(',')
                  : fontArray;
                const chunkFont = mb2css(
                  getFonts ? getFonts(fonts) : fonts,
                  textSize * (chunk.scale || 1),
                  textLineHeight,
                );
                let text = chunk.text;
                if (text === '\n') {
                  acc.push('\n', '');
                  return acc;
                }
                if (type == 2) {
                  acc.push(applyLetterSpacing(text, letterSpacing), chunkFont);
                  return acc;
                }
                text = wrapText(
                  text,
                  chunkFont,
                  maxTextWidth,
                  letterSpacing,
                ).split('\n');
                for (let i = 0, ii = text.length; i < ii; ++i) {
                  if (i > 0) {
                    acc.push('\n', '');
                  }
                  acc.push(text[i], chunkFont);
                }
                return acc;
              }, []);
            }
          } else {
            label = fromTemplate(textField, properties).trim();
          }
          opacity = getValue(
            layer,
            'paint',
            'text-opacity',
            f,
            functionCache,
            featureState,
          );
        }
        if (label && opacity && !skipLabel) {
          if (!hasImage) {
            ++stylesLength;
            style = styles[stylesLength];
            if (
              !style ||
              !style.getText() ||
              style.getFill() ||
              style.getStroke()
            ) {
              style = new Style();
              styles[stylesLength] = style;
            }
            style.setImage(undefined);
            style.setGeometry(undefined);
          }
          const declutterMode = getDeclutterMode(
            layer,
            f,
            'text',
            functionCache,
          );
          if (!style.getText()) {
            style.setText(text);
          }
          text = style.getText();
          if (
            !text ||
            ('getDeclutterMode' in text &&
              text.getDeclutterMode() !== declutterMode)
          ) {
            text = new Text({
              padding: [2, 2, 2, 2],
              // @ts-ignore
              declutterMode: declutterMode,
            });
            style.setText(text);
          }
          const textTransform = getValue(
            layer,
            'layout',
            'text-transform',
            f,
            functionCache,
            featureState,
          );
          if (textTransform == 'uppercase') {
            label = Array.isArray(label)
              ? label.map((t, i) => (i % 2 ? t : t.toUpperCase()))
              : label.toUpperCase();
          } else if (textTransform == 'lowercase') {
            label = Array.isArray(label)
              ? label.map((t, i) => (i % 2 ? t : t.toLowerCase()))
              : label.toLowerCase();
          }
          const wrappedLabel = Array.isArray(label)
            ? label
            : type == 2
              ? applyLetterSpacing(label, letterSpacing)
              : wrapText(label, font, maxTextWidth, letterSpacing);
          text.setText(wrappedLabel);
          text.setFont(font);
          text.setRotation(
            deg2rad(
              getValue(
                layer,
                'layout',
                'text-rotate',
                f,
                functionCache,
                featureState,
              ),
            ),
          );
          if (typeof text.setKeepUpright === 'function') {
            const keepUpright = getValue(
              layer,
              'layout',
              'text-keep-upright',
              f,
              functionCache,
              featureState,
            );
            text.setKeepUpright(keepUpright);
          }
          const textAnchor = getValue(
            layer,
            'layout',
            'text-anchor',
            f,
            functionCache,
            featureState,
          );
          const placement =
            hasImage || type == 1
              ? 'point'
              : getValue(
                  layer,
                  'layout',
                  'symbol-placement',
                  f,
                  functionCache,
                  featureState,
                );
          let textAlign;
          if (placement === 'line-center') {
            text.setPlacement('line');
            textAlign = 'center';
          } else {
            text.setPlacement(placement);
          }
          if (placement === 'line' && typeof text.setRepeat === 'function') {
            const symbolSpacing = getValue(
              layer,
              'layout',
              'symbol-spacing',
              f,
              functionCache,
              featureState,
            );
            text.setRepeat(symbolSpacing * 2);
          }
          text.setOverflow(placement === 'point');
          let textHaloWidth = getValue(
            layer,
            'paint',
            'text-halo-width',
            f,
            functionCache,
            featureState,
          );
          const textOffset = getValue(
            layer,
            'layout',
            'text-offset',
            f,
            functionCache,
            featureState,
          );
          const textTranslate = getValue(
            layer,
            'paint',
            'text-translate',
            f,
            functionCache,
            featureState,
          );
          // Text offset has to take halo width and line height into account
          let vOffset = 0;
          let hOffset = 0;
          if (placement == 'point') {
            textAlign = 'center';
            if (textAnchor.indexOf('left') !== -1) {
              textAlign = 'left';
              hOffset = textHaloWidth;
            } else if (textAnchor.indexOf('right') !== -1) {
              textAlign = 'right';
              hOffset = -textHaloWidth;
            }
            const textRotationAlignment = getValue(
              layer,
              'layout',
              'text-rotation-alignment',
              f,
              functionCache,
              featureState,
            );
            text.setRotateWithView(textRotationAlignment == 'map');
          } else {
            text.setMaxAngle(
              (deg2rad(
                getValue(
                  layer,
                  'layout',
                  'text-max-angle',
                  f,
                  functionCache,
                  featureState,
                ),
              ) *
                label.length) /
                wrappedLabel.length,
            );
            text.setRotateWithView(false);
          }
          text.setTextAlign(textAlign);
          let textBaseline = 'middle';
          if (textAnchor.indexOf('bottom') == 0) {
            textBaseline = 'bottom';
            vOffset = -textHaloWidth - 0.5 * (textLineHeight - 1) * textSize;
          } else if (textAnchor.indexOf('top') == 0) {
            textBaseline = 'top';
            vOffset = textHaloWidth + 0.5 * (textLineHeight - 1) * textSize;
          }
          text.setTextBaseline(textBaseline);
          const textJustify = getValue(
            layer,
            'layout',
            'text-justify',
            f,
            functionCache,
            featureState,
          );
          text.setJustify(textJustify === 'auto' ? undefined : textJustify);
          text.setOffsetX(
            textOffset[0] * textSize + hOffset + textTranslate[0],
          );
          text.setOffsetY(
            textOffset[1] * textSize + vOffset + textTranslate[1],
          );
          textColor.setColor(
            colorWithOpacity(
              getValue(
                layer,
                'paint',
                'text-color',
                f,
                functionCache,
                featureState,
              ),
              opacity,
            ),
          );
          text.setFill(textColor);
          const haloColor = colorWithOpacity(
            getValue(
              layer,
              'paint',
              'text-halo-color',
              f,
              functionCache,
              featureState,
            ),
            opacity,
          );
          if (haloColor && textHaloWidth > 0) {
            textHalo.setColor(haloColor);
            // spec here : https://docs.mapbox.com/mapbox-gl-js/style-spec/#paint-symbol-text-halo-width
            // Halo width must be doubled because it is applied around the center of the text outline
            textHaloWidth *= 2;
            // 1/4 of text size (spec) x 2
            const halfTextSize = 0.5 * textSize;
            textHalo.setWidth(
              textHaloWidth <= halfTextSize ? textHaloWidth : halfTextSize,
            );
            text.setStroke(textHalo);
          } else {
            text.setStroke(undefined);
          }
          const textPadding = getValue(
            layer,
            'layout',
            'text-padding',
            f,
            functionCache,
            featureState,
          );
          const padding = text.getPadding();
          if (textPadding !== padding[0]) {
            padding[0] = textPadding;
            padding[1] = textPadding;
            padding[2] = textPadding;
            padding[3] = textPadding;
          }
          style.setZIndex(index);
        }
      }
    }

    if (stylesLength > -1) {
      styles.length = stylesLength + 1;
      if (recordLayer) {
        if ('set' in feature) {
          // ol/Feature
          feature.set('mapbox-layer', featureBelongsToLayer);
        } else {
          // ol/render/Feature
          feature.getProperties()['mapbox-layer'] = featureBelongsToLayer;
        }
      }
      return styles;
    }
    return undefined;
  };

  olLayer.setStyle(styleFunction);
  olLayer.set('mapbox-layers', mapboxLayers);
  olLayer.set('mapbox-source', mapboxSource);
  olLayer.set('mapbox-featurestate', olLayer.get('mapbox-featurestate') || {});
  return styleFunction;
}

/**
 * Get the the style for a specific Mapbox layer only. This can be useful for creating a legend.
 * @param {import("ol/Feature").default|import("ol/render/Feature").default} feature OpenLayers feature.
 * @param {number} resolution View resolution.
 * @param {import("ol/layer").Vector|import("ol/layer").VectorTile} olLayer OpenLayers layer.
 * @param {string} layerId Id of the Mapbox layer to get the style for
 * @return {Array<import("ol/style").Style>} Styles for the provided Mapbox layer.
 */
export function getStyleForLayer(feature, resolution, olLayer, layerId) {
  const evaluateStyle = olLayer.getStyleFunction();
  if (evaluateStyle.length === 3) {
    // @ts-ignore
    return evaluateStyle(feature, resolution, layerId);
  }
  return undefined;
}

export {
  colorWithOpacity as _colorWithOpacity,
  evaluateFilter as _evaluateFilter,
  fromTemplate as _fromTemplate,
  getValue as _getValue,
};
