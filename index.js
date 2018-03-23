/*
ol-mapbox-style - Use Mapbox Style objects with OpenLayers
Copyright 2016-present Boundless Spatial, Inc.
License: https://raw.githubusercontent.com/boundlessgeo/ol-mapbox-gl-style/master/LICENSE
*/

import glfun from '@mapbox/mapbox-gl-style-spec/function';
import mb2css from 'mapbox-to-css-font';
import applyStyleFunction from './stylefunction';
import googleFonts from 'webfont-matcher/lib/fonts/google';
import proj from 'ol/proj';
import tilegrid from 'ol/tilegrid';
import CanvasMap from 'ol/canvasmap';
import GeoJSON from 'ol/format/geojson';
import MVT from 'ol/format/mvt';
import observable from 'ol/observable';
import TileLayer from 'ol/layer/tile';
import VectorLayer from 'ol/layer/vector';
import VectorTileLayer from 'ol/layer/vectortile';
import TileJSON from 'ol/source/tilejson';
import VectorSource from 'ol/source/vector';
import VectorTileSource from 'ol/source/vectortile';
import XYZ from 'ol/source/xyz';

var availableFonts;

function loadFont(fonts) {
  var i, ii;
  if (!Array.isArray(fonts)) {
    var stops = fonts.stops;
    if (stops) {
      for (i = 0, ii = stops.length; i < ii; ++i) {
        loadFont(stops[i][1]);
      }
    }
    return;
  }
  var googleFamilies = googleFonts.getNames();
  var families = fonts.map(function(font) {
    return mb2css(font, 1).split(' 1px ')[1].replace(/"/g, '');
  });
  for (i = 0, ii = families.length; i < ii; ++i) {
    var family = families[i];
    var font = fonts[i];
    if (googleFamilies.indexOf(family) !== -1) {
      if (!availableFonts) {
        availableFonts = [];
      }
      if (availableFonts.indexOf(font) == -1) {
        availableFonts.push(font);
        var fontUrl = 'https://fonts.googleapis.com/css?family=' + family.replace(/ /g, '+');
        if (!document.querySelector('link[href="' + fontUrl + '"]')) {
          var markup = document.createElement('link');
          markup.href = fontUrl;
          markup.rel = 'stylesheet';
          document.getElementsByTagName('head')[0].appendChild(markup);
        }
      }
      break;
    }
  }
}

var defaultFont = ['Open Sans Regular', 'Arial Regular'];

function preprocess(layer) {
  if ('layout' in layer && 'text-field' in layer.layout) {
    loadFont(layer.layout['text-font'] || defaultFont);
  }
}

var spriteRegEx = /^(.*)(\?.*)$/;

function withPath(url, path) {
  if (path && url.indexOf('http') != 0) {
    url = path + url;
  }
  return url;
}

function toSpriteUrl(url, path, extension) {
  url = withPath(url, path);
  var parts = url.match(spriteRegEx);
  return parts ?
    parts[1] + extension + (parts.length > 2 ? parts[2] : '') :
    url + extension;
}

/**
 * Applies a style function to an `ol.layer.VectorTile` or `ol.layer.Vector`
 * with an `ol.source.VectorTile` or an `ol.source.Vector`. The style function
 * will render all layers from the `glStyle` object that use the specified
 * `source`, or a subset of layers from the same source. The source needs to be
 * a `"type": "vector"`, `"type": "geojson"` or `"type": "raster"` source.
 *
 * @param {ol.layer.VectorTile} layer OpenLayers layer.
 * @param {string|Object} glStyle Mapbox Style object.
 * @param {string} source `source` key or an array of layer `id`s from the
 * Mapbox Style object. When a `source` key is provided, all layers for the
 * specified source will be included in the style function. When layer `id`s
 * are provided, they must be from layers that use the same source.
 * @param {string} [path=undefined] Path of the style file. Only required when
 * a relative path is used with the `"sprite"` property of the style.
 * @return {Promise} Promise which will be resolved when the style can be used
 * for rendering.
 */
export function applyStyle(layer, glStyle, source, path) {
  return new Promise(function(resolve, reject) {

    if (typeof glStyle != 'object') {
      glStyle = JSON.parse(glStyle);
    }
    if (glStyle.version != 8) {
      reject(new Error('glStyle version 8 required.'));
    }
    var spriteScale, spriteData, spriteImageUrl;
    if (glStyle.sprite) {
      spriteScale = window.devicePixelRatio >= 1.5 ? 0.5 : 1;
      var sizeFactor = spriteScale == 0.5 ? '@2x' : '';
      var spriteUrl = toSpriteUrl(glStyle.sprite, path, sizeFactor + '.json');

      fetch(spriteUrl, {credentials: 'same-origin'})
        .then(function(response) {
          // if the response is ready return the JSON promise
          if (response.status === 200) {
            return response.json();
          } else if (sizeFactor !== '') {
            // return the JSON promise for the low-resolution sprites.
            sizeFactor = '';
            spriteUrl = toSpriteUrl(glStyle.sprite, path, '.json');
            return fetch(spriteUrl, {credentials: 'same-origin'}).then(r => r.json());
          }
        })
        .then(function(spritesJson) {
          if (spritesJson === undefined) {
            throw 'No sprites found.';
          }
          spriteData = spritesJson;
          spriteImageUrl = toSpriteUrl(glStyle.sprite, path, sizeFactor + '.png');
          onChange();
        })
        .catch(function(err) {
          console.error(err);
          reject(new Error('Sprites cannot be loaded from ' + spriteUrl));
        });
    }

    var style;
    function onChange() {
      if (!style && (!glStyle.sprite || spriteData) && (!availableFonts || availableFonts.length > 0)) {
        style = applyStyleFunction(layer, glStyle, source, undefined, spriteData, spriteImageUrl, availableFonts);
        resolve();
      } else if (style) {
        layer.setStyle(style);
      }
    }

    if (layer instanceof VectorTileLayer || layer instanceof VectorLayer) {
      try {
        var layers = glStyle.layers;
        for (var i = 0, ii = layers.length; i < ii; ++i) {
          if (typeof source == 'string' && layers[i].source == source || source.indexOf(layers[i].id) >= 0) {
            preprocess(layers[i]);
          }
        }
        onChange();
      } catch (e) {
        window.setTimeout(function() {
          reject(e);
        }, 0);
      }
    }
  });
}

function setBackground(map, layer) {
  function updateStyle() {
    var element = map.getTargetElement();
    if (!element) {
      return;
    }
    var layout = layer.layout || {};
    var paint = layer.paint || {};
    var zoom = map.getView().getZoom();
    if ('background-color' in paint) {
      var bg = glfun(paint['background-color'], {function: 'interpolated', type: 'color'})(zoom);
      if (Array.isArray(bg)) {
        bg = 'rgba(' +
            Math.round(bg[0] * 255) + ',' +
            Math.round(bg[1] * 255) + ',' +
            Math.round(bg[2] * 255) + ',' +
            (bg[3] ? bg[3] : 1) + ')';
      }
      element.style.backgroundColor = bg;
    }
    if ('background-opacity' in paint) {
      element.style.backgroundOpacity =
          glfun(paint['background-opacity'], {function: 'interpolated', type: 'number'})(zoom);
    }
    if (layout.visibility == 'none') {
      element.style.backgroundColor = '';
      element.style.backgroundOpacity = '';
    }
  }
  if (map.getTargetElement()) {
    updateStyle();
  }
  map.on(['change:resolution', 'change:target'], updateStyle);
}

/**
 * Applies properties of the Mapbox Style's first `background` layer to the map.
 * @param {ol.Map} map OpenLayers Map.
 * @param {Object} glStyle Mapbox Style object.
 */
export function applyBackground(map, glStyle) {
  glStyle.layers.some(function(l) {
    if (l.type == 'background') {
      setBackground(map, l);
      return true;
    }
  });
}

function getSourceIdByRef(layers, ref) {
  var sourceId;
  layers.some(function(layer) {
    if (layer.id == ref) {
      sourceId = layer.source;
      return true;
    }
  });
  return sourceId;
}

function processStyle(glStyle, map, baseUrl, host, path, accessToken) {
  var view = map.getView();
  if ('center' in glStyle && !view.getCenter()) {
    view.setCenter(proj.fromLonLat(glStyle.center));
  }
  if ('zoom' in glStyle && view.getZoom() === undefined) {
    view.setZoom(glStyle.zoom);
  }
  if (!view.getCenter() || view.getZoom() === undefined) {
    view.fit(view.getProjection().getExtent(), {
      nearest: true,
      size: map.getSize()
    });
  }
  if (glStyle.sprite) {
    if (glStyle.sprite.indexOf('mapbox://') == 0) {
      glStyle.sprite = baseUrl + '/sprite' + accessToken;
    } else if (glStyle.sprite.indexOf('http') != 0) {
      glStyle.sprite = (host ? (host + path) : '') + glStyle.sprite + accessToken;
    }
  }

  var glLayers = glStyle.layers;
  var geoJsonFormat = new GeoJSON();
  var layerIds = [];

  function finalizeLayer(layer) {
    if (layerIds.length > 0) {
      map.addLayer(layer);
      var setStyle = function() {
        applyStyle(layer, glStyle, layerIds, path).then(function() {
          layer.setVisible(true);
        }, function(e) {
          /*eslint no-console: ["error", { allow: ["error"] }] */
          console.error(e);
        });
      };
      if (layer.getSource()) {
        setStyle();
      } else {
        layer.once('change:source', setStyle);
      }
    }
  }

  var glLayer, glSource, glSourceId, id, layer, mapid, url;
  for (var i = 0, ii = glLayers.length; i < ii; ++i) {
    glLayer = glLayers[i];
    if (glLayer.type == 'background') {
      setBackground(map, glLayer);
    } else {
      id = glLayer.source || getSourceIdByRef(glLayers, glLayer.ref);
      if (id != glSourceId) {
        finalizeLayer(layer);
        layerIds = [];
        glSource = glStyle.sources[id];
        url = glSource.url;
        var tiles = glSource.tiles;
        if (url) {
          if (url.indexOf('mapbox://') == 0) {
            mapid = url.replace('mapbox://', '');
            tiles = ['a', 'b', 'c', 'd'].map(function(host) {
              return 'https://' + host + '.tiles.mapbox.com/v4/' + mapid +
                  '/{z}/{x}/{y}.' +
                  (glSource.type == 'vector' ? 'vector.pbf' : 'png') +
                  accessToken;
            });
          }
        }

        if (glSource.type == 'vector') {
          layer = tiles ? (function() {
            var tileGrid = tilegrid.createXYZ({
              tileSize: 512,
              maxZoom: 'maxzoom' in glSource ? glSource.maxzoom : 22,
              minZoom: glSource.minzoom
            });
            return new VectorTileLayer({
              declutter: true,
              maxResolution: tileGrid.getMinZoom() > 0 ?
                tileGrid.getResolution(tileGrid.getMinZoom()) : undefined,
              source: new VectorTileSource({
                attributions: glSource.attribution,
                format: new MVT(),
                tileGrid: tileGrid,
                urls: tiles
              }),
              visible: false,
              zIndex: i
            });
          })() : (function() {
            var layer = new VectorTileLayer({
              declutter: true,
              visible: false,
              zIndex: i
            });
            var tilejson = new TileJSON({
              url: url
            });
            var key = tilejson.on('change', function() {
              if (tilejson.getState() == 'ready') {
                var tileJSONDoc = tilejson.getTileJSON();
                var tiles = Array.isArray(tileJSONDoc.tiles) ? tileJSONDoc.tiles : [tileJSONDoc.tiles];
                for (var i = 0, ii = tiles.length; i < ii; ++i) {
                  var tile = tiles[i];
                  if (tile.indexOf('http') != 0) {
                    tiles[i] = glSource.url + tile;
                  }
                }
                var tileGrid = tilejson.getTileGrid();
                layer.setSource(new VectorTileSource({
                  attributions: tilejson.getAttributions() || tileJSONDoc.attribution,
                  format: new MVT(),
                  tileGrid: tilegrid.createXYZ({
                    minZoom: tileGrid.getMinZoom(),
                    maxZoom: tileGrid.getMaxZoom(),
                    tileSize: 512
                  }),
                  urls: tiles
                }));
                if (tileGrid.getMinZoom() > 0) {
                  layer.setMaxResolution(
                    tileGrid.getResolution(tileGrid.getMinZoom()));
                }
                observable.unByKey(key);
              }
            });
            return layer;
          })();
        } else if (glSource.type == 'raster') {
          var source;
          if (!glSource.tiles) {
            source = (function() {
              return new TileJSON({
                url: url,
                crossOrigin: 'anonymous'
              });
            })();
          } else {
            source = new XYZ({
              attributions: glSource.attribution,
              minZoom: glSource.minzoom,
              maxZoom: 'maxzoom' in glSource ? glSource.maxzoom : 22,
              tileSize: glSource.tileSize || 512,
              url: url,
              urls: glSource.tiles,
              crossOrigin: 'anonymous'
            });
          }
          source.setTileLoadFunction(function(tile, src) {
            if (src.indexOf('{bbox-epsg-3857}') != -1) {
              var bbox = source.getTileGrid().getTileCoordExtent(tile.getTileCoord());
              src = src.replace('{bbox-epsg-3857}', bbox.toString());
            }
            tile.getImage().src = src;
          });
          layer = new TileLayer({
            source: source,
            visible: glLayer.layout ? glLayer.layout.visibility !== 'none' : true
          });
        } else if (glSource.type == 'geojson') {
          var data = glSource.data;
          var features, geoJsonUrl;
          if (typeof data == 'string') {
            geoJsonUrl = withPath(data, path);
          } else {
            features = geoJsonFormat.readFeatures(data, {featureProjection: 'EPSG:3857'});
          }
          layer = new VectorLayer({
            source: new VectorSource({
              attributions: glSource.attribution,
              features: features,
              format: geoJsonFormat,
              url: geoJsonUrl
            }),
            visible: false,
            zIndex: i
          });
        }
        glSourceId = id;
      }
      layerIds.push(glLayer.id);
    }
  }
  finalizeLayer(layer);
}

/**
 * Loads and applies a Mapbox Style object to an OpenLayers Map. This includes
 * the map background, the layers, the center and the zoom.
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
 * @param {ol.Map|HTMLElement|string} map Either an existing OpenLayers Map
 * instance, or a HTML element, or the id of a HTML element that will be the
 * target of a new OpenLayers Map.
 * @param {string|Object} style JSON style object or style url pointing to a
 * Mapbox Style object. When using Mapbox APIs, the url must contain an access
 * token and look like
 * `https://api.mapbox.com/styles/v1/mapbox/bright-v9?access_token=[your_access_token_here]`.
 * When passed as JSON style object, all OpenLayers layers created by `apply()`
 * will be immediately available, but they may not have a source yet (i.e. when
 * they are defined by a TileJSON url in the Mapbox Style document). When passed
 * as style url, layers will be added to the map when the Mapbox Style document
 * is loaded and parsed.
 * @return {ol.Map} The OpenLayers Map instance that will be populated with the
 * contents described in the Mapbox Style object.
 */
export function apply(map, style) {

  var accessToken, baseUrl, host, path;
  accessToken = baseUrl = host = path = '';

  if (!(map instanceof CanvasMap)) {
    map = new CanvasMap({
      target: map
    });
  }

  if (typeof style === 'string') {
    var parts = style.match(spriteRegEx);
    if (parts) {
      baseUrl = parts[1];
      accessToken = parts.length > 2 ? parts[2] : '';
    }

    fetch(style, {
      credentials: 'same-origin'
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(glStyle) {
        var a = document.createElement('A');
        a.href = style;
        path = a.pathname.split('/').slice(0, -1).join('/') + '/';
        host = style.substr(0, style.indexOf(path));

        processStyle(glStyle, map, baseUrl, host, path, accessToken);
      })
      .catch(function(err) {
        console.error(err);
        throw new Error('Could not load ' + style);
      });
  } else {
    processStyle(style, map);
  }
  return map;
}
