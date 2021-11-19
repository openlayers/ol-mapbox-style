/*
ol-mapbox-style - Use Mapbox Style objects with OpenLayers
Copyright 2016-present ol-mapbox-style contributors
License: https://raw.githubusercontent.com/openlayers/ol-mapbox-style/master/LICENSE
*/

import Circle from 'ol/style/Circle.js';
import Fill from 'ol/style/Fill.js';
import Icon from 'ol/style/Icon.js';
import RenderFeature from 'ol/render/Feature.js';
import Stroke from 'ol/style/Stroke.js';
import Style from 'ol/style/Style.js';
import Text from 'ol/style/Text.js';
import {getUid} from 'ol/util.js';

import mb2css from 'mapbox-to-css-font';
import {
  Color,
  featureFilter as createFilter,
  derefLayers,
  expression,
  function as fn,
  latest as spec,
} from '@mapbox/mapbox-gl-style-spec';
import {
  applyLetterSpacing,
  createCanvas,
  defaultResolutions,
  deg2rad,
  getZoomForResolution,
  wrapText,
} from './util.js';

/**
 * @typedef {import("ol/layer/Vector").default} VectorLayer
 * @typedef {import("ol/layer/VectorTile").default} VectorTileLayer
 * @typedef {import("ol/style/Style").StyleFunction} StyleFunction
 */

const isFunction = fn.isFunction;
const convertFunction = fn.convertFunction;
const isExpression = expression.isExpression;
const createPropertyExpression = expression.createPropertyExpression;

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
  const compiledExpression = createPropertyExpression(
    rawExpression,
    propertySpec
  );
  if (compiledExpression.result === 'error') {
    throw new Error(
      compiledExpression.value
        .map((err) => `${err.key}: ${err.message}`)
        .join(', ')
    );
  }
  return compiledExpression.value;
};

const emptyObj = {};
const zoomObj = {zoom: 0};
/** @private */
const functionCache = {};
let renderFeatureCoordinates, renderFeature;

/**
 * @private
 * @param {Object} layer Gl object layer.
 * @param {string} layoutOrPaint 'layout' or 'paint'.
 * @param {string} property Feature property.
 * @param {number} zoom Zoom.
 * @param {Object} feature Gl feature.
 * @param {string} [opt_uid] OpenLayers layer uid.
 * @return {?} Value.
 */
export function getValue(
  layer,
  layoutOrPaint,
  property,
  zoom,
  feature,
  opt_uid
) {
  let uid = opt_uid;
  if (!uid) {
    uid = '0';
    delete functionCache[uid];
  }
  if (!functionCache[uid]) {
    functionCache[uid] = {};
  }
  const layerId = layer.id;
  if (!functionCache[uid][layerId]) {
    functionCache[uid][layerId] = {};
  }
  const functions = functionCache[uid][layerId];
  if (!functions[property]) {
    let value = (layer[layoutOrPaint] || emptyObj)[property];
    const propertySpec = spec[`${layoutOrPaint}_${layer.type}`][property];
    if (value === undefined) {
      value = propertySpec.default;
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
      if (propertySpec.type == 'color') {
        value = Color.parse(value);
      }
      functions[property] = function () {
        return value;
      };
    }
  }
  zoomObj.zoom = zoom;
  return functions[property](zoomObj, feature);
}

/** @private */
const filterCache = {};

/**
 * @private
 * @param {string} uid OpenLayers layer uid.
 * @param {string} layerId Layer id.
 * @param {?} filter Filter.
 * @param {Object} feature Feature.
 * @param {number} zoom Zoom.
 * @return {boolean} Filter result.
 */
function evaluateFilter(uid, layerId, filter, feature, zoom) {
  if (!filterCache[uid]) {
    filterCache[uid] = {};
  }
  const filters = filterCache[uid];
  if (!(layerId in filters)) {
    filters[layerId] = createFilter(filter).filter;
  }
  zoomObj.zoom = zoom;
  return filters[layerId](zoomObj, feature);
}

