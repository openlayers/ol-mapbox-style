/*
ol-mapbox-style - Use Mapbox Style objects with OpenLayers
Copyright 2016-present ol-mapbox-style contributors
License: https://raw.githubusercontent.com/openlayers/ol-mapbox-style/master/LICENSE
*/

import Color from '@mapbox/mapbox-gl-style-spec/util/color.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import MVT from 'ol/format/MVT.js';
import Map from 'ol/Map.js';
import TileGrid from 'ol/tilegrid/TileGrid.js';
import TileJSON from 'ol/source/TileJSON.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource, {defaultLoadFunction} from 'ol/source/VectorTile.js';
import View from 'ol/View.js';
import {
  _colorWithOpacity,
  stylefunction as applyStyleFunction,
  getValue,
} from './stylefunction.js';
import {createXYZ} from 'ol/tilegrid.js';
import {
  defaultResolutions,
  fetchResource,
  getGlStyle,
  getTileJson,
} from './util.js';
import {equivalent, fromLonLat, getUserProjection} from 'ol/proj.js';
import {getFonts} from './text.js';
import {
  normalizeSourceUrl,
  normalizeSpriteUrl,
  normalizeStyleUrl,
} from './mapbox.js';

/**
 * @typedef {Object} FeatureIdentifier
 * @property {string|number} id The feature id.
 * @property {string} source The source id.
 */

/**
 * @typedef {Object} Options
 * @property {string} [accessToken] Access token for 'mapbox://' urls.
 * @property {function(string, ResourceType): (Request|void)} [transformRequest]
 * Function for controlling how `ol-mapbox-style` fetches resources. Can be used for modifying
 * the url, adding headers or setting credentials options. Called with the url and the resource
 * type as arguments, this function is supposed to return a `Request` object. Without a return value,
 * the original request will not be modified. For `Tiles` and `GeoJSON` resources, only the `url` of
 * the returned request will be respected.
 * @property {Array<number>} [resolutions] Resolutions for mapping resolution to zoom level.
 * Only needed when working with non-standard tile grids or projections.
 * @property {string} [styleUrl] URL of the Mapbox GL style. Required for styles that were provided
 * as object, when they contain a relative sprite url, or sources referencing data by relative url.
 * @property {string} [accessTokenParam='access_token'] Access token param. For internal use.
 */

/** @typedef {'Style'|'Source'|'Sprite'|'SpriteImage'|'Tiles'|'GeoJSON'} ResourceType */
/** @typedef {import("ol/layer/Layer").default} Layer */
/** @typedef {import("ol/source/Source").default} Source */

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
 * yet, it will be created and populated from the information in the `glStyle`.
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
 * @param {string|Array<string>} sourceOrLayers `source` key or an array of layer `id`s from the
 * Mapbox Style object. When a `source` key is provided, all layers for the
 * specified source will be included in the style function. When layer `id`s
 * are provided, they must be from layers that use the same source. When not provided or a falsey
 * value, all layers using the first source specified in the glStyle will be rendered.
 * @param {Options|string} optionsOrPath Options. Alternatively the path of the style file
 * (only required when a relative path is used for the `"sprite"` property of the style).
 * @param {Array<number>} resolutions Resolutions for mapping resolution to zoom level.
 * Only needed when working with non-standard tile grids or projections.
 * @return {Promise} Promise which will be resolved when the style can be used
 * for rendering.
 */
