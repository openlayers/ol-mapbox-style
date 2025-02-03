/*
ol-mapbox-style - Use Mapbox/MapLibre Style objects with OpenLayers
Copyright 2016-present ol-mapbox-style contributors
License: https://raw.githubusercontent.com/openlayers/ol-mapbox-style/master/LICENSE
*/

import {derefLayers} from '@maplibre/maplibre-gl-style-spec';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {getCenter, getTopLeft} from 'ol/extent.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import MVT from 'ol/format/MVT.js';
import LayerGroup from 'ol/layer/Group.js';
import ImageLayer from 'ol/layer/Image.js';
import Layer from 'ol/layer/Layer.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import {bbox as bboxStrategy} from 'ol/loadingstrategy.js';
import {METERS_PER_UNIT} from 'ol/proj/Units.js';
import {
  equivalent,
  fromLonLat,
  get as getProjection,
  getPointResolution,
  getUserProjection,
} from 'ol/proj.js';
import Raster from 'ol/source/Raster.js';
import Source from 'ol/source/Source.js';
import TileJSON from 'ol/source/TileJSON.js';
import VectorSource from 'ol/source/Vector.js';
import VectorTileSource, {defaultLoadFunction} from 'ol/source/VectorTile.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';
import {createXYZ} from 'ol/tilegrid.js';
import {
  normalizeSourceUrl,
  normalizeSpriteUrl,
  normalizeStyleUrl,
} from './mapbox.js';
import {hillshade} from './shaders.js';
import {
  _colorWithOpacity,
  getValue,
  styleFunctionArgs,
  stylefunction as applyStylefunction,
} from './stylefunction.js';
import {getFonts} from './text.js';
import {
  defaultResolutions,
  fetchResource,
  getFilterCache,
  getFunctionCache,
  getGlStyle,
  getResolutionForZoom,
  getStyleFunctionKey,
  getTileJson,
  getZoomForResolution,
} from './util.js';

/**
 * @typedef {Object} FeatureIdentifier
 * @property {string|number} id The feature id.
 * @property {string} source The source id.
 */

/**
 * @typedef {Object} Options
 * @property {string} [accessToken] Access token for 'mapbox://' urls.
 * @property {function(string, import("./util.js").ResourceType): (Request|string|Promise<Request|string>|void)} [transformRequest]
 * Function for controlling how `ol-mapbox-style` fetches resources. Can be used for modifying
 * the url, adding headers or setting credentials options. Called with the url and the resource
 * type as arguments, this function is supposed to return a `Request` or a url `string`, or a promise tehereof.
 * Without a return value the original request will not be modified.
 * @property {string} [projection='EPSG:3857'] Only useful when working with non-standard projections.
 * Code of a projection registered with OpenLayers. All sources of the style must be provided in this
 * projection. The projection must also have a valid extent defined, which will be used to determine the
 * origin and resolutions of the tile grid for all tiled sources of the style. When provided, the bbox
 * placeholder in tile and geojson urls changes: the default is `{bbox-epsg-3857}`, when projection is e.g.
 * set to `EPSG:4326`, the bbox placeholder will be `{bbox-epsg-4326}`.
 * @property {Array<number>} [resolutions] Only useful when working with non-standard projections.
 * Resolutions for mapping resolution to the `zoom` used in the Mapbox/MapLibre style.
 * @property {string} [styleUrl] URL of the Mapbox GL style. Required for styles that were provided
 * as object, when they contain a relative sprite url, or sources referencing data by relative url.
 * @property {string} [webfonts] Template for resolving webfonts. Can be used to specify where to fetch
 * web fonts when no `ol:webfonts` metadata is set in the style object. See `getFonts()` and the
 * "Font handling" section in `README.md` for details.
 * @property {function(VectorLayer|VectorTileLayer, string):HTMLImageElement|HTMLCanvasElement|string|undefined} [getImage=undefined]
 * Function that returns an image for an icon name. If the result is an HTMLImageElement, it must already be
 * loaded. The layer can be used to call layer.changed() when the loading and processing of the image has finished.
 * This function be used for icons not in the sprite or to override sprite icons.
 * @property {string} [accessTokenParam='access_token'] Access token param. For internal use.
 */

/**
 * @typedef {Object} ApplyStyleOptions
 * @property {string} [source=''] Source. Default is `''`, which causes the first source in the
 * style to be used.
 * @property {Array<string>} [layers] Layers. If no source is provided, the layers with the
 * provided ids will be used from the style's `layers` array. All layers need to use the same source.
 * @property {boolean} [updateSource=true] Update or create vector (tile) layer source with parameters
 * specified for the source in the mapbox style definition.
 */

/**
 * @param {import("ol/proj/Projection.js").default} projection Projection.
 * @param {number} [tileSize] Tile size.
 * @return {Array<number>} Resolutions.
 */
function getTileResolutions(projection, tileSize = 512) {
  return projection.getExtent()
    ? createXYZ({
        extent: projection.getExtent(),
        tileSize: tileSize,
        maxZoom: 22,
      }).getResolutions()
    : defaultResolutions;
}

/**
 * @param {string} styleUrl Style URL.
 * @param {Options} options Options.
 * @return {Options} Completed options with accessToken and accessTokenParam.
 */
function completeOptions(styleUrl, options) {
  if (!options.accessToken) {
    options = Object.assign({}, options);
    const searchParams = new URL(styleUrl).searchParams;
    // The last search parameter is the access token
    searchParams.forEach((value, key) => {
      options.accessToken = value;
      options.accessTokenParam = key;
    });
  }
  return options;
}

/**
 * Applies a style function to an `ol/layer/VectorTile` or `ol/layer/Vector`
 * with an `ol/source/VectorTile` or an `ol/source/Vector`. If the layer does not have a source
 * yet, it will be created and populated from the information in the `glStyle` (unless `updateSource` is
 * set to `false`).
 *
 * **Example:**
 * ```js
 * import {applyStyle} from 'ol-mapbox-style';
 * import {VectorTile} from 'ol/layer.js';
 *
 * const layer = new VectorTile({declutter: true});
 * applyStyle(layer, 'https://api.maptiler.com/maps/basic/style.json?key=YOUR_OPENMAPTILES_TOKEN');
 * ```
 *
 * The style function will render all layers from the `glStyle` object that use the source
 * of the first layer, the specified `source`, or a subset of layers from the same source. The
 * source needs to be a `"type": "vector"` or `"type": "geojson"` source.
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
 * @param {VectorTileLayer|VectorLayer} layer OpenLayers layer. When the layer has a source configured,
 * it will be modified to use the configuration from the glStyle's `source`. Options specified on the
 * layer's source will override those from the glStyle's `source`, except for `url` and
 * `tileUrlFunction`. When the source projection is the default (`EPSG:3857`), the `tileGrid` will
 * also be overridden. If you'd rather not have ol-mapbox-style modify the source, configure `applyStyle()`
 * with the `updateSource: false` option.
 * @param {string|Object} glStyle Mapbox/MapLibre Style object.
 * @param {string|Array<string>|Options&ApplyStyleOptions} [sourceOrLayersOrOptions] Options or
 * `source` key or an array of layer `id`s from the Mapbox/MapLibre Style object. When a `source` key is
 * provided, all layers for the specified source will be included in the style function. When layer
 * `id`s are provided, they must be from layers that use the same source. When not provided or a falsey
 * value, all layers using the first source specified in the glStyle will be rendered.
 * @param {Options&ApplyStyleOptions|string} [optionsOrPath] **Deprecated**. Options. Alternatively the path of the style file
 * (only required when a relative path is used for the `"sprite"` property of the style).
 * @param {Array<number>} [resolutions] **Deprecated**. Resolutions for mapping resolution to zoom level.
 * Only needed when working with non-standard tile grids or projections, can also be supplied with
 * options.
 * @return {Promise} Promise which will be resolved when the style can be used
 * for rendering.
 */