/**
 * @private
 * @param {?} color Color.
 * @param {number} opacity Opacity.
 * @return {string} Color.
 */
function colorWithOpacity(color, opacity) {
  if (color) {
    if (color.a === 0 || opacity === 0) {
      return undefined;
    }
    const a = color.a;
    opacity = opacity === undefined ? 1 : opacity;
    return (
      'rgba(' +
      Math.round((color.r * 255) / a) +
      ',' +
      Math.round((color.g * 255) / a) +
      ',' +
      Math.round((color.b * 255) / a) +
      ',' +
      a * opacity +
      ')'
    );
  }
  return color;
}

const templateRegEx = /^([^]*)\{(.*)\}([^]*)$/;

/**
 * @private
 * @param {string} text Text.
 * @param {Object} properties Properties.
 * @return {string} Text.
 */
function fromTemplate(text, properties) {
  let parts;
  do {
    parts = text.match(templateRegEx);
    if (parts) {
      const value = properties[parts[2]] || '';
      text = parts[1] + value + parts[3];
    }
  } while (parts);
  return text;
}

let recordLayer = false;

/**
 * ```js
 * import {recordStyleLayer} from 'ol-mapbox-style/dist/stylefunction';
 * ```
 * Turns recording of the Mapbox Style's `layer` on and off. When turned on,
 * the layer that a rendered feature belongs to will be set as the feature's
 * `mapbox-layer` property.
 * @param {boolean} [record=false] Recording of the style layer is on.
 */
export function recordStyleLayer(record) {
  recordLayer = record;
}

/**
 * ```js
 * import stylefunction from 'ol-mapbox-style/dist/stylefunction';
 * ```
 * Creates a style function from the `glStyle` object for all layers that use
 * the specified `source`, which needs to be a `"type": "vector"` or
 * `"type": "geojson"` source and applies it to the specified OpenLayers layer.
 *
 * Two additional properties will be set on the provided layer:
 *
 *  * `mapbox-source`: The `id` of the Mapbox Style document's source that the
 *    OpenLayers layer was created from. Usually `apply()` creates one
 *    OpenLayers layer per Mapbox Style source, unless the layer stack has
 *    layers from different sources in between.
 *  * `mapbox-layers`: The `id`s of the Mapbox Style document's layers that are
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
 * @param {string|Object} glStyle Mapbox Style object.
 * @param {string|Array<string>} source `source` key or an array of layer `id`s
 * from the Mapbox Style object. When a `source` key is provided, all layers for
 * the specified source will be included in the style function. When layer `id`s
 * are provided, they must be from layers that use the same source.
 * @param {Array<number>} [resolutions=[78271.51696402048, 39135.75848201024, 19567.87924100512, 9783.93962050256, 4891.96981025128, 2445.98490512564, 1222.99245256282, 611.49622628141, 305.748113140705, 152.8740565703525, 76.43702828517625, 38.21851414258813, 19.109257071294063, 9.554628535647032, 4.777314267823516, 2.388657133911758, 1.194328566955879, 0.5971642834779395, 0.29858214173896974, 0.14929107086948487, 0.07464553543474244]]
 * Resolutions for mapping resolution to zoom level.
 * @param {Object} [spriteData=undefined] Sprite data from the url specified in
 * the Mapbox Style object's `sprite` property. Only required if a `sprite`
 * property is specified in the Mapbox Style object.
 * @param {string} [spriteImageUrl=undefined] Sprite image url for the sprite
 * specified in the Mapbox Style object's `sprite` property. Only required if a
 * `sprite` property is specified in the Mapbox Style object.
 * @param {function(Array<string>):Array<string>} [getFonts=undefined] Function that
 * receives a font stack as arguments, and returns a (modified) font stack that
 * is available. Font names are the names used in the Mapbox Style object. If
 * not provided, the font stack will be used as-is. This function can also be
 * used for loading web fonts.
 * @return {StyleFunction} Style function for use in
 * `ol.layer.Vector` or `ol.layer.VectorTile`.
 */