export function applyStyle(
  layer,
  glStyle,
  sourceOrLayers = '',
  optionsOrPath = {},
  resolutions = undefined
) {
  let styleUrl, sourceId;
  /** @type {Options} */
  let options;
  if (typeof optionsOrPath === 'string') {
    styleUrl = optionsOrPath;
    options = {};
  } else {
    styleUrl = optionsOrPath.styleUrl;
    options = optionsOrPath;
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
          } else {
            const glSource = glStyle.sources[sourceId];
            let source = layer.getSource();
            if (!source || source.get('mapbox-source') !== glSource) {
              source = setupGeoJSONSource(glSource, styleUrl, options);
            }
            const targetSource = /** @type {VectorSource} */ (
              layer.getSource()
            );
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
        }

        let spriteScale, spriteData, spriteImageUrl, style;
        function onChange() {
          if (!style && (!glStyle.sprite || spriteData)) {
            style = applyStyleFunction(
              layer,
              glStyle,
              sourceOrLayers,
              resolutions,
              spriteData,
              spriteImageUrl,
              getFonts
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

function setBackground(mapOrLayer, layer) {
  const background = {
    id: layer.id,
    type: layer.type,
  };
  const functionCache = {};
  function updateStyle(resolution) {
    const layout = layer.layout || {};
    const paint = layer.paint || {};
    background['paint'] = paint;
    const zoom =
      typeof mapOrLayer.getSource === 'function'
        ? mapOrLayer.getSource().getTileGrid().getZForResolution(resolution)
        : mapOrLayer.getView().getZoom();
    const element =
      typeof mapOrLayer.getTargetElement === 'function'
        ? mapOrLayer.getTargetElement()
        : undefined;
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
      if (element) {
        element.style.background = Color.parse(bg).toString();
      }
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
      if (element) {
        element.style.opacity = opacity;
      }
    }
    if (layout.visibility == 'none') {
      if (element) {
        element.style.backgroundColor = '';
        element.style.opacity = '';
      }
      return undefined;
    }
    return _colorWithOpacity(bg, opacity);
  }
  if (typeof mapOrLayer.getTargetElement === 'function') {
    if (mapOrLayer.getTargetElement()) {
      updateStyle();
    }
    mapOrLayer.on(['change:resolution', 'change:target'], updateStyle);
  } else if (typeof mapOrLayer.setBackground === 'function') {
    mapOrLayer.setBackground(updateStyle);
  } else {
    throw new Error('Unable to apply background.');
  }
}

function setFirstBackground(mapOrLayer, glStyle) {
  glStyle.layers.some(function (layer) {
    if (layer.type === 'background') {
      setBackground(mapOrLayer, layer);
      return true;
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
  if (typeof glStyle === 'object') {
    setFirstBackground(mapOrLayer, glStyle);
    return Promise.resolve();
  }
  return getGlStyle(glStyle, options).then(function (glStyle) {
    setFirstBackground(mapOrLayer, glStyle);
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

function extentFromTileJSON(tileJSON) {
  const bounds = tileJSON.bounds;
  if (bounds) {
    const ll = fromLonLat([bounds[0], bounds[1]]);
    const tr = fromLonLat([bounds[2], bounds[3]]);
    return [ll[0], ll[1], tr[0], tr[1]];
  }
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
        const tileJSONSource = new TileJSON({tileJSON: tileJSON});
        const tileJSONDoc = tileJSONSource.getTileJSON();
        const tileGrid = tileJSONSource.getTileGrid();
        const extent = extentFromTileJSON(tileJSONDoc);
        const minZoom = tileJSONDoc.minzoom || 0;
        const maxZoom = tileJSONDoc.maxzoom || 22;
        const sourceOptions = {
          attributions: tileJSONSource.getAttributions(),
          format: new MVT(),
          tileGrid: new TileGrid({
            origin: tileGrid.getOrigin(0),
            extent: extent || tileGrid.getExtent(),
            minZoom: minZoom,
            resolutions: defaultResolutions.slice(0, maxZoom + 1),
            tileSize: 512,
          }),
        };
        if (Array.isArray(tileJSONDoc.tiles)) {
          sourceOptions.urls = tileJSONDoc.tiles;
        } else {
          sourceOptions.url = tileJSONDoc.tiles;
        }
        if (tileJSON.olSourceOptions) {
          Object.assign(sourceOptions, tileJSON.olSourceOptions);
        }
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

function setupRasterLayer(glSource, styleUrl, options) {
  const layer = new TileLayer();
  getTileJson(glSource, styleUrl, options)
    .then(function (tileJson) {
      const source = new TileJSON({
        transition: 0,
        crossOrigin: 'anonymous',
        tileJSON: tileJson,
      });
      const extent = extentFromTileJSON(tileJson);
      const tileGrid = source.getTileGrid();
      const tileSize = glSource.tileSize || tileJson.tileSize || 512;
      const minZoom = tileJson.minzoom || 0;
      const maxZoom = tileJson.maxzoom || 22;
      //@ts-ignore
      source.tileGrid = new TileGrid({
        origin: tileGrid.getOrigin(0),
        extent: extent || tileGrid.getExtent(),
        minZoom: minZoom,
        resolutions: createXYZ({
          maxZoom: maxZoom,
          tileSize: tileSize,
        }).getResolutions(),
        tileSize: tileSize,
      });
      const getTileUrl = source.getTileUrlFunction();
      source.setTileUrlFunction(function (tileCoord, pixelRatio, projection) {
        let src = getTileUrl(tileCoord, pixelRatio, projection);
        if (src.indexOf('{bbox-epsg-3857}') != -1) {
          const bbox = source.getTileGrid().getTileCoordExtent(tileCoord);
          src = src.replace('{bbox-epsg-3857}', bbox.toString());
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

const geoJsonFormat = new GeoJSON();
/**
 * @param {Object} glSource glStyle source.
 * @param {string} styleUrl Style URL.
 * @param {Options} options Options.
 * @return {VectorSource} Configured vector source.
 */
function setupGeoJSONSource(glSource, styleUrl, options) {
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
        geoJsonUrl = encodeURI(transformed.url);
      }
    }
    sourceOptions.url = geoJsonUrl;
  } else {
    sourceOptions.features = geoJsonFormat.readFeatures(data, {
      featureProjection: getUserProjection() || 'EPSG:3857',
    });
  }
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

function updateRasterLayerProperties(glLayer, layer, view, functionCache) {
  const zoom = view.getZoom();
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

function processStyle(glStyle, map, styleUrl, options) {
  const promises = [];
  let view = map.getView();
  if (!view.isDef() && !view.getRotation() && !view.getResolutions()) {
    view = new View(
      Object.assign(view.getProperties(), {
        maxResolution: defaultResolutions[0],
      })
    );
    map.setView(view);
  }

  if ('center' in glStyle && !view.getCenter()) {
    view.setCenter(fromLonLat(glStyle.center));
  }
  if ('zoom' in glStyle && view.getZoom() === undefined) {
    view.setResolution(defaultResolutions[0] / Math.pow(2, glStyle.zoom));
  }
  if (!view.getCenter() || view.getZoom() === undefined) {
    view.fit(view.getProjection().getExtent(), {
      nearest: true,
      size: map.getSize(),
    });
  }

  const glLayers = glStyle.layers;
  let layerIds = [];

  let glLayer, glSource, glSourceId, id, layer;
  for (let i = 0, ii = glLayers.length; i < ii; ++i) {
    glLayer = glLayers[i];
    const type = glLayer.type;
    if (type == 'heatmap' || type == 'hillshade') {
      //FIXME Unsupported layer type
      throw new Error(`${type} layers are not supported`);
    } else if (type == 'background') {
      setBackground(map, glLayer);
    } else {
      id = glLayer.source || getSourceIdByRef(glLayers, glLayer.ref);
      // this technique assumes gl layers will be in a particular order
      if (id != glSourceId) {
        if (layerIds.length) {
          promises.push(
            finalizeLayer(layer, layerIds, glStyle, styleUrl, map, options)
          );
          layerIds = [];
        }
        glSource = glStyle.sources[id];
        if (glSource.type == 'vector') {
          layer = setupVectorLayer(glSource, styleUrl, options);
        } else if (glSource.type == 'raster') {
          layer = setupRasterLayer(glSource, styleUrl, options);
          layer.setVisible(
            glLayer.layout ? glLayer.layout.visibility !== 'none' : true
          );
          const functionCache = {};
          view.on(
            'change:resolution',
            updateRasterLayerProperties.bind(
              this,
              glLayer,
              layer,
              view,
              functionCache
            )
          );
          updateRasterLayerProperties(glLayer, layer, view, functionCache);
        } else if (glSource.type == 'geojson') {
          layer = setupGeoJSONLayer(glSource, styleUrl, options);
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
    finalizeLayer(layer, layerIds, glStyle, styleUrl, map, options)
  );
  map.set('mapbox-style', glStyle);
  return Promise.all(promises);
}

/**
 * Loads and applies a Mapbox Style object into an OpenLayers Map. This includes
 * the map background, the layers, the center and the zoom.
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
 * map instance, which holds the Mapbox Style object.
 *
 * @param {Map|HTMLElement|string} map Either an existing OpenLayers Map
 * instance, or a HTML element, or the id of a HTML element that will be the
 * target of a new OpenLayers Map.
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
 * @return {Promise<Map>} A promise that resolves after all layers have been added to
 * the OpenLayers Map instance, their sources set, and their styles applied. The
 * `resolve` callback will be called with the OpenLayers Map instance as
 * argument.
 */
export function apply(map, style, options = {}) {
  let promise;

  if (typeof map === 'string' || map instanceof HTMLElement) {
    map = new Map({
      target: map,
    });
  }

  if (typeof style === 'string') {
    const styleUrl = style.startsWith('data:')
      ? location.href
      : normalizeStyleUrl(style, options.accessToken);
    options = completeOptions(styleUrl, options);

    promise = new Promise(function (resolve, reject) {
      getGlStyle(style, options)
        .then(function (glStyle) {
          processStyle(glStyle, map, styleUrl, options)
            .then(function () {
              resolve(map);
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
        map,
        !options.styleUrl || options.styleUrl.startsWith('data:')
          ? location.href
          : normalizeStyleUrl(options.styleUrl, options.accessToken),
        options
      )
        .then(function () {
          resolve(map);
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
 * @param {Map} map OpenLayers Map.
 * @param {Options} options Options.
 * @return {Promise} Returns a promise that resolves after the source has
 * been set on the specified layer, and the style has been applied.
 * @private
 */
function finalizeLayer(layer, layerIds, glStyle, styleUrl, map, options = {}) {
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
            layer.setVisible(true);
            resolve();
          })
          .catch(reject);
      } else {
        resolve();
      }
    };

    layer.set('mapbox-layers', layerIds);
    if (map.getLayers().getArray().indexOf(layer) === -1) {
      map.addLayer(layer);
    }

    if (layer.getSource()) {
      setStyle();
    } else {
      layer.once('change:source', setStyle);
    }
  });
}

/**
 * Get the OpenLayers layer instance that contains the provided Mapbox Style
 * `layer`. Note that multiple Mapbox Style layers are combined in a single
 * OpenLayers layer instance when they use the same Mapbox Style `source`.
 * @param {Map} map OpenLayers Map.
 * @param {string} layerId Mapbox Style layer id.
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
}

/**
 * Get the OpenLayers layer instances for the provided Mapbox Style `source`.
 * @param {Map} map OpenLayers Map.
 * @param {string} sourceId Mapbox Style source id.
 * @return {Array<Layer>} OpenLayers layer instances.
 */
export function getLayers(map, sourceId) {
  const result = [];
  const layers = map.getAllLayers();
  for (let i = 0, ii = layers.length; i < ii; ++i) {
    if (layers[i].get('mapbox-source') === sourceId) {
      result.push(/** @type {Layer} */ (layers[i]));
    }
  }
  return result;
}

/**
 * Get the OpenLayers source instance for the provided Mapbox Style `source`.
 * @param {Map} map OpenLayers Map.
 * @param {string} sourceId Mapbox Style source id.
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
  return null;
}

export {finalizeLayer as _finalizeLayer};