export function applyStyle(
  layer,
  glStyle,
  sourceOrLayersOrOptions = '',
  optionsOrPath = {},
  resolutions = undefined,
) {
  let styleUrl, sourceId;
  /** @type {Options&ApplyStyleOptions} */
  let options;
  let sourceOrLayers;
  let updateSource = true;
  if (
    typeof sourceOrLayersOrOptions !== 'string' &&
    !Array.isArray(sourceOrLayersOrOptions)
  ) {
    options = sourceOrLayersOrOptions;
    sourceOrLayers = options.source || options.layers;
    optionsOrPath = options;
  } else {
    sourceOrLayers = sourceOrLayersOrOptions;
  }
  if (typeof optionsOrPath === 'string') {
    styleUrl = optionsOrPath;
    options = {};
  } else {
    styleUrl = optionsOrPath.styleUrl;
    options = optionsOrPath;
  }
  if (options.updateSource === false) {
    updateSource = false;
  }
  if (!resolutions) {
    resolutions = options.resolutions;
  }
  if (
    !styleUrl &&
    typeof glStyle === 'string' &&
    !glStyle.trim().startsWith('{')
  ) {
    styleUrl = glStyle;
  }
  if (styleUrl) {
    styleUrl = styleUrl.startsWith('data:')
      ? location.href
      : normalizeStyleUrl(styleUrl, options.accessToken);
    options = completeOptions(styleUrl, options);
  }

  return new Promise(function (resolve, reject) {
    // TODO: figure out where best place to check source type is
    // Note that the source arg is an array of gl layer ids and each must be
    // dereferenced to get source type to validate
    getGlStyle(glStyle, options)
      .then(function (glStyle) {
        if (glStyle.version != 8) {
          return reject(new Error('glStyle version 8 required.'));
        }
        if (
          !(layer instanceof VectorLayer || layer instanceof VectorTileLayer)
        ) {
          return reject(
            new Error('Can only apply to VectorLayer or VectorTileLayer'),
          );
        }

        const type = layer instanceof VectorTileLayer ? 'vector' : 'geojson';
        if (!sourceOrLayers) {
          sourceId = Object.keys(glStyle.sources).find(function (key) {
            return glStyle.sources[key].type === type;
          });
          sourceOrLayers = sourceId;
        } else if (Array.isArray(sourceOrLayers)) {
          sourceId = glStyle.layers.find(function (layer) {
            return layer.id === sourceOrLayers[0];
          }).source;
        } else {
          sourceId = sourceOrLayers;
        }
        if (!sourceId) {
          return reject(new Error(`No ${type} source found in the glStyle.`));
        }

        function assignSource() {
          if (!updateSource) {
            return Promise.resolve();
          }
          if (layer instanceof VectorTileLayer) {
            return setupVectorSource(
              glStyle.sources[sourceId],
              styleUrl,
              options,
            ).then(function (source) {
              const targetSource = layer.getSource();
              if (!targetSource) {
                layer.setSource(source);
              } else if (source !== targetSource) {
                targetSource.setTileUrlFunction(source.getTileUrlFunction());
                if (
                  typeof targetSource.setUrls === 'function' &&
                  typeof source.getUrls === 'function'
                ) {
                  // to get correct keys for tile cache and queue
                  targetSource.setUrls(source.getUrls());
                }
                //@ts-ignore
                if (!targetSource.format_) {
                  //@ts-ignore
                  targetSource.format_ = source.format_;
                }
                if (!targetSource.getAttributions()) {
                  targetSource.setAttributions(source.getAttributions());
                }
                if (
                  targetSource.getTileLoadFunction() === defaultLoadFunction
                ) {
                  targetSource.setTileLoadFunction(
                    source.getTileLoadFunction(),
                  );
                }
                if (
                  equivalent(
                    targetSource.getProjection(),
                    source.getProjection(),
                  )
                ) {
                  //@ts-ignore
                  targetSource.tileGrid = source.getTileGrid();
                }
              }
              const tileGrid = layer.getSource().getTileGrid();
              if (
                !isFinite(layer.getMaxResolution()) &&
                !isFinite(layer.getMinZoom()) &&
                tileGrid.getMinZoom() > 0
              ) {
                layer.setMaxResolution(
                  getResolutionForZoom(
                    Math.max(0, tileGrid.getMinZoom() - 1e-12),
                    tileGrid.getResolutions(),
                  ),
                );
              }
            });
          }
          const glSource = glStyle.sources[sourceId];
          let source = layer.getSource();
          if (!source || source.get('mapbox-source') !== glSource) {
            source = setupGeoJSONSource(glSource, styleUrl, options);
          }
          const targetSource = /** @type {VectorSource} */ (layer.getSource());
          if (!targetSource) {
            layer.setSource(source);
          } else if (source !== targetSource) {
            if (!targetSource.getAttributions()) {
              targetSource.setAttributions(source.getAttributions());
            }
            //@ts-ignore
            if (!targetSource.format_) {
              //@ts-ignore
              targetSource.format_ = source.getFormat();
            }
            //@ts-ignore
            targetSource.url_ = source.getUrl();
          }
          return Promise.resolve();
        }

        let spriteScale, spriteData, spriteImageUrl, style;
        function onChange() {
          if (!style && (!glStyle.sprite || spriteData)) {
            if (options.projection && !resolutions) {
              const projection = getProjection(options.projection);
              const units = projection.getUnits();
              if (units !== 'm') {
                resolutions = defaultResolutions.map(
                  (resolution) => resolution / METERS_PER_UNIT[units],
                );
              }
            }
            style = applyStylefunction(
              layer,
              glStyle,
              sourceOrLayers,
              resolutions,
              spriteData,
              spriteImageUrl,
              (fonts, templateUrl = options.webfonts) =>
                getFonts(fonts, templateUrl),
              options.getImage,
            );
            if (!layer.getStyle()) {
              reject(new Error(`Nothing to show for source [${sourceId}]`));
            } else {
              assignSource().then(resolve).catch(reject);
            }
          } else if (style) {
            layer.setStyle(style);
            assignSource().then(resolve).catch(reject);
          } else {
            reject(new Error('Something went wrong trying to apply style.'));
          }
        }

        if (glStyle.sprite) {
          const sprite = new URL(
            normalizeSpriteUrl(
              glStyle.sprite,
              options.accessToken,
              styleUrl || location.href,
            ),
          );
          spriteScale = window.devicePixelRatio >= 1.5 ? 0.5 : 1;
          const sizeFactor = spriteScale == 0.5 ? '@2x' : '';
          let spriteUrl =
            sprite.origin +
            sprite.pathname +
            sizeFactor +
            '.json' +
            sprite.search;

          new Promise(function (resolve, reject) {
            fetchResource('Sprite', spriteUrl, options)
              .then(resolve)
              .catch(function (error) {
                spriteUrl =
                  sprite.origin + sprite.pathname + '.json' + sprite.search;
                fetchResource('Sprite', spriteUrl, options)
                  .then(resolve)
                  .catch(reject);
              });
          })
            .then(function (spritesJson) {
              if (spritesJson === undefined) {
                reject(new Error('No sprites found.'));
              }
              spriteData = spritesJson;
              spriteImageUrl =
                sprite.origin +
                sprite.pathname +
                sizeFactor +
                '.png' +
                sprite.search;
              if (options.transformRequest) {
                const transformed =
                  options.transformRequest(spriteImageUrl, 'SpriteImage') ||
                  spriteImageUrl;
                if (
                  transformed instanceof Request ||
                  transformed instanceof Promise
                ) {
                  spriteImageUrl = transformed;
                }
              }
              onChange();
            })
            .catch(function (err) {
              reject(
                new Error(
                  `Sprites cannot be loaded: ${spriteUrl}: ${err.message}`,
                ),
              );
            });
        } else {
          onChange();
        }
      })
      .catch(reject);
  });
}

