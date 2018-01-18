(function(_g){(function(f){var r=(typeof require==='function'?require:function(name){return {"_":null,"ol/observable":ol.Observable,"ol/proj":ol.proj,"ol/tilegrid":ol.tilegrid,"ol/map":ol.Map,"ol/format/geojson":ol.format.GeoJSON,"ol/format/mvt":ol.format.MVT,"ol/layer/tile":ol.layer.Tile,"ol/layer/vector":ol.layer.Vector,"ol/layer/vectortile":ol.layer.VectorTile,"ol/source/tilejson":ol.source.TileJSON,"ol/source/vector":ol.source.Vector,"ol/source/xyz":ol.source.XYZ,"ol/source/vectortile":ol.source.VectorTile,"ol/style/style":ol.style.Style,"ol/style/fill":ol.style.Fill,"ol/style/stroke":ol.style.Stroke,"ol/style/circle":ol.style.Circle,"ol/style/icon":ol.style.Icon,"ol/style/text":ol.style.Text}[name];});if (typeof exports==='object'&&typeof module!=='undefined'){module.exports=f(r)}else if(typeof define==='function'&&define.amd){define(["_","ol/observable","ol/proj","ol/tilegrid","ol/map","ol/format/geojson","ol/format/mvt","ol/layer/tile","ol/layer/vector","ol/layer/vectortile","ol/source/tilejson","ol/source/vector","ol/source/xyz","ol/source/vectortile","ol/style/style","ol/style/fill","ol/style/stroke","ol/style/circle","ol/style/icon","ol/style/text"],f.bind(_g,r))}else{f(r)}})(function(require,define,module,exports){var _m=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
                                                                                                                                                                                                                                                                              ol-mapbox-style - Use Mapbox Style objects with OpenLayers
                                                                                                                                                                                                                                                                              Copyright 2016-present Boundless Spatial, Inc.
                                                                                                                                                                                                                                                                              License: https://raw.githubusercontent.com/boundlessgeo/ol-mapbox-gl-style/master/LICENSE.md
                                                                                                                                                                                                                                                                              */

exports.applyStyle = applyStyle;
exports.applyBackground = applyBackground;
exports.apply = apply;

var _function = require('@mapbox/mapbox-gl-style-spec/function');

var _function2 = _interopRequireDefault(_function);

var _mapboxToCssFont = require('mapbox-to-css-font');

var _mapboxToCssFont2 = _interopRequireDefault(_mapboxToCssFont);

var _mapboxToOlStyle = require('mapbox-to-ol-style');

var _mapboxToOlStyle2 = _interopRequireDefault(_mapboxToOlStyle);

var _google = require('webfont-matcher/lib/fonts/google');

var _google2 = _interopRequireDefault(_google);

var _proj = require('ol/proj');

var _proj2 = _interopRequireDefault(_proj);

var _tilegrid = require('ol/tilegrid');

var _tilegrid2 = _interopRequireDefault(_tilegrid);

var _map = require('ol/map');

var _map2 = _interopRequireDefault(_map);

var _geojson = require('ol/format/geojson');

var _geojson2 = _interopRequireDefault(_geojson);

var _mvt = require('ol/format/mvt');

var _mvt2 = _interopRequireDefault(_mvt);

var _observable = require('ol/observable');

var _observable2 = _interopRequireDefault(_observable);

var _tile = require('ol/layer/tile');

var _tile2 = _interopRequireDefault(_tile);

var _vector = require('ol/layer/vector');

var _vector2 = _interopRequireDefault(_vector);

var _vectortile = require('ol/layer/vectortile');

var _vectortile2 = _interopRequireDefault(_vectortile);

var _tilejson = require('ol/source/tilejson');

var _tilejson2 = _interopRequireDefault(_tilejson);

var _vector3 = require('ol/source/vector');

var _vector4 = _interopRequireDefault(_vector3);

var _vectortile3 = require('ol/source/vectortile');

var _vectortile4 = _interopRequireDefault(_vectortile3);

var _xyz = require('ol/source/xyz');

var _xyz2 = _interopRequireDefault(_xyz);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  var googleFamilies = _google2.default.getNames();
  var families = fonts.map(function (font) {
    return (0, _mapboxToCssFont2.default)(font, 1).split(' 1px ')[1].replace(/"/g, '');
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
  return parts ? parts[1] + extension + (parts.length > 2 ? parts[2] : '') : url + extension;
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
function applyStyle(layer, glStyle, source, path) {
  return new Promise(function (resolve, reject) {

    if ((typeof glStyle === 'undefined' ? 'undefined' : _typeof(glStyle)) != 'object') {
      glStyle = JSON.parse(glStyle);
    }
    if (glStyle.version != 8) {
      reject(new Error('glStyle version 8 required.'));
    }
    var spriteScale, spriteData, spriteImageUrl;
    if (glStyle.sprite) {
      spriteScale = window.devicePixelRatio >= 1.5 ? 0.5 : 1;
      var sizeFactor = spriteScale == 0.5 ? '@2x' : '';

      var loadSprites = function loadSprites() {
        var spriteUrl = toSpriteUrl(glStyle.sprite, path, sizeFactor + '.json');
        var xhr = new window.XMLHttpRequest();
        xhr.open('GET', spriteUrl);
        xhr.onload = xhr.onerror = function () {
          if (xhr.status != 200 || !xhr.responseText) {
            if (sizeFactor != '') {
              // Fallback to low res spritesheet
              sizeFactor = '';
              loadSprites();
            } else {
              reject(new Error('Sprites cannot be loaded from ' + spriteUrl));
            }
          } else {
            spriteData = JSON.parse(xhr.responseText);
            onChange();
          }
        };
        xhr.send();
        spriteImageUrl = toSpriteUrl(glStyle.sprite, path, sizeFactor + '.png');
        onChange();
      };

      loadSprites();
    }

    var style;
    function onChange() {
      if (!style && (!glStyle.sprite || spriteData) && (!availableFonts || availableFonts.length > 0)) {
        style = (0, _mapboxToOlStyle2.default)(layer, glStyle, source, undefined, spriteData, spriteImageUrl, availableFonts);
        resolve();
      } else if (style) {
        layer.setStyle(style);
      }
    }

    if (layer instanceof _vectortile2.default || layer instanceof _vector2.default) {
      try {
        var layers = glStyle.layers;
        for (var i = 0, ii = layers.length; i < ii; ++i) {
          if (typeof source == 'string' && layers[i].source == source || source.indexOf(layers[i].id) >= 0) {
            preprocess(layers[i]);
          }
        }
        onChange();
      } catch (e) {
        window.setTimeout(function () {
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
      var bg = (0, _function2.default)(paint['background-color'], { function: 'interpolated', type: 'color' })(zoom);
      if (Array.isArray(bg)) {
        bg = 'rgba(' + Math.round(bg[0] * 255) + ',' + Math.round(bg[1] * 255) + ',' + Math.round(bg[2] * 255) + ',' + (bg[3] ? bg[3] : 1) + ')';
      }
      element.style.backgroundColor = bg;
    }
    if ('background-opacity' in paint) {
      element.style.backgroundOpacity = (0, _function2.default)(paint['background-opacity'], { function: 'interpolated', type: 'number' })(zoom);
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
function applyBackground(map, glStyle) {
  glStyle.layers.some(function (l) {
    if (l.type == 'background') {
      setBackground(map, l);
      return true;
    }
  });
}

function getSourceIdByRef(layers, ref) {
  var sourceId;
  layers.some(function (layer) {
    if (layer.id == ref) {
      sourceId = layer.source;
      return true;
    }
  });
  return sourceId;
}

var hasView = true;
function processStyle(glStyle, map, baseUrl, host, path, accessToken) {
  var view = map.getView();
  if ('center' in glStyle && !hasView) {
    view.setCenter(_proj2.default.fromLonLat(glStyle.center));
  }
  if ('zoom' in glStyle && !hasView) {
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
      glStyle.sprite = (host ? host + path : '') + glStyle.sprite + accessToken;
    }
  }

  var glLayers = glStyle.layers;
  var geoJsonFormat = new _geojson2.default();
  var layerIds = [];

  function finalizeLayer(layer) {
    if (layerIds.length > 0) {
      map.addLayer(layer);
      var setStyle = function setStyle() {
        applyStyle(layer, glStyle, layerIds, path).then(function () {
          layer.setVisible(true);
        }, function (e) {
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
            tiles = ['a', 'b', 'c', 'd'].map(function (host) {
              return 'https://' + host + '.tiles.mapbox.com/v4/' + mapid + '/{z}/{x}/{y}.' + (glSource.type == 'vector' ? 'vector.pbf' : 'png') + accessToken;
            });
          }
        }

        if (glSource.type == 'vector') {
          layer = tiles ? new _vectortile2.default({
            declutter: true,
            source: new _vectortile4.default({
              attributions: glSource.attribution,
              format: new _mvt2.default(),
              tileGrid: _tilegrid2.default.createXYZ({
                tileSize: 512,
                maxZoom: 'maxzoom' in glSource ? glSource.maxzoom : 22,
                minZoom: glSource.minzoom
              }),
              urls: tiles
            }),
            visible: false,
            zIndex: i
          }) : function () {
            var layer = new _vectortile2.default({
              declutter: true,
              visible: false,
              zIndex: i
            });
            var tilejson = new _tilejson2.default({
              url: url
            });
            var key = tilejson.on('change', function () {
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
                layer.setSource(new _vectortile4.default({
                  attributions: tilejson.getAttributions(),
                  format: new _mvt2.default(),
                  tileGrid: _tilegrid2.default.createXYZ({
                    minZoom: tileGrid.getMinZoom(),
                    maxZoom: tileGrid.getMaxZoom(),
                    tileSize: 512
                  }),
                  urls: tiles
                }));
                _observable2.default.unByKey(key);
              }
            });
            return layer;
          }();
        } else if (glSource.type == 'raster') {
          var source;
          if (!glSource.tiles) {
            source = function () {
              return new _tilejson2.default({
                url: url,
                crossOrigin: 'anonymous'
              });
            }();
          } else {
            source = new _xyz2.default({
              attributions: glSource.attribution,
              minZoom: glSource.minzoom,
              maxZoom: 'maxzoom' in glSource ? glSource.maxzoom : 22,
              tileSize: glSource.tileSize || 512,
              url: url,
              urls: glSource.tiles,
              crossOrigin: 'anonymous'
            });
          }
          source.setTileLoadFunction(function (tile, src) {
            if (src.indexOf('{bbox-epsg-3857}') != -1) {
              var bbox = source.getTileGrid().getTileCoordExtent(tile.getTileCoord());
              src = src.replace('{bbox-epsg-3857}', bbox.toString());
            }
            tile.getImage().src = src;
          });
          layer = new _tile2.default({
            source: source,
            visible: glLayer.layout ? glLayer.layout.visibility !== 'none' : true
          });
        } else if (glSource.type == 'geojson') {
          var data = glSource.data;
          var features, geoJsonUrl;
          if (typeof data == 'string') {
            geoJsonUrl = withPath(data, path);
          } else {
            features = geoJsonFormat.readFeatures(data, { featureProjection: 'EPSG:3857' });
          }
          layer = new _vector2.default({
            source: new _vector4.default({
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
 * as style url, layers will be added to the map when the Mapbox Style docukment
 * is loaded and parsed.
 * @return {ol.Map} The OpenLayers Map instance that will be populated with the
 * contents described in the Mapbox Style object.
 */
function apply(map, style) {

  var accessToken, baseUrl, host, path;
  accessToken = baseUrl = host = path = '';

  if (!(map instanceof _map2.default)) {
    hasView = false;
    map = new _map2.default({
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
    xhr.addEventListener('load', function () {
      var glStyle = JSON.parse(xhr.responseText);
      processStyle(glStyle, map, baseUrl, host, path, accessToken);
    });
    xhr.addEventListener('error', function () {
      throw new Error('Could not load ' + style);
    });
    xhr.send();
  } else {
    processStyle(style, map);
  }
  return map;
}

},{"@mapbox/mapbox-gl-style-spec/function":4,"mapbox-to-css-font":10,"mapbox-to-ol-style":11,"ol/format/geojson":"ol/format/geojson","ol/format/mvt":"ol/format/mvt","ol/layer/tile":"ol/layer/tile","ol/layer/vector":"ol/layer/vector","ol/layer/vectortile":"ol/layer/vectortile","ol/map":"ol/map","ol/observable":"ol/observable","ol/proj":"ol/proj","ol/source/tilejson":"ol/source/tilejson","ol/source/vector":"ol/source/vector","ol/source/vectortile":"ol/source/vectortile","ol/source/xyz":"ol/source/xyz","ol/tilegrid":"ol/tilegrid","webfont-matcher/lib/fonts/google":46}],2:[function(require,module,exports){
'use strict';

module.exports = createFilter;

var types = ['Unknown', 'Point', 'LineString', 'Polygon'];

/**
 * Given a filter expressed as nested arrays, return a new function
 * that evaluates whether a given feature (with a .properties or .tags property)
 * passes its test.
 *
 * @private
 * @param {Array} filter mapbox gl filter
 * @returns {Function} filter-evaluating function
 */
function createFilter(filter) {
    return new Function('f', 'var p = (f && f.properties || {}); return ' + compile(filter));
}

function compile(filter) {
    if (!filter) return 'true';
    var op = filter[0];
    if (filter.length <= 1) return op === 'any' ? 'false' : 'true';
    var str = op === '==' ? compileComparisonOp(filter[1], filter[2], '===', false) : op === '!=' ? compileComparisonOp(filter[1], filter[2], '!==', false) : op === '<' || op === '>' || op === '<=' || op === '>=' ? compileComparisonOp(filter[1], filter[2], op, true) : op === 'any' ? compileLogicalOp(filter.slice(1), '||') : op === 'all' ? compileLogicalOp(filter.slice(1), '&&') : op === 'none' ? compileNegation(compileLogicalOp(filter.slice(1), '||')) : op === 'in' ? compileInOp(filter[1], filter.slice(2)) : op === '!in' ? compileNegation(compileInOp(filter[1], filter.slice(2))) : op === 'has' ? compileHasOp(filter[1]) : op === '!has' ? compileNegation(compileHasOp(filter[1])) : 'true';
    return '(' + str + ')';
}

function compilePropertyReference(property) {
    var ref = property === '$type' ? 'f.type' : property === '$id' ? 'f.id' : 'p[' + JSON.stringify(property) + ']';
    return ref;
}

function compileComparisonOp(property, value, op, checkType) {
    var left = compilePropertyReference(property);
    var right = property === '$type' ? types.indexOf(value) : JSON.stringify(value);
    return (checkType ? 'typeof ' + left + '=== typeof ' + right + '&&' : '') + left + op + right;
}

function compileLogicalOp(expressions, op) {
    return expressions.map(compile).join(op);
}

function compileInOp(property, values) {
    if (property === '$type') values = values.map(function (value) {
        return types.indexOf(value);
    });
    var left = JSON.stringify(values.sort(compare));
    var right = compilePropertyReference(property);

    if (values.length <= 200) return left + '.indexOf(' + right + ') !== -1';

    return '' + ('function(v, a, i, j) {' + 'while (i <= j) { var m = (i + j) >> 1;' + '    if (a[m] === v) return true; if (a[m] > v) j = m - 1; else i = m + 1;' + '}' + 'return false; }(') + right + ', ' + left + ',0,' + (values.length - 1) + ')';
}

function compileHasOp(property) {
    return property === '$id' ? '"id" in f' : JSON.stringify(property) + ' in p';
}

function compileNegation(expression) {
    return '!(' + expression + ')';
}

// Comparison function to sort numbers and strings
function compare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

},{}],3:[function(require,module,exports){
"use strict";

// Constants
var Xn = 0.950470,
    // D65 standard referent
Yn = 1,
    Zn = 1.088830,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1,
    deg2rad = Math.PI / 180,
    rad2deg = 180 / Math.PI;

// Utilities
function xyz2lab(t) {
    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
    return t > t1 ? t * t * t : t2 * (t - t0);
}

function xyz2rgb(x) {
    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2xyz(x) {
    x /= 255;
    return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

// LAB
function rgbToLab(rgbColor) {
    var b = rgb2xyz(rgbColor[0]),
        a = rgb2xyz(rgbColor[1]),
        l = rgb2xyz(rgbColor[2]),
        x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn),
        y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.0721750 * l) / Yn),
        z = xyz2lab((0.0193339 * b + 0.1191920 * a + 0.9503041 * l) / Zn);

    return [116 * y - 16, 500 * (x - y), 200 * (y - z), rgbColor[3]];
}

function labToRgb(labColor) {
    var y = (labColor[0] + 16) / 116,
        x = isNaN(labColor[1]) ? y : y + labColor[1] / 500,
        z = isNaN(labColor[2]) ? y : y - labColor[2] / 200;
    y = Yn * lab2xyz(y);
    x = Xn * lab2xyz(x);
    z = Zn * lab2xyz(z);
    return [xyz2rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
    xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z), xyz2rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z), labColor[3]];
}

// HCL
function rgbToHcl(rgbColor) {
    var labColor = rgbToLab(rgbColor);
    var l = labColor[0],
        a = labColor[1],
        b = labColor[2];
    var h = Math.atan2(b, a) * rad2deg;
    return [h < 0 ? h + 360 : h, Math.sqrt(a * a + b * b), l, rgbColor[3]];
}

function hclToRgb(hclColor) {
    var h = hclColor[0] * deg2rad,
        c = hclColor[1],
        l = hclColor[2];
    return labToRgb([l, Math.cos(h) * c, Math.sin(h) * c, hclColor[3]]);
}

module.exports = {
    lab: {
        forward: rgbToLab,
        reverse: labToRgb
    },
    hcl: {
        forward: rgbToHcl,
        reverse: hclToRgb
    }
};

},{}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var colorSpaces = require('./color_spaces');
var parseColor = require('../util/parse_color');
var extend = require('../util/extend');
var getType = require('../util/get_type');
var interpolate = require('../util/interpolate');

function identityFunction(x) {
    return x;
}

function createFunction(parameters, propertySpec) {
    var isColor = propertySpec.type === 'color';

    var fun = void 0;

    if (!isFunctionDefinition(parameters)) {
        if (isColor && parameters) {
            parameters = parseColor(parameters);
        }
        fun = function fun() {
            return parameters;
        };
        fun.isFeatureConstant = true;
        fun.isZoomConstant = true;
    } else {
        var zoomAndFeatureDependent = parameters.stops && _typeof(parameters.stops[0][0]) === 'object';
        var featureDependent = zoomAndFeatureDependent || parameters.property !== undefined;
        var zoomDependent = zoomAndFeatureDependent || !featureDependent;
        var type = parameters.type || (propertySpec.function === 'interpolated' ? 'exponential' : 'interval');

        if (isColor) {
            parameters = extend({}, parameters);

            if (parameters.stops) {
                parameters.stops = parameters.stops.map(function (stop) {
                    return [stop[0], parseColor(stop[1])];
                });
            }

            if (parameters.default) {
                parameters.default = parseColor(parameters.default);
            } else {
                parameters.default = parseColor(propertySpec.default);
            }
        }

        var innerFun = void 0;
        var hashedStops = void 0;
        var categoricalKeyType = void 0;
        if (type === 'exponential') {
            innerFun = evaluateExponentialFunction;
        } else if (type === 'interval') {
            innerFun = evaluateIntervalFunction;
        } else if (type === 'categorical') {
            innerFun = evaluateCategoricalFunction;

            // For categorical functions, generate an Object as a hashmap of the stops for fast searching
            hashedStops = Object.create(null);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = parameters.stops[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var stop = _step.value;

                    hashedStops[stop[0]] = stop[1];
                }

                // Infer key type based on first stop key-- used to encforce strict type checking later
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            categoricalKeyType = _typeof(parameters.stops[0][0]);
        } else if (type === 'identity') {
            innerFun = evaluateIdentityFunction;
        } else {
            throw new Error('Unknown function type "' + type + '"');
        }

        var outputFunction = void 0;

        // If we're interpolating colors in a color system other than RGBA,
        // first translate all stop values to that color system, then interpolate
        // arrays as usual. The `outputFunction` option lets us then translate
        // the result of that interpolation back into RGBA.
        if (parameters.colorSpace && parameters.colorSpace !== 'rgb') {
            if (colorSpaces[parameters.colorSpace]) {
                var colorspace = colorSpaces[parameters.colorSpace];
                // Avoid mutating the parameters value
                parameters = JSON.parse(JSON.stringify(parameters));
                for (var s = 0; s < parameters.stops.length; s++) {
                    parameters.stops[s] = [parameters.stops[s][0], colorspace.forward(parameters.stops[s][1])];
                }
                outputFunction = colorspace.reverse;
            } else {
                throw new Error('Unknown color space: ' + parameters.colorSpace);
            }
        } else {
            outputFunction = identityFunction;
        }

        if (zoomAndFeatureDependent) {
            var featureFunctions = {};
            var zoomStops = [];
            for (var _s = 0; _s < parameters.stops.length; _s++) {
                var _stop = parameters.stops[_s];
                var zoom = _stop[0].zoom;
                if (featureFunctions[zoom] === undefined) {
                    featureFunctions[zoom] = {
                        zoom: zoom,
                        type: parameters.type,
                        property: parameters.property,
                        default: parameters.default,
                        stops: []
                    };
                    zoomStops.push(zoom);
                }
                featureFunctions[zoom].stops.push([_stop[0].value, _stop[1]]);
            }

            var featureFunctionStops = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = zoomStops[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var z = _step2.value;

                    featureFunctionStops.push([featureFunctions[z].zoom, createFunction(featureFunctions[z], propertySpec)]);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            fun = function fun(zoom, feature) {
                return outputFunction(evaluateExponentialFunction({
                    stops: featureFunctionStops,
                    base: parameters.base
                }, propertySpec, zoom)(zoom, feature));
            };
            fun.isFeatureConstant = false;
            fun.isZoomConstant = false;
        } else if (zoomDependent) {
            fun = function fun(zoom) {
                return outputFunction(innerFun(parameters, propertySpec, zoom, hashedStops, categoricalKeyType));
            };
            fun.isFeatureConstant = true;
            fun.isZoomConstant = false;
        } else {
            fun = function fun(zoom, feature) {
                var value = feature[parameters.property];
                if (value === undefined) {
                    return coalesce(parameters.default, propertySpec.default);
                }
                return outputFunction(innerFun(parameters, propertySpec, value, hashedStops, categoricalKeyType));
            };
            fun.isFeatureConstant = false;
            fun.isZoomConstant = true;
        }
    }

    return fun;
}

function coalesce(a, b, c) {
    if (a !== undefined) return a;
    if (b !== undefined) return b;
    if (c !== undefined) return c;
}

function evaluateCategoricalFunction(parameters, propertySpec, input, hashedStops, keyType) {
    var evaluated = (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === keyType ? hashedStops[input] : undefined; // Enforce strict typing on input
    return coalesce(evaluated, parameters.default, propertySpec.default);
}

function evaluateIntervalFunction(parameters, propertySpec, input) {
    // Edge cases
    if (getType(input) !== 'number') return coalesce(parameters.default, propertySpec.default);
    var n = parameters.stops.length;
    if (n === 1) return parameters.stops[0][1];
    if (input <= parameters.stops[0][0]) return parameters.stops[0][1];
    if (input >= parameters.stops[n - 1][0]) return parameters.stops[n - 1][1];

    var index = findStopLessThanOrEqualTo(parameters.stops, input);

    return parameters.stops[index][1];
}

function evaluateExponentialFunction(parameters, propertySpec, input) {
    var base = parameters.base !== undefined ? parameters.base : 1;

    // Edge cases
    if (getType(input) !== 'number') return coalesce(parameters.default, propertySpec.default);
    var n = parameters.stops.length;
    if (n === 1) return parameters.stops[0][1];
    if (input <= parameters.stops[0][0]) return parameters.stops[0][1];
    if (input >= parameters.stops[n - 1][0]) return parameters.stops[n - 1][1];

    var index = findStopLessThanOrEqualTo(parameters.stops, input);
    var t = interpolationFactor(input, base, parameters.stops[index][0], parameters.stops[index + 1][0]);

    var outputLower = parameters.stops[index][1];
    var outputUpper = parameters.stops[index + 1][1];
    var interp = interpolate[propertySpec.type] || identityFunction;

    if (typeof outputLower === 'function') {
        return function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var evaluatedLower = outputLower.apply(undefined, args);
            var evaluatedUpper = outputUpper.apply(undefined, args);
            // Special case for fill-outline-color, which has no spec default.
            if (evaluatedLower === undefined || evaluatedUpper === undefined) {
                return undefined;
            }
            return interp(evaluatedLower, evaluatedUpper, t);
        };
    }

    return interp(outputLower, outputUpper, t);
}

function evaluateIdentityFunction(parameters, propertySpec, input) {
    if (propertySpec.type === 'color') {
        input = parseColor(input);
    } else if (getType(input) !== propertySpec.type && (propertySpec.type !== 'enum' || !propertySpec.values[input])) {
        input = undefined;
    }
    return coalesce(input, parameters.default, propertySpec.default);
}

/**
 * Returns the index of the last stop <= input, or 0 if it doesn't exist.
 *
 * @private
 */
function findStopLessThanOrEqualTo(stops, input) {
    var n = stops.length;
    var lowerIndex = 0;
    var upperIndex = n - 1;
    var currentIndex = 0;
    var currentValue = void 0,
        upperValue = void 0;

    while (lowerIndex <= upperIndex) {
        currentIndex = Math.floor((lowerIndex + upperIndex) / 2);
        currentValue = stops[currentIndex][0];
        upperValue = stops[currentIndex + 1][0];
        if (input === currentValue || input > currentValue && input < upperValue) {
            // Search complete
            return currentIndex;
        } else if (currentValue < input) {
            lowerIndex = currentIndex + 1;
        } else if (currentValue > input) {
            upperIndex = currentIndex - 1;
        }
    }

    return Math.max(currentIndex - 1, 0);
}

function isFunctionDefinition(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && (value.stops || value.type === 'identity');
}

/**
 * Returns a ratio that can be used to interpolate between exponential function
 * stops.
 *
 * How it works:
 * Two consecutive stop values define a (scaled and shifted) exponential
 * function `f(x) = a * base^x + b`, where `base` is the user-specified base,
 * and `a` and `b` are constants affording sufficient degrees of freedom to fit
 * the function to the given stops.
 *
 * Here's a bit of algebra that lets us compute `f(x)` directly from the stop
 * values without explicitly solving for `a` and `b`:
 *
 * First stop value: `f(x0) = y0 = a * base^x0 + b`
 * Second stop value: `f(x1) = y1 = a * base^x1 + b`
 * => `y1 - y0 = a(base^x1 - base^x0)`
 * => `a = (y1 - y0)/(base^x1 - base^x0)`
 *
 * Desired value: `f(x) = y = a * base^x + b`
 * => `f(x) = y0 + a * (base^x - base^x0)`
 *
 * From the above, we can replace the `a` in `a * (base^x - base^x0)` and do a
 * little algebra:
 * ```
 * a * (base^x - base^x0) = (y1 - y0)/(base^x1 - base^x0) * (base^x - base^x0)
 *                     = (y1 - y0) * (base^x - base^x0) / (base^x1 - base^x0)
 * ```
 *
 * If we let `(base^x - base^x0) / (base^x1 base^x0)`, then we have
 * `f(x) = y0 + (y1 - y0) * ratio`.  In other words, `ratio` may be treated as
 * an interpolation factor between the two stops' output values.
 *
 * (Note: a slightly different form for `ratio`,
 * `(base^(x-x0) - 1) / (base^(x1-x0) - 1) `, is equivalent, but requires fewer
 * expensive `Math.pow()` operations.)
 *
 * @private
*/
function interpolationFactor(input, base, lowerValue, upperValue) {
    var difference = upperValue - lowerValue;
    var progress = input - lowerValue;

    if (difference === 0) {
        return 0;
    } else if (base === 1) {
        return progress / difference;
    } else {
        return (Math.pow(base, progress) - 1) / (Math.pow(base, difference) - 1);
    }
}

module.exports = createFunction;
module.exports.isFunctionDefinition = isFunctionDefinition;
module.exports.interpolationFactor = interpolationFactor;
module.exports.findStopLessThanOrEqualTo = findStopLessThanOrEqualTo;

},{"../util/extend":5,"../util/get_type":6,"../util/interpolate":7,"../util/parse_color":8,"./color_spaces":3}],5:[function(require,module,exports){
"use strict";

module.exports = function (output) {
    for (var _len = arguments.length, inputs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        inputs[_key - 1] = arguments[_key];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var input = _step.value;

            for (var k in input) {
                output[k] = input[k];
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return output;
};

},{}],6:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function getType(val) {
    if (val instanceof Number) {
        return 'number';
    } else if (val instanceof String) {
        return 'string';
    } else if (val instanceof Boolean) {
        return 'boolean';
    } else if (Array.isArray(val)) {
        return 'array';
    } else if (val === null) {
        return 'null';
    } else {
        return typeof val === 'undefined' ? 'undefined' : _typeof(val);
    }
};

},{}],7:[function(require,module,exports){
"use strict";

module.exports = interpolate;

function interpolate(a, b, t) {
    return a * (1 - t) + b * t;
}

interpolate.number = interpolate;

interpolate.vec2 = function (from, to, t) {
    return [interpolate(from[0], to[0], t), interpolate(from[1], to[1], t)];
};

/*
 * Interpolate between two colors given as 4-element arrays.
 *
 * @param {Color} from
 * @param {Color} to
 * @param {number} t interpolation factor between 0 and 1
 * @returns {Color} interpolated color
 */
interpolate.color = function (from, to, t) {
    return [interpolate(from[0], to[0], t), interpolate(from[1], to[1], t), interpolate(from[2], to[2], t), interpolate(from[3], to[3], t)];
};

interpolate.array = function (from, to, t) {
    return from.map(function (d, i) {
        return interpolate(d, to[i], t);
    });
};

},{}],8:[function(require,module,exports){
'use strict';

var parseColorString = require('csscolorparser').parseCSSColor;

module.exports = function parseColor(input) {
    if (typeof input === 'string') {
        var rgba = parseColorString(input);
        if (!rgba) {
            return undefined;
        }

        // GL expects all components to be in the range [0, 1] and to be
        // multipled by the alpha value.
        return [rgba[0] / 255 * rgba[3], rgba[1] / 255 * rgba[3], rgba[2] / 255 * rgba[3], rgba[3]];
    } else if (Array.isArray(input)) {
        return input;
    } else {
        return undefined;
    }
};

},{"csscolorparser":9}],9:[function(require,module,exports){
"use strict";

// (c) Dean McNamee <dean@gmail.com>, 2012.
//
// https://github.com/deanm/css-color-parser-js
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
// IN THE SOFTWARE.

// http://www.w3.org/TR/css3-color/
var kCSSColorTable = {
  "transparent": [0, 0, 0, 0], "aliceblue": [240, 248, 255, 1],
  "antiquewhite": [250, 235, 215, 1], "aqua": [0, 255, 255, 1],
  "aquamarine": [127, 255, 212, 1], "azure": [240, 255, 255, 1],
  "beige": [245, 245, 220, 1], "bisque": [255, 228, 196, 1],
  "black": [0, 0, 0, 1], "blanchedalmond": [255, 235, 205, 1],
  "blue": [0, 0, 255, 1], "blueviolet": [138, 43, 226, 1],
  "brown": [165, 42, 42, 1], "burlywood": [222, 184, 135, 1],
  "cadetblue": [95, 158, 160, 1], "chartreuse": [127, 255, 0, 1],
  "chocolate": [210, 105, 30, 1], "coral": [255, 127, 80, 1],
  "cornflowerblue": [100, 149, 237, 1], "cornsilk": [255, 248, 220, 1],
  "crimson": [220, 20, 60, 1], "cyan": [0, 255, 255, 1],
  "darkblue": [0, 0, 139, 1], "darkcyan": [0, 139, 139, 1],
  "darkgoldenrod": [184, 134, 11, 1], "darkgray": [169, 169, 169, 1],
  "darkgreen": [0, 100, 0, 1], "darkgrey": [169, 169, 169, 1],
  "darkkhaki": [189, 183, 107, 1], "darkmagenta": [139, 0, 139, 1],
  "darkolivegreen": [85, 107, 47, 1], "darkorange": [255, 140, 0, 1],
  "darkorchid": [153, 50, 204, 1], "darkred": [139, 0, 0, 1],
  "darksalmon": [233, 150, 122, 1], "darkseagreen": [143, 188, 143, 1],
  "darkslateblue": [72, 61, 139, 1], "darkslategray": [47, 79, 79, 1],
  "darkslategrey": [47, 79, 79, 1], "darkturquoise": [0, 206, 209, 1],
  "darkviolet": [148, 0, 211, 1], "deeppink": [255, 20, 147, 1],
  "deepskyblue": [0, 191, 255, 1], "dimgray": [105, 105, 105, 1],
  "dimgrey": [105, 105, 105, 1], "dodgerblue": [30, 144, 255, 1],
  "firebrick": [178, 34, 34, 1], "floralwhite": [255, 250, 240, 1],
  "forestgreen": [34, 139, 34, 1], "fuchsia": [255, 0, 255, 1],
  "gainsboro": [220, 220, 220, 1], "ghostwhite": [248, 248, 255, 1],
  "gold": [255, 215, 0, 1], "goldenrod": [218, 165, 32, 1],
  "gray": [128, 128, 128, 1], "green": [0, 128, 0, 1],
  "greenyellow": [173, 255, 47, 1], "grey": [128, 128, 128, 1],
  "honeydew": [240, 255, 240, 1], "hotpink": [255, 105, 180, 1],
  "indianred": [205, 92, 92, 1], "indigo": [75, 0, 130, 1],
  "ivory": [255, 255, 240, 1], "khaki": [240, 230, 140, 1],
  "lavender": [230, 230, 250, 1], "lavenderblush": [255, 240, 245, 1],
  "lawngreen": [124, 252, 0, 1], "lemonchiffon": [255, 250, 205, 1],
  "lightblue": [173, 216, 230, 1], "lightcoral": [240, 128, 128, 1],
  "lightcyan": [224, 255, 255, 1], "lightgoldenrodyellow": [250, 250, 210, 1],
  "lightgray": [211, 211, 211, 1], "lightgreen": [144, 238, 144, 1],
  "lightgrey": [211, 211, 211, 1], "lightpink": [255, 182, 193, 1],
  "lightsalmon": [255, 160, 122, 1], "lightseagreen": [32, 178, 170, 1],
  "lightskyblue": [135, 206, 250, 1], "lightslategray": [119, 136, 153, 1],
  "lightslategrey": [119, 136, 153, 1], "lightsteelblue": [176, 196, 222, 1],
  "lightyellow": [255, 255, 224, 1], "lime": [0, 255, 0, 1],
  "limegreen": [50, 205, 50, 1], "linen": [250, 240, 230, 1],
  "magenta": [255, 0, 255, 1], "maroon": [128, 0, 0, 1],
  "mediumaquamarine": [102, 205, 170, 1], "mediumblue": [0, 0, 205, 1],
  "mediumorchid": [186, 85, 211, 1], "mediumpurple": [147, 112, 219, 1],
  "mediumseagreen": [60, 179, 113, 1], "mediumslateblue": [123, 104, 238, 1],
  "mediumspringgreen": [0, 250, 154, 1], "mediumturquoise": [72, 209, 204, 1],
  "mediumvioletred": [199, 21, 133, 1], "midnightblue": [25, 25, 112, 1],
  "mintcream": [245, 255, 250, 1], "mistyrose": [255, 228, 225, 1],
  "moccasin": [255, 228, 181, 1], "navajowhite": [255, 222, 173, 1],
  "navy": [0, 0, 128, 1], "oldlace": [253, 245, 230, 1],
  "olive": [128, 128, 0, 1], "olivedrab": [107, 142, 35, 1],
  "orange": [255, 165, 0, 1], "orangered": [255, 69, 0, 1],
  "orchid": [218, 112, 214, 1], "palegoldenrod": [238, 232, 170, 1],
  "palegreen": [152, 251, 152, 1], "paleturquoise": [175, 238, 238, 1],
  "palevioletred": [219, 112, 147, 1], "papayawhip": [255, 239, 213, 1],
  "peachpuff": [255, 218, 185, 1], "peru": [205, 133, 63, 1],
  "pink": [255, 192, 203, 1], "plum": [221, 160, 221, 1],
  "powderblue": [176, 224, 230, 1], "purple": [128, 0, 128, 1],
  "rebeccapurple": [102, 51, 153, 1],
  "red": [255, 0, 0, 1], "rosybrown": [188, 143, 143, 1],
  "royalblue": [65, 105, 225, 1], "saddlebrown": [139, 69, 19, 1],
  "salmon": [250, 128, 114, 1], "sandybrown": [244, 164, 96, 1],
  "seagreen": [46, 139, 87, 1], "seashell": [255, 245, 238, 1],
  "sienna": [160, 82, 45, 1], "silver": [192, 192, 192, 1],
  "skyblue": [135, 206, 235, 1], "slateblue": [106, 90, 205, 1],
  "slategray": [112, 128, 144, 1], "slategrey": [112, 128, 144, 1],
  "snow": [255, 250, 250, 1], "springgreen": [0, 255, 127, 1],
  "steelblue": [70, 130, 180, 1], "tan": [210, 180, 140, 1],
  "teal": [0, 128, 128, 1], "thistle": [216, 191, 216, 1],
  "tomato": [255, 99, 71, 1], "turquoise": [64, 224, 208, 1],
  "violet": [238, 130, 238, 1], "wheat": [245, 222, 179, 1],
  "white": [255, 255, 255, 1], "whitesmoke": [245, 245, 245, 1],
  "yellow": [255, 255, 0, 1], "yellowgreen": [154, 205, 50, 1] };

function clamp_css_byte(i) {
  // Clamp to integer 0 .. 255.
  i = Math.round(i); // Seems to be what Chrome does (vs truncation).
  return i < 0 ? 0 : i > 255 ? 255 : i;
}

function clamp_css_float(f) {
  // Clamp to float 0.0 .. 1.0.
  return f < 0 ? 0 : f > 1 ? 1 : f;
}

function parse_css_int(str) {
  // int or percentage.
  if (str[str.length - 1] === '%') return clamp_css_byte(parseFloat(str) / 100 * 255);
  return clamp_css_byte(parseInt(str));
}

function parse_css_float(str) {
  // float or percentage.
  if (str[str.length - 1] === '%') return clamp_css_float(parseFloat(str) / 100);
  return clamp_css_float(parseFloat(str));
}

function css_hue_to_rgb(m1, m2, h) {
  if (h < 0) h += 1;else if (h > 1) h -= 1;

  if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
  if (h * 2 < 1) return m2;
  if (h * 3 < 2) return m1 + (m2 - m1) * (2 / 3 - h) * 6;
  return m1;
}

function parseCSSColor(css_str) {
  // Remove all whitespace, not compliant, but should just be more accepting.
  var str = css_str.replace(/ /g, '').toLowerCase();

  // Color keywords (and transparent) lookup.
  if (str in kCSSColorTable) return kCSSColorTable[str].slice(); // dup.

  // #abc and #abc123 syntax.
  if (str[0] === '#') {
    if (str.length === 4) {
      var iv = parseInt(str.substr(1), 16); // TODO(deanm): Stricter parsing.
      if (!(iv >= 0 && iv <= 0xfff)) return null; // Covers NaN.
      return [(iv & 0xf00) >> 4 | (iv & 0xf00) >> 8, iv & 0xf0 | (iv & 0xf0) >> 4, iv & 0xf | (iv & 0xf) << 4, 1];
    } else if (str.length === 7) {
      var iv = parseInt(str.substr(1), 16); // TODO(deanm): Stricter parsing.
      if (!(iv >= 0 && iv <= 0xffffff)) return null; // Covers NaN.
      return [(iv & 0xff0000) >> 16, (iv & 0xff00) >> 8, iv & 0xff, 1];
    }

    return null;
  }

  var op = str.indexOf('('),
      ep = str.indexOf(')');
  if (op !== -1 && ep + 1 === str.length) {
    var fname = str.substr(0, op);
    var params = str.substr(op + 1, ep - (op + 1)).split(',');
    var alpha = 1; // To allow case fallthrough.
    switch (fname) {
      case 'rgba':
        if (params.length !== 4) return null;
        alpha = parse_css_float(params.pop());
      // Fall through.
      case 'rgb':
        if (params.length !== 3) return null;
        return [parse_css_int(params[0]), parse_css_int(params[1]), parse_css_int(params[2]), alpha];
      case 'hsla':
        if (params.length !== 4) return null;
        alpha = parse_css_float(params.pop());
      // Fall through.
      case 'hsl':
        if (params.length !== 3) return null;
        var h = (parseFloat(params[0]) % 360 + 360) % 360 / 360; // 0 .. 1
        // NOTE(deanm): According to the CSS spec s/l should only be
        // percentages, but we don't bother and let float or percentage.
        var s = parse_css_float(params[1]);
        var l = parse_css_float(params[2]);
        var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
        var m1 = l * 2 - m2;
        return [clamp_css_byte(css_hue_to_rgb(m1, m2, h + 1 / 3) * 255), clamp_css_byte(css_hue_to_rgb(m1, m2, h) * 255), clamp_css_byte(css_hue_to_rgb(m1, m2, h - 1 / 3) * 255), alpha];
      default:
        return null;
    }
  }

  return null;
}

try {
  exports.parseCSSColor = parseCSSColor;
} catch (e) {}

},{}],10:[function(require,module,exports){
'use strict';

var fontWeights = {
  thin: 100,
  hairline: 100,
  'ultra-light': 100,
  'extra-light': 100,
  light: 200,
  book: 300,
  regular: 400,
  normal: 400,
  plain: 400,
  roman: 400,
  standard: 400,
  medium: 500,
  'semi-bold': 600,
  'demi-bold': 600,
  bold: 700,
  heavy: 800,
  black: 800,
  'extra-bold': 800,
  'ultra-black': 900,
  'extra-black': 900,
  'ultra-bold': 900,
  'heavy-black': 900,
  fat: 900,
  poster: 900
};
var sp = ' ';

var fontCache = {};

module.exports = function (font, size) {
  var cssData = fontCache[font];
  if (!cssData) {
    var parts = font.split(' ');
    var maybeWeight = parts[parts.length - 1].toLowerCase();
    var weight = 'normal';
    var style = 'normal';
    if (maybeWeight == 'normal' || maybeWeight == 'italic' || maybeWeight == 'oblique') {
      style = maybeWeight;
      parts.pop();
      maybeWeight = parts[parts.length - 1].toLowerCase();
    }
    for (var w in fontWeights) {
      if (maybeWeight == w || maybeWeight == w.replace('-', '') || maybeWeight == w.replace('-', ' ')) {
        weight = fontWeights[w];
        parts.pop();
        break;
      }
    }
    if (typeof maybeWeight == 'number') {
      weight = maybeWeight;
    }
    var fontFamily = parts.join(' ').replace('Klokantech Noto Sans', 'Noto Sans');
    if (fontFamily.indexOf(' ') !== -1) {
      fontFamily = '"' + fontFamily + '"';
    }
    // CSS font property: font-style font-weight font-size font-family
    cssData = fontCache[font] = [style, weight, fontFamily];
  }
  return cssData[0] + sp + cssData[1] + sp + size + 'px' + sp + cssData[2];
};

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
                                                                                                                                                                                                                                                                              mapbox-to-ol-style - Create OpenLayers style functions from Mapbox Style objects
                                                                                                                                                                                                                                                                              Copyright 2016-present Boundless Spatial, Inc.
                                                                                                                                                                                                                                                                              License: https://raw.githubusercontent.com/boundlessgeo/mapbox-to-ol-style/master/LICENSE.md
                                                                                                                                                                                                                                                                              */

exports.default = function (olLayer, glStyle, source, resolutions, spriteData, spriteImageUrl, fonts) {
  if (!resolutions) {
    resolutions = [];
    for (var res = 78271.51696402048; resolutions.length < 21; res /= 2) {
      resolutions.push(res);
    }
  }
  if ((typeof glStyle === 'undefined' ? 'undefined' : _typeof(glStyle)) == 'object') {
    // We do not want to modify the original, so we deep-clone it
    glStyle = JSON.stringify(glStyle);
  }
  glStyle = JSON.parse(glStyle);
  if (glStyle.version != 8) {
    throw new Error('glStyle version 8 required.');
  }

  var spriteImage, spriteImgSize;
  if (spriteImageUrl) {
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      spriteImage = img;
      spriteImgSize = [img.width, img.height];
      olLayer.changed();
    };
    img.src = spriteImageUrl;
  }

  var ctx = document.createElement('CANVAS').getContext('2d');
  var measureCache = {};
  function wrapText(text, font, em) {
    var key = em + ',' + font + ',' + text;
    var wrappedText = measureCache[key];
    if (!wrappedText) {
      ctx.font = font;
      var oneEm = ctx.measureText('M').width;
      var width = oneEm * em;
      var words = text.split(' ');
      var line = '';
      var lines = [];
      for (var i = 0, ii = words.length; i < ii; ++i) {
        var word = words[i];
        if (ctx.measureText(line + word).width <= width) {
          line += (line ? ' ' : '') + word;
        } else {
          if (line) {
            lines.push(line);
          }
          line = word;
        }
      }
      if (line) {
        lines.push(line);
      }
      measureCache[key] = wrappedText = lines.join('\n');
    }
    return wrappedText;
  }

  var allLayers = glStyle.layers;
  var layersBySourceLayer = {};
  var mapboxLayers = [];
  var mapboxSource;
  for (var i = 0, ii = allLayers.length; i < ii; ++i) {
    var layer = allLayers[i];
    if (!layer.layout) {
      layer.layout = {};
    }
    resolveRef(layer, glStyle);
    if (typeof source == 'string' && layer.source == source || source.indexOf(layer.id) !== -1) {
      var sourceLayer = layer['source-layer'];
      if (!mapboxSource) {
        mapboxSource = layer.source;
      }
      var layers = layersBySourceLayer[sourceLayer];
      if (!layers) {
        layers = layersBySourceLayer[sourceLayer] = [];
      }
      layers.push({
        layer: layer,
        index: i
      });
      mapboxLayers.push(layer.id);
      preprocess(layer, fonts);
    }
  }

  var textHalo = new _stroke2.default();
  var textColor = new _fill2.default();

  var iconImageCache = {};

  var styles = [];

  var styleFunction = function styleFunction(feature, resolution) {
    var properties = feature.getProperties();
    var layers = layersBySourceLayer[properties.layer];
    if (!layers) {
      return;
    }
    var zoom = resolutions.indexOf(resolution);
    if (zoom == -1) {
      zoom = getZoomForResolution(resolution, resolutions);
    }
    var type = types[feature.getGeometry().getType()];
    var f = {
      properties: properties,
      type: type
    };
    var stylesLength = -1;
    for (var i = 0, ii = layers.length; i < ii; ++i) {
      var layerData = layers[i];
      var layer = layerData.layer;
      var paint = layer.paint;
      if (paint.visibility === 'none' || 'minzoom' in layer && zoom < layer.minzoom || 'maxzoom' in layer && zoom >= layer.maxzoom) {
        continue;
      }
      if (!layer.filter || layer.filter(f)) {
        var color, opacity, fill, stroke, strokeColor, style;
        var index = layerData.index;
        if (type == 3) {
          if (!('fill-pattern' in paint) && 'fill-color' in paint) {
            opacity = paint['fill-opacity'](zoom, properties);
            color = colorWithOpacity(paint['fill-color'](zoom, properties), opacity);
            if (color) {
              ++stylesLength;
              style = styles[stylesLength];
              if (!style || !style.getFill() || style.getStroke() || style.getText()) {
                style = styles[stylesLength] = new _style2.default({
                  fill: new _fill2.default()
                });
              }
              fill = style.getFill();
              fill.setColor(color);
              style.setZIndex(index);
            }
            if ('fill-outline-color' in paint) {
              strokeColor = colorWithOpacity(paint['fill-outline-color'](zoom, properties), opacity);
            }
            if (strokeColor) {
              ++stylesLength;
              style = styles[stylesLength];
              if (!style || !style.getStroke() || style.getFill() || style.getText()) {
                style = styles[stylesLength] = new _style2.default({
                  stroke: new _stroke2.default()
                });
              }
              stroke = style.getStroke();
              stroke.setLineCap(defaults['line-cap']);
              stroke.setLineJoin(defaults['line-join']);
              stroke.setMiterLimit(defaults['line-miter-limit']);
              stroke.setColor(strokeColor);
              stroke.setWidth(1);
              stroke.setLineDash(null);
              style.setZIndex(index);
            }
          }
        }
        if (type != 1) {
          color = !('line-pattern' in paint) && 'line-color' in paint ? colorWithOpacity(paint['line-color'](zoom, properties), paint['line-opacity'](zoom, properties)) : undefined;
          var width = paint['line-width'](zoom, properties);
          if (color && width > 0) {
            ++stylesLength;
            style = styles[stylesLength];
            if (!style || !style.getStroke() || style.getFill() || style.getText()) {
              style = styles[stylesLength] = new _style2.default({
                stroke: new _stroke2.default()
              });
            }
            stroke = style.getStroke();
            stroke.setLineCap(paint['line-cap'](zoom, properties));
            stroke.setLineJoin(paint['line-join'](zoom, properties));
            stroke.setMiterLimit(paint['line-miter-limit'](zoom, properties));
            stroke.setColor(color);
            stroke.setWidth(width);
            stroke.setLineDash(paint['line-dasharray'] ? paint['line-dasharray'](zoom, properties).map(function (x) {
              return x * width;
            }) : null);
            style.setZIndex(index);
          }
        }

        var hasImage = false;
        var text = null;
        var icon, iconImg, skipLabel;
        if ((type == 1 || type == 2) && 'icon-image' in paint) {
          var iconImage = paint['icon-image'](zoom, properties);
          if (iconImage) {
            icon = fromTemplate(iconImage, properties);
            var styleGeom = undefined;
            if (spriteImage && spriteData && spriteData[icon]) {
              if (type == 2) {
                var geom = feature.getGeometry();
                // ol package and ol-debug.js only
                if (geom.getFlatMidpoint) {
                  var extent = geom.getExtent();
                  var size = Math.sqrt(Math.pow((extent[2] - extent[0]) / resolution, 2), Math.pow((extent[3] - extent[1]) / resolution, 2));
                  if (size > 150) {
                    //FIXME Do not hard-code a size of 150
                    styleGeom = new _point2.default(geom.getFlatMidpoint());
                  }
                }
              }
              if (type !== 2 || styleGeom) {
                ++stylesLength;
                style = styles[stylesLength];
                if (!style || !style.getImage() || style.getFill() || style.getStroke()) {
                  style = styles[stylesLength] = new _style2.default();
                }
                style.setGeometry(styleGeom);
                var iconSize = paint['icon-size'](zoom, properties);
                var iconColor = paint['icon-color'] !== undefined ? paint['icon-color'](zoom, properties) : null;
                var icon_cache_key = icon + '.' + iconSize;
                if (iconColor !== null) {
                  icon_cache_key += '.' + iconColor;
                }
                iconImg = iconImageCache[icon_cache_key];
                if (!iconImg) {
                  var spriteImageData = spriteData[icon];
                  if (iconColor !== null) {
                    // cut out the sprite and color it
                    color = colorWithOpacity(iconColor, 1);
                    var canvas = document.createElement('canvas');
                    canvas.width = spriteImageData.width;
                    canvas.height = spriteImageData.height;
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(spriteImage, spriteImageData.x, spriteImageData.y, spriteImageData.width, spriteImageData.height, 0, 0, spriteImageData.width, spriteImageData.height);
                    var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    for (var c = 0, cc = data.data.length; c < cc; c += 4) {
                      data.data[c] = color[0];
                      data.data[c + 1] = color[1];
                      data.data[c + 2] = color[2];
                    }
                    ctx.putImageData(data, 0, 0);
                    iconImg = iconImageCache[icon_cache_key] = new _icon2.default({
                      img: canvas,
                      imgSize: [canvas.width, canvas.height],
                      scale: iconSize / spriteImageData.pixelRatio
                    });
                  } else {
                    iconImg = iconImageCache[icon_cache_key] = new _icon2.default({
                      img: spriteImage,
                      imgSize: spriteImgSize,
                      size: [spriteImageData.width, spriteImageData.height],
                      offset: [spriteImageData.x, spriteImageData.y],
                      scale: iconSize / spriteImageData.pixelRatio
                    });
                  }
                }
                iconImg.setRotation(deg2rad(paint['icon-rotate'](zoom, properties)));
                iconImg.setOpacity(paint['icon-opacity'](zoom, properties));
                style.setImage(iconImg);
                text = style.getText();
                style.setText(undefined);
                style.setZIndex(99999 - index);
                hasImage = true;
                skipLabel = false;
              } else {
                skipLabel = true;
              }
            }
          }
        }

        if (type == 1 && 'circle-radius' in paint) {
          ++stylesLength;
          style = styles[stylesLength];
          if (!style || !style.getImage() || style.getFill() || style.getStroke()) {
            style = styles[stylesLength] = new _style2.default();
          }
          var circleRadius = paint['circle-radius'](zoom, properties);
          var circleStrokeColor = paint['circle-stroke-color'](zoom, properties);
          var circleColor = paint['circle-color'](zoom, properties);
          var circleOpacity = paint['circle-opacity'](zoom, properties);
          var circleStrokeWidth = paint['circle-stroke-width'](zoom, properties);
          var cache_key = circleRadius + '.' + circleStrokeColor + '.' + circleColor + '.' + circleOpacity + '.' + circleStrokeWidth;
          iconImg = iconImageCache[cache_key];
          if (!iconImg) {
            iconImg = new _circle2.default({
              radius: circleRadius,
              stroke: circleStrokeWidth === 0 ? undefined : new _stroke2.default({
                width: circleStrokeWidth,
                color: colorWithOpacity(circleStrokeColor, circleOpacity)
              }),
              fill: new _fill2.default({
                color: colorWithOpacity(circleColor, circleOpacity)
              })
            });
          }
          style.setImage(iconImg);
          text = style.getText();
          style.setText(undefined);
          style.setGeometry(undefined);
          style.setZIndex(99999 - index);
          hasImage = true;
        }

        var label;
        if ('text-field' in paint) {
          var textField = paint['text-field'](zoom, properties);
          label = fromTemplate(textField, properties);
        }
        if (label && !skipLabel) {
          if (!hasImage) {
            ++stylesLength;
            style = styles[stylesLength];
            if (!style || !style.getText() || style.getFill() || style.getStroke()) {
              style = styles[stylesLength] = new _style2.default();
            }
            style.setImage(undefined);
            style.setGeometry(undefined);
          }
          if (!style.getText()) {
            style.setText(text || new _text2.default());
          }
          text = style.getText();
          var textSize = paint['text-size'](zoom, properties);
          var font = (0, _mapboxToCssFont2.default)(fontMap[paint['text-font'](zoom, properties)], textSize);
          var textTransform = paint['text-transform'];
          if (textTransform == 'uppercase') {
            label = label.toUpperCase();
          } else if (textTransform == 'lowercase') {
            label = label.toLowerCase();
          }
          var wrappedLabel = type == 2 ? label : wrapText(label, font, paint['text-max-width'](zoom, properties));
          text.setText(wrappedLabel);
          text.setFont(font);
          text.setRotation(deg2rad(paint['text-rotate'](zoom, properties)));
          var textAnchor = paint['text-anchor'](zoom, properties);
          var placement = hasImage || type == 1 ? 'point' : paint['symbol-placement'](zoom, properties);
          text.setPlacement(placement);
          if (placement == 'point') {
            var textAlign = 'center';
            if (textAnchor.indexOf('left') !== -1) {
              textAlign = 'left';
            } else if (textAnchor.indexOf('right') !== -1) {
              textAlign = 'right';
            }
            text.setTextAlign(textAlign);
          } else {
            text.setTextAlign();
          }
          var textBaseline = 'middle';
          if (textAnchor.indexOf('bottom') == 0) {
            textBaseline = 'bottom';
          } else if (textAnchor.indexOf('top') == 0) {
            textBaseline = 'top';
          }
          text.setTextBaseline(textBaseline);
          var textOffset = paint['text-offset'](zoom, properties);
          text.setOffsetX(textOffset[0] * textSize);
          text.setOffsetY(textOffset[1] * textSize);
          opacity = paint['text-opacity'](zoom, properties);
          textColor.setColor(colorWithOpacity(paint['text-color'](zoom, properties), opacity));
          text.setFill(textColor);
          var haloColor = colorWithOpacity(paint['text-halo-color'](zoom, properties), opacity);
          if (haloColor) {
            textHalo.setColor(haloColor);
            textHalo.setWidth(paint['text-halo-width'](zoom, properties));
            text.setStroke(textHalo);
          } else {
            text.setStroke(undefined);
          }
          style.setZIndex(99999 - index);
        }
      }
    }

    if (stylesLength > -1) {
      styles.length = stylesLength + 1;
      return styles;
    }
  };

  olLayer.setStyle(styleFunction);
  olLayer.set('mapbox-source', mapboxSource);
  olLayer.set('mapbox-layers', mapboxLayers);
  return styleFunction;
};

var _style = require('ol/style/style');

var _style2 = _interopRequireDefault(_style);

var _fill = require('ol/style/fill');

var _fill2 = _interopRequireDefault(_fill);

var _stroke = require('ol/style/stroke');

var _stroke2 = _interopRequireDefault(_stroke);

var _icon = require('ol/style/icon');

var _icon2 = _interopRequireDefault(_icon);

var _text = require('ol/style/text');

var _text2 = _interopRequireDefault(_text);

var _circle = require('ol/style/circle');

var _circle2 = _interopRequireDefault(_circle);

var _point = require('ol/geom/point');

var _point2 = _interopRequireDefault(_point);

var _function = require('@mapbox/mapbox-gl-style-spec/function');

var _function2 = _interopRequireDefault(_function);

var _feature_filter = require('@mapbox/mapbox-gl-style-spec/feature_filter');

var _feature_filter2 = _interopRequireDefault(_feature_filter);

var _mapboxToCssFont = require('mapbox-to-css-font');

var _mapboxToCssFont2 = _interopRequireDefault(_mapboxToCssFont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var functions = {
  interpolated: ['line-miter-limit', 'fill-opacity', 'line-opacity', 'line-width', 'text-halo-width', 'text-max-width', 'text-offset', 'text-opacity', 'text-rotate', 'text-size', 'icon-opacity', 'icon-rotate', 'icon-size', 'icon-color', 'circle-radius', 'circle-opacity', 'circle-stroke-width', 'circle-color', 'circle-stroke-color', 'text-halo-color', 'text-color', 'line-color', 'fill-outline-color', 'fill-color'],
  'piecewise-constant': ['icon-image', 'line-cap', 'line-join', 'line-dasharray', 'symbol-placement', 'text-anchor', 'text-field', 'text-font']
};

var defaults = {
  'fill-opacity': 1,
  'line-cap': 'butt',
  'line-join': 'miter',
  'line-miter-limit': 2,
  'line-opacity': 1,
  'line-width': 1,
  'symbol-placement': 'point',
  'text-anchor': 'center',
  'text-color': '#000000',
  'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
  'text-halo-color': 'rgba(0, 0, 0, 0)',
  'text-halo-width': 0,
  'text-max-width': 10,
  'text-offset': [0, 0],
  'text-opacity': 1,
  'text-rotate': 0,
  'text-size': 16,
  'icon-opacity': 1,
  'icon-rotate': 0,
  'icon-size': 1,
  'circle-color': '#000000',
  'circle-stroke-color': '#000000',
  'circle-opacity': 1,
  'circle-stroke-width': 0
};

var types = {
  'Point': 1,
  'MultiPoint': 1,
  'LineString': 2,
  'MultiLineString': 2,
  'Polygon': 3,
  'MultiPolygon': 3
};

function applyDefaults(properties) {
  for (var property in defaults) {
    if (!(property in properties)) {
      properties[property] = defaults[property];
    }
  }
}

function applyLayoutToPaint(layer) {
  for (var property in layer.layout) {
    if (!(property in layer.paint)) {
      layer.paint[property] = layer.layout[property];
    }
  }
}

function convertToFunctions(properties, type) {
  for (var i = 0, ii = functions[type].length; i < ii; ++i) {
    var property = functions[type][i];
    if (property in properties) {
      var value = properties[property];
      properties[property] = (0, _function2.default)(value, {
        function: type,
        type: property.indexOf('color') !== -1 ? 'color' : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object' && value.stops && typeof value.stops[0][0] == 'number' ? 'number' : undefined
      });
    }
  }
}

var fontMap = {};

function chooseFont(fonts, availableFonts) {
  if (availableFonts) {
    var font, i, ii;
    if (!Array.isArray(fonts)) {
      var stops = fonts.stops;
      if (stops) {
        for (i = 0, ii = stops.length; i < ii; ++i) {
          chooseFont(stops[i][1], availableFonts);
        }
      }
      return;
    }
    if (!fontMap[fonts]) {
      for (i = 0, ii = fonts.length; i < ii; ++i) {
        font = fonts[i];
        if (availableFonts.indexOf(font) != -1) {
          fontMap[fonts] = font;
          break;
        }
      }
      if (!fontMap[fonts]) {
        // fallback font
        fontMap[fonts] = fonts[fonts.length - 1];
      }
    }
  } else {
    fontMap[fonts] = fonts[0];
  }
}

function preprocess(layer, fonts) {
  if (!layer.paint) {
    layer.paint = {};
  }
  if (!layer.ref) {
    applyLayoutToPaint(layer);
  }
  applyDefaults(layer.paint);
  if (layer.paint['text-field']) {
    chooseFont(layer.paint['text-font'], fonts);
  }
  if (Array.isArray(layer.filter)) {
    layer.filter = (0, _feature_filter2.default)(layer.filter);
  }
  convertToFunctions(layer.paint, 'interpolated');
  convertToFunctions(layer.paint, 'piecewise-constant');
}

function resolveRef(layer, glStyleObj) {
  if (layer.ref) {
    var layers = glStyleObj.layers;
    for (var i = 0, ii = layers.length; i < ii; ++i) {
      var refLayer = layers[i];
      if (refLayer.id == layer.ref) {
        layer.type = refLayer.type;
        layer.source = refLayer.source;
        layer['source-layer'] = refLayer['source-layer'];
        layer.minzoom = refLayer.minzoom;
        layer.maxzoom = refLayer.maxzoom;
        layer.filter = refLayer.filter;
        layer.layout = refLayer.layout;
        return;
      }
    }
  }
}

function getZoomForResolution(resolution, resolutions) {
  var candidate;
  var i = 0,
      ii = resolutions.length;
  for (; i < ii; ++i) {
    candidate = resolutions[i];
    if (candidate < resolution && i + 1 < ii) {
      var zoomFactor = resolutions[i] / resolutions[i + 1];
      return i + Math.log(resolutions[i] / resolution) / Math.log(zoomFactor);
    }
  }
  return ii - 1;
}

var colorCache = {};
function colorWithOpacity(color, opacity) {
  if (color && opacity !== undefined) {
    var colorData = colorCache[color];
    if (!colorData) {
      colorCache[color] = colorData = {
        color: [color[0] * 255 / color[3], color[1] * 255 / color[3], color[2] * 255 / color[3], color[3]],
        opacity: color[3]
      };
    }
    color = colorData.color;
    color[3] = colorData.opacity * opacity;
    if (color[3] === 0) {
      color = undefined;
    }
  }
  return color;
}

function deg2rad(degrees) {
  return degrees * Math.PI / 180;
}

var templateRegEx = /^([^]*)\{(.*)\}([^]*)$/;

function fromTemplate(text, properties) {
  var parts;
  do {
    parts = text.match(templateRegEx);
    if (parts) {
      var value = properties[parts[2]] || '';
      text = parts[1] + value + parts[3];
    }
  } while (parts);
  return text;
}

/**
 * Creates a style function from the `glStyle` object for all layers that use
 * the specified `source`, which needs to be a `"type": "vector"` or
 * `"type": "geojson"` source and applies it to the specified OpenLayers layer.
 *
 * @param {ol.layer.Vector|ol.layer.VectorTile} olLayer OpenLayers layer to
 * apply the style to. In addition to the style, the layer will get two
 * properties: `mapbox-source` will be the `id` of the `glStyle`'s source used
 * for the layer, and `mapbox-layers` will be an array of the `id`s of the
 * `glStyle`'s layers.
 * @param {string|Object} glStyle Mapbox Style object.
 * @param {string|Array<string>} source `source` key or an array of layer `id`s
 * from the Mapbox Style object. When a `source` key is provided, all layers for
 * the specified source will be included in the style function. When layer `id`s
 * are provided, they must be from layers that use the same source.
 * @param {Array<number>} [resolutions=[156543.03392804097,
 * 78271.51696402048, 39135.75848201024, 19567.87924100512, 9783.93962050256,
 * 4891.96981025128, 2445.98490512564, 1222.99245256282, 611.49622628141,
 * 305.748113140705, 152.8740565703525, 76.43702828517625, 38.21851414258813,
 * 19.109257071294063, 9.554628535647032, 4.777314267823516, 2.388657133911758,
 * 1.194328566955879, 0.5971642834779395, 0.29858214173896974,
 * 0.14929107086948487, 0.07464553543474244]]
 * Resolutions for mapping resolution to zoom level.
 * @param {Object} [spriteData=undefined] Sprite data from the url specified in
 * the Mapbox Style object's `sprite` property. Only required if a `sprite`
 * property is specified in the Mapbox Style object.
 * @param {Object} [spriteImageUrl=undefined] Sprite image url for the sprite
 * specified in the Mapbox Style object's `sprite` property. Only required if a
 * `sprite` property is specified in the Mapbox Style object.
 * @param {Array<string>} [fonts=undefined] Array of available fonts, using the
 * same font names as the Mapbox Style object. If not provided, the style
 * function will always use the first font from the font array.
 * @return {ol.style.StyleFunction} Style function for use in
 * `ol.layer.Vector` or `ol.layer.VectorTile`.
 */

},{"@mapbox/mapbox-gl-style-spec/feature_filter":2,"@mapbox/mapbox-gl-style-spec/function":4,"mapbox-to-css-font":10,"ol/geom/point":28,"ol/style/circle":"ol/style/circle","ol/style/fill":"ol/style/fill","ol/style/icon":"ol/style/icon","ol/style/stroke":"ol/style/stroke","ol/style/style":"ol/style/style","ol/style/text":"ol/style/text"}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Error object thrown when an assertion failed. This is an ECMA-262 Error,
 * extended with a `code` property.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error}
 * @constructor
 * @extends {Error}
 * @implements {oli.AssertionError}
 * @param {number} code Error code.
 */
var _ol_AssertionError_ = function _ol_AssertionError_(code) {

  var path = _index2.default.VERSION ? _index2.default.VERSION.split('-')[0] : 'latest';

  /**
   * @type {string}
   */
  this.message = 'Assertion failed. See https://openlayers.org/en/' + path + '/doc/errors/#' + code + ' for details.';

  /**
   * Error code. The meaning of the code can be found on
   * {@link https://openlayers.org/en/latest/doc/errors/} (replace `latest` with
   * the version found in the OpenLayers script's header comment if a version
   * other than the latest is used).
   * @type {number}
   * @api
   */
  this.code = code;

  this.name = 'AssertionError';
};

_index2.default.inherits(_ol_AssertionError_, Error);
exports.default = _ol_AssertionError_;

},{"./index.js":30}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assertionerror = require('./assertionerror.js');

var _assertionerror2 = _interopRequireDefault(_assertionerror);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _ol_asserts_ = {};

/**
 * @param {*} assertion Assertion we expected to be truthy.
 * @param {number} errorCode Error code.
 */
_ol_asserts_.assert = function (assertion, errorCode) {
  if (!assertion) {
    throw new _assertionerror2.default(errorCode);
  }
};
exports.default = _ol_asserts_;

},{"./assertionerror.js":12}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Objects that need to clean up after themselves.
 * @constructor
 */
var _ol_Disposable_ = function _ol_Disposable_() {};

/**
 * The object has already been disposed.
 * @type {boolean}
 * @private
 */
_ol_Disposable_.prototype.disposed_ = false;

/**
 * Clean up.
 */
_ol_Disposable_.prototype.dispose = function () {
  if (!this.disposed_) {
    this.disposed_ = true;
    this.disposeInternal();
  }
};

/**
 * Extension point for disposable objects.
 * @protected
 */
_ol_Disposable_.prototype.disposeInternal = _index2.default.nullFunction;
exports.default = _ol_Disposable_;

},{"./index.js":30}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _obj = require('./obj.js');

var _obj2 = _interopRequireDefault(_obj);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _ol_events_ = {};

/**
 * @param {ol.EventsKey} listenerObj Listener object.
 * @return {ol.EventsListenerFunctionType} Bound listener.
 */
_ol_events_.bindListener_ = function (listenerObj) {
  var boundListener = function boundListener(evt) {
    var listener = listenerObj.listener;
    var bindTo = listenerObj.bindTo || listenerObj.target;
    if (listenerObj.callOnce) {
      _ol_events_.unlistenByKey(listenerObj);
    }
    return listener.call(bindTo, evt);
  };
  listenerObj.boundListener = boundListener;
  return boundListener;
};

/**
 * Finds the matching {@link ol.EventsKey} in the given listener
 * array.
 *
 * @param {!Array<!ol.EventsKey>} listeners Array of listeners.
 * @param {!Function} listener The listener function.
 * @param {Object=} opt_this The `this` value inside the listener.
 * @param {boolean=} opt_setDeleteIndex Set the deleteIndex on the matching
 *     listener, for {@link ol.events.unlistenByKey}.
 * @return {ol.EventsKey|undefined} The matching listener object.
 * @private
 */
_ol_events_.findListener_ = function (listeners, listener, opt_this, opt_setDeleteIndex) {
  var listenerObj;
  for (var i = 0, ii = listeners.length; i < ii; ++i) {
    listenerObj = listeners[i];
    if (listenerObj.listener === listener && listenerObj.bindTo === opt_this) {
      if (opt_setDeleteIndex) {
        listenerObj.deleteIndex = i;
      }
      return listenerObj;
    }
  }
  return undefined;
};

/**
 * @param {ol.EventTargetLike} target Target.
 * @param {string} type Type.
 * @return {Array.<ol.EventsKey>|undefined} Listeners.
 */
_ol_events_.getListeners = function (target, type) {
  var listenerMap = target.ol_lm;
  return listenerMap ? listenerMap[type] : undefined;
};

/**
 * Get the lookup of listeners.  If one does not exist on the target, it is
 * created.
 * @param {ol.EventTargetLike} target Target.
 * @return {!Object.<string, Array.<ol.EventsKey>>} Map of
 *     listeners by event type.
 * @private
 */
_ol_events_.getListenerMap_ = function (target) {
  var listenerMap = target.ol_lm;
  if (!listenerMap) {
    listenerMap = target.ol_lm = {};
  }
  return listenerMap;
};

/**
 * Clean up all listener objects of the given type.  All properties on the
 * listener objects will be removed, and if no listeners remain in the listener
 * map, it will be removed from the target.
 * @param {ol.EventTargetLike} target Target.
 * @param {string} type Type.
 * @private
 */
_ol_events_.removeListeners_ = function (target, type) {
  var listeners = _ol_events_.getListeners(target, type);
  if (listeners) {
    for (var i = 0, ii = listeners.length; i < ii; ++i) {
      target.removeEventListener(type, listeners[i].boundListener);
      _obj2.default.clear(listeners[i]);
    }
    listeners.length = 0;
    var listenerMap = target.ol_lm;
    if (listenerMap) {
      delete listenerMap[type];
      if (Object.keys(listenerMap).length === 0) {
        delete target.ol_lm;
      }
    }
  }
};

/**
 * Registers an event listener on an event target. Inspired by
 * {@link https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html}
 *
 * This function efficiently binds a `listener` to a `this` object, and returns
 * a key for use with {@link ol.events.unlistenByKey}.
 *
 * @param {ol.EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ol.EventsListenerFunctionType} listener Listener.
 * @param {Object=} opt_this Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @param {boolean=} opt_once If true, add the listener as one-off listener.
 * @return {ol.EventsKey} Unique key for the listener.
 */
_ol_events_.listen = function (target, type, listener, opt_this, opt_once) {
  var listenerMap = _ol_events_.getListenerMap_(target);
  var listeners = listenerMap[type];
  if (!listeners) {
    listeners = listenerMap[type] = [];
  }
  var listenerObj = _ol_events_.findListener_(listeners, listener, opt_this, false);
  if (listenerObj) {
    if (!opt_once) {
      // Turn one-off listener into a permanent one.
      listenerObj.callOnce = false;
    }
  } else {
    listenerObj = /** @type {ol.EventsKey} */{
      bindTo: opt_this,
      callOnce: !!opt_once,
      listener: listener,
      target: target,
      type: type
    };
    target.addEventListener(type, _ol_events_.bindListener_(listenerObj));
    listeners.push(listenerObj);
  }

  return listenerObj;
};

/**
 * Registers a one-off event listener on an event target. Inspired by
 * {@link https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html}
 *
 * This function efficiently binds a `listener` as self-unregistering listener
 * to a `this` object, and returns a key for use with
 * {@link ol.events.unlistenByKey} in case the listener needs to be unregistered
 * before it is called.
 *
 * When {@link ol.events.listen} is called with the same arguments after this
 * function, the self-unregistering listener will be turned into a permanent
 * listener.
 *
 * @param {ol.EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ol.EventsListenerFunctionType} listener Listener.
 * @param {Object=} opt_this Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @return {ol.EventsKey} Key for unlistenByKey.
 */
_ol_events_.listenOnce = function (target, type, listener, opt_this) {
  return _ol_events_.listen(target, type, listener, opt_this, true);
};

/**
 * Unregisters an event listener on an event target. Inspired by
 * {@link https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html}
 *
 * To return a listener, this function needs to be called with the exact same
 * arguments that were used for a previous {@link ol.events.listen} call.
 *
 * @param {ol.EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ol.EventsListenerFunctionType} listener Listener.
 * @param {Object=} opt_this Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 */
_ol_events_.unlisten = function (target, type, listener, opt_this) {
  var listeners = _ol_events_.getListeners(target, type);
  if (listeners) {
    var listenerObj = _ol_events_.findListener_(listeners, listener, opt_this, true);
    if (listenerObj) {
      _ol_events_.unlistenByKey(listenerObj);
    }
  }
};

/**
 * Unregisters event listeners on an event target. Inspired by
 * {@link https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html}
 *
 * The argument passed to this function is the key returned from
 * {@link ol.events.listen} or {@link ol.events.listenOnce}.
 *
 * @param {ol.EventsKey} key The key.
 */
_ol_events_.unlistenByKey = function (key) {
  if (key && key.target) {
    key.target.removeEventListener(key.type, key.boundListener);
    var listeners = _ol_events_.getListeners(key.target, key.type);
    if (listeners) {
      var i = 'deleteIndex' in key ? key.deleteIndex : listeners.indexOf(key);
      if (i !== -1) {
        listeners.splice(i, 1);
      }
      if (listeners.length === 0) {
        _ol_events_.removeListeners_(key.target, key.type);
      }
    }
    _obj2.default.clear(key);
  }
};

/**
 * Unregisters all event listeners on an event target. Inspired by
 * {@link https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html}
 *
 * @param {ol.EventTargetLike} target Target.
 */
_ol_events_.unlistenAll = function (target) {
  var listenerMap = _ol_events_.getListenerMap_(target);
  for (var type in listenerMap) {
    _ol_events_.removeListeners_(target, type);
  }
};
exports.default = _ol_events_;

},{"./obj.js":32}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @classdesc
 * Stripped down implementation of the W3C DOM Level 2 Event interface.
 * @see {@link https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-interface}
 *
 * This implementation only provides `type` and `target` properties, and
 * `stopPropagation` and `preventDefault` methods. It is meant as base class
 * for higher level events defined in the library, and works with
 * {@link ol.events.EventTarget}.
 *
 * @constructor
 * @implements {oli.events.Event}
 * @param {string} type Type.
 */
var _ol_events_Event_ = function _ol_events_Event_(type) {

  /**
   * @type {boolean}
   */
  this.propagationStopped;

  /**
   * The event type.
   * @type {string}
   * @api
   */
  this.type = type;

  /**
   * The event target.
   * @type {Object}
   * @api
   */
  this.target = null;
};

/**
 * Stop event propagation.
 * @function
 * @override
 * @api
 */
_ol_events_Event_.prototype.preventDefault =

/**
 * Stop event propagation.
 * @function
 * @override
 * @api
 */
_ol_events_Event_.prototype.stopPropagation = function () {
  this.propagationStopped = true;
};

/**
 * @param {Event|ol.events.Event} evt Event
 */
_ol_events_Event_.stopPropagation = function (evt) {
  evt.stopPropagation();
};

/**
 * @param {Event|ol.events.Event} evt Event
 */
_ol_events_Event_.preventDefault = function (evt) {
  evt.preventDefault();
};
exports.default = _ol_events_Event_;

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

var _disposable = require('../disposable.js');

var _disposable2 = _interopRequireDefault(_disposable);

var _events = require('../events.js');

var _events2 = _interopRequireDefault(_events);

var _event = require('../events/event.js');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @classdesc
 * A simplified implementation of the W3C DOM Level 2 EventTarget interface.
 * @see {@link https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget}
 *
 * There are two important simplifications compared to the specification:
 *
 * 1. The handling of `useCapture` in `addEventListener` and
 *    `removeEventListener`. There is no real capture model.
 * 2. The handling of `stopPropagation` and `preventDefault` on `dispatchEvent`.
 *    There is no event target hierarchy. When a listener calls
 *    `stopPropagation` or `preventDefault` on an event object, it means that no
 *    more listeners after this one will be called. Same as when the listener
 *    returns false.
 *
 * @constructor
 * @extends {ol.Disposable}
 */
var _ol_events_EventTarget_ = function _ol_events_EventTarget_() {

  _disposable2.default.call(this);

  /**
   * @private
   * @type {!Object.<string, number>}
   */
  this.pendingRemovals_ = {};

  /**
   * @private
   * @type {!Object.<string, number>}
   */
  this.dispatching_ = {};

  /**
   * @private
   * @type {!Object.<string, Array.<ol.EventsListenerFunctionType>>}
   */
  this.listeners_ = {};
};

_index2.default.inherits(_ol_events_EventTarget_, _disposable2.default);

/**
 * @param {string} type Type.
 * @param {ol.EventsListenerFunctionType} listener Listener.
 */
_ol_events_EventTarget_.prototype.addEventListener = function (type, listener) {
  var listeners = this.listeners_[type];
  if (!listeners) {
    listeners = this.listeners_[type] = [];
  }
  if (listeners.indexOf(listener) === -1) {
    listeners.push(listener);
  }
};

/**
 * @param {{type: string,
 *     target: (EventTarget|ol.events.EventTarget|undefined)}|ol.events.Event|
 *     string} event Event or event type.
 * @return {boolean|undefined} `false` if anyone called preventDefault on the
 *     event object or if any of the listeners returned false.
 */
_ol_events_EventTarget_.prototype.dispatchEvent = function (event) {
  var evt = typeof event === 'string' ? new _event2.default(event) : event;
  var type = evt.type;
  evt.target = this;
  var listeners = this.listeners_[type];
  var propagate;
  if (listeners) {
    if (!(type in this.dispatching_)) {
      this.dispatching_[type] = 0;
      this.pendingRemovals_[type] = 0;
    }
    ++this.dispatching_[type];
    for (var i = 0, ii = listeners.length; i < ii; ++i) {
      if (listeners[i].call(this, evt) === false || evt.propagationStopped) {
        propagate = false;
        break;
      }
    }
    --this.dispatching_[type];
    if (this.dispatching_[type] === 0) {
      var pendingRemovals = this.pendingRemovals_[type];
      delete this.pendingRemovals_[type];
      while (pendingRemovals--) {
        this.removeEventListener(type, _index2.default.nullFunction);
      }
      delete this.dispatching_[type];
    }
    return propagate;
  }
};

/**
 * @inheritDoc
 */
_ol_events_EventTarget_.prototype.disposeInternal = function () {
  _events2.default.unlistenAll(this);
};

/**
 * Get the listeners for a specified event type. Listeners are returned in the
 * order that they will be called in.
 *
 * @param {string} type Type.
 * @return {Array.<ol.EventsListenerFunctionType>} Listeners.
 */
_ol_events_EventTarget_.prototype.getListeners = function (type) {
  return this.listeners_[type];
};

/**
 * @param {string=} opt_type Type. If not provided,
 *     `true` will be returned if this EventTarget has any listeners.
 * @return {boolean} Has listeners.
 */
_ol_events_EventTarget_.prototype.hasListener = function (opt_type) {
  return opt_type ? opt_type in this.listeners_ : Object.keys(this.listeners_).length > 0;
};

/**
 * @param {string} type Type.
 * @param {ol.EventsListenerFunctionType} listener Listener.
 */
_ol_events_EventTarget_.prototype.removeEventListener = function (type, listener) {
  var listeners = this.listeners_[type];
  if (listeners) {
    var index = listeners.indexOf(listener);
    if (type in this.pendingRemovals_) {
      // make listener a no-op, and remove later in #dispatchEvent()
      listeners[index] = _index2.default.nullFunction;
      ++this.pendingRemovals_[type];
    } else {
      listeners.splice(index, 1);
      if (listeners.length === 0) {
        delete this.listeners_[type];
      }
    }
  }
};
exports.default = _ol_events_EventTarget_;

},{"../disposable.js":14,"../events.js":15,"../events/event.js":16,"../index.js":30}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @enum {string}
 * @const
 */
var _ol_events_EventType_ = {
  /**
   * Generic change event. Triggered when the revision counter is increased.
   * @event ol.events.Event#change
   * @api
   */
  CHANGE: 'change',

  CLEAR: 'clear',
  CLICK: 'click',
  DBLCLICK: 'dblclick',
  DRAGENTER: 'dragenter',
  DRAGOVER: 'dragover',
  DROP: 'drop',
  ERROR: 'error',
  KEYDOWN: 'keydown',
  KEYPRESS: 'keypress',
  LOAD: 'load',
  MOUSEDOWN: 'mousedown',
  MOUSEMOVE: 'mousemove',
  MOUSEOUT: 'mouseout',
  MOUSEUP: 'mouseup',
  MOUSEWHEEL: 'mousewheel',
  MSPOINTERDOWN: 'MSPointerDown',
  RESIZE: 'resize',
  TOUCHSTART: 'touchstart',
  TOUCHMOVE: 'touchmove',
  TOUCHEND: 'touchend',
  WHEEL: 'wheel'
};

exports.default = _ol_events_EventType_;

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asserts = require('./asserts.js');

var _asserts2 = _interopRequireDefault(_asserts);

var _corner = require('./extent/corner.js');

var _corner2 = _interopRequireDefault(_corner);

var _relationship = require('./extent/relationship.js');

var _relationship2 = _interopRequireDefault(_relationship);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _ol_extent_ = {};

/**
 * Build an extent that includes all given coordinates.
 *
 * @param {Array.<ol.Coordinate>} coordinates Coordinates.
 * @return {ol.Extent} Bounding extent.
 * @api
 */
_ol_extent_.boundingExtent = function (coordinates) {
  var extent = _ol_extent_.createEmpty();
  for (var i = 0, ii = coordinates.length; i < ii; ++i) {
    _ol_extent_.extendCoordinate(extent, coordinates[i]);
  }
  return extent;
};

/**
 * @param {Array.<number>} xs Xs.
 * @param {Array.<number>} ys Ys.
 * @param {ol.Extent=} opt_extent Destination extent.
 * @private
 * @return {ol.Extent} Extent.
 */
_ol_extent_.boundingExtentXYs_ = function (xs, ys, opt_extent) {
  var minX = Math.min.apply(null, xs);
  var minY = Math.min.apply(null, ys);
  var maxX = Math.max.apply(null, xs);
  var maxY = Math.max.apply(null, ys);
  return _ol_extent_.createOrUpdate(minX, minY, maxX, maxY, opt_extent);
};

/**
 * Return extent increased by the provided value.
 * @param {ol.Extent} extent Extent.
 * @param {number} value The amount by which the extent should be buffered.
 * @param {ol.Extent=} opt_extent Extent.
 * @return {ol.Extent} Extent.
 * @api
 */
_ol_extent_.buffer = function (extent, value, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = extent[0] - value;
    opt_extent[1] = extent[1] - value;
    opt_extent[2] = extent[2] + value;
    opt_extent[3] = extent[3] + value;
    return opt_extent;
  } else {
    return [extent[0] - value, extent[1] - value, extent[2] + value, extent[3] + value];
  }
};

/**
 * Creates a clone of an extent.
 *
 * @param {ol.Extent} extent Extent to clone.
 * @param {ol.Extent=} opt_extent Extent.
 * @return {ol.Extent} The clone.
 */
_ol_extent_.clone = function (extent, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = extent[0];
    opt_extent[1] = extent[1];
    opt_extent[2] = extent[2];
    opt_extent[3] = extent[3];
    return opt_extent;
  } else {
    return extent.slice();
  }
};

/**
 * @param {ol.Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {number} Closest squared distance.
 */
_ol_extent_.closestSquaredDistanceXY = function (extent, x, y) {
  var dx, dy;
  if (x < extent[0]) {
    dx = extent[0] - x;
  } else if (extent[2] < x) {
    dx = x - extent[2];
  } else {
    dx = 0;
  }
  if (y < extent[1]) {
    dy = extent[1] - y;
  } else if (extent[3] < y) {
    dy = y - extent[3];
  } else {
    dy = 0;
  }
  return dx * dx + dy * dy;
};

/**
 * Check if the passed coordinate is contained or on the edge of the extent.
 *
 * @param {ol.Extent} extent Extent.
 * @param {ol.Coordinate} coordinate Coordinate.
 * @return {boolean} The coordinate is contained in the extent.
 * @api
 */
_ol_extent_.containsCoordinate = function (extent, coordinate) {
  return _ol_extent_.containsXY(extent, coordinate[0], coordinate[1]);
};

/**
 * Check if one extent contains another.
 *
 * An extent is deemed contained if it lies completely within the other extent,
 * including if they share one or more edges.
 *
 * @param {ol.Extent} extent1 Extent 1.
 * @param {ol.Extent} extent2 Extent 2.
 * @return {boolean} The second extent is contained by or on the edge of the
 *     first.
 * @api
 */
_ol_extent_.containsExtent = function (extent1, extent2) {
  return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] && extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
};

/**
 * Check if the passed coordinate is contained or on the edge of the extent.
 *
 * @param {ol.Extent} extent Extent.
 * @param {number} x X coordinate.
 * @param {number} y Y coordinate.
 * @return {boolean} The x, y values are contained in the extent.
 * @api
 */
_ol_extent_.containsXY = function (extent, x, y) {
  return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3];
};

/**
 * Get the relationship between a coordinate and extent.
 * @param {ol.Extent} extent The extent.
 * @param {ol.Coordinate} coordinate The coordinate.
 * @return {number} The relationship (bitwise compare with
 *     ol.extent.Relationship).
 */
_ol_extent_.coordinateRelationship = function (extent, coordinate) {
  var minX = extent[0];
  var minY = extent[1];
  var maxX = extent[2];
  var maxY = extent[3];
  var x = coordinate[0];
  var y = coordinate[1];
  var relationship = _relationship2.default.UNKNOWN;
  if (x < minX) {
    relationship = relationship | _relationship2.default.LEFT;
  } else if (x > maxX) {
    relationship = relationship | _relationship2.default.RIGHT;
  }
  if (y < minY) {
    relationship = relationship | _relationship2.default.BELOW;
  } else if (y > maxY) {
    relationship = relationship | _relationship2.default.ABOVE;
  }
  if (relationship === _relationship2.default.UNKNOWN) {
    relationship = _relationship2.default.INTERSECTING;
  }
  return relationship;
};

/**
 * Create an empty extent.
 * @return {ol.Extent} Empty extent.
 * @api
 */
_ol_extent_.createEmpty = function () {
  return [Infinity, Infinity, -Infinity, -Infinity];
};

/**
 * Create a new extent or update the provided extent.
 * @param {number} minX Minimum X.
 * @param {number} minY Minimum Y.
 * @param {number} maxX Maximum X.
 * @param {number} maxY Maximum Y.
 * @param {ol.Extent=} opt_extent Destination extent.
 * @return {ol.Extent} Extent.
 */
_ol_extent_.createOrUpdate = function (minX, minY, maxX, maxY, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = minX;
    opt_extent[1] = minY;
    opt_extent[2] = maxX;
    opt_extent[3] = maxY;
    return opt_extent;
  } else {
    return [minX, minY, maxX, maxY];
  }
};

/**
 * Create a new empty extent or make the provided one empty.
 * @param {ol.Extent=} opt_extent Extent.
 * @return {ol.Extent} Extent.
 */
_ol_extent_.createOrUpdateEmpty = function (opt_extent) {
  return _ol_extent_.createOrUpdate(Infinity, Infinity, -Infinity, -Infinity, opt_extent);
};

/**
 * @param {ol.Coordinate} coordinate Coordinate.
 * @param {ol.Extent=} opt_extent Extent.
 * @return {ol.Extent} Extent.
 */
_ol_extent_.createOrUpdateFromCoordinate = function (coordinate, opt_extent) {
  var x = coordinate[0];
  var y = coordinate[1];
  return _ol_extent_.createOrUpdate(x, y, x, y, opt_extent);
};

/**
 * @param {Array.<ol.Coordinate>} coordinates Coordinates.
 * @param {ol.Extent=} opt_extent Extent.
 * @return {ol.Extent} Extent.
 */
_ol_extent_.createOrUpdateFromCoordinates = function (coordinates, opt_extent) {
  var extent = _ol_extent_.createOrUpdateEmpty(opt_extent);
  return _ol_extent_.extendCoordinates(extent, coordinates);
};

/**
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {ol.Extent=} opt_extent Extent.
 * @return {ol.Extent} Extent.
 */
_ol_extent_.createOrUpdateFromFlatCoordinates = function (flatCoordinates, offset, end, stride, opt_extent) {
  var extent = _ol_extent_.createOrUpdateEmpty(opt_extent);
  return _ol_extent_.extendFlatCoordinates(extent, flatCoordinates, offset, end, stride);
};

/**
 * @param {Array.<Array.<ol.Coordinate>>} rings Rings.
 * @param {ol.Extent=} opt_extent Extent.
 * @return {ol.Extent} Extent.
 */
_ol_extent_.createOrUpdateFromRings = function (rings, opt_extent) {
  var extent = _ol_extent_.createOrUpdateEmpty(opt_extent);
  return _ol_extent_.extendRings(extent, rings);
};

/**
 * Determine if two extents are equivalent.
 * @param {ol.Extent} extent1 Extent 1.
 * @param {ol.Extent} extent2 Extent 2.
 * @return {boolean} The two extents are equivalent.
 * @api
 */
_ol_extent_.equals = function (extent1, extent2) {
  return extent1[0] == extent2[0] && extent1[2] == extent2[2] && extent1[1] == extent2[1] && extent1[3] == extent2[3];
};

/**
 * Modify an extent to include another extent.
 * @param {ol.Extent} extent1 The extent to be modified.
 * @param {ol.Extent} extent2 The extent that will be included in the first.
 * @return {ol.Extent} A reference to the first (extended) extent.
 * @api
 */
_ol_extent_.extend = function (extent1, extent2) {
  if (extent2[0] < extent1[0]) {
    extent1[0] = extent2[0];
  }
  if (extent2[2] > extent1[2]) {
    extent1[2] = extent2[2];
  }
  if (extent2[1] < extent1[1]) {
    extent1[1] = extent2[1];
  }
  if (extent2[3] > extent1[3]) {
    extent1[3] = extent2[3];
  }
  return extent1;
};

/**
 * @param {ol.Extent} extent Extent.
 * @param {ol.Coordinate} coordinate Coordinate.
 */
_ol_extent_.extendCoordinate = function (extent, coordinate) {
  if (coordinate[0] < extent[0]) {
    extent[0] = coordinate[0];
  }
  if (coordinate[0] > extent[2]) {
    extent[2] = coordinate[0];
  }
  if (coordinate[1] < extent[1]) {
    extent[1] = coordinate[1];
  }
  if (coordinate[1] > extent[3]) {
    extent[3] = coordinate[1];
  }
};

/**
 * @param {ol.Extent} extent Extent.
 * @param {Array.<ol.Coordinate>} coordinates Coordinates.
 * @return {ol.Extent} Extent.
 */
_ol_extent_.extendCoordinates = function (extent, coordinates) {
  var i, ii;
  for (i = 0, ii = coordinates.length; i < ii; ++i) {
    _ol_extent_.extendCoordinate(extent, coordinates[i]);
  }
  return extent;
};

/**
 * @param {ol.Extent} extent Extent.
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {ol.Extent} Extent.
 */
_ol_extent_.extendFlatCoordinates = function (extent, flatCoordinates, offset, end, stride) {
  for (; offset < end; offset += stride) {
    _ol_extent_.extendXY(extent, flatCoordinates[offset], flatCoordinates[offset + 1]);
  }
  return extent;
};

/**
 * @param {ol.Extent} extent Extent.
 * @param {Array.<Array.<ol.Coordinate>>} rings Rings.
 * @return {ol.Extent} Extent.
 */
_ol_extent_.extendRings = function (extent, rings) {
  var i, ii;
  for (i = 0, ii = rings.length; i < ii; ++i) {
    _ol_extent_.extendCoordinates(extent, rings[i]);
  }
  return extent;
};

/**
 * @param {ol.Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 */
_ol_extent_.extendXY = function (extent, x, y) {
  extent[0] = Math.min(extent[0], x);
  extent[1] = Math.min(extent[1], y);
  extent[2] = Math.max(extent[2], x);
  extent[3] = Math.max(extent[3], y);
};

/**
 * This function calls `callback` for each corner of the extent. If the
 * callback returns a truthy value the function returns that value
 * immediately. Otherwise the function returns `false`.
 * @param {ol.Extent} extent Extent.
 * @param {function(this:T, ol.Coordinate): S} callback Callback.
 * @param {T=} opt_this Value to use as `this` when executing `callback`.
 * @return {S|boolean} Value.
 * @template S, T
 */
_ol_extent_.forEachCorner = function (extent, callback, opt_this) {
  var val;
  val = callback.call(opt_this, _ol_extent_.getBottomLeft(extent));
  if (val) {
    return val;
  }
  val = callback.call(opt_this, _ol_extent_.getBottomRight(extent));
  if (val) {
    return val;
  }
  val = callback.call(opt_this, _ol_extent_.getTopRight(extent));
  if (val) {
    return val;
  }
  val = callback.call(opt_this, _ol_extent_.getTopLeft(extent));
  if (val) {
    return val;
  }
  return false;
};

/**
 * Get the size of an extent.
 * @param {ol.Extent} extent Extent.
 * @return {number} Area.
 * @api
 */
_ol_extent_.getArea = function (extent) {
  var area = 0;
  if (!_ol_extent_.isEmpty(extent)) {
    area = _ol_extent_.getWidth(extent) * _ol_extent_.getHeight(extent);
  }
  return area;
};

/**
 * Get the bottom left coordinate of an extent.
 * @param {ol.Extent} extent Extent.
 * @return {ol.Coordinate} Bottom left coordinate.
 * @api
 */
_ol_extent_.getBottomLeft = function (extent) {
  return [extent[0], extent[1]];
};

/**
 * Get the bottom right coordinate of an extent.
 * @param {ol.Extent} extent Extent.
 * @return {ol.Coordinate} Bottom right coordinate.
 * @api
 */
_ol_extent_.getBottomRight = function (extent) {
  return [extent[2], extent[1]];
};

/**
 * Get the center coordinate of an extent.
 * @param {ol.Extent} extent Extent.
 * @return {ol.Coordinate} Center.
 * @api
 */
_ol_extent_.getCenter = function (extent) {
  return [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
};

/**
 * Get a corner coordinate of an extent.
 * @param {ol.Extent} extent Extent.
 * @param {ol.extent.Corner} corner Corner.
 * @return {ol.Coordinate} Corner coordinate.
 */
_ol_extent_.getCorner = function (extent, corner) {
  var coordinate;
  if (corner === _corner2.default.BOTTOM_LEFT) {
    coordinate = _ol_extent_.getBottomLeft(extent);
  } else if (corner === _corner2.default.BOTTOM_RIGHT) {
    coordinate = _ol_extent_.getBottomRight(extent);
  } else if (corner === _corner2.default.TOP_LEFT) {
    coordinate = _ol_extent_.getTopLeft(extent);
  } else if (corner === _corner2.default.TOP_RIGHT) {
    coordinate = _ol_extent_.getTopRight(extent);
  } else {
    _asserts2.default.assert(false, 13); // Invalid corner
  }
  return (/** @type {!ol.Coordinate} */coordinate
  );
};

/**
 * @param {ol.Extent} extent1 Extent 1.
 * @param {ol.Extent} extent2 Extent 2.
 * @return {number} Enlarged area.
 */
_ol_extent_.getEnlargedArea = function (extent1, extent2) {
  var minX = Math.min(extent1[0], extent2[0]);
  var minY = Math.min(extent1[1], extent2[1]);
  var maxX = Math.max(extent1[2], extent2[2]);
  var maxY = Math.max(extent1[3], extent2[3]);
  return (maxX - minX) * (maxY - minY);
};

/**
 * @param {ol.Coordinate} center Center.
 * @param {number} resolution Resolution.
 * @param {number} rotation Rotation.
 * @param {ol.Size} size Size.
 * @param {ol.Extent=} opt_extent Destination extent.
 * @return {ol.Extent} Extent.
 */
_ol_extent_.getForViewAndSize = function (center, resolution, rotation, size, opt_extent) {
  var dx = resolution * size[0] / 2;
  var dy = resolution * size[1] / 2;
  var cosRotation = Math.cos(rotation);
  var sinRotation = Math.sin(rotation);
  var xCos = dx * cosRotation;
  var xSin = dx * sinRotation;
  var yCos = dy * cosRotation;
  var ySin = dy * sinRotation;
  var x = center[0];
  var y = center[1];
  var x0 = x - xCos + ySin;
  var x1 = x - xCos - ySin;
  var x2 = x + xCos - ySin;
  var x3 = x + xCos + ySin;
  var y0 = y - xSin - yCos;
  var y1 = y - xSin + yCos;
  var y2 = y + xSin + yCos;
  var y3 = y + xSin - yCos;
  return _ol_extent_.createOrUpdate(Math.min(x0, x1, x2, x3), Math.min(y0, y1, y2, y3), Math.max(x0, x1, x2, x3), Math.max(y0, y1, y2, y3), opt_extent);
};

/**
 * Get the height of an extent.
 * @param {ol.Extent} extent Extent.
 * @return {number} Height.
 * @api
 */
_ol_extent_.getHeight = function (extent) {
  return extent[3] - extent[1];
};

/**
 * @param {ol.Extent} extent1 Extent 1.
 * @param {ol.Extent} extent2 Extent 2.
 * @return {number} Intersection area.
 */
_ol_extent_.getIntersectionArea = function (extent1, extent2) {
  var intersection = _ol_extent_.getIntersection(extent1, extent2);
  return _ol_extent_.getArea(intersection);
};

/**
 * Get the intersection of two extents.
 * @param {ol.Extent} extent1 Extent 1.
 * @param {ol.Extent} extent2 Extent 2.
 * @param {ol.Extent=} opt_extent Optional extent to populate with intersection.
 * @return {ol.Extent} Intersecting extent.
 * @api
 */
_ol_extent_.getIntersection = function (extent1, extent2, opt_extent) {
  var intersection = opt_extent ? opt_extent : _ol_extent_.createEmpty();
  if (_ol_extent_.intersects(extent1, extent2)) {
    if (extent1[0] > extent2[0]) {
      intersection[0] = extent1[0];
    } else {
      intersection[0] = extent2[0];
    }
    if (extent1[1] > extent2[1]) {
      intersection[1] = extent1[1];
    } else {
      intersection[1] = extent2[1];
    }
    if (extent1[2] < extent2[2]) {
      intersection[2] = extent1[2];
    } else {
      intersection[2] = extent2[2];
    }
    if (extent1[3] < extent2[3]) {
      intersection[3] = extent1[3];
    } else {
      intersection[3] = extent2[3];
    }
  }
  return intersection;
};

/**
 * @param {ol.Extent} extent Extent.
 * @return {number} Margin.
 */
_ol_extent_.getMargin = function (extent) {
  return _ol_extent_.getWidth(extent) + _ol_extent_.getHeight(extent);
};

/**
 * Get the size (width, height) of an extent.
 * @param {ol.Extent} extent The extent.
 * @return {ol.Size} The extent size.
 * @api
 */
_ol_extent_.getSize = function (extent) {
  return [extent[2] - extent[0], extent[3] - extent[1]];
};

/**
 * Get the top left coordinate of an extent.
 * @param {ol.Extent} extent Extent.
 * @return {ol.Coordinate} Top left coordinate.
 * @api
 */
_ol_extent_.getTopLeft = function (extent) {
  return [extent[0], extent[3]];
};

/**
 * Get the top right coordinate of an extent.
 * @param {ol.Extent} extent Extent.
 * @return {ol.Coordinate} Top right coordinate.
 * @api
 */
_ol_extent_.getTopRight = function (extent) {
  return [extent[2], extent[3]];
};

/**
 * Get the width of an extent.
 * @param {ol.Extent} extent Extent.
 * @return {number} Width.
 * @api
 */
_ol_extent_.getWidth = function (extent) {
  return extent[2] - extent[0];
};

/**
 * Determine if one extent intersects another.
 * @param {ol.Extent} extent1 Extent 1.
 * @param {ol.Extent} extent2 Extent.
 * @return {boolean} The two extents intersect.
 * @api
 */
_ol_extent_.intersects = function (extent1, extent2) {
  return extent1[0] <= extent2[2] && extent1[2] >= extent2[0] && extent1[1] <= extent2[3] && extent1[3] >= extent2[1];
};

/**
 * Determine if an extent is empty.
 * @param {ol.Extent} extent Extent.
 * @return {boolean} Is empty.
 * @api
 */
_ol_extent_.isEmpty = function (extent) {
  return extent[2] < extent[0] || extent[3] < extent[1];
};

/**
 * @param {ol.Extent} extent Extent.
 * @param {ol.Extent=} opt_extent Extent.
 * @return {ol.Extent} Extent.
 */
_ol_extent_.returnOrUpdate = function (extent, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = extent[0];
    opt_extent[1] = extent[1];
    opt_extent[2] = extent[2];
    opt_extent[3] = extent[3];
    return opt_extent;
  } else {
    return extent;
  }
};

/**
 * @param {ol.Extent} extent Extent.
 * @param {number} value Value.
 */
_ol_extent_.scaleFromCenter = function (extent, value) {
  var deltaX = (extent[2] - extent[0]) / 2 * (value - 1);
  var deltaY = (extent[3] - extent[1]) / 2 * (value - 1);
  extent[0] -= deltaX;
  extent[2] += deltaX;
  extent[1] -= deltaY;
  extent[3] += deltaY;
};

/**
 * Determine if the segment between two coordinates intersects (crosses,
 * touches, or is contained by) the provided extent.
 * @param {ol.Extent} extent The extent.
 * @param {ol.Coordinate} start Segment start coordinate.
 * @param {ol.Coordinate} end Segment end coordinate.
 * @return {boolean} The segment intersects the extent.
 */
_ol_extent_.intersectsSegment = function (extent, start, end) {
  var intersects = false;
  var startRel = _ol_extent_.coordinateRelationship(extent, start);
  var endRel = _ol_extent_.coordinateRelationship(extent, end);
  if (startRel === _relationship2.default.INTERSECTING || endRel === _relationship2.default.INTERSECTING) {
    intersects = true;
  } else {
    var minX = extent[0];
    var minY = extent[1];
    var maxX = extent[2];
    var maxY = extent[3];
    var startX = start[0];
    var startY = start[1];
    var endX = end[0];
    var endY = end[1];
    var slope = (endY - startY) / (endX - startX);
    var x, y;
    if (!!(endRel & _relationship2.default.ABOVE) && !(startRel & _relationship2.default.ABOVE)) {
      // potentially intersects top
      x = endX - (endY - maxY) / slope;
      intersects = x >= minX && x <= maxX;
    }
    if (!intersects && !!(endRel & _relationship2.default.RIGHT) && !(startRel & _relationship2.default.RIGHT)) {
      // potentially intersects right
      y = endY - (endX - maxX) * slope;
      intersects = y >= minY && y <= maxY;
    }
    if (!intersects && !!(endRel & _relationship2.default.BELOW) && !(startRel & _relationship2.default.BELOW)) {
      // potentially intersects bottom
      x = endX - (endY - minY) / slope;
      intersects = x >= minX && x <= maxX;
    }
    if (!intersects && !!(endRel & _relationship2.default.LEFT) && !(startRel & _relationship2.default.LEFT)) {
      // potentially intersects left
      y = endY - (endX - minX) * slope;
      intersects = y >= minY && y <= maxY;
    }
  }
  return intersects;
};

/**
 * Apply a transform function to the extent.
 * @param {ol.Extent} extent Extent.
 * @param {ol.TransformFunction} transformFn Transform function.  Called with
 * [minX, minY, maxX, maxY] extent coordinates.
 * @param {ol.Extent=} opt_extent Destination extent.
 * @return {ol.Extent} Extent.
 * @api
 */
_ol_extent_.applyTransform = function (extent, transformFn, opt_extent) {
  var coordinates = [extent[0], extent[1], extent[0], extent[3], extent[2], extent[1], extent[2], extent[3]];
  transformFn(coordinates, coordinates, 2);
  var xs = [coordinates[0], coordinates[2], coordinates[4], coordinates[6]];
  var ys = [coordinates[1], coordinates[3], coordinates[5], coordinates[7]];
  return _ol_extent_.boundingExtentXYs_(xs, ys, opt_extent);
};
exports.default = _ol_extent_;

},{"./asserts.js":13,"./extent/corner.js":20,"./extent/relationship.js":21}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Extent corner.
 * @enum {string}
 */
var _ol_extent_Corner_ = {
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right'
};

exports.default = _ol_extent_Corner_;

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Relationship to an extent.
 * @enum {number}
 */
var _ol_extent_Relationship_ = {
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16
};

exports.default = _ol_extent_Relationship_;

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ol_functions_ = {};

/**
 * Always returns true.
 * @returns {boolean} true.
 */
_ol_functions_.TRUE = function () {
  return true;
};

/**
 * Always returns false.
 * @returns {boolean} false.
 */
_ol_functions_.FALSE = function () {
  return false;
};
exports.default = _ol_functions_;

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ol_geom_flat_deflate_ = {};

/**
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {ol.Coordinate} coordinate Coordinate.
 * @param {number} stride Stride.
 * @return {number} offset Offset.
 */
_ol_geom_flat_deflate_.coordinate = function (flatCoordinates, offset, coordinate, stride) {
  var i, ii;
  for (i = 0, ii = coordinate.length; i < ii; ++i) {
    flatCoordinates[offset++] = coordinate[i];
  }
  return offset;
};

/**
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array.<ol.Coordinate>} coordinates Coordinates.
 * @param {number} stride Stride.
 * @return {number} offset Offset.
 */
_ol_geom_flat_deflate_.coordinates = function (flatCoordinates, offset, coordinates, stride) {
  var i, ii;
  for (i = 0, ii = coordinates.length; i < ii; ++i) {
    var coordinate = coordinates[i];
    var j;
    for (j = 0; j < stride; ++j) {
      flatCoordinates[offset++] = coordinate[j];
    }
  }
  return offset;
};

/**
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array.<Array.<ol.Coordinate>>} coordinatess Coordinatess.
 * @param {number} stride Stride.
 * @param {Array.<number>=} opt_ends Ends.
 * @return {Array.<number>} Ends.
 */
_ol_geom_flat_deflate_.coordinatess = function (flatCoordinates, offset, coordinatess, stride, opt_ends) {
  var ends = opt_ends ? opt_ends : [];
  var i = 0;
  var j, jj;
  for (j = 0, jj = coordinatess.length; j < jj; ++j) {
    var end = _ol_geom_flat_deflate_.coordinates(flatCoordinates, offset, coordinatess[j], stride);
    ends[i++] = end;
    offset = end;
  }
  ends.length = i;
  return ends;
};

/**
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array.<Array.<Array.<ol.Coordinate>>>} coordinatesss Coordinatesss.
 * @param {number} stride Stride.
 * @param {Array.<Array.<number>>=} opt_endss Endss.
 * @return {Array.<Array.<number>>} Endss.
 */
_ol_geom_flat_deflate_.coordinatesss = function (flatCoordinates, offset, coordinatesss, stride, opt_endss) {
  var endss = opt_endss ? opt_endss : [];
  var i = 0;
  var j, jj;
  for (j = 0, jj = coordinatesss.length; j < jj; ++j) {
    var ends = _ol_geom_flat_deflate_.coordinatess(flatCoordinates, offset, coordinatesss[j], stride, endss[i]);
    endss[i++] = ends;
    offset = ends[ends.length - 1];
  }
  endss.length = i;
  return endss;
};
exports.default = _ol_geom_flat_deflate_;

},{}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ol_geom_flat_transform_ = {};

/**
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {ol.Transform} transform Transform.
 * @param {Array.<number>=} opt_dest Destination.
 * @return {Array.<number>} Transformed coordinates.
 */
_ol_geom_flat_transform_.transform2D = function (flatCoordinates, offset, end, stride, transform, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var i = 0;
  var j;
  for (j = offset; j < end; j += stride) {
    var x = flatCoordinates[j];
    var y = flatCoordinates[j + 1];
    dest[i++] = transform[0] * x + transform[2] * y + transform[4];
    dest[i++] = transform[1] * x + transform[3] * y + transform[5];
  }
  if (opt_dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
};

/**
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} angle Angle.
 * @param {Array.<number>} anchor Rotation anchor point.
 * @param {Array.<number>=} opt_dest Destination.
 * @return {Array.<number>} Transformed coordinates.
 */
_ol_geom_flat_transform_.rotate = function (flatCoordinates, offset, end, stride, angle, anchor, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  var anchorX = anchor[0];
  var anchorY = anchor[1];
  var i = 0;
  for (var j = offset; j < end; j += stride) {
    var deltaX = flatCoordinates[j] - anchorX;
    var deltaY = flatCoordinates[j + 1] - anchorY;
    dest[i++] = anchorX + deltaX * cos - deltaY * sin;
    dest[i++] = anchorY + deltaX * sin + deltaY * cos;
    for (var k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }
  if (opt_dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
};

/**
 * Scale the coordinates.
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} sx Scale factor in the x-direction.
 * @param {number} sy Scale factor in the y-direction.
 * @param {Array.<number>} anchor Scale anchor point.
 * @param {Array.<number>=} opt_dest Destination.
 * @return {Array.<number>} Transformed coordinates.
 */
_ol_geom_flat_transform_.scale = function (flatCoordinates, offset, end, stride, sx, sy, anchor, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var anchorX = anchor[0];
  var anchorY = anchor[1];
  var i = 0;
  for (var j = offset; j < end; j += stride) {
    var deltaX = flatCoordinates[j] - anchorX;
    var deltaY = flatCoordinates[j + 1] - anchorY;
    dest[i++] = anchorX + sx * deltaX;
    dest[i++] = anchorY + sy * deltaY;
    for (var k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }
  if (opt_dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
};

/**
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} deltaX Delta X.
 * @param {number} deltaY Delta Y.
 * @param {Array.<number>=} opt_dest Destination.
 * @return {Array.<number>} Transformed coordinates.
 */
_ol_geom_flat_transform_.translate = function (flatCoordinates, offset, end, stride, deltaX, deltaY, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var i = 0;
  var j, k;
  for (j = offset; j < end; j += stride) {
    dest[i++] = flatCoordinates[j] + deltaX;
    dest[i++] = flatCoordinates[j + 1] + deltaY;
    for (k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }
  if (opt_dest && dest.length != i) {
    dest.length = i;
  }
  return dest;
};
exports.default = _ol_geom_flat_transform_;

},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

var _object = require('../object.js');

var _object2 = _interopRequireDefault(_object);

var _extent = require('../extent.js');

var _extent2 = _interopRequireDefault(_extent);

var _functions = require('../functions.js');

var _functions2 = _interopRequireDefault(_functions);

var _transform = require('../geom/flat/transform.js');

var _transform2 = _interopRequireDefault(_transform);

var _proj = require('../proj.js');

var _proj2 = _interopRequireDefault(_proj);

var _units = require('../proj/units.js');

var _units2 = _interopRequireDefault(_units);

var _transform3 = require('../transform.js');

var _transform4 = _interopRequireDefault(_transform3);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for vector geometries.
 *
 * To get notified of changes to the geometry, register a listener for the
 * generic `change` event on your geometry instance.
 *
 * @constructor
 * @abstract
 * @extends {ol.Object}
 * @api
 */
var _ol_geom_Geometry_ = function _ol_geom_Geometry_() {

  _object2.default.call(this);

  /**
   * @private
   * @type {ol.Extent}
   */
  this.extent_ = _extent2.default.createEmpty();

  /**
   * @private
   * @type {number}
   */
  this.extentRevision_ = -1;

  /**
   * @protected
   * @type {Object.<string, ol.geom.Geometry>}
   */
  this.simplifiedGeometryCache = {};

  /**
   * @protected
   * @type {number}
   */
  this.simplifiedGeometryMaxMinSquaredTolerance = 0;

  /**
   * @protected
   * @type {number}
   */
  this.simplifiedGeometryRevision = 0;

  /**
   * @private
   * @type {ol.Transform}
   */
  this.tmpTransform_ = _transform4.default.create();
};

_index2.default.inherits(_ol_geom_Geometry_, _object2.default);

/**
 * Make a complete copy of the geometry.
 * @abstract
 * @return {!ol.geom.Geometry} Clone.
 */
_ol_geom_Geometry_.prototype.clone = function () {};

/**
 * @abstract
 * @param {number} x X.
 * @param {number} y Y.
 * @param {ol.Coordinate} closestPoint Closest point.
 * @param {number} minSquaredDistance Minimum squared distance.
 * @return {number} Minimum squared distance.
 */
_ol_geom_Geometry_.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {};

/**
 * Return the closest point of the geometry to the passed point as
 * {@link ol.Coordinate coordinate}.
 * @param {ol.Coordinate} point Point.
 * @param {ol.Coordinate=} opt_closestPoint Closest point.
 * @return {ol.Coordinate} Closest point.
 * @api
 */
_ol_geom_Geometry_.prototype.getClosestPoint = function (point, opt_closestPoint) {
  var closestPoint = opt_closestPoint ? opt_closestPoint : [NaN, NaN];
  this.closestPointXY(point[0], point[1], closestPoint, Infinity);
  return closestPoint;
};

/**
 * Returns true if this geometry includes the specified coordinate. If the
 * coordinate is on the boundary of the geometry, returns false.
 * @param {ol.Coordinate} coordinate Coordinate.
 * @return {boolean} Contains coordinate.
 * @api
 */
_ol_geom_Geometry_.prototype.intersectsCoordinate = function (coordinate) {
  return this.containsXY(coordinate[0], coordinate[1]);
};

/**
 * @abstract
 * @param {ol.Extent} extent Extent.
 * @protected
 * @return {ol.Extent} extent Extent.
 */
_ol_geom_Geometry_.prototype.computeExtent = function (extent) {};

/**
 * @param {number} x X.
 * @param {number} y Y.
 * @return {boolean} Contains (x, y).
 */
_ol_geom_Geometry_.prototype.containsXY = _functions2.default.FALSE;

/**
 * Get the extent of the geometry.
 * @param {ol.Extent=} opt_extent Extent.
 * @return {ol.Extent} extent Extent.
 * @api
 */
_ol_geom_Geometry_.prototype.getExtent = function (opt_extent) {
  if (this.extentRevision_ != this.getRevision()) {
    this.extent_ = this.computeExtent(this.extent_);
    this.extentRevision_ = this.getRevision();
  }
  return _extent2.default.returnOrUpdate(this.extent_, opt_extent);
};

/**
 * Rotate the geometry around a given coordinate. This modifies the geometry
 * coordinates in place.
 * @abstract
 * @param {number} angle Rotation angle in radians.
 * @param {ol.Coordinate} anchor The rotation center.
 * @api
 */
_ol_geom_Geometry_.prototype.rotate = function (angle, anchor) {};

/**
 * Scale the geometry (with an optional origin).  This modifies the geometry
 * coordinates in place.
 * @abstract
 * @param {number} sx The scaling factor in the x-direction.
 * @param {number=} opt_sy The scaling factor in the y-direction (defaults to
 *     sx).
 * @param {ol.Coordinate=} opt_anchor The scale origin (defaults to the center
 *     of the geometry extent).
 * @api
 */
_ol_geom_Geometry_.prototype.scale = function (sx, opt_sy, opt_anchor) {};

/**
 * Create a simplified version of this geometry.  For linestrings, this uses
 * the the {@link
 * https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm
 * Douglas Peucker} algorithm.  For polygons, a quantization-based
 * simplification is used to preserve topology.
 * @function
 * @param {number} tolerance The tolerance distance for simplification.
 * @return {ol.geom.Geometry} A new, simplified version of the original
 *     geometry.
 * @api
 */
_ol_geom_Geometry_.prototype.simplify = function (tolerance) {
  return this.getSimplifiedGeometry(tolerance * tolerance);
};

/**
 * Create a simplified version of this geometry using the Douglas Peucker
 * algorithm.
 * @see https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm
 * @abstract
 * @param {number} squaredTolerance Squared tolerance.
 * @return {ol.geom.Geometry} Simplified geometry.
 */
_ol_geom_Geometry_.prototype.getSimplifiedGeometry = function (squaredTolerance) {};

/**
 * Get the type of this geometry.
 * @abstract
 * @return {ol.geom.GeometryType} Geometry type.
 */
_ol_geom_Geometry_.prototype.getType = function () {};

/**
 * Apply a transform function to each coordinate of the geometry.
 * The geometry is modified in place.
 * If you do not want the geometry modified in place, first `clone()` it and
 * then use this function on the clone.
 * @abstract
 * @param {ol.TransformFunction} transformFn Transform.
 */
_ol_geom_Geometry_.prototype.applyTransform = function (transformFn) {};

/**
 * Test if the geometry and the passed extent intersect.
 * @abstract
 * @param {ol.Extent} extent Extent.
 * @return {boolean} `true` if the geometry and the extent intersect.
 */
_ol_geom_Geometry_.prototype.intersectsExtent = function (extent) {};

/**
 * Translate the geometry.  This modifies the geometry coordinates in place.  If
 * instead you want a new geometry, first `clone()` this geometry.
 * @abstract
 * @param {number} deltaX Delta X.
 * @param {number} deltaY Delta Y.
 */
_ol_geom_Geometry_.prototype.translate = function (deltaX, deltaY) {};

/**
 * Transform each coordinate of the geometry from one coordinate reference
 * system to another. The geometry is modified in place.
 * For example, a line will be transformed to a line and a circle to a circle.
 * If you do not want the geometry modified in place, first `clone()` it and
 * then use this function on the clone.
 *
 * @param {ol.ProjectionLike} source The current projection.  Can be a
 *     string identifier or a {@link ol.proj.Projection} object.
 * @param {ol.ProjectionLike} destination The desired projection.  Can be a
 *     string identifier or a {@link ol.proj.Projection} object.
 * @return {ol.geom.Geometry} This geometry.  Note that original geometry is
 *     modified in place.
 * @api
 */
_ol_geom_Geometry_.prototype.transform = function (source, destination) {
  var tmpTransform = this.tmpTransform_;
  source = _proj2.default.get(source);
  var transformFn = source.getUnits() == _units2.default.TILE_PIXELS ? function (inCoordinates, outCoordinates, stride) {
    var pixelExtent = source.getExtent();
    var projectedExtent = source.getWorldExtent();
    var scale = _extent2.default.getHeight(projectedExtent) / _extent2.default.getHeight(pixelExtent);
    _transform4.default.compose(tmpTransform, projectedExtent[0], projectedExtent[3], scale, -scale, 0, 0, 0);
    _transform2.default.transform2D(inCoordinates, 0, inCoordinates.length, stride, tmpTransform, outCoordinates);
    return _proj2.default.getTransform(source, destination)(inCoordinates, outCoordinates, stride);
  } : _proj2.default.getTransform(source, destination);
  this.applyTransform(transformFn);
  return this;
};
exports.default = _ol_geom_Geometry_;

},{"../extent.js":19,"../functions.js":22,"../geom/flat/transform.js":24,"../index.js":30,"../object.js":33,"../proj.js":36,"../proj/units.js":43,"../transform.js":45}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * The coordinate layout for geometries, indicating whether a 3rd or 4th z ('Z')
 * or measure ('M') coordinate is available. Supported values are `'XY'`,
 * `'XYZ'`, `'XYM'`, `'XYZM'`.
 * @enum {string}
 */
var _ol_geom_GeometryLayout_ = {
  XY: 'XY',
  XYZ: 'XYZ',
  XYM: 'XYM',
  XYZM: 'XYZM'
};

exports.default = _ol_geom_GeometryLayout_;

},{}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * The geometry type. One of `'Point'`, `'LineString'`, `'LinearRing'`,
 * `'Polygon'`, `'MultiPoint'`, `'MultiLineString'`, `'MultiPolygon'`,
 * `'GeometryCollection'`, `'Circle'`.
 * @enum {string}
 */
var _ol_geom_GeometryType_ = {
  POINT: 'Point',
  LINE_STRING: 'LineString',
  LINEAR_RING: 'LinearRing',
  POLYGON: 'Polygon',
  MULTI_POINT: 'MultiPoint',
  MULTI_LINE_STRING: 'MultiLineString',
  MULTI_POLYGON: 'MultiPolygon',
  GEOMETRY_COLLECTION: 'GeometryCollection',
  CIRCLE: 'Circle'
};

exports.default = _ol_geom_GeometryType_;

},{}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

var _extent = require('../extent.js');

var _extent2 = _interopRequireDefault(_extent);

var _geometrylayout = require('../geom/geometrylayout.js');

var _geometrylayout2 = _interopRequireDefault(_geometrylayout);

var _geometrytype = require('../geom/geometrytype.js');

var _geometrytype2 = _interopRequireDefault(_geometrytype);

var _simplegeometry = require('../geom/simplegeometry.js');

var _simplegeometry2 = _interopRequireDefault(_simplegeometry);

var _deflate = require('../geom/flat/deflate.js');

var _deflate2 = _interopRequireDefault(_deflate);

var _math = require('../math.js');

var _math2 = _interopRequireDefault(_math);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @classdesc
 * Point geometry.
 *
 * @constructor
 * @extends {ol.geom.SimpleGeometry}
 * @param {ol.Coordinate} coordinates Coordinates.
 * @param {ol.geom.GeometryLayout=} opt_layout Layout.
 * @api
 */
var _ol_geom_Point_ = function _ol_geom_Point_(coordinates, opt_layout) {
  _simplegeometry2.default.call(this);
  this.setCoordinates(coordinates, opt_layout);
};

_index2.default.inherits(_ol_geom_Point_, _simplegeometry2.default);

/**
 * Make a complete copy of the geometry.
 * @return {!ol.geom.Point} Clone.
 * @override
 * @api
 */
_ol_geom_Point_.prototype.clone = function () {
  var point = new _ol_geom_Point_(null);
  point.setFlatCoordinates(this.layout, this.flatCoordinates.slice());
  return point;
};

/**
 * @inheritDoc
 */
_ol_geom_Point_.prototype.closestPointXY = function (x, y, closestPoint, minSquaredDistance) {
  var flatCoordinates = this.flatCoordinates;
  var squaredDistance = _math2.default.squaredDistance(x, y, flatCoordinates[0], flatCoordinates[1]);
  if (squaredDistance < minSquaredDistance) {
    var stride = this.stride;
    var i;
    for (i = 0; i < stride; ++i) {
      closestPoint[i] = flatCoordinates[i];
    }
    closestPoint.length = stride;
    return squaredDistance;
  } else {
    return minSquaredDistance;
  }
};

/**
 * Return the coordinate of the point.
 * @return {ol.Coordinate} Coordinates.
 * @override
 * @api
 */
_ol_geom_Point_.prototype.getCoordinates = function () {
  return !this.flatCoordinates ? [] : this.flatCoordinates.slice();
};

/**
 * @inheritDoc
 */
_ol_geom_Point_.prototype.computeExtent = function (extent) {
  return _extent2.default.createOrUpdateFromCoordinate(this.flatCoordinates, extent);
};

/**
 * @inheritDoc
 * @api
 */
_ol_geom_Point_.prototype.getType = function () {
  return _geometrytype2.default.POINT;
};

/**
 * @inheritDoc
 * @api
 */
_ol_geom_Point_.prototype.intersectsExtent = function (extent) {
  return _extent2.default.containsXY(extent, this.flatCoordinates[0], this.flatCoordinates[1]);
};

/**
 * @inheritDoc
 * @api
 */
_ol_geom_Point_.prototype.setCoordinates = function (coordinates, opt_layout) {
  if (!coordinates) {
    this.setFlatCoordinates(_geometrylayout2.default.XY, null);
  } else {
    this.setLayout(opt_layout, coordinates, 0);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    this.flatCoordinates.length = _deflate2.default.coordinate(this.flatCoordinates, 0, coordinates, this.stride);
    this.changed();
  }
};

/**
 * @param {ol.geom.GeometryLayout} layout Layout.
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 */
_ol_geom_Point_.prototype.setFlatCoordinates = function (layout, flatCoordinates) {
  this.setFlatCoordinatesInternal(layout, flatCoordinates);
  this.changed();
};
exports.default = _ol_geom_Point_;

},{"../extent.js":19,"../geom/flat/deflate.js":23,"../geom/geometrylayout.js":26,"../geom/geometrytype.js":27,"../geom/simplegeometry.js":29,"../index.js":30,"../math.js":31}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

var _functions = require('../functions.js');

var _functions2 = _interopRequireDefault(_functions);

var _extent = require('../extent.js');

var _extent2 = _interopRequireDefault(_extent);

var _geometry = require('../geom/geometry.js');

var _geometry2 = _interopRequireDefault(_geometry);

var _geometrylayout = require('../geom/geometrylayout.js');

var _geometrylayout2 = _interopRequireDefault(_geometrylayout);

var _transform = require('../geom/flat/transform.js');

var _transform2 = _interopRequireDefault(_transform);

var _obj = require('../obj.js');

var _obj2 = _interopRequireDefault(_obj);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @classdesc
 * Abstract base class; only used for creating subclasses; do not instantiate
 * in apps, as cannot be rendered.
 *
 * @constructor
 * @abstract
 * @extends {ol.geom.Geometry}
 * @api
 */
var _ol_geom_SimpleGeometry_ = function _ol_geom_SimpleGeometry_() {

  _geometry2.default.call(this);

  /**
   * @protected
   * @type {ol.geom.GeometryLayout}
   */
  this.layout = _geometrylayout2.default.XY;

  /**
   * @protected
   * @type {number}
   */
  this.stride = 2;

  /**
   * @protected
   * @type {Array.<number>}
   */
  this.flatCoordinates = null;
};

_index2.default.inherits(_ol_geom_SimpleGeometry_, _geometry2.default);

/**
 * @param {number} stride Stride.
 * @private
 * @return {ol.geom.GeometryLayout} layout Layout.
 */
_ol_geom_SimpleGeometry_.getLayoutForStride_ = function (stride) {
  var layout;
  if (stride == 2) {
    layout = _geometrylayout2.default.XY;
  } else if (stride == 3) {
    layout = _geometrylayout2.default.XYZ;
  } else if (stride == 4) {
    layout = _geometrylayout2.default.XYZM;
  }
  return (/** @type {ol.geom.GeometryLayout} */layout
  );
};

/**
 * @param {ol.geom.GeometryLayout} layout Layout.
 * @return {number} Stride.
 */
_ol_geom_SimpleGeometry_.getStrideForLayout = function (layout) {
  var stride;
  if (layout == _geometrylayout2.default.XY) {
    stride = 2;
  } else if (layout == _geometrylayout2.default.XYZ || layout == _geometrylayout2.default.XYM) {
    stride = 3;
  } else if (layout == _geometrylayout2.default.XYZM) {
    stride = 4;
  }
  return (/** @type {number} */stride
  );
};

/**
 * @inheritDoc
 */
_ol_geom_SimpleGeometry_.prototype.containsXY = _functions2.default.FALSE;

/**
 * @inheritDoc
 */
_ol_geom_SimpleGeometry_.prototype.computeExtent = function (extent) {
  return _extent2.default.createOrUpdateFromFlatCoordinates(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent);
};

/**
 * @abstract
 * @return {Array} Coordinates.
 */
_ol_geom_SimpleGeometry_.prototype.getCoordinates = function () {};

/**
 * Return the first coordinate of the geometry.
 * @return {ol.Coordinate} First coordinate.
 * @api
 */
_ol_geom_SimpleGeometry_.prototype.getFirstCoordinate = function () {
  return this.flatCoordinates.slice(0, this.stride);
};

/**
 * @return {Array.<number>} Flat coordinates.
 */
_ol_geom_SimpleGeometry_.prototype.getFlatCoordinates = function () {
  return this.flatCoordinates;
};

/**
 * Return the last coordinate of the geometry.
 * @return {ol.Coordinate} Last point.
 * @api
 */
_ol_geom_SimpleGeometry_.prototype.getLastCoordinate = function () {
  return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride);
};

/**
 * Return the {@link ol.geom.GeometryLayout layout} of the geometry.
 * @return {ol.geom.GeometryLayout} Layout.
 * @api
 */
_ol_geom_SimpleGeometry_.prototype.getLayout = function () {
  return this.layout;
};

/**
 * @inheritDoc
 */
_ol_geom_SimpleGeometry_.prototype.getSimplifiedGeometry = function (squaredTolerance) {
  if (this.simplifiedGeometryRevision != this.getRevision()) {
    _obj2.default.clear(this.simplifiedGeometryCache);
    this.simplifiedGeometryMaxMinSquaredTolerance = 0;
    this.simplifiedGeometryRevision = this.getRevision();
  }
  // If squaredTolerance is negative or if we know that simplification will not
  // have any effect then just return this.
  if (squaredTolerance < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && squaredTolerance <= this.simplifiedGeometryMaxMinSquaredTolerance) {
    return this;
  }
  var key = squaredTolerance.toString();
  if (this.simplifiedGeometryCache.hasOwnProperty(key)) {
    return this.simplifiedGeometryCache[key];
  } else {
    var simplifiedGeometry = this.getSimplifiedGeometryInternal(squaredTolerance);
    var simplifiedFlatCoordinates = simplifiedGeometry.getFlatCoordinates();
    if (simplifiedFlatCoordinates.length < this.flatCoordinates.length) {
      this.simplifiedGeometryCache[key] = simplifiedGeometry;
      return simplifiedGeometry;
    } else {
      // Simplification did not actually remove any coordinates.  We now know
      // that any calls to getSimplifiedGeometry with a squaredTolerance less
      // than or equal to the current squaredTolerance will also not have any
      // effect.  This allows us to short circuit simplification (saving CPU
      // cycles) and prevents the cache of simplified geometries from filling
      // up with useless identical copies of this geometry (saving memory).
      this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
      return this;
    }
  }
};

/**
 * @param {number} squaredTolerance Squared tolerance.
 * @return {ol.geom.SimpleGeometry} Simplified geometry.
 * @protected
 */
_ol_geom_SimpleGeometry_.prototype.getSimplifiedGeometryInternal = function (squaredTolerance) {
  return this;
};

/**
 * @return {number} Stride.
 */
_ol_geom_SimpleGeometry_.prototype.getStride = function () {
  return this.stride;
};

/**
 * @param {ol.geom.GeometryLayout} layout Layout.
 * @param {Array.<number>} flatCoordinates Flat coordinates.
 * @protected
 */
_ol_geom_SimpleGeometry_.prototype.setFlatCoordinatesInternal = function (layout, flatCoordinates) {
  this.stride = _ol_geom_SimpleGeometry_.getStrideForLayout(layout);
  this.layout = layout;
  this.flatCoordinates = flatCoordinates;
};

/**
 * @abstract
 * @param {Array} coordinates Coordinates.
 * @param {ol.geom.GeometryLayout=} opt_layout Layout.
 */
_ol_geom_SimpleGeometry_.prototype.setCoordinates = function (coordinates, opt_layout) {};

/**
 * @param {ol.geom.GeometryLayout|undefined} layout Layout.
 * @param {Array} coordinates Coordinates.
 * @param {number} nesting Nesting.
 * @protected
 */
_ol_geom_SimpleGeometry_.prototype.setLayout = function (layout, coordinates, nesting) {
  /** @type {number} */
  var stride;
  if (layout) {
    stride = _ol_geom_SimpleGeometry_.getStrideForLayout(layout);
  } else {
    var i;
    for (i = 0; i < nesting; ++i) {
      if (coordinates.length === 0) {
        this.layout = _geometrylayout2.default.XY;
        this.stride = 2;
        return;
      } else {
        coordinates = /** @type {Array} */coordinates[0];
      }
    }
    stride = coordinates.length;
    layout = _ol_geom_SimpleGeometry_.getLayoutForStride_(stride);
  }
  this.layout = layout;
  this.stride = stride;
};

/**
 * @inheritDoc
 * @api
 */
_ol_geom_SimpleGeometry_.prototype.applyTransform = function (transformFn) {
  if (this.flatCoordinates) {
    transformFn(this.flatCoordinates, this.flatCoordinates, this.stride);
    this.changed();
  }
};

/**
 * @inheritDoc
 * @api
 */
_ol_geom_SimpleGeometry_.prototype.rotate = function (angle, anchor) {
  var flatCoordinates = this.getFlatCoordinates();
  if (flatCoordinates) {
    var stride = this.getStride();
    _transform2.default.rotate(flatCoordinates, 0, flatCoordinates.length, stride, angle, anchor, flatCoordinates);
    this.changed();
  }
};

/**
 * @inheritDoc
 * @api
 */
_ol_geom_SimpleGeometry_.prototype.scale = function (sx, opt_sy, opt_anchor) {
  var sy = opt_sy;
  if (sy === undefined) {
    sy = sx;
  }
  var anchor = opt_anchor;
  if (!anchor) {
    anchor = _extent2.default.getCenter(this.getExtent());
  }
  var flatCoordinates = this.getFlatCoordinates();
  if (flatCoordinates) {
    var stride = this.getStride();
    _transform2.default.scale(flatCoordinates, 0, flatCoordinates.length, stride, sx, sy, anchor, flatCoordinates);
    this.changed();
  }
};

/**
 * @inheritDoc
 * @api
 */
_ol_geom_SimpleGeometry_.prototype.translate = function (deltaX, deltaY) {
  var flatCoordinates = this.getFlatCoordinates();
  if (flatCoordinates) {
    var stride = this.getStride();
    _transform2.default.translate(flatCoordinates, 0, flatCoordinates.length, stride, deltaX, deltaY, flatCoordinates);
    this.changed();
  }
};

/**
 * @param {ol.geom.SimpleGeometry} simpleGeometry Simple geometry.
 * @param {ol.Transform} transform Transform.
 * @param {Array.<number>=} opt_dest Destination.
 * @return {Array.<number>} Transformed flat coordinates.
 */
_ol_geom_SimpleGeometry_.transform2D = function (simpleGeometry, transform, opt_dest) {
  var flatCoordinates = simpleGeometry.getFlatCoordinates();
  if (!flatCoordinates) {
    return null;
  } else {
    var stride = simpleGeometry.getStride();
    return _transform2.default.transform2D(flatCoordinates, 0, flatCoordinates.length, stride, transform, opt_dest);
  }
};
exports.default = _ol_geom_SimpleGeometry_;

},{"../extent.js":19,"../functions.js":22,"../geom/flat/transform.js":24,"../geom/geometry.js":25,"../geom/geometrylayout.js":26,"../index.js":30,"../obj.js":32}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ol_ = {};

/**
 * Constants defined with the define tag cannot be changed in application
 * code, but can be set at compile time.
 * Some reduce the size of the build in advanced compile mode.
 */

/**
 * @define {boolean} Assume touch.  Default is `false`.
 */
_ol_.ASSUME_TOUCH = false;

/**
 * TODO: rename this to something having to do with tile grids
 * see https://github.com/openlayers/openlayers/issues/2076
 * @define {number} Default maximum zoom for default tile grids.
 */
_ol_.DEFAULT_MAX_ZOOM = 42;

/**
 * @define {number} Default min zoom level for the map view.  Default is `0`.
 */
_ol_.DEFAULT_MIN_ZOOM = 0;

/**
 * @define {number} Default maximum allowed threshold  (in pixels) for
 *     reprojection triangulation. Default is `0.5`.
 */
_ol_.DEFAULT_RASTER_REPROJECTION_ERROR_THRESHOLD = 0.5;

/**
 * @define {number} Default tile size.
 */
_ol_.DEFAULT_TILE_SIZE = 256;

/**
 * @define {string} Default WMS version.
 */
_ol_.DEFAULT_WMS_VERSION = '1.3.0';

/**
 * @define {boolean} Enable the Canvas renderer.  Default is `true`. Setting
 *     this to false at compile time in advanced mode removes all code
 *     supporting the Canvas renderer from the build.
 */
_ol_.ENABLE_CANVAS = true;

/**
 * @define {boolean} Enable integration with the Proj4js library.  Default is
 *     `true`.
 */
_ol_.ENABLE_PROJ4JS = true;

/**
 * @define {boolean} Enable automatic reprojection of raster sources. Default is
 *     `true`.
 */
_ol_.ENABLE_RASTER_REPROJECTION = true;

/**
 * @define {boolean} Enable the WebGL renderer.  Default is `true`. Setting
 *     this to false at compile time in advanced mode removes all code
 *     supporting the WebGL renderer from the build.
 */
_ol_.ENABLE_WEBGL = true;

/**
 * @define {boolean} Include debuggable shader sources.  Default is `true`.
 *     This should be set to `false` for production builds (if `ol.ENABLE_WEBGL`
 *     is `true`).
 */
_ol_.DEBUG_WEBGL = true;

/**
 * @define {number} The size in pixels of the first atlas image. Default is
 * `256`.
 */
_ol_.INITIAL_ATLAS_SIZE = 256;

/**
 * @define {number} The maximum size in pixels of atlas images. Default is
 * `-1`, meaning it is not used (and `ol.WEBGL_MAX_TEXTURE_SIZE` is
 * used instead).
 */
_ol_.MAX_ATLAS_SIZE = -1;

/**
 * @define {number} Maximum mouse wheel delta.
 */
_ol_.MOUSEWHEELZOOM_MAXDELTA = 1;

/**
 * @define {number} Maximum width and/or height extent ratio that determines
 * when the overview map should be zoomed out.
 */
_ol_.OVERVIEWMAP_MAX_RATIO = 0.75;

/**
 * @define {number} Minimum width and/or height extent ratio that determines
 * when the overview map should be zoomed in.
 */
_ol_.OVERVIEWMAP_MIN_RATIO = 0.1;

/**
 * @define {number} Maximum number of source tiles for raster reprojection of
 *     a single tile.
 *     If too many source tiles are determined to be loaded to create a single
 *     reprojected tile the browser can become unresponsive or even crash.
 *     This can happen if the developer defines projections improperly and/or
 *     with unlimited extents.
 *     If too many tiles are required, no tiles are loaded and
 *     `ol.TileState.ERROR` state is set. Default is `100`.
 */
_ol_.RASTER_REPROJECTION_MAX_SOURCE_TILES = 100;

/**
 * @define {number} Maximum number of subdivision steps during raster
 *     reprojection triangulation. Prevents high memory usage and large
 *     number of proj4 calls (for certain transformations and areas).
 *     At most `2*(2^this)` triangles are created for each triangulated
 *     extent (tile/image). Default is `10`.
 */
_ol_.RASTER_REPROJECTION_MAX_SUBDIVISION = 10;

/**
 * @define {number} Maximum allowed size of triangle relative to world width.
 *     When transforming corners of world extent between certain projections,
 *     the resulting triangulation seems to have zero error and no subdivision
 *     is performed.
 *     If the triangle width is more than this (relative to world width; 0-1),
 *     subdivison is forced (up to `ol.RASTER_REPROJECTION_MAX_SUBDIVISION`).
 *     Default is `0.25`.
 */
_ol_.RASTER_REPROJECTION_MAX_TRIANGLE_WIDTH = 0.25;

/**
 * @define {number} Tolerance for geometry simplification in device pixels.
 */
_ol_.SIMPLIFY_TOLERANCE = 0.5;

/**
 * @define {number} Texture cache high water mark.
 */
_ol_.WEBGL_TEXTURE_CACHE_HIGH_WATER_MARK = 1024;

/**
 * @define {string} OpenLayers version.
 */
_ol_.VERSION = 'v4.6.4';

/**
 * The maximum supported WebGL texture size in pixels. If WebGL is not
 * supported, the value is set to `undefined`.
 * @const
 * @type {number|undefined}
 */
_ol_.WEBGL_MAX_TEXTURE_SIZE; // value is set in `ol.has`


/**
 * List of supported WebGL extensions.
 * @const
 * @type {Array.<string>}
 */
_ol_.WEBGL_EXTENSIONS; // value is set in `ol.has`


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * Usage:
 *
 *     function ParentClass(a, b) { }
 *     ParentClass.prototype.foo = function(a) { }
 *
 *     function ChildClass(a, b, c) {
 *       // Call parent constructor
 *       ParentClass.call(this, a, b);
 *     }
 *     ol.inherits(ChildClass, ParentClass);
 *
 *     var child = new ChildClass('a', 'b', 'see');
 *     child.foo(); // This works.
 *
 * @param {!Function} childCtor Child constructor.
 * @param {!Function} parentCtor Parent constructor.
 * @function
 * @api
 */
_ol_.inherits = function (childCtor, parentCtor) {
  childCtor.prototype = Object.create(parentCtor.prototype);
  childCtor.prototype.constructor = childCtor;
};

/**
 * A reusable function, used e.g. as a default for callbacks.
 *
 * @return {undefined} Nothing.
 */
_ol_.nullFunction = function () {};

/**
 * Gets a unique ID for an object. This mutates the object so that further calls
 * with the same object as a parameter returns the same value. Unique IDs are generated
 * as a strictly increasing sequence. Adapted from goog.getUid.
 *
 * @param {Object} obj The object to get the unique ID for.
 * @return {number} The unique ID for the object.
 */
_ol_.getUid = function (obj) {
  return obj.ol_uid || (obj.ol_uid = ++_ol_.uidCounter_);
};

/**
 * Counter for getUid.
 * @type {number}
 * @private
 */
_ol_.uidCounter_ = 0;
exports.default = _ol_;

},{}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asserts = require('./asserts.js');

var _asserts2 = _interopRequireDefault(_asserts);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _ol_math_ = {};

/**
 * Takes a number and clamps it to within the provided bounds.
 * @param {number} value The input number.
 * @param {number} min The minimum value to return.
 * @param {number} max The maximum value to return.
 * @return {number} The input number if it is within bounds, or the nearest
 *     number within the bounds.
 */
_ol_math_.clamp = function (value, min, max) {
  return Math.min(Math.max(value, min), max);
};

/**
 * Return the hyperbolic cosine of a given number. The method will use the
 * native `Math.cosh` function if it is available, otherwise the hyperbolic
 * cosine will be calculated via the reference implementation of the Mozilla
 * developer network.
 *
 * @param {number} x X.
 * @return {number} Hyperbolic cosine of x.
 */
_ol_math_.cosh = function () {
  // Wrapped in a iife, to save the overhead of checking for the native
  // implementation on every invocation.
  var cosh;
  if ('cosh' in Math) {
    // The environment supports the native Math.cosh function, use it…
    cosh = Math.cosh;
  } else {
    // … else, use the reference implementation of MDN:
    cosh = function cosh(x) {
      var y = Math.exp(x);
      return (y + 1 / y) / 2;
    };
  }
  return cosh;
}();

/**
 * @param {number} x X.
 * @return {number} The smallest power of two greater than or equal to x.
 */
_ol_math_.roundUpToPowerOfTwo = function (x) {
  _asserts2.default.assert(0 < x, 29); // `x` must be greater than `0`
  return Math.pow(2, Math.ceil(Math.log(x) / Math.LN2));
};

/**
 * Returns the square of the closest distance between the point (x, y) and the
 * line segment (x1, y1) to (x2, y2).
 * @param {number} x X.
 * @param {number} y Y.
 * @param {number} x1 X1.
 * @param {number} y1 Y1.
 * @param {number} x2 X2.
 * @param {number} y2 Y2.
 * @return {number} Squared distance.
 */
_ol_math_.squaredSegmentDistance = function (x, y, x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  if (dx !== 0 || dy !== 0) {
    var t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      x1 = x2;
      y1 = y2;
    } else if (t > 0) {
      x1 += dx * t;
      y1 += dy * t;
    }
  }
  return _ol_math_.squaredDistance(x, y, x1, y1);
};

/**
 * Returns the square of the distance between the points (x1, y1) and (x2, y2).
 * @param {number} x1 X1.
 * @param {number} y1 Y1.
 * @param {number} x2 X2.
 * @param {number} y2 Y2.
 * @return {number} Squared distance.
 */
_ol_math_.squaredDistance = function (x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return dx * dx + dy * dy;
};

/**
 * Solves system of linear equations using Gaussian elimination method.
 *
 * @param {Array.<Array.<number>>} mat Augmented matrix (n x n + 1 column)
 *                                     in row-major order.
 * @return {Array.<number>} The resulting vector.
 */
_ol_math_.solveLinearSystem = function (mat) {
  var n = mat.length;

  for (var i = 0; i < n; i++) {
    // Find max in the i-th column (ignoring i - 1 first rows)
    var maxRow = i;
    var maxEl = Math.abs(mat[i][i]);
    for (var r = i + 1; r < n; r++) {
      var absValue = Math.abs(mat[r][i]);
      if (absValue > maxEl) {
        maxEl = absValue;
        maxRow = r;
      }
    }

    if (maxEl === 0) {
      return null; // matrix is singular
    }

    // Swap max row with i-th (current) row
    var tmp = mat[maxRow];
    mat[maxRow] = mat[i];
    mat[i] = tmp;

    // Subtract the i-th row to make all the remaining rows 0 in the i-th column
    for (var j = i + 1; j < n; j++) {
      var coef = -mat[j][i] / mat[i][i];
      for (var k = i; k < n + 1; k++) {
        if (i == k) {
          mat[j][k] = 0;
        } else {
          mat[j][k] += coef * mat[i][k];
        }
      }
    }
  }

  // Solve Ax=b for upper triangular matrix A (mat)
  var x = new Array(n);
  for (var l = n - 1; l >= 0; l--) {
    x[l] = mat[l][n] / mat[l][l];
    for (var m = l - 1; m >= 0; m--) {
      mat[m][n] -= mat[m][l] * x[l];
    }
  }
  return x;
};

/**
 * Converts radians to to degrees.
 *
 * @param {number} angleInRadians Angle in radians.
 * @return {number} Angle in degrees.
 */
_ol_math_.toDegrees = function (angleInRadians) {
  return angleInRadians * 180 / Math.PI;
};

/**
 * Converts degrees to radians.
 *
 * @param {number} angleInDegrees Angle in degrees.
 * @return {number} Angle in radians.
 */
_ol_math_.toRadians = function (angleInDegrees) {
  return angleInDegrees * Math.PI / 180;
};

/**
 * Returns the modulo of a / b, depending on the sign of b.
 *
 * @param {number} a Dividend.
 * @param {number} b Divisor.
 * @return {number} Modulo.
 */
_ol_math_.modulo = function (a, b) {
  var r = a % b;
  return r * b < 0 ? r + b : r;
};

/**
 * Calculates the linearly interpolated value of x between a and b.
 *
 * @param {number} a Number
 * @param {number} b Number
 * @param {number} x Value to be interpolated.
 * @return {number} Interpolated value.
 */
_ol_math_.lerp = function (a, b, x) {
  return a + x * (b - a);
};
exports.default = _ol_math_;

},{"./asserts.js":13}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ol_obj_ = {};

/**
 * Polyfill for Object.assign().  Assigns enumerable and own properties from
 * one or more source objects to a target object.
 *
 * @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 * @param {!Object} target The target object.
 * @param {...Object} var_sources The source object(s).
 * @return {!Object} The modified target object.
 */
_ol_obj_.assign = typeof Object.assign === 'function' ? Object.assign : function (target, var_sources) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  for (var i = 1, ii = arguments.length; i < ii; ++i) {
    var source = arguments[i];
    if (source !== undefined && source !== null) {
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          output[key] = source[key];
        }
      }
    }
  }
  return output;
};

