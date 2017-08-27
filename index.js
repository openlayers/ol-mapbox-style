/*
ol-mapbox-style - Use Mapbox Style objects with OpenLayers
Copyright 2016-present Boundless Spatial, Inc.
License: https://raw.githubusercontent.com/boundlessgeo/ol-mapbox-gl-style/master/LICENSE.md
*/

import glfun from '@mapbox/mapbox-gl-style-spec/function';
import mb2css from 'mapbox-to-css-font';
import applyStyleFunction from 'mapbox-to-ol-style';
import WebFont from 'webfontloader';
import proj from 'ol/proj';
import tilegrid from 'ol/tilegrid';
import Map from 'ol/map';
import GeoJSON from 'ol/format/geojson';
import MVT from 'ol/format/mvt';
import Observable from 'ol/observable';
import TileLayer from 'ol/layer/tile';
import VectorLayer from 'ol/layer/vector';
import VectorTileLayer from 'ol/layer/vectortile';
import TileJSON from 'ol/source/tilejson';
import VectorSource from 'ol/source/vector';
import VectorTileSource from 'ol/source/vectortile';
import XYZ from 'ol/source/xyz';

var availableFonts;

function loadFont(fonts, onChange) {
  if (!Array.isArray(fonts)) {
    var stops = fonts.stops;
    if (stops) {
      for (var i = 0, ii = stops.length; i < ii; ++i) {
        loadFont(stops[i][1], onChange);
      }
    }
    return;
  }
  var families = fonts.map(function(font) {
    return mb2css(font, 1).split(' 1px ')[1];
  });
  WebFont.load({
    google: {
      families: families
    },
    fontactive: function(family) {
      var index = families.indexOf(family);
      if (index > -1) {
        var font = families[index];
        if (!availableFonts) {
          availableFonts = [];
        }
        if (availableFonts.indexOf(font) == -1) {
          availableFonts.push(families[index]);
          onChange();
        }
      }
    },
    inactive: function() {
      onChange();
    },
    timeout: 1500
  });
}

var defaultFont = ['Open Sans Regular', 'Arial Unicode MS Regular'];

function preprocess(layer, onChange) {
  if ('layout' in layer && 'text-field' in layer.layout) {
    loadFont(layer.layout['text-font'] || defaultFont, onChange);
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
    var spriteData;
    var spriteImageUrl;
    var spriteScale;
    if (glStyle.sprite) {
      spriteScale = window.devicePixelRatio >= 1.5 ? 0.5 : 1;
      var xhr = new window.XMLHttpRequest();
      var sizeFactor = spriteScale == 0.5 ? '@2x' : '';
      var spriteUrl = toSpriteUrl(glStyle.sprite, path, sizeFactor + '.json');
      xhr.open('GET', spriteUrl);
      xhr.onload = xhr.onerror = function() {
        if (!xhr.responseText) {
          reject(new Error('Sprites cannot be loaded from ' + spriteUrl));
        }
        spriteData = JSON.parse(xhr.responseText);
        onChange();
      };
      xhr.send();
      spriteImageUrl = toSpriteUrl(glStyle.sprite, path, sizeFactor + '.png');
      var spriteImage = document.createElement('IMG');
      spriteImage.onload = function() {
        onChange();
      };
      spriteImage.src = spriteImageUrl;
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
            preprocess(layers[i], onChange);
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
    var layout = layer.layout || {};
    var paint = layer.paint || {};
    var element = map.getTargetElement();
    var zoom = map.getView().getZoom();
    if ('background-color' in paint) {
      element.style.backgroundColor =
          glfun(paint['background-color'], {function: 'piecewise-constant'})(zoom);
    }
    if ('background-opacity' in paint) {
      element.style.backgroundOpacity =
          glfun(paint['background-opacity'], {function: 'interpolated'})(zoom);
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
  if ('zoom' in glStyle && view.getZoom() == undefined) {
    view.setZoom(glStyle.zoom);
  }
  if (!('zoom' in glStyle || 'center' in glStyle)) {
    view.fit(view.getProjection().getExtent(), {
      nearest: true,
      size: map.getSize()
    });
  }
  if (glStyle.sprite) {
    if (glStyle.sprite.indexOf('mapbox://') == 0) {
      glStyle.sprite = baseUrl + '/sprite' + accessToken;
    } else if (glStyle.sprite.indexOf('http') != 0) {
      glStyle.sprite = host + path + glStyle.sprite + accessToken;
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
          layer = tiles ? new VectorTileLayer({
            source: new VectorTileSource({
              attributions: glSource.attribution,
              format: new MVT(),
              tileGrid: tilegrid.createXYZ({
                tileSize: 512,
                maxZoom: 'maxzoom' in glSource ? glSource.maxzoom : 22,
                minZoom: glSource.minzoom
              }),
              urls: tiles
            }),
            visible: false,
            zIndex: i
          }) : (function() {
            var layer = new VectorTileLayer({
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
                  if (tile.indexOf('http' != 0)) {
                    tiles[i] = glSource.url + tile;
                  }
                }
                layer.setSource(new VectorTileSource({
                  attributions: tilejson.getAttributions(),
                  format: new MVT(),
                  tileGrid: tilejson.getTileGrid(),
                  urls: tiles
                }));
                Observable.unByKey(key);
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
 * Loads and applies a Mapbox Style object to an OpenLayers Map.
 * @param {ol.Map|HTMLElement|string} map Either an existing OpenLayers Map
 * instance, or a HTML element, or the id of a HTML element that will be the
 * target of a new OpenLayers Map.
 * @param {string|Object} style JSON style object or style url pointing to a
 * Mapbox Style object. When using Mapbox APIs, the url must contain an access
 * token and look like
 * `https://api.mapbox.com/styles/v1/mapbox/bright-v9?access_token=[your_access_token_here]`.
 * @return {ol.Map} The OpenLayers Map instance that will be populated with the
 * contents described in the Mapbox Style object.
 */
export function apply(map, style) {

  var accessToken, baseUrl, host, path;

  if (!(map instanceof Map)) {
    map = new Map({
      target: map
    });
  }

  if (typeof style === 'string') {
    var parts = style.match(spriteRegEx);
    if (parts) {
      baseUrl = parts[1];
      accessToken = parts.length > 2 ? parts[2] : '';
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', style);
    var a = document.createElement('A');
    a.href = style;
    path = a.pathname.split('/').slice(0, -1).join('/') + '/';
    host = style.substr(0, style.indexOf(path));
    xhr.addEventListener('load', function() {
      var glStyle = JSON.parse(xhr.responseText);
      processStyle(glStyle, map, baseUrl, host, path, accessToken);
    });
    xhr.addEventListener('error', function() {
      throw new Error('Could not load ' + style);
    });
    xhr.send();
  } else {
    processStyle(style, map);
  }
  return map;
}
