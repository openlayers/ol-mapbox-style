"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyStyle = applyStyle;
exports.applyBackground = applyBackground;
exports.apply = apply;
exports.finalizeLayer = finalizeLayer;
exports.getLayer = getLayer;
exports.getSource = getSource;

var _mapboxToCssFont = _interopRequireDefault(require("mapbox-to-css-font"));

var _stylefunction = _interopRequireWildcard(require("./stylefunction"));

var _google = _interopRequireDefault(require("webfont-matcher/lib/fonts/google"));

var _proj = require("ol/proj");

var _tilegrid = require("ol/tilegrid");

var _Map = _interopRequireDefault(require("ol/Map"));

var _GeoJSON = _interopRequireDefault(require("ol/format/GeoJSON"));

var _MVT = _interopRequireDefault(require("ol/format/MVT"));

var _Observable = require("ol/Observable");

var _Tile = _interopRequireDefault(require("ol/layer/Tile"));

var _Vector = _interopRequireDefault(require("ol/layer/Vector"));

var _VectorTile = _interopRequireDefault(require("ol/layer/VectorTile"));

var _TileJSON = _interopRequireDefault(require("ol/source/TileJSON"));

var _Vector2 = _interopRequireDefault(require("ol/source/Vector"));

var _VectorTile2 = _interopRequireDefault(require("ol/source/VectorTile"));

var _XYZ = _interopRequireDefault(require("ol/source/XYZ"));