/**
 * Removes all properties from an object.
 * @param {Object} object The object to clear.
 */
_ol_obj_.clear = function (object) {
  for (var property in object) {
    delete object[property];
  }
};

/**
 * Get an array of property values from an object.
 * @param {Object<K,V>} object The object from which to get the values.
 * @return {!Array<V>} The property values.
 * @template K,V
 */
_ol_obj_.getValues = function (object) {
  var values = [];
  for (var property in object) {
    values.push(object[property]);
  }
  return values;
};

/**
 * Determine if an object has any properties.
 * @param {Object} object The object to check.
 * @return {boolean} The object is empty.
 */
_ol_obj_.isEmpty = function (object) {
  var property;
  for (property in object) {
    return false;
  }
  return !property;
};
exports.default = _ol_obj_;

},{}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./index.js');

var _index2 = _interopRequireDefault(_index);

var _objecteventtype = require('./objecteventtype.js');

var _objecteventtype2 = _interopRequireDefault(_objecteventtype);

var _observable = require('./observable.js');

var _observable2 = _interopRequireDefault(_observable);

var _event = require('./events/event.js');

var _event2 = _interopRequireDefault(_event);

var _obj = require('./obj.js');

var _obj2 = _interopRequireDefault(_obj);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Most non-trivial classes inherit from this.
 *
 * This extends {@link ol.Observable} with observable properties, where each
 * property is observable as well as the object as a whole.
 *
 * Classes that inherit from this have pre-defined properties, to which you can
 * add your owns. The pre-defined properties are listed in this documentation as
 * 'Observable Properties', and have their own accessors; for example,
 * {@link ol.Map} has a `target` property, accessed with `getTarget()`  and
 * changed with `setTarget()`. Not all properties are however settable. There
 * are also general-purpose accessors `get()` and `set()`. For example,
 * `get('target')` is equivalent to `getTarget()`.
 *
 * The `set` accessors trigger a change event, and you can monitor this by
 * registering a listener. For example, {@link ol.View} has a `center`
 * property, so `view.on('change:center', function(evt) {...});` would call the
 * function whenever the value of the center property changes. Within the
 * function, `evt.target` would be the view, so `evt.target.getCenter()` would
 * return the new center.
 *
 * You can add your own observable properties with
 * `object.set('prop', 'value')`, and retrieve that with `object.get('prop')`.
 * You can listen for changes on that property value with
 * `object.on('change:prop', listener)`. You can get a list of all
 * properties with {@link ol.Object#getProperties object.getProperties()}.
 *
 * Note that the observable properties are separate from standard JS properties.
 * You can, for example, give your map object a title with
 * `map.title='New title'` and with `map.set('title', 'Another title')`. The
 * first will be a `hasOwnProperty`; the second will appear in
 * `getProperties()`. Only the second is observable.
 *
 * Properties can be deleted by using the unset method. E.g.
 * object.unset('foo').
 *
 * @constructor
 * @extends {ol.Observable}
 * @param {Object.<string, *>=} opt_values An object with key-value pairs.
 * @fires ol.Object.Event
 * @api
 */
var _ol_Object_ = function _ol_Object_(opt_values) {
  _observable2.default.call(this);

  // Call ol.getUid to ensure that the order of objects' ids is the same as
  // the order in which they were created.  This also helps to ensure that
  // object properties are always added in the same order, which helps many
  // JavaScript engines generate faster code.
  _index2.default.getUid(this);

  /**
   * @private
   * @type {!Object.<string, *>}
   */
  this.values_ = {};

  if (opt_values !== undefined) {
    this.setProperties(opt_values);
  }
};

_index2.default.inherits(_ol_Object_, _observable2.default);

/**
 * @private
 * @type {Object.<string, string>}
 */
_ol_Object_.changeEventTypeCache_ = {};

/**
 * @param {string} key Key name.
 * @return {string} Change name.
 */
_ol_Object_.getChangeEventType = function (key) {
  return _ol_Object_.changeEventTypeCache_.hasOwnProperty(key) ? _ol_Object_.changeEventTypeCache_[key] : _ol_Object_.changeEventTypeCache_[key] = 'change:' + key;
};

/**
 * Gets a value.
 * @param {string} key Key name.
 * @return {*} Value.
 * @api
 */
_ol_Object_.prototype.get = function (key) {
  var value;
  if (this.values_.hasOwnProperty(key)) {
    value = this.values_[key];
  }
  return value;
};

/**
 * Get a list of object property names.
 * @return {Array.<string>} List of property names.
 * @api
 */
_ol_Object_.prototype.getKeys = function () {
  return Object.keys(this.values_);
};

/**
 * Get an object of all property names and values.
 * @return {Object.<string, *>} Object.
 * @api
 */
_ol_Object_.prototype.getProperties = function () {
  return _obj2.default.assign({}, this.values_);
};

/**
 * @param {string} key Key name.
 * @param {*} oldValue Old value.
 */
_ol_Object_.prototype.notify = function (key, oldValue) {
  var eventType;
  eventType = _ol_Object_.getChangeEventType(key);
  this.dispatchEvent(new _ol_Object_.Event(eventType, key, oldValue));
  eventType = _objecteventtype2.default.PROPERTYCHANGE;
  this.dispatchEvent(new _ol_Object_.Event(eventType, key, oldValue));
};

/**
 * Sets a value.
 * @param {string} key Key name.
 * @param {*} value Value.
 * @param {boolean=} opt_silent Update without triggering an event.
 * @api
 */
_ol_Object_.prototype.set = function (key, value, opt_silent) {
  if (opt_silent) {
    this.values_[key] = value;
  } else {
    var oldValue = this.values_[key];
    this.values_[key] = value;
    if (oldValue !== value) {
      this.notify(key, oldValue);
    }
  }
};

/**
 * Sets a collection of key-value pairs.  Note that this changes any existing
 * properties and adds new ones (it does not remove any existing properties).
 * @param {Object.<string, *>} values Values.
 * @param {boolean=} opt_silent Update without triggering an event.
 * @api
 */
_ol_Object_.prototype.setProperties = function (values, opt_silent) {
  var key;
  for (key in values) {
    this.set(key, values[key], opt_silent);
  }
};

/**
 * Unsets a property.
 * @param {string} key Key name.
 * @param {boolean=} opt_silent Unset without triggering an event.
 * @api
 */
_ol_Object_.prototype.unset = function (key, opt_silent) {
  if (key in this.values_) {
    var oldValue = this.values_[key];
    delete this.values_[key];
    if (!opt_silent) {
      this.notify(key, oldValue);
    }
  }
};

/**
 * @classdesc
 * Events emitted by {@link ol.Object} instances are instances of this type.
 *
 * @param {string} type The event type.
 * @param {string} key The property name.
 * @param {*} oldValue The old value for `key`.
 * @extends {ol.events.Event}
 * @implements {oli.Object.Event}
 * @constructor
 */
_ol_Object_.Event = function (type, key, oldValue) {
  _event2.default.call(this, type);

  /**
   * The name of the property whose value is changing.
   * @type {string}
   * @api
   */
  this.key = key;

  /**
   * The old value. To get the new value use `e.target.get(e.key)` where
   * `e` is the event object.
   * @type {*}
   * @api
   */
  this.oldValue = oldValue;
};
_index2.default.inherits(_ol_Object_.Event, _event2.default);
exports.default = _ol_Object_;

},{"./events/event.js":16,"./index.js":30,"./obj.js":32,"./objecteventtype.js":34,"./observable.js":35}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @enum {string}
 */