const emptyObj = {};

function setFirstBackground(mapOrLayer, glStyle, options) {
  glStyle.layers.some(function (layer) {
    if (layer.type === 'background') {
      if (mapOrLayer instanceof Layer) {
        mapOrLayer.setBackground(function (resolution) {
          return getBackgroundColor(layer, resolution, options, {});
        });
        return true;
      }
      if (mapOrLayer instanceof Map || mapOrLayer instanceof LayerGroup) {
        mapOrLayer
          .getLayers()
          .insertAt(0, setupBackgroundLayer(layer, options, {}));
        return true;
      }
    }
  });
}

/**
 * Applies properties of the Mapbox/MapLibre Style's first `background` layer to the
 * provided map or layer (group).
 *
 * **Example:**
 * ```js
 * import {applyBackground} from 'ol-mapbox-style';
 * import {Map} from 'ol';
 *
 * const map = new Map({target: 'map'});
 * applyBackground(map, 'https://api.maptiler.com/maps/basic/style.json?key=YOUR_OPENMAPTILES_TOKEN');
 * ```
 * @param {Map|import("ol/layer/Base.js").default} mapOrLayer OpenLayers Map or layer (group).
 * @param {Object|string} glStyle Mapbox/MapLibre Style object or url.
 * @param {Options} options Options.
 * @return {Promise} Promise that resolves when the background is applied.
 */
export function applyBackground(mapOrLayer, glStyle, options = {}) {
  return getGlStyle(glStyle, options).then(function (glStyle) {
    setFirstBackground(mapOrLayer, glStyle, options);
  });
}

function getSourceIdByRef(layers, ref) {
  let sourceId;
  layers.some(function (layer) {
    if (layer.id == ref) {
      sourceId = layer.source;
      return true;
    }
  });
  return sourceId;
}

function extentFromTileJSON(tileJSON, projection) {
  const bounds = tileJSON.bounds;
  if (bounds) {
    const ll = fromLonLat([bounds[0], bounds[1]], projection);
    const tr = fromLonLat([bounds[2], bounds[3]], projection);
    return [ll[0], ll[1], tr[0], tr[1]];
  }
  return getProjection(projection).getExtent();
}

function sourceOptionsFromTileJSON(glSource, tileJSON, options) {
  const tileJSONSource = new TileJSON({
    tileJSON: tileJSON,
    tileSize: glSource.tileSize || tileJSON.tileSize || 512,
  });
  const tileJSONDoc = tileJSONSource.getTileJSON();
  const tileGrid = tileJSONSource.getTileGrid();
  const projection = getProjection(options.projection || 'EPSG:3857');
  const extent = extentFromTileJSON(tileJSONDoc, projection);
  const projectionExtent = projection.getExtent();
  const minZoom = tileJSONDoc.minzoom || 0;
  const maxZoom = tileJSONDoc.maxzoom || 22;
  /** @type {import("ol/source/VectorTile.js").Options<import("ol/render/Feature.js").default>} */
  const sourceOptions = {
    attributions: tileJSONSource.getAttributions(),
    projection: projection,
    tileGrid: new TileGrid({
      origin: projectionExtent
        ? getTopLeft(projectionExtent)
        : tileGrid.getOrigin(0),
      extent: extent || tileGrid.getExtent(),
      minZoom: minZoom,
      resolutions: getTileResolutions(projection, tileJSON.tileSize).slice(
        0,
        maxZoom + 1,
      ),
      tileSize: tileGrid.getTileSize(0),
    }),
  };
  if (Array.isArray(tileJSONDoc.tiles)) {
    sourceOptions.urls = tileJSONDoc.tiles;
  } else {
    sourceOptions.url = tileJSONDoc.tiles;
  }
  return sourceOptions;
}

function getBackgroundColor(glLayer, resolution, options, functionCache) {
  const background = {
    id: glLayer.id,
    type: glLayer.type,
  };
  const layout = glLayer.layout || {};
  const paint = glLayer.paint || {};
  background['paint'] = paint;
  const zoom = getZoomForResolution(
    resolution,
    options.resolutions || defaultResolutions,
  );
  let opacity;
  const bg = getValue(
    background,
    'paint',
    'background-color',
    zoom,
    emptyObj,
    functionCache,
  );
  if (paint['background-opacity'] !== undefined) {
    opacity = getValue(
      background,
      'paint',
      'background-opacity',
      zoom,
      emptyObj,
      functionCache,
    );
  }
  return layout.visibility == 'none'
    ? undefined
    : _colorWithOpacity(bg, opacity);
}

/**
 * @param {Object} glLayer Mapbox/MapLibre Style layer object.
 * @param {Options} options Options.
 * @param {Object} functionCache Cache for functions.
 * @return {Layer} OpenLayers layer.
 */
function setupBackgroundLayer(glLayer, options, functionCache) {
  const div = document.createElement('div');
  div.className = 'ol-mapbox-style-background';
  div.style.position = 'absolute';
  div.style.width = '100%';
  div.style.height = '100%';
  return new Layer({
    source: new Source({}),
    render(frameState) {
      const color = getBackgroundColor(
        glLayer,
        frameState.viewState.resolution,
        options,
        functionCache,
      );
      div.style.backgroundColor = color;
      return div;
    },
  });
}

