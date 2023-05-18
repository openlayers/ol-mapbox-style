/*
ol-mapbox-style - Use Mapbox Style objects with OpenLayers
Copyright 2016-present ol-mapbox-style contributors
License: https://raw.githubusercontent.com/openlayers/ol-mapbox-style/master/LICENSE
*/

import GeoJSON from 'ol/format/GeoJSON.js';
import ImageLayer from 'ol/layer/Image.js';
import Layer from 'ol/layer/Layer.js';
import LayerGroup from 'ol/layer/Group.js';
import MVT from 'ol/format/MVT.js';
import Map from 'ol/Map.js';
import Raster from 'ol/source/Raster.js';
import Source from 'ol/source/Source.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';
import TileJSON from 'ol/source/TileJSON.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource, {defaultLoadFunction} from 'ol/source/VectorTile.js';
import View from 'ol/View.js';
import derefLayers from '@mapbox/mapbox-gl-style-spec/deref.js';
import {
  METERS_PER_UNIT,
  equivalent,
  fromLonLat,
  get as getProjection,
  getUserProjection,
} from 'ol/proj.js';
import {
  _colorWithOpacity,
  stylefunction as applyStyleFunction,
  getValue,
} from './stylefunction.js';
import {bbox as bboxStrategy} from 'ol/loadingstrategy.js';
import {createXYZ} from 'ol/tilegrid.js';
import {
  defaultResolutions,
  fetchResource,
  getFunctionCache,
  getGlStyle,
  getTileJson,
  getZoomForResolution,
} from './util.js';
import {getFonts} from './text.js';
import {getTopLeft} from 'ol/extent.js';
import {hillshade} from './shaders.js';
import {
  normalizeSourceUrl,
  normalizeSpriteUrl,
  normalizeStyleUrl,
} from './mapbox.js';

/**
 * @typedef {Object} Options
 * @property {string} [accessToken] Access token for 'mapbox://' urls.
 * @property {string} [declutterGroup] Assign a declutterGroup to the layers created from styling
 * @property {function(string, ResourceType): (Request|void)} [transformRequest]
 * Function for controlling how `ol-mapbox-style` fetches resources. Can be used for modifying
 * the url, adding headers or setting credentials options. Called with the url and the resource
 * type as arguments, this function is supposed to return a `Request` object. Without a return value,
 * the original request will not be modified. For `Tiles` and `GeoJSON` resources, only the `url` of
 * the returned request will be respected.
 * @property {string} [projection='EPSG:3857'] Only useful when working with non-standard projections.
 * Code of a projection registered with OpenLayers. All sources of the style must be provided in this
 * projection. The projection must also have a valid extent defined, which will be used to determine the
 * origin and resolutions of the tile grid for all tiled sources of the style. When provided, the bbox
 * placeholder in tile and geojson urls changes: the default is `{bbox-epsg-3857}`, when projection is e.g.
 * set to `EPSG:4326`, the bbox placeholder will be `{bbox-epsg-4326}`.
 * @property {Array<number>} [resolutions] Only useful when working with non-standard projections.
 * Resolutions for mapping resolution to the `zoom` used in the Mapbox style.
 * @property {string} [styleUrl] URL of the Mapbox GL style. Required for styles that were provided
 * as object, when they contain a relative sprite url, or sources referencing data by relative url.
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

/** @typedef {'Style'|'Source'|'Sprite'|'SpriteImage'|'Tiles'|'GeoJSON'} ResourceType */