var _ol_ObjectEventType_ = {
  /**
   * Triggered when a property is changed.
   * @event ol.Object.Event#propertychange
   * @api
   */
  PROPERTYCHANGE: 'propertychange'
};

exports.default = _ol_ObjectEventType_;

},{}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./index.js');

var _index2 = _interopRequireDefault(_index);

var _events = require('./events.js');

var _events2 = _interopRequireDefault(_events);

var _eventtarget = require('./events/eventtarget.js');

var _eventtarget2 = _interopRequireDefault(_eventtarget);

var _eventtype = require('./events/eventtype.js');

var _eventtype2 = _interopRequireDefault(_eventtype);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * An event target providing convenient methods for listener registration
 * and unregistration. A generic `change` event is always available through
 * {@link ol.Observable#changed}.
 *
 * @constructor
 * @extends {ol.events.EventTarget}
 * @fires ol.events.Event
 * @struct
 * @api
 */
var _ol_Observable_ = function _ol_Observable_() {

  _eventtarget2.default.call(this);

  /**
   * @private
   * @type {number}
   */
  this.revision_ = 0;
};

_index2.default.inherits(_ol_Observable_, _eventtarget2.default);

/**
 * Removes an event listener using the key returned by `on()` or `once()`.
 * @param {ol.EventsKey|Array.<ol.EventsKey>} key The key returned by `on()`
 *     or `once()` (or an array of keys).
 * @api
 */
_ol_Observable_.unByKey = function (key) {
  if (Array.isArray(key)) {
    for (var i = 0, ii = key.length; i < ii; ++i) {
      _events2.default.unlistenByKey(key[i]);
    }
  } else {
    _events2.default.unlistenByKey( /** @type {ol.EventsKey} */key);
  }
};

/**
 * Increases the revision counter and dispatches a 'change' event.
 * @api
 */
_ol_Observable_.prototype.changed = function () {
  ++this.revision_;
  this.dispatchEvent(_eventtype2.default.CHANGE);
};

/**
 * Dispatches an event and calls all listeners listening for events
 * of this type. The event parameter can either be a string or an
 * Object with a `type` property.
 *
 * @param {{type: string,
 *     target: (EventTarget|ol.events.EventTarget|undefined)}|ol.events.Event|
 *     string} event Event object.
 * @function
 * @api
 */
_ol_Observable_.prototype.dispatchEvent;

/**
 * Get the version number for this object.  Each time the object is modified,
 * its version number will be incremented.
 * @return {number} Revision.
 * @api
 */
_ol_Observable_.prototype.getRevision = function () {
  return this.revision_;
};

/**
 * Listen for a certain type of event.
 * @param {string|Array.<string>} type The event type or array of event types.
 * @param {function(?): ?} listener The listener function.
 * @param {Object=} opt_this The object to use as `this` in `listener`.
 * @return {ol.EventsKey|Array.<ol.EventsKey>} Unique key for the listener. If
 *     called with an array of event types as the first argument, the return
 *     will be an array of keys.
 * @api
 */
_ol_Observable_.prototype.on = function (type, listener, opt_this) {
  if (Array.isArray(type)) {
    var len = type.length;
    var keys = new Array(len);
    for (var i = 0; i < len; ++i) {
      keys[i] = _events2.default.listen(this, type[i], listener, opt_this);
    }
    return keys;
  } else {
    return _events2.default.listen(this, /** @type {string} */type, listener, opt_this);
  }
};

/**
 * Listen once for a certain type of event.
 * @param {string|Array.<string>} type The event type or array of event types.
 * @param {function(?): ?} listener The listener function.
 * @param {Object=} opt_this The object to use as `this` in `listener`.
 * @return {ol.EventsKey|Array.<ol.EventsKey>} Unique key for the listener. If
 *     called with an array of event types as the first argument, the return
 *     will be an array of keys.
 * @api
 */
_ol_Observable_.prototype.once = function (type, listener, opt_this) {
  if (Array.isArray(type)) {
    var len = type.length;
    var keys = new Array(len);
    for (var i = 0; i < len; ++i) {
      keys[i] = _events2.default.listenOnce(this, type[i], listener, opt_this);
    }
    return keys;
  } else {
    return _events2.default.listenOnce(this, /** @type {string} */type, listener, opt_this);
  }
};

/**
 * Unlisten for a certain type of event.
 * @param {string|Array.<string>} type The event type or array of event types.
 * @param {function(?): ?} listener The listener function.
 * @param {Object=} opt_this The object which was used as `this` by the
 * `listener`.
 * @api
 */
_ol_Observable_.prototype.un = function (type, listener, opt_this) {
  if (Array.isArray(type)) {
    for (var i = 0, ii = type.length; i < ii; ++i) {
      _events2.default.unlisten(this, type[i], listener, opt_this);
    }
    return;
  } else {
    _events2.default.unlisten(this, /** @type {string} */type, listener, opt_this);
  }
};
exports.default = _ol_Observable_;

},{"./events.js":15,"./events/eventtarget.js":17,"./events/eventtype.js":18,"./index.js":30}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./index.js');