export default function (
  olLayer,
  glStyle,
  source,
  resolutions = defaultResolutions,
  spriteData,
  spriteImageUrl,
  getFonts
) {
  if (typeof glStyle == 'string') {
    glStyle = JSON.parse(glStyle);
  }
  if (glStyle.version != 8) {
    throw new Error('glStyle version 8 required.');
  }

  let spriteImage, spriteImgSize;
  if (spriteImageUrl) {
    if (typeof Image !== 'undefined') {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = function () {
        spriteImage = img;
        spriteImgSize = [img.width, img.height];
        olLayer.changed();
        img.onload = null;
      };
      img.src = spriteImageUrl;
    } else if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) { //eslint-disable-line
      const worker = /** @type {*} */ (self);
      // Main thread needs to handle 'loadImage' and dispatch 'imageLoaded'
      worker.postMessage({
        action: 'loadImage',
        src: spriteImageUrl,
      });
      worker.addEventListener('message', function handler(event) {
        if (
          event.data.action === 'imageLoaded' &&
          event.data.src === spriteImageUrl
        ) {
          spriteImage = event.data.image;
          spriteImgSize = [spriteImage.width, spriteImage.height];
        }
      });
    }
  }

  const allLayers = derefLayers(glStyle.layers);

  const layersBySourceLayer = {};
  const mapboxLayers = [];
  let mapboxSource;
  for (let i = 0, ii = allLayers.length; i < ii; ++i) {
    const layer = allLayers[i];
    const layerId = layer.id;
    if (
      (typeof source == 'string' && layer.source == source) ||
      source.indexOf(layerId) !== -1
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
            `Source "${mapboxSource}" is not of type "vector" or "geojson", but "${type}"`
          );
        }
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

  const iconImageCache = {};
  const patternCache = {};
  const styles = [];

  const layerUid = getUid(olLayer);
  delete functionCache[layerUid];
  delete filterCache[layerUid];

  const styleFunction = function (feature, resolution) {
    const properties = feature.getProperties();
    const layers = layersBySourceLayer[properties.layer];
    if (!layers) {
      return;
    }
    let zoom = resolutions.indexOf(resolution);
    if (zoom == -1) {
      zoom = getZoomForResolution(resolution, resolutions);
    }
    const type = types[feature.getGeometry().getType()];
    const f = {
      properties: properties,
      type: type,
    };
    let stylesLength = -1;
    let featureBelongsToLayer;
    for (let i = 0, ii = layers.length; i < ii; ++i) {
      const layerData = layers[i];
      const layer = layerData.layer;
      const getLayerValue = function (layoutOrPaint, property) {
        return getValue(layer, layoutOrPaint, property, zoom, f, layerUid);
      };

      const layout = layer.layout || emptyObj;
      const paint = layer.paint || emptyObj;
      if (
        layout.visibility === 'none' ||
        ('minzoom' in layer && zoom < layer.minzoom) ||
        ('maxzoom' in layer && zoom >= layer.maxzoom)
      ) {
        continue;
      }
      const filter = layer.filter;
      if (!filter || evaluateFilter(layerUid, layer.id, filter, f, zoom)) {
        featureBelongsToLayer = layer;
        let color, opacity, fill, stroke, strokeColor, style;
        const index = layerData.index;
        if (
          type == 3 &&
          (layer.type == 'fill' || layer.type == 'fill-extrusion')
        ) {
          opacity = getLayerValue('paint', layer.type + '-opacity');
          if (layer.type + '-pattern' in paint) {
            const fillIcon = getLayerValue('paint', layer.type + '-pattern');
            if (fillIcon) {
              const icon =
                typeof fillIcon === 'string'
                  ? fromTemplate(fillIcon, properties)
                  : fillIcon.toString();
              if (spriteImage && spriteData && spriteData[icon]) {
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
                    spriteImageData.height
                  );
                  const ctx = /** @type {CanvasRenderingContext2D} */ (
                    canvas.getContext('2d')
                  );
                  ctx.globalAlpha = opacity;
                  ctx.drawImage(
                    spriteImage,
                    spriteImageData.x,
                    spriteImageData.y,
                    spriteImageData.width,
                    spriteImageData.height,
                    0,
                    0,
                    spriteImageData.width,
                    spriteImageData.height
                  );
                  pattern = ctx.createPattern(canvas, 'repeat');
                  patternCache[icon_cache_key] = pattern;
                }
                fill.setColor(pattern);
              }
            }
          } else {
            color = colorWithOpacity(
              getLayerValue('paint', layer.type + '-color'),
              opacity
            );
            if (color) {
              if (layer.type + '-outline-color' in paint) {
                strokeColor = colorWithOpacity(
                  getLayerValue('paint', layer.type + '-outline-color'),
                  opacity
                );
              }
              if (!strokeColor) {
                strokeColor = color;
              }
              ++stylesLength;
              style = styles[stylesLength];
              if (
                !style ||
                !(style.getFill() && style.getStroke()) ||
                style.getText()
              ) {
                style = new Style({
                  fill: new Fill(),
                  stroke: new Stroke(),
                });
                styles[stylesLength] = style;
              }
              fill = style.getFill();
              fill.setColor(color);
              stroke = style.getStroke();
              stroke.setColor(strokeColor);
              stroke.setWidth(1);
              style.setZIndex(index);
            }
          }
        }
        if (type != 1 && layer.type == 'line') {
          color =
            !('line-pattern' in paint) && 'line-color' in paint
              ? colorWithOpacity(
                  getLayerValue('paint', 'line-color'),
                  getLayerValue('paint', 'line-opacity')
                )
              : undefined;
          const width = getLayerValue('paint', 'line-width');
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
            stroke.setLineCap(getLayerValue('layout', 'line-cap'));
            stroke.setLineJoin(getLayerValue('layout', 'line-join'));
            stroke.setMiterLimit(getLayerValue('layout', 'line-miter-limit'));
            stroke.setColor(color);
            stroke.setWidth(width);
            stroke.setLineDash(
              paint['line-dasharray']
                ? getLayerValue('paint', 'line-dasharray').map(function (x) {
                    return x * width;
                  })
                : null
            );
            style.setZIndex(index);
          }
        }

        let hasImage = false;
        let text = null;
        let placementAngle = 0;
        let icon, iconImg, skipLabel;
        if ((type == 1 || type == 2) && 'icon-image' in layout) {
          const iconImage = getLayerValue('layout', 'icon-image');
          if (iconImage) {
            icon =
              typeof iconImage === 'string'
                ? fromTemplate(iconImage, properties)
                : iconImage.toString();
            let styleGeom = undefined;
            if (spriteImage && spriteData && spriteData[icon]) {
              const iconRotationAlignment = getLayerValue(
                'layout',
                'icon-rotation-alignment'
              );
              if (type == 2) {
                const geom = feature.getGeometry();
                // ol package and ol-debug.js only
                if (geom.getFlatMidpoint || geom.getFlatMidpoints) {
                  const extent = geom.getExtent();
                  const size = Math.sqrt(
                    Math.max(
                      Math.pow((extent[2] - extent[0]) / resolution, 2),
                      Math.pow((extent[3] - extent[1]) / resolution, 2)
                    )
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
                        {},
                        null
                      );
                    }
                    styleGeom = renderFeature;
                    renderFeatureCoordinates[0] = midpoint[0];
                    renderFeatureCoordinates[1] = midpoint[1];
                    const placement = getLayerValue(
                      'layout',
                      'symbol-placement'
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
                        const minY = Math.min(y1, y2);
                        const maxX = Math.max(x1, x2);
                        const maxY = Math.max(y1, y2);
                        if (
                          midpoint[0] >= minX &&
                          midpoint[0] <= maxX &&
                          midpoint[1] >= minY &&
                          midpoint[1] <= maxY
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
                const iconSize = getLayerValue('layout', 'icon-size');
                const iconColor =
                  paint['icon-color'] !== undefined
                    ? getLayerValue('paint', 'icon-color')
                    : null;
                if (!iconColor || iconColor.a !== 0) {
                  let icon_cache_key = icon + '.' + iconSize;
                  if (iconColor !== null) {
                    icon_cache_key += '.' + iconColor;
                  }
                  iconImg = iconImageCache[icon_cache_key];
                  if (!iconImg) {
                    const spriteImageData = spriteData[icon];

                    iconImg = new Icon({
                      color: iconColor
                        ? [
                            iconColor.r * 255,
                            iconColor.g * 255,
                            iconColor.b * 255,
                            iconColor.a,
                          ]
                        : undefined,
                      img: spriteImage,
                      imgSize: spriteImgSize,
                      size: [spriteImageData.width, spriteImageData.height],
                      offset: [spriteImageData.x, spriteImageData.y],
                      rotateWithView: iconRotationAlignment === 'map',
                      scale: iconSize / spriteImageData.pixelRatio,
                    });
                    iconImageCache[icon_cache_key] = iconImg;
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
                      deg2rad(getLayerValue('layout', 'icon-rotate'))
                  );
                  iconImg.setOpacity(getLayerValue('paint', 'icon-opacity'));
                  iconImg.setAnchor(
                    anchor[getLayerValue('layout', 'icon-anchor')]
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

        if (type == 1 && 'circle-radius' in paint) {
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
          const circleRadius = getLayerValue('paint', 'circle-radius');
          const circleStrokeColor = colorWithOpacity(
            getLayerValue('paint', 'circle-stroke-color'),
            getLayerValue('paint', 'circle-stroke-opacity')
          );
          const circleColor = colorWithOpacity(
            getLayerValue('paint', 'circle-color'),
            getLayerValue('paint', 'circle-opacity')
          );
          const circleStrokeWidth = getLayerValue(
            'paint',
            'circle-stroke-width'
          );
          const cache_key =
            circleRadius +
            '.' +
            circleStrokeColor +
            '.' +
            circleColor +
            '.' +
            circleStrokeWidth;
          iconImg = iconImageCache[cache_key];
          if (!iconImg) {
            iconImg = new Circle({
              radius: circleRadius,
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

        let label;
        if ('text-field' in layout) {
          const textField = getLayerValue('layout', 'text-field').toString();
          label = fromTemplate(textField, properties).trim();
          opacity = getLayerValue('paint', 'text-opacity');
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
          if (!style.getText()) {
            style.setText(
              text ||
                new Text({
                  padding: [2, 2, 2, 2],
                })
            );
          }
          text = style.getText();
          const textSize = Math.round(getLayerValue('layout', 'text-size'));
          const fontArray = getLayerValue('layout', 'text-font');
          const textLineHeight = getLayerValue('layout', 'text-line-height');
          const font = mb2css(
            getFonts ? getFonts(fontArray) : fontArray,
            textSize,
            textLineHeight
          );
          const textTransform = layout['text-transform'];
          if (textTransform == 'uppercase') {
            label = label.toUpperCase();
          } else if (textTransform == 'lowercase') {
            label = label.toLowerCase();
          }
          const maxTextWidth = getLayerValue('layout', 'text-max-width');
          const letterSpacing = getLayerValue('layout', 'text-letter-spacing');
          const wrappedLabel =
            type == 2
              ? applyLetterSpacing(label, letterSpacing)
              : wrapText(label, font, maxTextWidth, letterSpacing);
          text.setText(wrappedLabel);
          text.setFont(font);
          text.setRotation(deg2rad(getLayerValue('layout', 'text-rotate')));
          const textAnchor = getLayerValue('layout', 'text-anchor');
          const placement =
            hasImage || type == 1
              ? 'point'
              : getLayerValue('layout', 'symbol-placement');
          text.setPlacement(placement);
          let textHaloWidth = getLayerValue('paint', 'text-halo-width');
          const textOffset = getLayerValue('layout', 'text-offset');
          const textTranslate = getLayerValue('paint', 'text-translate');
          // Text offset has to take halo width and line height into account
          let vOffset = 0;
          let hOffset = 0;
          if (placement == 'point') {
            let textAlign = 'center';
            if (textAnchor.indexOf('left') !== -1) {
              textAlign = 'left';
              hOffset = textHaloWidth;
            } else if (textAnchor.indexOf('right') !== -1) {
              textAlign = 'right';
              hOffset = -textHaloWidth;
            }
            text.setTextAlign(textAlign);
            const textRotationAlignment = getLayerValue(
              'layout',
              'text-rotation-alignment'
            );
            text.setRotateWithView(textRotationAlignment == 'map');
          } else {
            text.setMaxAngle(
              (deg2rad(getLayerValue('layout', 'text-max-angle')) *
                label.length) /
                wrappedLabel.length
            );
            text.setTextAlign();
            text.setRotateWithView(false);
          }
          let textBaseline = 'middle';
          if (textAnchor.indexOf('bottom') == 0) {
            textBaseline = 'bottom';
            vOffset = -textHaloWidth - 0.5 * (textLineHeight - 1) * textSize;
          } else if (textAnchor.indexOf('top') == 0) {
            textBaseline = 'top';
            vOffset = textHaloWidth + 0.5 * (textLineHeight - 1) * textSize;
          }
          text.setTextBaseline(textBaseline);
          text.setOffsetX(
            textOffset[0] * textSize + hOffset + textTranslate[0]
          );
          text.setOffsetY(
            textOffset[1] * textSize + vOffset + textTranslate[1]
          );
          textColor.setColor(
            colorWithOpacity(getLayerValue('paint', 'text-color'), opacity)
          );
          text.setFill(textColor);
          const haloColor = colorWithOpacity(
            getLayerValue('paint', 'text-halo-color'),
            opacity
          );
          if (haloColor) {
            textHalo.setColor(haloColor);
            // spec here : https://docs.mapbox.com/mapbox-gl-js/style-spec/#paint-symbol-text-halo-width
            // Halo width must be doubled because it is applied around the center of the text outline
            textHaloWidth *= 2;
            // 1/4 of text size (spec) x 2
            const halfTextSize = 0.5 * textSize;
            textHalo.setWidth(
              textHaloWidth <= halfTextSize ? textHaloWidth : halfTextSize
            );
            text.setStroke(textHalo);
          } else {
            text.setStroke(undefined);
          }
          const textPadding = getLayerValue('layout', 'text-padding');
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
        if (typeof feature.set === 'function') {
          // ol/Feature
          feature.set('mapbox-layer', featureBelongsToLayer);
        } else {
          // ol/render/Feature
          feature.getProperties()['mapbox-layer'] = featureBelongsToLayer;
        }
      }
      return styles;
    }
  };

  olLayer.setStyle(styleFunction);
  olLayer.set('mapbox-source', mapboxSource);
  olLayer.set('mapbox-layers', mapboxLayers);
  return styleFunction;
}

export {
  colorWithOpacity as _colorWithOpacity,
  filterCache as _filterCache,
  evaluateFilter as _evaluateFilter,
  fromTemplate as _fromTemplate,
  getValue as _getValue,
  functionCache as _functionCache,
};