/**
 * @param {import("ol/proj/Projection.js").default} projection Projection.
 * @param {number} [tileSize=512] Tile size.
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
 *  * `mapbox-source`: The `id` of the Mapbox Style document's source that the
 *    OpenLayers layer was created from. Usually `apply()` creates one
 *    OpenLayers layer per Mapbox Style source, unless the layer stack has
 *    layers from different sources in between.
 *  * `mapbox-layers`: The `id`s of the Mapbox Style document's layers that are
 *    included in the OpenLayers layer.
 *
 * @param {VectorTileLayer|VectorLayer} layer OpenLayers layer. When the layer has a source configured,
 * it will be modified to use the configuration from the glStyle's `source`. Options specified on the
 * layer's source will override those from the glStyle's `source`, except for `url`,
 * `tileUrlFunction` and `tileGrid` (exception: when the source projection is not `EPSG:3857`).
 * @param {string|Object} glStyle Mapbox Style object.
 * @param {string|Array<string>|Options&ApplyStyleOptions} [sourceOrLayersOrOptions] Options or
 * `source` key or an array of layer `id`s from the Mapbox Style object. When a `source` key is
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
  resolutions = undefined
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
            new Error('Can only apply to VectorLayer or VectorTileLayer')
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
              options
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
                    source.getTileLoadFunction()
                  );
                }
                if (
                  equivalent(
                    targetSource.getProjection(),
                    source.getProjection()
                  )
                ) {
                  targetSource.tileGrid = source.getTileGrid();
                }
              }
              if (
                !isFinite(layer.getMaxResolution()) &&
                !isFinite(layer.getMinZoom())
              ) {
                const tileGrid = layer.getSource().getTileGrid();
                layer.setMaxResolution(
                  tileGrid.getResolution(tileGrid.getMinZoom())
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
                  (resolution) => resolution / METERS_PER_UNIT[units]
                );
              }
            }
            style = applyStyleFunction(
              layer,
              glStyle,
              sourceOrLayers,
              resolutions,
              spriteData,
              spriteImageUrl,
              getFonts,
              options.getImage
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
              styleUrl || location.href
            )
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
                const transformed = options.transformRequest(
                  spriteImageUrl,
                  'SpriteImage'
                );
                if (transformed instanceof Request) {
                  spriteImageUrl = encodeURI(transformed.url);
                }
              }
              onChange();
            })
            .catch(function (err) {
              reject(
                new Error(
                  `Sprites cannot be loaded: ${spriteUrl}: ${err.message}`
                )
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
        mapOrLayer.getLayers().push(setupBackgroundLayer(layer, options, {}));
        return true;
      }
    }
  });
}

/**
 * Applies properties of the Mapbox Style's first `background` layer to the
 * provided map or VectorTile layer.
 *
 * **Example:**
 * ```js
 * import {applyBackground} from 'ol-mapbox-style';
 * import {Map} from 'ol';
 *
 * const map = new Map({target: 'map'});
 * applyBackground(map, 'https://api.maptiler.com/maps/basic/style.json?key=YOUR_OPENMAPTILES_TOKEN');
 * ```
 * @param {Map|VectorTileLayer} mapOrLayer OpenLayers Map or VectorTile layer.
 * @param {Object|string} glStyle Mapbox Style object or url.
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
  /** @type {import("ol/source/VectorTile.js").Options} */
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
        maxZoom + 1
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
    options.resolutions || defaultResolutions
  );
  let bg, opacity;
  if (paint['background-color'] !== undefined) {
    bg = getValue(
      background,
      'paint',
      'background-color',
      zoom,
      emptyObj,
      functionCache
    );
  }
  if (paint['background-opacity'] !== undefined) {
    opacity = getValue(
      background,
      'paint',
      'background-opacity',
      zoom,
      emptyObj,
      functionCache
    );
  }
  return layout.visibility == 'none'
    ? undefined
    : _colorWithOpacity(bg, opacity);
}

/**
 * @param {Object} glLayer Mapbox Style layer object.
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
        functionCache
      );
      div.style.backgroundColor = color;
      return div;
    },
  });
}

/**
 * Creates an OpenLayers VectorTile source for a gl source entry.
 * @param {Object} glSource "source" entry from a Mapbox Style object.
 * @param {string|undefined} styleUrl URL to use for the source. This is expected to be the complete http(s) url,
 * with access key applied.
 * @param {Options} options Options.
 * @return {Promise<import("ol/source/VectorTile").default>} Promise resolving to a VectorTile source.
 * @private
 */