var _index2 = _interopRequireDefault(_index);

var _sphere = require('./sphere.js');

var _sphere2 = _interopRequireDefault(_sphere);

var _extent = require('./extent.js');

var _extent2 = _interopRequireDefault(_extent);

var _math = require('./math.js');

var _math2 = _interopRequireDefault(_math);

var _epsg = require('./proj/epsg3857.js');

var _epsg2 = _interopRequireDefault(_epsg);

var _epsg3 = require('./proj/epsg4326.js');

var _epsg4 = _interopRequireDefault(_epsg3);

var _projection = require('./proj/projection.js');

var _projection2 = _interopRequireDefault(_projection);

var _units = require('./proj/units.js');

var _units2 = _interopRequireDefault(_units);

var _proj = require('./proj/proj4.js');

var _proj2 = _interopRequireDefault(_proj);

var _projections = require('./proj/projections.js');

var _projections2 = _interopRequireDefault(_projections);

var _transforms = require('./proj/transforms.js');

var _transforms2 = _interopRequireDefault(_transforms);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _ol_proj_ = {};

/**
 * Meters per unit lookup table.
 * @const
 * @type {Object.<ol.proj.Units, number>}
 * @api
 */
_ol_proj_.METERS_PER_UNIT = _units2.default.METERS_PER_UNIT;