/**
 * Creates an OpenLayers VectorTile source for a gl source entry.
 * @param {Object} glSource "source" entry from a Mapbox/MapLibre Style object.
 * @param {string|undefined} styleUrl URL to use for the source. This is expected to be the complete http(s) url,
 * with access key applied.
 * @param {Options} options Options.
 * @return {Promise<import("ol/source/VectorTile").default>} Promise resolving to a VectorTile source.
 * @private
 */
export function setupVectorSource(glSource, styleUrl, options) {
  return new Promise(function (resolve, reject) {
    getTileJson(glSource, styleUrl, options)
      .then(function ({tileJson, tileLoadFunction}) {
        const sourceOptions = sourceOptionsFromTileJSON(
          glSource,
          tileJson,
          options,
        );
        sourceOptions.tileLoadFunction = tileLoadFunction;
        sourceOptions.format = new MVT();
        resolve(new VectorTileSource(sourceOptions));
      })
      .catch(reject);
  });
}

function setupVectorLayer(glSource, styleUrl, options) {
  const layer = new VectorTileLayer({
    declutter: true,
    visible: false,
  });
  setupVectorSource(glSource, styleUrl, options)
    .then(function (source) {
      source.set('mapbox-source', glSource);
      layer.setSource(source);
    })
    .catch(function (error) {
      layer.setSource(undefined);
    });
  return layer;
}

function getBboxTemplate(projection) {
  const projCode = projection ? projection.getCode() : 'EPSG:3857';
  return `{bbox-${projCode.toLowerCase().replace(/[^a-z0-9]/g, '-')}}`;
}