var _mapboxGlStyleSpec = require("@mapbox/mapbox-gl-style-spec");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var fontFamilyRegEx = /font-family: ?([^;]*);/;
var stripQuotesRegEx = /("|')/g;
var loadedFontFamilies;

function hasFontFamily(family) {
  if (!loadedFontFamilies) {
    loadedFontFamilies = {};
    var styleSheets = document.styleSheets;

    for (var i = 0, ii = styleSheets.length; i < ii; ++i) {
      var styleSheet = styleSheets[i];

      try {
        var cssRules = styleSheet.rules || styleSheet.cssRules;

        if (cssRules) {
          for (var j = 0, jj = cssRules.length; j < jj; ++j) {
            var cssRule = cssRules[j];

            if (cssRule.type == 5) {
              var match = cssRule.cssText.match(fontFamilyRegEx);
              loadedFontFamilies[match[1].replace(stripQuotesRegEx, '')] = true;
            }
          }
        }
      } catch (e) {// empty catch block
      }
    }
  }

  return family in loadedFontFamilies;
}

var fontFamilies = {};

var googleFamilies = _google.default.getNames();

function getFonts(fonts) {
  if (fonts in fontFamilies) {
    return fontFamilies[fonts];
  }

  var families = fonts.map(function (font) {
    return (0, _mapboxToCssFont.default)(font, 1).split(' 1px ')[1].replace(/"/g, '');
  });
  var family = families[0];

  if (!hasFontFamily(family) && googleFamilies.indexOf(family) !== -1) {
    var fontUrl = 'https://fonts.googleapis.com/css?family=' + family.replace(/ /g, '+');

    if (!document.querySelector('link[href="' + fontUrl + '"]')) {
      var markup = document.createElement('link');
      markup.href = fontUrl;
      markup.rel = 'stylesheet';
      document.getElementsByTagName('head')[0].appendChild(markup);
    }
  }

  return fonts;
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
 * @param {Array<number>} [resolutions=undefined] Resolutions for mapping resolution to zoom level.
 * @return {Promise} Promise which will be resolved when the style can be used
 * for rendering.
 */


function applyStyle(layer, glStyle, source, path, resolutions) {
  return new Promise(function (resolve, reject) {
    // TODO: figure out where best place to check source type is
    // Note that the source arg is an array of gl layer ids and each must be
    // dereferenced to get source type to validate
    if (_typeof(glStyle) != 'object') {
      glStyle = JSON.parse(glStyle);
    }

    if (glStyle.version != 8) {
      return reject(new Error('glStyle version 8 required.'));
    }

    if (!(layer instanceof _Vector.default) && !(layer instanceof _VectorTile.default)) {
      return reject(new Error('Can only apply to VectorLayer or VectorTileLayer'));
    }

    var spriteScale, spriteData, spriteImageUrl, style;

    function onChange() {
      if (!style && (!glStyle.sprite || spriteData)) {
        style = (0, _stylefunction.default)(layer, glStyle, source, resolutions, spriteData, spriteImageUrl, getFonts);
        resolve();
      } else if (style) {
        layer.setStyle(style);
        resolve();
      } else {
        reject(new Error('Something went wrong trying to apply style.'));
      }
    }

    if (glStyle.sprite) {
      spriteScale = window.devicePixelRatio >= 1.5 ? 0.5 : 1;
      var sizeFactor = spriteScale == 0.5 ? '@2x' : '';
      var spriteUrl = toSpriteUrl(glStyle.sprite, path, sizeFactor + '.json');
      fetch(spriteUrl, {
        credentials: 'same-origin'
      }).then(function (response) {
        if (!response.ok && sizeFactor !== '') {
          spriteUrl = toSpriteUrl(glStyle.sprite, path, '.json');
          return fetch(spriteUrl, {
            credentials: 'same-origin'
          });
        } else {
          return response;
        }
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          reject(new Error("Problem fetching sprite from ".concat(spriteUrl, ": ").concat(response.statusText)));
        }
      }).then(function (spritesJson) {
        if (spritesJson === undefined || Object.keys(spritesJson).length === 0) {
          return reject(new Error('No sprites found.'));
        }

        spriteData = spritesJson;
        spriteImageUrl = toSpriteUrl(glStyle.sprite, path, sizeFactor + '.png');
        onChange();
      }).catch(function (err) {
        reject(new Error("Sprites cannot be loaded: ".concat(spriteUrl, ": ").concat(err.message)));
      });
    } else {
      onChange();
    }
  });
}

var emptyObj = {};

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
      var bg = (0, _stylefunction.getValue)(layer, 'paint', 'background-color', zoom, emptyObj);
      element.style.backgroundColor = _mapboxGlStyleSpec.Color.parse(bg).toString();
    }

    if ('background-opacity' in paint) {
      element.style.backgroundOpacity = (0, _stylefunction.getValue)(layer, 'paint', 'background-opacity', zoom, emptyObj);
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

function processStyle(glStyle, map, baseUrl, host, path, accessToken) {
  var view = map.getView();

  if ('center' in glStyle && !view.getCenter()) {
    view.setCenter((0, _proj.fromLonLat)(glStyle.center));
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
      glStyle.sprite = (host ? host + path : '') + glStyle.sprite + accessToken;
    }
  }

  var glLayers = glStyle.layers;
  var geoJsonFormat = new _GeoJSON.default();
  var layerIds = [];
  var glLayer, glSource, glSourceId, id, layer, mapid, transition, url;

  var _loop = function _loop(i, ii) {
    glLayer = glLayers[i];

    if (glLayer.type == 'background') {
      setBackground(map, glLayer);
    } else {
      id = glLayer.source || getSourceIdByRef(glLayers, glLayer.ref); // this technique assumes gl layers will be in a particular order

      if (id != glSourceId) {
        finalizeLayer(layer, layerIds, glStyle, path, map);
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
          layer = tiles ? function () {
            var tileGrid = (0, _tilegrid.createXYZ)({
              tileSize: 512,
              maxZoom: 'maxzoom' in glSource ? glSource.maxzoom : 22,
              minZoom: glSource.minzoom
            });
            return new _VectorTile.default({
              declutter: true,
              maxResolution: tileGrid.getMinZoom() > 0 ? tileGrid.getResolution(tileGrid.getMinZoom()) : undefined,
              source: new _VectorTile2.default({
                attributions: glSource.attribution,
                format: new _MVT.default(),
                tileGrid: tileGrid,
                urls: tiles
              }),
              visible: false,
              zIndex: i
            });
          }() : function () {
            var layer = new _VectorTile.default({
              declutter: true,
              visible: false,
              zIndex: i
            });
            var tilejson = new _TileJSON.default({
              url: url
            });
            var key = tilejson.on('change', function () {
              if (tilejson.getState() == 'ready') {
                var tileJSONDoc = tilejson.getTileJSON();

                var _tiles = Array.isArray(tileJSONDoc.tiles) ? tileJSONDoc.tiles : [tileJSONDoc.tiles];

                for (var _i = 0, _ii = _tiles.length; _i < _ii; ++_i) {
                  var tile = _tiles[_i];

                  if (tile.indexOf('http') != 0) {
                    _tiles[_i] = glSource.url + tile;
                  }
                }

                var tileGrid = tilejson.getTileGrid();
                layer.setSource(new _VectorTile2.default({
                  attributions: tilejson.getAttributions() || tileJSONDoc.attribution,
                  format: new _MVT.default(),
                  tileGrid: (0, _tilegrid.createXYZ)({
                    minZoom: tileGrid.getMinZoom(),
                    maxZoom: tileGrid.getMaxZoom(),
                    tileSize: 512
                  }),
                  urls: _tiles
                }));

                if (tileGrid.getMinZoom() > 0) {
                  layer.setMaxResolution(tileGrid.getResolution(tileGrid.getMinZoom()));
                }

                (0, _Observable.unByKey)(key);
              }
            });
            return layer;
          }();
        } else if (glSource.type == 'raster') {
          var source;

          if (!glSource.tiles) {
            source = function () {
              return new _TileJSON.default({
                transition: transition,
                url: url,
                crossOrigin: 'anonymous'
              });
            }();
          } else {
            source = new _XYZ.default({
              transition: transition,
              attributions: glSource.attribution,
              minZoom: glSource.minzoom,
              maxZoom: 'maxzoom' in glSource ? glSource.maxzoom : 22,
              tileSize: glSource.tileSize || 512,
              url: url,
              urls: glSource.tiles,
              crossOrigin: 'anonymous'
            });
            transition = 0;
          }

          source.setTileLoadFunction(function (tile, src) {
            if (src.indexOf('{bbox-epsg-3857}') != -1) {
              var bbox = source.getTileGrid().getTileCoordExtent(tile.getTileCoord());
              src = src.replace('{bbox-epsg-3857}', bbox.toString());
            }

            tile.getImage().src = src;
          });
          layer = new _Tile.default({
            source: source,
            visible: glLayer.layout ? glLayer.layout.visibility !== 'none' : true
          });
        } else if (glSource.type == 'geojson') {
          var data = glSource.data;
          var features, geoJsonUrl;

          if (typeof data == 'string') {
            geoJsonUrl = withPath(data, path);
          } else {
            features = geoJsonFormat.readFeatures(data, {
              featureProjection: 'EPSG:3857'
            });
          }

          layer = new _Vector.default({
            source: new _Vector2.default({
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
  };

  for (var i = 0, ii = glLayers.length; i < ii; ++i) {
    _loop(i, ii);
  }

  finalizeLayer(layer, layerIds, glStyle, path, map);
  map.set('mapbox-style', glStyle);
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
 * The map returned by this function will have an additional `mapbox-style`
 * property which holds the Mapbox Style object.
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


function apply(map, style) {
  var accessToken, baseUrl, host, path;
  accessToken = baseUrl = host = path = '';

  if (!(map instanceof _Map.default)) {
    map = new _Map.default({
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
    }).then(function (response) {
      return response.json();
    }).then(function (glStyle) {
      var a = document.createElement('A');
      a.href = style;
      path = a.pathname.split('/').slice(0, -1).join('/') + '/';
      host = style.substr(0, style.indexOf(path));
      processStyle(glStyle, map, baseUrl, host, path, accessToken);
    }).catch(function (err) {
      throw new Error("Could not load ".concat(style, ": ").concat(err.message));
    });
  } else {
    setTimeout(function () {
      processStyle(style, map);
    }, 0);
  }

  return map;
}
/**
 * @private
 * If layerIds is not empty, applies the style specified in glStyle to the layer,
 * and adds the layer to the map.
 *
 * The layer may not yet have a source when the function is called.  If so, the style
 * is applied to the layer via a once listener on the 'change:source' event.
 *
 * @param {ol.Map|HTMLElement|string} layer Either an existing OpenLayers Map
 * instance, or a HTML element, or the id of a HTML element that will be the
 * target of a new OpenLayers Map.
 * @param {array} layerIds Array containing ids of already-processed layers.
 * @param {ol.Map|HTMLElement|string} glStyle Style as a JSON object.
 * @param {ol.Map|HTMLElement|string} path The path part of the URL to the style,
 * if the style was defined as a string.  (Why this if glStyle already being passed?)
 * @param {ol.Map|HTMLElement|string} map Either an existing OpenLayers Map
 * instance, or a HTML element, or the id of a HTML element that will be the
 * target of a new OpenLayers Map.
 * @return {Promise} Returns a promise that resolves after the source has
 * been set on the specified layer, and the style has been applied.
 */


function finalizeLayer(layer, layerIds, glStyle, path, map) {
  return new Promise(function (resolve, reject) {
    if (layerIds.length > 0) {
      var setStyle = function setStyle() {
        var source = layer.getSource();

        if (source instanceof _Vector2.default || source instanceof _VectorTile2.default) {
          applyStyle(layer, glStyle, layerIds, path).then(function () {
            layer.setVisible(true);
            resolve();
          }, function (e) {
            reject(e);
          });
        } else {
          layer.setVisible(true);
          resolve();
        }
      };

      map.addLayer(layer);

      if (layer.getSource()) {
        setStyle();
      } else {
        layer.once('change:source', setStyle);
      }
    } else {
      resolve();
    }
  });
}
/**
 * Get the OpenLayers layer instance that contains the provided Mapbox Style
 * `layer`. Note that multiple Mapbox Style layers are combined in a single
 * OpenLayers layer instance when they use the same Mapbox Style `source`.
 * @param {ol.Map} map OpenLayers Map.
 * @param {string} layerId Mapbox Style layer id.
 * @return {ol.layer.Layer} layer OpenLayers layer instance.
 */


function getLayer(map, layerId) {
  var layers = map.getLayers().getArray();

  for (var i = 0, ii = layers.length; i < ii; ++i) {
    if (layers[i].get('mapbox-layers').indexOf(layerId) !== -1) {
      return layers[i];
    }
  }
}
/**
 * Get the OpenLayers source instance for the provided Mapbox Style `source`.
 * @param {ol.Map} map OpenLayers Map.
 * @param {string} sourceId Mapbox Style source id.
 * @return {ol.layer.Layer} layer OpenLayers layer instance.
 */


function getSource(map, sourceId) {
  var layers = map.getLayers().getArray();

  for (var i = 0, ii = layers.length; i < ii; ++i) {
    var source = layers[i].getSource();

    if (layers[i].get('mapbox-source').indexOf(sourceId) !== -1) {
      return source;
    }
  }
}
//# sourceMappingURL=index.js.map