/**
 * A place to store the mean radius of the Earth.
 * @private
 * @type {ol.Sphere}
 */
_ol_proj_.SPHERE_ = new _sphere2.default(_sphere2.default.DEFAULT_RADIUS);

if (_index2.default.ENABLE_PROJ4JS) {
  /**
   * Register proj4. If not explicitly registered, it will be assumed that
   * proj4js will be loaded in the global namespace. For example in a
   * browserify ES6 environment you could use:
   *
   *     import ol from 'openlayers';
   *     import proj4 from 'proj4';
   *     ol.proj.setProj4(proj4);
   *
   * @param {Proj4} proj4 Proj4.
   * @api
   */
  _ol_proj_.setProj4 = function (proj4) {
    _proj2.default.set(proj4);
  };
}

/**
 * Get the resolution of the point in degrees or distance units.
 * For projections with degrees as the unit this will simply return the
 * provided resolution. For other projections the point resolution is
 * by default estimated by transforming the 'point' pixel to EPSG:4326,
 * measuring its width and height on the normal sphere,
 * and taking the average of the width and height.
 * A custom function can be provided for a specific projection, either
 * by setting the `getPointResolution` option in the
 * {@link ol.proj.Projection} constructor or by using
 * {@link ol.proj.Projection#setGetPointResolution} to change an existing
 * projection object.
 * @param {ol.ProjectionLike} projection The projection.
 * @param {number} resolution Nominal resolution in projection units.
 * @param {ol.Coordinate} point Point to find adjusted resolution at.
 * @param {ol.proj.Units=} opt_units Units to get the point resolution in.
 * Default is the projection's units.
 * @return {number} Point resolution.
 * @api
 */