function setupRasterSource(glSource, styleUrl, options) {
  return new Promise(function (resolve, reject) {
    getTileJson(glSource, styleUrl, options)
      .then(function ({tileJson, tileLoadFunction}) {
        const source = new TileJSON({
          interpolate:
            options.interpolate === undefined ? true : options.interpolate,
          transition: 0,
          crossOrigin: 'anonymous',
          tileJSON: tileJson,
        });
        //@ts-ignore
        source.tileGrid = sourceOptionsFromTileJSON(
          glSource,
          tileJson,
          options,
        ).tileGrid;
        if (options.projection) {
          //@ts-ignore
          source.projection = getProjection(options.projection);
        }
        const getTileUrl = source.getTileUrlFunction();
        if (tileLoadFunction) {
          source.setTileLoadFunction(tileLoadFunction);
        }
        source.setTileUrlFunction(function (tileCoord, pixelRatio, projection) {
          const bboxTemplate = getBboxTemplate(projection);
          let src = getTileUrl(tileCoord, pixelRatio, projection);
          if (src.indexOf(bboxTemplate) != -1) {
            const bbox = source.getTileGrid().getTileCoordExtent(tileCoord);
            src = src.replace(bboxTemplate, bbox.toString());
          }
          return src;
        });
        source.set('mapbox-source', glSource);
        resolve(source);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

function setupRasterLayer(glSource, styleUrl, options) {
  const layer = new TileLayer();
  setupRasterSource(glSource, styleUrl, options)
    .then(function (source) {
      layer.setSource(source);
    })
    .catch(function () {
      layer.setSource(undefined);
    });
  return layer;
}

/**
 *
 * @param {Object} glSource "source" entry from a Mapbox/MapLibre Style object.
 * @param {string} styleUrl Style url
 * @param {Options} options ol-mapbox-style options.
 * @return {ImageLayer<Raster>} The raster layer
 */
function setupHillshadeLayer(glSource, styleUrl, options) {
  const tileLayer = setupRasterLayer(glSource, styleUrl, options);
  /** @type {ImageLayer<Raster>} */
  const layer = new ImageLayer({
    source: new Raster({
      operationType: 'image',
      operation: hillshade,
      sources: [tileLayer],
    }),
  });
  return layer;
}

/**
 * @param {Object} glSource glStyle source.
 * @param {string} styleUrl Style URL.
 * @param {Options} options Options.
 * @return {VectorSource} Configured vector source.
 */
function setupGeoJSONSource(glSource, styleUrl, options) {
  const geoJsonFormat = options.projection
    ? new GeoJSON({dataProjection: options.projection})
    : new GeoJSON();
  const data = glSource.data;
  const sourceOptions = {};
  if (typeof data == 'string') {
    const [geoJsonUrl] = normalizeSourceUrl(
      data,
      options.accessToken,
      options.accessTokenParam || 'access_token',
      styleUrl || location.href,
    );
    if (/\{bbox-[0-9a-z-]+\}/.test(geoJsonUrl)) {
      const extentUrl = (extent, resolution, projection) => {
        const bboxTemplate = getBboxTemplate(projection);
        return geoJsonUrl.replace(bboxTemplate, `${extent.join(',')}`);
      };
      const source = new VectorSource({
        attributions: glSource.attribution,
        format: geoJsonFormat,
        loader: (extent, resolution, projection, success, failure) => {
          const url =
            typeof extentUrl === 'function'
              ? extentUrl(extent, resolution, projection)
              : extentUrl;
          fetchResource('GeoJSON', url, options)
            .then((json) => {
              const features = /** @type {*} */ (
                source
                  .getFormat()
                  .readFeatures(json, {featureProjection: projection})
              );
              source.addFeatures(features);
              success(features);
            })
            .catch((response) => {
              source.removeLoadedExtent(extent);
              failure();
            });
        },
        strategy: bboxStrategy,
      });
      source.set('mapbox-source', glSource);
      return source;
    }
    const source = new VectorSource({
      attributions: glSource.attribution,
      format: geoJsonFormat,
      url: geoJsonUrl,
      loader: (extent, resolution, projection, success, failure) => {
        fetchResource('GeoJSON', geoJsonUrl, options)
          .then((json) => {
            const features = /** @type {*} */ (
              source
                .getFormat()
                .readFeatures(json, {featureProjection: projection})
            );
            source.addFeatures(features);
            success(features);
          })
          .catch((response) => {
            source.removeLoadedExtent(extent);
            failure();
          });
      },
    });
    return source;
  }
  sourceOptions.features = geoJsonFormat.readFeatures(data, {
    featureProjection: getUserProjection() || 'EPSG:3857',
  });

  const source = new VectorSource(
    Object.assign(
      {
        attributions: glSource.attribution,
        format: geoJsonFormat,
      },
      sourceOptions,
    ),
  );
  source.set('mapbox-source', glSource);
  return /** @type {VectorSource} */ (source);
}

function setupGeoJSONLayer(glSource, styleUrl, options) {
  return new VectorLayer({
    declutter: true,
    source: setupGeoJSONSource(glSource, styleUrl, options),
    visible: false,
  });
}

function prerenderRasterLayer(glLayer, layer, functionCache) {
  let zoom = null;
  return function (event) {
    if (
      glLayer.paint &&
      'raster-opacity' in glLayer.paint &&
      event.frameState.viewState.zoom !== zoom
    ) {
      zoom = event.frameState.viewState.zoom;
      delete functionCache[glLayer.id];
      updateRasterLayerProperties(glLayer, layer, zoom, functionCache);
    }
  };
}

function updateRasterLayerProperties(glLayer, layer, zoom, functionCache) {
  const opacity = getValue(
    glLayer,
    'paint',
    'raster-opacity',
    zoom,
    emptyObj,
    functionCache,
  );
  layer.setOpacity(opacity);
}

function manageVisibility(layer, mapOrGroup) {
  function onChange() {
    const glStyle = mapOrGroup.get('mapbox-style');
    if (!glStyle) {
      return;
    }
    const mapboxLayers = derefLayers(glStyle.layers);
    const layerMapboxLayerids = layer.get('mapbox-layers');
    const visible = mapboxLayers
      .filter(function (mapboxLayer) {
        return layerMapboxLayerids.includes(mapboxLayer.id);
      })
      .some(function (mapboxLayer) {
        return (
          !mapboxLayer.layout ||
          !mapboxLayer.layout.visibility ||
          mapboxLayer.layout.visibility === 'visible'
        );
      });
    if (layer.get('visible') !== visible) {
      layer.setVisible(visible);
    }
  }
  layer.on('change', onChange);
  onChange();
}

export function setupLayer(glStyle, styleUrl, glLayer, options) {
  const functionCache = getFunctionCache(glStyle);
  const glLayers = glStyle.layers;
  const type = glLayer.type;

  const id = glLayer.source || getSourceIdByRef(glLayers, glLayer.ref);
  const glSource = glStyle.sources[id];
  let layer;
  if (type == 'background') {
    layer = setupBackgroundLayer(glLayer, options, functionCache);
  } else if (glSource.type == 'vector') {
    layer = setupVectorLayer(glSource, styleUrl, options);
  } else if (glSource.type == 'raster') {
    layer = setupRasterLayer(glSource, styleUrl, options);
    layer.setVisible(
      glLayer.layout ? glLayer.layout.visibility !== 'none' : true,
    );
    layer.on('prerender', prerenderRasterLayer(glLayer, layer, functionCache));
  } else if (glSource.type == 'geojson') {
    layer = setupGeoJSONLayer(glSource, styleUrl, options);
  } else if (glSource.type == 'raster-dem' && glLayer.type == 'hillshade') {
    const hillshadeLayer = setupHillshadeLayer(glSource, styleUrl, options);
    layer = hillshadeLayer;
    hillshadeLayer.getSource().on('beforeoperations', function (event) {
      const data = event.data;
      data.resolution = getPointResolution(
        options.projection || 'EPSG:3857',
        event.resolution,
        getCenter(event.extent),
        'm',
      );
      const zoom = getZoomForResolution(
        event.resolution,
        options.resolutions || defaultResolutions,
      );
      data.encoding = glSource.encoding;
      data.vert =
        5 *
        getValue(
          glLayer,
          'paint',
          'hillshade-exaggeration',
          zoom,
          emptyObj,
          functionCache,
        );
      data.sunAz = getValue(
        glLayer,
        'paint',
        'hillshade-illumination-direction',
        zoom,
        emptyObj,
        functionCache,
      );
      data.sunEl = 35;
      data.opacity = 0.3;
      data.highlightColor = getValue(
        glLayer,
        'paint',
        'hillshade-highlight-color',
        zoom,
        emptyObj,
        functionCache,
      );
      data.shadowColor = getValue(
        glLayer,
        'paint',
        'hillshade-shadow-color',
        zoom,
        emptyObj,
        functionCache,
      );
      data.accentColor = getValue(
        glLayer,
        'paint',
        'hillshade-accent-color',
        zoom,
        emptyObj,
        functionCache,
      );
    });
    layer.setVisible(
      glLayer.layout ? glLayer.layout.visibility !== 'none' : true,
    );
  }
  const glSourceId = id;
  if (layer) {
    layer.set('mapbox-source', glSourceId);
  }
  return layer;
}

/**
 * @param {*} glStyle Mapbox/MapLibre Style.
 * @param {Map|LayerGroup} mapOrGroup Map or layer group.
 * @param {string} styleUrl Style URL.
 * @param {Options} options Options.
 * @return {Promise} Promise that resolves when the style is loaded.
 */
function processStyle(glStyle, mapOrGroup, styleUrl, options) {
  const promises = [];

  let view = null;
  if (mapOrGroup instanceof Map) {
    view = mapOrGroup.getView();
    if (!view.isDef() && !view.getRotation() && !view.getResolutions()) {
      const projection = options.projection
        ? getProjection(options.projection)
        : view.getProjection();
      view = new View(
        Object.assign(view.getProperties(), {
          maxResolution:
            defaultResolutions[0] / METERS_PER_UNIT[projection.getUnits()],
          projection: options.projection || view.getProjection(),
        }),
      );
      mapOrGroup.setView(view);
    }

    if ('center' in glStyle && !view.getCenter()) {
      view.setCenter(fromLonLat(glStyle.center, view.getProjection()));
    }
    if ('zoom' in glStyle && view.getZoom() === undefined) {
      view.setResolution(
        defaultResolutions[0] /
          METERS_PER_UNIT[view.getProjection().getUnits()] /
          Math.pow(2, glStyle.zoom),
      );
    }
    if (!view.getCenter() || view.getZoom() === undefined) {
      view.fit(view.getProjection().getExtent(), {
        nearest: true,
        size: mapOrGroup.getSize(),
      });
    }
  }
  mapOrGroup.set('mapbox-style', glStyle);
  mapOrGroup.set('mapbox-metadata', {styleUrl, options});

  const glLayers = glStyle.layers;
  let layerIds = [];

  let layer, glSourceId, id;
  for (let i = 0, ii = glLayers.length; i < ii; ++i) {
    const glLayer = glLayers[i];
    const type = glLayer.type;
    if (type == 'heatmap') {
      //FIXME Unsupported layer type
      // eslint-disable-next-line no-console
      console.debug(`layers[${i}].type "${type}" not supported`);
      continue;
    } else {
      id = glLayer.source || getSourceIdByRef(glLayers, glLayer.ref);
      // this technique assumes gl layers will be in a particular order
      if (!id || id != glSourceId) {
        if (layerIds.length) {
          promises.push(
            finalizeLayer(
              layer,
              layerIds,
              glStyle,
              styleUrl,
              mapOrGroup,
              options,
            ),
          );
          layerIds = [];
        }

        layer = setupLayer(glStyle, styleUrl, glLayer, options);
        if (
          !(layer instanceof VectorLayer || layer instanceof VectorTileLayer)
        ) {
          layerIds = [];
        }
        glSourceId = layer.get('mapbox-source');
      }
      layerIds.push(glLayer.id);
    }
  }
  promises.push(
    finalizeLayer(layer, layerIds, glStyle, styleUrl, mapOrGroup, options),
  );
  return Promise.all(promises);
}

/**
 * Loads and applies a Mapbox/MapLibre Style object into an OpenLayers Map or LayerGroup.
 * This includes the map background, the layers, and for Map instances that did not
 * have a View defined yet also the center and the zoom.
 *
 * **Example:**
 * ```js
 * import apply from 'ol-mapbox-style';
 *
 * apply('map', 'mapbox://styles/mapbox/bright-v9', {accessToken: 'YOUR_MAPBOX_TOKEN'});
 * ```
 *
 * The center and zoom will only be set if present in the Mapbox/MapLibre Style document,
 * and if not already set on the OpenLayers map.
 *
 * Layers will be added to the OpenLayers map, without affecting any layers that
 * might already be set on the map.
 *
 * Layers added by `apply()` will have two additional properties:
 *
 *  * `mapbox-source`: The `id` of the Mapbox/MapLibre Style document's source that the
 *    OpenLayers layer was created from. Usually `apply()` creates one
 *    OpenLayers layer per Mapbox/MapLibre Style source, unless the layer stack has
 *    layers from different sources in between.
 *  * `mapbox-layers`: The `id`s of the Mapbox/MapLibre Style document's layers that are
 *    included in the OpenLayers layer.
 *
 * This function sets an additional `mapbox-style` property on the OpenLayers
 * Map or LayerGroup instance, which holds the Mapbox/MapLibre Style object.
 *
 * @param {Map|HTMLElement|string|LayerGroup} mapOrGroupOrElement Either an existing
 * OpenLayers Map instance, or a HTML element, or the id of a HTML element that will be
 * the target of a new OpenLayers Map, or a layer group. If layer group, styles
 * releated to the map and view will be ignored.
 * @param {string|Object} style JSON style object or style url pointing to a
 * Mapbox/MapLibre Style object. When using Mapbox APIs, the url is the `styleUrl`
 * shown in Mapbox Studio's "share" panel. In addition, the `accessToken` option
 * (see below) must be set.
 * When passed as JSON style object, all OpenLayers layers created by `apply()`
 * will be immediately available, but they may not have a source yet (i.e. when
 * they are defined by a TileJSON url in the Mapbox/MapLibre Style document). When passed
 * as style url, layers will be added to the map when the Mapbox/MapLibre Style document
 * is loaded and parsed.
 * @param {Options} options Options.
 * @return {Promise<Map|LayerGroup>} A promise that resolves after all layers have been added to
 * the OpenLayers Map instance or LayerGroup, their sources set, and their styles applied. The
 * `resolve` callback will be called with the OpenLayers Map instance or LayerGroup as
 * argument.
 */
export function apply(mapOrGroupOrElement, style, options = {}) {
  let promise;
  /** @type {Map|LayerGroup} */
  let mapOrGroup;
  if (
    typeof mapOrGroupOrElement === 'string' ||
    mapOrGroupOrElement instanceof HTMLElement
  ) {
    mapOrGroup = new Map({
      target: mapOrGroupOrElement,
    });
  } else {
    mapOrGroup = mapOrGroupOrElement;
  }

  if (typeof style === 'string') {
    const styleUrl = style.startsWith('data:')
      ? location.href
      : normalizeStyleUrl(style, options.accessToken);
    options = completeOptions(styleUrl, options);

    promise = new Promise(function (resolve, reject) {
      getGlStyle(style, options)
        .then(function (glStyle) {
          processStyle(glStyle, mapOrGroup, styleUrl, options)
            .then(function () {
              resolve(mapOrGroup);
            })
            .catch(reject);
        })
        .catch(function (err) {
          reject(new Error(`Could not load ${style}: ${err.message}`));
        });
    });
  } else {
    promise = new Promise(function (resolve, reject) {
      processStyle(
        style,
        mapOrGroup,
        !options.styleUrl || options.styleUrl.startsWith('data:')
          ? location.href
          : normalizeStyleUrl(options.styleUrl, options.accessToken),
        options,
      )
        .then(function () {
          resolve(mapOrGroup);
        })
        .catch(reject);
    });
  }

  return promise;
}

/**
 * If layerIds is not empty, applies the style specified in glStyle to the layer,
 * and adds the layer to the map.
 *
 * The layer may not yet have a source when the function is called.  If so, the style
 * is applied to the layer via a once listener on the 'change:source' event.
 *
 * @param {Layer} layer An OpenLayers layer instance.
 * @param {Array<string>} layerIds Array containing layer ids of already-processed layers.
 * @param {Object} glStyle Style as a JSON object.
 * @param {string|undefined} styleUrl The original style URL. Only required
 * when a relative path is used with the `"sprite"` property of the style.
 * @param {Map|LayerGroup} mapOrGroup OpenLayers Map.
 * @param {Options} options Options.
 * @return {Promise} Returns a promise that resolves after the source has
 * been set on the specified layer, and the style has been applied.
 */
export function finalizeLayer(
  layer,
  layerIds,
  glStyle,
  styleUrl,
  mapOrGroup,
  options = {},
) {
  let minZoom = 24;
  let maxZoom = 0;
  const glLayers = glStyle.layers;
  for (let i = 0, ii = glLayers.length; i < ii; ++i) {
    const glLayer = glLayers[i];
    if (layerIds.indexOf(glLayer.id) !== -1) {
      minZoom = Math.min('minzoom' in glLayer ? glLayer.minzoom : 0, minZoom);
      maxZoom = Math.max('maxzoom' in glLayer ? glLayer.maxzoom : 24, maxZoom);
    }
  }
  return new Promise(function (resolve, reject) {
    const setStyle = function () {
      const source = layer.getSource();
      if (!source || source.getState() === 'error') {
        reject(
          new Error(
            'Error accessing data for source ' + layer.get('mapbox-source'),
          ),
        );
        return;
      }
      if ('getTileGrid' in source) {
        const tileGrid =
          /** @type {import("ol/source/Tile.js").default|import("ol/source/VectorTile.js").default} */ (
            source
          ).getTileGrid();
        if (tileGrid) {
          const sourceMinZoom = tileGrid.getMinZoom();
          if (minZoom > 0 || sourceMinZoom > 0) {
            layer.setMaxResolution(
              Math.min(
                getResolutionForZoom(
                  Math.max(0, minZoom - 1e-12),
                  defaultResolutions,
                ),
                getResolutionForZoom(
                  Math.max(0, sourceMinZoom - 1e-12),
                  tileGrid.getResolutions(),
                ),
              ),
            );
          }
          if (maxZoom < 24) {
            layer.setMinResolution(
              getResolutionForZoom(maxZoom, defaultResolutions),
            );
          }
        }
      } else {
        if (minZoom > 0) {
          layer.setMaxResolution(
            getResolutionForZoom(
              Math.max(0, minZoom - 1e-12),
              defaultResolutions,
            ),
          );
        }
      }
      if (
        source instanceof VectorSource ||
        source instanceof VectorTileSource
      ) {
        applyStyle(
          /** @type {import("ol/layer/Vector").default|import("ol/layer/VectorTile").default} */ (
            layer
          ),
          glStyle,
          layerIds,
          Object.assign({styleUrl: styleUrl}, options),
        )
          .then(function () {
            manageVisibility(layer, mapOrGroup);
            resolve();
          })
          .catch(reject);
      } else {
        resolve();
      }
    };

    layer.set('mapbox-layers', layerIds);
    const layers = mapOrGroup.getLayers();
    if (layers.getArray().indexOf(layer) === -1) {
      layers.push(layer);
    }

    if (layer.getSource()) {
      setStyle();
    } else {
      layer.once('change:source', setStyle);
    }
  });
}

/**
 * Get the Mapbox Layer object for the provided `layerId`.
 * @param {Map|LayerGroup} mapOrGroup Map or LayerGroup.
 * @param {string} layerId Mapbox Layer id.
 * @return {Object} Mapbox Layer object.
 */
export function getMapboxLayer(mapOrGroup, layerId) {
  const style = mapOrGroup.get('mapbox-style');
  const layerStyle = style.layers.find(function (layer) {
    return layer.id === layerId;
  });
  return layerStyle;
}

/**
 * Add a new Mapbox Layer object to the style. The map will be re-rendered.
 * @param {Map|LayerGroup} mapOrGroup The Map or LayerGroup `apply` was called on.
 * @param {Object} mapboxLayer Mapbox Layer object.
 * @param {string} [beforeLayerId] Optional id of the Mapbox Layer before the new layer that will be added.
 * @return {Promise<void>} Resolves when the added layer is available.
 */
export function addMapboxLayer(mapOrGroup, mapboxLayer, beforeLayerId) {
  const glStyle = mapOrGroup.get('mapbox-style');
  const mapboxLayers = glStyle.layers;
  let spliceIndex;
  let sourceIndex = -1;
  if (beforeLayerId !== undefined) {
    const beforeMapboxLayer = getMapboxLayer(mapOrGroup, beforeLayerId);
    if (beforeMapboxLayer === undefined) {
      throw new Error(`Layer with id "${beforeLayerId}" not found.`);
    }
    spliceIndex = mapboxLayers.indexOf(beforeMapboxLayer);
  } else {
    spliceIndex = mapboxLayers.length;
  }
  let sourceOffset;
  if (
    spliceIndex > 0 &&
    mapboxLayers[spliceIndex - 1].source === mapboxLayer.source
  ) {
    sourceIndex = spliceIndex - 1;
    sourceOffset = -1;
  } else if (
    spliceIndex < mapboxLayers.length &&
    mapboxLayers[spliceIndex].source === mapboxLayer.source
  ) {
    sourceIndex = spliceIndex;
    sourceOffset = 0;
  }
  if (sourceIndex === -1) {
    const {options, styleUrl} = mapOrGroup.get('mapbox-metadata');
    const layer = setupLayer(glStyle, styleUrl, mapboxLayer, options);
    if (beforeLayerId) {
      const beforeLayer = getLayer(mapOrGroup, beforeLayerId);
      const beforeLayerIndex = mapOrGroup
        .getLayers()
        .getArray()
        .indexOf(beforeLayer);
      mapOrGroup.getLayers().insertAt(beforeLayerIndex, layer);
    }
    mapboxLayers.splice(spliceIndex, 0, mapboxLayer);
    return finalizeLayer(
      layer,
      [mapboxLayer.id],
      glStyle,
      styleUrl,
      mapOrGroup,
      options,
    );
  }

  if (mapboxLayers.some((layer) => layer.id === mapboxLayer.id)) {
    throw new Error(`Layer with id "${mapboxLayer.id}" already exists.`);
  }
  const sourceLayerId = mapboxLayers[sourceIndex].id;
  const args =
    styleFunctionArgs[
      getStyleFunctionKey(
        mapOrGroup.get('mapbox-style'),
        getLayer(mapOrGroup, sourceLayerId),
      )
    ];
  mapboxLayers.splice(spliceIndex, 0, mapboxLayer);
  if (args) {
    const [
      olLayer,
      glStyle,
      sourceOrLayers,
      resolutions,
      spriteData,
      spriteImageUrl,
      getFonts,
      getImage,
    ] = args;
    if (Array.isArray(sourceOrLayers)) {
      const layerIndex = sourceOrLayers.indexOf(sourceLayerId) + sourceOffset;
      sourceOrLayers.splice(layerIndex, 0, mapboxLayer.id);
    }
    applyStylefunction(
      olLayer,
      glStyle,
      sourceOrLayers,
      resolutions,
      spriteData,
      spriteImageUrl,
      getFonts,
      getImage,
    );
  } else {
    getLayer(mapOrGroup, mapboxLayers[sourceIndex].id).changed();
  }
  return Promise.resolve();
}

/**
 * Update a Mapbox Layer object in the style. The map will be re-rendered with the new style.
 * @param {Map|LayerGroup} mapOrGroup The Map or LayerGroup `apply` was called on.
 * @param {Object} mapboxLayer Updated Mapbox Layer object.
 */
export function updateMapboxLayer(mapOrGroup, mapboxLayer) {
  const glStyle = mapOrGroup.get('mapbox-style');
  const mapboxLayers = glStyle.layers;
  const index = mapboxLayers.findIndex(function (layer) {
    return layer.id === mapboxLayer.id;
  });
  if (index === -1) {
    throw new Error(`Layer with id "${mapboxLayer.id}" not found.`);
  }
  const oldLayer = mapboxLayers[index];
  if (oldLayer.source !== mapboxLayer.source) {
    throw new Error(
      'Updated layer and previous version must use the same source.',
    );
  }
  delete getFunctionCache(glStyle)[mapboxLayer.id];
  delete getFilterCache(glStyle)[mapboxLayer.id];
  mapboxLayers[index] = mapboxLayer;
  const args =
    styleFunctionArgs[
      getStyleFunctionKey(
        mapOrGroup.get('mapbox-style'),
        getLayer(mapOrGroup, mapboxLayer.id),
      )
    ];
  if (args) {
    applyStylefunction.apply(undefined, args);
  } else {
    getLayer(mapOrGroup, mapboxLayer.id).changed();
  }
}

/**
 * Updates a Mapbox source object in the style. The according OpenLayers source will be replaced
 * and the map will be re-rendered.
 * @param {Map|LayerGroup} mapOrGroup The Map or LayerGroup `apply` was called on.
 * @param {string} id Key of the source in the `sources` object literal.
 * @param {Object} mapboxSource Mapbox source object.
 * @return {Promise<Source>} Promise that resolves when the source has been updated.
 */
export function updateMapboxSource(mapOrGroup, id, mapboxSource) {
  const currentSource = getSource(mapOrGroup, id);
  const layers = /** @type {Array<VectorLayer|TileLayer|VectorTileLayer>} */ (
    mapOrGroup
      .getLayers()
      .getArray()
      .filter(function (layer) {
        return (
          (layer instanceof VectorLayer ||
            layer instanceof TileLayer ||
            layer instanceof VectorTileLayer) &&
          layer.getSource() === currentSource
        );
      })
  );
  const metadata = mapOrGroup.get('mapbox-metadata');
  let newSourcePromise;
  switch (mapboxSource.type) {
    case 'vector':
      newSourcePromise = setupVectorSource(
        mapboxSource,
        metadata.styleUrl,
        metadata.options,
      );
      break;
    case 'geojson':
      newSourcePromise = Promise.resolve(
        setupGeoJSONSource(mapboxSource, metadata.styleUrl, metadata.options),
      );
      break;
    case 'raster':
    case 'raster-dem':
      newSourcePromise = setupRasterSource(
        mapboxSource,
        metadata.styleUrl,
        metadata.options,
      );
      break;
    default:
      return Promise.reject(
        new Error('Unsupported source type ' + mapboxSource.type),
      );
  }
  newSourcePromise.then(function (newSource) {
    layers.forEach(function (layer) {
      layer.setSource(newSource);
    });
  });
  return newSourcePromise;
}

/**
 * Remove a Mapbox Layer object from the style. The map will be re-rendered.
 * @param {Map|LayerGroup} mapOrGroup The Map or LayerGroup `apply` was called on.
 * @param {string|Object} mapboxLayerIdOrLayer Mapbox Layer id or Mapbox Layer object.
 */
export function removeMapboxLayer(mapOrGroup, mapboxLayerIdOrLayer) {
  const mapboxLayerId =
    typeof mapboxLayerIdOrLayer === 'string'
      ? mapboxLayerIdOrLayer
      : mapboxLayerIdOrLayer.id;
  const layer = getLayer(mapOrGroup, mapboxLayerId);
  /** @type {Array<Object>} */
  const layerMapboxLayers = layer.get('mapbox-layers');
  if (layerMapboxLayers.length === 1) {
    throw new Error(
      'Cannot remove last Mapbox layer from an OpenLayers layer.',
    );
  }
  layerMapboxLayers.splice(layerMapboxLayers.indexOf(mapboxLayerId), 1);
  const glStyle = mapOrGroup.get('mapbox-style');
  const layers = glStyle.layers;
  layers.splice(
    layers.findIndex((layer) => layer.id === mapboxLayerId),
    1,
  );
  const args = styleFunctionArgs[getStyleFunctionKey(glStyle, layer)];
  if (args) {
    const [
      olLayer,
      glStyle,
      sourceOrLayers,
      resolutions,
      spriteData,
      spriteImageUrl,
      getFonts,
      getImage,
    ] = args;
    if (Array.isArray(sourceOrLayers)) {
      sourceOrLayers.splice(
        sourceOrLayers.findIndex((layer) => layer === mapboxLayerId),
        1,
      );
    }
    applyStylefunction(
      olLayer,
      glStyle,
      sourceOrLayers,
      resolutions,
      spriteData,
      spriteImageUrl,
      getFonts,
      getImage,
    );
  } else {
    getLayer(mapOrGroup, mapboxLayerId).changed();
  }
}

/**
 * Get the OpenLayers layer instance that contains the provided Mapbox/MapLibre Style
 * `layer`. Note that multiple Mapbox/MapLibre Style layers are combined in a single
 * OpenLayers layer instance when they use the same Mapbox/MapLibre Style `source`.
 * @param {Map|LayerGroup} map OpenLayers Map or LayerGroup.
 * @param {string} layerId Mapbox/MapLibre Style layer id.
 * @return {Layer} OpenLayers layer instance.
 */
export function getLayer(map, layerId) {
  const layers = map.getLayers().getArray();
  for (let i = 0, ii = layers.length; i < ii; ++i) {
    const mapboxLayers = layers[i].get('mapbox-layers');
    if (mapboxLayers && mapboxLayers.indexOf(layerId) !== -1) {
      return /** @type {Layer} */ (layers[i]);
    }
  }
  return undefined;
}

/**
 * Get the OpenLayers layer instances for the provided Mapbox/MapLibre Style `source`.
 * @param {Map|LayerGroup} map OpenLayers Map or LayerGroup.
 * @param {string} sourceId Mapbox/MapLibre Style source id.
 * @return {Array<Layer>} OpenLayers layer instances.
 */
export function getLayers(map, sourceId) {
  const result = [];
  const layers = map.getLayers().getArray();
  for (let i = 0, ii = layers.length; i < ii; ++i) {
    if (layers[i].get('mapbox-source') === sourceId) {
      result.push(/** @type {Layer} */ (layers[i]));
    }
  }
  return result;
}

/**
 * Get the OpenLayers source instance for the provided Mapbox/MapLibre Style `source`.
 * @param {Map|LayerGroup} map OpenLayers Map or LayerGroup.
 * @param {string} sourceId Mapbox/MapLibre Style source id.
 * @return {Source} OpenLayers source instance.
 */
export function getSource(map, sourceId) {
  const layers = map.getLayers().getArray();
  for (let i = 0, ii = layers.length; i < ii; ++i) {
    const source = /** @type {Layer} */ (layers[i]).getSource();
    if (layers[i].get('mapbox-source') === sourceId) {
      return source;
    }
  }
  return undefined;
}

/**
 * Sets or removes a feature state. The feature state is taken into account for styling,
 * just like the feature's properties, and can be used e.g. to conditionally render selected
 * features differently.
 *
 * The feature state will be stored on the OpenLayers layer matching the feature identifier, in the
 * `mapbox-featurestate` property.
 * @param {Map|VectorLayer|VectorTileLayer} mapOrLayer OpenLayers Map or layer to set the feature
 * state on.
 * @param {FeatureIdentifier} feature Feature identifier.
 * @param {Object|null} state Feature state. Set to `null` to remove the feature state.
 */
export function setFeatureState(mapOrLayer, feature, state) {
  const layers =
    'getLayers' in mapOrLayer
      ? getLayers(mapOrLayer, feature.source)
      : [mapOrLayer];
  for (let i = 0, ii = layers.length; i < ii; ++i) {
    const featureState = layers[i].get('mapbox-featurestate');
    if (featureState) {
      if (state) {
        featureState[feature.id] = state;
      } else {
        delete featureState[feature.id];
      }
      layers[i].changed();
    } else {
      throw new Error(`Map or layer for source "${feature.source}" not found.`);
    }
  }
}

/**
 * Sets or removes a feature state. The feature state is taken into account for styling,
 * just like the feature's properties, and can be used e.g. to conditionally render selected
 * features differently.
 * @param {Map|VectorLayer|VectorTileLayer} mapOrLayer Map or layer to set the feature state on.
 * @param {FeatureIdentifier} feature Feature identifier.
 * @return {Object|null} Feature state or `null` when no feature state is set for the given
 * feature identifier.
 */
export function getFeatureState(mapOrLayer, feature) {
  const layers =
    'getLayers' in mapOrLayer
      ? getLayers(mapOrLayer, feature.source)
      : [mapOrLayer];
  for (let i = 0, ii = layers.length; i < ii; ++i) {
    const featureState = layers[i].get('mapbox-featurestate');
    if (featureState && featureState[feature.id]) {
      return featureState[feature.id];
    }
  }
  return undefined;
}