export function setupVectorSource(glSource, styleUrl, options) {
  return new Promise(function (resolve, reject) {
    getTileJson(glSource, styleUrl, options)
      .then(function (tileJSON) {
        const sourceOptions = sourceOptionsFromTileJSON(
          glSource,
          tileJSON,
          options
        );
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

function setupRasterLayer(glSource, styleUrl, options) {
  const layer = new TileLayer();
  getTileJson(glSource, styleUrl, options)
    .then(function (tileJson) {
      const source = new TileJSON({
        interpolate:
          options.interpolate === undefined ? true : options.interpolate,
        transition: 0,
        crossOrigin: 'anonymous',
        tileJSON: tileJson,
      });
      source.tileGrid = sourceOptionsFromTileJSON(
        glSource,
        tileJson,
        options
      ).tileGrid;
      if (options.projection) {
        //@ts-ignore
        source.projection = getProjection(options.projection);
      }
      const getTileUrl = source.getTileUrlFunction();
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
      layer.setSource(source);
    })
    .catch(function (error) {
      layer.setSource(undefined);
    });
  return layer;
}

/**
 *
 * @param {Object} glSource "source" entry from a Mapbox Style object.
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
    let geoJsonUrl = normalizeSourceUrl(
      data,
      options.accessToken,
      options.accessTokenParam || 'access_token',
      styleUrl || location.href
    );
    if (options.transformRequest) {
      const transformed = options.transformRequest(geoJsonUrl, 'GeoJSON');
      if (transformed instanceof Request) {
        geoJsonUrl = decodeURI(transformed.url);
      }
    }
    if (/\{bbox-[0-9a-z-]+\}/.test(geoJsonUrl)) {
      const extentUrl = (extent, resolution, projection) => {
        const bboxTemplate = getBboxTemplate(projection);
        return geoJsonUrl.replace(bboxTemplate, `${extent.join(',')}`);
      };
      const source = new VectorSource({
        attributions: glSource.attribution,
        format: geoJsonFormat,
        url: extentUrl,
        strategy: bboxStrategy,
      });
      source.set('mapbox-source', glSource);
      return source;
    }
    return new VectorSource({
      attributions: glSource.attribution,
      format: geoJsonFormat,
      url: geoJsonUrl,
    });
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
      sourceOptions
    )
  );
  source.set('mapbox-source', glSource);
  return source;
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
    functionCache
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

/**
 * @param {*} glStyle Mapbox Style.
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
        })
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
          Math.pow(2, glStyle.zoom)
      );
    }
    if (!view.getCenter() || view.getZoom() === undefined) {
      view.fit(view.getProjection().getExtent(), {
        nearest: true,
        size: mapOrGroup.getSize(),
      });
    }
  }

  const glLayers = glStyle.layers;
  let layerIds = [];

  let layer, glSource, glSourceId, id;
  for (let i = 0, ii = glLayers.length; i < ii; ++i) {
    const glLayer = glLayers[i];
    const type = glLayer.type;
    if (type == 'heatmap') {
      //FIXME Unsupported layer type
      throw new Error(`${type} layers are not supported`);
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
              options
            )
          );
          layerIds = [];
        }

        const functionCache = getFunctionCache(glStyle);

        glSource = glStyle.sources[id];
        if (type == 'background') {
          layer = setupBackgroundLayer(glLayer, options, functionCache);
        } else if (glSource.type == 'vector') {
          layer = setupVectorLayer(glSource, styleUrl, options);
        } else if (glSource.type == 'raster') {
          layerIds = [];
          layer = setupRasterLayer(glSource, styleUrl, options);
          layer.setVisible(
            glLayer.layout ? glLayer.layout.visibility !== 'none' : true
          );
          layer.on(
            'prerender',
            prerenderRasterLayer(glLayer, layer, functionCache)
          );
        } else if (glSource.type == 'geojson') {
          layer = setupGeoJSONLayer(glSource, styleUrl, options);
        } else if (
          glSource.type == 'raster-dem' &&
          glLayer.type == 'hillshade'
        ) {
          layerIds = [];
          const hillshadeLayer = setupHillshadeLayer(
            glSource,
            styleUrl,
            options
          );
          layer = hillshadeLayer;
          hillshadeLayer.getSource().on('beforeoperations', function (event) {
            const data = event.data;
            data.resolution = event.resolution;
            const zoom = getZoomForResolution(
              event.resolution,
              options.resolutions || defaultResolutions
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
                functionCache
              );
            data.sunAz = getValue(
              glLayer,
              'paint',
              'hillshade-illumination-direction',
              zoom,
              emptyObj,
              functionCache
            );
            data.sunEl = 35;
            data.opacity = 0.3;
            data.highlightColor = getValue(
              glLayer,
              'paint',
              'hillshade-highlight-color',
              zoom,
              emptyObj,
              functionCache
            );
            data.shadowColor = getValue(
              glLayer,
              'paint',
              'hillshade-shadow-color',
              zoom,
              emptyObj,
              functionCache
            );
            data.accentColor = getValue(
              glLayer,
              'paint',
              'hillshade-accent-color',
              zoom,
              emptyObj,
              functionCache
            );
          });
          layer.setVisible(
            glLayer.layout ? glLayer.layout.visibility !== 'none' : true
          );
        }
        glSourceId = id;
        if (layer) {
          layer.set('mapbox-source', glSourceId);
        }
      }
      layerIds.push(glLayer.id);
    }
  }
  promises.push(
    finalizeLayer(layer, layerIds, glStyle, styleUrl, mapOrGroup, options)
  );
  mapOrGroup.set('mapbox-style', glStyle);
  return Promise.all(promises);
}

/**
 * Loads and applies a Mapbox Style object into an OpenLayers Map or LayerGroup.
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
 * The center and zoom will only be set if present in the Mapbox Style document,
 * and if not already set on the OpenLayers map.
 *
 * Layers will be added to the OpenLayers map, without affecting any layers that
 * might already be set on the map.
 *
 * Layers added by `apply()` will have two additional properties:
 *
 *  * `mapbox-source`: The `id` of the Mapbox Style document's source that the
 *    OpenLayers layer was created from. Usually `apply()` creates one
 *    OpenLayers layer per Mapbox Style source, unless the layer stack has
 *    layers from different sources in between.
 *  * `mapbox-layers`: The `id`s of the Mapbox Style document's layers that are
 *    included in the OpenLayers layer.
 *
 * This function sets an additional `mapbox-style` property on the OpenLayers
 * Map or LayerGroup instance, which holds the Mapbox Style object.
 *
 * @param {Map|HTMLElement|string|LayerGroup} mapOrGroupOrElement Either an existing
 * OpenLayers Map instance, or a HTML element, or the id of a HTML element that will be
 * the target of a new OpenLayers Map, or a layer group. If layer group, styles
 * releated to the map and view will be ignored.
 * @param {string|Object} style JSON style object or style url pointing to a
 * Mapbox Style object. When using Mapbox APIs, the url is the `styleUrl`
 * shown in Mapbox Studio's "share" panel. In addition, the `accessToken` option
 * (see below) must be set.
 * When passed as JSON style object, all OpenLayers layers created by `apply()`
 * will be immediately available, but they may not have a source yet (i.e. when
 * they are defined by a TileJSON url in the Mapbox Style document). When passed
 * as style url, layers will be added to the map when the Mapbox Style document
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
        options
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
 * @private
 */
function finalizeLayer(
  layer,
  layerIds,
  glStyle,
  styleUrl,
  mapOrGroup,
  options = {}
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
            'Error accessing data for source ' + layer.get('mapbox-source')
          )
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
                defaultResolutions[minZoom],
                tileGrid.getResolution(sourceMinZoom)
              ) + 1e-9
            );
          }
          if (maxZoom < 24) {
            layer.setMinResolution(defaultResolutions[maxZoom] + 1e-9);
          }
        }
      } else {
        if (minZoom > 0) {
          layer.setMaxResolution(defaultResolutions[minZoom] + 1e-9);
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
          Object.assign({styleUrl: styleUrl}, options)
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

    if (options.declutterGroup) {
      layer.set('declutterGroup', options.declutterGroup)
    } else if (mapOrGroup.get('declutterGroup')) {
        layer.set('declutterGroup', mapOrGroup.get('declutterGroup'))
    }

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

export {finalizeLayer as _finalizeLayer};