_ol_proj_.getPointResolution = function (projection, resolution, point, opt_units) {
  projection = _ol_proj_.get(projection);
  var pointResolution;
  var getter = projection.getPointResolutionFunc();
  if (getter) {
    pointResolution = getter(resolution, point);
  } else {
    var units = projection.getUnits();
    if (units == _units2.default.DEGREES && !opt_units || opt_units == _units2.default.DEGREES) {
      pointResolution = resolution;
    } else {
      // Estimate point resolution by transforming the center pixel to EPSG:4326,
      // measuring its width and height on the normal sphere, and taking the
      // average of the width and height.
      var toEPSG4326 = _ol_proj_.getTransformFromProjections(projection, _ol_proj_.get('EPSG:4326'));
      var vertices = [point[0] - resolution / 2, point[1], point[0] + resolution / 2, point[1], point[0], point[1] - resolution / 2, point[0], point[1] + resolution / 2];
      vertices = toEPSG4326(vertices, vertices, 2);
      var width = _ol_proj_.SPHERE_.haversineDistance(vertices.slice(0, 2), vertices.slice(2, 4));
      var height = _ol_proj_.SPHERE_.haversineDistance(vertices.slice(4, 6), vertices.slice(6, 8));
      pointResolution = (width + height) / 2;
      var metersPerUnit = opt_units ? _units2.default.METERS_PER_UNIT[opt_units] : projection.getMetersPerUnit();
      if (metersPerUnit !== undefined) {
        pointResolution /= metersPerUnit;
      }
    }
  }
  return pointResolution;
};

/**
 * Registers transformation functions that don't alter coordinates. Those allow
 * to transform between projections with equal meaning.
 *
 * @param {Array.<ol.proj.Projection>} projections Projections.
 * @api
 */
_ol_proj_.addEquivalentProjections = function (projections) {
  _ol_proj_.addProjections(projections);
  projections.forEach(function (source) {
    projections.forEach(function (destination) {
      if (source !== destination) {
        _transforms2.default.add(source, destination, _ol_proj_.cloneTransform);
      }
    });
  });
};

/**
 * Registers transformation functions to convert coordinates in any projection
 * in projection1 to any projection in projection2.
 *
 * @param {Array.<ol.proj.Projection>} projections1 Projections with equal
 *     meaning.
 * @param {Array.<ol.proj.Projection>} projections2 Projections with equal
 *     meaning.
 * @param {ol.TransformFunction} forwardTransform Transformation from any
 *   projection in projection1 to any projection in projection2.
 * @param {ol.TransformFunction} inverseTransform Transform from any projection
 *   in projection2 to any projection in projection1..
 */
_ol_proj_.addEquivalentTransforms = function (projections1, projections2, forwardTransform, inverseTransform) {
  projections1.forEach(function (projection1) {
    projections2.forEach(function (projection2) {
      _transforms2.default.add(projection1, projection2, forwardTransform);
      _transforms2.default.add(projection2, projection1, inverseTransform);
    });
  });
};

/**
 * Add a Projection object to the list of supported projections that can be
 * looked up by their code.
 *
 * @param {ol.proj.Projection} projection Projection instance.
 * @api
 */
_ol_proj_.addProjection = function (projection) {
  _projections2.default.add(projection.getCode(), projection);
  _transforms2.default.add(projection, projection, _ol_proj_.cloneTransform);
};

/**
 * @param {Array.<ol.proj.Projection>} projections Projections.
 */
_ol_proj_.addProjections = function (projections) {
  projections.forEach(_ol_proj_.addProjection);
};

/**
 * Clear all cached projections and transforms.
 */
_ol_proj_.clearAllProjections = function () {
  _projections2.default.clear();
  _transforms2.default.clear();
};

/**
 * @param {ol.proj.Projection|string|undefined} projection Projection.
 * @param {string} defaultCode Default code.
 * @return {ol.proj.Projection} Projection.
 */
_ol_proj_.createProjection = function (projection, defaultCode) {
  if (!projection) {
    return _ol_proj_.get(defaultCode);
  } else if (typeof projection === 'string') {
    return _ol_proj_.get(projection);
  } else {
    return (/** @type {ol.proj.Projection} */projection
    );
  }
};

/**
 * Registers coordinate transform functions to convert coordinates between the
 * source projection and the destination projection.
 * The forward and inverse functions convert coordinate pairs; this function
 * converts these into the functions used internally which also handle
 * extents and coordinate arrays.
 *
 * @param {ol.ProjectionLike} source Source projection.
 * @param {ol.ProjectionLike} destination Destination projection.
 * @param {function(ol.Coordinate): ol.Coordinate} forward The forward transform
 *     function (that is, from the source projection to the destination
 *     projection) that takes a {@link ol.Coordinate} as argument and returns
 *     the transformed {@link ol.Coordinate}.
 * @param {function(ol.Coordinate): ol.Coordinate} inverse The inverse transform
 *     function (that is, from the destination projection to the source
 *     projection) that takes a {@link ol.Coordinate} as argument and returns
 *     the transformed {@link ol.Coordinate}.
 * @api
 */
_ol_proj_.addCoordinateTransforms = function (source, destination, forward, inverse) {
  var sourceProj = _ol_proj_.get(source);
  var destProj = _ol_proj_.get(destination);
  _transforms2.default.add(sourceProj, destProj, _ol_proj_.createTransformFromCoordinateTransform(forward));
  _transforms2.default.add(destProj, sourceProj, _ol_proj_.createTransformFromCoordinateTransform(inverse));
};

/**
 * Creates a {@link ol.TransformFunction} from a simple 2D coordinate transform
 * function.
 * @param {function(ol.Coordinate): ol.Coordinate} transform Coordinate
 *     transform.
 * @return {ol.TransformFunction} Transform function.
 */
_ol_proj_.createTransformFromCoordinateTransform = function (transform) {
  return (
    /**
     * @param {Array.<number>} input Input.
     * @param {Array.<number>=} opt_output Output.
     * @param {number=} opt_dimension Dimension.
     * @return {Array.<number>} Output.
     */
    function (input, opt_output, opt_dimension) {
      var length = input.length;
      var dimension = opt_dimension !== undefined ? opt_dimension : 2;
      var output = opt_output !== undefined ? opt_output : new Array(length);
      var point, i, j;
      for (i = 0; i < length; i += dimension) {
        point = transform([input[i], input[i + 1]]);
        output[i] = point[0];
        output[i + 1] = point[1];
        for (j = dimension - 1; j >= 2; --j) {
          output[i + j] = input[i + j];
        }
      }
      return output;
    }
  );
};

/**
 * Transforms a coordinate from longitude/latitude to a different projection.
 * @param {ol.Coordinate} coordinate Coordinate as longitude and latitude, i.e.
 *     an array with longitude as 1st and latitude as 2nd element.
 * @param {ol.ProjectionLike=} opt_projection Target projection. The
 *     default is Web Mercator, i.e. 'EPSG:3857'.
 * @return {ol.Coordinate} Coordinate projected to the target projection.
 * @api
 */
_ol_proj_.fromLonLat = function (coordinate, opt_projection) {
  return _ol_proj_.transform(coordinate, 'EPSG:4326', opt_projection !== undefined ? opt_projection : 'EPSG:3857');
};

/**
 * Transforms a coordinate to longitude/latitude.
 * @param {ol.Coordinate} coordinate Projected coordinate.
 * @param {ol.ProjectionLike=} opt_projection Projection of the coordinate.
 *     The default is Web Mercator, i.e. 'EPSG:3857'.
 * @return {ol.Coordinate} Coordinate as longitude and latitude, i.e. an array
 *     with longitude as 1st and latitude as 2nd element.
 * @api
 */
_ol_proj_.toLonLat = function (coordinate, opt_projection) {
  var lonLat = _ol_proj_.transform(coordinate, opt_projection !== undefined ? opt_projection : 'EPSG:3857', 'EPSG:4326');
  var lon = lonLat[0];
  if (lon < -180 || lon > 180) {
    lonLat[0] = _math2.default.modulo(lon + 180, 360) - 180;
  }
  return lonLat;
};

/**
 * Fetches a Projection object for the code specified.
 *
 * @param {ol.ProjectionLike} projectionLike Either a code string which is
 *     a combination of authority and identifier such as "EPSG:4326", or an
 *     existing projection object, or undefined.
 * @return {ol.proj.Projection} Projection object, or null if not in list.
 * @api
 */
_ol_proj_.get = function (projectionLike) {
  var projection = null;
  if (projectionLike instanceof _projection2.default) {
    projection = projectionLike;
  } else if (typeof projectionLike === 'string') {
    var code = projectionLike;
    projection = _projections2.default.get(code);
    if (_index2.default.ENABLE_PROJ4JS && !projection) {
      var proj4js = _proj2.default.get();
      if (typeof proj4js == 'function' && proj4js.defs(code) !== undefined) {
        projection = new _projection2.default({ code: code });
        _ol_proj_.addProjection(projection);
      }
    }
  }
  return projection;
};

/**
 * Checks if two projections are the same, that is every coordinate in one
 * projection does represent the same geographic point as the same coordinate in
 * the other projection.
 *
 * @param {ol.proj.Projection} projection1 Projection 1.
 * @param {ol.proj.Projection} projection2 Projection 2.
 * @return {boolean} Equivalent.
 * @api
 */
_ol_proj_.equivalent = function (projection1, projection2) {
  if (projection1 === projection2) {
    return true;
  }
  var equalUnits = projection1.getUnits() === projection2.getUnits();
  if (projection1.getCode() === projection2.getCode()) {
    return equalUnits;
  } else {
    var transformFn = _ol_proj_.getTransformFromProjections(projection1, projection2);
    return transformFn === _ol_proj_.cloneTransform && equalUnits;
  }
};

/**
 * Given the projection-like objects, searches for a transformation
 * function to convert a coordinates array from the source projection to the
 * destination projection.
 *
 * @param {ol.ProjectionLike} source Source.
 * @param {ol.ProjectionLike} destination Destination.
 * @return {ol.TransformFunction} Transform function.
 * @api
 */
_ol_proj_.getTransform = function (source, destination) {
  var sourceProjection = _ol_proj_.get(source);
  var destinationProjection = _ol_proj_.get(destination);
  return _ol_proj_.getTransformFromProjections(sourceProjection, destinationProjection);
};

/**
 * Searches in the list of transform functions for the function for converting
 * coordinates from the source projection to the destination projection.
 *
 * @param {ol.proj.Projection} sourceProjection Source Projection object.
 * @param {ol.proj.Projection} destinationProjection Destination Projection
 *     object.
 * @return {ol.TransformFunction} Transform function.
 */
_ol_proj_.getTransformFromProjections = function (sourceProjection, destinationProjection) {
  var sourceCode = sourceProjection.getCode();
  var destinationCode = destinationProjection.getCode();
  var transform = _transforms2.default.get(sourceCode, destinationCode);
  if (_index2.default.ENABLE_PROJ4JS && !transform) {
    var proj4js = _proj2.default.get();
    if (typeof proj4js == 'function') {
      var sourceDef = proj4js.defs(sourceCode);
      var destinationDef = proj4js.defs(destinationCode);

      if (sourceDef !== undefined && destinationDef !== undefined) {
        if (sourceDef === destinationDef) {
          _ol_proj_.addEquivalentProjections([destinationProjection, sourceProjection]);
        } else {
          var proj4Transform = proj4js(destinationCode, sourceCode);
          _ol_proj_.addCoordinateTransforms(destinationProjection, sourceProjection, proj4Transform.forward, proj4Transform.inverse);
        }
        transform = _transforms2.default.get(sourceCode, destinationCode);
      }
    }
  }
  if (!transform) {
    transform = _ol_proj_.identityTransform;
  }
  return transform;
};

/**
 * @param {Array.<number>} input Input coordinate array.
 * @param {Array.<number>=} opt_output Output array of coordinate values.
 * @param {number=} opt_dimension Dimension.
 * @return {Array.<number>} Input coordinate array (same array as input).
 */
_ol_proj_.identityTransform = function (input, opt_output, opt_dimension) {
  if (opt_output !== undefined && input !== opt_output) {
    for (var i = 0, ii = input.length; i < ii; ++i) {
      opt_output[i] = input[i];
    }
    input = opt_output;
  }
  return input;
};

/**
 * @param {Array.<number>} input Input coordinate array.
 * @param {Array.<number>=} opt_output Output array of coordinate values.
 * @param {number=} opt_dimension Dimension.
 * @return {Array.<number>} Output coordinate array (new array, same coordinate
 *     values).
 */
_ol_proj_.cloneTransform = function (input, opt_output, opt_dimension) {
  var output;
  if (opt_output !== undefined) {
    for (var i = 0, ii = input.length; i < ii; ++i) {
      opt_output[i] = input[i];
    }
    output = opt_output;
  } else {
    output = input.slice();
  }
  return output;
};

/**
 * Transforms a coordinate from source projection to destination projection.
 * This returns a new coordinate (and does not modify the original).
 *
 * See {@link ol.proj.transformExtent} for extent transformation.
 * See the transform method of {@link ol.geom.Geometry} and its subclasses for
 * geometry transforms.
 *
 * @param {ol.Coordinate} coordinate Coordinate.
 * @param {ol.ProjectionLike} source Source projection-like.
 * @param {ol.ProjectionLike} destination Destination projection-like.
 * @return {ol.Coordinate} Coordinate.
 * @api
 */
_ol_proj_.transform = function (coordinate, source, destination) {
  var transformFn = _ol_proj_.getTransform(source, destination);
  return transformFn(coordinate, undefined, coordinate.length);
};

/**
 * Transforms an extent from source projection to destination projection.  This
 * returns a new extent (and does not modify the original).
 *
 * @param {ol.Extent} extent The extent to transform.
 * @param {ol.ProjectionLike} source Source projection-like.
 * @param {ol.ProjectionLike} destination Destination projection-like.
 * @return {ol.Extent} The transformed extent.
 * @api
 */
_ol_proj_.transformExtent = function (extent, source, destination) {
  var transformFn = _ol_proj_.getTransform(source, destination);
  return _extent2.default.applyTransform(extent, transformFn);
};

/**
 * Transforms the given point to the destination projection.
 *
 * @param {ol.Coordinate} point Point.
 * @param {ol.proj.Projection} sourceProjection Source projection.
 * @param {ol.proj.Projection} destinationProjection Destination projection.
 * @return {ol.Coordinate} Point.
 */
_ol_proj_.transformWithProjections = function (point, sourceProjection, destinationProjection) {
  var transformFn = _ol_proj_.getTransformFromProjections(sourceProjection, destinationProjection);
  return transformFn(point);
};

/**
 * Add transforms to and from EPSG:4326 and EPSG:3857.  This function is called
 * by when this module is executed and should only need to be called again after
 * `ol.proj.clearAllProjections()` is called (e.g. in tests).
 */
_ol_proj_.addCommon = function () {
  // Add transformations that don't alter coordinates to convert within set of
  // projections with equal meaning.
  _ol_proj_.addEquivalentProjections(_epsg2.default.PROJECTIONS);
  _ol_proj_.addEquivalentProjections(_epsg4.default.PROJECTIONS);
  // Add transformations to convert EPSG:4326 like coordinates to EPSG:3857 like
  // coordinates and back.
  _ol_proj_.addEquivalentTransforms(_epsg4.default.PROJECTIONS, _epsg2.default.PROJECTIONS, _epsg2.default.fromEPSG4326, _epsg2.default.toEPSG4326);
};

_ol_proj_.addCommon();
exports.default = _ol_proj_;

},{"./extent.js":19,"./index.js":30,"./math.js":31,"./proj/epsg3857.js":37,"./proj/epsg4326.js":38,"./proj/proj4.js":39,"./proj/projection.js":40,"./proj/projections.js":41,"./proj/transforms.js":42,"./proj/units.js":43,"./sphere.js":44}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

var _math = require('../math.js');

var _math2 = _interopRequireDefault(_math);

var _projection = require('../proj/projection.js');

var _projection2 = _interopRequireDefault(_projection);

var _units = require('../proj/units.js');

var _units2 = _interopRequireDefault(_units);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _ol_proj_EPSG3857_ = {};

/**
 * @classdesc
 * Projection object for web/spherical Mercator (EPSG:3857).
 *
 * @constructor
 * @extends {ol.proj.Projection}
 * @param {string} code Code.
 * @private
 */
_ol_proj_EPSG3857_.Projection_ = function (code) {
  _projection2.default.call(this, {
    code: code,
    units: _units2.default.METERS,
    extent: _ol_proj_EPSG3857_.EXTENT,
    global: true,
    worldExtent: _ol_proj_EPSG3857_.WORLD_EXTENT,
    getPointResolution: function getPointResolution(resolution, point) {
      return resolution / _math2.default.cosh(point[1] / _ol_proj_EPSG3857_.RADIUS);
    }
  });
};
_index2.default.inherits(_ol_proj_EPSG3857_.Projection_, _projection2.default);

/**
 * Radius of WGS84 sphere
 *
 * @const
 * @type {number}
 */
_ol_proj_EPSG3857_.RADIUS = 6378137;

/**
 * @const
 * @type {number}
 */
_ol_proj_EPSG3857_.HALF_SIZE = Math.PI * _ol_proj_EPSG3857_.RADIUS;

/**
 * @const
 * @type {ol.Extent}
 */
_ol_proj_EPSG3857_.EXTENT = [-_ol_proj_EPSG3857_.HALF_SIZE, -_ol_proj_EPSG3857_.HALF_SIZE, _ol_proj_EPSG3857_.HALF_SIZE, _ol_proj_EPSG3857_.HALF_SIZE];

/**
 * @const
 * @type {ol.Extent}
 */
_ol_proj_EPSG3857_.WORLD_EXTENT = [-180, -85, 180, 85];

/**
 * Projections equal to EPSG:3857.
 *
 * @const
 * @type {Array.<ol.proj.Projection>}
 */
_ol_proj_EPSG3857_.PROJECTIONS = [new _ol_proj_EPSG3857_.Projection_('EPSG:3857'), new _ol_proj_EPSG3857_.Projection_('EPSG:102100'), new _ol_proj_EPSG3857_.Projection_('EPSG:102113'), new _ol_proj_EPSG3857_.Projection_('EPSG:900913'), new _ol_proj_EPSG3857_.Projection_('urn:ogc:def:crs:EPSG:6.18:3:3857'), new _ol_proj_EPSG3857_.Projection_('urn:ogc:def:crs:EPSG::3857'), new _ol_proj_EPSG3857_.Projection_('http://www.opengis.net/gml/srs/epsg.xml#3857')];

/**
 * Transformation from EPSG:4326 to EPSG:3857.
 *
 * @param {Array.<number>} input Input array of coordinate values.
 * @param {Array.<number>=} opt_output Output array of coordinate values.
 * @param {number=} opt_dimension Dimension (default is `2`).
 * @return {Array.<number>} Output array of coordinate values.
 */
_ol_proj_EPSG3857_.fromEPSG4326 = function (input, opt_output, opt_dimension) {
  var length = input.length,
      dimension = opt_dimension > 1 ? opt_dimension : 2,
      output = opt_output;
  if (output === undefined) {
    if (dimension > 2) {
      // preserve values beyond second dimension
      output = input.slice();
    } else {
      output = new Array(length);
    }
  }
  var halfSize = _ol_proj_EPSG3857_.HALF_SIZE;
  for (var i = 0; i < length; i += dimension) {
    output[i] = halfSize * input[i] / 180;
    var y = _ol_proj_EPSG3857_.RADIUS * Math.log(Math.tan(Math.PI * (input[i + 1] + 90) / 360));
    if (y > halfSize) {
      y = halfSize;
    } else if (y < -halfSize) {
      y = -halfSize;
    }
    output[i + 1] = y;
  }
  return output;
};

/**
 * Transformation from EPSG:3857 to EPSG:4326.
 *
 * @param {Array.<number>} input Input array of coordinate values.
 * @param {Array.<number>=} opt_output Output array of coordinate values.
 * @param {number=} opt_dimension Dimension (default is `2`).
 * @return {Array.<number>} Output array of coordinate values.
 */
_ol_proj_EPSG3857_.toEPSG4326 = function (input, opt_output, opt_dimension) {
  var length = input.length,
      dimension = opt_dimension > 1 ? opt_dimension : 2,
      output = opt_output;
  if (output === undefined) {
    if (dimension > 2) {
      // preserve values beyond second dimension
      output = input.slice();
    } else {
      output = new Array(length);
    }
  }
  for (var i = 0; i < length; i += dimension) {
    output[i] = 180 * input[i] / _ol_proj_EPSG3857_.HALF_SIZE;
    output[i + 1] = 360 * Math.atan(Math.exp(input[i + 1] / _ol_proj_EPSG3857_.RADIUS)) / Math.PI - 90;
  }
  return output;
};
exports.default = _ol_proj_EPSG3857_;

},{"../index.js":30,"../math.js":31,"../proj/projection.js":40,"../proj/units.js":43}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

var _projection = require('../proj/projection.js');

var _projection2 = _interopRequireDefault(_projection);

var _units = require('../proj/units.js');

var _units2 = _interopRequireDefault(_units);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _ol_proj_EPSG4326_ = {};

/**
 * @classdesc
 * Projection object for WGS84 geographic coordinates (EPSG:4326).
 *
 * Note that OpenLayers does not strictly comply with the EPSG definition.
 * The EPSG registry defines 4326 as a CRS for Latitude,Longitude (y,x).
 * OpenLayers treats EPSG:4326 as a pseudo-projection, with x,y coordinates.
 *
 * @constructor
 * @extends {ol.proj.Projection}
 * @param {string} code Code.
 * @param {string=} opt_axisOrientation Axis orientation.
 * @private
 */
_ol_proj_EPSG4326_.Projection_ = function (code, opt_axisOrientation) {
  _projection2.default.call(this, {
    code: code,
    units: _units2.default.DEGREES,
    extent: _ol_proj_EPSG4326_.EXTENT,
    axisOrientation: opt_axisOrientation,
    global: true,
    metersPerUnit: _ol_proj_EPSG4326_.METERS_PER_UNIT,
    worldExtent: _ol_proj_EPSG4326_.EXTENT
  });
};
_index2.default.inherits(_ol_proj_EPSG4326_.Projection_, _projection2.default);

/**
 * Radius of WGS84 sphere
 *
 * @const
 * @type {number}
 */
_ol_proj_EPSG4326_.RADIUS = 6378137;

/**
 * Extent of the EPSG:4326 projection which is the whole world.
 *
 * @const
 * @type {ol.Extent}
 */
_ol_proj_EPSG4326_.EXTENT = [-180, -90, 180, 90];

/**
 * @const
 * @type {number}
 */
_ol_proj_EPSG4326_.METERS_PER_UNIT = Math.PI * _ol_proj_EPSG4326_.RADIUS / 180;

/**
 * Projections equal to EPSG:4326.
 *
 * @const
 * @type {Array.<ol.proj.Projection>}
 */
_ol_proj_EPSG4326_.PROJECTIONS = [new _ol_proj_EPSG4326_.Projection_('CRS:84'), new _ol_proj_EPSG4326_.Projection_('EPSG:4326', 'neu'), new _ol_proj_EPSG4326_.Projection_('urn:ogc:def:crs:EPSG::4326', 'neu'), new _ol_proj_EPSG4326_.Projection_('urn:ogc:def:crs:EPSG:6.6:4326', 'neu'), new _ol_proj_EPSG4326_.Projection_('urn:ogc:def:crs:OGC:1.3:CRS84'), new _ol_proj_EPSG4326_.Projection_('urn:ogc:def:crs:OGC:2:84'), new _ol_proj_EPSG4326_.Projection_('http://www.opengis.net/gml/srs/epsg.xml#4326', 'neu'), new _ol_proj_EPSG4326_.Projection_('urn:x-ogc:def:crs:EPSG:4326', 'neu')];
exports.default = _ol_proj_EPSG4326_;

},{"../index.js":30,"../proj/projection.js":40,"../proj/units.js":43}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ol_proj_proj4_ = {};

/**
 * @private
 * @type {Proj4}
 */
_ol_proj_proj4_.cache_ = null;

/**
 * Store the proj4 function.
 * @param {Proj4} proj4 The proj4 function.
 */
_ol_proj_proj4_.set = function (proj4) {
  _ol_proj_proj4_.cache_ = proj4;
};

/**
 * Get proj4.
 * @return {Proj4} The proj4 function set above or available globally.
 */
_ol_proj_proj4_.get = function () {
  return _ol_proj_proj4_.cache_ || window['proj4'];
};
exports.default = _ol_proj_proj4_;

},{}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

var _units = require('../proj/units.js');

var _units2 = _interopRequireDefault(_units);

var _proj = require('../proj/proj4.js');

var _proj2 = _interopRequireDefault(_proj);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @classdesc
 * Projection definition class. One of these is created for each projection
 * supported in the application and stored in the {@link ol.proj} namespace.
 * You can use these in applications, but this is not required, as API params
 * and options use {@link ol.ProjectionLike} which means the simple string
 * code will suffice.
 *
 * You can use {@link ol.proj.get} to retrieve the object for a particular
 * projection.
 *
 * The library includes definitions for `EPSG:4326` and `EPSG:3857`, together
 * with the following aliases:
 * * `EPSG:4326`: CRS:84, urn:ogc:def:crs:EPSG:6.6:4326,
 *     urn:ogc:def:crs:OGC:1.3:CRS84, urn:ogc:def:crs:OGC:2:84,
 *     http://www.opengis.net/gml/srs/epsg.xml#4326,
 *     urn:x-ogc:def:crs:EPSG:4326
 * * `EPSG:3857`: EPSG:102100, EPSG:102113, EPSG:900913,
 *     urn:ogc:def:crs:EPSG:6.18:3:3857,
 *     http://www.opengis.net/gml/srs/epsg.xml#3857
 *
 * If you use proj4js, aliases can be added using `proj4.defs()`; see
 * [documentation](https://github.com/proj4js/proj4js). To set an alternative
 * namespace for proj4, use {@link ol.proj.setProj4}.
 *
 * @constructor
 * @param {olx.ProjectionOptions} options Projection options.
 * @struct
 * @api
 */
var _ol_proj_Projection_ = function _ol_proj_Projection_(options) {
  /**
   * @private
   * @type {string}
   */
  this.code_ = options.code;

  /**
   * Units of projected coordinates. When set to `ol.proj.Units.TILE_PIXELS`, a
   * `this.extent_` and `this.worldExtent_` must be configured properly for each
   * tile.
   * @private
   * @type {ol.proj.Units}
   */
  this.units_ = /** @type {ol.proj.Units} */options.units;

  /**
   * Validity extent of the projection in projected coordinates. For projections
   * with `ol.proj.Units.TILE_PIXELS` units, this is the extent of the tile in
   * tile pixel space.
   * @private
   * @type {ol.Extent}
   */
  this.extent_ = options.extent !== undefined ? options.extent : null;

  /**
   * Extent of the world in EPSG:4326. For projections with
   * `ol.proj.Units.TILE_PIXELS` units, this is the extent of the tile in
   * projected coordinate space.
   * @private
   * @type {ol.Extent}
   */
  this.worldExtent_ = options.worldExtent !== undefined ? options.worldExtent : null;

  /**
   * @private
   * @type {string}
   */
  this.axisOrientation_ = options.axisOrientation !== undefined ? options.axisOrientation : 'enu';

  /**
   * @private
   * @type {boolean}
   */
  this.global_ = options.global !== undefined ? options.global : false;

  /**
   * @private
   * @type {boolean}
   */
  this.canWrapX_ = !!(this.global_ && this.extent_);

  /**
   * @private
   * @type {function(number, ol.Coordinate):number|undefined}
   */
  this.getPointResolutionFunc_ = options.getPointResolution;

  /**
   * @private
   * @type {ol.tilegrid.TileGrid}
   */
  this.defaultTileGrid_ = null;

  /**
   * @private
   * @type {number|undefined}
   */
  this.metersPerUnit_ = options.metersPerUnit;

  var code = options.code;
  if (_index2.default.ENABLE_PROJ4JS) {
    var proj4js = _proj2.default.get();
    if (typeof proj4js == 'function') {
      var def = proj4js.defs(code);
      if (def !== undefined) {
        if (def.axis !== undefined && options.axisOrientation === undefined) {
          this.axisOrientation_ = def.axis;
        }
        if (options.metersPerUnit === undefined) {
          this.metersPerUnit_ = def.to_meter;
        }
        if (options.units === undefined) {
          this.units_ = def.units;
        }
      }
    }
  }
};

/**
 * @return {boolean} The projection is suitable for wrapping the x-axis
 */
_ol_proj_Projection_.prototype.canWrapX = function () {
  return this.canWrapX_;
};

/**
 * Get the code for this projection, e.g. 'EPSG:4326'.
 * @return {string} Code.
 * @api
 */
_ol_proj_Projection_.prototype.getCode = function () {
  return this.code_;
};

/**
 * Get the validity extent for this projection.
 * @return {ol.Extent} Extent.
 * @api
 */
_ol_proj_Projection_.prototype.getExtent = function () {
  return this.extent_;
};

/**
 * Get the units of this projection.
 * @return {ol.proj.Units} Units.
 * @api
 */
_ol_proj_Projection_.prototype.getUnits = function () {
  return this.units_;
};

/**
 * Get the amount of meters per unit of this projection.  If the projection is
 * not configured with `metersPerUnit` or a units identifier, the return is
 * `undefined`.
 * @return {number|undefined} Meters.
 * @api
 */
_ol_proj_Projection_.prototype.getMetersPerUnit = function () {
  return this.metersPerUnit_ || _units2.default.METERS_PER_UNIT[this.units_];
};

/**
 * Get the world extent for this projection.
 * @return {ol.Extent} Extent.
 * @api
 */
_ol_proj_Projection_.prototype.getWorldExtent = function () {
  return this.worldExtent_;
};

/**
 * Get the axis orientation of this projection.
 * Example values are:
 * enu - the default easting, northing, elevation.
 * neu - northing, easting, up - useful for "lat/long" geographic coordinates,
 *     or south orientated transverse mercator.
 * wnu - westing, northing, up - some planetary coordinate systems have
 *     "west positive" coordinate systems
 * @return {string} Axis orientation.
 * @api
 */
_ol_proj_Projection_.prototype.getAxisOrientation = function () {
  return this.axisOrientation_;
};

/**
 * Is this projection a global projection which spans the whole world?
 * @return {boolean} Whether the projection is global.
 * @api
 */
_ol_proj_Projection_.prototype.isGlobal = function () {
  return this.global_;
};

/**
* Set if the projection is a global projection which spans the whole world
* @param {boolean} global Whether the projection is global.
* @api
*/
_ol_proj_Projection_.prototype.setGlobal = function (global) {
  this.global_ = global;
  this.canWrapX_ = !!(global && this.extent_);
};

/**
 * @return {ol.tilegrid.TileGrid} The default tile grid.
 */
_ol_proj_Projection_.prototype.getDefaultTileGrid = function () {
  return this.defaultTileGrid_;
};

/**
 * @param {ol.tilegrid.TileGrid} tileGrid The default tile grid.
 */
_ol_proj_Projection_.prototype.setDefaultTileGrid = function (tileGrid) {
  this.defaultTileGrid_ = tileGrid;
};

/**
 * Set the validity extent for this projection.
 * @param {ol.Extent} extent Extent.
 * @api
 */
_ol_proj_Projection_.prototype.setExtent = function (extent) {
  this.extent_ = extent;
  this.canWrapX_ = !!(this.global_ && extent);
};

/**
 * Set the world extent for this projection.
 * @param {ol.Extent} worldExtent World extent
 *     [minlon, minlat, maxlon, maxlat].
 * @api
 */
_ol_proj_Projection_.prototype.setWorldExtent = function (worldExtent) {
  this.worldExtent_ = worldExtent;
};

/**
 * Set the getPointResolution function (see {@link ol.proj#getPointResolution}
 * for this projection.
 * @param {function(number, ol.Coordinate):number} func Function
 * @api
 */
_ol_proj_Projection_.prototype.setGetPointResolution = function (func) {
  this.getPointResolutionFunc_ = func;
};

/**
 * Get the custom point resolution function for this projection (if set).
 * @return {function(number, ol.Coordinate):number|undefined} The custom point
 * resolution function (if set).
 */
_ol_proj_Projection_.prototype.getPointResolutionFunc = function () {
  return this.getPointResolutionFunc_;
};
exports.default = _ol_proj_Projection_;

},{"../index.js":30,"../proj/proj4.js":39,"../proj/units.js":43}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _ol_proj_projections_ = {};

/**
 * @private
 * @type {Object.<string, ol.proj.Projection>}
 */
_ol_proj_projections_.cache_ = {};

/**
 * Clear the projections cache.
 */
_ol_proj_projections_.clear = function () {
  _ol_proj_projections_.cache_ = {};
};

/**
 * Get a cached projection by code.
 * @param {string} code The code for the projection.
 * @return {ol.proj.Projection} The projection (if cached).
 */
_ol_proj_projections_.get = function (code) {
  var projections = _ol_proj_projections_.cache_;
  return projections[code] || null;
};

/**
 * Add a projection to the cache.
 * @param {string} code The projection code.
 * @param {ol.proj.Projection} projection The projection to cache.
 */
_ol_proj_projections_.add = function (code, projection) {
  var projections = _ol_proj_projections_.cache_;
  projections[code] = projection;
};
exports.default = _ol_proj_projections_;

},{}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _obj = require('../obj.js');

var _obj2 = _interopRequireDefault(_obj);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _ol_proj_transforms_ = {};

/**
 * @private
 * @type {Object.<string, Object.<string, ol.TransformFunction>>}
 */
_ol_proj_transforms_.cache_ = {};

/**
 * Clear the transform cache.
 */
_ol_proj_transforms_.clear = function () {
  _ol_proj_transforms_.cache_ = {};
};

/**
 * Registers a conversion function to convert coordinates from the source
 * projection to the destination projection.
 *
 * @param {ol.proj.Projection} source Source.
 * @param {ol.proj.Projection} destination Destination.
 * @param {ol.TransformFunction} transformFn Transform.
 */
_ol_proj_transforms_.add = function (source, destination, transformFn) {
  var sourceCode = source.getCode();
  var destinationCode = destination.getCode();
  var transforms = _ol_proj_transforms_.cache_;
  if (!(sourceCode in transforms)) {
    transforms[sourceCode] = {};
  }
  transforms[sourceCode][destinationCode] = transformFn;
};

/**
 * Unregisters the conversion function to convert coordinates from the source
 * projection to the destination projection.  This method is used to clean up
 * cached transforms during testing.
 *
 * @param {ol.proj.Projection} source Source projection.
 * @param {ol.proj.Projection} destination Destination projection.
 * @return {ol.TransformFunction} transformFn The unregistered transform.
 */
_ol_proj_transforms_.remove = function (source, destination) {
  var sourceCode = source.getCode();
  var destinationCode = destination.getCode();
  var transforms = _ol_proj_transforms_.cache_;
  var transform = transforms[sourceCode][destinationCode];
  delete transforms[sourceCode][destinationCode];
  if (_obj2.default.isEmpty(transforms[sourceCode])) {
    delete transforms[sourceCode];
  }
  return transform;
};

/**
 * Get a transform given a source code and a destination code.
 * @param {string} sourceCode The code for the source projection.
 * @param {string} destinationCode The code for the destination projection.
 * @return {ol.TransformFunction|undefined} The transform function (if found).
 */
_ol_proj_transforms_.get = function (sourceCode, destinationCode) {
  var transform;
  var transforms = _ol_proj_transforms_.cache_;
  if (sourceCode in transforms && destinationCode in transforms[sourceCode]) {
    transform = transforms[sourceCode][destinationCode];
  }
  return transform;
};
exports.default = _ol_proj_transforms_;

},{"../obj.js":32}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Projection units: `'degrees'`, `'ft'`, `'m'`, `'pixels'`, `'tile-pixels'` or
 * `'us-ft'`.
 * @enum {string}
 */
var _ol_proj_Units_ = {
  DEGREES: 'degrees',
  FEET: 'ft',
  METERS: 'm',
  PIXELS: 'pixels',
  TILE_PIXELS: 'tile-pixels',
  USFEET: 'us-ft'
};

/**
 * Meters per unit lookup table.
 * @const
 * @type {Object.<ol.proj.Units, number>}
 * @api
 */
_ol_proj_Units_.METERS_PER_UNIT = {};
// use the radius of the Normal sphere
_ol_proj_Units_.METERS_PER_UNIT[_ol_proj_Units_.DEGREES] = 2 * Math.PI * 6370997 / 360;
_ol_proj_Units_.METERS_PER_UNIT[_ol_proj_Units_.FEET] = 0.3048;
_ol_proj_Units_.METERS_PER_UNIT[_ol_proj_Units_.METERS] = 1;
_ol_proj_Units_.METERS_PER_UNIT[_ol_proj_Units_.USFEET] = 1200 / 3937;
exports.default = _ol_proj_Units_;

},{}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _math = require('./math.js');

var _math2 = _interopRequireDefault(_math);

var _geometrytype = require('./geom/geometrytype.js');

var _geometrytype2 = _interopRequireDefault(_geometrytype);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * @classdesc
 * Class to create objects that can be used with {@link
 * ol.geom.Polygon.circular}.
 *
 * For example to create a sphere whose radius is equal to the semi-major
 * axis of the WGS84 ellipsoid:
 *
 * ```js
 * var wgs84Sphere= new ol.Sphere(6378137);
 * ```
 *
 * @constructor
 * @param {number} radius Radius.
 * @api
 */
/**
 * @license
 * Latitude/longitude spherical geodesy formulae taken from
 * http://www.movable-type.co.uk/scripts/latlong.html
 * Licensed under CC-BY-3.0.
 */

var _ol_Sphere_ = function _ol_Sphere_(radius) {

  /**
   * @type {number}
   */
  this.radius = radius;
};

/**
 * Returns the geodesic area for a list of coordinates.
 *
 * [Reference](https://trs-new.jpl.nasa.gov/handle/2014/40409)
 * Robert. G. Chamberlain and William H. Duquette, "Some Algorithms for
 * Polygons on a Sphere", JPL Publication 07-03, Jet Propulsion
 * Laboratory, Pasadena, CA, June 2007
 *
 * @param {Array.<ol.Coordinate>} coordinates List of coordinates of a linear
 * ring. If the ring is oriented clockwise, the area will be positive,
 * otherwise it will be negative.
 * @return {number} Area.
 * @api
 */
_ol_Sphere_.prototype.geodesicArea = function (coordinates) {
  return _ol_Sphere_.getArea_(coordinates, this.radius);
};

/**
 * Returns the distance from c1 to c2 using the haversine formula.
 *
 * @param {ol.Coordinate} c1 Coordinate 1.
 * @param {ol.Coordinate} c2 Coordinate 2.
 * @return {number} Haversine distance.
 * @api
 */
_ol_Sphere_.prototype.haversineDistance = function (c1, c2) {
  return _ol_Sphere_.getDistance_(c1, c2, this.radius);
};

/**
 * Returns the coordinate at the given distance and bearing from `c1`.
 *
 * @param {ol.Coordinate} c1 The origin point (`[lon, lat]` in degrees).
 * @param {number} distance The great-circle distance between the origin
 *     point and the target point.
 * @param {number} bearing The bearing (in radians).
 * @return {ol.Coordinate} The target point.
 */
_ol_Sphere_.prototype.offset = function (c1, distance, bearing) {
  var lat1 = _math2.default.toRadians(c1[1]);
  var lon1 = _math2.default.toRadians(c1[0]);
  var dByR = distance / this.radius;
  var lat = Math.asin(Math.sin(lat1) * Math.cos(dByR) + Math.cos(lat1) * Math.sin(dByR) * Math.cos(bearing));
  var lon = lon1 + Math.atan2(Math.sin(bearing) * Math.sin(dByR) * Math.cos(lat1), Math.cos(dByR) - Math.sin(lat1) * Math.sin(lat));
  return [_math2.default.toDegrees(lon), _math2.default.toDegrees(lat)];
};

/**
 * The mean Earth radius (1/3 * (2a + b)) for the WGS84 ellipsoid.
 * https://en.wikipedia.org/wiki/Earth_radius#Mean_radius
 * @type {number}
 */
_ol_Sphere_.DEFAULT_RADIUS = 6371008.8;

/**
 * Get the spherical length of a geometry.  This length is the sum of the
 * great circle distances between coordinates.  For polygons, the length is
 * the sum of all rings.  For points, the length is zero.  For multi-part
 * geometries, the length is the sum of the length of each part.
 * @param {ol.geom.Geometry} geometry A geometry.
 * @param {olx.SphereMetricOptions=} opt_options Options for the length
 *     calculation.  By default, geometries are assumed to be in 'EPSG:3857'.
 *     You can change this by providing a `projection` option.
 * @return {number} The spherical length (in meters).
 * @api
 */
_ol_Sphere_.getLength = function (geometry, opt_options) {
  var options = opt_options || {};
  var radius = options.radius || _ol_Sphere_.DEFAULT_RADIUS;
  var projection = options.projection || 'EPSG:3857';
  geometry = geometry.clone().transform(projection, 'EPSG:4326');
  var type = geometry.getType();
  var length = 0;
  var coordinates, coords, i, ii, j, jj;
  switch (type) {
    case _geometrytype2.default.POINT:
    case _geometrytype2.default.MULTI_POINT:
      {
        break;
      }
    case _geometrytype2.default.LINE_STRING:
    case _geometrytype2.default.LINEAR_RING:
      {
        coordinates = /** @type {ol.geom.SimpleGeometry} */geometry.getCoordinates();
        length = _ol_Sphere_.getLength_(coordinates, radius);
        break;
      }
    case _geometrytype2.default.MULTI_LINE_STRING:
    case _geometrytype2.default.POLYGON:
      {
        coordinates = /** @type {ol.geom.SimpleGeometry} */geometry.getCoordinates();
        for (i = 0, ii = coordinates.length; i < ii; ++i) {
          length += _ol_Sphere_.getLength_(coordinates[i], radius);
        }
        break;
      }
    case _geometrytype2.default.MULTI_POLYGON:
      {
        coordinates = /** @type {ol.geom.SimpleGeometry} */geometry.getCoordinates();
        for (i = 0, ii = coordinates.length; i < ii; ++i) {
          coords = coordinates[i];
          for (j = 0, jj = coords.length; j < jj; ++j) {
            length += _ol_Sphere_.getLength_(coords[j], radius);
          }
        }
        break;
      }
    case _geometrytype2.default.GEOMETRY_COLLECTION:
      {
        var geometries = /** @type {ol.geom.GeometryCollection} */geometry.getGeometries();
        for (i = 0, ii = geometries.length; i < ii; ++i) {
          length += _ol_Sphere_.getLength(geometries[i], opt_options);
        }
        break;
      }
    default:
      {
        throw new Error('Unsupported geometry type: ' + type);
      }
  }
  return length;
};

/**
 * Get the cumulative great circle length of linestring coordinates (geographic).
 * @param {Array} coordinates Linestring coordinates.
 * @param {number} radius The sphere radius to use.
 * @return {number} The length (in meters).
 */
_ol_Sphere_.getLength_ = function (coordinates, radius) {
  var length = 0;
  for (var i = 0, ii = coordinates.length; i < ii - 1; ++i) {
    length += _ol_Sphere_.getDistance_(coordinates[i], coordinates[i + 1], radius);
  }
  return length;
};

/**
 * Get the great circle distance between two geographic coordinates.
 * @param {Array} c1 Starting coordinate.
 * @param {Array} c2 Ending coordinate.
 * @param {number} radius The sphere radius to use.
 * @return {number} The great circle distance between the points (in meters).
 */
_ol_Sphere_.getDistance_ = function (c1, c2, radius) {
  var lat1 = _math2.default.toRadians(c1[1]);
  var lat2 = _math2.default.toRadians(c2[1]);
  var deltaLatBy2 = (lat2 - lat1) / 2;
  var deltaLonBy2 = _math2.default.toRadians(c2[0] - c1[0]) / 2;
  var a = Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) + Math.sin(deltaLonBy2) * Math.sin(deltaLonBy2) * Math.cos(lat1) * Math.cos(lat2);
  return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

/**
 * Get the spherical area of a geometry.  This is the area (in meters) assuming
 * that polygon edges are segments of great circles on a sphere.
 * @param {ol.geom.Geometry} geometry A geometry.
 * @param {olx.SphereMetricOptions=} opt_options Options for the area
 *     calculation.  By default, geometries are assumed to be in 'EPSG:3857'.
 *     You can change this by providing a `projection` option.
 * @return {number} The spherical area (in square meters).
 * @api
 */
_ol_Sphere_.getArea = function (geometry, opt_options) {
  var options = opt_options || {};
  var radius = options.radius || _ol_Sphere_.DEFAULT_RADIUS;
  var projection = options.projection || 'EPSG:3857';
  geometry = geometry.clone().transform(projection, 'EPSG:4326');
  var type = geometry.getType();
  var area = 0;
  var coordinates, coords, i, ii, j, jj;
  switch (type) {
    case _geometrytype2.default.POINT:
    case _geometrytype2.default.MULTI_POINT:
    case _geometrytype2.default.LINE_STRING:
    case _geometrytype2.default.MULTI_LINE_STRING:
    case _geometrytype2.default.LINEAR_RING:
      {
        break;
      }
    case _geometrytype2.default.POLYGON:
      {
        coordinates = /** @type {ol.geom.Polygon} */geometry.getCoordinates();
        area = Math.abs(_ol_Sphere_.getArea_(coordinates[0], radius));
        for (i = 1, ii = coordinates.length; i < ii; ++i) {
          area -= Math.abs(_ol_Sphere_.getArea_(coordinates[i], radius));
        }
        break;
      }
    case _geometrytype2.default.MULTI_POLYGON:
      {
        coordinates = /** @type {ol.geom.SimpleGeometry} */geometry.getCoordinates();
        for (i = 0, ii = coordinates.length; i < ii; ++i) {
          coords = coordinates[i];
          area += Math.abs(_ol_Sphere_.getArea_(coords[0], radius));
          for (j = 1, jj = coords.length; j < jj; ++j) {
            area -= Math.abs(_ol_Sphere_.getArea_(coords[j], radius));
          }
        }
        break;
      }
    case _geometrytype2.default.GEOMETRY_COLLECTION:
      {
        var geometries = /** @type {ol.geom.GeometryCollection} */geometry.getGeometries();
        for (i = 0, ii = geometries.length; i < ii; ++i) {
          area += _ol_Sphere_.getArea(geometries[i], opt_options);
        }
        break;
      }
    default:
      {
        throw new Error('Unsupported geometry type: ' + type);
      }
  }
  return area;
};

/**
 * Returns the spherical area for a list of coordinates.
 *
 * [Reference](https://trs-new.jpl.nasa.gov/handle/2014/40409)
 * Robert. G. Chamberlain and William H. Duquette, "Some Algorithms for
 * Polygons on a Sphere", JPL Publication 07-03, Jet Propulsion
 * Laboratory, Pasadena, CA, June 2007
 *
 * @param {Array.<ol.Coordinate>} coordinates List of coordinates of a linear
 * ring. If the ring is oriented clockwise, the area will be positive,
 * otherwise it will be negative.
 * @param {number} radius The sphere radius.
 * @return {number} Area (in square meters).
 */
_ol_Sphere_.getArea_ = function (coordinates, radius) {
  var area = 0,
      len = coordinates.length;
  var x1 = coordinates[len - 1][0];
  var y1 = coordinates[len - 1][1];
  for (var i = 0; i < len; i++) {
    var x2 = coordinates[i][0],
        y2 = coordinates[i][1];
    area += _math2.default.toRadians(x2 - x1) * (2 + Math.sin(_math2.default.toRadians(y1)) + Math.sin(_math2.default.toRadians(y2)));
    x1 = x2;
    y1 = y2;
  }
  return area * radius * radius / 2.0;
};
exports.default = _ol_Sphere_;

},{"./geom/geometrytype.js":27,"./math.js":31}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asserts = require('./asserts.js');

var _asserts2 = _interopRequireDefault(_asserts);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _ol_transform_ = {};

/**
 * Collection of affine 2d transformation functions. The functions work on an
 * array of 6 elements. The element order is compatible with the [SVGMatrix
 * interface](https://developer.mozilla.org/en-US/docs/Web/API/SVGMatrix) and is
 * a subset (elements a to f) of a 3x3 martrix:
 * ```
 * [ a c e ]
 * [ b d f ]
 * [ 0 0 1 ]
 * ```
 */

/**
 * @private
 * @type {ol.Transform}
 */
_ol_transform_.tmp_ = new Array(6);

/**
 * Create an identity transform.
 * @return {!ol.Transform} Identity transform.
 */
_ol_transform_.create = function () {
  return [1, 0, 0, 1, 0, 0];
};

/**
 * Resets the given transform to an identity transform.
 * @param {!ol.Transform} transform Transform.
 * @return {!ol.Transform} Transform.
 */
_ol_transform_.reset = function (transform) {
  return _ol_transform_.set(transform, 1, 0, 0, 1, 0, 0);
};

/**
 * Multiply the underlying matrices of two transforms and return the result in
 * the first transform.
 * @param {!ol.Transform} transform1 Transform parameters of matrix 1.
 * @param {!ol.Transform} transform2 Transform parameters of matrix 2.
 * @return {!ol.Transform} transform1 multiplied with transform2.
 */
_ol_transform_.multiply = function (transform1, transform2) {
  var a1 = transform1[0];
  var b1 = transform1[1];
  var c1 = transform1[2];
  var d1 = transform1[3];
  var e1 = transform1[4];
  var f1 = transform1[5];
  var a2 = transform2[0];
  var b2 = transform2[1];
  var c2 = transform2[2];
  var d2 = transform2[3];
  var e2 = transform2[4];
  var f2 = transform2[5];

  transform1[0] = a1 * a2 + c1 * b2;
  transform1[1] = b1 * a2 + d1 * b2;
  transform1[2] = a1 * c2 + c1 * d2;
  transform1[3] = b1 * c2 + d1 * d2;
  transform1[4] = a1 * e2 + c1 * f2 + e1;
  transform1[5] = b1 * e2 + d1 * f2 + f1;

  return transform1;
};

/**
 * Set the transform components a-f on a given transform.
 * @param {!ol.Transform} transform Transform.
 * @param {number} a The a component of the transform.
 * @param {number} b The b component of the transform.
 * @param {number} c The c component of the transform.
 * @param {number} d The d component of the transform.
 * @param {number} e The e component of the transform.
 * @param {number} f The f component of the transform.
 * @return {!ol.Transform} Matrix with transform applied.
 */
_ol_transform_.set = function (transform, a, b, c, d, e, f) {
  transform[0] = a;
  transform[1] = b;
  transform[2] = c;
  transform[3] = d;
  transform[4] = e;
  transform[5] = f;
  return transform;
};

/**
 * Set transform on one matrix from another matrix.
 * @param {!ol.Transform} transform1 Matrix to set transform to.
 * @param {!ol.Transform} transform2 Matrix to set transform from.
 * @return {!ol.Transform} transform1 with transform from transform2 applied.
 */
_ol_transform_.setFromArray = function (transform1, transform2) {
  transform1[0] = transform2[0];
  transform1[1] = transform2[1];
  transform1[2] = transform2[2];
  transform1[3] = transform2[3];
  transform1[4] = transform2[4];
  transform1[5] = transform2[5];
  return transform1;
};

/**
 * Transforms the given coordinate with the given transform returning the
 * resulting, transformed coordinate. The coordinate will be modified in-place.
 *
 * @param {ol.Transform} transform The transformation.
 * @param {ol.Coordinate|ol.Pixel} coordinate The coordinate to transform.
 * @return {ol.Coordinate|ol.Pixel} return coordinate so that operations can be
 *     chained together.
 */
_ol_transform_.apply = function (transform, coordinate) {
  var x = coordinate[0],
      y = coordinate[1];
  coordinate[0] = transform[0] * x + transform[2] * y + transform[4];
  coordinate[1] = transform[1] * x + transform[3] * y + transform[5];
  return coordinate;
};

/**
 * Applies rotation to the given transform.
 * @param {!ol.Transform} transform Transform.
 * @param {number} angle Angle in radians.
 * @return {!ol.Transform} The rotated transform.
 */
_ol_transform_.rotate = function (transform, angle) {
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  return _ol_transform_.multiply(transform, _ol_transform_.set(_ol_transform_.tmp_, cos, sin, -sin, cos, 0, 0));
};

/**
 * Applies scale to a given transform.
 * @param {!ol.Transform} transform Transform.
 * @param {number} x Scale factor x.
 * @param {number} y Scale factor y.
 * @return {!ol.Transform} The scaled transform.
 */
_ol_transform_.scale = function (transform, x, y) {
  return _ol_transform_.multiply(transform, _ol_transform_.set(_ol_transform_.tmp_, x, 0, 0, y, 0, 0));
};

/**
 * Applies translation to the given transform.
 * @param {!ol.Transform} transform Transform.
 * @param {number} dx Translation x.
 * @param {number} dy Translation y.
 * @return {!ol.Transform} The translated transform.
 */
_ol_transform_.translate = function (transform, dx, dy) {
  return _ol_transform_.multiply(transform, _ol_transform_.set(_ol_transform_.tmp_, 1, 0, 0, 1, dx, dy));
};

/**
 * Creates a composite transform given an initial translation, scale, rotation, and
 * final translation (in that order only, not commutative).
 * @param {!ol.Transform} transform The transform (will be modified in place).
 * @param {number} dx1 Initial translation x.
 * @param {number} dy1 Initial translation y.
 * @param {number} sx Scale factor x.
 * @param {number} sy Scale factor y.
 * @param {number} angle Rotation (in counter-clockwise radians).
 * @param {number} dx2 Final translation x.
 * @param {number} dy2 Final translation y.
 * @return {!ol.Transform} The composite transform.
 */
_ol_transform_.compose = function (transform, dx1, dy1, sx, sy, angle, dx2, dy2) {
  var sin = Math.sin(angle);
  var cos = Math.cos(angle);
  transform[0] = sx * cos;
  transform[1] = sy * sin;
  transform[2] = -sx * sin;
  transform[3] = sy * cos;
  transform[4] = dx2 * sx * cos - dy2 * sx * sin + dx1;
  transform[5] = dx2 * sy * sin + dy2 * sy * cos + dy1;
  return transform;
};

/**
 * Invert the given transform.
 * @param {!ol.Transform} transform Transform.
 * @return {!ol.Transform} Inverse of the transform.
 */
_ol_transform_.invert = function (transform) {
  var det = _ol_transform_.determinant(transform);
  _asserts2.default.assert(det !== 0, 32); // Transformation matrix cannot be inverted

  var a = transform[0];
  var b = transform[1];
  var c = transform[2];
  var d = transform[3];
  var e = transform[4];
  var f = transform[5];

  transform[0] = d / det;
  transform[1] = -b / det;
  transform[2] = -c / det;
  transform[3] = a / det;
  transform[4] = (c * f - d * e) / det;
  transform[5] = -(a * f - b * e) / det;

  return transform;
};

/**
 * Returns the determinant of the given matrix.
 * @param {!ol.Transform} mat Matrix.
 * @return {number} Determinant.
 */
_ol_transform_.determinant = function (mat) {
  return mat[0] * mat[3] - mat[1] * mat[2];
};
exports.default = _ol_transform_;

},{"./asserts.js":13}],46:[function(require,module,exports){
'use strict';

// Generated by CoffeeScript 1.10.0
(function () {
  var families;

  module.exports = {
    icon: 'icons/google.svg',
    name: 'google',
    title: 'Google Fonts',
    link: 'google.com/fonts',
    getNames: function getNames() {
      return families;
    },
    getLink: function getLink(name) {
      return "https://fonts.google.com/specimen/" + name.replace(/( )/g, '+');
    },
    normalizeName: function normalizeName(name) {
      return name;
    }
  };

  families = ["ABeeZee", "Abel", "Abril Fatface", "Aclonica", "Acme", "Actor", "Adamina", "Advent Pro", "Aguafina Script", "Akronim", "Aladin", "Aldrich", "Alef", "Alegreya", "Alegreya SC", "Alegreya Sans", "Alegreya Sans SC", "Alex Brush", "Alfa Slab One", "Alice", "Alike", "Alike Angular", "Allan", "Allerta", "Allerta Stencil", "Allura", "Almendra", "Almendra Display", "Almendra SC", "Amarante", "Amaranth", "Amatic SC", "Amethysta", "Amiri", "Amita", "Anaheim", "Andada", "Andika", "Angkor", "Annie Use Your Telescope", "Anonymous Pro", "Antic", "Antic Didone", "Antic Slab", "Anton", "Arapey", "Arbutus", "Arbutus Slab", "Architects Daughter", "Archivo Black", "Archivo Narrow", "Arimo", "Arizonia", "Armata", "Artifika", "Arvo", "Arya", "Asap", "Asar", "Asset", "Astloch", "Asul", "Atomic Age", "Aubrey", "Audiowide", "Autour One", "Average", "Average Sans", "Averia Gruesa Libre", "Averia Libre", "Averia Sans Libre", "Averia Serif Libre", "Bad Script", "Balthazar", "Bangers", "Basic", "Battambang", "Baumans", "Bayon", "Belgrano", "Belleza", "BenchNine", "Bentham", "Berkshire Swash", "Bevan", "Bigelow Rules", "Bigshot One", "Bilbo", "Bilbo Swash Caps", "Biryani", "Bitter", "Black Ops One", "Bokor", "Bonbon", "Boogaloo", "Bowlby One", "Bowlby One SC", "Brawler", "Bree Serif", "Bubblegum Sans", "Bubbler One", "Buda", "Buenard", "Butcherman", "Butterfly Kids", "Cabin", "Cabin Condensed", "Cabin Sketch", "Caesar Dressing", "Cagliostro", "Calligraffitti", "Cambay", "Cambo", "Candal", "Cantarell", "Cantata One", "Cantora One", "Capriola", "Cardo", "Carme", "Carrois Gothic", "Carrois Gothic SC", "Carter One", "Catamaran", "Caudex", "Caveat", "Caveat Brush", "Cedarville Cursive", "Ceviche One", "Changa One", "Chango", "Chau Philomene One", "Chela One", "Chelsea Market", "Chenla", "Cherry Cream Soda", "Cherry Swash", "Chewy", "Chicle", "Chivo", "Chonburi", "Cinzel", "Cinzel Decorative", "Clicker Script", "Coda", "Coda Caption", "Codystar", "Combo", "Comfortaa", "Coming Soon", "Concert One", "Condiment", "Content", "Contrail One", "Convergence", "Cookie", "Copse", "Corben", "Courgette", "Cousine", "Coustard", "Covered By Your Grace", "Crafty Girls", "Creepster", "Crete Round", "Crimson Text", "Croissant One", "Crushed", "Cuprum", "Cutive", "Cutive Mono", "Damion", "Dancing Script", "Dangrek", "Dawning of a New Day", "Days One", "Dekko", "Delius", "Delius Swash Caps", "Delius Unicase", "Della Respira", "Denk One", "Devonshire", "Dhurjati", "Didact Gothic", "Diplomata", "Diplomata SC", "Domine", "Donegal One", "Doppio One", "Dorsa", "Dosis", "Dr Sugiyama", "Droid Sans", "Droid Sans Mono", "Droid Serif", "Duru Sans", "Dynalight", "EB Garamond", "Eagle Lake", "Eater", "Economica", "Eczar", "Ek Mukta", "Electrolize", "Elsie", "Elsie Swash Caps", "Emblema One", "Emilys Candy", "Engagement", "Englebert", "Enriqueta", "Erica One", "Esteban", "Euphoria Script", "Ewert", "Exo", "Exo 2", "Expletus Sans", "Fanwood Text", "Fascinate", "Fascinate Inline", "Faster One", "Fasthand", "Fauna One", "Federant", "Federo", "Felipa", "Fenix", "Finger Paint", "Fira Mono", "Fira Sans", "Fjalla One", "Fjord One", "Flamenco", "Flavors", "Fondamento", "Fontdiner Swanky", "Forum", "Francois One", "Freckle Face", "Fredericka the Great", "Fredoka One", "Freehand", "Fresca", "Frijole", "Fruktur", "Fugaz One", "GFS Didot", "GFS Neohellenic", "Gabriela", "Gafata", "Galdeano", "Galindo", "Gentium Basic", "Gentium Book Basic", "Geo", "Geostar", "Geostar Fill", "Germania One", "Gidugu", "Gilda Display", "Give You Glory", "Glass Antiqua", "Glegoo", "Gloria Hallelujah", "Goblin One", "Gochi Hand", "Gorditas", "Goudy Bookletter 1911", "Graduate", "Grand Hotel", "Gravitas One", "Great Vibes", "Griffy", "Gruppo", "Gudea", "Gurajada", "Habibi", "Halant", "Hammersmith One", "Hanalei", "Hanalei Fill", "Handlee", "Hanuman", "Happy Monkey", "Headland One", "Henny Penny", "Herr Von Muellerhoff", "Hind", "Hind Siliguri", "Hind Vadodara", "Holtwood One SC", "Homemade Apple", "Homenaje", "IM Fell DW Pica", "IM Fell DW Pica SC", "IM Fell Double Pica", "IM Fell Double Pica SC", "IM Fell English", "IM Fell English SC", "IM Fell French Canon", "IM Fell French Canon SC", "IM Fell Great Primer", "IM Fell Great Primer SC", "Iceberg", "Iceland", "Imprima", "Inconsolata", "Inder", "Indie Flower", "Inika", "Inknut Antiqua", "Irish Grover", "Istok Web", "Italiana", "Italianno", "Itim", "Jacques Francois", "Jacques Francois Shadow", "Jaldi", "Jim Nightshade", "Jockey One", "Jolly Lodger", "Josefin Sans", "Josefin Slab", "Joti One", "Judson", "Julee", "Julius Sans One", "Junge", "Jura", "Just Another Hand", "Just Me Again Down Here", "Kadwa", "Kalam", "Kameron", "Kantumruy", "Karla", "Karma", "Kaushan Script", "Kavoon", "Kdam Thmor", "Keania One", "Kelly Slab", "Kenia", "Khand", "Khmer", "Khula", "Kite One", "Knewave", "Kotta One", "Koulen", "Kranky", "Kreon", "Kristi", "Krona One", "Kurale", "La Belle Aurore", "Laila", "Lakki Reddy", "Lancelot", "Lateef", "Lato", "League Script", "Leckerli One", "Ledger", "Lekton", "Lemon", "Libre Baskerville", "Life Savers", "Lilita One", "Lily Script One", "Limelight", "Linden Hill", "Lobster", "Lobster Two", "Londrina Outline", "Londrina Shadow", "Londrina Sketch", "Londrina Solid", "Lora", "Love Ya Like A Sister", "Loved by the King", "Lovers Quarrel", "Luckiest Guy", "Lusitana", "Lustria", "Macondo", "Macondo Swash Caps", "Magra", "Maiden Orange", "Mako", "Mallanna", "Mandali", "Marcellus", "Marcellus SC", "Marck Script", "Margarine", "Marko One", "Marmelad", "Martel", "Martel Sans", "Marvel", "Mate", "Mate SC", "Maven Pro", "McLaren", "Meddon", "MedievalSharp", "Medula One", "Megrim", "Meie Script", "Merienda", "Merienda One", "Merriweather", "Merriweather Sans", "Metal", "Metal Mania", "Metamorphous", "Metrophobic", "Michroma", "Milonga", "Miltonian", "Miltonian Tattoo", "Miniver", "Miss Fajardose", "Modak", "Modern Antiqua", "Molengo", "Molle", "Monda", "Monofett", "Monoton", "Monsieur La Doulaise", "Montaga", "Montez", "Montserrat", "Montserrat Alternates", "Montserrat Subrayada", "Moul", "Moulpali", "Mountains of Christmas", "Mouse Memoirs", "Mr Bedfort", "Mr Dafoe", "Mr De Haviland", "Mrs Saint Delafield", "Mrs Sheppards", "Muli", "Mystery Quest", "NTR", "Neucha", "Neuton", "New Rocker", "News Cycle", "Niconne", "Nixie One", "Nobile", "Nokora", "Norican", "Nosifer", "Nothing You Could Do", "Noticia Text", "Noto Sans", "Noto Serif", "Nova Cut", "Nova Flat", "Nova Mono", "Nova Oval", "Nova Round", "Nova Script", "Nova Slim", "Nova Square", "Numans", "Nunito", "Odor Mean Chey", "Offside", "Old Standard TT", "Oldenburg", "Oleo Script", "Oleo Script Swash Caps", "Open Sans", "Open Sans Condensed", "Oranienbaum", "Orbitron", "Oregano", "Orienta", "Original Surfer", "Oswald", "Over the Rainbow", "Overlock", "Overlock SC", "Ovo", "Oxygen", "Oxygen Mono", "PT Mono", "PT Sans", "PT Sans Caption", "PT Sans Narrow", "PT Serif", "PT Serif Caption", "Pacifico", "Palanquin", "Palanquin Dark", "Paprika", "Parisienne", "Passero One", "Passion One", "Pathway Gothic One", "Patrick Hand", "Patrick Hand SC", "Patua One", "Paytone One", "Peddana", "Peralta", "Permanent Marker", "Petit Formal Script", "Petrona", "Philosopher", "Piedra", "Pinyon Script", "Pirata One", "Plaster", "Play", "Playball", "Playfair Display", "Playfair Display SC", "Podkova", "Poiret One", "Poller One", "Poly", "Pompiere", "Pontano Sans", "Poppins", "Port Lligat Sans", "Port Lligat Slab", "Pragati Narrow", "Prata", "Preahvihear", "Press Start 2P", "Princess Sofia", "Prociono", "Prosto One", "Puritan", "Purple Purse", "Quando", "Quantico", "Quattrocento", "Quattrocento Sans", "Questrial", "Quicksand", "Quintessential", "Qwigley", "Racing Sans One", "Radley", "Rajdhani", "Raleway", "Raleway Dots", "Ramabhadra", "Ramaraja", "Rambla", "Rammetto One", "Ranchers", "Rancho", "Ranga", "Rationale", "Ravi Prakash", "Redressed", "Reenie Beanie", "Revalia", "Rhodium Libre", "Ribeye", "Ribeye Marrow", "Righteous", "Risque", "Roboto", "Roboto Condensed", "Roboto Mono", "Roboto Slab", "Rochester", "Rock Salt", "Rokkitt", "Romanesco", "Ropa Sans", "Rosario", "Rosarivo", "Rouge Script", "Rozha One", "Rubik", "Rubik Mono One", "Rubik One", "Ruda", "Rufina", "Ruge Boogie", "Ruluko", "Rum Raisin", "Ruslan Display", "Russo One", "Ruthie", "Rye", "Sacramento", "Sahitya", "Sail", "Salsa", "Sanchez", "Sancreek", "Sansita One", "Sarala", "Sarina", "Sarpanch", "Satisfy", "Scada", "Scheherazade", "Schoolbell", "Seaweed Script", "Sevillana", "Seymour One", "Shadows Into Light", "Shadows Into Light Two", "Shanti", "Share", "Share Tech", "Share Tech Mono", "Shojumaru", "Short Stack", "Siemreap", "Sigmar One", "Signika", "Signika Negative", "Simonetta", "Sintony", "Sirin Stencil", "Six Caps", "Skranji", "Slabo 13px", "Slabo 27px", "Slackey", "Smokum", "Smythe", "Sniglet", "Snippet", "Snowburst One", "Sofadi One", "Sofia", "Sonsie One", "Sorts Mill Goudy", "Source Code Pro", "Source Sans Pro", "Source Serif Pro", "Special Elite", "Spicy Rice", "Spinnaker", "Spirax", "Squada One", "Sree Krushnadevaraya", "Stalemate", "Stalinist One", "Stardos Stencil", "Stint Ultra Condensed", "Stint Ultra Expanded", "Stoke", "Strait", "Sue Ellen Francisco", "Sumana", "Sunshiney", "Supermercado One", "Sura", "Suranna", "Suravaram", "Suwannaphum", "Swanky and Moo Moo", "Syncopate", "Tangerine", "Taprom", "Tauri", "Teko", "Telex", "Tenali Ramakrishna", "Tenor Sans", "Text Me One", "The Girl Next Door", "Tienne", "Tillana", "Timmana", "Tinos", "Titan One", "Titillium Web", "Trade Winds", "Trocchi", "Trochut", "Trykker", "Tulpen One", "Ubuntu", "Ubuntu Condensed", "Ubuntu Mono", "Ultra", "Uncial Antiqua", "Underdog", "Unica One", "UnifrakturCook", "UnifrakturMaguntia", "Unkempt", "Unlock", "Unna", "VT323", "Vampiro One", "Varela", "Varela Round", "Vast Shadow", "Vesper Libre", "Vibur", "Vidaloka", "Viga", "Voces", "Volkhov", "Vollkorn", "Voltaire", "Waiting for the Sunrise", "Wallpoet", "Walter Turncoat", "Warnes", "Wellfleet", "Wendy One", "Wire One", "Work Sans", "Yanone Kaffeesatz", "Yantramanav", "Yellowtail", "Yeseva One", "Yesteryear", "Zeyada"];
}).call(undefined);

},{}]},{},[1]);
var _r=_m(1);_g.olms=_r;return _r;})})(typeof window!=='undefined'?window:(typeof global!=='undefined'?global:(typeof self!=='undefined'?self:this)));