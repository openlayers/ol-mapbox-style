olms =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./olms.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: applyStyle, applyBackground, default, apply, getLayer, getSource, _finalizeLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyStyle", function() { return applyStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyBackground", function() { return applyBackground; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return olms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apply", function() { return apply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLayer", function() { return getLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSource", function() { return getSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_finalizeLayer", function() { return finalizeLayer; });
/* harmony import */ var mapbox_to_css_font__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mapbox-to-css-font */ "./node_modules/mapbox-to-css-font/index.js");
/* harmony import */ var mapbox_to_css_font__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mapbox_to_css_font__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _stylefunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stylefunction */ "./stylefunction.js");
/* harmony import */ var webfont_matcher_lib_fonts_google__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! webfont-matcher/lib/fonts/google */ "./node_modules/webfont-matcher/lib/fonts/google.js");
/* harmony import */ var webfont_matcher_lib_fonts_google__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(webfont_matcher_lib_fonts_google__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/proj */ "ol/proj");
/* harmony import */ var ol_proj__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ol_proj__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ol_tilegrid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/tilegrid */ "ol/tilegrid");
/* harmony import */ var ol_tilegrid__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ol_tilegrid__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ol_tilegrid_TileGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/tilegrid/TileGrid */ "ol/tilegrid/TileGrid");
/* harmony import */ var ol_tilegrid_TileGrid__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ol_tilegrid_TileGrid__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/Map */ "ol/Map");
/* harmony import */ var ol_Map__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ol_Map__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var ol_format_GeoJSON__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ol/format/GeoJSON */ "ol/format/GeoJSON");
/* harmony import */ var ol_format_GeoJSON__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ol_format_GeoJSON__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var ol_format_MVT__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ol/format/MVT */ "ol/format/MVT");
/* harmony import */ var ol_format_MVT__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(ol_format_MVT__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var ol_Observable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ol/Observable */ "ol/Observable");
/* harmony import */ var ol_Observable__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(ol_Observable__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ol/layer/Tile */ "ol/layer/Tile");
/* harmony import */ var ol_layer_Tile__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(ol_layer_Tile__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ol/layer/Vector */ "ol/layer/Vector");
/* harmony import */ var ol_layer_Vector__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(ol_layer_Vector__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var ol_layer_VectorTile__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ol/layer/VectorTile */ "ol/layer/VectorTile");
/* harmony import */ var ol_layer_VectorTile__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(ol_layer_VectorTile__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var ol_source_TileJSON__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ol/source/TileJSON */ "ol/source/TileJSON");
/* harmony import */ var ol_source_TileJSON__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(ol_source_TileJSON__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ol/source/Vector */ "ol/source/Vector");
/* harmony import */ var ol_source_Vector__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(ol_source_Vector__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var ol_source_VectorTile__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ol/source/VectorTile */ "ol/source/VectorTile");
/* harmony import */ var ol_source_VectorTile__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(ol_source_VectorTile__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _mapbox_mapbox_gl_style_spec__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @mapbox/mapbox-gl-style-spec */ "./node_modules/@mapbox/mapbox-gl-style-spec/dist/index.js");
/* harmony import */ var _mapbox_mapbox_gl_style_spec__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_mapbox_mapbox_gl_style_spec__WEBPACK_IMPORTED_MODULE_16__);
/*
ol-mapbox-style - Use Mapbox Style objects with OpenLayers
Copyright 2016-present ol-mapbox-style contributors
License: https://raw.githubusercontent.com/boundlessgeo/ol-mapbox-gl-style/master/LICENSE
*/



















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
      } catch (e) {
        // empty catch block
      }
    }
  }
  return family in loadedFontFamilies;
}

var fontFamilies = {};
var googleFamilies = webfont_matcher_lib_fonts_google__WEBPACK_IMPORTED_MODULE_2___default.a.getNames();
function getFonts(fonts) {
  if (fonts in fontFamilies) {
    return fontFamilies[fonts];
  }
  var families = fonts.map(function(font) {
    return mapbox_to_css_font__WEBPACK_IMPORTED_MODULE_0___default()(font, 1).split(' 1px ')[1].replace(/"/g, '');
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
  if (path && url.startsWith('.')) {
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
 * a `"type": "vector"` or `"type": "geojson"` source.
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
 * @param {ol.layer.VectorTile|ol.layer.Vector} layer OpenLayers layer.
 * @param {string|Object} glStyle Mapbox Style object.
 * @param {string|Array<string>} source `source` key or an array of layer `id`s from the
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
  return new Promise(function(resolve, reject) {

    // TODO: figure out where best place to check source type is
    // Note that the source arg is an array of gl layer ids and each must be
    // dereferenced to get source type to validate
    if (typeof glStyle != 'object') {
      glStyle = JSON.parse(glStyle);
    }
    if (glStyle.version != 8) {
      return reject(new Error('glStyle version 8 required.'));
    }
    if (!(layer instanceof ol_layer_Vector__WEBPACK_IMPORTED_MODULE_11___default.a || layer instanceof ol_layer_VectorTile__WEBPACK_IMPORTED_MODULE_12___default.a)) {
      return reject(new Error('Can only apply to VectorLayer or VectorTileLayer'));
    }

    var spriteScale, spriteData, spriteImageUrl, style;
    function onChange() {
      if (!style && (!glStyle.sprite || spriteData)) {
        style = Object(_stylefunction__WEBPACK_IMPORTED_MODULE_1__["default"])(layer, glStyle, source, resolutions, spriteData, spriteImageUrl, getFonts);
        if (!layer.getStyle()) {
          reject(new Error(("Nothing to show for source [" + source + "]")));
        } else {
          resolve();
        }
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

      fetch(spriteUrl, {credentials: 'same-origin'})
        .then(function(response) {
          if (!response.ok && (sizeFactor !== '')) {
            spriteUrl = toSpriteUrl(glStyle.sprite, path, '.json');
            return fetch(spriteUrl, {credentials: 'same-origin'});
          } else {
            return response;
          }
        })
        .then(function(response) {
          if (response.ok) {
            return response.json();
          } else {
            reject(new Error(("Problem fetching sprite from " + spriteUrl + ": " + (response.statusText))));
          }
        })
        .then(function(spritesJson) {
          if ((spritesJson === undefined) || (Object.keys(spritesJson).length === 0)) {
            return reject(new Error('No sprites found.'));
          }
          spriteData = spritesJson;
          spriteImageUrl = toSpriteUrl(glStyle.sprite, path, sizeFactor + '.png');
          onChange();
        })
        .catch(function(err) {
          reject(new Error(("Sprites cannot be loaded: " + spriteUrl + ": " + (err.message))));
        });
    } else {
      onChange();
    }

  });
}

var emptyObj = {};

function setBackground(map, layer) {
  var background = {
    type: layer.type
  };
  function updateStyle() {
    var element = map.getTargetElement();
    if (!element) {
      return;
    }
    var layout = layer.layout || {};
    var paint = layer.paint || {};
    background['paint'] = paint;
    background.id = 'olms-bg-' + paint['background-opacity'] + paint['background-color'];
    var zoom = map.getView().getZoom();
    if (paint['background-color'] !== undefined) {
      var bg = Object(_stylefunction__WEBPACK_IMPORTED_MODULE_1__["getValue"])(background, 'paint', 'background-color', zoom, emptyObj);
      element.style.backgroundColor = _mapbox_mapbox_gl_style_spec__WEBPACK_IMPORTED_MODULE_16__["Color"].parse(bg).toString();
    }
    if (paint['background-opacity'] !== undefined) {
      element.style.backgroundOpacity =
        Object(_stylefunction__WEBPACK_IMPORTED_MODULE_1__["getValue"])(background, 'paint', 'background-opacity', zoom, emptyObj);
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
 * ```js
 * import {applyBackground} from 'ol-mapbox-style';
 * ```
 * Applies properties of the Mapbox Style's first `background` layer to the map.
 * @param {ol.Map} map OpenLayers Map.
 * @param {Object} glStyle Mapbox Style object.
 */
function applyBackground(map, glStyle) {
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

function extentFromTileJSON(tileJSON) {
  var bounds = tileJSON.bounds;
  if (bounds) {
    var ll = Object(ol_proj__WEBPACK_IMPORTED_MODULE_3__["fromLonLat"])([bounds[0], bounds[1]]);
    var tr = Object(ol_proj__WEBPACK_IMPORTED_MODULE_3__["fromLonLat"])([bounds[2], bounds[3]]);
    return [ll[0], ll[1], tr[0], tr[1]];
  }
}

function setupVectorLayer(glSource, accessToken, url) {
  glSource = Object.assign({}, glSource);
  if (url) {
    if (url.indexOf('mapbox://') == 0) {
      var mapid = url.replace('mapbox://', '');
      glSource.tiles = ['a', 'b', 'c', 'd'].map(function(host) {
        return 'https://' + host + '.tiles.mapbox.com/v4/' + mapid +
            '/{z}/{x}/{y}.' +
            (glSource.type == 'vector' ? 'vector.pbf' : 'png') +
            accessToken;
      });
    }
  }
  var layer = new ol_layer_VectorTile__WEBPACK_IMPORTED_MODULE_12___default.a({
    declutter: true,
    visible: false
  });
  var tilejson = new ol_source_TileJSON__WEBPACK_IMPORTED_MODULE_13___default.a({
    url: glSource.tiles ? undefined : url,
    tileJSON: glSource.tiles ? glSource : undefined
  });
  var key = tilejson.on('change', function() {
    var state = tilejson.getState();
    if (state === 'ready') {
      var tileJSONDoc = tilejson.getTileJSON();
      var tiles = Array.isArray(tileJSONDoc.tiles) ? tileJSONDoc.tiles : [tileJSONDoc.tiles];
      if (glSource.url) {
        for (var i = 0, ii = tiles.length; i < ii; ++i) {
          var tile = tiles[i];
          if (tile.indexOf('http') != 0) {
            tiles[i] = glSource.url + tile;
          }
        }
      }
      var tileGrid = tilejson.getTileGrid();
      var extent = extentFromTileJSON(tileJSONDoc);
      var tileSize = tileJSONDoc.tileSize || 512;
      var source = new ol_source_VectorTile__WEBPACK_IMPORTED_MODULE_15___default.a({
        attributions: tilejson.getAttributions(),
        format: new ol_format_MVT__WEBPACK_IMPORTED_MODULE_8___default.a(),
        tileGrid: new ol_tilegrid_TileGrid__WEBPACK_IMPORTED_MODULE_5___default.a({
          origin: tileGrid.getOrigin(),
          extent: extent,
          resolutions: Object(ol_tilegrid__WEBPACK_IMPORTED_MODULE_4__["createXYZ"])({
            minZoom: tileGrid.getMinZoom(),
            maxZoom: tileGrid.getMaxZoom(),
            tileSize: tileSize
          }).getResolutions(),
          tileSize: tileSize
        }),
        urls: tiles
      });
      if (tileGrid.getMinZoom() > 0) {
        layer.setMaxResolution(
          tileGrid.getResolution(tileGrid.getMinZoom()));
      }
      Object(ol_Observable__WEBPACK_IMPORTED_MODULE_9__["unByKey"])(key);
      layer.setSource(source);
    } else if (state === 'error') {
      Object(ol_Observable__WEBPACK_IMPORTED_MODULE_9__["unByKey"])(key);
      layer.setSource(undefined);
    }
  });
  if (glSource.tiles) {
    tilejson.changed();
  }
  return layer;
}

function setupRasterLayer(glSource, url) {
  var layer = new ol_layer_Tile__WEBPACK_IMPORTED_MODULE_10___default.a();
  var source = new ol_source_TileJSON__WEBPACK_IMPORTED_MODULE_13___default.a({
    transition: 0,
    url: glSource.tiles ? undefined : url,
    tileJSON: glSource.tiles ? glSource : undefined,
    crossOrigin: 'anonymous'
  });
  var key = source.on('change', function() {
    var state = source.getState();
    if (state === 'ready') {
      Object(ol_Observable__WEBPACK_IMPORTED_MODULE_9__["unByKey"])(key);
      var tileJSONDoc = source.getTileJSON();
      var extent = extentFromTileJSON(tileJSONDoc);
      var tileGrid = source.getTileGrid();
      var tileSize = tileJSONDoc.tileSize || 256;
      // Only works when using ES modules
      source.tileGrid = new ol_tilegrid_TileGrid__WEBPACK_IMPORTED_MODULE_5___default.a({
        origin: tileGrid.getOrigin(),
        extent: extent,
        resolutions: Object(ol_tilegrid__WEBPACK_IMPORTED_MODULE_4__["createXYZ"])({
          minZoom: tileGrid.getMinZoom(),
          maxZoom: tileGrid.getMaxZoom(),
          tileSize: tileSize
        }).getResolutions(),
        tileSize: tileSize
      });
      layer.setSource(source);
    } else if (state === 'error') {
      Object(ol_Observable__WEBPACK_IMPORTED_MODULE_9__["unByKey"])(key);
      layer.setSource(undefined);
    }
  });
  source.setTileLoadFunction(function(tile, src) {
    if (src.indexOf('{bbox-epsg-3857}') != -1) {
      var bbox = source.getTileGrid().getTileCoordExtent(tile.getTileCoord());
      src = src.replace('{bbox-epsg-3857}', bbox.toString());
    }
    tile.getImage().src = src;
  });
  return layer;
}

var geoJsonFormat = new ol_format_GeoJSON__WEBPACK_IMPORTED_MODULE_7___default.a();
function setupGeoJSONLayer(glSource, path) {
  var data = glSource.data;
  var features, geoJsonUrl;
  if (typeof data == 'string') {
    geoJsonUrl = withPath(data, path);
  } else {
    features = geoJsonFormat.readFeatures(data, {featureProjection: 'EPSG:3857'});
  }
  return new ol_layer_Vector__WEBPACK_IMPORTED_MODULE_11___default.a({
    source: new ol_source_Vector__WEBPACK_IMPORTED_MODULE_14___default.a({
      attributions: glSource.attribution,
      features: features,
      format: geoJsonFormat,
      url: geoJsonUrl
    }),
    visible: false
  });
}

function updateRasterLayerProperties(glLayer, layer, view) {
  var zoom = view.getZoom();
  var opacity = Object(_stylefunction__WEBPACK_IMPORTED_MODULE_1__["getValue"])(glLayer, 'paint', 'raster-opacity', zoom, emptyObj);
  layer.setOpacity(opacity);
  layer.setVisible(zoom >= (glLayer.minzoom || 0) && zoom < (glLayer.maxzoom || 24));
}

function processStyle(glStyle, map, baseUrl, host, path, accessToken) {
  var promises = [];
  var view = map.getView();
  if ('center' in glStyle && !view.getCenter()) {
    view.setCenter(Object(ol_proj__WEBPACK_IMPORTED_MODULE_3__["fromLonLat"])(glStyle.center));
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
  var layerIds = [];

  var glLayer, glSource, glSourceId, id, layer, url;
  for (var i = 0, ii = glLayers.length; i < ii; ++i) {
    glLayer = glLayers[i];
    if (glLayer.type == 'background') {
      setBackground(map, glLayer);
    } else {
      id = glLayer.source || getSourceIdByRef(glLayers, glLayer.ref);
      // this technique assumes gl layers will be in a particular order
      if (id != glSourceId) {
        if (layerIds.length) {
          promises.push(finalizeLayer(layer, layerIds, glStyle, path, map));
          layerIds = [];
        }
        glSource = glStyle.sources[id];
        url = glSource.url;

        if (glSource.type == 'vector') {
          layer = setupVectorLayer(glSource, accessToken, url);
        } else if (glSource.type == 'raster') {
          layer = setupRasterLayer(glSource, url);
          layer.setVisible(glLayer.layout ? glLayer.layout.visibility !== 'none' : true);
          view.on('change:resolution', updateRasterLayerProperties.bind(this, glLayer, layer, view));
          updateRasterLayerProperties(glLayer, layer, view);
        } else if (glSource.type == 'geojson') {
          layer = setupGeoJSONLayer(glSource, path);
        }
        glSourceId = id;
        if (layer) {
          layer.set('mapbox-source', glSourceId);
        }
      }
      layerIds.push(glLayer.id);
    }
  }
  promises.push(finalizeLayer(layer, layerIds, glStyle, path, map));
  map.set('mapbox-style', glStyle);
  return Promise.all(promises);
}

/**
 * ```js
 * import olms from 'ol-mapbox-style';
 * ```
 *
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
 * This function sets an additional `mapbox-style` property on the OpenLayers
 * map instance, which holds the Mapbox Style object.
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
 * @return {Promise} A promise that resolves after all layers have been added to
 * the OpenLayers Map instance, their sources set, and their styles applied. the
 * `resolve` callback will be called with the OpenLayers Map instance as
 * argument.
 */
function olms(map, style) {

  var accessToken, baseUrl, host, path, promise;
  accessToken = baseUrl = host = path = '';

  if (!(map instanceof ol_Map__WEBPACK_IMPORTED_MODULE_6___default.a)) {
    map = new ol_Map__WEBPACK_IMPORTED_MODULE_6___default.a({
      target: map
    });
  }

  if (typeof style === 'string') {
    var parts = style.match(spriteRegEx);
    if (parts) {
      baseUrl = parts[1];
      accessToken = parts.length > 2 ? parts[2] : '';
    }
    promise = new Promise(function(resolve, reject) {
      fetch(style, {
        credentials: 'same-origin'
      })
        .then(function(response) {
          return response.json();
        })
        .then(function(glStyle) {
          var a = document.createElement('A');
          a.href = style;
          var href = a.href;
          path = a.pathname.split('/').slice(0, -1).join('/') + '/';
          host = href.substr(0, href.indexOf(path));

          processStyle(glStyle, map, baseUrl, host, path, accessToken)
            .then(function() {
              resolve(map);
            })
            .catch(reject);
        })
        .catch(function(err) {
          reject(new Error(("Could not load " + style + ": " + (err.message))));
        });
    });
  } else {
    promise = new Promise(function(resolve, reject) {
      processStyle(style, map)
        .then(function() {
          resolve(map);
        })
        .catch(reject);
    });
  }

  return promise;
}

/**
 * ```js
 * import {apply} from 'ol-mapbox-style';
 * ```
 * Like `olms`, but returns an `ol.Map` instance instead of a `Promise`.
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
  if (!(map instanceof ol_Map__WEBPACK_IMPORTED_MODULE_6___default.a)) {
    map = new ol_Map__WEBPACK_IMPORTED_MODULE_6___default.a({
      target: map
    });
  }
  setTimeout(function() {
    olms(map, style);
  }, 0);
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
 * @param {ol.layer.Layer} layer An OpenLayers layer instance.
 * @param {Array<string>} layerIds Array containing layer ids of already-processed layers.
 * @param {Object} glStyle Style as a JSON object.
 * @param {string|undefined} path The path part of the style URL. Only required
 * when a relative path is used with the `"sprite"` property of the style.
 * @param {ol.Map} map OpenLayers Map.
 * @return {Promise} Returns a promise that resolves after the source has
 * been set on the specified layer, and the style has been applied.
 */
function finalizeLayer(layer, layerIds, glStyle, path, map) {
  return new Promise(function(resolve, reject) {
    var setStyle = function() {
      var source = layer.getSource();
      if (source instanceof ol_source_Vector__WEBPACK_IMPORTED_MODULE_14___default.a || source instanceof ol_source_VectorTile__WEBPACK_IMPORTED_MODULE_15___default.a) {
        applyStyle(layer, glStyle, layerIds, path).then(function() {
          layer.setVisible(true);
          resolve();
        }, function(e) {
          reject(e);
        });
      } else {
        if (!source || source.getState() === 'error') {
          reject(new Error('Error accessing data for source ' + layer.get('mapbox-source')));
        } else {
          resolve();
        }
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
 * ```js
 * import {getLayer} from 'ol-mapbox-style';
 * ```
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
 * ```js
 * import {getSource} from 'ol-mapbox-style';
 * ```
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




/***/ }),

/***/ "./node_modules/@mapbox/mapbox-gl-style-spec/deref.js":
/*!************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-gl-style-spec/deref.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_ref_properties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/ref_properties */ "./node_modules/@mapbox/mapbox-gl-style-spec/util/ref_properties.js");



function deref(layer, parent) {
    var result = {};

    for (var k in layer) {
        if (k !== 'ref') {
            result[k] = layer[k];
        }
    }

    _util_ref_properties__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(function (k) {
        if (k in parent) {
            result[k] = parent[k];
        }
    });

    return result;
}

/* harmony default export */ __webpack_exports__["default"] = (derefLayers);

/**
 * Given an array of layers, some of which may contain `ref` properties
 * whose value is the `id` of another property, return a new array where
 * such layers have been augmented with the 'type', 'source', etc. properties
 * from the parent layer, and the `ref` property has been removed.
 *
 * The input is not modified. The output may contain references to portions
 * of the input.
 *
 * @private
 * @param {Array<Layer>} layers
 * @returns {Array<Layer>}
 */
function derefLayers(layers) {
    layers = layers.slice();

    var map = Object.create(null);
    for (var i = 0; i < layers.length; i++) {
        map[layers[i].id] = layers[i];
    }

    for (var i$1 = 0; i$1 < layers.length; i$1++) {
        if ('ref' in layers[i$1]) {
            layers[i$1] = deref(layers[i$1], map[layers[i$1].ref]);
        }
    }

    return layers;
}


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-gl-style-spec/dist/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-gl-style-spec/dist/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, Buffer) {(function (global, factory) {
   true ? factory(exports) :
  undefined;
}(this, function (exports) { 'use strict';

  var $version = 8;
  var $root = {
  	version: {
  		required: true,
  		type: "enum",
  		values: [
  			8
  		],
  		doc: "Style specification version number. Must be 8.",
  		example: 8
  	},
  	name: {
  		type: "string",
  		doc: "A human-readable name for the style.",
  		example: "Bright"
  	},
  	metadata: {
  		type: "*",
  		doc: "Arbitrary properties useful to track with the stylesheet, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'."
  	},
  	center: {
  		type: "array",
  		value: "number",
  		doc: "Default map center in longitude and latitude.  The style center will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
  		example: [
  			-73.9749,
  			40.7736
  		]
  	},
  	zoom: {
  		type: "number",
  		doc: "Default zoom level.  The style zoom will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
  		example: 12.5
  	},
  	bearing: {
  		type: "number",
  		"default": 0,
  		period: 360,
  		units: "degrees",
  		doc: "Default bearing, in degrees. The bearing is the compass direction that is \"up\"; for example, a bearing of 90° orients the map so that east is up. This value will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
  		example: 29
  	},
  	pitch: {
  		type: "number",
  		"default": 0,
  		units: "degrees",
  		doc: "Default pitch, in degrees. Zero is perpendicular to the surface, for a look straight down at the map, while a greater value like 60 looks ahead towards the horizon. The style pitch will be used only if the map has not been positioned by other means (e.g. map options or user interaction).",
  		example: 50
  	},
  	light: {
  		type: "light",
  		doc: "The global light source.",
  		example: {
  			anchor: "viewport",
  			color: "white",
  			intensity: 0.4
  		}
  	},
  	sources: {
  		required: true,
  		type: "sources",
  		doc: "Data source specifications.",
  		example: {
  			"mapbox-streets": {
  				type: "vector",
  				url: "mapbox://mapbox.mapbox-streets-v6"
  			}
  		}
  	},
  	sprite: {
  		type: "string",
  		doc: "A base URL for retrieving the sprite image and metadata. The extensions `.png`, `.json` and scale factor `@2x.png` will be automatically appended. This property is required if any layer uses the `background-pattern`, `fill-pattern`, `line-pattern`, `fill-extrusion-pattern`, or `icon-image` properties. The URL must be absolute, containing the [scheme, authority and path components](https://en.wikipedia.org/wiki/URL#Syntax).",
  		example: "mapbox://sprites/mapbox/bright-v8"
  	},
  	glyphs: {
  		type: "string",
  		doc: "A URL template for loading signed-distance-field glyph sets in PBF format. The URL must include `{fontstack}` and `{range}` tokens. This property is required if any layer uses the `text-field` layout property. The URL must be absolute, containing the [scheme, authority and path components](https://en.wikipedia.org/wiki/URL#Syntax).",
  		example: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf"
  	},
  	transition: {
  		type: "transition",
  		doc: "A global transition definition to use as a default across properties, to be used for timing transitions between one value and the next when no property-specific transition is set. Collision-based symbol fading is controlled independently of the style's `transition` property.",
  		example: {
  			duration: 300,
  			delay: 0
  		}
  	},
  	layers: {
  		required: true,
  		type: "array",
  		value: "layer",
  		doc: "Layers will be drawn in the order of this array.",
  		example: [
  			{
  				id: "water",
  				source: "mapbox-streets",
  				"source-layer": "water",
  				type: "fill",
  				paint: {
  					"fill-color": "#00ffff"
  				}
  			}
  		]
  	}
  };
  var sources = {
  	"*": {
  		type: "source",
  		doc: "Specification of a data source. For vector and raster sources, either TileJSON or a URL to a TileJSON must be provided. For image and video sources, a URL must be provided. For GeoJSON sources, a URL or inline GeoJSON must be provided."
  	}
  };
  var source = [
  	"source_vector",
  	"source_raster",
  	"source_raster_dem",
  	"source_geojson",
  	"source_video",
  	"source_image"
  ];
  var source_vector = {
  	type: {
  		required: true,
  		type: "enum",
  		values: {
  			vector: {
  				doc: "A vector tile source."
  			}
  		},
  		doc: "The type of the source."
  	},
  	url: {
  		type: "string",
  		doc: "A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<mapid>`."
  	},
  	tiles: {
  		type: "array",
  		value: "string",
  		doc: "An array of one or more tile source URLs, as in the TileJSON spec."
  	},
  	bounds: {
  		type: "array",
  		value: "number",
  		length: 4,
  		"default": [
  			-180,
  			-85.051129,
  			180,
  			85.051129
  		],
  		doc: "An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by Mapbox GL."
  	},
  	scheme: {
  		type: "enum",
  		values: {
  			xyz: {
  				doc: "Slippy map tilenames scheme."
  			},
  			tms: {
  				doc: "OSGeo spec scheme."
  			}
  		},
  		"default": "xyz",
  		doc: "Influences the y direction of the tile coordinates. The global-mercator (aka Spherical Mercator) profile is assumed."
  	},
  	minzoom: {
  		type: "number",
  		"default": 0,
  		doc: "Minimum zoom level for which tiles are available, as in the TileJSON spec."
  	},
  	maxzoom: {
  		type: "number",
  		"default": 22,
  		doc: "Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."
  	},
  	attribution: {
  		type: "string",
  		doc: "Contains an attribution to be displayed when the map is shown to a user."
  	},
  	"*": {
  		type: "*",
  		doc: "Other keys to configure the data source."
  	}
  };
  var source_raster = {
  	type: {
  		required: true,
  		type: "enum",
  		values: {
  			raster: {
  				doc: "A raster tile source."
  			}
  		},
  		doc: "The type of the source."
  	},
  	url: {
  		type: "string",
  		doc: "A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<mapid>`."
  	},
  	tiles: {
  		type: "array",
  		value: "string",
  		doc: "An array of one or more tile source URLs, as in the TileJSON spec."
  	},
  	bounds: {
  		type: "array",
  		value: "number",
  		length: 4,
  		"default": [
  			-180,
  			-85.051129,
  			180,
  			85.051129
  		],
  		doc: "An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by Mapbox GL."
  	},
  	minzoom: {
  		type: "number",
  		"default": 0,
  		doc: "Minimum zoom level for which tiles are available, as in the TileJSON spec."
  	},
  	maxzoom: {
  		type: "number",
  		"default": 22,
  		doc: "Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."
  	},
  	tileSize: {
  		type: "number",
  		"default": 512,
  		units: "pixels",
  		doc: "The minimum visual size to display tiles for this layer. Only configurable for raster layers."
  	},
  	scheme: {
  		type: "enum",
  		values: {
  			xyz: {
  				doc: "Slippy map tilenames scheme."
  			},
  			tms: {
  				doc: "OSGeo spec scheme."
  			}
  		},
  		"default": "xyz",
  		doc: "Influences the y direction of the tile coordinates. The global-mercator (aka Spherical Mercator) profile is assumed."
  	},
  	attribution: {
  		type: "string",
  		doc: "Contains an attribution to be displayed when the map is shown to a user."
  	},
  	"*": {
  		type: "*",
  		doc: "Other keys to configure the data source."
  	}
  };
  var source_raster_dem = {
  	type: {
  		required: true,
  		type: "enum",
  		values: {
  			"raster-dem": {
  				doc: "A RGB-encoded raster DEM source"
  			}
  		},
  		doc: "The type of the source."
  	},
  	url: {
  		type: "string",
  		doc: "A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<mapid>`."
  	},
  	tiles: {
  		type: "array",
  		value: "string",
  		doc: "An array of one or more tile source URLs, as in the TileJSON spec."
  	},
  	bounds: {
  		type: "array",
  		value: "number",
  		length: 4,
  		"default": [
  			-180,
  			-85.051129,
  			180,
  			85.051129
  		],
  		doc: "An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by Mapbox GL."
  	},
  	minzoom: {
  		type: "number",
  		"default": 0,
  		doc: "Minimum zoom level for which tiles are available, as in the TileJSON spec."
  	},
  	maxzoom: {
  		type: "number",
  		"default": 22,
  		doc: "Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."
  	},
  	tileSize: {
  		type: "number",
  		"default": 512,
  		units: "pixels",
  		doc: "The minimum visual size to display tiles for this layer. Only configurable for raster layers."
  	},
  	attribution: {
  		type: "string",
  		doc: "Contains an attribution to be displayed when the map is shown to a user."
  	},
  	encoding: {
  		type: "enum",
  		values: {
  			terrarium: {
  				doc: "Terrarium format PNG tiles. See https://aws.amazon.com/es/public-datasets/terrain/ for more info."
  			},
  			mapbox: {
  				doc: "Mapbox Terrain RGB tiles. See https://www.mapbox.com/help/access-elevation-data/#mapbox-terrain-rgb for more info."
  			}
  		},
  		"default": "mapbox",
  		doc: "The encoding used by this source. Mapbox Terrain RGB is used by default"
  	},
  	"*": {
  		type: "*",
  		doc: "Other keys to configure the data source."
  	}
  };
  var source_geojson = {
  	type: {
  		required: true,
  		type: "enum",
  		values: {
  			geojson: {
  				doc: "A GeoJSON data source."
  			}
  		},
  		doc: "The data type of the GeoJSON source."
  	},
  	data: {
  		type: "*",
  		doc: "A URL to a GeoJSON file, or inline GeoJSON."
  	},
  	maxzoom: {
  		type: "number",
  		"default": 18,
  		doc: "Maximum zoom level at which to create vector tiles (higher means greater detail at high zoom levels)."
  	},
  	attribution: {
  		type: "string",
  		doc: "Contains an attribution to be displayed when the map is shown to a user."
  	},
  	buffer: {
  		type: "number",
  		"default": 128,
  		maximum: 512,
  		minimum: 0,
  		doc: "Size of the tile buffer on each side. A value of 0 produces no buffer. A value of 512 produces a buffer as wide as the tile itself. Larger values produce fewer rendering artifacts near tile edges and slower performance."
  	},
  	tolerance: {
  		type: "number",
  		"default": 0.375,
  		doc: "Douglas-Peucker simplification tolerance (higher means simpler geometries and faster performance)."
  	},
  	cluster: {
  		type: "boolean",
  		"default": false,
  		doc: "If the data is a collection of point features, setting this to true clusters the points by radius into groups. Cluster groups become new `Point` features in the source with additional properties:\n * `cluster` Is `true` if the point is a cluster \n * `cluster_id` A unqiue id for the cluster to be used in conjunction with the [cluster inspection methods](https://www.mapbox.com/mapbox-gl-js/api/#geojsonsource#getclusterexpansionzoom)\n * `point_count` Number of original points grouped into this cluster\n * `point_count_abbreviated` An abbreviated point count"
  	},
  	clusterRadius: {
  		type: "number",
  		"default": 50,
  		minimum: 0,
  		doc: "Radius of each cluster if clustering is enabled. A value of 512 indicates a radius equal to the width of a tile."
  	},
  	clusterMaxZoom: {
  		type: "number",
  		doc: "Max zoom on which to cluster points if clustering is enabled. Defaults to one zoom less than maxzoom (so that last zoom features are not clustered)."
  	},
  	clusterProperties: {
  		type: "*",
  		doc: "An object defining custom properties on the generated clusters if clustering is enabled, aggregating values from clustered points. Has the form `{\"property_name\": [operator, map_expression]}`. `operator` is any expression function that accepts at least 2 operands (e.g. `\"+\"` or `\"max\"`) — it accumulates the property value from clusters/points the cluster contains; `map_expression` produces the value of a single point.\n\nExample: `{\"sum\": [\"+\", [\"get\", \"scalerank\"]]}`.\n\nFor more advanced use cases, in place of `operator`, you can use a custom reduce expression that references a special `[\"accumulated\"]` value, e.g.:\n`{\"sum\": [[\"+\", [\"accumulated\"], [\"get\", \"sum\"]], [\"get\", \"scalerank\"]]}`"
  	},
  	lineMetrics: {
  		type: "boolean",
  		"default": false,
  		doc: "Whether to calculate line distance metrics. This is required for line layers that specify `line-gradient` values."
  	},
  	generateId: {
  		type: "boolean",
  		"default": false,
  		doc: "Whether to generate ids for the geojson features. When enabled, the `feature.id` property will be auto assigned based on its index in the `features` array, over-writing any previous values."
  	}
  };
  var source_video = {
  	type: {
  		required: true,
  		type: "enum",
  		values: {
  			video: {
  				doc: "A video data source."
  			}
  		},
  		doc: "The data type of the video source."
  	},
  	urls: {
  		required: true,
  		type: "array",
  		value: "string",
  		doc: "URLs to video content in order of preferred format."
  	},
  	coordinates: {
  		required: true,
  		doc: "Corners of video specified in longitude, latitude pairs.",
  		type: "array",
  		length: 4,
  		value: {
  			type: "array",
  			length: 2,
  			value: "number",
  			doc: "A single longitude, latitude pair."
  		}
  	}
  };
  var source_image = {
  	type: {
  		required: true,
  		type: "enum",
  		values: {
  			image: {
  				doc: "An image data source."
  			}
  		},
  		doc: "The data type of the image source."
  	},
  	url: {
  		required: true,
  		type: "string",
  		doc: "URL that points to an image."
  	},
  	coordinates: {
  		required: true,
  		doc: "Corners of image specified in longitude, latitude pairs.",
  		type: "array",
  		length: 4,
  		value: {
  			type: "array",
  			length: 2,
  			value: "number",
  			doc: "A single longitude, latitude pair."
  		}
  	}
  };
  var layer = {
  	id: {
  		type: "string",
  		doc: "Unique layer name.",
  		required: true
  	},
  	type: {
  		type: "enum",
  		values: {
  			fill: {
  				doc: "A filled polygon with an optional stroked border.",
  				"sdk-support": {
  					"basic functionality": {
  						js: "0.10.0",
  						android: "2.0.1",
  						ios: "2.0.0",
  						macos: "0.1.0"
  					}
  				}
  			},
  			line: {
  				doc: "A stroked line.",
  				"sdk-support": {
  					"basic functionality": {
  						js: "0.10.0",
  						android: "2.0.1",
  						ios: "2.0.0",
  						macos: "0.1.0"
  					}
  				}
  			},
  			symbol: {
  				doc: "An icon or a text label.",
  				"sdk-support": {
  					"basic functionality": {
  						js: "0.10.0",
  						android: "2.0.1",
  						ios: "2.0.0",
  						macos: "0.1.0"
  					}
  				}
  			},
  			circle: {
  				doc: "A filled circle.",
  				"sdk-support": {
  					"basic functionality": {
  						js: "0.10.0",
  						android: "2.0.1",
  						ios: "2.0.0",
  						macos: "0.1.0"
  					}
  				}
  			},
  			heatmap: {
  				doc: "A heatmap.",
  				"sdk-support": {
  					"basic functionality": {
  						js: "0.41.0",
  						android: "6.0.0",
  						ios: "4.0.0",
  						macos: "0.7.0"
  					}
  				}
  			},
  			"fill-extrusion": {
  				doc: "An extruded (3D) polygon.",
  				"sdk-support": {
  					"basic functionality": {
  						js: "0.27.0",
  						android: "5.1.0",
  						ios: "3.6.0",
  						macos: "0.5.0"
  					}
  				}
  			},
  			raster: {
  				doc: "Raster map textures such as satellite imagery.",
  				"sdk-support": {
  					"basic functionality": {
  						js: "0.10.0",
  						android: "2.0.1",
  						ios: "2.0.0",
  						macos: "0.1.0"
  					}
  				}
  			},
  			hillshade: {
  				doc: "Client-side hillshading visualization based on DEM data. Currently, the implementation only supports Mapbox Terrain RGB and Mapzen Terrarium tiles.",
  				"sdk-support": {
  					"basic functionality": {
  						js: "0.43.0",
  						android: "6.0.0",
  						ios: "4.0.0",
  						macos: "0.7.0"
  					}
  				}
  			},
  			background: {
  				doc: "The background color or pattern of the map.",
  				"sdk-support": {
  					"basic functionality": {
  						js: "0.10.0",
  						android: "2.0.1",
  						ios: "2.0.0",
  						macos: "0.1.0"
  					}
  				}
  			}
  		},
  		doc: "Rendering type of this layer.",
  		required: true
  	},
  	metadata: {
  		type: "*",
  		doc: "Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'."
  	},
  	source: {
  		type: "string",
  		doc: "Name of a source description to be used for this layer. Required for all layer types except `background`."
  	},
  	"source-layer": {
  		type: "string",
  		doc: "Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources."
  	},
  	minzoom: {
  		type: "number",
  		minimum: 0,
  		maximum: 24,
  		doc: "The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden."
  	},
  	maxzoom: {
  		type: "number",
  		minimum: 0,
  		maximum: 24,
  		doc: "The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden."
  	},
  	filter: {
  		type: "filter",
  		doc: "A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The `feature-state` expression is not supported in filter expressions."
  	},
  	layout: {
  		type: "layout",
  		doc: "Layout properties for the layer."
  	},
  	paint: {
  		type: "paint",
  		doc: "Default paint properties for this layer."
  	}
  };
  var layout = [
  	"layout_fill",
  	"layout_line",
  	"layout_circle",
  	"layout_heatmap",
  	"layout_fill-extrusion",
  	"layout_symbol",
  	"layout_raster",
  	"layout_hillshade",
  	"layout_background"
  ];
  var layout_background = {
  	visibility: {
  		type: "enum",
  		values: {
  			visible: {
  				doc: "The layer is shown."
  			},
  			none: {
  				doc: "The layer is not shown."
  			}
  		},
  		"default": "visible",
  		doc: "Whether this layer is displayed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		"property-type": "constant"
  	}
  };
  var layout_fill = {
  	visibility: {
  		type: "enum",
  		values: {
  			visible: {
  				doc: "The layer is shown."
  			},
  			none: {
  				doc: "The layer is not shown."
  			}
  		},
  		"default": "visible",
  		doc: "Whether this layer is displayed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		"property-type": "constant"
  	}
  };
  var layout_circle = {
  	visibility: {
  		type: "enum",
  		values: {
  			visible: {
  				doc: "The layer is shown."
  			},
  			none: {
  				doc: "The layer is not shown."
  			}
  		},
  		"default": "visible",
  		doc: "Whether this layer is displayed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		"property-type": "constant"
  	}
  };
  var layout_heatmap = {
  	visibility: {
  		type: "enum",
  		values: {
  			visible: {
  				doc: "The layer is shown."
  			},
  			none: {
  				doc: "The layer is not shown."
  			}
  		},
  		"default": "visible",
  		doc: "Whether this layer is displayed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.41.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			}
  		},
  		"property-type": "constant"
  	}
  };
  var layout_line = {
  	"line-cap": {
  		type: "enum",
  		values: {
  			butt: {
  				doc: "A cap with a squared-off end which is drawn to the exact endpoint of the line."
  			},
  			round: {
  				doc: "A cap with a rounded end which is drawn beyond the endpoint of the line at a radius of one-half of the line's width and centered on the endpoint of the line."
  			},
  			square: {
  				doc: "A cap with a squared-off end which is drawn beyond the endpoint of the line at a distance of one-half of the line's width."
  			}
  		},
  		"default": "butt",
  		doc: "The display of line endings.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"line-join": {
  		type: "enum",
  		values: {
  			bevel: {
  				doc: "A join with a squared-off end which is drawn beyond the endpoint of the line at a distance of one-half of the line's width."
  			},
  			round: {
  				doc: "A join with a rounded end which is drawn beyond the endpoint of the line at a radius of one-half of the line's width and centered on the endpoint of the line."
  			},
  			miter: {
  				doc: "A join with a sharp, angled corner which is drawn with the outer sides beyond the endpoint of the path until they meet."
  			}
  		},
  		"default": "miter",
  		doc: "The display of lines when joining.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.40.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"line-miter-limit": {
  		type: "number",
  		"default": 2,
  		doc: "Used to automatically convert miter joins to bevel joins for sharp angles.",
  		requires: [
  			{
  				"line-join": "miter"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"line-round-limit": {
  		type: "number",
  		"default": 1.05,
  		doc: "Used to automatically convert round joins to miter joins for shallow angles.",
  		requires: [
  			{
  				"line-join": "round"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	visibility: {
  		type: "enum",
  		values: {
  			visible: {
  				doc: "The layer is shown."
  			},
  			none: {
  				doc: "The layer is not shown."
  			}
  		},
  		"default": "visible",
  		doc: "Whether this layer is displayed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		"property-type": "constant"
  	}
  };
  var layout_symbol = {
  	"symbol-placement": {
  		type: "enum",
  		values: {
  			point: {
  				doc: "The label is placed at the point where the geometry is located."
  			},
  			line: {
  				doc: "The label is placed along the line of the geometry. Can only be used on `LineString` and `Polygon` geometries."
  			},
  			"line-center": {
  				doc: "The label is placed at the center of the line of the geometry. Can only be used on `LineString` and `Polygon` geometries. Note that a single feature in a vector tile may contain multiple line geometries."
  			}
  		},
  		"default": "point",
  		doc: "Label placement relative to its geometry.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"`line-center` value": {
  				js: "0.47.0",
  				android: "6.4.0",
  				ios: "4.3.0",
  				macos: "0.10.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"symbol-spacing": {
  		type: "number",
  		"default": 250,
  		minimum: 1,
  		units: "pixels",
  		doc: "Distance between two symbol anchors.",
  		requires: [
  			{
  				"symbol-placement": "line"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"symbol-avoid-edges": {
  		type: "boolean",
  		"default": false,
  		doc: "If true, the symbols will not cross tile edges to avoid mutual collisions. Recommended in layers that don't have enough padding in the vector tile to prevent collisions, or if it is a point symbol layer placed after a line symbol layer.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"symbol-sort-key": {
  		type: "number",
  		doc: "Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key wehn they overlap. Features with a lower sort key will have priority over other features when doing placement.",
  		"sdk-support": {
  			js: "0.53.0"
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"symbol-z-order": {
  		type: "enum",
  		values: {
  			auto: {
  				doc: "If `symbol-sort-key` is set, sort based on that. Otherwise sort symbols by their position relative to the viewport."
  			},
  			"viewport-y": {
  				doc: "Symbols will be sorted by their y-position relative to the viewport."
  			},
  			source: {
  				doc: "Symbols will be rendered in the same order as the source data with no sorting applied."
  			}
  		},
  		"default": "auto",
  		doc: "Controls the order in which overlapping symbols in the same layer are rendered",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.49.0",
  				android: "6.6.0",
  				ios: "4.5.0",
  				macos: "0.12.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-allow-overlap": {
  		type: "boolean",
  		"default": false,
  		doc: "If true, the icon will be visible even if it collides with other previously drawn symbols.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-ignore-placement": {
  		type: "boolean",
  		"default": false,
  		doc: "If true, other symbols can be visible even if they collide with the icon.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-optional": {
  		type: "boolean",
  		"default": false,
  		doc: "If true, text will display without their corresponding icons when the icon collides with other symbols and the text does not.",
  		requires: [
  			"icon-image",
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-rotation-alignment": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "When `symbol-placement` is set to `point`, aligns icons east-west. When `symbol-placement` is set to `line` or `line-center`, aligns icon x-axes with the line."
  			},
  			viewport: {
  				doc: "Produces icons whose x-axes are aligned with the x-axis of the viewport, regardless of the value of `symbol-placement`."
  			},
  			auto: {
  				doc: "When `symbol-placement` is set to `point`, this is equivalent to `viewport`. When `symbol-placement` is set to `line` or `line-center`, this is equivalent to `map`."
  			}
  		},
  		"default": "auto",
  		doc: "In combination with `symbol-placement`, determines the rotation behavior of icons.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"`auto` value": {
  				js: "0.25.0",
  				android: "4.2.0",
  				ios: "3.4.0",
  				macos: "0.3.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-size": {
  		type: "number",
  		"default": 1,
  		minimum: 0,
  		units: "factor of the original icon size",
  		doc: "Scales the original size of the icon by the provided factor. The new pixel size of the image will be the original pixel size multiplied by `icon-size`. 1 is the original size; 3 triples the size of the image.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.35.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-text-fit": {
  		type: "enum",
  		values: {
  			none: {
  				doc: "The icon is displayed at its intrinsic aspect ratio."
  			},
  			width: {
  				doc: "The icon is scaled in the x-dimension to fit the width of the text."
  			},
  			height: {
  				doc: "The icon is scaled in the y-dimension to fit the height of the text."
  			},
  			both: {
  				doc: "The icon is scaled in both x- and y-dimensions."
  			}
  		},
  		"default": "none",
  		doc: "Scales the icon to fit around the associated text.",
  		requires: [
  			"icon-image",
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.21.0",
  				android: "4.2.0",
  				ios: "3.4.0",
  				macos: "0.2.1"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-text-fit-padding": {
  		type: "array",
  		value: "number",
  		length: 4,
  		"default": [
  			0,
  			0,
  			0,
  			0
  		],
  		units: "pixels",
  		doc: "Size of the additional area added to dimensions determined by `icon-text-fit`, in clockwise order: top, right, bottom, left.",
  		requires: [
  			"icon-image",
  			"text-field",
  			{
  				"icon-text-fit": [
  					"both",
  					"width",
  					"height"
  				]
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.21.0",
  				android: "4.2.0",
  				ios: "3.4.0",
  				macos: "0.2.1"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-image": {
  		type: "string",
  		doc: "Name of image in sprite to use for drawing an image background.",
  		tokens: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.35.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-rotate": {
  		type: "number",
  		"default": 0,
  		period: 360,
  		units: "degrees",
  		doc: "Rotates the icon clockwise.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.21.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-padding": {
  		type: "number",
  		"default": 2,
  		minimum: 0,
  		units: "pixels",
  		doc: "Size of the additional area around the icon bounding box used for detecting symbol collisions.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-keep-upright": {
  		type: "boolean",
  		"default": false,
  		doc: "If true, the icon may be flipped to prevent it from being rendered upside-down.",
  		requires: [
  			"icon-image",
  			{
  				"icon-rotation-alignment": "map"
  			},
  			{
  				"symbol-placement": [
  					"line",
  					"line-center"
  				]
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-offset": {
  		type: "array",
  		value: "number",
  		length: 2,
  		"default": [
  			0,
  			0
  		],
  		doc: "Offset distance of icon from its anchor. Positive values indicate right and down, while negative values indicate left and up. Each component is multiplied by the value of `icon-size` to obtain the final offset in pixels. When combined with `icon-rotate` the offset will be as if the rotated direction was up.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-anchor": {
  		type: "enum",
  		values: {
  			center: {
  				doc: "The center of the icon is placed closest to the anchor."
  			},
  			left: {
  				doc: "The left side of the icon is placed closest to the anchor."
  			},
  			right: {
  				doc: "The right side of the icon is placed closest to the anchor."
  			},
  			top: {
  				doc: "The top of the icon is placed closest to the anchor."
  			},
  			bottom: {
  				doc: "The bottom of the icon is placed closest to the anchor."
  			},
  			"top-left": {
  				doc: "The top left corner of the icon is placed closest to the anchor."
  			},
  			"top-right": {
  				doc: "The top right corner of the icon is placed closest to the anchor."
  			},
  			"bottom-left": {
  				doc: "The bottom left corner of the icon is placed closest to the anchor."
  			},
  			"bottom-right": {
  				doc: "The bottom right corner of the icon is placed closest to the anchor."
  			}
  		},
  		"default": "center",
  		doc: "Part of the icon placed closest to the anchor.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.40.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			},
  			"data-driven styling": {
  				js: "0.40.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-pitch-alignment": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "The icon is aligned to the plane of the map."
  			},
  			viewport: {
  				doc: "The icon is aligned to the plane of the viewport."
  			},
  			auto: {
  				doc: "Automatically matches the value of `icon-rotation-alignment`."
  			}
  		},
  		"default": "auto",
  		doc: "Orientation of icon when map is pitched.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.39.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-pitch-alignment": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "The text is aligned to the plane of the map."
  			},
  			viewport: {
  				doc: "The text is aligned to the plane of the viewport."
  			},
  			auto: {
  				doc: "Automatically matches the value of `text-rotation-alignment`."
  			}
  		},
  		"default": "auto",
  		doc: "Orientation of text when map is pitched.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.21.0",
  				android: "4.2.0",
  				ios: "3.4.0",
  				macos: "0.2.1"
  			},
  			"`auto` value": {
  				js: "0.25.0",
  				android: "4.2.0",
  				ios: "3.4.0",
  				macos: "0.3.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-rotation-alignment": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "When `symbol-placement` is set to `point`, aligns text east-west. When `symbol-placement` is set to `line` or `line-center`, aligns text x-axes with the line."
  			},
  			viewport: {
  				doc: "Produces glyphs whose x-axes are aligned with the x-axis of the viewport, regardless of the value of `symbol-placement`."
  			},
  			auto: {
  				doc: "When `symbol-placement` is set to `point`, this is equivalent to `viewport`. When `symbol-placement` is set to `line` or `line-center`, this is equivalent to `map`."
  			}
  		},
  		"default": "auto",
  		doc: "In combination with `symbol-placement`, determines the rotation behavior of the individual glyphs forming the text.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"`auto` value": {
  				js: "0.25.0",
  				android: "4.2.0",
  				ios: "3.4.0",
  				macos: "0.3.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-field": {
  		type: "formatted",
  		"default": "",
  		tokens: true,
  		doc: "Value to use for a text label. If a plain `string` is provided, it will be treated as a `formatted` with default/inherited formatting options.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-font": {
  		type: "array",
  		value: "string",
  		"default": [
  			"Open Sans Regular",
  			"Arial Unicode MS Regular"
  		],
  		doc: "Font stack to use for displaying text.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.43.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-size": {
  		type: "number",
  		"default": 16,
  		minimum: 0,
  		units: "pixels",
  		doc: "Font size.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.35.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-max-width": {
  		type: "number",
  		"default": 10,
  		minimum: 0,
  		units: "ems",
  		doc: "The maximum line width for text wrapping.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.40.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-line-height": {
  		type: "number",
  		"default": 1.2,
  		units: "ems",
  		doc: "Text leading value for multi-line text.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-letter-spacing": {
  		type: "number",
  		"default": 0,
  		units: "ems",
  		doc: "Text tracking amount.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.40.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-justify": {
  		type: "enum",
  		values: {
  			left: {
  				doc: "The text is aligned to the left."
  			},
  			center: {
  				doc: "The text is centered."
  			},
  			right: {
  				doc: "The text is aligned to the right."
  			}
  		},
  		"default": "center",
  		doc: "Text justification options.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.39.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-anchor": {
  		type: "enum",
  		values: {
  			center: {
  				doc: "The center of the text is placed closest to the anchor."
  			},
  			left: {
  				doc: "The left side of the text is placed closest to the anchor."
  			},
  			right: {
  				doc: "The right side of the text is placed closest to the anchor."
  			},
  			top: {
  				doc: "The top of the text is placed closest to the anchor."
  			},
  			bottom: {
  				doc: "The bottom of the text is placed closest to the anchor."
  			},
  			"top-left": {
  				doc: "The top left corner of the text is placed closest to the anchor."
  			},
  			"top-right": {
  				doc: "The top right corner of the text is placed closest to the anchor."
  			},
  			"bottom-left": {
  				doc: "The bottom left corner of the text is placed closest to the anchor."
  			},
  			"bottom-right": {
  				doc: "The bottom right corner of the text is placed closest to the anchor."
  			}
  		},
  		"default": "center",
  		doc: "Part of the text placed closest to the anchor.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.39.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-max-angle": {
  		type: "number",
  		"default": 45,
  		units: "degrees",
  		doc: "Maximum angle change between adjacent characters.",
  		requires: [
  			"text-field",
  			{
  				"symbol-placement": [
  					"line",
  					"line-center"
  				]
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-rotate": {
  		type: "number",
  		"default": 0,
  		period: 360,
  		units: "degrees",
  		doc: "Rotates the text clockwise.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.35.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-padding": {
  		type: "number",
  		"default": 2,
  		minimum: 0,
  		units: "pixels",
  		doc: "Size of the additional area around the text bounding box used for detecting symbol collisions.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-keep-upright": {
  		type: "boolean",
  		"default": true,
  		doc: "If true, the text may be flipped vertically to prevent it from being rendered upside-down.",
  		requires: [
  			"text-field",
  			{
  				"text-rotation-alignment": "map"
  			},
  			{
  				"symbol-placement": [
  					"line",
  					"line-center"
  				]
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-transform": {
  		type: "enum",
  		values: {
  			none: {
  				doc: "The text is not altered."
  			},
  			uppercase: {
  				doc: "Forces all letters to be displayed in uppercase."
  			},
  			lowercase: {
  				doc: "Forces all letters to be displayed in lowercase."
  			}
  		},
  		"default": "none",
  		doc: "Specifies how to capitalize text, similar to the CSS `text-transform` property.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-offset": {
  		type: "array",
  		doc: "Offset distance of text from its anchor. Positive values indicate right and down, while negative values indicate left and up.",
  		value: "number",
  		units: "ems",
  		length: 2,
  		"default": [
  			0,
  			0
  		],
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.35.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-allow-overlap": {
  		type: "boolean",
  		"default": false,
  		doc: "If true, the text will be visible even if it collides with other previously drawn symbols.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-ignore-placement": {
  		type: "boolean",
  		"default": false,
  		doc: "If true, other symbols can be visible even if they collide with the text.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-optional": {
  		type: "boolean",
  		"default": false,
  		doc: "If true, icons will display without their corresponding text when the text collides with other symbols and the icon does not.",
  		requires: [
  			"text-field",
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	visibility: {
  		type: "enum",
  		values: {
  			visible: {
  				doc: "The layer is shown."
  			},
  			none: {
  				doc: "The layer is not shown."
  			}
  		},
  		"default": "visible",
  		doc: "Whether this layer is displayed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		"property-type": "constant"
  	}
  };
  var layout_raster = {
  	visibility: {
  		type: "enum",
  		values: {
  			visible: {
  				doc: "The layer is shown."
  			},
  			none: {
  				doc: "The layer is not shown."
  			}
  		},
  		"default": "visible",
  		doc: "Whether this layer is displayed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		"property-type": "constant"
  	}
  };
  var layout_hillshade = {
  	visibility: {
  		type: "enum",
  		values: {
  			visible: {
  				doc: "The layer is shown."
  			},
  			none: {
  				doc: "The layer is not shown."
  			}
  		},
  		"default": "visible",
  		doc: "Whether this layer is displayed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.43.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		"property-type": "constant"
  	}
  };
  var filter = {
  	type: "array",
  	value: "*",
  	doc: "A filter selects specific features from a layer."
  };
  var filter_operator = {
  	type: "enum",
  	values: {
  		"==": {
  			doc: "`[\"==\", key, value]` equality: `feature[key] = value`"
  		},
  		"!=": {
  			doc: "`[\"!=\", key, value]` inequality: `feature[key] ≠ value`"
  		},
  		">": {
  			doc: "`[\">\", key, value]` greater than: `feature[key] > value`"
  		},
  		">=": {
  			doc: "`[\">=\", key, value]` greater than or equal: `feature[key] ≥ value`"
  		},
  		"<": {
  			doc: "`[\"<\", key, value]` less than: `feature[key] < value`"
  		},
  		"<=": {
  			doc: "`[\"<=\", key, value]` less than or equal: `feature[key] ≤ value`"
  		},
  		"in": {
  			doc: "`[\"in\", key, v0, ..., vn]` set inclusion: `feature[key] ∈ {v0, ..., vn}`"
  		},
  		"!in": {
  			doc: "`[\"!in\", key, v0, ..., vn]` set exclusion: `feature[key] ∉ {v0, ..., vn}`"
  		},
  		all: {
  			doc: "`[\"all\", f0, ..., fn]` logical `AND`: `f0 ∧ ... ∧ fn`"
  		},
  		any: {
  			doc: "`[\"any\", f0, ..., fn]` logical `OR`: `f0 ∨ ... ∨ fn`"
  		},
  		none: {
  			doc: "`[\"none\", f0, ..., fn]` logical `NOR`: `¬f0 ∧ ... ∧ ¬fn`"
  		},
  		has: {
  			doc: "`[\"has\", key]` `feature[key]` exists"
  		},
  		"!has": {
  			doc: "`[\"!has\", key]` `feature[key]` does not exist"
  		}
  	},
  	doc: "The filter operator."
  };
  var geometry_type = {
  	type: "enum",
  	values: {
  		Point: {
  			doc: "Filter to point geometries."
  		},
  		LineString: {
  			doc: "Filter to line geometries."
  		},
  		Polygon: {
  			doc: "Filter to polygon geometries."
  		}
  	},
  	doc: "The geometry type for the filter to select."
  };
  var function_stop = {
  	type: "array",
  	minimum: 0,
  	maximum: 22,
  	value: [
  		"number",
  		"color"
  	],
  	length: 2,
  	doc: "Zoom level and value pair."
  };
  var expression = {
  	type: "array",
  	value: "*",
  	minimum: 1,
  	doc: "An expression defines a function that can be used for data-driven style properties or feature filters."
  };
  var expression_name = {
  	doc: "",
  	type: "enum",
  	values: {
  		"let": {
  			doc: "Binds expressions to named variables, which can then be referenced in the result expression using [\"var\", \"variable_name\"].",
  			group: "Variable binding",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"var": {
  			doc: "References variable bound using \"let\".",
  			group: "Variable binding",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		literal: {
  			doc: "Provides a literal array or object value.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		array: {
  			doc: "Asserts that the input is an array (optionally with a specific item type and length).  If, when the input expression is evaluated, it is not of the asserted type, then this assertion will cause the whole expression to be aborted.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		at: {
  			doc: "Retrieves an item from an array.",
  			group: "Lookup",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"case": {
  			doc: "Selects the first output whose corresponding test condition evaluates to true.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		match: {
  			doc: "Selects the output whose label value matches the input value, or the fallback value if no match is found. The input can be any expression (e.g. `[\"get\", \"building_type\"]`). Each label must either be a single literal value or an array of literal values (e.g. `\"a\"` or `[\"c\", \"b\"]`), and those values must be all strings or all numbers. (The values `\"1\"` and `1` cannot both be labels in the same match expression.) Each label must be unique. If the input type does not match the type of the labels, the result will be the fallback value.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		coalesce: {
  			doc: "Evaluates each expression in turn until the first non-null value is obtained, and returns that value.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		step: {
  			doc: "Produces discrete, stepped results by evaluating a piecewise-constant function defined by pairs of input and output values (\"stops\"). The `input` may be any numeric expression (e.g., `[\"get\", \"population\"]`). Stop inputs must be numeric literals in strictly ascending order. Returns the output value of the stop just less than the input, or the first input if the input is less than the first stop.",
  			group: "Ramps, scales, curves",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.42.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		interpolate: {
  			doc: "Produces continuous, smooth results by interpolating between pairs of input and output values (\"stops\"). The `input` may be any numeric expression (e.g., `[\"get\", \"population\"]`). Stop inputs must be numeric literals in strictly ascending order. The output type must be `number`, `array<number>`, or `color`.\n\nInterpolation types:\n- `[\"linear\"]`: interpolates linearly between the pair of stops just less than and just greater than the input.\n- `[\"exponential\", base]`: interpolates exponentially between the stops just less than and just greater than the input. `base` controls the rate at which the output increases: higher values make the output increase more towards the high end of the range. With values close to 1 the output increases linearly.\n- `[\"cubic-bezier\", x1, y1, x2, y2]`: interpolates using the cubic bezier curve defined by the given control points.",
  			group: "Ramps, scales, curves",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.42.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"interpolate-hcl": {
  			doc: "Produces continuous, smooth results by interpolating between pairs of input and output values (\"stops\"). Works like `interpolate`, but the output type must be `color`, and the interpolation is performed in the Hue-Chroma-Luminance color space.",
  			group: "Ramps, scales, curves",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.49.0"
  				}
  			}
  		},
  		"interpolate-lab": {
  			doc: "Produces continuous, smooth results by interpolating between pairs of input and output values (\"stops\"). Works like `interpolate`, but the output type must be `color`, and the interpolation is performed in the CIELAB color space.",
  			group: "Ramps, scales, curves",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.49.0"
  				}
  			}
  		},
  		ln2: {
  			doc: "Returns mathematical constant ln(2).",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		pi: {
  			doc: "Returns the mathematical constant pi.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		e: {
  			doc: "Returns the mathematical constant e.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"typeof": {
  			doc: "Returns a string describing the type of the given value.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		string: {
  			doc: "Asserts that the input value is a string. If multiple values are provided, each one is evaluated in order until a string is obtained. If none of the inputs are strings, the expression is an error.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		number: {
  			doc: "Asserts that the input value is a number. If multiple values are provided, each one is evaluated in order until a number is obtained. If none of the inputs are numbers, the expression is an error.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		boolean: {
  			doc: "Asserts that the input value is a boolean. If multiple values are provided, each one is evaluated in order until a boolean is obtained. If none of the inputs are booleans, the expression is an error.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		object: {
  			doc: "Asserts that the input value is an object. If multiple values are provided, each one is evaluated in order until an object is obtained. If none of the inputs are objects, the expression is an error.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		collator: {
  			doc: "Returns a `collator` for use in locale-dependent comparison operations. The `case-sensitive` and `diacritic-sensitive` options default to `false`. The `locale` argument specifies the IETF language tag of the locale to use. If none is provided, the default locale is used. If the requested locale is not available, the `collator` will use a system-defined fallback locale. Use `resolved-locale` to test the results of locale fallback behavior.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.45.0",
  					android: "6.5.0",
  					ios: "4.2.0",
  					macos: "0.9.0"
  				}
  			}
  		},
  		format: {
  			doc: "Returns `formatted` text containing annotations for use in mixed-format `text-field` entries. If set, the `text-font` argument overrides the font specified by the root layout properties. If set, the `font-scale` argument specifies a scaling factor relative to the `text-size` specified in the root layout properties.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.48.0",
  					android: "6.7.0",
  					ios: "4.6.0",
  					macos: "0.12.0"
  				}
  			}
  		},
  		"number-format": {
  			doc: "Converts the input number into a string representation using the providing formatting rules. If set, the `locale` argument specifies the locale to use, as a BCP 47 language tag. If set, the `currency` argument specifies an ISO 4217 code to use for currency-style formatting. If set, the `min-fraction-digits` and `max-fraction-digits` arguments specify the minimum and maximum number of fractional digits to include.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.54.0"
  				}
  			}
  		},
  		"to-string": {
  			doc: "Converts the input value to a string. If the input is `null`, the result is `\"\"`. If the input is a boolean, the result is `\"true\"` or `\"false\"`. If the input is a number, it is converted to a string as specified by the [\"NumberToString\" algorithm](https://tc39.github.io/ecma262/#sec-tostring-applied-to-the-number-type) of the ECMAScript Language Specification. If the input is a color, it is converted to a string of the form `\"rgba(r,g,b,a)\"`, where `r`, `g`, and `b` are numerals ranging from 0 to 255, and `a` ranges from 0 to 1. Otherwise, the input is converted to a string in the format specified by the [`JSON.stringify`](https://tc39.github.io/ecma262/#sec-json.stringify) function of the ECMAScript Language Specification.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"to-number": {
  			doc: "Converts the input value to a number, if possible. If the input is `null` or `false`, the result is 0. If the input is `true`, the result is 1. If the input is a string, it is converted to a number as specified by the [\"ToNumber Applied to the String Type\" algorithm](https://tc39.github.io/ecma262/#sec-tonumber-applied-to-the-string-type) of the ECMAScript Language Specification. If multiple values are provided, each one is evaluated in order until the first successful conversion is obtained. If none of the inputs can be converted, the expression is an error.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"to-boolean": {
  			doc: "Converts the input value to a boolean. The result is `false` when then input is an empty string, 0, `false`, `null`, or `NaN`; otherwise it is `true`.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"to-rgba": {
  			doc: "Returns a four-element array containing the input color's red, green, blue, and alpha components, in that order.",
  			group: "Color",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"to-color": {
  			doc: "Converts the input value to a color. If multiple values are provided, each one is evaluated in order until the first successful conversion is obtained. If none of the inputs can be converted, the expression is an error.",
  			group: "Types",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		rgb: {
  			doc: "Creates a color value from red, green, and blue components, which must range between 0 and 255, and an alpha component of 1. If any component is out of range, the expression is an error.",
  			group: "Color",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		rgba: {
  			doc: "Creates a color value from red, green, blue components, which must range between 0 and 255, and an alpha component which must range between 0 and 1. If any component is out of range, the expression is an error.",
  			group: "Color",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		get: {
  			doc: "Retrieves a property value from the current feature's properties, or from another object if a second argument is provided. Returns null if the requested property is missing.",
  			group: "Lookup",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		has: {
  			doc: "Tests for the presence of an property value in the current feature's properties, or from another object if a second argument is provided.",
  			group: "Lookup",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		length: {
  			doc: "Gets the length of an array or string.",
  			group: "Lookup",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		properties: {
  			doc: "Gets the feature properties object.  Note that in some cases, it may be more efficient to use [\"get\", \"property_name\"] directly.",
  			group: "Feature data",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"feature-state": {
  			doc: "Retrieves a property value from the current feature's state. Returns null if the requested property is not present on the feature's state. A feature's state is not part of the GeoJSON or vector tile data, and must be set programmatically on each feature. Note that [\"feature-state\"] can only be used with paint properties that support data-driven styling.",
  			group: "Feature data",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.46.0"
  				}
  			}
  		},
  		"geometry-type": {
  			doc: "Gets the feature's geometry type: Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon.",
  			group: "Feature data",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		id: {
  			doc: "Gets the feature's id, if it has one.",
  			group: "Feature data",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		zoom: {
  			doc: "Gets the current zoom level.  Note that in style layout and paint properties, [\"zoom\"] may only appear as the input to a top-level \"step\" or \"interpolate\" expression.",
  			group: "Zoom",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"heatmap-density": {
  			doc: "Gets the kernel density estimation of a pixel in a heatmap layer, which is a relative measure of how many data points are crowded around a particular pixel. Can only be used in the `heatmap-color` property.",
  			group: "Heatmap",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"line-progress": {
  			doc: "Gets the progress along a gradient line. Can only be used in the `line-gradient` property.",
  			group: "Feature data",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.45.0",
  					android: "6.5.0",
  					ios: "4.6.0",
  					macos: "0.12.0"
  				}
  			}
  		},
  		accumulated: {
  			doc: "Gets the value of a cluster property accumulated so far. Can only be used in the `clusterProperties` option of a clustered GeoJSON source.",
  			group: "Feature data",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.53.0"
  				}
  			}
  		},
  		"+": {
  			doc: "Returns the sum of the inputs.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"*": {
  			doc: "Returns the product of the inputs.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"-": {
  			doc: "For two inputs, returns the result of subtracting the second input from the first. For a single input, returns the result of subtracting it from 0.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"/": {
  			doc: "Returns the result of floating point division of the first input by the second.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"%": {
  			doc: "Returns the remainder after integer division of the first input by the second.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"^": {
  			doc: "Returns the result of raising the first input to the power specified by the second.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		sqrt: {
  			doc: "Returns the square root of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.42.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		log10: {
  			doc: "Returns the base-ten logarithm of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		ln: {
  			doc: "Returns the natural logarithm of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		log2: {
  			doc: "Returns the base-two logarithm of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		sin: {
  			doc: "Returns the sine of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		cos: {
  			doc: "Returns the cosine of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		tan: {
  			doc: "Returns the tangent of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		asin: {
  			doc: "Returns the arcsine of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		acos: {
  			doc: "Returns the arccosine of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		atan: {
  			doc: "Returns the arctangent of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		min: {
  			doc: "Returns the minimum value of the inputs.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		max: {
  			doc: "Returns the maximum value of the inputs.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		round: {
  			doc: "Rounds the input to the nearest integer. Halfway values are rounded away from zero. For example, `[\"round\", -1.5]` evaluates to -2.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.45.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		abs: {
  			doc: "Returns the absolute value of the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.45.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		ceil: {
  			doc: "Returns the smallest integer that is greater than or equal to the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.45.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		floor: {
  			doc: "Returns the largest integer that is less than or equal to the input.",
  			group: "Math",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.45.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"==": {
  			doc: "Returns `true` if the input values are equal, `false` otherwise. The comparison is strictly typed: values of different runtime types are always considered unequal. Cases where the types are known to be different at parse time are considered invalid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				},
  				collator: {
  					js: "0.45.0",
  					android: "6.5.0",
  					ios: "4.2.0",
  					macos: "0.9.0"
  				}
  			}
  		},
  		"!=": {
  			doc: "Returns `true` if the input values are not equal, `false` otherwise. The comparison is strictly typed: values of different runtime types are always considered unequal. Cases where the types are known to be different at parse time are considered invalid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				},
  				collator: {
  					js: "0.45.0",
  					android: "6.5.0",
  					ios: "4.2.0",
  					macos: "0.9.0"
  				}
  			}
  		},
  		">": {
  			doc: "Returns `true` if the first input is strictly greater than the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				},
  				collator: {
  					js: "0.45.0",
  					android: "6.5.0",
  					ios: "4.2.0",
  					macos: "0.9.0"
  				}
  			}
  		},
  		"<": {
  			doc: "Returns `true` if the first input is strictly less than the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				},
  				collator: {
  					js: "0.45.0",
  					android: "6.5.0",
  					ios: "4.2.0",
  					macos: "0.9.0"
  				}
  			}
  		},
  		">=": {
  			doc: "Returns `true` if the first input is greater than or equal to the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				},
  				collator: {
  					js: "0.45.0",
  					android: "6.5.0",
  					ios: "4.2.0",
  					macos: "0.9.0"
  				}
  			}
  		},
  		"<=": {
  			doc: "Returns `true` if the first input is less than or equal to the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				},
  				collator: {
  					js: "0.45.0",
  					android: "6.5.0",
  					ios: "4.2.0",
  					macos: "0.9.0"
  				}
  			}
  		},
  		all: {
  			doc: "Returns `true` if all the inputs are `true`, `false` otherwise. The inputs are evaluated in order, and evaluation is short-circuiting: once an input expression evaluates to `false`, the result is `false` and no further input expressions are evaluated.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		any: {
  			doc: "Returns `true` if any of the inputs are `true`, `false` otherwise. The inputs are evaluated in order, and evaluation is short-circuiting: once an input expression evaluates to `true`, the result is `true` and no further input expressions are evaluated.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"!": {
  			doc: "Logical negation. Returns `true` if the input is `false`, and `false` if the input is `true`.",
  			group: "Decision",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"is-supported-script": {
  			doc: "Returns `true` if the input string is expected to render legibly. Returns `false` if the input string contains sections that cannot be rendered without potential loss of meaning (e.g. Indic scripts that require complex text shaping, or right-to-left scripts if the the `mapbox-gl-rtl-text` plugin is not in use in Mapbox GL JS).",
  			group: "String"
  		},
  		upcase: {
  			doc: "Returns the input string converted to uppercase. Follows the Unicode Default Case Conversion algorithm and the locale-insensitive case mappings in the Unicode Character Database.",
  			group: "String",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		downcase: {
  			doc: "Returns the input string converted to lowercase. Follows the Unicode Default Case Conversion algorithm and the locale-insensitive case mappings in the Unicode Character Database.",
  			group: "String",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		concat: {
  			doc: "Returns a `string` consisting of the concatenation of the inputs. Each input is converted to a string as if by `to-string`.",
  			group: "String",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.41.0",
  					android: "6.0.0",
  					ios: "4.0.0",
  					macos: "0.7.0"
  				}
  			}
  		},
  		"resolved-locale": {
  			doc: "Returns the IETF language tag of the locale being used by the provided `collator`. This can be used to determine the default system locale, or to determine if a requested locale was successfully loaded.",
  			group: "String",
  			"sdk-support": {
  				"basic functionality": {
  					js: "0.45.0",
  					android: "6.5.0",
  					ios: "4.2.0",
  					macos: "0.9.0"
  				}
  			}
  		}
  	}
  };
  var light = {
  	anchor: {
  		type: "enum",
  		"default": "viewport",
  		values: {
  			map: {
  				doc: "The position of the light source is aligned to the rotation of the map."
  			},
  			viewport: {
  				doc: "The position of the light source is aligned to the rotation of the viewport."
  			}
  		},
  		"property-type": "data-constant",
  		transition: false,
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		doc: "Whether extruded geometries are lit relative to the map or viewport.",
  		example: "map",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		}
  	},
  	position: {
  		type: "array",
  		"default": [
  			1.15,
  			210,
  			30
  		],
  		length: 3,
  		value: "number",
  		"property-type": "data-constant",
  		transition: true,
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		doc: "Position of the light source relative to lit (extruded) geometries, in [r radial coordinate, a azimuthal angle, p polar angle] where r indicates the distance from the center of the base of an object to its light, a indicates the position of the light relative to 0° (0° when `light.anchor` is set to `viewport` corresponds to the top of the viewport, or 0° when `light.anchor` is set to `map` corresponds to due north, and degrees proceed clockwise), and p indicates the height of the light (from 0°, directly above, to 180°, directly below).",
  		example: [
  			1.5,
  			90,
  			80
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		}
  	},
  	color: {
  		type: "color",
  		"property-type": "data-constant",
  		"default": "#ffffff",
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		transition: true,
  		doc: "Color tint for lighting extruded geometries.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		}
  	},
  	intensity: {
  		type: "number",
  		"property-type": "data-constant",
  		"default": 0.5,
  		minimum: 0,
  		maximum: 1,
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		transition: true,
  		doc: "Intensity of lighting (on a scale from 0 to 1). Higher numbers will present as more extreme contrast.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		}
  	}
  };
  var paint = [
  	"paint_fill",
  	"paint_line",
  	"paint_circle",
  	"paint_heatmap",
  	"paint_fill-extrusion",
  	"paint_symbol",
  	"paint_raster",
  	"paint_hillshade",
  	"paint_background"
  ];
  var paint_fill = {
  	"fill-antialias": {
  		type: "boolean",
  		"default": true,
  		doc: "Whether or not the fill should be antialiased.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"fill-opacity": {
  		type: "number",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		doc: "The opacity of the entire fill layer. In contrast to the `fill-color`, this value will also affect the 1px stroke around the fill, if the stroke is used.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.21.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"fill-color": {
  		type: "color",
  		"default": "#000000",
  		doc: "The color of the filled part of this layer. This color can be specified as `rgba` with an alpha component and the color's opacity will not affect the opacity of the 1px stroke, if it is used.",
  		transition: true,
  		requires: [
  			{
  				"!": "fill-pattern"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.19.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"fill-outline-color": {
  		type: "color",
  		doc: "The outline color of the fill. Matches the value of `fill-color` if unspecified.",
  		transition: true,
  		requires: [
  			{
  				"!": "fill-pattern"
  			},
  			{
  				"fill-antialias": true
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.19.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"fill-translate": {
  		type: "array",
  		value: "number",
  		length: 2,
  		"default": [
  			0,
  			0
  		],
  		transition: true,
  		units: "pixels",
  		doc: "The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"fill-translate-anchor": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "The fill is translated relative to the map."
  			},
  			viewport: {
  				doc: "The fill is translated relative to the viewport."
  			}
  		},
  		doc: "Controls the frame of reference for `fill-translate`.",
  		"default": "map",
  		requires: [
  			"fill-translate"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"fill-pattern": {
  		type: "string",
  		transition: true,
  		doc: "Name of image in sprite to use for drawing image fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.49.0",
  				android: "6.5.0",
  				macos: "0.11.0",
  				ios: "4.4.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "cross-faded-data-driven"
  	}
  };
  var paint_line = {
  	"line-opacity": {
  		type: "number",
  		doc: "The opacity at which the line will be drawn.",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"line-color": {
  		type: "color",
  		doc: "The color with which the line will be drawn.",
  		"default": "#000000",
  		transition: true,
  		requires: [
  			{
  				"!": "line-pattern"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.23.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"line-translate": {
  		type: "array",
  		value: "number",
  		length: 2,
  		"default": [
  			0,
  			0
  		],
  		transition: true,
  		units: "pixels",
  		doc: "The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"line-translate-anchor": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "The line is translated relative to the map."
  			},
  			viewport: {
  				doc: "The line is translated relative to the viewport."
  			}
  		},
  		doc: "Controls the frame of reference for `line-translate`.",
  		"default": "map",
  		requires: [
  			"line-translate"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"line-width": {
  		type: "number",
  		"default": 1,
  		minimum: 0,
  		transition: true,
  		units: "pixels",
  		doc: "Stroke thickness.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.39.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"line-gap-width": {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		doc: "Draws a line casing outside of a line's actual path. Value indicates the width of the inner gap.",
  		transition: true,
  		units: "pixels",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"line-offset": {
  		type: "number",
  		"default": 0,
  		doc: "The line's offset. For linear features, a positive value offsets the line to the right, relative to the direction of the line, and a negative value to the left. For polygon features, a positive value results in an inset, and a negative value results in an outset.",
  		transition: true,
  		units: "pixels",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.12.1",
  				android: "3.0.0",
  				ios: "3.1.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"line-blur": {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		transition: true,
  		units: "pixels",
  		doc: "Blur applied to the line, in pixels.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"line-dasharray": {
  		type: "array",
  		value: "number",
  		doc: "Specifies the lengths of the alternating dashes and gaps that form the dash pattern. The lengths are later scaled by the line width. To convert a dash length to pixels, multiply the length by the current line width. Note that GeoJSON sources with `lineMetrics: true` specified won't render dashed lines to the expected scale. Also note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
  		minimum: 0,
  		transition: true,
  		units: "line widths",
  		requires: [
  			{
  				"!": "line-pattern"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "cross-faded"
  	},
  	"line-pattern": {
  		type: "string",
  		transition: true,
  		doc: "Name of image in sprite to use for drawing image lines. For seamless patterns, image width must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.49.0",
  				android: "6.5.0",
  				macos: "0.11.0",
  				ios: "4.4.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "cross-faded-data-driven"
  	},
  	"line-gradient": {
  		type: "color",
  		doc: "Defines a gradient with which to color a line feature. Can only be used with GeoJSON sources that specify `\"lineMetrics\": true`.",
  		transition: false,
  		requires: [
  			{
  				"!": "line-dasharray"
  			},
  			{
  				"!": "line-pattern"
  			},
  			{
  				source: "geojson",
  				has: {
  					lineMetrics: true
  				}
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.45.0",
  				android: "6.5.0",
  				ios: "4.4.0",
  				macos: "0.11.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"line-progress"
  			]
  		},
  		"property-type": "color-ramp"
  	}
  };
  var paint_circle = {
  	"circle-radius": {
  		type: "number",
  		"default": 5,
  		minimum: 0,
  		transition: true,
  		units: "pixels",
  		doc: "Circle radius.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.18.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"circle-color": {
  		type: "color",
  		"default": "#000000",
  		doc: "The fill color of the circle.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.18.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"circle-blur": {
  		type: "number",
  		"default": 0,
  		doc: "Amount to blur the circle. 1 blurs the circle such that only the centerpoint is full opacity.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.20.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"circle-opacity": {
  		type: "number",
  		doc: "The opacity at which the circle will be drawn.",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.20.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"circle-translate": {
  		type: "array",
  		value: "number",
  		length: 2,
  		"default": [
  			0,
  			0
  		],
  		transition: true,
  		units: "pixels",
  		doc: "The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"circle-translate-anchor": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "The circle is translated relative to the map."
  			},
  			viewport: {
  				doc: "The circle is translated relative to the viewport."
  			}
  		},
  		doc: "Controls the frame of reference for `circle-translate`.",
  		"default": "map",
  		requires: [
  			"circle-translate"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"circle-pitch-scale": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "Circles are scaled according to their apparent distance to the camera."
  			},
  			viewport: {
  				doc: "Circles are not scaled."
  			}
  		},
  		"default": "map",
  		doc: "Controls the scaling behavior of the circle when the map is pitched.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.21.0",
  				android: "4.2.0",
  				ios: "3.4.0",
  				macos: "0.2.1"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"circle-pitch-alignment": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "The circle is aligned to the plane of the map."
  			},
  			viewport: {
  				doc: "The circle is aligned to the plane of the viewport."
  			}
  		},
  		"default": "viewport",
  		doc: "Orientation of circle when map is pitched.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.39.0",
  				android: "5.2.0",
  				ios: "3.7.0",
  				macos: "0.6.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"circle-stroke-width": {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		transition: true,
  		units: "pixels",
  		doc: "The width of the circle's stroke. Strokes are placed outside of the `circle-radius`.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			},
  			"data-driven styling": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"circle-stroke-color": {
  		type: "color",
  		"default": "#000000",
  		doc: "The stroke color of the circle.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			},
  			"data-driven styling": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"circle-stroke-opacity": {
  		type: "number",
  		doc: "The opacity of the circle's stroke.",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			},
  			"data-driven styling": {
  				js: "0.29.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	}
  };
  var paint_heatmap = {
  	"heatmap-radius": {
  		type: "number",
  		"default": 30,
  		minimum: 1,
  		transition: true,
  		units: "pixels",
  		doc: "Radius of influence of one heatmap point in pixels. Increasing the value makes the heatmap smoother, but less detailed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.41.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			},
  			"data-driven styling": {
  				js: "0.43.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"heatmap-weight": {
  		type: "number",
  		"default": 1,
  		minimum: 0,
  		transition: false,
  		doc: "A measure of how much an individual point contributes to the heatmap. A value of 10 would be equivalent to having 10 points of weight 1 in the same spot. Especially useful when combined with clustering.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.41.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			},
  			"data-driven styling": {
  				js: "0.41.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"heatmap-intensity": {
  		type: "number",
  		"default": 1,
  		minimum: 0,
  		transition: true,
  		doc: "Similar to `heatmap-weight` but controls the intensity of the heatmap globally. Primarily used for adjusting the heatmap based on zoom level.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.41.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"heatmap-color": {
  		type: "color",
  		"default": [
  			"interpolate",
  			[
  				"linear"
  			],
  			[
  				"heatmap-density"
  			],
  			0,
  			"rgba(0, 0, 255, 0)",
  			0.1,
  			"royalblue",
  			0.3,
  			"cyan",
  			0.5,
  			"lime",
  			0.7,
  			"yellow",
  			1,
  			"red"
  		],
  		doc: "Defines the color of each pixel based on its density value in a heatmap.  Should be an expression that uses `[\"heatmap-density\"]` as input.",
  		transition: false,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.41.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"heatmap-density"
  			]
  		},
  		"property-type": "color-ramp"
  	},
  	"heatmap-opacity": {
  		type: "number",
  		doc: "The global opacity at which the heatmap layer will be drawn.",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.41.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	}
  };
  var paint_symbol = {
  	"icon-opacity": {
  		doc: "The opacity at which the icon will be drawn.",
  		type: "number",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-color": {
  		type: "color",
  		"default": "#000000",
  		transition: true,
  		doc: "The color of the icon. This can only be used with sdf icons.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-halo-color": {
  		type: "color",
  		"default": "rgba(0, 0, 0, 0)",
  		transition: true,
  		doc: "The color of the icon's halo. Icon halos can only be used with SDF icons.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-halo-width": {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		transition: true,
  		units: "pixels",
  		doc: "Distance of halo to the icon outline.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-halo-blur": {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		transition: true,
  		units: "pixels",
  		doc: "Fade out the halo towards the outside.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"icon-translate": {
  		type: "array",
  		value: "number",
  		length: 2,
  		"default": [
  			0,
  			0
  		],
  		transition: true,
  		units: "pixels",
  		doc: "Distance that the icon's anchor is moved from its original placement. Positive values indicate right and down, while negative values indicate left and up.",
  		requires: [
  			"icon-image"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"icon-translate-anchor": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "Icons are translated relative to the map."
  			},
  			viewport: {
  				doc: "Icons are translated relative to the viewport."
  			}
  		},
  		doc: "Controls the frame of reference for `icon-translate`.",
  		"default": "map",
  		requires: [
  			"icon-image",
  			"icon-translate"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-opacity": {
  		type: "number",
  		doc: "The opacity at which the text will be drawn.",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-color": {
  		type: "color",
  		doc: "The color with which the text will be drawn.",
  		"default": "#000000",
  		transition: true,
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-halo-color": {
  		type: "color",
  		"default": "rgba(0, 0, 0, 0)",
  		transition: true,
  		doc: "The color of the text's halo, which helps it stand out from backgrounds.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-halo-width": {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		transition: true,
  		units: "pixels",
  		doc: "Distance of halo to the font outline. Max text halo width is 1/4 of the font-size.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-halo-blur": {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		transition: true,
  		units: "pixels",
  		doc: "The halo's fadeout distance towards the outside.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  				js: "0.33.0",
  				android: "5.0.0",
  				ios: "3.5.0",
  				macos: "0.4.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"text-translate": {
  		type: "array",
  		value: "number",
  		length: 2,
  		"default": [
  			0,
  			0
  		],
  		transition: true,
  		units: "pixels",
  		doc: "Distance that the text's anchor is moved from its original placement. Positive values indicate right and down, while negative values indicate left and up.",
  		requires: [
  			"text-field"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"text-translate-anchor": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "The text is translated relative to the map."
  			},
  			viewport: {
  				doc: "The text is translated relative to the viewport."
  			}
  		},
  		doc: "Controls the frame of reference for `text-translate`.",
  		"default": "map",
  		requires: [
  			"text-field",
  			"text-translate"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	}
  };
  var paint_raster = {
  	"raster-opacity": {
  		type: "number",
  		doc: "The opacity at which the image will be drawn.",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"raster-hue-rotate": {
  		type: "number",
  		"default": 0,
  		period: 360,
  		transition: true,
  		units: "degrees",
  		doc: "Rotates hues around the color wheel.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"raster-brightness-min": {
  		type: "number",
  		doc: "Increase or reduce the brightness of the image. The value is the minimum brightness.",
  		"default": 0,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"raster-brightness-max": {
  		type: "number",
  		doc: "Increase or reduce the brightness of the image. The value is the maximum brightness.",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"raster-saturation": {
  		type: "number",
  		doc: "Increase or reduce the saturation of the image.",
  		"default": 0,
  		minimum: -1,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"raster-contrast": {
  		type: "number",
  		doc: "Increase or reduce the contrast of the image.",
  		"default": 0,
  		minimum: -1,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"raster-resampling": {
  		type: "enum",
  		doc: "The resampling/interpolation method to use for overscaling, also known as texture magnification filter",
  		values: {
  			linear: {
  				doc: "(Bi)linear filtering interpolates pixel values using the weighted average of the four closest original source pixels creating a smooth but blurry look when overscaled"
  			},
  			nearest: {
  				doc: "Nearest neighbor filtering interpolates pixel values using the nearest original source pixel creating a sharp but pixelated look when overscaled"
  			}
  		},
  		"default": "linear",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.47.0",
  				android: "6.3.0",
  				ios: "4.2.0",
  				macos: "0.9.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"raster-fade-duration": {
  		type: "number",
  		"default": 300,
  		minimum: 0,
  		transition: false,
  		units: "milliseconds",
  		doc: "Fade duration when a new tile is added.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	}
  };
  var paint_hillshade = {
  	"hillshade-illumination-direction": {
  		type: "number",
  		"default": 335,
  		minimum: 0,
  		maximum: 359,
  		doc: "The direction of the light source used to generate the hillshading with 0 as the top of the viewport if `hillshade-illumination-anchor` is set to `viewport` and due north if `hillshade-illumination-anchor` is set to `map`.",
  		transition: false,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.43.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"hillshade-illumination-anchor": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "The hillshade illumination is relative to the north direction."
  			},
  			viewport: {
  				doc: "The hillshade illumination is relative to the top of the viewport."
  			}
  		},
  		"default": "viewport",
  		doc: "Direction of light source when map is rotated.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.43.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"hillshade-exaggeration": {
  		type: "number",
  		doc: "Intensity of the hillshade",
  		"default": 0.5,
  		minimum: 0,
  		maximum: 1,
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.43.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"hillshade-shadow-color": {
  		type: "color",
  		"default": "#000000",
  		doc: "The shading color of areas that face away from the light source.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.43.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"hillshade-highlight-color": {
  		type: "color",
  		"default": "#FFFFFF",
  		doc: "The shading color of areas that faces towards the light source.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.43.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"hillshade-accent-color": {
  		type: "color",
  		"default": "#000000",
  		doc: "The shading color used to accentuate rugged terrain like sharp cliffs and gorges.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.43.0",
  				android: "6.0.0",
  				ios: "4.0.0",
  				macos: "0.7.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	}
  };
  var paint_background = {
  	"background-color": {
  		type: "color",
  		"default": "#000000",
  		doc: "The color with which the background will be drawn.",
  		transition: true,
  		requires: [
  			{
  				"!": "background-pattern"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"background-pattern": {
  		type: "string",
  		transition: true,
  		doc: "Name of image in sprite to use for drawing an image background. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "cross-faded"
  	},
  	"background-opacity": {
  		type: "number",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		doc: "The opacity at which the background will be drawn.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.10.0",
  				android: "2.0.1",
  				ios: "2.0.0",
  				macos: "0.1.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	}
  };
  var transition = {
  	duration: {
  		type: "number",
  		"default": 300,
  		minimum: 0,
  		units: "milliseconds",
  		doc: "Time allotted for transitions to complete."
  	},
  	delay: {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		units: "milliseconds",
  		doc: "Length of time before a transition begins."
  	}
  };
  var v8 = {
  	$version: $version,
  	$root: $root,
  	sources: sources,
  	source: source,
  	source_vector: source_vector,
  	source_raster: source_raster,
  	source_raster_dem: source_raster_dem,
  	source_geojson: source_geojson,
  	source_video: source_video,
  	source_image: source_image,
  	layer: layer,
  	layout: layout,
  	layout_background: layout_background,
  	layout_fill: layout_fill,
  	layout_circle: layout_circle,
  	layout_heatmap: layout_heatmap,
  	"layout_fill-extrusion": {
  	visibility: {
  		type: "enum",
  		values: {
  			visible: {
  				doc: "The layer is shown."
  			},
  			none: {
  				doc: "The layer is not shown."
  			}
  		},
  		"default": "visible",
  		doc: "Whether this layer is displayed.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		"property-type": "constant"
  	}
  },
  	layout_line: layout_line,
  	layout_symbol: layout_symbol,
  	layout_raster: layout_raster,
  	layout_hillshade: layout_hillshade,
  	filter: filter,
  	filter_operator: filter_operator,
  	geometry_type: geometry_type,
  	"function": {
  	expression: {
  		type: "expression",
  		doc: "An expression."
  	},
  	stops: {
  		type: "array",
  		doc: "An array of stops.",
  		value: "function_stop"
  	},
  	base: {
  		type: "number",
  		"default": 1,
  		minimum: 0,
  		doc: "The exponential base of the interpolation curve. It controls the rate at which the result increases. Higher values make the result increase more towards the high end of the range. With `1` the stops are interpolated linearly."
  	},
  	property: {
  		type: "string",
  		doc: "The name of a feature property to use as the function input.",
  		"default": "$zoom"
  	},
  	type: {
  		type: "enum",
  		values: {
  			identity: {
  				doc: "Return the input value as the output value."
  			},
  			exponential: {
  				doc: "Generate an output by interpolating between stops just less than and just greater than the function input."
  			},
  			interval: {
  				doc: "Return the output value of the stop just less than the function input."
  			},
  			categorical: {
  				doc: "Return the output value of the stop equal to the function input."
  			}
  		},
  		doc: "The interpolation strategy to use in function evaluation.",
  		"default": "exponential"
  	},
  	colorSpace: {
  		type: "enum",
  		values: {
  			rgb: {
  				doc: "Use the RGB color space to interpolate color values"
  			},
  			lab: {
  				doc: "Use the LAB color space to interpolate color values."
  			},
  			hcl: {
  				doc: "Use the HCL color space to interpolate color values, interpolating the Hue, Chroma, and Luminance channels individually."
  			}
  		},
  		doc: "The color space in which colors interpolated. Interpolating colors in perceptual color spaces like LAB and HCL tend to produce color ramps that look more consistent and produce colors that can be differentiated more easily than those interpolated in RGB space.",
  		"default": "rgb"
  	},
  	"default": {
  		type: "*",
  		required: false,
  		doc: "A value to serve as a fallback function result when a value isn't otherwise available. It is used in the following circumstances:\n* In categorical functions, when the feature value does not match any of the stop domain values.\n* In property and zoom-and-property functions, when a feature does not contain a value for the specified property.\n* In identity functions, when the feature value is not valid for the style property (for example, if the function is being used for a `circle-color` property but the feature property value is not a string or not a valid color).\n* In interval or exponential property and zoom-and-property functions, when the feature value is not numeric.\nIf no default is provided, the style property's default is used in these circumstances."
  	}
  },
  	function_stop: function_stop,
  	expression: expression,
  	expression_name: expression_name,
  	light: light,
  	paint: paint,
  	paint_fill: paint_fill,
  	"paint_fill-extrusion": {
  	"fill-extrusion-opacity": {
  		type: "number",
  		"default": 1,
  		minimum: 0,
  		maximum: 1,
  		doc: "The opacity of the entire fill extrusion layer. This is rendered on a per-layer, not per-feature, basis, and data-driven styling is not available.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"fill-extrusion-color": {
  		type: "color",
  		"default": "#000000",
  		doc: "The base color of the extruded fill. The extrusion's surfaces will be shaded differently based on this color in combination with the root `light` settings. If this color is specified as `rgba` with an alpha component, the alpha component will be ignored; use `fill-extrusion-opacity` to set layer opacity.",
  		transition: true,
  		requires: [
  			{
  				"!": "fill-extrusion-pattern"
  			}
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			},
  			"data-driven styling": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"fill-extrusion-translate": {
  		type: "array",
  		value: "number",
  		length: 2,
  		"default": [
  			0,
  			0
  		],
  		transition: true,
  		units: "pixels",
  		doc: "The geometry's offset. Values are [x, y] where negatives indicate left and up (on the flat plane), respectively.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"fill-extrusion-translate-anchor": {
  		type: "enum",
  		values: {
  			map: {
  				doc: "The fill extrusion is translated relative to the map."
  			},
  			viewport: {
  				doc: "The fill extrusion is translated relative to the viewport."
  			}
  		},
  		doc: "Controls the frame of reference for `fill-extrusion-translate`.",
  		"default": "map",
  		requires: [
  			"fill-extrusion-translate"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			},
  			"data-driven styling": {
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	},
  	"fill-extrusion-pattern": {
  		type: "string",
  		transition: true,
  		doc: "Name of image in sprite to use for drawing images on extruded fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.",
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			},
  			"data-driven styling": {
  				js: "0.49.0",
  				android: "6.5.0",
  				macos: "0.11.0",
  				ios: "4.4.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom",
  				"feature"
  			]
  		},
  		"property-type": "cross-faded-data-driven"
  	},
  	"fill-extrusion-height": {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		units: "meters",
  		doc: "The height with which to extrude this layer.",
  		transition: true,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			},
  			"data-driven styling": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"fill-extrusion-base": {
  		type: "number",
  		"default": 0,
  		minimum: 0,
  		units: "meters",
  		doc: "The height with which to extrude the base of this layer. Must be less than or equal to `fill-extrusion-height`.",
  		transition: true,
  		requires: [
  			"fill-extrusion-height"
  		],
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			},
  			"data-driven styling": {
  				js: "0.27.0",
  				android: "5.1.0",
  				ios: "3.6.0",
  				macos: "0.5.0"
  			}
  		},
  		expression: {
  			interpolated: true,
  			parameters: [
  				"zoom",
  				"feature",
  				"feature-state"
  			]
  		},
  		"property-type": "data-driven"
  	},
  	"fill-extrusion-vertical-gradient": {
  		type: "boolean",
  		"default": true,
  		doc: "Whether to apply a vertical gradient to the sides of a fill-extrusion layer. If true, sides will be shaded slightly darker farther down.",
  		transition: false,
  		"sdk-support": {
  			"basic functionality": {
  				js: "0.50.0",
  				ios: "4.7.0",
  				macos: "0.13.0"
  			}
  		},
  		expression: {
  			interpolated: false,
  			parameters: [
  				"zoom"
  			]
  		},
  		"property-type": "data-constant"
  	}
  },
  	paint_line: paint_line,
  	paint_circle: paint_circle,
  	paint_heatmap: paint_heatmap,
  	paint_symbol: paint_symbol,
  	paint_raster: paint_raster,
  	paint_hillshade: paint_hillshade,
  	paint_background: paint_background,
  	transition: transition,
  	"property-type": {
  	"data-driven": {
  		type: "property-type",
  		doc: "Property is interpolable and can be represented using a property expression."
  	},
  	"cross-faded": {
  		type: "property-type",
  		doc: "Property is non-interpolable; rather, its values will be cross-faded to smoothly transition between integer zooms."
  	},
  	"cross-faded-data-driven": {
  		type: "property-type",
  		doc: "Property is non-interpolable; rather, its values will be cross-faded to smoothly transition between integer zooms. It can be represented using a property expression."
  	},
  	"color-ramp": {
  		type: "property-type",
  		doc: "Property should be specified using a color ramp from which the output color can be sampled based on a property calculation."
  	},
  	"data-constant": {
  		type: "property-type",
  		doc: "Property is interpolable but cannot be represented using a property expression."
  	},
  	constant: {
  		type: "property-type",
  		doc: "Property is constant across all zoom levels and property values."
  	}
  }
  };

  function stringify (obj, options) {
    options = options || {};
    var indent = JSON.stringify([1], null, get(options, 'indent', 2)).slice(2, -3);
    var addMargin = get(options, 'margins', false);
    var maxLength = (indent === '' ? Infinity : get(options, 'maxLength', 80));

    return (function _stringify (obj, currentIndent, reserved) {
      if (obj && typeof obj.toJSON === 'function') {
        obj = obj.toJSON();
      }

      var string = JSON.stringify(obj);

      if (string === undefined) {
        return string
      }

      var length = maxLength - currentIndent.length - reserved;

      if (string.length <= length) {
        var prettified = prettify(string, addMargin);
        if (prettified.length <= length) {
          return prettified
        }
      }

      if (typeof obj === 'object' && obj !== null) {
        var nextIndent = currentIndent + indent;
        var items = [];
        var delimiters;
        var comma = function (array, index) {
          return (index === array.length - 1 ? 0 : 1)
        };

        if (Array.isArray(obj)) {
          for (var index = 0; index < obj.length; index++) {
            items.push(
              _stringify(obj[index], nextIndent, comma(obj, index)) || 'null'
            );
          }
          delimiters = '[]';
        } else {
          Object.keys(obj).forEach(function (key, index, array) {
            var keyPart = JSON.stringify(key) + ': ';
            var value = _stringify(obj[key], nextIndent,
                                   keyPart.length + comma(array, index));
            if (value !== undefined) {
              items.push(keyPart + value);
            }
          });
          delimiters = '{}';
        }

        if (items.length > 0) {
          return [
            delimiters[0],
            indent + items.join(',\n' + nextIndent),
            delimiters[1]
          ].join('\n' + currentIndent)
        }
      }

      return string
    }(obj, '', 0))
  }

  // Note: This regex matches even invalid JSON strings, but since we’re
  // working on the output of `JSON.stringify` we know that only valid strings
  // are present (unless the user supplied a weird `options.indent` but in
  // that case we don’t care since the output would be invalid anyway).
  var stringOrChar = /("(?:[^\\"]|\\.)*")|[:,\][}{]/g;

  function prettify (string, addMargin) {
    var m = addMargin ? ' ' : '';
    var tokens = {
      '{': '{' + m,
      '[': '[' + m,
      '}': m + '}',
      ']': m + ']',
      ',': ', ',
      ':': ': '
    };
    return string.replace(stringOrChar, function (match, string) {
      return string ? match : tokens[match]
    })
  }

  function get (options, name, defaultValue) {
    return (name in options ? options[name] : defaultValue)
  }

  var jsonStringifyPrettyCompact = stringify;

  function sortKeysBy(obj, reference) {
      var result = {};
      for (var key in reference) {
          if (obj[key] !== undefined) {
              result[key] = obj[key];
          }
      }
      for (var key$1 in obj) {
          if (result[key$1] === undefined) {
              result[key$1] = obj[key$1];
          }
      }
      return result;
  }
  function format(style, space) {
      if (space === void 0)
          { space = 2; }
      style = sortKeysBy(style, v8.$root);
      if (style.layers) {
          style.layers = style.layers.map(function (layer) {
              return sortKeysBy(layer, v8.layer);
          });
      }
      return jsonStringifyPrettyCompact(style, { indent: space });
  }

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var punycode = createCommonjsModule(function (module, exports) {
  (function(root) {

  	/** Detect free variables */
  	var freeExports = exports &&
  		!exports.nodeType && exports;
  	var freeModule = module &&
  		!module.nodeType && module;
  	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
  	if (
  		freeGlobal.global === freeGlobal ||
  		freeGlobal.window === freeGlobal ||
  		freeGlobal.self === freeGlobal
  	) {
  		root = freeGlobal;
  	}

  	/**
  	 * The `punycode` object.
  	 * @name punycode
  	 * @type Object
  	 */
  	var punycode,

  	/** Highest positive signed 32-bit float value */
  	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

  	/** Bootstring parameters */
  	base = 36,
  	tMin = 1,
  	tMax = 26,
  	skew = 38,
  	damp = 700,
  	initialBias = 72,
  	initialN = 128, // 0x80
  	delimiter = '-', // '\x2D'

  	/** Regular expressions */
  	regexPunycode = /^xn--/,
  	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
  	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

  	/** Error messages */
  	errors = {
  		'overflow': 'Overflow: input needs wider integers to process',
  		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
  		'invalid-input': 'Invalid input'
  	},

  	/** Convenience shortcuts */
  	baseMinusTMin = base - tMin,
  	floor = Math.floor,
  	stringFromCharCode = String.fromCharCode,

  	/** Temporary variable */
  	key;

  	/*--------------------------------------------------------------------------*/

  	/**
  	 * A generic error utility function.
  	 * @private
  	 * @param {String} type The error type.
  	 * @returns {Error} Throws a `RangeError` with the applicable error message.
  	 */
  	function error(type) {
  		throw RangeError(errors[type]);
  	}

  	/**
  	 * A generic `Array#map` utility function.
  	 * @private
  	 * @param {Array} array The array to iterate over.
  	 * @param {Function} callback The function that gets called for every array
  	 * item.
  	 * @returns {Array} A new array of values returned by the callback function.
  	 */
  	function map(array, fn) {
  		var length = array.length;
  		var result = [];
  		while (length--) {
  			result[length] = fn(array[length]);
  		}
  		return result;
  	}

  	/**
  	 * A simple `Array#map`-like wrapper to work with domain name strings or email
  	 * addresses.
  	 * @private
  	 * @param {String} domain The domain name or email address.
  	 * @param {Function} callback The function that gets called for every
  	 * character.
  	 * @returns {Array} A new string of characters returned by the callback
  	 * function.
  	 */
  	function mapDomain(string, fn) {
  		var parts = string.split('@');
  		var result = '';
  		if (parts.length > 1) {
  			// In email addresses, only the domain name should be punycoded. Leave
  			// the local part (i.e. everything up to `@`) intact.
  			result = parts[0] + '@';
  			string = parts[1];
  		}
  		// Avoid `split(regex)` for IE8 compatibility. See #17.
  		string = string.replace(regexSeparators, '\x2E');
  		var labels = string.split('.');
  		var encoded = map(labels, fn).join('.');
  		return result + encoded;
  	}

  	/**
  	 * Creates an array containing the numeric code points of each Unicode
  	 * character in the string. While JavaScript uses UCS-2 internally,
  	 * this function will convert a pair of surrogate halves (each of which
  	 * UCS-2 exposes as separate characters) into a single code point,
  	 * matching UTF-16.
  	 * @see `punycode.ucs2.encode`
  	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
  	 * @memberOf punycode.ucs2
  	 * @name decode
  	 * @param {String} string The Unicode input string (UCS-2).
  	 * @returns {Array} The new array of code points.
  	 */
  	function ucs2decode(string) {
  		var output = [],
  		    counter = 0,
  		    length = string.length,
  		    value,
  		    extra;
  		while (counter < length) {
  			value = string.charCodeAt(counter++);
  			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
  				// high surrogate, and there is a next character
  				extra = string.charCodeAt(counter++);
  				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
  					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
  				} else {
  					// unmatched surrogate; only append this code unit, in case the next
  					// code unit is the high surrogate of a surrogate pair
  					output.push(value);
  					counter--;
  				}
  			} else {
  				output.push(value);
  			}
  		}
  		return output;
  	}

  	/**
  	 * Creates a string based on an array of numeric code points.
  	 * @see `punycode.ucs2.decode`
  	 * @memberOf punycode.ucs2
  	 * @name encode
  	 * @param {Array} codePoints The array of numeric code points.
  	 * @returns {String} The new Unicode string (UCS-2).
  	 */
  	function ucs2encode(array) {
  		return map(array, function(value) {
  			var output = '';
  			if (value > 0xFFFF) {
  				value -= 0x10000;
  				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
  				value = 0xDC00 | value & 0x3FF;
  			}
  			output += stringFromCharCode(value);
  			return output;
  		}).join('');
  	}

  	/**
  	 * Converts a basic code point into a digit/integer.
  	 * @see `digitToBasic()`
  	 * @private
  	 * @param {Number} codePoint The basic numeric code point value.
  	 * @returns {Number} The numeric value of a basic code point (for use in
  	 * representing integers) in the range `0` to `base - 1`, or `base` if
  	 * the code point does not represent a value.
  	 */
  	function basicToDigit(codePoint) {
  		if (codePoint - 48 < 10) {
  			return codePoint - 22;
  		}
  		if (codePoint - 65 < 26) {
  			return codePoint - 65;
  		}
  		if (codePoint - 97 < 26) {
  			return codePoint - 97;
  		}
  		return base;
  	}

  	/**
  	 * Converts a digit/integer into a basic code point.
  	 * @see `basicToDigit()`
  	 * @private
  	 * @param {Number} digit The numeric value of a basic code point.
  	 * @returns {Number} The basic code point whose value (when used for
  	 * representing integers) is `digit`, which needs to be in the range
  	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
  	 * used; else, the lowercase form is used. The behavior is undefined
  	 * if `flag` is non-zero and `digit` has no uppercase form.
  	 */
  	function digitToBasic(digit, flag) {
  		//  0..25 map to ASCII a..z or A..Z
  		// 26..35 map to ASCII 0..9
  		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  	}

  	/**
  	 * Bias adaptation function as per section 3.4 of RFC 3492.
  	 * http://tools.ietf.org/html/rfc3492#section-3.4
  	 * @private
  	 */
  	function adapt(delta, numPoints, firstTime) {
  		var k = 0;
  		delta = firstTime ? floor(delta / damp) : delta >> 1;
  		delta += floor(delta / numPoints);
  		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
  			delta = floor(delta / baseMinusTMin);
  		}
  		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  	}

  	/**
  	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
  	 * symbols.
  	 * @memberOf punycode
  	 * @param {String} input The Punycode string of ASCII-only symbols.
  	 * @returns {String} The resulting string of Unicode symbols.
  	 */
  	function decode(input) {
  		// Don't use UCS-2
  		var output = [],
  		    inputLength = input.length,
  		    out,
  		    i = 0,
  		    n = initialN,
  		    bias = initialBias,
  		    basic,
  		    j,
  		    index,
  		    oldi,
  		    w,
  		    k,
  		    digit,
  		    t,
  		    /** Cached calculation results */
  		    baseMinusT;

  		// Handle the basic code points: let `basic` be the number of input code
  		// points before the last delimiter, or `0` if there is none, then copy
  		// the first basic code points to the output.

  		basic = input.lastIndexOf(delimiter);
  		if (basic < 0) {
  			basic = 0;
  		}

  		for (j = 0; j < basic; ++j) {
  			// if it's not a basic code point
  			if (input.charCodeAt(j) >= 0x80) {
  				error('not-basic');
  			}
  			output.push(input.charCodeAt(j));
  		}

  		// Main decoding loop: start just after the last delimiter if any basic code
  		// points were copied; start at the beginning otherwise.

  		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

  			// `index` is the index of the next character to be consumed.
  			// Decode a generalized variable-length integer into `delta`,
  			// which gets added to `i`. The overflow checking is easier
  			// if we increase `i` as we go, then subtract off its starting
  			// value at the end to obtain `delta`.
  			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

  				if (index >= inputLength) {
  					error('invalid-input');
  				}

  				digit = basicToDigit(input.charCodeAt(index++));

  				if (digit >= base || digit > floor((maxInt - i) / w)) {
  					error('overflow');
  				}

  				i += digit * w;
  				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

  				if (digit < t) {
  					break;
  				}

  				baseMinusT = base - t;
  				if (w > floor(maxInt / baseMinusT)) {
  					error('overflow');
  				}

  				w *= baseMinusT;

  			}

  			out = output.length + 1;
  			bias = adapt(i - oldi, out, oldi == 0);

  			// `i` was supposed to wrap around from `out` to `0`,
  			// incrementing `n` each time, so we'll fix that now:
  			if (floor(i / out) > maxInt - n) {
  				error('overflow');
  			}

  			n += floor(i / out);
  			i %= out;

  			// Insert `n` at position `i` of the output
  			output.splice(i++, 0, n);

  		}

  		return ucs2encode(output);
  	}

  	/**
  	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
  	 * Punycode string of ASCII-only symbols.
  	 * @memberOf punycode
  	 * @param {String} input The string of Unicode symbols.
  	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
  	 */
  	function encode(input) {
  		var n,
  		    delta,
  		    handledCPCount,
  		    basicLength,
  		    bias,
  		    j,
  		    m,
  		    q,
  		    k,
  		    t,
  		    currentValue,
  		    output = [],
  		    /** `inputLength` will hold the number of code points in `input`. */
  		    inputLength,
  		    /** Cached calculation results */
  		    handledCPCountPlusOne,
  		    baseMinusT,
  		    qMinusT;

  		// Convert the input in UCS-2 to Unicode
  		input = ucs2decode(input);

  		// Cache the length
  		inputLength = input.length;

  		// Initialize the state
  		n = initialN;
  		delta = 0;
  		bias = initialBias;

  		// Handle the basic code points
  		for (j = 0; j < inputLength; ++j) {
  			currentValue = input[j];
  			if (currentValue < 0x80) {
  				output.push(stringFromCharCode(currentValue));
  			}
  		}

  		handledCPCount = basicLength = output.length;

  		// `handledCPCount` is the number of code points that have been handled;
  		// `basicLength` is the number of basic code points.

  		// Finish the basic string - if it is not empty - with a delimiter
  		if (basicLength) {
  			output.push(delimiter);
  		}

  		// Main encoding loop:
  		while (handledCPCount < inputLength) {

  			// All non-basic code points < n have been handled already. Find the next
  			// larger one:
  			for (m = maxInt, j = 0; j < inputLength; ++j) {
  				currentValue = input[j];
  				if (currentValue >= n && currentValue < m) {
  					m = currentValue;
  				}
  			}

  			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
  			// but guard against overflow
  			handledCPCountPlusOne = handledCPCount + 1;
  			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
  				error('overflow');
  			}

  			delta += (m - n) * handledCPCountPlusOne;
  			n = m;

  			for (j = 0; j < inputLength; ++j) {
  				currentValue = input[j];

  				if (currentValue < n && ++delta > maxInt) {
  					error('overflow');
  				}

  				if (currentValue == n) {
  					// Represent delta as a generalized variable-length integer
  					for (q = delta, k = base; /* no condition */; k += base) {
  						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
  						if (q < t) {
  							break;
  						}
  						qMinusT = q - t;
  						baseMinusT = base - t;
  						output.push(
  							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
  						);
  						q = floor(qMinusT / baseMinusT);
  					}

  					output.push(stringFromCharCode(digitToBasic(q, 0)));
  					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
  					delta = 0;
  					++handledCPCount;
  				}
  			}

  			++delta;
  			++n;

  		}
  		return output.join('');
  	}

  	/**
  	 * Converts a Punycode string representing a domain name or an email address
  	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
  	 * it doesn't matter if you call it on a string that has already been
  	 * converted to Unicode.
  	 * @memberOf punycode
  	 * @param {String} input The Punycoded domain name or email address to
  	 * convert to Unicode.
  	 * @returns {String} The Unicode representation of the given Punycode
  	 * string.
  	 */
  	function toUnicode(input) {
  		return mapDomain(input, function(string) {
  			return regexPunycode.test(string)
  				? decode(string.slice(4).toLowerCase())
  				: string;
  		});
  	}

  	/**
  	 * Converts a Unicode string representing a domain name or an email address to
  	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
  	 * i.e. it doesn't matter if you call it with a domain that's already in
  	 * ASCII.
  	 * @memberOf punycode
  	 * @param {String} input The domain name or email address to convert, as a
  	 * Unicode string.
  	 * @returns {String} The Punycode representation of the given domain name or
  	 * email address.
  	 */
  	function toASCII(input) {
  		return mapDomain(input, function(string) {
  			return regexNonASCII.test(string)
  				? 'xn--' + encode(string)
  				: string;
  		});
  	}

  	/*--------------------------------------------------------------------------*/

  	/** Define the public API */
  	punycode = {
  		/**
  		 * A string representing the current Punycode.js version number.
  		 * @memberOf punycode
  		 * @type String
  		 */
  		'version': '1.3.2',
  		/**
  		 * An object of methods to convert from JavaScript's internal character
  		 * representation (UCS-2) to Unicode code points, and back.
  		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
  		 * @memberOf punycode
  		 * @type Object
  		 */
  		'ucs2': {
  			'decode': ucs2decode,
  			'encode': ucs2encode
  		},
  		'decode': decode,
  		'encode': encode,
  		'toASCII': toASCII,
  		'toUnicode': toUnicode
  	};

  	/** Expose `punycode` */
  	// Some AMD build optimizers, like r.js, check for specific condition patterns
  	// like the following:
  	if (freeExports && freeModule) {
  		if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
  			freeModule.exports = punycode;
  		} else { // in Narwhal or RingoJS v0.7.0-
  			for (key in punycode) {
  				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
  			}
  		}
  	} else { // in Rhino or a web browser
  		root.punycode = punycode;
  	}

  }(commonjsGlobal));
  });

  var util = {
    isString: function(arg) {
      return typeof(arg) === 'string';
    },
    isObject: function(arg) {
      return typeof(arg) === 'object' && arg !== null;
    },
    isNull: function(arg) {
      return arg === null;
    },
    isNullOrUndefined: function(arg) {
      return arg == null;
    }
  };

  // Copyright Joyent, Inc. and other Node contributors.

  // If obj.hasOwnProperty has been overridden, then calling
  // obj.hasOwnProperty(prop) will break.
  // See: https://github.com/joyent/node/issues/1707
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  var decode = function(qs, sep, eq, options) {
    sep = sep || '&';
    eq = eq || '=';
    var obj = {};

    if (typeof qs !== 'string' || qs.length === 0) {
      return obj;
    }

    var regexp = /\+/g;
    qs = qs.split(sep);

    var maxKeys = 1000;
    if (options && typeof options.maxKeys === 'number') {
      maxKeys = options.maxKeys;
    }

    var len = qs.length;
    // maxKeys <= 0 means that we should not limit keys count
    if (maxKeys > 0 && len > maxKeys) {
      len = maxKeys;
    }

    for (var i = 0; i < len; ++i) {
      var x = qs[i].replace(regexp, '%20'),
          idx = x.indexOf(eq),
          kstr, vstr, k, v;

      if (idx >= 0) {
        kstr = x.substr(0, idx);
        vstr = x.substr(idx + 1);
      } else {
        kstr = x;
        vstr = '';
      }

      k = decodeURIComponent(kstr);
      v = decodeURIComponent(vstr);

      if (!hasOwnProperty(obj, k)) {
        obj[k] = v;
      } else if (Array.isArray(obj[k])) {
        obj[k].push(v);
      } else {
        obj[k] = [obj[k], v];
      }
    }

    return obj;
  };

  // Copyright Joyent, Inc. and other Node contributors.

  var stringifyPrimitive = function(v) {
    switch (typeof v) {
      case 'string':
        return v;

      case 'boolean':
        return v ? 'true' : 'false';

      case 'number':
        return isFinite(v) ? v : '';

      default:
        return '';
    }
  };

  var encode = function(obj, sep, eq, name) {
    sep = sep || '&';
    eq = eq || '=';
    if (obj === null) {
      obj = undefined;
    }

    if (typeof obj === 'object') {
      return Object.keys(obj).map(function(k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
        if (Array.isArray(obj[k])) {
          return obj[k].map(function(v) {
            return ks + encodeURIComponent(stringifyPrimitive(v));
          }).join(sep);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      }).join(sep);

    }

    if (!name) { return ''; }
    return encodeURIComponent(stringifyPrimitive(name)) + eq +
           encodeURIComponent(stringifyPrimitive(obj));
  };

  var querystring = createCommonjsModule(function (module, exports) {

  exports.decode = exports.parse = decode;
  exports.encode = exports.stringify = encode;
  });
  var querystring_1 = querystring.decode;
  var querystring_2 = querystring.parse;
  var querystring_3 = querystring.encode;
  var querystring_4 = querystring.stringify;

  var parse = urlParse;
  var resolve = urlResolve;
  var resolveObject = urlResolveObject;
  var format$1 = urlFormat;

  var Url_1 = Url;

  function Url() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.host = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.query = null;
    this.pathname = null;
    this.path = null;
    this.href = null;
  }

  // Reference: RFC 3986, RFC 1808, RFC 2396

  // define these here so at least they only have to be
  // compiled once on the first module load.
  var protocolPattern = /^([a-z0-9.+-]+:)/i,
      portPattern = /:[0-9]*$/,

      // Special case for a simple path URL
      simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

      // RFC 2396: characters reserved for delimiting URLs.
      // We actually just auto-escape these.
      delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

      // RFC 2396: characters not allowed for various reasons.
      unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

      // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
      autoEscape = ['\''].concat(unwise),
      // Characters that are never ever allowed in a hostname.
      // Note that any invalid chars are also handled, but these
      // are the ones that are *expected* to be seen, so we fast-path
      // them.
      nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
      hostEndingChars = ['/', '?', '#'],
      hostnameMaxLen = 255,
      hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
      hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
      // protocols that can allow "unsafe" and "unwise" chars.
      unsafeProtocol = {
        'javascript': true,
        'javascript:': true
      },
      // protocols that never have a hostname.
      hostlessProtocol = {
        'javascript': true,
        'javascript:': true
      },
      // protocols that always contain a // bit.
      slashedProtocol = {
        'http': true,
        'https': true,
        'ftp': true,
        'gopher': true,
        'file': true,
        'http:': true,
        'https:': true,
        'ftp:': true,
        'gopher:': true,
        'file:': true
      };

  function urlParse(url, parseQueryString, slashesDenoteHost) {
    if (url && util.isObject(url) && url instanceof Url) { return url; }

    var u = new Url;
    u.parse(url, parseQueryString, slashesDenoteHost);
    return u;
  }

  Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
    if (!util.isString(url)) {
      throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
    }

    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    var queryIndex = url.indexOf('?'),
        splitter =
            (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
        uSplit = url.split(splitter),
        slashRegex = /\\/g;
    uSplit[0] = uSplit[0].replace(slashRegex, '/');
    url = uSplit.join(splitter);

    var rest = url;

    // trim before proceeding.
    // This is to support parse stuff like "  http://foo.com  \n"
    rest = rest.trim();

    if (!slashesDenoteHost && url.split('#').length === 1) {
      // Try fast path regexp
      var simplePath = simplePathPattern.exec(rest);
      if (simplePath) {
        this.path = rest;
        this.href = rest;
        this.pathname = simplePath[1];
        if (simplePath[2]) {
          this.search = simplePath[2];
          if (parseQueryString) {
            this.query = querystring.parse(this.search.substr(1));
          } else {
            this.query = this.search.substr(1);
          }
        } else if (parseQueryString) {
          this.search = '';
          this.query = {};
        }
        return this;
      }
    }

    var proto = protocolPattern.exec(rest);
    if (proto) {
      proto = proto[0];
      var lowerProto = proto.toLowerCase();
      this.protocol = lowerProto;
      rest = rest.substr(proto.length);
    }

    // figure out if it's got a host
    // user@server is *always* interpreted as a hostname, and url
    // resolution will treat //foo/bar as host=foo,path=bar because that's
    // how the browser resolves relative URLs.
    if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
      var slashes = rest.substr(0, 2) === '//';
      if (slashes && !(proto && hostlessProtocol[proto])) {
        rest = rest.substr(2);
        this.slashes = true;
      }
    }

    if (!hostlessProtocol[proto] &&
        (slashes || (proto && !slashedProtocol[proto]))) {

      // there's a hostname.
      // the first instance of /, ?, ;, or # ends the host.
      //
      // If there is an @ in the hostname, then non-host chars *are* allowed
      // to the left of the last @ sign, unless some host-ending character
      // comes *before* the @-sign.
      // URLs are obnoxious.
      //
      // ex:
      // http://a@b@c/ => user:a@b host:c
      // http://a@b?@c => user:a host:c path:/?@c

      // v0.12 TODO(isaacs): This is not quite how Chrome does things.
      // Review our test case against browsers more comprehensively.

      // find the first instance of any hostEndingChars
      var hostEnd = -1;
      for (var i = 0; i < hostEndingChars.length; i++) {
        var hec = rest.indexOf(hostEndingChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          { hostEnd = hec; }
      }

      // at this point, either we have an explicit point where the
      // auth portion cannot go past, or the last @ char is the decider.
      var auth, atSign;
      if (hostEnd === -1) {
        // atSign can be anywhere.
        atSign = rest.lastIndexOf('@');
      } else {
        // atSign must be in auth portion.
        // http://a@b/c@d => host:b auth:a path:/c@d
        atSign = rest.lastIndexOf('@', hostEnd);
      }

      // Now we have a portion which is definitely the auth.
      // Pull that off.
      if (atSign !== -1) {
        auth = rest.slice(0, atSign);
        rest = rest.slice(atSign + 1);
        this.auth = decodeURIComponent(auth);
      }

      // the host is the remaining to the left of the first non-host char
      hostEnd = -1;
      for (var i = 0; i < nonHostChars.length; i++) {
        var hec = rest.indexOf(nonHostChars[i]);
        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
          { hostEnd = hec; }
      }
      // if we still have not hit it, then the entire thing is a host.
      if (hostEnd === -1)
        { hostEnd = rest.length; }

      this.host = rest.slice(0, hostEnd);
      rest = rest.slice(hostEnd);

      // pull out port.
      this.parseHost();

      // we've indicated that there is a hostname,
      // so even if it's empty, it has to be present.
      this.hostname = this.hostname || '';

      // if hostname begins with [ and ends with ]
      // assume that it's an IPv6 address.
      var ipv6Hostname = this.hostname[0] === '[' &&
          this.hostname[this.hostname.length - 1] === ']';

      // validate a little.
      if (!ipv6Hostname) {
        var hostparts = this.hostname.split(/\./);
        for (var i = 0, l = hostparts.length; i < l; i++) {
          var part = hostparts[i];
          if (!part) { continue; }
          if (!part.match(hostnamePartPattern)) {
            var newpart = '';
            for (var j = 0, k = part.length; j < k; j++) {
              if (part.charCodeAt(j) > 127) {
                // we replace non-ASCII char with a temporary placeholder
                // we need this to make sure size of hostname is not
                // broken by replacing non-ASCII by nothing
                newpart += 'x';
              } else {
                newpart += part[j];
              }
            }
            // we test again with ASCII char only
            if (!newpart.match(hostnamePartPattern)) {
              var validParts = hostparts.slice(0, i);
              var notHost = hostparts.slice(i + 1);
              var bit = part.match(hostnamePartStart);
              if (bit) {
                validParts.push(bit[1]);
                notHost.unshift(bit[2]);
              }
              if (notHost.length) {
                rest = '/' + notHost.join('.') + rest;
              }
              this.hostname = validParts.join('.');
              break;
            }
          }
        }
      }

      if (this.hostname.length > hostnameMaxLen) {
        this.hostname = '';
      } else {
        // hostnames are always lower case.
        this.hostname = this.hostname.toLowerCase();
      }

      if (!ipv6Hostname) {
        // IDNA Support: Returns a punycoded representation of "domain".
        // It only converts parts of the domain name that
        // have non-ASCII characters, i.e. it doesn't matter if
        // you call it with a domain that already is ASCII-only.
        this.hostname = punycode.toASCII(this.hostname);
      }

      var p = this.port ? ':' + this.port : '';
      var h = this.hostname || '';
      this.host = h + p;
      this.href += this.host;

      // strip [ and ] from the hostname
      // the host field still retains them, though
      if (ipv6Hostname) {
        this.hostname = this.hostname.substr(1, this.hostname.length - 2);
        if (rest[0] !== '/') {
          rest = '/' + rest;
        }
      }
    }

    // now rest is set to the post-host stuff.
    // chop off any delim chars.
    if (!unsafeProtocol[lowerProto]) {

      // First, make 100% sure that any "autoEscape" chars get
      // escaped, even if encodeURIComponent doesn't think they
      // need to be.
      for (var i = 0, l = autoEscape.length; i < l; i++) {
        var ae = autoEscape[i];
        if (rest.indexOf(ae) === -1)
          { continue; }
        var esc = encodeURIComponent(ae);
        if (esc === ae) {
          esc = escape(ae);
        }
        rest = rest.split(ae).join(esc);
      }
    }


    // chop off from the tail first.
    var hash = rest.indexOf('#');
    if (hash !== -1) {
      // got a fragment string.
      this.hash = rest.substr(hash);
      rest = rest.slice(0, hash);
    }
    var qm = rest.indexOf('?');
    if (qm !== -1) {
      this.search = rest.substr(qm);
      this.query = rest.substr(qm + 1);
      if (parseQueryString) {
        this.query = querystring.parse(this.query);
      }
      rest = rest.slice(0, qm);
    } else if (parseQueryString) {
      // no query string, but parseQueryString still requested
      this.search = '';
      this.query = {};
    }
    if (rest) { this.pathname = rest; }
    if (slashedProtocol[lowerProto] &&
        this.hostname && !this.pathname) {
      this.pathname = '/';
    }

    //to support http.request
    if (this.pathname || this.search) {
      var p = this.pathname || '';
      var s = this.search || '';
      this.path = p + s;
    }

    // finally, reconstruct the href based on what has been validated.
    this.href = this.format();
    return this;
  };

  // format a parsed object into a url string
  function urlFormat(obj) {
    // ensure it's an object, and not a string url.
    // If it's an obj, this is a no-op.
    // this way, you can call url_format() on strings
    // to clean up potentially wonky urls.
    if (util.isString(obj)) { obj = urlParse(obj); }
    if (!(obj instanceof Url)) { return Url.prototype.format.call(obj); }
    return obj.format();
  }

  Url.prototype.format = function() {
    var auth = this.auth || '';
    if (auth) {
      auth = encodeURIComponent(auth);
      auth = auth.replace(/%3A/i, ':');
      auth += '@';
    }

    var protocol = this.protocol || '',
        pathname = this.pathname || '',
        hash = this.hash || '',
        host = false,
        query = '';

    if (this.host) {
      host = auth + this.host;
    } else if (this.hostname) {
      host = auth + (this.hostname.indexOf(':') === -1 ?
          this.hostname :
          '[' + this.hostname + ']');
      if (this.port) {
        host += ':' + this.port;
      }
    }

    if (this.query &&
        util.isObject(this.query) &&
        Object.keys(this.query).length) {
      query = querystring.stringify(this.query);
    }

    var search = this.search || (query && ('?' + query)) || '';

    if (protocol && protocol.substr(-1) !== ':') { protocol += ':'; }

    // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
    // unless they had them to begin with.
    if (this.slashes ||
        (!protocol || slashedProtocol[protocol]) && host !== false) {
      host = '//' + (host || '');
      if (pathname && pathname.charAt(0) !== '/') { pathname = '/' + pathname; }
    } else if (!host) {
      host = '';
    }

    if (hash && hash.charAt(0) !== '#') { hash = '#' + hash; }
    if (search && search.charAt(0) !== '?') { search = '?' + search; }

    pathname = pathname.replace(/[?#]/g, function(match) {
      return encodeURIComponent(match);
    });
    search = search.replace('#', '%23');

    return protocol + host + pathname + search + hash;
  };

  function urlResolve(source, relative) {
    return urlParse(source, false, true).resolve(relative);
  }

  Url.prototype.resolve = function(relative) {
    return this.resolveObject(urlParse(relative, false, true)).format();
  };

  function urlResolveObject(source, relative) {
    if (!source) { return relative; }
    return urlParse(source, false, true).resolveObject(relative);
  }

  Url.prototype.resolveObject = function(relative) {
    if (util.isString(relative)) {
      var rel = new Url();
      rel.parse(relative, false, true);
      relative = rel;
    }

    var result = new Url();
    var tkeys = Object.keys(this);
    for (var tk = 0; tk < tkeys.length; tk++) {
      var tkey = tkeys[tk];
      result[tkey] = this[tkey];
    }

    // hash is always overridden, no matter what.
    // even href="" will remove it.
    result.hash = relative.hash;

    // if the relative url is empty, then there's nothing left to do here.
    if (relative.href === '') {
      result.href = result.format();
      return result;
    }

    // hrefs like //foo/bar always cut to the protocol.
    if (relative.slashes && !relative.protocol) {
      // take everything except the protocol from relative
      var rkeys = Object.keys(relative);
      for (var rk = 0; rk < rkeys.length; rk++) {
        var rkey = rkeys[rk];
        if (rkey !== 'protocol')
          { result[rkey] = relative[rkey]; }
      }

      //urlParse appends trailing / to urls like http://www.example.com
      if (slashedProtocol[result.protocol] &&
          result.hostname && !result.pathname) {
        result.path = result.pathname = '/';
      }

      result.href = result.format();
      return result;
    }

    if (relative.protocol && relative.protocol !== result.protocol) {
      // if it's a known url protocol, then changing
      // the protocol does weird things
      // first, if it's not file:, then we MUST have a host,
      // and if there was a path
      // to begin with, then we MUST have a path.
      // if it is file:, then the host is dropped,
      // because that's known to be hostless.
      // anything else is assumed to be absolute.
      if (!slashedProtocol[relative.protocol]) {
        var keys = Object.keys(relative);
        for (var v = 0; v < keys.length; v++) {
          var k = keys[v];
          result[k] = relative[k];
        }
        result.href = result.format();
        return result;
      }

      result.protocol = relative.protocol;
      if (!relative.host && !hostlessProtocol[relative.protocol]) {
        var relPath = (relative.pathname || '').split('/');
        while (relPath.length && !(relative.host = relPath.shift())){ }
        if (!relative.host) { relative.host = ''; }
        if (!relative.hostname) { relative.hostname = ''; }
        if (relPath[0] !== '') { relPath.unshift(''); }
        if (relPath.length < 2) { relPath.unshift(''); }
        result.pathname = relPath.join('/');
      } else {
        result.pathname = relative.pathname;
      }
      result.search = relative.search;
      result.query = relative.query;
      result.host = relative.host || '';
      result.auth = relative.auth;
      result.hostname = relative.hostname || relative.host;
      result.port = relative.port;
      // to support http.request
      if (result.pathname || result.search) {
        var p = result.pathname || '';
        var s = result.search || '';
        result.path = p + s;
      }
      result.slashes = result.slashes || relative.slashes;
      result.href = result.format();
      return result;
    }

    var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
        isRelAbs = (
            relative.host ||
            relative.pathname && relative.pathname.charAt(0) === '/'
        ),
        mustEndAbs = (isRelAbs || isSourceAbs ||
                      (result.host && relative.pathname)),
        removeAllDots = mustEndAbs,
        srcPath = result.pathname && result.pathname.split('/') || [],
        relPath = relative.pathname && relative.pathname.split('/') || [],
        psychotic = result.protocol && !slashedProtocol[result.protocol];

    // if the url is a non-slashed url, then relative
    // links like ../.. should be able
    // to crawl up to the hostname, as well.  This is strange.
    // result.protocol has already been set by now.
    // Later on, put the first path part into the host field.
    if (psychotic) {
      result.hostname = '';
      result.port = null;
      if (result.host) {
        if (srcPath[0] === '') { srcPath[0] = result.host; }
        else { srcPath.unshift(result.host); }
      }
      result.host = '';
      if (relative.protocol) {
        relative.hostname = null;
        relative.port = null;
        if (relative.host) {
          if (relPath[0] === '') { relPath[0] = relative.host; }
          else { relPath.unshift(relative.host); }
        }
        relative.host = null;
      }
      mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
    }

    if (isRelAbs) {
      // it's absolute.
      result.host = (relative.host || relative.host === '') ?
                    relative.host : result.host;
      result.hostname = (relative.hostname || relative.hostname === '') ?
                        relative.hostname : result.hostname;
      result.search = relative.search;
      result.query = relative.query;
      srcPath = relPath;
      // fall through to the dot-handling below.
    } else if (relPath.length) {
      // it's relative
      // throw away the existing file, and take the new path instead.
      if (!srcPath) { srcPath = []; }
      srcPath.pop();
      srcPath = srcPath.concat(relPath);
      result.search = relative.search;
      result.query = relative.query;
    } else if (!util.isNullOrUndefined(relative.search)) {
      // just pull out the search.
      // like href='?foo'.
      // Put this after the other two cases because it simplifies the booleans
      if (psychotic) {
        result.hostname = result.host = srcPath.shift();
        //occationaly the auth can get stuck only in host
        //this especially happens in cases like
        //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
        var authInHost = result.host && result.host.indexOf('@') > 0 ?
                         result.host.split('@') : false;
        if (authInHost) {
          result.auth = authInHost.shift();
          result.host = result.hostname = authInHost.shift();
        }
      }
      result.search = relative.search;
      result.query = relative.query;
      //to support http.request
      if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
        result.path = (result.pathname ? result.pathname : '') +
                      (result.search ? result.search : '');
      }
      result.href = result.format();
      return result;
    }

    if (!srcPath.length) {
      // no path at all.  easy.
      // we've already handled the other stuff above.
      result.pathname = null;
      //to support http.request
      if (result.search) {
        result.path = '/' + result.search;
      } else {
        result.path = null;
      }
      result.href = result.format();
      return result;
    }

    // if a url ENDs in . or .., then it must get a trailing slash.
    // however, if it ends in anything else non-slashy,
    // then it must NOT get a trailing slash.
    var last = srcPath.slice(-1)[0];
    var hasTrailingSlash = (
        (result.host || relative.host || srcPath.length > 1) &&
        (last === '.' || last === '..') || last === '');

    // strip single dots, resolve double dots to parent dir
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = srcPath.length; i >= 0; i--) {
      last = srcPath[i];
      if (last === '.') {
        srcPath.splice(i, 1);
      } else if (last === '..') {
        srcPath.splice(i, 1);
        up++;
      } else if (up) {
        srcPath.splice(i, 1);
        up--;
      }
    }

    // if the path is allowed to go above the root, restore leading ..s
    if (!mustEndAbs && !removeAllDots) {
      for (; up--; up) {
        srcPath.unshift('..');
      }
    }

    if (mustEndAbs && srcPath[0] !== '' &&
        (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
      srcPath.unshift('');
    }

    if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
      srcPath.push('');
    }

    var isAbsolute = srcPath[0] === '' ||
        (srcPath[0] && srcPath[0].charAt(0) === '/');

    // put the host back
    if (psychotic) {
      result.hostname = result.host = isAbsolute ? '' :
                                      srcPath.length ? srcPath.shift() : '';
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }

    mustEndAbs = mustEndAbs || (result.host && srcPath.length);

    if (mustEndAbs && !isAbsolute) {
      srcPath.unshift('');
    }

    if (!srcPath.length) {
      result.pathname = null;
      result.path = null;
    } else {
      result.pathname = srcPath.join('/');
    }

    //to support request.http
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.auth = relative.auth || result.auth;
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  };

  Url.prototype.parseHost = function() {
    var host = this.host;
    var port = portPattern.exec(host);
    if (port) {
      port = port[0];
      if (port !== ':') {
        this.port = port.substr(1);
      }
      host = host.substr(0, host.length - port.length);
    }
    if (host) { this.hostname = host; }
  };

  var url = {
  	parse: parse,
  	resolve: resolve,
  	resolveObject: resolveObject,
  	format: format$1,
  	Url: Url_1
  };

  function getPropertyReference(propertyName) {
      for (var i = 0; i < v8.layout.length; i++) {
          for (var key in v8[v8.layout[i]]) {
              if (key === propertyName) {
                  return v8[v8.layout[i]][key];
              }
          }
      }
      for (var i$1 = 0; i$1 < v8.paint.length; i$1++) {
          for (var key$1 in v8[v8.paint[i$1]]) {
              if (key$1 === propertyName) {
                  return v8[v8.paint[i$1]][key$1];
              }
          }
      }
      return null;
  }
  function eachSource(style, callback) {
      for (var k in style.sources) {
          callback(style.sources[k]);
      }
  }
  function eachLayer(style, callback) {
      for (var i = 0, list = style.layers; i < list.length; i += 1) {
          var layer$$1 = list[i];
          callback(layer$$1);
      }
  }
  function eachProperty(style, options, callback) {
      function inner(layer$$1, propertyType) {
          var properties = layer$$1[propertyType];
          if (!properties) {
              return;
          }
          Object.keys(properties).forEach(function (key) {
              callback({
                  path: [
                      layer$$1.id,
                      propertyType,
                      key
                  ],
                  key: key,
                  value: properties[key],
                  reference: getPropertyReference(key),
                  set: function set(x) {
                      properties[key] = x;
                  }
              });
          });
      }
      eachLayer(style, function (layer$$1) {
          if (options.paint) {
              inner(layer$$1, 'paint');
          }
          if (options.layout) {
              inner(layer$$1, 'layout');
          }
      });
  }

  function eachLayout(layer, callback) {
      for (var k in layer) {
          if (k.indexOf('layout') === 0) {
              callback(layer[k], k);
          }
      }
  }
  function eachPaint(layer, callback) {
      for (var k in layer) {
          if (k.indexOf('paint') === 0) {
              callback(layer[k], k);
          }
      }
  }
  function resolveConstant(style, value) {
      if (typeof value === 'string' && value[0] === '@') {
          return resolveConstant(style, style.constants[value]);
      } else {
          return value;
      }
  }
  function isFunction(value) {
      return Array.isArray(value.stops);
  }
  function renameProperty(obj, from, to) {
      obj[to] = obj[from];
      delete obj[from];
  }
  function migrateToV8 (style) {
      style.version = 8;
      eachSource(style, function (source) {
          if (source.type === 'video' && source.url !== undefined) {
              renameProperty(source, 'url', 'urls');
          }
          if (source.type === 'video') {
              source.coordinates.forEach(function (coord) {
                  return coord.reverse();
              });
          }
      });
      eachLayer(style, function (layer) {
          eachLayout(layer, function (layout) {
              if (layout['symbol-min-distance'] !== undefined) {
                  renameProperty(layout, 'symbol-min-distance', 'symbol-spacing');
              }
          });
          eachPaint(layer, function (paint) {
              if (paint['background-image'] !== undefined) {
                  renameProperty(paint, 'background-image', 'background-pattern');
              }
              if (paint['line-image'] !== undefined) {
                  renameProperty(paint, 'line-image', 'line-pattern');
              }
              if (paint['fill-image'] !== undefined) {
                  renameProperty(paint, 'fill-image', 'fill-pattern');
              }
          });
      });
      eachProperty(style, {
          paint: true,
          layout: true
      }, function (property) {
          var value = resolveConstant(style, property.value);
          if (isFunction(value)) {
              value.stops.forEach(function (stop) {
                  stop[1] = resolveConstant(style, stop[1]);
              });
          }
          property.set(value);
      });
      delete style.constants;
      eachLayer(style, function (layer) {
          eachLayout(layer, function (layout) {
              delete layout['text-max-size'];
              delete layout['icon-max-size'];
          });
          eachPaint(layer, function (paint) {
              if (paint['text-size']) {
                  if (!layer.layout) {
                      layer.layout = {};
                  }
                  layer.layout['text-size'] = paint['text-size'];
                  delete paint['text-size'];
              }
              if (paint['icon-size']) {
                  if (!layer.layout) {
                      layer.layout = {};
                  }
                  layer.layout['icon-size'] = paint['icon-size'];
                  delete paint['icon-size'];
              }
          });
      });
      function migrateFontstackURL(input) {
          var inputParsed = url.parse(input);
          var inputPathnameParts = inputParsed.pathname.split('/');
          if (inputParsed.protocol !== 'mapbox:') {
              return input;
          } else if (inputParsed.hostname === 'fontstack') {
              return 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf';
          } else if (inputParsed.hostname === 'fonts') {
              return 'mapbox://fonts/' + inputPathnameParts[2] + '/{fontstack}/{range}.pbf';
          }
      }
      if (style.glyphs) {
          style.glyphs = migrateFontstackURL(style.glyphs);
      }
      function migrateFontStack(font) {
          function splitAndTrim(string) {
              return string.split(',').map(function (s) {
                  return s.trim();
              });
          }
          if (Array.isArray(font)) {
              return font;
          } else if (typeof font === 'string') {
              return splitAndTrim(font);
          } else if (typeof font === 'object') {
              font.stops.forEach(function (stop) {
                  stop[1] = splitAndTrim(stop[1]);
              });
              return font;
          } else {
              throw new Error('unexpected font value');
          }
      }
      eachLayer(style, function (layer) {
          eachLayout(layer, function (layout) {
              if (layout['text-font']) {
                  layout['text-font'] = migrateFontStack(layout['text-font']);
              }
          });
      });
      var firstSymbolLayer = 0;
      for (var i = style.layers.length - 1; i >= 0; i--) {
          var layer = style.layers[i];
          if (layer.type !== 'symbol') {
              firstSymbolLayer = i + 1;
              break;
          }
      }
      var symbolLayers = style.layers.splice(firstSymbolLayer);
      symbolLayers.reverse();
      style.layers = style.layers.concat(symbolLayers);
      return style;
  }

  function extend (output) {
      var arguments$1 = arguments;

      var inputs = [], len = arguments.length - 1;
      while (len-- > 0)
          { inputs[len] = arguments$1[len + 1]; }
      for (var i = 0, list = inputs; i < list.length; i += 1) {
          var input = list[i];
          for (var k in input) {
              output[k] = input[k];
          }
      }
      return output;
  }

  var ParsingError = function (Error) {
      function ParsingError(key, message) {
          Error.call(this, message);
          this.message = message;
          this.key = key;
      }
      if (Error)
          { ParsingError.__proto__ = Error; }
      ParsingError.prototype = Object.create(Error && Error.prototype);
      ParsingError.prototype.constructor = ParsingError;
      return ParsingError;
  }(Error);

  var Scope = function Scope(parent, bindings) {
      if (bindings === void 0)
          { bindings = []; }
      this.parent = parent;
      this.bindings = {};
      for (var i = 0, list = bindings; i < list.length; i += 1) {
          var ref = list[i];
          var name = ref[0];
          var expression = ref[1];
          this.bindings[name] = expression;
      }
  };
  Scope.prototype.concat = function concat(bindings) {
      return new Scope(this, bindings);
  };
  Scope.prototype.get = function get(name) {
      if (this.bindings[name]) {
          return this.bindings[name];
      }
      if (this.parent) {
          return this.parent.get(name);
      }
      throw new Error(name + ' not found in scope.');
  };
  Scope.prototype.has = function has(name) {
      if (this.bindings[name]) {
          return true;
      }
      return this.parent ? this.parent.has(name) : false;
  };

  var NullType = { kind: 'null' };
  var NumberType = { kind: 'number' };
  var StringType = { kind: 'string' };
  var BooleanType = { kind: 'boolean' };
  var ColorType = { kind: 'color' };
  var ObjectType = { kind: 'object' };
  var ValueType = { kind: 'value' };
  var ErrorType = { kind: 'error' };
  var CollatorType = { kind: 'collator' };
  var FormattedType = { kind: 'formatted' };
  function array(itemType, N) {
      return {
          kind: 'array',
          itemType: itemType,
          N: N
      };
  }
  function toString(type) {
      if (type.kind === 'array') {
          var itemType = toString(type.itemType);
          return typeof type.N === 'number' ? 'array<' + itemType + ', ' + type.N + '>' : type.itemType.kind === 'value' ? 'array' : 'array<' + itemType + '>';
      } else {
          return type.kind;
      }
  }
  var valueMemberTypes = [
      NullType,
      NumberType,
      StringType,
      BooleanType,
      ColorType,
      FormattedType,
      ObjectType,
      array(ValueType)
  ];
  function checkSubtype(expected, t) {
      if (t.kind === 'error') {
          return null;
      } else if (expected.kind === 'array') {
          if (t.kind === 'array' && (t.N === 0 && t.itemType.kind === 'value' || !checkSubtype(expected.itemType, t.itemType)) && (typeof expected.N !== 'number' || expected.N === t.N)) {
              return null;
          }
      } else if (expected.kind === t.kind) {
          return null;
      } else if (expected.kind === 'value') {
          for (var i = 0, list = valueMemberTypes; i < list.length; i += 1) {
              var memberType = list[i];
              if (!checkSubtype(memberType, t)) {
                  return null;
              }
          }
      }
      return 'Expected ' + toString(expected) + ' but found ' + toString(t) + ' instead.';
  }

  var csscolorparser = createCommonjsModule(function (module, exports) {
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
    "transparent": [0,0,0,0], "aliceblue": [240,248,255,1],
    "antiquewhite": [250,235,215,1], "aqua": [0,255,255,1],
    "aquamarine": [127,255,212,1], "azure": [240,255,255,1],
    "beige": [245,245,220,1], "bisque": [255,228,196,1],
    "black": [0,0,0,1], "blanchedalmond": [255,235,205,1],
    "blue": [0,0,255,1], "blueviolet": [138,43,226,1],
    "brown": [165,42,42,1], "burlywood": [222,184,135,1],
    "cadetblue": [95,158,160,1], "chartreuse": [127,255,0,1],
    "chocolate": [210,105,30,1], "coral": [255,127,80,1],
    "cornflowerblue": [100,149,237,1], "cornsilk": [255,248,220,1],
    "crimson": [220,20,60,1], "cyan": [0,255,255,1],
    "darkblue": [0,0,139,1], "darkcyan": [0,139,139,1],
    "darkgoldenrod": [184,134,11,1], "darkgray": [169,169,169,1],
    "darkgreen": [0,100,0,1], "darkgrey": [169,169,169,1],
    "darkkhaki": [189,183,107,1], "darkmagenta": [139,0,139,1],
    "darkolivegreen": [85,107,47,1], "darkorange": [255,140,0,1],
    "darkorchid": [153,50,204,1], "darkred": [139,0,0,1],
    "darksalmon": [233,150,122,1], "darkseagreen": [143,188,143,1],
    "darkslateblue": [72,61,139,1], "darkslategray": [47,79,79,1],
    "darkslategrey": [47,79,79,1], "darkturquoise": [0,206,209,1],
    "darkviolet": [148,0,211,1], "deeppink": [255,20,147,1],
    "deepskyblue": [0,191,255,1], "dimgray": [105,105,105,1],
    "dimgrey": [105,105,105,1], "dodgerblue": [30,144,255,1],
    "firebrick": [178,34,34,1], "floralwhite": [255,250,240,1],
    "forestgreen": [34,139,34,1], "fuchsia": [255,0,255,1],
    "gainsboro": [220,220,220,1], "ghostwhite": [248,248,255,1],
    "gold": [255,215,0,1], "goldenrod": [218,165,32,1],
    "gray": [128,128,128,1], "green": [0,128,0,1],
    "greenyellow": [173,255,47,1], "grey": [128,128,128,1],
    "honeydew": [240,255,240,1], "hotpink": [255,105,180,1],
    "indianred": [205,92,92,1], "indigo": [75,0,130,1],
    "ivory": [255,255,240,1], "khaki": [240,230,140,1],
    "lavender": [230,230,250,1], "lavenderblush": [255,240,245,1],
    "lawngreen": [124,252,0,1], "lemonchiffon": [255,250,205,1],
    "lightblue": [173,216,230,1], "lightcoral": [240,128,128,1],
    "lightcyan": [224,255,255,1], "lightgoldenrodyellow": [250,250,210,1],
    "lightgray": [211,211,211,1], "lightgreen": [144,238,144,1],
    "lightgrey": [211,211,211,1], "lightpink": [255,182,193,1],
    "lightsalmon": [255,160,122,1], "lightseagreen": [32,178,170,1],
    "lightskyblue": [135,206,250,1], "lightslategray": [119,136,153,1],
    "lightslategrey": [119,136,153,1], "lightsteelblue": [176,196,222,1],
    "lightyellow": [255,255,224,1], "lime": [0,255,0,1],
    "limegreen": [50,205,50,1], "linen": [250,240,230,1],
    "magenta": [255,0,255,1], "maroon": [128,0,0,1],
    "mediumaquamarine": [102,205,170,1], "mediumblue": [0,0,205,1],
    "mediumorchid": [186,85,211,1], "mediumpurple": [147,112,219,1],
    "mediumseagreen": [60,179,113,1], "mediumslateblue": [123,104,238,1],
    "mediumspringgreen": [0,250,154,1], "mediumturquoise": [72,209,204,1],
    "mediumvioletred": [199,21,133,1], "midnightblue": [25,25,112,1],
    "mintcream": [245,255,250,1], "mistyrose": [255,228,225,1],
    "moccasin": [255,228,181,1], "navajowhite": [255,222,173,1],
    "navy": [0,0,128,1], "oldlace": [253,245,230,1],
    "olive": [128,128,0,1], "olivedrab": [107,142,35,1],
    "orange": [255,165,0,1], "orangered": [255,69,0,1],
    "orchid": [218,112,214,1], "palegoldenrod": [238,232,170,1],
    "palegreen": [152,251,152,1], "paleturquoise": [175,238,238,1],
    "palevioletred": [219,112,147,1], "papayawhip": [255,239,213,1],
    "peachpuff": [255,218,185,1], "peru": [205,133,63,1],
    "pink": [255,192,203,1], "plum": [221,160,221,1],
    "powderblue": [176,224,230,1], "purple": [128,0,128,1],
    "rebeccapurple": [102,51,153,1],
    "red": [255,0,0,1], "rosybrown": [188,143,143,1],
    "royalblue": [65,105,225,1], "saddlebrown": [139,69,19,1],
    "salmon": [250,128,114,1], "sandybrown": [244,164,96,1],
    "seagreen": [46,139,87,1], "seashell": [255,245,238,1],
    "sienna": [160,82,45,1], "silver": [192,192,192,1],
    "skyblue": [135,206,235,1], "slateblue": [106,90,205,1],
    "slategray": [112,128,144,1], "slategrey": [112,128,144,1],
    "snow": [255,250,250,1], "springgreen": [0,255,127,1],
    "steelblue": [70,130,180,1], "tan": [210,180,140,1],
    "teal": [0,128,128,1], "thistle": [216,191,216,1],
    "tomato": [255,99,71,1], "turquoise": [64,224,208,1],
    "violet": [238,130,238,1], "wheat": [245,222,179,1],
    "white": [255,255,255,1], "whitesmoke": [245,245,245,1],
    "yellow": [255,255,0,1], "yellowgreen": [154,205,50,1]};

  function clamp_css_byte(i) {  // Clamp to integer 0 .. 255.
    i = Math.round(i);  // Seems to be what Chrome does (vs truncation).
    return i < 0 ? 0 : i > 255 ? 255 : i;
  }

  function clamp_css_float(f) {  // Clamp to float 0.0 .. 1.0.
    return f < 0 ? 0 : f > 1 ? 1 : f;
  }

  function parse_css_int(str) {  // int or percentage.
    if (str[str.length - 1] === '%')
      { return clamp_css_byte(parseFloat(str) / 100 * 255); }
    return clamp_css_byte(parseInt(str));
  }

  function parse_css_float(str) {  // float or percentage.
    if (str[str.length - 1] === '%')
      { return clamp_css_float(parseFloat(str) / 100); }
    return clamp_css_float(parseFloat(str));
  }

  function css_hue_to_rgb(m1, m2, h) {
    if (h < 0) { h += 1; }
    else if (h > 1) { h -= 1; }

    if (h * 6 < 1) { return m1 + (m2 - m1) * h * 6; }
    if (h * 2 < 1) { return m2; }
    if (h * 3 < 2) { return m1 + (m2 - m1) * (2/3 - h) * 6; }
    return m1;
  }

  function parseCSSColor(css_str) {
    // Remove all whitespace, not compliant, but should just be more accepting.
    var str = css_str.replace(/ /g, '').toLowerCase();

    // Color keywords (and transparent) lookup.
    if (str in kCSSColorTable) { return kCSSColorTable[str].slice(); }  // dup.

    // #abc and #abc123 syntax.
    if (str[0] === '#') {
      if (str.length === 4) {
        var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
        if (!(iv >= 0 && iv <= 0xfff)) { return null; }  // Covers NaN.
        return [((iv & 0xf00) >> 4) | ((iv & 0xf00) >> 8),
                (iv & 0xf0) | ((iv & 0xf0) >> 4),
                (iv & 0xf) | ((iv & 0xf) << 4),
                1];
      } else if (str.length === 7) {
        var iv = parseInt(str.substr(1), 16);  // TODO(deanm): Stricter parsing.
        if (!(iv >= 0 && iv <= 0xffffff)) { return null; }  // Covers NaN.
        return [(iv & 0xff0000) >> 16,
                (iv & 0xff00) >> 8,
                iv & 0xff,
                1];
      }

      return null;
    }

    var op = str.indexOf('('), ep = str.indexOf(')');
    if (op !== -1 && ep + 1 === str.length) {
      var fname = str.substr(0, op);
      var params = str.substr(op+1, ep-(op+1)).split(',');
      var alpha = 1;  // To allow case fallthrough.
      switch (fname) {
        case 'rgba':
          if (params.length !== 4) { return null; }
          alpha = parse_css_float(params.pop());
          // Fall through.
        case 'rgb':
          if (params.length !== 3) { return null; }
          return [parse_css_int(params[0]),
                  parse_css_int(params[1]),
                  parse_css_int(params[2]),
                  alpha];
        case 'hsla':
          if (params.length !== 4) { return null; }
          alpha = parse_css_float(params.pop());
          // Fall through.
        case 'hsl':
          if (params.length !== 3) { return null; }
          var h = (((parseFloat(params[0]) % 360) + 360) % 360) / 360;  // 0 .. 1
          // NOTE(deanm): According to the CSS spec s/l should only be
          // percentages, but we don't bother and let float or percentage.
          var s = parse_css_float(params[1]);
          var l = parse_css_float(params[2]);
          var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
          var m1 = l * 2 - m2;
          return [clamp_css_byte(css_hue_to_rgb(m1, m2, h+1/3) * 255),
                  clamp_css_byte(css_hue_to_rgb(m1, m2, h) * 255),
                  clamp_css_byte(css_hue_to_rgb(m1, m2, h-1/3) * 255),
                  alpha];
        default:
          return null;
      }
    }

    return null;
  }

  try { exports.parseCSSColor = parseCSSColor; } catch(e) { }
  });
  var csscolorparser_1 = csscolorparser.parseCSSColor;

  var Color = function Color(r, g, b, a) {
      if (a === void 0)
          { a = 1; }
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
  };
  Color.parse = function parse(input) {
      if (!input) {
          return undefined;
      }
      if (input instanceof Color) {
          return input;
      }
      if (typeof input !== 'string') {
          return undefined;
      }
      var rgba = csscolorparser_1(input);
      if (!rgba) {
          return undefined;
      }
      return new Color(rgba[0] / 255 * rgba[3], rgba[1] / 255 * rgba[3], rgba[2] / 255 * rgba[3], rgba[3]);
  };
  Color.prototype.toString = function toString() {
      var ref = this.toArray();
      var r = ref[0];
      var g = ref[1];
      var b = ref[2];
      var a = ref[3];
      return 'rgba(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ',' + a + ')';
  };
  Color.prototype.toArray = function toArray() {
      var ref = this;
      var r = ref.r;
      var g = ref.g;
      var b = ref.b;
      var a = ref.a;
      return a === 0 ? [
          0,
          0,
          0,
          0
      ] : [
          r * 255 / a,
          g * 255 / a,
          b * 255 / a,
          a
      ];
  };
  Color.black = new Color(0, 0, 0, 1);
  Color.white = new Color(1, 1, 1, 1);
  Color.transparent = new Color(0, 0, 0, 0);
  Color.red = new Color(1, 0, 0, 1);

  var Collator = function Collator(caseSensitive, diacriticSensitive, locale) {
      if (caseSensitive) {
          this.sensitivity = diacriticSensitive ? 'variant' : 'case';
      } else {
          this.sensitivity = diacriticSensitive ? 'accent' : 'base';
      }
      this.locale = locale;
      this.collator = new Intl.Collator(this.locale ? this.locale : [], {
          sensitivity: this.sensitivity,
          usage: 'search'
      });
  };
  Collator.prototype.compare = function compare(lhs, rhs) {
      return this.collator.compare(lhs, rhs);
  };
  Collator.prototype.resolvedLocale = function resolvedLocale() {
      return new Intl.Collator(this.locale ? this.locale : []).resolvedOptions().locale;
  };

  var FormattedSection = function FormattedSection(text, scale, fontStack) {
      this.text = text;
      this.scale = scale;
      this.fontStack = fontStack;
  };
  var Formatted = function Formatted(sections) {
      this.sections = sections;
  };
  Formatted.fromString = function fromString(unformatted) {
      return new Formatted([new FormattedSection(unformatted, null, null)]);
  };
  Formatted.prototype.toString = function toString() {
      return this.sections.map(function (section) {
          return section.text;
      }).join('');
  };
  Formatted.prototype.serialize = function serialize() {
      var serialized = ['format'];
      for (var i = 0, list = this.sections; i < list.length; i += 1) {
          var section = list[i];
          serialized.push(section.text);
          var options = {};
          if (section.fontStack) {
              options['text-font'] = [
                  'literal',
                  section.fontStack.split(',')
              ];
          }
          if (section.scale) {
              options['font-scale'] = section.scale;
          }
          serialized.push(options);
      }
      return serialized;
  };

  function validateRGBA(r, g, b, a) {
      if (!(typeof r === 'number' && r >= 0 && r <= 255 && typeof g === 'number' && g >= 0 && g <= 255 && typeof b === 'number' && b >= 0 && b <= 255)) {
          var value = typeof a === 'number' ? [
              r,
              g,
              b,
              a
          ] : [
              r,
              g,
              b
          ];
          return 'Invalid rgba value [' + value.join(', ') + ']: \'r\', \'g\', and \'b\' must be between 0 and 255.';
      }
      if (!(typeof a === 'undefined' || typeof a === 'number' && a >= 0 && a <= 1)) {
          return 'Invalid rgba value [' + [
              r,
              g,
              b,
              a
          ].join(', ') + ']: \'a\' must be between 0 and 1.';
      }
      return null;
  }
  function isValue(mixed) {
      if (mixed === null) {
          return true;
      } else if (typeof mixed === 'string') {
          return true;
      } else if (typeof mixed === 'boolean') {
          return true;
      } else if (typeof mixed === 'number') {
          return true;
      } else if (mixed instanceof Color) {
          return true;
      } else if (mixed instanceof Collator) {
          return true;
      } else if (mixed instanceof Formatted) {
          return true;
      } else if (Array.isArray(mixed)) {
          for (var i = 0, list = mixed; i < list.length; i += 1) {
              var item = list[i];
              if (!isValue(item)) {
                  return false;
              }
          }
          return true;
      } else if (typeof mixed === 'object') {
          for (var key in mixed) {
              if (!isValue(mixed[key])) {
                  return false;
              }
          }
          return true;
      } else {
          return false;
      }
  }
  function typeOf(value) {
      if (value === null) {
          return NullType;
      } else if (typeof value === 'string') {
          return StringType;
      } else if (typeof value === 'boolean') {
          return BooleanType;
      } else if (typeof value === 'number') {
          return NumberType;
      } else if (value instanceof Color) {
          return ColorType;
      } else if (value instanceof Collator) {
          return CollatorType;
      } else if (value instanceof Formatted) {
          return FormattedType;
      } else if (Array.isArray(value)) {
          var length = value.length;
          var itemType;
          for (var i = 0, list = value; i < list.length; i += 1) {
              var item = list[i];
              var t = typeOf(item);
              if (!itemType) {
                  itemType = t;
              } else if (itemType === t) {
                  continue;
              } else {
                  itemType = ValueType;
                  break;
              }
          }
          return array(itemType || ValueType, length);
      } else {
          return ObjectType;
      }
  }
  function toString$1(value) {
      var type = typeof value;
      if (value === null) {
          return '';
      } else if (type === 'string' || type === 'number' || type === 'boolean') {
          return String(value);
      } else if (value instanceof Color || value instanceof Formatted) {
          return value.toString();
      } else {
          return JSON.stringify(value);
      }
  }

  var Literal = function Literal(type, value) {
      this.type = type;
      this.value = value;
  };
  Literal.parse = function parse(args, context) {
      if (args.length !== 2) {
          return context.error('\'literal\' expression requires exactly one argument, but found ' + (args.length - 1) + ' instead.');
      }
      if (!isValue(args[1])) {
          return context.error('invalid value');
      }
      var value = args[1];
      var type = typeOf(value);
      var expected = context.expectedType;
      if (type.kind === 'array' && type.N === 0 && expected && expected.kind === 'array' && (typeof expected.N !== 'number' || expected.N === 0)) {
          type = expected;
      }
      return new Literal(type, value);
  };
  Literal.prototype.evaluate = function evaluate() {
      return this.value;
  };
  Literal.prototype.eachChild = function eachChild() {
  };
  Literal.prototype.possibleOutputs = function possibleOutputs() {
      return [this.value];
  };
  Literal.prototype.serialize = function serialize() {
      if (this.type.kind === 'array' || this.type.kind === 'object') {
          return [
              'literal',
              this.value
          ];
      } else if (this.value instanceof Color) {
          return ['rgba'].concat(this.value.toArray());
      } else if (this.value instanceof Formatted) {
          return this.value.serialize();
      } else {
          return this.value;
      }
  };

  var RuntimeError = function RuntimeError(message) {
      this.name = 'ExpressionEvaluationError';
      this.message = message;
  };
  RuntimeError.prototype.toJSON = function toJSON() {
      return this.message;
  };

  var types = {
      string: StringType,
      number: NumberType,
      boolean: BooleanType,
      object: ObjectType
  };
  var Assertion = function Assertion(type, args) {
      this.type = type;
      this.args = args;
  };
  Assertion.parse = function parse(args, context) {
      if (args.length < 2) {
          return context.error('Expected at least one argument.');
      }
      var i = 1;
      var type;
      var name = args[0];
      if (name === 'array') {
          var itemType;
          if (args.length > 2) {
              var type$1 = args[1];
              if (typeof type$1 !== 'string' || !(type$1 in types) || type$1 === 'object') {
                  return context.error('The item type argument of "array" must be one of string, number, boolean', 1);
              }
              itemType = types[type$1];
              i++;
          } else {
              itemType = ValueType;
          }
          var N;
          if (args.length > 3) {
              if (args[2] !== null && (typeof args[2] !== 'number' || args[2] < 0 || args[2] !== Math.floor(args[2]))) {
                  return context.error('The length argument to "array" must be a positive integer literal', 2);
              }
              N = args[2];
              i++;
          }
          type = array(itemType, N);
      } else {
          type = types[name];
      }
      var parsed = [];
      for (; i < args.length; i++) {
          var input = context.parse(args[i], i, ValueType);
          if (!input) {
              return null;
          }
          parsed.push(input);
      }
      return new Assertion(type, parsed);
  };
  Assertion.prototype.evaluate = function evaluate(ctx) {
      for (var i = 0; i < this.args.length; i++) {
          var value = this.args[i].evaluate(ctx);
          var error = checkSubtype(this.type, typeOf(value));
          if (!error) {
              return value;
          } else if (i === this.args.length - 1) {
              throw new RuntimeError('Expected value to be of type ' + toString(this.type) + ', but found ' + toString(typeOf(value)) + ' instead.');
          }
      }
      return null;
  };
  Assertion.prototype.eachChild = function eachChild(fn) {
      this.args.forEach(fn);
  };
  Assertion.prototype.possibleOutputs = function possibleOutputs() {
      var ref;
      return (ref = []).concat.apply(ref, this.args.map(function (arg) {
          return arg.possibleOutputs();
      }));
  };
  Assertion.prototype.serialize = function serialize() {
      var type = this.type;
      var serialized = [type.kind];
      if (type.kind === 'array') {
          var itemType = type.itemType;
          if (itemType.kind === 'string' || itemType.kind === 'number' || itemType.kind === 'boolean') {
              serialized.push(itemType.kind);
              var N = type.N;
              if (typeof N === 'number' || this.args.length > 1) {
                  serialized.push(N);
              }
          }
      }
      return serialized.concat(this.args.map(function (arg) {
          return arg.serialize();
      }));
  };

  var FormatExpression = function FormatExpression(sections) {
      this.type = FormattedType;
      this.sections = sections;
  };
  FormatExpression.parse = function parse(args, context) {
      if (args.length < 3) {
          return context.error('Expected at least two arguments.');
      }
      if ((args.length - 1) % 2 !== 0) {
          return context.error('Expected an even number of arguments.');
      }
      var sections = [];
      for (var i = 1; i < args.length - 1; i += 2) {
          var text = context.parse(args[i], 1, ValueType);
          if (!text) {
              return null;
          }
          var kind = text.type.kind;
          if (kind !== 'string' && kind !== 'value' && kind !== 'null') {
              return context.error('Formatted text type must be \'string\', \'value\', or \'null\'.');
          }
          var options = args[i + 1];
          if (typeof options !== 'object' || Array.isArray(options)) {
              return context.error('Format options argument must be an object.');
          }
          var scale = null;
          if (options['font-scale']) {
              scale = context.parse(options['font-scale'], 1, NumberType);
              if (!scale) {
                  return null;
              }
          }
          var font = null;
          if (options['text-font']) {
              font = context.parse(options['text-font'], 1, array(StringType));
              if (!font) {
                  return null;
              }
          }
          sections.push({
              text: text,
              scale: scale,
              font: font
          });
      }
      return new FormatExpression(sections);
  };
  FormatExpression.prototype.evaluate = function evaluate(ctx) {
      return new Formatted(this.sections.map(function (section) {
          return new FormattedSection(toString$1(section.text.evaluate(ctx)), section.scale ? section.scale.evaluate(ctx) : null, section.font ? section.font.evaluate(ctx).join(',') : null);
      }));
  };
  FormatExpression.prototype.eachChild = function eachChild(fn) {
      for (var i = 0, list = this.sections; i < list.length; i += 1) {
          var section = list[i];
          fn(section.text);
          if (section.scale) {
              fn(section.scale);
          }
          if (section.font) {
              fn(section.font);
          }
      }
  };
  FormatExpression.prototype.possibleOutputs = function possibleOutputs() {
      return [undefined];
  };
  FormatExpression.prototype.serialize = function serialize() {
      var serialized = ['format'];
      for (var i = 0, list = this.sections; i < list.length; i += 1) {
          var section = list[i];
          serialized.push(section.text.serialize());
          var options = {};
          if (section.scale) {
              options['font-scale'] = section.scale.serialize();
          }
          if (section.font) {
              options['text-font'] = section.font.serialize();
          }
          serialized.push(options);
      }
      return serialized;
  };

  var types$1 = {
      'to-boolean': BooleanType,
      'to-color': ColorType,
      'to-number': NumberType,
      'to-string': StringType
  };
  var Coercion = function Coercion(type, args) {
      this.type = type;
      this.args = args;
  };
  Coercion.parse = function parse(args, context) {
      if (args.length < 2) {
          return context.error('Expected at least one argument.');
      }
      var name = args[0];
      if ((name === 'to-boolean' || name === 'to-string') && args.length !== 2) {
          return context.error('Expected one argument.');
      }
      var type = types$1[name];
      var parsed = [];
      for (var i = 1; i < args.length; i++) {
          var input = context.parse(args[i], i, ValueType);
          if (!input) {
              return null;
          }
          parsed.push(input);
      }
      return new Coercion(type, parsed);
  };
  Coercion.prototype.evaluate = function evaluate(ctx) {
      if (this.type.kind === 'boolean') {
          return Boolean(this.args[0].evaluate(ctx));
      } else if (this.type.kind === 'color') {
          var input;
          var error;
          for (var i = 0, list = this.args; i < list.length; i += 1) {
              var arg = list[i];
              input = arg.evaluate(ctx);
              error = null;
              if (input instanceof Color) {
                  return input;
              } else if (typeof input === 'string') {
                  var c = ctx.parseColor(input);
                  if (c) {
                      return c;
                  }
              } else if (Array.isArray(input)) {
                  if (input.length < 3 || input.length > 4) {
                      error = 'Invalid rbga value ' + JSON.stringify(input) + ': expected an array containing either three or four numeric values.';
                  } else {
                      error = validateRGBA(input[0], input[1], input[2], input[3]);
                  }
                  if (!error) {
                      return new Color(input[0] / 255, input[1] / 255, input[2] / 255, input[3]);
                  }
              }
          }
          throw new RuntimeError(error || 'Could not parse color from value \'' + (typeof input === 'string' ? input : JSON.stringify(input)) + '\'');
      } else if (this.type.kind === 'number') {
          var value = null;
          for (var i$1 = 0, list$1 = this.args; i$1 < list$1.length; i$1 += 1) {
              var arg$1 = list$1[i$1];
              value = arg$1.evaluate(ctx);
              if (value === null) {
                  return 0;
              }
              var num = Number(value);
              if (isNaN(num)) {
                  continue;
              }
              return num;
          }
          throw new RuntimeError('Could not convert ' + JSON.stringify(value) + ' to number.');
      } else if (this.type.kind === 'formatted') {
          return Formatted.fromString(toString$1(this.args[0].evaluate(ctx)));
      } else {
          return toString$1(this.args[0].evaluate(ctx));
      }
  };
  Coercion.prototype.eachChild = function eachChild(fn) {
      this.args.forEach(fn);
  };
  Coercion.prototype.possibleOutputs = function possibleOutputs() {
      var ref;
      return (ref = []).concat.apply(ref, this.args.map(function (arg) {
          return arg.possibleOutputs();
      }));
  };
  Coercion.prototype.serialize = function serialize() {
      if (this.type.kind === 'formatted') {
          return new FormatExpression([{
                  text: this.args[0],
                  scale: null,
                  font: null
              }]).serialize();
      }
      var serialized = ['to-' + this.type.kind];
      this.eachChild(function (child) {
          serialized.push(child.serialize());
      });
      return serialized;
  };

  var geometryTypes = [
      'Unknown',
      'Point',
      'LineString',
      'Polygon'
  ];
  var EvaluationContext = function EvaluationContext() {
      this.globals = null;
      this.feature = null;
      this.featureState = null;
      this._parseColorCache = {};
  };
  EvaluationContext.prototype.id = function id() {
      return this.feature && 'id' in this.feature ? this.feature.id : null;
  };
  EvaluationContext.prototype.geometryType = function geometryType() {
      return this.feature ? typeof this.feature.type === 'number' ? geometryTypes[this.feature.type] : this.feature.type : null;
  };
  EvaluationContext.prototype.properties = function properties() {
      return this.feature && this.feature.properties || {};
  };
  EvaluationContext.prototype.parseColor = function parseColor(input) {
      var cached = this._parseColorCache[input];
      if (!cached) {
          cached = this._parseColorCache[input] = Color.parse(input);
      }
      return cached;
  };

  var CompoundExpression = function CompoundExpression(name, type, evaluate, args) {
      this.name = name;
      this.type = type;
      this._evaluate = evaluate;
      this.args = args;
  };
  CompoundExpression.prototype.evaluate = function evaluate(ctx) {
      return this._evaluate(ctx, this.args);
  };
  CompoundExpression.prototype.eachChild = function eachChild(fn) {
      this.args.forEach(fn);
  };
  CompoundExpression.prototype.possibleOutputs = function possibleOutputs() {
      return [undefined];
  };
  CompoundExpression.prototype.serialize = function serialize() {
      return [this.name].concat(this.args.map(function (arg) {
          return arg.serialize();
      }));
  };
  CompoundExpression.parse = function parse(args, context) {
      var ref$1;
      var op = args[0];
      var definition = CompoundExpression.definitions[op];
      if (!definition) {
          return context.error('Unknown expression "' + op + '". If you wanted a literal array, use ["literal", [...]].', 0);
      }
      var type = Array.isArray(definition) ? definition[0] : definition.type;
      var availableOverloads = Array.isArray(definition) ? [[
              definition[1],
              definition[2]
          ]] : definition.overloads;
      var overloads = availableOverloads.filter(function (ref) {
          var signature = ref[0];
          return !Array.isArray(signature) || signature.length === args.length - 1;
      });
      var signatureContext = null;
      for (var i$3 = 0, list = overloads; i$3 < list.length; i$3 += 1) {
          var ref = list[i$3];
          var params = ref[0];
          var evaluate = ref[1];
          signatureContext = new ParsingContext(context.registry, context.path, null, context.scope);
          var parsedArgs = [];
          var argParseFailed = false;
          for (var i = 1; i < args.length; i++) {
              var arg = args[i];
              var expectedType = Array.isArray(params) ? params[i - 1] : params.type;
              var parsed = signatureContext.parse(arg, 1 + parsedArgs.length, expectedType);
              if (!parsed) {
                  argParseFailed = true;
                  break;
              }
              parsedArgs.push(parsed);
          }
          if (argParseFailed) {
              continue;
          }
          if (Array.isArray(params)) {
              if (params.length !== parsedArgs.length) {
                  signatureContext.error('Expected ' + params.length + ' arguments, but found ' + parsedArgs.length + ' instead.');
                  continue;
              }
          }
          for (var i$1 = 0; i$1 < parsedArgs.length; i$1++) {
              var expected = Array.isArray(params) ? params[i$1] : params.type;
              var arg$1 = parsedArgs[i$1];
              signatureContext.concat(i$1 + 1).checkSubtype(expected, arg$1.type);
          }
          if (signatureContext.errors.length === 0) {
              return new CompoundExpression(op, type, evaluate, parsedArgs);
          }
      }
      if (overloads.length === 1) {
          (ref$1 = context.errors).push.apply(ref$1, signatureContext.errors);
      } else {
          var expected$1 = overloads.length ? overloads : availableOverloads;
          var signatures = expected$1.map(function (ref) {
              var params = ref[0];
              return stringifySignature(params);
          }).join(' | ');
          var actualTypes = [];
          for (var i$2 = 1; i$2 < args.length; i$2++) {
              var parsed$1 = context.parse(args[i$2], 1 + actualTypes.length);
              if (!parsed$1) {
                  return null;
              }
              actualTypes.push(toString(parsed$1.type));
          }
          context.error('Expected arguments of type ' + signatures + ', but found (' + actualTypes.join(', ') + ') instead.');
      }
      return null;
  };
  CompoundExpression.register = function register(registry, definitions) {
      CompoundExpression.definitions = definitions;
      for (var name in definitions) {
          registry[name] = CompoundExpression;
      }
  };
  function stringifySignature(signature) {
      if (Array.isArray(signature)) {
          return '(' + signature.map(toString).join(', ') + ')';
      } else {
          return '(' + toString(signature.type) + '...)';
      }
  }

  var CollatorExpression = function CollatorExpression(caseSensitive, diacriticSensitive, locale) {
      this.type = CollatorType;
      this.locale = locale;
      this.caseSensitive = caseSensitive;
      this.diacriticSensitive = diacriticSensitive;
  };
  CollatorExpression.parse = function parse(args, context) {
      if (args.length !== 2) {
          return context.error('Expected one argument.');
      }
      var options = args[1];
      if (typeof options !== 'object' || Array.isArray(options)) {
          return context.error('Collator options argument must be an object.');
      }
      var caseSensitive = context.parse(options['case-sensitive'] === undefined ? false : options['case-sensitive'], 1, BooleanType);
      if (!caseSensitive) {
          return null;
      }
      var diacriticSensitive = context.parse(options['diacritic-sensitive'] === undefined ? false : options['diacritic-sensitive'], 1, BooleanType);
      if (!diacriticSensitive) {
          return null;
      }
      var locale = null;
      if (options['locale']) {
          locale = context.parse(options['locale'], 1, StringType);
          if (!locale) {
              return null;
          }
      }
      return new CollatorExpression(caseSensitive, diacriticSensitive, locale);
  };
  CollatorExpression.prototype.evaluate = function evaluate(ctx) {
      return new Collator(this.caseSensitive.evaluate(ctx), this.diacriticSensitive.evaluate(ctx), this.locale ? this.locale.evaluate(ctx) : null);
  };
  CollatorExpression.prototype.eachChild = function eachChild(fn) {
      fn(this.caseSensitive);
      fn(this.diacriticSensitive);
      if (this.locale) {
          fn(this.locale);
      }
  };
  CollatorExpression.prototype.possibleOutputs = function possibleOutputs() {
      return [undefined];
  };
  CollatorExpression.prototype.serialize = function serialize() {
      var options = {};
      options['case-sensitive'] = this.caseSensitive.serialize();
      options['diacritic-sensitive'] = this.diacriticSensitive.serialize();
      if (this.locale) {
          options['locale'] = this.locale.serialize();
      }
      return [
          'collator',
          options
      ];
  };

  function isFeatureConstant(e) {
      if (e instanceof CompoundExpression) {
          if (e.name === 'get' && e.args.length === 1) {
              return false;
          } else if (e.name === 'feature-state') {
              return false;
          } else if (e.name === 'has' && e.args.length === 1) {
              return false;
          } else if (e.name === 'properties' || e.name === 'geometry-type' || e.name === 'id') {
              return false;
          } else if (/^filter-/.test(e.name)) {
              return false;
          }
      }
      var result = true;
      e.eachChild(function (arg) {
          if (result && !isFeatureConstant(arg)) {
              result = false;
          }
      });
      return result;
  }
  function isStateConstant(e) {
      if (e instanceof CompoundExpression) {
          if (e.name === 'feature-state') {
              return false;
          }
      }
      var result = true;
      e.eachChild(function (arg) {
          if (result && !isStateConstant(arg)) {
              result = false;
          }
      });
      return result;
  }
  function isGlobalPropertyConstant(e, properties) {
      if (e instanceof CompoundExpression && properties.indexOf(e.name) >= 0) {
          return false;
      }
      var result = true;
      e.eachChild(function (arg) {
          if (result && !isGlobalPropertyConstant(arg, properties)) {
              result = false;
          }
      });
      return result;
  }

  var Var = function Var(name, boundExpression) {
      this.type = boundExpression.type;
      this.name = name;
      this.boundExpression = boundExpression;
  };
  Var.parse = function parse(args, context) {
      if (args.length !== 2 || typeof args[1] !== 'string') {
          return context.error('\'var\' expression requires exactly one string literal argument.');
      }
      var name = args[1];
      if (!context.scope.has(name)) {
          return context.error('Unknown variable "' + name + '". Make sure "' + name + '" has been bound in an enclosing "let" expression before using it.', 1);
      }
      return new Var(name, context.scope.get(name));
  };
  Var.prototype.evaluate = function evaluate(ctx) {
      return this.boundExpression.evaluate(ctx);
  };
  Var.prototype.eachChild = function eachChild() {
  };
  Var.prototype.possibleOutputs = function possibleOutputs() {
      return [undefined];
  };
  Var.prototype.serialize = function serialize() {
      return [
          'var',
          this.name
      ];
  };

  var ParsingContext = function ParsingContext(registry, path, expectedType, scope, errors) {
      if (path === void 0)
          { path = []; }
      if (scope === void 0)
          { scope = new Scope(); }
      if (errors === void 0)
          { errors = []; }
      this.registry = registry;
      this.path = path;
      this.key = path.map(function (part) {
          return '[' + part + ']';
      }).join('');
      this.scope = scope;
      this.errors = errors;
      this.expectedType = expectedType;
  };
  ParsingContext.prototype.parse = function parse(expr, index, expectedType, bindings, options) {
      if (options === void 0)
          { options = {}; }
      if (index) {
          return this.concat(index, expectedType, bindings)._parse(expr, options);
      }
      return this._parse(expr, options);
  };
  ParsingContext.prototype._parse = function _parse(expr, options) {
      if (expr === null || typeof expr === 'string' || typeof expr === 'boolean' || typeof expr === 'number') {
          expr = [
              'literal',
              expr
          ];
      }
      function annotate(parsed, type, typeAnnotation) {
          if (typeAnnotation === 'assert') {
              return new Assertion(type, [parsed]);
          } else if (typeAnnotation === 'coerce') {
              return new Coercion(type, [parsed]);
          } else {
              return parsed;
          }
      }
      if (Array.isArray(expr)) {
          if (expr.length === 0) {
              return this.error('Expected an array with at least one element. If you wanted a literal array, use ["literal", []].');
          }
          var op = expr[0];
          if (typeof op !== 'string') {
              this.error('Expression name must be a string, but found ' + typeof op + ' instead. If you wanted a literal array, use ["literal", [...]].', 0);
              return null;
          }
          var Expr = this.registry[op];
          if (Expr) {
              var parsed = Expr.parse(expr, this);
              if (!parsed) {
                  return null;
              }
              if (this.expectedType) {
                  var expected = this.expectedType;
                  var actual = parsed.type;
                  if ((expected.kind === 'string' || expected.kind === 'number' || expected.kind === 'boolean' || expected.kind === 'object' || expected.kind === 'array') && actual.kind === 'value') {
                      parsed = annotate(parsed, expected, options.typeAnnotation || 'assert');
                  } else if ((expected.kind === 'color' || expected.kind === 'formatted') && (actual.kind === 'value' || actual.kind === 'string')) {
                      parsed = annotate(parsed, expected, options.typeAnnotation || 'coerce');
                  } else if (this.checkSubtype(expected, actual)) {
                      return null;
                  }
              }
              if (!(parsed instanceof Literal) && isConstant(parsed)) {
                  var ec = new EvaluationContext();
                  try {
                      parsed = new Literal(parsed.type, parsed.evaluate(ec));
                  } catch (e) {
                      this.error(e.message);
                      return null;
                  }
              }
              return parsed;
          }
          return this.error('Unknown expression "' + op + '". If you wanted a literal array, use ["literal", [...]].', 0);
      } else if (typeof expr === 'undefined') {
          return this.error('\'undefined\' value invalid. Use null instead.');
      } else if (typeof expr === 'object') {
          return this.error('Bare objects invalid. Use ["literal", {...}] instead.');
      } else {
          return this.error('Expected an array, but found ' + typeof expr + ' instead.');
      }
  };
  ParsingContext.prototype.concat = function concat(index, expectedType, bindings) {
      var path = typeof index === 'number' ? this.path.concat(index) : this.path;
      var scope = bindings ? this.scope.concat(bindings) : this.scope;
      return new ParsingContext(this.registry, path, expectedType || null, scope, this.errors);
  };
  ParsingContext.prototype.error = function error(error$1) {
      var arguments$1 = arguments;

      var keys = [], len = arguments.length - 1;
      while (len-- > 0)
          { keys[len] = arguments$1[len + 1]; }
      var key = '' + this.key + keys.map(function (k) {
          return '[' + k + ']';
      }).join('');
      this.errors.push(new ParsingError(key, error$1));
  };
  ParsingContext.prototype.checkSubtype = function checkSubtype$1(expected, t) {
      var error = checkSubtype(expected, t);
      if (error) {
          this.error(error);
      }
      return error;
  };
  function isConstant(expression) {
      if (expression instanceof Var) {
          return isConstant(expression.boundExpression);
      } else if (expression instanceof CompoundExpression && expression.name === 'error') {
          return false;
      } else if (expression instanceof CollatorExpression) {
          return false;
      }
      var isTypeAnnotation = expression instanceof Coercion || expression instanceof Assertion;
      var childrenConstant = true;
      expression.eachChild(function (child) {
          if (isTypeAnnotation) {
              childrenConstant = childrenConstant && isConstant(child);
          } else {
              childrenConstant = childrenConstant && child instanceof Literal;
          }
      });
      if (!childrenConstant) {
          return false;
      }
      return isFeatureConstant(expression) && isGlobalPropertyConstant(expression, [
          'zoom',
          'heatmap-density',
          'line-progress',
          'accumulated',
          'is-supported-script'
      ]);
  }

  function findStopLessThanOrEqualTo(stops, input) {
      var n = stops.length;
      var lowerIndex = 0;
      var upperIndex = n - 1;
      var currentIndex = 0;
      var currentValue, upperValue;
      while (lowerIndex <= upperIndex) {
          currentIndex = Math.floor((lowerIndex + upperIndex) / 2);
          currentValue = stops[currentIndex];
          upperValue = stops[currentIndex + 1];
          if (input === currentValue || input > currentValue && input < upperValue) {
              return currentIndex;
          } else if (currentValue < input) {
              lowerIndex = currentIndex + 1;
          } else if (currentValue > input) {
              upperIndex = currentIndex - 1;
          } else {
              throw new RuntimeError('Input is not a number.');
          }
      }
      return Math.max(currentIndex - 1, 0);
  }

  var Step = function Step(type, input, stops) {
      this.type = type;
      this.input = input;
      this.labels = [];
      this.outputs = [];
      for (var i = 0, list = stops; i < list.length; i += 1) {
          var ref = list[i];
          var label = ref[0];
          var expression = ref[1];
          this.labels.push(label);
          this.outputs.push(expression);
      }
  };
  Step.parse = function parse(args, context) {
      var input = args[1];
      var rest = args.slice(2);
      if (args.length - 1 < 4) {
          return context.error('Expected at least 4 arguments, but found only ' + (args.length - 1) + '.');
      }
      if ((args.length - 1) % 2 !== 0) {
          return context.error('Expected an even number of arguments.');
      }
      input = context.parse(input, 1, NumberType);
      if (!input) {
          return null;
      }
      var stops = [];
      var outputType = null;
      if (context.expectedType && context.expectedType.kind !== 'value') {
          outputType = context.expectedType;
      }
      rest.unshift(-Infinity);
      for (var i = 0; i < rest.length; i += 2) {
          var label = rest[i];
          var value = rest[i + 1];
          var labelKey = i + 1;
          var valueKey = i + 2;
          if (typeof label !== 'number') {
              return context.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.', labelKey);
          }
          if (stops.length && stops[stops.length - 1][0] >= label) {
              return context.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.', labelKey);
          }
          var parsed = context.parse(value, valueKey, outputType);
          if (!parsed) {
              return null;
          }
          outputType = outputType || parsed.type;
          stops.push([
              label,
              parsed
          ]);
      }
      return new Step(outputType, input, stops);
  };
  Step.prototype.evaluate = function evaluate(ctx) {
      var labels = this.labels;
      var outputs = this.outputs;
      if (labels.length === 1) {
          return outputs[0].evaluate(ctx);
      }
      var value = this.input.evaluate(ctx);
      if (value <= labels[0]) {
          return outputs[0].evaluate(ctx);
      }
      var stopCount = labels.length;
      if (value >= labels[stopCount - 1]) {
          return outputs[stopCount - 1].evaluate(ctx);
      }
      var index = findStopLessThanOrEqualTo(labels, value);
      return outputs[index].evaluate(ctx);
  };
  Step.prototype.eachChild = function eachChild(fn) {
      fn(this.input);
      for (var i = 0, list = this.outputs; i < list.length; i += 1) {
          var expression = list[i];
          fn(expression);
      }
  };
  Step.prototype.possibleOutputs = function possibleOutputs() {
      var ref;
      return (ref = []).concat.apply(ref, this.outputs.map(function (output) {
          return output.possibleOutputs();
      }));
  };
  Step.prototype.serialize = function serialize() {
      var serialized = [
          'step',
          this.input.serialize()
      ];
      for (var i = 0; i < this.labels.length; i++) {
          if (i > 0) {
              serialized.push(this.labels[i]);
          }
          serialized.push(this.outputs[i].serialize());
      }
      return serialized;
  };

  /*
   * Copyright (C) 2008 Apple Inc. All Rights Reserved.
   *
   * Redistribution and use in source and binary forms, with or without
   * modification, are permitted provided that the following conditions
   * are met:
   * 1. Redistributions of source code must retain the above copyright
   *    notice, this list of conditions and the following disclaimer.
   * 2. Redistributions in binary form must reproduce the above copyright
   *    notice, this list of conditions and the following disclaimer in the
   *    documentation and/or other materials provided with the distribution.
   *
   * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
   * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
   * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
   * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
   * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
   * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
   * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
   * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   *
   * Ported from Webkit
   * http://svn.webkit.org/repository/webkit/trunk/Source/WebCore/platform/graphics/UnitBezier.h
   */

  var unitbezier = UnitBezier;

  function UnitBezier(p1x, p1y, p2x, p2y) {
      // Calculate the polynomial coefficients, implicit first and last control points are (0,0) and (1,1).
      this.cx = 3.0 * p1x;
      this.bx = 3.0 * (p2x - p1x) - this.cx;
      this.ax = 1.0 - this.cx - this.bx;

      this.cy = 3.0 * p1y;
      this.by = 3.0 * (p2y - p1y) - this.cy;
      this.ay = 1.0 - this.cy - this.by;

      this.p1x = p1x;
      this.p1y = p2y;
      this.p2x = p2x;
      this.p2y = p2y;
  }

  UnitBezier.prototype.sampleCurveX = function(t) {
      // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.
      return ((this.ax * t + this.bx) * t + this.cx) * t;
  };

  UnitBezier.prototype.sampleCurveY = function(t) {
      return ((this.ay * t + this.by) * t + this.cy) * t;
  };

  UnitBezier.prototype.sampleCurveDerivativeX = function(t) {
      return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
  };

  UnitBezier.prototype.solveCurveX = function(x, epsilon) {
      if (typeof epsilon === 'undefined') { epsilon = 1e-6; }

      var t0, t1, t2, x2, i;

      // First try a few iterations of Newton's method -- normally very fast.
      for (t2 = x, i = 0; i < 8; i++) {

          x2 = this.sampleCurveX(t2) - x;
          if (Math.abs(x2) < epsilon) { return t2; }

          var d2 = this.sampleCurveDerivativeX(t2);
          if (Math.abs(d2) < 1e-6) { break; }

          t2 = t2 - x2 / d2;
      }

      // Fall back to the bisection method for reliability.
      t0 = 0.0;
      t1 = 1.0;
      t2 = x;

      if (t2 < t0) { return t0; }
      if (t2 > t1) { return t1; }

      while (t0 < t1) {

          x2 = this.sampleCurveX(t2);
          if (Math.abs(x2 - x) < epsilon) { return t2; }

          if (x > x2) {
              t0 = t2;
          } else {
              t1 = t2;
          }

          t2 = (t1 - t0) * 0.5 + t0;
      }

      // Failure.
      return t2;
  };

  UnitBezier.prototype.solve = function(x, epsilon) {
      return this.sampleCurveY(this.solveCurveX(x, epsilon));
  };

  function number(a, b, t) {
      return a * (1 - t) + b * t;
  }
  function color(from, to, t) {
      return new Color(number(from.r, to.r, t), number(from.g, to.g, t), number(from.b, to.b, t), number(from.a, to.a, t));
  }
  function array$1(from, to, t) {
      return from.map(function (d, i) {
          return number(d, to[i], t);
      });
  }

  var interpolate = /*#__PURE__*/Object.freeze({
    number: number,
    color: color,
    array: array$1
  });

  var Xn = 0.95047, Yn = 1, Zn = 1.08883, t0 = 4 / 29, t1 = 6 / 29, t2 = 3 * t1 * t1, t3 = t1 * t1 * t1, deg2rad = Math.PI / 180, rad2deg = 180 / Math.PI;
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
  function rgbToLab(rgbColor) {
      var b = rgb2xyz(rgbColor.r), a = rgb2xyz(rgbColor.g), l = rgb2xyz(rgbColor.b), x = xyz2lab((0.4124564 * b + 0.3575761 * a + 0.1804375 * l) / Xn), y = xyz2lab((0.2126729 * b + 0.7151522 * a + 0.072175 * l) / Yn), z = xyz2lab((0.0193339 * b + 0.119192 * a + 0.9503041 * l) / Zn);
      return {
          l: 116 * y - 16,
          a: 500 * (x - y),
          b: 200 * (y - z),
          alpha: rgbColor.a
      };
  }
  function labToRgb(labColor) {
      var y = (labColor.l + 16) / 116, x = isNaN(labColor.a) ? y : y + labColor.a / 500, z = isNaN(labColor.b) ? y : y - labColor.b / 200;
      y = Yn * lab2xyz(y);
      x = Xn * lab2xyz(x);
      z = Zn * lab2xyz(z);
      return new Color(xyz2rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z), xyz2rgb(-0.969266 * x + 1.8760108 * y + 0.041556 * z), xyz2rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z), labColor.alpha);
  }
  function interpolateLab(from, to, t) {
      return {
          l: number(from.l, to.l, t),
          a: number(from.a, to.a, t),
          b: number(from.b, to.b, t),
          alpha: number(from.alpha, to.alpha, t)
      };
  }
  function rgbToHcl(rgbColor) {
      var ref = rgbToLab(rgbColor);
      var l = ref.l;
      var a = ref.a;
      var b = ref.b;
      var h = Math.atan2(b, a) * rad2deg;
      return {
          h: h < 0 ? h + 360 : h,
          c: Math.sqrt(a * a + b * b),
          l: l,
          alpha: rgbColor.a
      };
  }
  function hclToRgb(hclColor) {
      var h = hclColor.h * deg2rad, c = hclColor.c, l = hclColor.l;
      return labToRgb({
          l: l,
          a: Math.cos(h) * c,
          b: Math.sin(h) * c,
          alpha: hclColor.alpha
      });
  }
  function interpolateHue(a, b, t) {
      var d = b - a;
      return a + t * (d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d);
  }
  function interpolateHcl(from, to, t) {
      return {
          h: interpolateHue(from.h, to.h, t),
          c: number(from.c, to.c, t),
          l: number(from.l, to.l, t),
          alpha: number(from.alpha, to.alpha, t)
      };
  }
  var lab = {
      forward: rgbToLab,
      reverse: labToRgb,
      interpolate: interpolateLab
  };
  var hcl = {
      forward: rgbToHcl,
      reverse: hclToRgb,
      interpolate: interpolateHcl
  };

  var colorSpaces = /*#__PURE__*/Object.freeze({
    lab: lab,
    hcl: hcl
  });

  var Interpolate = function Interpolate(type, operator, interpolation, input, stops) {
      this.type = type;
      this.operator = operator;
      this.interpolation = interpolation;
      this.input = input;
      this.labels = [];
      this.outputs = [];
      for (var i = 0, list = stops; i < list.length; i += 1) {
          var ref = list[i];
          var label = ref[0];
          var expression = ref[1];
          this.labels.push(label);
          this.outputs.push(expression);
      }
  };
  Interpolate.interpolationFactor = function interpolationFactor(interpolation, input, lower, upper) {
      var t = 0;
      if (interpolation.name === 'exponential') {
          t = exponentialInterpolation(input, interpolation.base, lower, upper);
      } else if (interpolation.name === 'linear') {
          t = exponentialInterpolation(input, 1, lower, upper);
      } else if (interpolation.name === 'cubic-bezier') {
          var c = interpolation.controlPoints;
          var ub = new unitbezier(c[0], c[1], c[2], c[3]);
          t = ub.solve(exponentialInterpolation(input, 1, lower, upper));
      }
      return t;
  };
  Interpolate.parse = function parse(args, context) {
      var operator = args[0];
      var interpolation = args[1];
      var input = args[2];
      var rest = args.slice(3);
      if (!Array.isArray(interpolation) || interpolation.length === 0) {
          return context.error('Expected an interpolation type expression.', 1);
      }
      if (interpolation[0] === 'linear') {
          interpolation = { name: 'linear' };
      } else if (interpolation[0] === 'exponential') {
          var base = interpolation[1];
          if (typeof base !== 'number') {
              return context.error('Exponential interpolation requires a numeric base.', 1, 1);
          }
          interpolation = {
              name: 'exponential',
              base: base
          };
      } else if (interpolation[0] === 'cubic-bezier') {
          var controlPoints = interpolation.slice(1);
          if (controlPoints.length !== 4 || controlPoints.some(function (t) {
                  return typeof t !== 'number' || t < 0 || t > 1;
              })) {
              return context.error('Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.', 1);
          }
          interpolation = {
              name: 'cubic-bezier',
              controlPoints: controlPoints
          };
      } else {
          return context.error('Unknown interpolation type ' + String(interpolation[0]), 1, 0);
      }
      if (args.length - 1 < 4) {
          return context.error('Expected at least 4 arguments, but found only ' + (args.length - 1) + '.');
      }
      if ((args.length - 1) % 2 !== 0) {
          return context.error('Expected an even number of arguments.');
      }
      input = context.parse(input, 2, NumberType);
      if (!input) {
          return null;
      }
      var stops = [];
      var outputType = null;
      if (operator === 'interpolate-hcl' || operator === 'interpolate-lab') {
          outputType = ColorType;
      } else if (context.expectedType && context.expectedType.kind !== 'value') {
          outputType = context.expectedType;
      }
      for (var i = 0; i < rest.length; i += 2) {
          var label = rest[i];
          var value = rest[i + 1];
          var labelKey = i + 3;
          var valueKey = i + 4;
          if (typeof label !== 'number') {
              return context.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.', labelKey);
          }
          if (stops.length && stops[stops.length - 1][0] >= label) {
              return context.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.', labelKey);
          }
          var parsed = context.parse(value, valueKey, outputType);
          if (!parsed) {
              return null;
          }
          outputType = outputType || parsed.type;
          stops.push([
              label,
              parsed
          ]);
      }
      if (outputType.kind !== 'number' && outputType.kind !== 'color' && !(outputType.kind === 'array' && outputType.itemType.kind === 'number' && typeof outputType.N === 'number')) {
          return context.error('Type ' + toString(outputType) + ' is not interpolatable.');
      }
      return new Interpolate(outputType, operator, interpolation, input, stops);
  };
  Interpolate.prototype.evaluate = function evaluate(ctx) {
      var labels = this.labels;
      var outputs = this.outputs;
      if (labels.length === 1) {
          return outputs[0].evaluate(ctx);
      }
      var value = this.input.evaluate(ctx);
      if (value <= labels[0]) {
          return outputs[0].evaluate(ctx);
      }
      var stopCount = labels.length;
      if (value >= labels[stopCount - 1]) {
          return outputs[stopCount - 1].evaluate(ctx);
      }
      var index = findStopLessThanOrEqualTo(labels, value);
      var lower = labels[index];
      var upper = labels[index + 1];
      var t = Interpolate.interpolationFactor(this.interpolation, value, lower, upper);
      var outputLower = outputs[index].evaluate(ctx);
      var outputUpper = outputs[index + 1].evaluate(ctx);
      if (this.operator === 'interpolate') {
          return interpolate[this.type.kind.toLowerCase()](outputLower, outputUpper, t);
      } else if (this.operator === 'interpolate-hcl') {
          return hcl.reverse(hcl.interpolate(hcl.forward(outputLower), hcl.forward(outputUpper), t));
      } else {
          return lab.reverse(lab.interpolate(lab.forward(outputLower), lab.forward(outputUpper), t));
      }
  };
  Interpolate.prototype.eachChild = function eachChild(fn) {
      fn(this.input);
      for (var i = 0, list = this.outputs; i < list.length; i += 1) {
          var expression = list[i];
          fn(expression);
      }
  };
  Interpolate.prototype.possibleOutputs = function possibleOutputs() {
      var ref;
      return (ref = []).concat.apply(ref, this.outputs.map(function (output) {
          return output.possibleOutputs();
      }));
  };
  Interpolate.prototype.serialize = function serialize() {
      var interpolation;
      if (this.interpolation.name === 'linear') {
          interpolation = ['linear'];
      } else if (this.interpolation.name === 'exponential') {
          if (this.interpolation.base === 1) {
              interpolation = ['linear'];
          } else {
              interpolation = [
                  'exponential',
                  this.interpolation.base
              ];
          }
      } else {
          interpolation = ['cubic-bezier'].concat(this.interpolation.controlPoints);
      }
      var serialized = [
          this.operator,
          interpolation,
          this.input.serialize()
      ];
      for (var i = 0; i < this.labels.length; i++) {
          serialized.push(this.labels[i], this.outputs[i].serialize());
      }
      return serialized;
  };
  function exponentialInterpolation(input, base, lowerValue, upperValue) {
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

  var Coalesce = function Coalesce(type, args) {
      this.type = type;
      this.args = args;
  };
  Coalesce.parse = function parse(args, context) {
      if (args.length < 2) {
          return context.error('Expectected at least one argument.');
      }
      var outputType = null;
      var expectedType = context.expectedType;
      if (expectedType && expectedType.kind !== 'value') {
          outputType = expectedType;
      }
      var parsedArgs = [];
      for (var i = 0, list = args.slice(1); i < list.length; i += 1) {
          var arg = list[i];
          var parsed = context.parse(arg, 1 + parsedArgs.length, outputType, undefined, { typeAnnotation: 'omit' });
          if (!parsed) {
              return null;
          }
          outputType = outputType || parsed.type;
          parsedArgs.push(parsed);
      }
      var needsAnnotation = expectedType && parsedArgs.some(function (arg) {
          return checkSubtype(expectedType, arg.type);
      });
      return needsAnnotation ? new Coalesce(ValueType, parsedArgs) : new Coalesce(outputType, parsedArgs);
  };
  Coalesce.prototype.evaluate = function evaluate(ctx) {
      var result = null;
      for (var i = 0, list = this.args; i < list.length; i += 1) {
          var arg = list[i];
          result = arg.evaluate(ctx);
          if (result !== null) {
              break;
          }
      }
      return result;
  };
  Coalesce.prototype.eachChild = function eachChild(fn) {
      this.args.forEach(fn);
  };
  Coalesce.prototype.possibleOutputs = function possibleOutputs() {
      var ref;
      return (ref = []).concat.apply(ref, this.args.map(function (arg) {
          return arg.possibleOutputs();
      }));
  };
  Coalesce.prototype.serialize = function serialize() {
      var serialized = ['coalesce'];
      this.eachChild(function (child) {
          serialized.push(child.serialize());
      });
      return serialized;
  };

  var Let = function Let(bindings, result) {
      this.type = result.type;
      this.bindings = [].concat(bindings);
      this.result = result;
  };
  Let.prototype.evaluate = function evaluate(ctx) {
      return this.result.evaluate(ctx);
  };
  Let.prototype.eachChild = function eachChild(fn) {
      for (var i = 0, list = this.bindings; i < list.length; i += 1) {
          var binding = list[i];
          fn(binding[1]);
      }
      fn(this.result);
  };
  Let.parse = function parse(args, context) {
      if (args.length < 4) {
          return context.error('Expected at least 3 arguments, but found ' + (args.length - 1) + ' instead.');
      }
      var bindings = [];
      for (var i = 1; i < args.length - 1; i += 2) {
          var name = args[i];
          if (typeof name !== 'string') {
              return context.error('Expected string, but found ' + typeof name + ' instead.', i);
          }
          if (/[^a-zA-Z0-9_]/.test(name)) {
              return context.error('Variable names must contain only alphanumeric characters or \'_\'.', i);
          }
          var value = context.parse(args[i + 1], i + 1);
          if (!value) {
              return null;
          }
          bindings.push([
              name,
              value
          ]);
      }
      var result = context.parse(args[args.length - 1], args.length - 1, context.expectedType, bindings);
      if (!result) {
          return null;
      }
      return new Let(bindings, result);
  };
  Let.prototype.possibleOutputs = function possibleOutputs() {
      return this.result.possibleOutputs();
  };
  Let.prototype.serialize = function serialize() {
      var serialized = ['let'];
      for (var i = 0, list = this.bindings; i < list.length; i += 1) {
          var ref = list[i];
          var name = ref[0];
          var expr = ref[1];
          serialized.push(name, expr.serialize());
      }
      serialized.push(this.result.serialize());
      return serialized;
  };

  var At = function At(type, index, input) {
      this.type = type;
      this.index = index;
      this.input = input;
  };
  At.parse = function parse(args, context) {
      if (args.length !== 3) {
          return context.error('Expected 2 arguments, but found ' + (args.length - 1) + ' instead.');
      }
      var index = context.parse(args[1], 1, NumberType);
      var input = context.parse(args[2], 2, array(context.expectedType || ValueType));
      if (!index || !input) {
          return null;
      }
      var t = input.type;
      return new At(t.itemType, index, input);
  };
  At.prototype.evaluate = function evaluate(ctx) {
      var index = this.index.evaluate(ctx);
      var array$$1 = this.input.evaluate(ctx);
      if (index < 0) {
          throw new RuntimeError('Array index out of bounds: ' + index + ' < 0.');
      }
      if (index >= array$$1.length) {
          throw new RuntimeError('Array index out of bounds: ' + index + ' > ' + (array$$1.length - 1) + '.');
      }
      if (index !== Math.floor(index)) {
          throw new RuntimeError('Array index must be an integer, but found ' + index + ' instead.');
      }
      return array$$1[index];
  };
  At.prototype.eachChild = function eachChild(fn) {
      fn(this.index);
      fn(this.input);
  };
  At.prototype.possibleOutputs = function possibleOutputs() {
      return [undefined];
  };
  At.prototype.serialize = function serialize() {
      return [
          'at',
          this.index.serialize(),
          this.input.serialize()
      ];
  };

  var Match = function Match(inputType, outputType, input, cases, outputs, otherwise) {
      this.inputType = inputType;
      this.type = outputType;
      this.input = input;
      this.cases = cases;
      this.outputs = outputs;
      this.otherwise = otherwise;
  };
  Match.parse = function parse(args, context) {
      if (args.length < 5) {
          return context.error('Expected at least 4 arguments, but found only ' + (args.length - 1) + '.');
      }
      if (args.length % 2 !== 1) {
          return context.error('Expected an even number of arguments.');
      }
      var inputType;
      var outputType;
      if (context.expectedType && context.expectedType.kind !== 'value') {
          outputType = context.expectedType;
      }
      var cases = {};
      var outputs = [];
      for (var i = 2; i < args.length - 1; i += 2) {
          var labels = args[i];
          var value = args[i + 1];
          if (!Array.isArray(labels)) {
              labels = [labels];
          }
          var labelContext = context.concat(i);
          if (labels.length === 0) {
              return labelContext.error('Expected at least one branch label.');
          }
          for (var i$1 = 0, list = labels; i$1 < list.length; i$1 += 1) {
              var label = list[i$1];
              if (typeof label !== 'number' && typeof label !== 'string') {
                  return labelContext.error('Branch labels must be numbers or strings.');
              } else if (typeof label === 'number' && Math.abs(label) > Number.MAX_SAFE_INTEGER) {
                  return labelContext.error('Branch labels must be integers no larger than ' + Number.MAX_SAFE_INTEGER + '.');
              } else if (typeof label === 'number' && Math.floor(label) !== label) {
                  return labelContext.error('Numeric branch labels must be integer values.');
              } else if (!inputType) {
                  inputType = typeOf(label);
              } else if (labelContext.checkSubtype(inputType, typeOf(label))) {
                  return null;
              }
              if (typeof cases[String(label)] !== 'undefined') {
                  return labelContext.error('Branch labels must be unique.');
              }
              cases[String(label)] = outputs.length;
          }
          var result = context.parse(value, i, outputType);
          if (!result) {
              return null;
          }
          outputType = outputType || result.type;
          outputs.push(result);
      }
      var input = context.parse(args[1], 1, ValueType);
      if (!input) {
          return null;
      }
      var otherwise = context.parse(args[args.length - 1], args.length - 1, outputType);
      if (!otherwise) {
          return null;
      }
      if (input.type.kind !== 'value' && context.concat(1).checkSubtype(inputType, input.type)) {
          return null;
      }
      return new Match(inputType, outputType, input, cases, outputs, otherwise);
  };
  Match.prototype.evaluate = function evaluate(ctx) {
      var input = this.input.evaluate(ctx);
      var output = typeOf(input) === this.inputType && this.outputs[this.cases[input]] || this.otherwise;
      return output.evaluate(ctx);
  };
  Match.prototype.eachChild = function eachChild(fn) {
      fn(this.input);
      this.outputs.forEach(fn);
      fn(this.otherwise);
  };
  Match.prototype.possibleOutputs = function possibleOutputs() {
      var ref;
      return (ref = []).concat.apply(ref, this.outputs.map(function (out) {
          return out.possibleOutputs();
      })).concat(this.otherwise.possibleOutputs());
  };
  Match.prototype.serialize = function serialize() {
      var this$1 = this;
      var serialized = [
          'match',
          this.input.serialize()
      ];
      var sortedLabels = Object.keys(this.cases).sort();
      var groupedByOutput = [];
      var outputLookup = {};
      for (var i = 0, list = sortedLabels; i < list.length; i += 1) {
          var label = list[i];
          var outputIndex = outputLookup[this.cases[label]];
          if (outputIndex === undefined) {
              outputLookup[this.cases[label]] = groupedByOutput.length;
              groupedByOutput.push([
                  this.cases[label],
                  [label]
              ]);
          } else {
              groupedByOutput[outputIndex][1].push(label);
          }
      }
      var coerceLabel = function (label) {
          return this$1.inputType.kind === 'number' ? Number(label) : label;
      };
      for (var i$1 = 0, list$1 = groupedByOutput; i$1 < list$1.length; i$1 += 1) {
          var ref = list$1[i$1];
          var outputIndex = ref[0];
          var labels = ref[1];
          if (labels.length === 1) {
              serialized.push(coerceLabel(labels[0]));
          } else {
              serialized.push(labels.map(coerceLabel));
          }
          serialized.push(this.outputs[outputIndex$1].serialize());
      }
      serialized.push(this.otherwise.serialize());
      return serialized;
  };

  var Case = function Case(type, branches, otherwise) {
      this.type = type;
      this.branches = branches;
      this.otherwise = otherwise;
  };
  Case.parse = function parse(args, context) {
      if (args.length < 4) {
          return context.error('Expected at least 3 arguments, but found only ' + (args.length - 1) + '.');
      }
      if (args.length % 2 !== 0) {
          return context.error('Expected an odd number of arguments.');
      }
      var outputType;
      if (context.expectedType && context.expectedType.kind !== 'value') {
          outputType = context.expectedType;
      }
      var branches = [];
      for (var i = 1; i < args.length - 1; i += 2) {
          var test = context.parse(args[i], i, BooleanType);
          if (!test) {
              return null;
          }
          var result = context.parse(args[i + 1], i + 1, outputType);
          if (!result) {
              return null;
          }
          branches.push([
              test,
              result
          ]);
          outputType = outputType || result.type;
      }
      var otherwise = context.parse(args[args.length - 1], args.length - 1, outputType);
      if (!otherwise) {
          return null;
      }
      return new Case(outputType, branches, otherwise);
  };
  Case.prototype.evaluate = function evaluate(ctx) {
      for (var i = 0, list = this.branches; i < list.length; i += 1) {
          var ref = list[i];
          var test = ref[0];
          var expression = ref[1];
          if (test.evaluate(ctx)) {
              return expression.evaluate(ctx);
          }
      }
      return this.otherwise.evaluate(ctx);
  };
  Case.prototype.eachChild = function eachChild(fn) {
      for (var i = 0, list = this.branches; i < list.length; i += 1) {
          var ref = list[i];
          var test = ref[0];
          var expression = ref[1];
          fn(test);
          fn(expression);
      }
      fn(this.otherwise);
  };
  Case.prototype.possibleOutputs = function possibleOutputs() {
      var ref;
      return (ref = []).concat.apply(ref, this.branches.map(function (ref) {
          var _ = ref[0];
          var out = ref[1];
          return out.possibleOutputs();
      })).concat(this.otherwise.possibleOutputs());
  };
  Case.prototype.serialize = function serialize() {
      var serialized = ['case'];
      this.eachChild(function (child) {
          serialized.push(child.serialize());
      });
      return serialized;
  };

  function isComparableType(op, type) {
      if (op === '==' || op === '!=') {
          return type.kind === 'boolean' || type.kind === 'string' || type.kind === 'number' || type.kind === 'null' || type.kind === 'value';
      } else {
          return type.kind === 'string' || type.kind === 'number' || type.kind === 'value';
      }
  }
  function eq(ctx, a, b) {
      return a === b;
  }
  function neq(ctx, a, b) {
      return a !== b;
  }
  function lt(ctx, a, b) {
      return a < b;
  }
  function gt(ctx, a, b) {
      return a > b;
  }
  function lteq(ctx, a, b) {
      return a <= b;
  }
  function gteq(ctx, a, b) {
      return a >= b;
  }
  function eqCollate(ctx, a, b, c) {
      return c.compare(a, b) === 0;
  }
  function neqCollate(ctx, a, b, c) {
      return !eqCollate(ctx, a, b, c);
  }
  function ltCollate(ctx, a, b, c) {
      return c.compare(a, b) < 0;
  }
  function gtCollate(ctx, a, b, c) {
      return c.compare(a, b) > 0;
  }
  function lteqCollate(ctx, a, b, c) {
      return c.compare(a, b) <= 0;
  }
  function gteqCollate(ctx, a, b, c) {
      return c.compare(a, b) >= 0;
  }
  function makeComparison(op, compareBasic, compareWithCollator) {
      var isOrderComparison = op !== '==' && op !== '!=';
      return function () {
          function Comparison(lhs, rhs, collator) {
              this.type = BooleanType;
              this.lhs = lhs;
              this.rhs = rhs;
              this.collator = collator;
              this.hasUntypedArgument = lhs.type.kind === 'value' || rhs.type.kind === 'value';
          }
          Comparison.parse = function parse(args, context) {
              if (args.length !== 3 && args.length !== 4) {
                  return context.error('Expected two or three arguments.');
              }
              var op = args[0];
              var lhs = context.parse(args[1], 1, ValueType);
              if (!lhs) {
                  return null;
              }
              if (!isComparableType(op, lhs.type)) {
                  return context.concat(1).error('"' + op + '" comparisons are not supported for type \'' + toString(lhs.type) + '\'.');
              }
              var rhs = context.parse(args[2], 2, ValueType);
              if (!rhs) {
                  return null;
              }
              if (!isComparableType(op, rhs.type)) {
                  return context.concat(2).error('"' + op + '" comparisons are not supported for type \'' + toString(rhs.type) + '\'.');
              }
              if (lhs.type.kind !== rhs.type.kind && lhs.type.kind !== 'value' && rhs.type.kind !== 'value') {
                  return context.error('Cannot compare types \'' + toString(lhs.type) + '\' and \'' + toString(rhs.type) + '\'.');
              }
              if (isOrderComparison) {
                  if (lhs.type.kind === 'value' && rhs.type.kind !== 'value') {
                      lhs = new Assertion(rhs.type, [lhs]);
                  } else if (lhs.type.kind !== 'value' && rhs.type.kind === 'value') {
                      rhs = new Assertion(lhs.type, [rhs]);
                  }
              }
              var collator = null;
              if (args.length === 4) {
                  if (lhs.type.kind !== 'string' && rhs.type.kind !== 'string' && lhs.type.kind !== 'value' && rhs.type.kind !== 'value') {
                      return context.error('Cannot use collator to compare non-string types.');
                  }
                  collator = context.parse(args[3], 3, CollatorType);
                  if (!collator) {
                      return null;
                  }
              }
              return new Comparison(lhs, rhs, collator);
          };
          Comparison.prototype.evaluate = function evaluate(ctx) {
              var lhs = this.lhs.evaluate(ctx);
              var rhs = this.rhs.evaluate(ctx);
              if (isOrderComparison && this.hasUntypedArgument) {
                  var lt = typeOf(lhs);
                  var rt = typeOf(rhs);
                  if (lt.kind !== rt.kind || !(lt.kind === 'string' || lt.kind === 'number')) {
                      throw new RuntimeError('Expected arguments for "' + op + '" to be (string, string) or (number, number), but found (' + lt.kind + ', ' + rt.kind + ') instead.');
                  }
              }
              if (this.collator && !isOrderComparison && this.hasUntypedArgument) {
                  var lt$1 = typeOf(lhs);
                  var rt$1 = typeOf(rhs);
                  if (lt$1.kind !== 'string' || rt$1.kind !== 'string') {
                      return compareBasic(ctx, lhs, rhs);
                  }
              }
              return this.collator ? compareWithCollator(ctx, lhs, rhs, this.collator.evaluate(ctx)) : compareBasic(ctx, lhs, rhs);
          };
          Comparison.prototype.eachChild = function eachChild(fn) {
              fn(this.lhs);
              fn(this.rhs);
              if (this.collator) {
                  fn(this.collator);
              }
          };
          Comparison.prototype.possibleOutputs = function possibleOutputs() {
              return [
                  true,
                  false
              ];
          };
          Comparison.prototype.serialize = function serialize() {
              var serialized = [op];
              this.eachChild(function (child) {
                  serialized.push(child.serialize());
              });
              return serialized;
          };
          return Comparison;
      }();
  }
  var Equals = makeComparison('==', eq, eqCollate);
  var NotEquals = makeComparison('!=', neq, neqCollate);
  var LessThan = makeComparison('<', lt, ltCollate);
  var GreaterThan = makeComparison('>', gt, gtCollate);
  var LessThanOrEqual = makeComparison('<=', lteq, lteqCollate);
  var GreaterThanOrEqual = makeComparison('>=', gteq, gteqCollate);

  var NumberFormat = function NumberFormat(number, locale, currency, minFractionDigits, maxFractionDigits) {
      this.type = StringType;
      this.number = number;
      this.locale = locale;
      this.currency = currency;
      this.minFractionDigits = minFractionDigits;
      this.maxFractionDigits = maxFractionDigits;
  };
  NumberFormat.parse = function parse(args, context) {
      if (args.length !== 3) {
          return context.error('Expected two arguments.');
      }
      var number = context.parse(args[1], 1, NumberType);
      if (!number) {
          return null;
      }
      var options = args[2];
      if (typeof options !== 'object' || Array.isArray(options)) {
          return context.error('NumberFormat options argument must be an object.');
      }
      var locale = null;
      if (options['locale']) {
          locale = context.parse(options['locale'], 1, StringType);
          if (!locale) {
              return null;
          }
      }
      var currency = null;
      if (options['currency']) {
          currency = context.parse(options['currency'], 1, StringType);
          if (!currency) {
              return null;
          }
      }
      var minFractionDigits = null;
      if (options['min-fraction-digits']) {
          minFractionDigits = context.parse(options['min-fraction-digits'], 1, NumberType);
          if (!minFractionDigits) {
              return null;
          }
      }
      var maxFractionDigits = null;
      if (options['max-fraction-digits']) {
          maxFractionDigits = context.parse(options['max-fraction-digits'], 1, NumberType);
          if (!maxFractionDigits) {
              return null;
          }
      }
      return new NumberFormat(number, locale, currency, minFractionDigits, maxFractionDigits);
  };
  NumberFormat.prototype.evaluate = function evaluate(ctx) {
      return new Intl.NumberFormat(this.locale ? this.locale.evaluate(ctx) : [], {
          style: this.currency ? 'currency' : 'decimal',
          currency: this.currency ? this.currency.evaluate(ctx) : undefined,
          minimumFractionDigits: this.minFractionDigits ? this.minFractionDigits.evaluate(ctx) : undefined,
          maximumFractionDigits: this.maxFractionDigits ? this.maxFractionDigits.evaluate(ctx) : undefined
      }).format(this.number.evaluate(ctx));
  };
  NumberFormat.prototype.eachChild = function eachChild(fn) {
      fn(this.number);
      if (this.locale) {
          fn(this.locale);
      }
      if (this.currency) {
          fn(this.currency);
      }
      if (this.minFractionDigits) {
          fn(this.minFractionDigits);
      }
      if (this.maxFractionDigits) {
          fn(this.maxFractionDigits);
      }
  };
  NumberFormat.prototype.possibleOutputs = function possibleOutputs() {
      return [undefined];
  };
  NumberFormat.prototype.serialize = function serialize() {
      var options = {};
      if (this.locale) {
          options['locale'] = this.locale.serialize();
      }
      if (this.currency) {
          options['currency'] = this.currency.serialize();
      }
      if (this.minFractionDigits) {
          options['min-fraction-digits'] = this.minFractionDigits.serialize();
      }
      if (this.maxFractionDigits) {
          options['max-fraction-digits'] = this.maxFractionDigits.serialize();
      }
      return [
          'number-format',
          this.number.serialize(),
          options
      ];
  };

  var Length = function Length(input) {
      this.type = NumberType;
      this.input = input;
  };
  Length.parse = function parse(args, context) {
      if (args.length !== 2) {
          return context.error('Expected 1 argument, but found ' + (args.length - 1) + ' instead.');
      }
      var input = context.parse(args[1], 1);
      if (!input) {
          return null;
      }
      if (input.type.kind !== 'array' && input.type.kind !== 'string' && input.type.kind !== 'value') {
          return context.error('Expected argument of type string or array, but found ' + toString(input.type) + ' instead.');
      }
      return new Length(input);
  };
  Length.prototype.evaluate = function evaluate(ctx) {
      var input = this.input.evaluate(ctx);
      if (typeof input === 'string') {
          return input.length;
      } else if (Array.isArray(input)) {
          return input.length;
      } else {
          throw new RuntimeError('Expected value to be of type string or array, but found ' + toString(typeOf(input)) + ' instead.');
      }
  };
  Length.prototype.eachChild = function eachChild(fn) {
      fn(this.input);
  };
  Length.prototype.possibleOutputs = function possibleOutputs() {
      return [undefined];
  };
  Length.prototype.serialize = function serialize() {
      var serialized = ['length'];
      this.eachChild(function (child) {
          serialized.push(child.serialize());
      });
      return serialized;
  };

  var expressions = {
      '==': Equals,
      '!=': NotEquals,
      '>': GreaterThan,
      '<': LessThan,
      '>=': GreaterThanOrEqual,
      '<=': LessThanOrEqual,
      'array': Assertion,
      'at': At,
      'boolean': Assertion,
      'case': Case,
      'coalesce': Coalesce,
      'collator': CollatorExpression,
      'format': FormatExpression,
      'interpolate': Interpolate,
      'interpolate-hcl': Interpolate,
      'interpolate-lab': Interpolate,
      'length': Length,
      'let': Let,
      'literal': Literal,
      'match': Match,
      'number': Assertion,
      'number-format': NumberFormat,
      'object': Assertion,
      'step': Step,
      'string': Assertion,
      'to-boolean': Coercion,
      'to-color': Coercion,
      'to-number': Coercion,
      'to-string': Coercion,
      'var': Var
  };
  function rgba(ctx, ref) {
      var r = ref[0];
      var g = ref[1];
      var b = ref[2];
      var a = ref[3];
      r = r.evaluate(ctx);
      g = g.evaluate(ctx);
      b = b.evaluate(ctx);
      var alpha = a ? a.evaluate(ctx) : 1;
      var error = validateRGBA(r, g, b, alpha);
      if (error) {
          throw new RuntimeError(error);
      }
      return new Color(r / 255 * alpha, g / 255 * alpha, b / 255 * alpha, alpha);
  }
  function has(key, obj) {
      return key in obj;
  }
  function get$1(key, obj) {
      var v = obj[key];
      return typeof v === 'undefined' ? null : v;
  }
  function binarySearch(v, a, i, j) {
      while (i <= j) {
          var m = i + j >> 1;
          if (a[m] === v) {
              return true;
          }
          if (a[m] > v) {
              j = m - 1;
          } else {
              i = m + 1;
          }
      }
      return false;
  }
  function varargs(type) {
      return { type: type };
  }
  CompoundExpression.register(expressions, {
      'error': [
          ErrorType,
          [StringType],
          function (ctx, ref) {
              var v = ref[0];
              throw new RuntimeError(v.evaluate(ctx));
          }
      ],
      'typeof': [
          StringType,
          [ValueType],
          function (ctx, ref) {
              var v = ref[0];
              return toString(typeOf(v.evaluate(ctx)));
          }
      ],
      'to-rgba': [
          array(NumberType, 4),
          [ColorType],
          function (ctx, ref) {
              var v = ref[0];
              return v.evaluate(ctx).toArray();
          }
      ],
      'rgb': [
          ColorType,
          [
              NumberType,
              NumberType,
              NumberType
          ],
          rgba
      ],
      'rgba': [
          ColorType,
          [
              NumberType,
              NumberType,
              NumberType,
              NumberType
          ],
          rgba
      ],
      'has': {
          type: BooleanType,
          overloads: [
              [
                  [StringType],
                  function (ctx, ref) {
                      var key = ref[0];
                      return has(key.evaluate(ctx), ctx.properties());
                  }
              ],
              [
                  [
                      StringType,
                      ObjectType
                  ],
                  function (ctx, ref) {
                      var key = ref[0];
                      var obj = ref[1];
                      return has(key.evaluate(ctx), obj.evaluate(ctx));
                  }
              ]
          ]
      },
      'get': {
          type: ValueType,
          overloads: [
              [
                  [StringType],
                  function (ctx, ref) {
                      var key = ref[0];
                      return get$1(key.evaluate(ctx), ctx.properties());
                  }
              ],
              [
                  [
                      StringType,
                      ObjectType
                  ],
                  function (ctx, ref) {
                      var key = ref[0];
                      var obj = ref[1];
                      return get$1(key.evaluate(ctx), obj.evaluate(ctx));
                  }
              ]
          ]
      },
      'feature-state': [
          ValueType,
          [StringType],
          function (ctx, ref) {
              var key = ref[0];
              return get$1(key.evaluate(ctx), ctx.featureState || {});
          }
      ],
      'properties': [
          ObjectType,
          [],
          function (ctx) {
              return ctx.properties();
          }
      ],
      'geometry-type': [
          StringType,
          [],
          function (ctx) {
              return ctx.geometryType();
          }
      ],
      'id': [
          ValueType,
          [],
          function (ctx) {
              return ctx.id();
          }
      ],
      'zoom': [
          NumberType,
          [],
          function (ctx) {
              return ctx.globals.zoom;
          }
      ],
      'heatmap-density': [
          NumberType,
          [],
          function (ctx) {
              return ctx.globals.heatmapDensity || 0;
          }
      ],
      'line-progress': [
          NumberType,
          [],
          function (ctx) {
              return ctx.globals.lineProgress || 0;
          }
      ],
      'accumulated': [
          ValueType,
          [],
          function (ctx) {
              return ctx.globals.accumulated === undefined ? null : ctx.globals.accumulated;
          }
      ],
      '+': [
          NumberType,
          varargs(NumberType),
          function (ctx, args) {
              var result = 0;
              for (var i = 0, list = args; i < list.length; i += 1) {
                  var arg = list[i];
                  result += arg.evaluate(ctx);
              }
              return result;
          }
      ],
      '*': [
          NumberType,
          varargs(NumberType),
          function (ctx, args) {
              var result = 1;
              for (var i = 0, list = args; i < list.length; i += 1) {
                  var arg = list[i];
                  result *= arg.evaluate(ctx);
              }
              return result;
          }
      ],
      '-': {
          type: NumberType,
          overloads: [
              [
                  [
                      NumberType,
                      NumberType
                  ],
                  function (ctx, ref) {
                      var a = ref[0];
                      var b = ref[1];
                      return a.evaluate(ctx) - b.evaluate(ctx);
                  }
              ],
              [
                  [NumberType],
                  function (ctx, ref) {
                      var a = ref[0];
                      return -a.evaluate(ctx);
                  }
              ]
          ]
      },
      '/': [
          NumberType,
          [
              NumberType,
              NumberType
          ],
          function (ctx, ref) {
              var a = ref[0];
              var b = ref[1];
              return a.evaluate(ctx) / b.evaluate(ctx);
          }
      ],
      '%': [
          NumberType,
          [
              NumberType,
              NumberType
          ],
          function (ctx, ref) {
              var a = ref[0];
              var b = ref[1];
              return a.evaluate(ctx) % b.evaluate(ctx);
          }
      ],
      'ln2': [
          NumberType,
          [],
          function () {
              return Math.LN2;
          }
      ],
      'pi': [
          NumberType,
          [],
          function () {
              return Math.PI;
          }
      ],
      'e': [
          NumberType,
          [],
          function () {
              return Math.E;
          }
      ],
      '^': [
          NumberType,
          [
              NumberType,
              NumberType
          ],
          function (ctx, ref) {
              var b = ref[0];
              var e = ref[1];
              return Math.pow(b.evaluate(ctx), e.evaluate(ctx));
          }
      ],
      'sqrt': [
          NumberType,
          [NumberType],
          function (ctx, ref) {
              var x = ref[0];
              return Math.sqrt(x.evaluate(ctx));
          }
      ],
      'log10': [
          NumberType,
          [NumberType],
          function (ctx, ref) {
              var n = ref[0];
              return Math.log(n.evaluate(ctx)) / Math.LN10;
          }
      ],
      'ln': [
          NumberType,
          [NumberType],
          function (ctx, ref) {
              var n = ref[0];
              return Math.log(n.evaluate(ctx));
          }
      ],
      'log2': [
          NumberType,
          [NumberType],
          function (ctx, ref) {
              var n = ref[0];
              return Math.log(n.evaluate(ctx)) / Math.LN2;
          }
      ],
      'sin': [
          NumberType,
          [NumberType],
          function (ctx, ref) {
              var n = ref[0];
              return Math.sin(n.evaluate(ctx));
          }
      ],
      'cos': [
          NumberType,
          [NumberType],
          function (ctx, ref) {
              var n = ref[0];
              return Math.cos(n.evaluate(ctx));
          }
      ],
      'tan': [
          NumberType,
          [NumberType],
          function (ctx, ref) {
              var n = ref[0];
              return Math.tan(n.evaluate(ctx));
          }
      ],
      'asin': [
          NumberType,
          [NumberType],
          function (ctx, ref) {
              var n = ref[0];
              return Math.asin(n.evaluate(ctx));
          }
      ],
      'acos': [
          NumberType,
          [NumberType],
          function (ctx, ref) {
              var n = ref[0];
              return Math.acos(n.evaluate(ctx));
          }
      ],
      'atan': [
          NumberType,
          [NumberType],
          function (ctx, ref) {
              var n = ref[0];
              return Math.atan(n.evaluate(ctx));
          }
      ],
      'min': [
          NumberType,
          varargs(NumberType),
          function (ctx, args) {
              return Math.min.apply(Math, args.map(function (arg) {
                  return arg.evaluate(ctx);
              }));
          }
      ],
      'max': [
          NumberType,
          varargs(NumberType),
          function (ctx, args) {
              return Math.max.apply(Math, args.map(function (arg) {
                  return arg.evaluate(ctx);
              }));
          }
      ],
      'abs': [
          NumberType,
          [NumberType],
          function (ctx, ref) {
              var n = ref[0];
              return Math.abs(n.evaluate(ctx));
          }
      ],
      'round': [
          NumberType,
          [NumberType],
          function (ctx, ref) {
              var n = ref[0];
              var v = n.evaluate(ctx);
              return v < 0 ? -Math.round(-v) : Math.round(v);
          }
      ],
      'floor': [
          NumberType,
          [NumberType],
          function (ctx, ref) {
              var n = ref[0];
              return Math.floor(n.evaluate(ctx));
          }
      ],
      'ceil': [
          NumberType,
          [NumberType],
          function (ctx, ref) {
              var n = ref[0];
              return Math.ceil(n.evaluate(ctx));
          }
      ],
      'filter-==': [
          BooleanType,
          [
              StringType,
              ValueType
          ],
          function (ctx, ref) {
              var k = ref[0];
              var v = ref[1];
              return ctx.properties()[k.value] === v.value;
          }
      ],
      'filter-id-==': [
          BooleanType,
          [ValueType],
          function (ctx, ref) {
              var v = ref[0];
              return ctx.id() === v.value;
          }
      ],
      'filter-type-==': [
          BooleanType,
          [StringType],
          function (ctx, ref) {
              var v = ref[0];
              return ctx.geometryType() === v.value;
          }
      ],
      'filter-<': [
          BooleanType,
          [
              StringType,
              ValueType
          ],
          function (ctx, ref) {
              var k = ref[0];
              var v = ref[1];
              var a = ctx.properties()[k.value];
              var b = v.value;
              return typeof a === typeof b && a < b;
          }
      ],
      'filter-id-<': [
          BooleanType,
          [ValueType],
          function (ctx, ref) {
              var v = ref[0];
              var a = ctx.id();
              var b = v.value;
              return typeof a === typeof b && a < b;
          }
      ],
      'filter->': [
          BooleanType,
          [
              StringType,
              ValueType
          ],
          function (ctx, ref) {
              var k = ref[0];
              var v = ref[1];
              var a = ctx.properties()[k.value];
              var b = v.value;
              return typeof a === typeof b && a > b;
          }
      ],
      'filter-id->': [
          BooleanType,
          [ValueType],
          function (ctx, ref) {
              var v = ref[0];
              var a = ctx.id();
              var b = v.value;
              return typeof a === typeof b && a > b;
          }
      ],
      'filter-<=': [
          BooleanType,
          [
              StringType,
              ValueType
          ],
          function (ctx, ref) {
              var k = ref[0];
              var v = ref[1];
              var a = ctx.properties()[k.value];
              var b = v.value;
              return typeof a === typeof b && a <= b;
          }
      ],
      'filter-id-<=': [
          BooleanType,
          [ValueType],
          function (ctx, ref) {
              var v = ref[0];
              var a = ctx.id();
              var b = v.value;
              return typeof a === typeof b && a <= b;
          }
      ],
      'filter->=': [
          BooleanType,
          [
              StringType,
              ValueType
          ],
          function (ctx, ref) {
              var k = ref[0];
              var v = ref[1];
              var a = ctx.properties()[k.value];
              var b = v.value;
              return typeof a === typeof b && a >= b;
          }
      ],
      'filter-id->=': [
          BooleanType,
          [ValueType],
          function (ctx, ref) {
              var v = ref[0];
              var a = ctx.id();
              var b = v.value;
              return typeof a === typeof b && a >= b;
          }
      ],
      'filter-has': [
          BooleanType,
          [ValueType],
          function (ctx, ref) {
              var k = ref[0];
              return k.value in ctx.properties();
          }
      ],
      'filter-has-id': [
          BooleanType,
          [],
          function (ctx) {
              return ctx.id() !== null;
          }
      ],
      'filter-type-in': [
          BooleanType,
          [array(StringType)],
          function (ctx, ref) {
              var v = ref[0];
              return v.value.indexOf(ctx.geometryType()) >= 0;
          }
      ],
      'filter-id-in': [
          BooleanType,
          [array(ValueType)],
          function (ctx, ref) {
              var v = ref[0];
              return v.value.indexOf(ctx.id()) >= 0;
          }
      ],
      'filter-in-small': [
          BooleanType,
          [
              StringType,
              array(ValueType)
          ],
          function (ctx, ref) {
              var k = ref[0];
              var v = ref[1];
              return v.value.indexOf(ctx.properties()[k.value]) >= 0;
          }
      ],
      'filter-in-large': [
          BooleanType,
          [
              StringType,
              array(ValueType)
          ],
          function (ctx, ref) {
              var k = ref[0];
              var v = ref[1];
              return binarySearch(ctx.properties()[k.value], v.value, 0, v.value.length - 1);
          }
      ],
      'all': {
          type: BooleanType,
          overloads: [
              [
                  [
                      BooleanType,
                      BooleanType
                  ],
                  function (ctx, ref) {
                      var a = ref[0];
                      var b = ref[1];
                      return a.evaluate(ctx) && b.evaluate(ctx);
                  }
              ],
              [
                  varargs(BooleanType),
                  function (ctx, args) {
                      for (var i = 0, list = args; i < list.length; i += 1) {
                          var arg = list[i];
                          if (!arg.evaluate(ctx)) {
                              return false;
                          }
                      }
                      return true;
                  }
              ]
          ]
      },
      'any': {
          type: BooleanType,
          overloads: [
              [
                  [
                      BooleanType,
                      BooleanType
                  ],
                  function (ctx, ref) {
                      var a = ref[0];
                      var b = ref[1];
                      return a.evaluate(ctx) || b.evaluate(ctx);
                  }
              ],
              [
                  varargs(BooleanType),
                  function (ctx, args) {
                      for (var i = 0, list = args; i < list.length; i += 1) {
                          var arg = list[i];
                          if (arg.evaluate(ctx)) {
                              return true;
                          }
                      }
                      return false;
                  }
              ]
          ]
      },
      '!': [
          BooleanType,
          [BooleanType],
          function (ctx, ref) {
              var b = ref[0];
              return !b.evaluate(ctx);
          }
      ],
      'is-supported-script': [
          BooleanType,
          [StringType],
          function (ctx, ref) {
              var s = ref[0];
              var isSupportedScript = ctx.globals && ctx.globals.isSupportedScript;
              if (isSupportedScript) {
                  return isSupportedScript(s.evaluate(ctx));
              }
              return true;
          }
      ],
      'upcase': [
          StringType,
          [StringType],
          function (ctx, ref) {
              var s = ref[0];
              return s.evaluate(ctx).toUpperCase();
          }
      ],
      'downcase': [
          StringType,
          [StringType],
          function (ctx, ref) {
              var s = ref[0];
              return s.evaluate(ctx).toLowerCase();
          }
      ],
      'concat': [
          StringType,
          varargs(ValueType),
          function (ctx, args) {
              return args.map(function (arg) {
                  return toString$1(arg.evaluate(ctx));
              }).join('');
          }
      ],
      'resolved-locale': [
          StringType,
          [CollatorType],
          function (ctx, ref) {
              var collator = ref[0];
              return collator.evaluate(ctx).resolvedLocale();
          }
      ]
  });

  function success(value) {
      return {
          result: 'success',
          value: value
      };
  }
  function error(value) {
      return {
          result: 'error',
          value: value
      };
  }

  function supportsPropertyExpression(spec) {
      return spec['property-type'] === 'data-driven' || spec['property-type'] === 'cross-faded-data-driven';
  }
  function supportsZoomExpression(spec) {
      return !!spec.expression && spec.expression.parameters.indexOf('zoom') > -1;
  }
  function supportsInterpolation(spec) {
      return !!spec.expression && spec.expression.interpolated;
  }

  function getType(val) {
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
          return typeof val;
      }
  }

  function isFunction$1(value) {
      return typeof value === 'object' && value !== null && !Array.isArray(value);
  }
  function identityFunction(x) {
      return x;
  }
  function createFunction(parameters, propertySpec) {
      var isColor = propertySpec.type === 'color';
      var zoomAndFeatureDependent = parameters.stops && typeof parameters.stops[0][0] === 'object';
      var featureDependent = zoomAndFeatureDependent || parameters.property !== undefined;
      var zoomDependent = zoomAndFeatureDependent || !featureDependent;
      var type = parameters.type || (supportsInterpolation(propertySpec) ? 'exponential' : 'interval');
      if (isColor) {
          parameters = extend({}, parameters);
          if (parameters.stops) {
              parameters.stops = parameters.stops.map(function (stop) {
                  return [
                      stop[0],
                      Color.parse(stop[1])
                  ];
              });
          }
          if (parameters.default) {
              parameters.default = Color.parse(parameters.default);
          } else {
              parameters.default = Color.parse(propertySpec.default);
          }
      }
      if (parameters.colorSpace && parameters.colorSpace !== 'rgb' && !colorSpaces[parameters.colorSpace]) {
          throw new Error('Unknown color space: ' + parameters.colorSpace);
      }
      var innerFun;
      var hashedStops;
      var categoricalKeyType;
      if (type === 'exponential') {
          innerFun = evaluateExponentialFunction;
      } else if (type === 'interval') {
          innerFun = evaluateIntervalFunction;
      } else if (type === 'categorical') {
          innerFun = evaluateCategoricalFunction;
          hashedStops = Object.create(null);
          for (var i = 0, list = parameters.stops; i < list.length; i += 1) {
              var stop = list[i];
              hashedStops[stop[0]] = stop[1];
          }
          categoricalKeyType = typeof parameters.stops[0][0];
      } else if (type === 'identity') {
          innerFun = evaluateIdentityFunction;
      } else {
          throw new Error('Unknown function type "' + type + '"');
      }
      if (zoomAndFeatureDependent) {
          var featureFunctions = {};
          var zoomStops = [];
          for (var s = 0; s < parameters.stops.length; s++) {
              var stop$1 = parameters.stops[s];
              var zoom = stop$1[0].zoom;
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
              featureFunctions[zoom].stops.push([
                  stop$1[0].value,
                  stop$1[1]
              ]);
          }
          var featureFunctionStops = [];
          for (var i$1 = 0, list$1 = zoomStops; i$1 < list$1.length; i$1 += 1) {
              var z = list$1[i$1];
              featureFunctionStops.push([
                  featureFunctions[z].zoom,
                  createFunction(featureFunctions[z], propertySpec)
              ]);
          }
          return {
              kind: 'composite',
              interpolationFactor: Interpolate.interpolationFactor.bind(undefined, { name: 'linear' }),
              zoomStops: featureFunctionStops.map(function (s) {
                  return s[0];
              }),
              evaluate: function evaluate(ref, properties) {
                  var zoom = ref.zoom;
                  return evaluateExponentialFunction({
                      stops: featureFunctionStops,
                      base: parameters.base
                  }, propertySpec, zoom).evaluate(zoom, properties);
              }
          };
      } else if (zoomDependent) {
          return {
              kind: 'camera',
              interpolationFactor: type === 'exponential' ? Interpolate.interpolationFactor.bind(undefined, {
                  name: 'exponential',
                  base: parameters.base !== undefined ? parameters.base : 1
              }) : function () {
                  return 0;
              },
              zoomStops: parameters.stops.map(function (s) {
                  return s[0];
              }),
              evaluate: function (ref) {
                  var zoom = ref.zoom;
                  return innerFun(parameters, propertySpec, zoom, hashedStops, categoricalKeyType);
              }
          };
      } else {
          return {
              kind: 'source',
              evaluate: function evaluate(_, feature) {
                  var value = feature && feature.properties ? feature.properties[parameters.property] : undefined;
                  if (value === undefined) {
                      return coalesce(parameters.default, propertySpec.default);
                  }
                  return innerFun(parameters, propertySpec, value, hashedStops, categoricalKeyType);
              }
          };
      }
  }
  function coalesce(a, b, c) {
      if (a !== undefined) {
          return a;
      }
      if (b !== undefined) {
          return b;
      }
      if (c !== undefined) {
          return c;
      }
  }
  function evaluateCategoricalFunction(parameters, propertySpec, input, hashedStops, keyType) {
      var evaluated = typeof input === keyType ? hashedStops[input] : undefined;
      return coalesce(evaluated, parameters.default, propertySpec.default);
  }
  function evaluateIntervalFunction(parameters, propertySpec, input) {
      if (getType(input) !== 'number') {
          return coalesce(parameters.default, propertySpec.default);
      }
      var n = parameters.stops.length;
      if (n === 1) {
          return parameters.stops[0][1];
      }
      if (input <= parameters.stops[0][0]) {
          return parameters.stops[0][1];
      }
      if (input >= parameters.stops[n - 1][0]) {
          return parameters.stops[n - 1][1];
      }
      var index = findStopLessThanOrEqualTo$1(parameters.stops, input);
      return parameters.stops[index][1];
  }
  function evaluateExponentialFunction(parameters, propertySpec, input) {
      var base = parameters.base !== undefined ? parameters.base : 1;
      if (getType(input) !== 'number') {
          return coalesce(parameters.default, propertySpec.default);
      }
      var n = parameters.stops.length;
      if (n === 1) {
          return parameters.stops[0][1];
      }
      if (input <= parameters.stops[0][0]) {
          return parameters.stops[0][1];
      }
      if (input >= parameters.stops[n - 1][0]) {
          return parameters.stops[n - 1][1];
      }
      var index = findStopLessThanOrEqualTo$1(parameters.stops, input);
      var t = interpolationFactor(input, base, parameters.stops[index][0], parameters.stops[index + 1][0]);
      var outputLower = parameters.stops[index][1];
      var outputUpper = parameters.stops[index + 1][1];
      var interp = interpolate[propertySpec.type] || identityFunction;
      if (parameters.colorSpace && parameters.colorSpace !== 'rgb') {
          var colorspace = colorSpaces[parameters.colorSpace];
          interp = function (a, b) {
              return colorspace.reverse(colorspace.interpolate(colorspace.forward(a), colorspace.forward(b), t));
          };
      }
      if (typeof outputLower.evaluate === 'function') {
          return {
              evaluate: function evaluate() {
                  var arguments$1 = arguments;

                  var args = [], len = arguments.length;
                  while (len--)
                      { args[len] = arguments$1[len]; }
                  var evaluatedLower = outputLower.evaluate.apply(undefined, args);
                  var evaluatedUpper = outputUpper.evaluate.apply(undefined, args);
                  if (evaluatedLower === undefined || evaluatedUpper === undefined) {
                      return undefined;
                  }
                  return interp(evaluatedLower, evaluatedUpper, t);
              }
          };
      }
      return interp(outputLower, outputUpper, t);
  }
  function evaluateIdentityFunction(parameters, propertySpec, input) {
      if (propertySpec.type === 'color') {
          input = Color.parse(input);
      } else if (propertySpec.type === 'formatted') {
          input = Formatted.fromString(input.toString());
      } else if (getType(input) !== propertySpec.type && (propertySpec.type !== 'enum' || !propertySpec.values[input])) {
          input = undefined;
      }
      return coalesce(input, parameters.default, propertySpec.default);
  }
  function findStopLessThanOrEqualTo$1(stops, input) {
      var n = stops.length;
      var lowerIndex = 0;
      var upperIndex = n - 1;
      var currentIndex = 0;
      var currentValue, upperValue;
      while (lowerIndex <= upperIndex) {
          currentIndex = Math.floor((lowerIndex + upperIndex) / 2);
          currentValue = stops[currentIndex][0];
          upperValue = stops[currentIndex + 1][0];
          if (input === currentValue || input > currentValue && input < upperValue) {
              return currentIndex;
          } else if (currentValue < input) {
              lowerIndex = currentIndex + 1;
          } else if (currentValue > input) {
              upperIndex = currentIndex - 1;
          }
      }
      return Math.max(currentIndex - 1, 0);
  }
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

  var StyleExpression = function StyleExpression(expression, propertySpec) {
      this.expression = expression;
      this._warningHistory = {};
      this._evaluator = new EvaluationContext();
      this._defaultValue = propertySpec ? getDefaultValue(propertySpec) : null;
      this._enumValues = propertySpec && propertySpec.type === 'enum' ? propertySpec.values : null;
  };
  StyleExpression.prototype.evaluateWithoutErrorHandling = function evaluateWithoutErrorHandling(globals, feature, featureState) {
      this._evaluator.globals = globals;
      this._evaluator.feature = feature;
      this._evaluator.featureState = featureState;
      return this.expression.evaluate(this._evaluator);
  };
  StyleExpression.prototype.evaluate = function evaluate(globals, feature, featureState) {
      this._evaluator.globals = globals;
      this._evaluator.feature = feature || null;
      this._evaluator.featureState = featureState || null;
      try {
          var val = this.expression.evaluate(this._evaluator);
          if (val === null || val === undefined) {
              return this._defaultValue;
          }
          if (this._enumValues && !(val in this._enumValues)) {
              throw new RuntimeError('Expected value to be one of ' + Object.keys(this._enumValues).map(function (v) {
                  return JSON.stringify(v);
              }).join(', ') + ', but found ' + JSON.stringify(val) + ' instead.');
          }
          return val;
      } catch (e) {
          if (!this._warningHistory[e.message]) {
              this._warningHistory[e.message] = true;
              if (typeof console !== 'undefined') {
                  console.warn(e.message);
              }
          }
          return this._defaultValue;
      }
  };
  function isExpression(expression) {
      return Array.isArray(expression) && expression.length > 0 && typeof expression[0] === 'string' && expression[0] in expressions;
  }
  function createExpression(expression, propertySpec) {
      var parser = new ParsingContext(expressions, [], propertySpec ? getExpectedType(propertySpec) : undefined);
      var parsed = parser.parse(expression, undefined, undefined, undefined, propertySpec && propertySpec.type === 'string' ? { typeAnnotation: 'coerce' } : undefined);
      if (!parsed) {
          return error(parser.errors);
      }
      return success(new StyleExpression(parsed, propertySpec));
  }
  var ZoomConstantExpression = function ZoomConstantExpression(kind, expression) {
      this.kind = kind;
      this._styleExpression = expression;
      this.isStateDependent = kind !== 'constant' && !isStateConstant(expression.expression);
  };
  ZoomConstantExpression.prototype.evaluateWithoutErrorHandling = function evaluateWithoutErrorHandling(globals, feature, featureState) {
      return this._styleExpression.evaluateWithoutErrorHandling(globals, feature, featureState);
  };
  ZoomConstantExpression.prototype.evaluate = function evaluate(globals, feature, featureState) {
      return this._styleExpression.evaluate(globals, feature, featureState);
  };
  var ZoomDependentExpression = function ZoomDependentExpression(kind, expression, zoomCurve) {
      this.kind = kind;
      this.zoomStops = zoomCurve.labels;
      this._styleExpression = expression;
      this.isStateDependent = kind !== 'camera' && !isStateConstant(expression.expression);
      if (zoomCurve instanceof Interpolate) {
          this._interpolationType = zoomCurve.interpolation;
      }
  };
  ZoomDependentExpression.prototype.evaluateWithoutErrorHandling = function evaluateWithoutErrorHandling(globals, feature, featureState) {
      return this._styleExpression.evaluateWithoutErrorHandling(globals, feature, featureState);
  };
  ZoomDependentExpression.prototype.evaluate = function evaluate(globals, feature, featureState) {
      return this._styleExpression.evaluate(globals, feature, featureState);
  };
  ZoomDependentExpression.prototype.interpolationFactor = function interpolationFactor(input, lower, upper) {
      if (this._interpolationType) {
          return Interpolate.interpolationFactor(this._interpolationType, input, lower, upper);
      } else {
          return 0;
      }
  };
  function createPropertyExpression(expression, propertySpec) {
      expression = createExpression(expression, propertySpec);
      if (expression.result === 'error') {
          return expression;
      }
      var parsed = expression.value.expression;
      var isFeatureConstant$$1 = isFeatureConstant(parsed);
      if (!isFeatureConstant$$1 && !supportsPropertyExpression(propertySpec)) {
          return error([new ParsingError('', 'data expressions not supported')]);
      }
      var isZoomConstant = isGlobalPropertyConstant(parsed, ['zoom']);
      if (!isZoomConstant && !supportsZoomExpression(propertySpec)) {
          return error([new ParsingError('', 'zoom expressions not supported')]);
      }
      var zoomCurve = findZoomCurve(parsed);
      if (!zoomCurve && !isZoomConstant) {
          return error([new ParsingError('', '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')]);
      } else if (zoomCurve instanceof ParsingError) {
          return error([zoomCurve]);
      } else if (zoomCurve instanceof Interpolate && !supportsInterpolation(propertySpec)) {
          return error([new ParsingError('', '"interpolate" expressions cannot be used with this property')]);
      }
      if (!zoomCurve) {
          return success(isFeatureConstant$$1 ? new ZoomConstantExpression('constant', expression.value) : new ZoomConstantExpression('source', expression.value));
      }
      return success(isFeatureConstant$$1 ? new ZoomDependentExpression('camera', expression.value, zoomCurve) : new ZoomDependentExpression('composite', expression.value, zoomCurve));
  }
  var StylePropertyFunction = function StylePropertyFunction(parameters, specification) {
      this._parameters = parameters;
      this._specification = specification;
      extend(this, createFunction(this._parameters, this._specification));
  };
  StylePropertyFunction.deserialize = function deserialize(serialized) {
      return new StylePropertyFunction(serialized._parameters, serialized._specification);
  };
  StylePropertyFunction.serialize = function serialize(input) {
      return {
          _parameters: input._parameters,
          _specification: input._specification
      };
  };
  function normalizePropertyExpression(value, specification) {
      if (isFunction$1(value)) {
          return new StylePropertyFunction(value, specification);
      } else if (isExpression(value)) {
          var expression = createPropertyExpression(value, specification);
          if (expression.result === 'error') {
              throw new Error(expression.value.map(function (err) {
                  return err.key + ': ' + err.message;
              }).join(', '));
          }
          return expression.value;
      } else {
          var constant = value;
          if (typeof value === 'string' && specification.type === 'color') {
              constant = Color.parse(value);
          }
          return {
              kind: 'constant',
              evaluate: function () {
                  return constant;
              }
          };
      }
  }
  function findZoomCurve(expression) {
      var result = null;
      if (expression instanceof Let) {
          result = findZoomCurve(expression.result);
      } else if (expression instanceof Coalesce) {
          for (var i = 0, list = expression.args; i < list.length; i += 1) {
              var arg = list[i];
              result = findZoomCurve(arg);
              if (result) {
                  break;
              }
          }
      } else if ((expression instanceof Step || expression instanceof Interpolate) && expression.input instanceof CompoundExpression && expression.input.name === 'zoom') {
          result = expression;
      }
      if (result instanceof ParsingError) {
          return result;
      }
      expression.eachChild(function (child) {
          var childResult = findZoomCurve(child);
          if (childResult instanceof ParsingError) {
              result = childResult;
          } else if (!result && childResult) {
              result = new ParsingError('', '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.');
          } else if (result && childResult && result !== childResult) {
              result = new ParsingError('', 'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.');
          }
      });
      return result;
  }
  function getExpectedType(spec) {
      var types = {
          color: ColorType,
          string: StringType,
          number: NumberType,
          enum: StringType,
          boolean: BooleanType,
          formatted: FormattedType
      };
      if (spec.type === 'array') {
          return array(types[spec.value] || ValueType, spec.length);
      }
      return types[spec.type];
  }
  function getDefaultValue(spec) {
      if (spec.type === 'color' && isFunction$1(spec.default)) {
          return new Color(0, 0, 0, 0);
      } else if (spec.type === 'color') {
          return Color.parse(spec.default) || null;
      } else if (spec.default === undefined) {
          return null;
      } else {
          return spec.default;
      }
  }

  function convertLiteral(value) {
      return typeof value === 'object' ? [
          'literal',
          value
      ] : value;
  }
  function convertFunction(parameters, propertySpec) {
      var stops = parameters.stops;
      if (!stops) {
          return convertIdentityFunction(parameters, propertySpec);
      }
      var zoomAndFeatureDependent = stops && typeof stops[0][0] === 'object';
      var featureDependent = zoomAndFeatureDependent || parameters.property !== undefined;
      var zoomDependent = zoomAndFeatureDependent || !featureDependent;
      stops = stops.map(function (stop) {
          if (!featureDependent && propertySpec.tokens && typeof stop[1] === 'string') {
              return [
                  stop[0],
                  convertTokenString(stop[1])
              ];
          }
          return [
              stop[0],
              convertLiteral(stop[1])
          ];
      });
      if (zoomAndFeatureDependent) {
          return convertZoomAndPropertyFunction(parameters, propertySpec, stops);
      } else if (zoomDependent) {
          return convertZoomFunction(parameters, propertySpec, stops);
      } else {
          return convertPropertyFunction(parameters, propertySpec, stops);
      }
  }
  function convertIdentityFunction(parameters, propertySpec) {
      var get = [
          'get',
          parameters.property
      ];
      if (parameters.default === undefined) {
          return propertySpec.type === 'string' ? [
              'string',
              get
          ] : get;
      } else if (propertySpec.type === 'enum') {
          return [
              'match',
              get,
              Object.keys(propertySpec.values),
              get,
              parameters.default
          ];
      } else {
          var expression = [
              propertySpec.type === 'color' ? 'to-color' : propertySpec.type,
              get,
              convertLiteral(parameters.default)
          ];
          if (propertySpec.type === 'array') {
              expression.splice(1, 0, propertySpec.value, propertySpec.length || null);
          }
          return expression;
      }
  }
  function getInterpolateOperator(parameters) {
      switch (parameters.colorSpace) {
      case 'hcl':
          return 'interpolate-hcl';
      case 'lab':
          return 'interpolate-lab';
      default:
          return 'interpolate';
      }
  }
  function convertZoomAndPropertyFunction(parameters, propertySpec, stops) {
      var featureFunctionParameters = {};
      var featureFunctionStops = {};
      var zoomStops = [];
      for (var s = 0; s < stops.length; s++) {
          var stop = stops[s];
          var zoom = stop[0].zoom;
          if (featureFunctionParameters[zoom] === undefined) {
              featureFunctionParameters[zoom] = {
                  zoom: zoom,
                  type: parameters.type,
                  property: parameters.property,
                  default: parameters.default
              };
              featureFunctionStops[zoom] = [];
              zoomStops.push(zoom);
          }
          featureFunctionStops[zoom].push([
              stop[0].value,
              stop[1]
          ]);
      }
      var functionType = getFunctionType({}, propertySpec);
      if (functionType === 'exponential') {
          var expression = [
              getInterpolateOperator(parameters),
              ['linear'],
              ['zoom']
          ];
          for (var i = 0, list = zoomStops; i < list.length; i += 1) {
              var z = list[i];
              var output = convertPropertyFunction(featureFunctionParameters[z], propertySpec, featureFunctionStops[z]);
              appendStopPair(expression, z, output, false);
          }
          return expression;
      } else {
          var expression$1 = [
              'step',
              ['zoom']
          ];
          for (var i$1 = 0, list$1 = zoomStops; i$1 < list$1.length; i$1 += 1) {
              var z$1 = list$1[i$1];
              var output$1 = convertPropertyFunction(featureFunctionParameters[z$1], propertySpec, featureFunctionStops[z$1]);
              appendStopPair(expression$1, z$1, output$1, true);
          }
          fixupDegenerateStepCurve(expression$1);
          return expression$1;
      }
  }
  function coalesce$1(a, b) {
      if (a !== undefined) {
          return a;
      }
      if (b !== undefined) {
          return b;
      }
  }
  function convertPropertyFunction(parameters, propertySpec, stops) {
      var type = getFunctionType(parameters, propertySpec);
      var get = [
          'get',
          parameters.property
      ];
      if (type === 'categorical' && typeof stops[0][0] === 'boolean') {
          var expression = ['case'];
          for (var i = 0, list = stops; i < list.length; i += 1) {
              var stop = list[i];
              expression.push([
                  '==',
                  get,
                  stop[0]
              ], stop[1]);
          }
          expression.push(convertLiteral(coalesce$1(parameters.default, propertySpec.default)));
          return expression;
      } else if (type === 'categorical') {
          var expression$1 = [
              'match',
              get
          ];
          for (var i$1 = 0, list$1 = stops; i$1 < list$1.length; i$1 += 1) {
              var stop$1 = list$1[i$1];
              appendStopPair(expression$1, stop$1[0], stop$1[1], false);
          }
          expression$1.push(convertLiteral(coalesce$1(parameters.default, propertySpec.default)));
          return expression$1;
      } else if (type === 'interval') {
          var expression$2 = [
              'step',
              [
                  'number',
                  get
              ]
          ];
          for (var i$2 = 0, list$2 = stops; i$2 < list$2.length; i$2 += 1) {
              var stop$2 = list$2[i$2];
              appendStopPair(expression$2, stop$2[0], stop$2[1], true);
          }
          fixupDegenerateStepCurve(expression$2);
          return parameters.default === undefined ? expression$2 : [
              'case',
              [
                  '==',
                  [
                      'typeof',
                      get
                  ],
                  'number'
              ],
              expression$2,
              convertLiteral(parameters.default)
          ];
      } else if (type === 'exponential') {
          var base = parameters.base !== undefined ? parameters.base : 1;
          var expression$3 = [
              getInterpolateOperator(parameters),
              [
                  'exponential',
                  base
              ],
              [
                  'number',
                  get
              ]
          ];
          for (var i$3 = 0, list$3 = stops; i$3 < list$3.length; i$3 += 1) {
              var stop$3 = list$3[i$3];
              appendStopPair(expression$3, stop$3[0], stop$3[1], false);
          }
          return parameters.default === undefined ? expression$3 : [
              'case',
              [
                  '==',
                  [
                      'typeof',
                      get
                  ],
                  'number'
              ],
              expression$3,
              convertLiteral(parameters.default)
          ];
      } else {
          throw new Error('Unknown property function type ' + type);
      }
  }
  function convertZoomFunction(parameters, propertySpec, stops, input) {
      if (input === void 0)
          { input = ['zoom']; }
      var type = getFunctionType(parameters, propertySpec);
      var expression;
      var isStep = false;
      if (type === 'interval') {
          expression = [
              'step',
              input
          ];
          isStep = true;
      } else if (type === 'exponential') {
          var base = parameters.base !== undefined ? parameters.base : 1;
          expression = [
              getInterpolateOperator(parameters),
              [
                  'exponential',
                  base
              ],
              input
          ];
      } else {
          throw new Error('Unknown zoom function type "' + type + '"');
      }
      for (var i = 0, list = stops; i < list.length; i += 1) {
          var stop = list[i];
          appendStopPair(expression, stop[0], stop[1], isStep);
      }
      fixupDegenerateStepCurve(expression);
      return expression;
  }
  function fixupDegenerateStepCurve(expression) {
      if (expression[0] === 'step' && expression.length === 3) {
          expression.push(0);
          expression.push(expression[3]);
      }
  }
  function appendStopPair(curve, input, output, isStep) {
      if (curve.length > 3 && input === curve[curve.length - 2]) {
          return;
      }
      if (!(isStep && curve.length === 2)) {
          curve.push(input);
      }
      curve.push(output);
  }
  function getFunctionType(parameters, propertySpec) {
      if (parameters.type) {
          return parameters.type;
      } else {
          return propertySpec.expression.interpolated ? 'exponential' : 'interval';
      }
  }
  function convertTokenString(s) {
      var result = ['concat'];
      var re = /{([^{}]+)}/g;
      var pos = 0;
      for (var match = re.exec(s); match !== null; match = re.exec(s)) {
          var literal = s.slice(pos, re.lastIndex - match[0].length);
          pos = re.lastIndex;
          if (literal.length > 0) {
              result.push(literal);
          }
          result.push([
              'get',
              match[1]
          ]);
      }
      if (result.length === 1) {
          return s;
      }
      if (pos < s.length) {
          result.push(s.slice(pos));
      } else if (result.length === 2) {
          return [
              'to-string',
              result[1]
          ];
      }
      return result;
  }

  function isExpressionFilter(filter) {
      if (filter === true || filter === false) {
          return true;
      }
      if (!Array.isArray(filter) || filter.length === 0) {
          return false;
      }
      switch (filter[0]) {
      case 'has':
          return filter.length >= 2 && filter[1] !== '$id' && filter[1] !== '$type';
      case 'in':
      case '!in':
      case '!has':
      case 'none':
          return false;
      case '==':
      case '!=':
      case '>':
      case '>=':
      case '<':
      case '<=':
          return filter.length !== 3 || (Array.isArray(filter[1]) || Array.isArray(filter[2]));
      case 'any':
      case 'all':
          for (var i = 0, list = filter.slice(1); i < list.length; i += 1) {
              var f = list[i];
              if (!isExpressionFilter(f) && typeof f !== 'boolean') {
                  return false;
              }
          }
          return true;
      default:
          return true;
      }
  }
  var filterSpec = {
      'type': 'boolean',
      'default': false,
      'transition': false,
      'property-type': 'data-driven',
      'expression': {
          'interpolated': false,
          'parameters': [
              'zoom',
              'feature'
          ]
      }
  };
  function createFilter(filter) {
      if (filter === null || filter === undefined) {
          return function () {
              return true;
          };
      }
      if (!isExpressionFilter(filter)) {
          filter = convertFilter(filter);
      }
      var compiled = createExpression(filter, filterSpec);
      if (compiled.result === 'error') {
          throw new Error(compiled.value.map(function (err) {
              return err.key + ': ' + err.message;
          }).join(', '));
      } else {
          return function (globalProperties, feature) {
              return compiled.value.evaluate(globalProperties, feature);
          };
      }
  }
  function compare(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
  }
  function convertFilter(filter) {
      if (!filter) {
          return true;
      }
      var op = filter[0];
      if (filter.length <= 1) {
          return op !== 'any';
      }
      var converted = op === '==' ? convertComparisonOp(filter[1], filter[2], '==') : op === '!=' ? convertNegation(convertComparisonOp(filter[1], filter[2], '==')) : op === '<' || op === '>' || op === '<=' || op === '>=' ? convertComparisonOp(filter[1], filter[2], op) : op === 'any' ? convertDisjunctionOp(filter.slice(1)) : op === 'all' ? ['all'].concat(filter.slice(1).map(convertFilter)) : op === 'none' ? ['all'].concat(filter.slice(1).map(convertFilter).map(convertNegation)) : op === 'in' ? convertInOp(filter[1], filter.slice(2)) : op === '!in' ? convertNegation(convertInOp(filter[1], filter.slice(2))) : op === 'has' ? convertHasOp(filter[1]) : op === '!has' ? convertNegation(convertHasOp(filter[1])) : true;
      return converted;
  }
  function convertComparisonOp(property, value, op) {
      switch (property) {
      case '$type':
          return [
              'filter-type-' + op,
              value
          ];
      case '$id':
          return [
              'filter-id-' + op,
              value
          ];
      default:
          return [
              'filter-' + op,
              property,
              value
          ];
      }
  }
  function convertDisjunctionOp(filters) {
      return ['any'].concat(filters.map(convertFilter));
  }
  function convertInOp(property, values) {
      if (values.length === 0) {
          return false;
      }
      switch (property) {
      case '$type':
          return [
              'filter-type-in',
              [
                  'literal',
                  values
              ]
          ];
      case '$id':
          return [
              'filter-id-in',
              [
                  'literal',
                  values
              ]
          ];
      default:
          if (values.length > 200 && !values.some(function (v) {
                  return typeof v !== typeof values[0];
              })) {
              return [
                  'filter-in-large',
                  property,
                  [
                      'literal',
                      values.sort(compare)
                  ]
              ];
          } else {
              return [
                  'filter-in-small',
                  property,
                  [
                      'literal',
                      values
                  ]
              ];
          }
      }
  }
  function convertHasOp(property) {
      switch (property) {
      case '$type':
          return true;
      case '$id':
          return ['filter-has-id'];
      default:
          return [
              'filter-has',
              property
          ];
      }
  }
  function convertNegation(filter) {
      return [
          '!',
          filter
      ];
  }

  function convertFilter$1(filter) {
      return _convertFilter(filter, {});
  }
  function _convertFilter(filter, expectedTypes) {
      var ref$1;
      if (isExpressionFilter(filter)) {
          return filter;
      }
      if (!filter) {
          return true;
      }
      var op = filter[0];
      if (filter.length <= 1) {
          return op !== 'any';
      }
      var converted;
      if (op === '==' || op === '!=' || op === '<' || op === '>' || op === '<=' || op === '>=') {
          var ref = filter;
          var property = ref[1];
          var value = ref[2];
          converted = convertComparisonOp$1(property, value, op, expectedTypes);
      } else if (op === 'any') {
          var children = filter.slice(1).map(function (f) {
              var types = {};
              var child = _convertFilter(f, types);
              var typechecks = runtimeTypeChecks(types);
              return typechecks === true ? child : [
                  'case',
                  typechecks,
                  child,
                  false
              ];
          });
          return ['any'].concat(children);
      } else if (op === 'all') {
          var children$1 = filter.slice(1).map(function (f) {
              return _convertFilter(f, expectedTypes);
          });
          return children$1.length > 1 ? ['all'].concat(children$1) : (ref$1 = []).concat.apply(ref$1, children$1);
      } else if (op === 'none') {
          return [
              '!',
              _convertFilter(['any'].concat(filter.slice(1)), {})
          ];
      } else if (op === 'in') {
          converted = convertInOp$1(filter[1], filter.slice(2));
      } else if (op === '!in') {
          converted = convertInOp$1(filter[1], filter.slice(2), true);
      } else if (op === 'has') {
          converted = convertHasOp$1(filter[1]);
      } else if (op === '!has') {
          converted = [
              '!',
              convertHasOp$1(filter[1])
          ];
      } else {
          converted = true;
      }
      return converted;
  }
  function runtimeTypeChecks(expectedTypes) {
      var conditions = [];
      for (var property in expectedTypes) {
          var get = property === '$id' ? ['id'] : [
              'get',
              property
          ];
          conditions.push([
              '==',
              [
                  'typeof',
                  get
              ],
              expectedTypes[property]
          ]);
      }
      if (conditions.length === 0) {
          return true;
      }
      if (conditions.length === 1) {
          return conditions[0];
      }
      return ['all'].concat(conditions);
  }
  function convertComparisonOp$1(property, value, op, expectedTypes) {
      var get;
      if (property === '$type') {
          return [
              op,
              ['geometry-type'],
              value
          ];
      } else if (property === '$id') {
          get = ['id'];
      } else {
          get = [
              'get',
              property
          ];
      }
      if (expectedTypes && value !== null) {
          var type = typeof value;
          expectedTypes[property] = type;
      }
      if (op === '==' && property !== '$id' && value === null) {
          return [
              'all',
              [
                  'has',
                  property
              ],
              [
                  '==',
                  get,
                  null
              ]
          ];
      } else if (op === '!=' && property !== '$id' && value === null) {
          return [
              'any',
              [
                  '!',
                  [
                      'has',
                      property
                  ]
              ],
              [
                  '!=',
                  get,
                  null
              ]
          ];
      }
      return [
          op,
          get,
          value
      ];
  }
  function convertInOp$1(property, values, negate) {
      if (negate === void 0)
          { negate = false; }
      if (values.length === 0) {
          return negate;
      }
      var get;
      if (property === '$type') {
          get = ['geometry-type'];
      } else if (property === '$id') {
          get = ['id'];
      } else {
          get = [
              'get',
              property
          ];
      }
      var uniformTypes = true;
      var type = typeof values[0];
      for (var i = 0, list = values; i < list.length; i += 1) {
          var value = list[i];
          if (typeof value !== type) {
              uniformTypes = false;
              break;
          }
      }
      if (uniformTypes && (type === 'string' || type === 'number')) {
          return [
              'match',
              get,
              values,
              !negate,
              negate
          ];
      }
      return [negate ? 'all' : 'any'].concat(values.map(function (v) {
          return [
              negate ? '!=' : '==',
              get,
              v
          ];
      }));
  }
  function convertHasOp$1(property) {
      if (property === '$type') {
          return true;
      } else if (property === '$id') {
          return [
              '!=',
              ['id'],
              null
          ];
      } else {
          return [
              'has',
              property
          ];
      }
  }

  function migrateToExpressions (style) {
      var converted = [];
      eachLayer(style, function (layer) {
          if (layer.filter) {
              layer.filter = convertFilter$1(layer.filter);
          }
      });
      eachProperty(style, {
          paint: true,
          layout: true
      }, function (ref) {
          var path = ref.path;
          var value = ref.value;
          var reference = ref.reference;
          var set = ref.set;
          if (isExpression(value)) {
              return;
          }
          if (typeof value === 'object' && !Array.isArray(value)) {
              set(convertFunction(value, reference));
              converted.push(path.join('.'));
          } else if (reference.tokens && typeof value === 'string') {
              set(convertTokenString(value));
          }
      });
      return style;
  }

  function migrate (style) {
      var migrated = false;
      if (style.version === 7) {
          style = migrateToV8(style);
          migrated = true;
      }
      if (style.version === 8) {
          migrated = migrateToExpressions(style);
          migrated = true;
      }
      if (!migrated) {
          throw new Error('cannot migrate from', style.version);
      }
      return style;
  }

  function composite (style) {
      var styleIDs = [];
      var sourceIDs = [];
      var compositedSourceLayers = [];
      for (var id in style.sources) {
          var source = style.sources[id];
          if (source.type !== 'vector') {
              continue;
          }
          var match = /^mapbox:\/\/(.*)/.exec(source.url);
          if (!match) {
              continue;
          }
          styleIDs.push(id);
          sourceIDs.push(match[1]);
      }
      if (styleIDs.length < 2) {
          return style;
      }
      styleIDs.forEach(function (id) {
          delete style.sources[id];
      });
      var compositeID = sourceIDs.join(',');
      style.sources[compositeID] = {
          'type': 'vector',
          'url': 'mapbox://' + compositeID
      };
      style.layers.forEach(function (layer) {
          if (styleIDs.indexOf(layer.source) >= 0) {
              layer.source = compositeID;
              if ('source-layer' in layer) {
                  if (compositedSourceLayers.indexOf(layer['source-layer']) >= 0) {
                      throw new Error('Conflicting source layer names');
                  } else {
                      compositedSourceLayers.push(layer['source-layer']);
                  }
              }
          }
      });
      return style;
  }

  function deepEqual(a, b) {
      if (Array.isArray(a)) {
          if (!Array.isArray(b) || a.length !== b.length) {
              return false;
          }
          for (var i = 0; i < a.length; i++) {
              if (!deepEqual(a[i], b[i])) {
                  return false;
              }
          }
          return true;
      }
      if (typeof a === 'object' && a !== null && b !== null) {
          if (!(typeof b === 'object')) {
              return false;
          }
          var keys = Object.keys(a);
          if (keys.length !== Object.keys(b).length) {
              return false;
          }
          for (var key in a) {
              if (!deepEqual(a[key], b[key])) {
                  return false;
              }
          }
          return true;
      }
      return a === b;
  }

  var operations = {
      setStyle: 'setStyle',
      addLayer: 'addLayer',
      removeLayer: 'removeLayer',
      setPaintProperty: 'setPaintProperty',
      setLayoutProperty: 'setLayoutProperty',
      setFilter: 'setFilter',
      addSource: 'addSource',
      removeSource: 'removeSource',
      setGeoJSONSourceData: 'setGeoJSONSourceData',
      setLayerZoomRange: 'setLayerZoomRange',
      setLayerProperty: 'setLayerProperty',
      setCenter: 'setCenter',
      setZoom: 'setZoom',
      setBearing: 'setBearing',
      setPitch: 'setPitch',
      setSprite: 'setSprite',
      setGlyphs: 'setGlyphs',
      setTransition: 'setTransition',
      setLight: 'setLight'
  };
  function addSource(sourceId, after, commands) {
      commands.push({
          command: operations.addSource,
          args: [
              sourceId,
              after[sourceId]
          ]
      });
  }
  function removeSource(sourceId, commands, sourcesRemoved) {
      commands.push({
          command: operations.removeSource,
          args: [sourceId]
      });
      sourcesRemoved[sourceId] = true;
  }
  function updateSource(sourceId, after, commands, sourcesRemoved) {
      removeSource(sourceId, commands, sourcesRemoved);
      addSource(sourceId, after, commands);
  }
  function canUpdateGeoJSON(before, after, sourceId) {
      var prop;
      for (prop in before[sourceId]) {
          if (!before[sourceId].hasOwnProperty(prop)) {
              continue;
          }
          if (prop !== 'data' && !deepEqual(before[sourceId][prop], after[sourceId][prop])) {
              return false;
          }
      }
      for (prop in after[sourceId]) {
          if (!after[sourceId].hasOwnProperty(prop)) {
              continue;
          }
          if (prop !== 'data' && !deepEqual(before[sourceId][prop], after[sourceId][prop])) {
              return false;
          }
      }
      return true;
  }
  function diffSources(before, after, commands, sourcesRemoved) {
      before = before || {};
      after = after || {};
      var sourceId;
      for (sourceId in before) {
          if (!before.hasOwnProperty(sourceId)) {
              continue;
          }
          if (!after.hasOwnProperty(sourceId)) {
              removeSource(sourceId, commands, sourcesRemoved);
          }
      }
      for (sourceId in after) {
          if (!after.hasOwnProperty(sourceId)) {
              continue;
          }
          if (!before.hasOwnProperty(sourceId)) {
              addSource(sourceId, after, commands);
          } else if (!deepEqual(before[sourceId], after[sourceId])) {
              if (before[sourceId].type === 'geojson' && after[sourceId].type === 'geojson' && canUpdateGeoJSON(before, after, sourceId)) {
                  commands.push({
                      command: operations.setGeoJSONSourceData,
                      args: [
                          sourceId,
                          after[sourceId].data
                      ]
                  });
              } else {
                  updateSource(sourceId, after, commands, sourcesRemoved);
              }
          }
      }
  }
  function diffLayerPropertyChanges(before, after, commands, layerId, klass, command) {
      before = before || {};
      after = after || {};
      var prop;
      for (prop in before) {
          if (!before.hasOwnProperty(prop)) {
              continue;
          }
          if (!deepEqual(before[prop], after[prop])) {
              commands.push({
                  command: command,
                  args: [
                      layerId,
                      prop,
                      after[prop],
                      klass
                  ]
              });
          }
      }
      for (prop in after) {
          if (!after.hasOwnProperty(prop) || before.hasOwnProperty(prop)) {
              continue;
          }
          if (!deepEqual(before[prop], after[prop])) {
              commands.push({
                  command: command,
                  args: [
                      layerId,
                      prop,
                      after[prop],
                      klass
                  ]
              });
          }
      }
  }
  function pluckId(layer) {
      return layer.id;
  }
  function indexById(group, layer) {
      group[layer.id] = layer;
      return group;
  }
  function diffLayers(before, after, commands) {
      before = before || [];
      after = after || [];
      var beforeOrder = before.map(pluckId);
      var afterOrder = after.map(pluckId);
      var beforeIndex = before.reduce(indexById, {});
      var afterIndex = after.reduce(indexById, {});
      var tracker = beforeOrder.slice();
      var clean = Object.create(null);
      var i, d, layerId, beforeLayer, afterLayer, insertBeforeLayerId, prop;
      for (i = 0, d = 0; i < beforeOrder.length; i++) {
          layerId = beforeOrder[i];
          if (!afterIndex.hasOwnProperty(layerId)) {
              commands.push({
                  command: operations.removeLayer,
                  args: [layerId]
              });
              tracker.splice(tracker.indexOf(layerId, d), 1);
          } else {
              d++;
          }
      }
      for (i = 0, d = 0; i < afterOrder.length; i++) {
          layerId = afterOrder[afterOrder.length - 1 - i];
          if (tracker[tracker.length - 1 - i] === layerId) {
              continue;
          }
          if (beforeIndex.hasOwnProperty(layerId)) {
              commands.push({
                  command: operations.removeLayer,
                  args: [layerId]
              });
              tracker.splice(tracker.lastIndexOf(layerId, tracker.length - d), 1);
          } else {
              d++;
          }
          insertBeforeLayerId = tracker[tracker.length - i];
          commands.push({
              command: operations.addLayer,
              args: [
                  afterIndex[layerId],
                  insertBeforeLayerId
              ]
          });
          tracker.splice(tracker.length - i, 0, layerId);
          clean[layerId] = true;
      }
      for (i = 0; i < afterOrder.length; i++) {
          layerId = afterOrder[i];
          beforeLayer = beforeIndex[layerId];
          afterLayer = afterIndex[layerId];
          if (clean[layerId] || deepEqual(beforeLayer, afterLayer)) {
              continue;
          }
          if (!deepEqual(beforeLayer.source, afterLayer.source) || !deepEqual(beforeLayer['source-layer'], afterLayer['source-layer']) || !deepEqual(beforeLayer.type, afterLayer.type)) {
              commands.push({
                  command: operations.removeLayer,
                  args: [layerId]
              });
              insertBeforeLayerId = tracker[tracker.lastIndexOf(layerId) + 1];
              commands.push({
                  command: operations.addLayer,
                  args: [
                      afterLayer,
                      insertBeforeLayerId
                  ]
              });
              continue;
          }
          diffLayerPropertyChanges(beforeLayer.layout, afterLayer.layout, commands, layerId, null, operations.setLayoutProperty);
          diffLayerPropertyChanges(beforeLayer.paint, afterLayer.paint, commands, layerId, null, operations.setPaintProperty);
          if (!deepEqual(beforeLayer.filter, afterLayer.filter)) {
              commands.push({
                  command: operations.setFilter,
                  args: [
                      layerId,
                      afterLayer.filter
                  ]
              });
          }
          if (!deepEqual(beforeLayer.minzoom, afterLayer.minzoom) || !deepEqual(beforeLayer.maxzoom, afterLayer.maxzoom)) {
              commands.push({
                  command: operations.setLayerZoomRange,
                  args: [
                      layerId,
                      afterLayer.minzoom,
                      afterLayer.maxzoom
                  ]
              });
          }
          for (prop in beforeLayer) {
              if (!beforeLayer.hasOwnProperty(prop)) {
                  continue;
              }
              if (prop === 'layout' || prop === 'paint' || prop === 'filter' || prop === 'metadata' || prop === 'minzoom' || prop === 'maxzoom') {
                  continue;
              }
              if (prop.indexOf('paint.') === 0) {
                  diffLayerPropertyChanges(beforeLayer[prop], afterLayer[prop], commands, layerId, prop.slice(6), operations.setPaintProperty);
              } else if (!deepEqual(beforeLayer[prop], afterLayer[prop])) {
                  commands.push({
                      command: operations.setLayerProperty,
                      args: [
                          layerId,
                          prop,
                          afterLayer[prop]
                      ]
                  });
              }
          }
          for (prop in afterLayer) {
              if (!afterLayer.hasOwnProperty(prop) || beforeLayer.hasOwnProperty(prop)) {
                  continue;
              }
              if (prop === 'layout' || prop === 'paint' || prop === 'filter' || prop === 'metadata' || prop === 'minzoom' || prop === 'maxzoom') {
                  continue;
              }
              if (prop.indexOf('paint.') === 0) {
                  diffLayerPropertyChanges(beforeLayer[prop], afterLayer[prop], commands, layerId, prop.slice(6), operations.setPaintProperty);
              } else if (!deepEqual(beforeLayer[prop], afterLayer[prop])) {
                  commands.push({
                      command: operations.setLayerProperty,
                      args: [
                          layerId,
                          prop,
                          afterLayer[prop]
                      ]
                  });
              }
          }
      }
  }
  function diffStyles(before, after) {
      if (!before) {
          return [{
                  command: operations.setStyle,
                  args: [after]
              }];
      }
      var commands = [];
      try {
          if (!deepEqual(before.version, after.version)) {
              return [{
                      command: operations.setStyle,
                      args: [after]
                  }];
          }
          if (!deepEqual(before.center, after.center)) {
              commands.push({
                  command: operations.setCenter,
                  args: [after.center]
              });
          }
          if (!deepEqual(before.zoom, after.zoom)) {
              commands.push({
                  command: operations.setZoom,
                  args: [after.zoom]
              });
          }
          if (!deepEqual(before.bearing, after.bearing)) {
              commands.push({
                  command: operations.setBearing,
                  args: [after.bearing]
              });
          }
          if (!deepEqual(before.pitch, after.pitch)) {
              commands.push({
                  command: operations.setPitch,
                  args: [after.pitch]
              });
          }
          if (!deepEqual(before.sprite, after.sprite)) {
              commands.push({
                  command: operations.setSprite,
                  args: [after.sprite]
              });
          }
          if (!deepEqual(before.glyphs, after.glyphs)) {
              commands.push({
                  command: operations.setGlyphs,
                  args: [after.glyphs]
              });
          }
          if (!deepEqual(before.transition, after.transition)) {
              commands.push({
                  command: operations.setTransition,
                  args: [after.transition]
              });
          }
          if (!deepEqual(before.light, after.light)) {
              commands.push({
                  command: operations.setLight,
                  args: [after.light]
              });
          }
          var sourcesRemoved = {};
          var removeOrAddSourceCommands = [];
          diffSources(before.sources, after.sources, removeOrAddSourceCommands, sourcesRemoved);
          var beforeLayers = [];
          if (before.layers) {
              before.layers.forEach(function (layer) {
                  if (sourcesRemoved[layer.source]) {
                      commands.push({
                          command: operations.removeLayer,
                          args: [layer.id]
                      });
                  } else {
                      beforeLayers.push(layer);
                  }
              });
          }
          commands = commands.concat(removeOrAddSourceCommands);
          diffLayers(beforeLayers, after.layers, commands);
      } catch (e) {
          console.warn('Unable to compute style diff:', e);
          commands = [{
                  command: operations.setStyle,
                  args: [after]
              }];
      }
      return commands;
  }

  var ValidationError = function ValidationError(key, value, message, identifier) {
      this.message = (key ? key + ': ' : '') + message;
      if (identifier) {
          this.identifier = identifier;
      }
      if (value !== null && value !== undefined && value.__line__) {
          this.line = value.__line__;
      }
  };

  function ParsingError$1(error) {
      this.error = error;
      this.message = error.message;
      var match = error.message.match(/line (\d+)/);
      this.line = match ? parseInt(match[1], 10) : 0;
  }

  function validateConstants(options) {
      var key = options.key;
      var constants = options.value;
      if (constants) {
          return [new ValidationError(key, constants, 'constants have been deprecated as of v8')];
      } else {
          return [];
      }
  }

  function unbundle(value) {
      if (value instanceof Number || value instanceof String || value instanceof Boolean) {
          return value.valueOf();
      } else {
          return value;
      }
  }
  function deepUnbundle(value) {
      if (Array.isArray(value)) {
          return value.map(deepUnbundle);
      }
      return unbundle(value);
  }

  function validateObject(options) {
      var key = options.key;
      var object = options.value;
      var elementSpecs = options.valueSpec || {};
      var elementValidators = options.objectElementValidators || {};
      var style = options.style;
      var styleSpec = options.styleSpec;
      var errors = [];
      var type = getType(object);
      if (type !== 'object') {
          return [new ValidationError(key, object, 'object expected, ' + type + ' found')];
      }
      for (var objectKey in object) {
          var elementSpecKey = objectKey.split('.')[0];
          var elementSpec = elementSpecs[elementSpecKey] || elementSpecs['*'];
          var validateElement = void 0;
          if (elementValidators[elementSpecKey]) {
              validateElement = elementValidators[elementSpecKey];
          } else if (elementSpecs[elementSpecKey]) {
              validateElement = validate;
          } else if (elementValidators['*']) {
              validateElement = elementValidators['*'];
          } else if (elementSpecs['*']) {
              validateElement = validate;
          } else {
              errors.push(new ValidationError(key, object[objectKey], 'unknown property "' + objectKey + '"'));
              continue;
          }
          errors = errors.concat(validateElement({
              key: (key ? key + '.' : key) + objectKey,
              value: object[objectKey],
              valueSpec: elementSpec,
              style: style,
              styleSpec: styleSpec,
              object: object,
              objectKey: objectKey
          }, object));
      }
      for (var elementSpecKey$1 in elementSpecs) {
          if (elementValidators[elementSpecKey$1]) {
              continue;
          }
          if (elementSpecs[elementSpecKey$1].required && elementSpecs[elementSpecKey$1]['default'] === undefined && object[elementSpecKey$1] === undefined) {
              errors.push(new ValidationError(key, object, 'missing required property "' + elementSpecKey$1 + '"'));
          }
      }
      return errors;
  }

  function validateArray(options) {
      var array = options.value;
      var arraySpec = options.valueSpec;
      var style = options.style;
      var styleSpec = options.styleSpec;
      var key = options.key;
      var validateArrayElement = options.arrayElementValidator || validate;
      if (getType(array) !== 'array') {
          return [new ValidationError(key, array, 'array expected, ' + getType(array) + ' found')];
      }
      if (arraySpec.length && array.length !== arraySpec.length) {
          return [new ValidationError(key, array, 'array length ' + arraySpec.length + ' expected, length ' + array.length + ' found')];
      }
      if (arraySpec['min-length'] && array.length < arraySpec['min-length']) {
          return [new ValidationError(key, array, 'array length at least ' + arraySpec['min-length'] + ' expected, length ' + array.length + ' found')];
      }
      var arrayElementSpec = { 'type': arraySpec.value };
      if (styleSpec.$version < 7) {
          arrayElementSpec.function = arraySpec.function;
      }
      if (getType(arraySpec.value) === 'object') {
          arrayElementSpec = arraySpec.value;
      }
      var errors = [];
      for (var i = 0; i < array.length; i++) {
          errors = errors.concat(validateArrayElement({
              array: array,
              arrayIndex: i,
              value: array[i],
              valueSpec: arrayElementSpec,
              style: style,
              styleSpec: styleSpec,
              key: key + '[' + i + ']'
          }));
      }
      return errors;
  }

  function validateNumber(options) {
      var key = options.key;
      var value = options.value;
      var valueSpec = options.valueSpec;
      var type = getType(value);
      if (type !== 'number') {
          return [new ValidationError(key, value, 'number expected, ' + type + ' found')];
      }
      if ('minimum' in valueSpec && value < valueSpec.minimum) {
          return [new ValidationError(key, value, value + ' is less than the minimum value ' + valueSpec.minimum)];
      }
      if ('maximum' in valueSpec && value > valueSpec.maximum) {
          return [new ValidationError(key, value, value + ' is greater than the maximum value ' + valueSpec.maximum)];
      }
      return [];
  }

  function validateFunction(options) {
      var functionValueSpec = options.valueSpec;
      var functionType = unbundle(options.value.type);
      var stopKeyType;
      var stopDomainValues = {};
      var previousStopDomainValue;
      var previousStopDomainZoom;
      var isZoomFunction = functionType !== 'categorical' && options.value.property === undefined;
      var isPropertyFunction = !isZoomFunction;
      var isZoomAndPropertyFunction = getType(options.value.stops) === 'array' && getType(options.value.stops[0]) === 'array' && getType(options.value.stops[0][0]) === 'object';
      var errors = validateObject({
          key: options.key,
          value: options.value,
          valueSpec: options.styleSpec.function,
          style: options.style,
          styleSpec: options.styleSpec,
          objectElementValidators: {
              stops: validateFunctionStops,
              default: validateFunctionDefault
          }
      });
      if (functionType === 'identity' && isZoomFunction) {
          errors.push(new ValidationError(options.key, options.value, 'missing required property "property"'));
      }
      if (functionType !== 'identity' && !options.value.stops) {
          errors.push(new ValidationError(options.key, options.value, 'missing required property "stops"'));
      }
      if (functionType === 'exponential' && options.valueSpec.expression && !supportsInterpolation(options.valueSpec)) {
          errors.push(new ValidationError(options.key, options.value, 'exponential functions not supported'));
      }
      if (options.styleSpec.$version >= 8) {
          if (isPropertyFunction && !supportsPropertyExpression(options.valueSpec)) {
              errors.push(new ValidationError(options.key, options.value, 'property functions not supported'));
          } else if (isZoomFunction && !supportsZoomExpression(options.valueSpec)) {
              errors.push(new ValidationError(options.key, options.value, 'zoom functions not supported'));
          }
      }
      if ((functionType === 'categorical' || isZoomAndPropertyFunction) && options.value.property === undefined) {
          errors.push(new ValidationError(options.key, options.value, '"property" property is required'));
      }
      return errors;
      function validateFunctionStops(options) {
          if (functionType === 'identity') {
              return [new ValidationError(options.key, options.value, 'identity function may not have a "stops" property')];
          }
          var errors = [];
          var value = options.value;
          errors = errors.concat(validateArray({
              key: options.key,
              value: value,
              valueSpec: options.valueSpec,
              style: options.style,
              styleSpec: options.styleSpec,
              arrayElementValidator: validateFunctionStop
          }));
          if (getType(value) === 'array' && value.length === 0) {
              errors.push(new ValidationError(options.key, value, 'array must have at least one stop'));
          }
          return errors;
      }
      function validateFunctionStop(options) {
          var errors = [];
          var value = options.value;
          var key = options.key;
          if (getType(value) !== 'array') {
              return [new ValidationError(key, value, 'array expected, ' + getType(value) + ' found')];
          }
          if (value.length !== 2) {
              return [new ValidationError(key, value, 'array length 2 expected, length ' + value.length + ' found')];
          }
          if (isZoomAndPropertyFunction) {
              if (getType(value[0]) !== 'object') {
                  return [new ValidationError(key, value, 'object expected, ' + getType(value[0]) + ' found')];
              }
              if (value[0].zoom === undefined) {
                  return [new ValidationError(key, value, 'object stop key must have zoom')];
              }
              if (value[0].value === undefined) {
                  return [new ValidationError(key, value, 'object stop key must have value')];
              }
              if (previousStopDomainZoom && previousStopDomainZoom > unbundle(value[0].zoom)) {
                  return [new ValidationError(key, value[0].zoom, 'stop zoom values must appear in ascending order')];
              }
              if (unbundle(value[0].zoom) !== previousStopDomainZoom) {
                  previousStopDomainZoom = unbundle(value[0].zoom);
                  previousStopDomainValue = undefined;
                  stopDomainValues = {};
              }
              errors = errors.concat(validateObject({
                  key: key + '[0]',
                  value: value[0],
                  valueSpec: { zoom: {} },
                  style: options.style,
                  styleSpec: options.styleSpec,
                  objectElementValidators: {
                      zoom: validateNumber,
                      value: validateStopDomainValue
                  }
              }));
          } else {
              errors = errors.concat(validateStopDomainValue({
                  key: key + '[0]',
                  value: value[0],
                  valueSpec: {},
                  style: options.style,
                  styleSpec: options.styleSpec
              }, value));
          }
          if (isExpression(deepUnbundle(value[1]))) {
              return errors.concat([new ValidationError(key + '[1]', value[1], 'expressions are not allowed in function stops.')]);
          }
          return errors.concat(validate({
              key: key + '[1]',
              value: value[1],
              valueSpec: functionValueSpec,
              style: options.style,
              styleSpec: options.styleSpec
          }));
      }
      function validateStopDomainValue(options, stop) {
          var type = getType(options.value);
          var value = unbundle(options.value);
          var reportValue = options.value !== null ? options.value : stop;
          if (!stopKeyType) {
              stopKeyType = type;
          } else if (type !== stopKeyType) {
              return [new ValidationError(options.key, reportValue, type + ' stop domain type must match previous stop domain type ' + stopKeyType)];
          }
          if (type !== 'number' && type !== 'string' && type !== 'boolean') {
              return [new ValidationError(options.key, reportValue, 'stop domain value must be a number, string, or boolean')];
          }
          if (type !== 'number' && functionType !== 'categorical') {
              var message = 'number expected, ' + type + ' found';
              if (supportsPropertyExpression(functionValueSpec) && functionType === undefined) {
                  message += '\nIf you intended to use a categorical function, specify `"type": "categorical"`.';
              }
              return [new ValidationError(options.key, reportValue, message)];
          }
          if (functionType === 'categorical' && type === 'number' && (!isFinite(value) || Math.floor(value) !== value)) {
              return [new ValidationError(options.key, reportValue, 'integer expected, found ' + value)];
          }
          if (functionType !== 'categorical' && type === 'number' && previousStopDomainValue !== undefined && value < previousStopDomainValue) {
              return [new ValidationError(options.key, reportValue, 'stop domain values must appear in ascending order')];
          } else {
              previousStopDomainValue = value;
          }
          if (functionType === 'categorical' && value in stopDomainValues) {
              return [new ValidationError(options.key, reportValue, 'stop domain values must be unique')];
          } else {
              stopDomainValues[value] = true;
          }
          return [];
      }
      function validateFunctionDefault(options) {
          return validate({
              key: options.key,
              value: options.value,
              valueSpec: functionValueSpec,
              style: options.style,
              styleSpec: options.styleSpec
          });
      }
  }

  function validateExpression(options) {
      var expression = (options.expressionContext === 'property' ? createPropertyExpression : createExpression)(deepUnbundle(options.value), options.valueSpec);
      if (expression.result === 'error') {
          return expression.value.map(function (error) {
              return new ValidationError('' + options.key + error.key, options.value, error.message);
          });
      }
      var expressionObj = expression.value.expression || expression.value._styleExpression.expression;
      if (options.expressionContext === 'property' && options.propertyKey === 'text-font' && expressionObj.possibleOutputs().indexOf(undefined) !== -1) {
          return [new ValidationError(options.key, options.value, 'Invalid data expression for "' + options.propertyKey + '". Output values must be contained as literals within the expression.')];
      }
      if (options.expressionContext === 'property' && options.propertyType === 'layout' && !isStateConstant(expressionObj)) {
          return [new ValidationError(options.key, options.value, '"feature-state" data expressions are not supported with layout properties.')];
      }
      if (options.expressionContext === 'filter' && !isStateConstant(expressionObj)) {
          return [new ValidationError(options.key, options.value, '"feature-state" data expressions are not supported with filters.')];
      }
      if (options.expressionContext && options.expressionContext.indexOf('cluster') === 0) {
          if (!isGlobalPropertyConstant(expressionObj, [
                  'zoom',
                  'feature-state'
              ])) {
              return [new ValidationError(options.key, options.value, '"zoom" and "feature-state" expressions are not supported with cluster properties.')];
          }
          if (options.expressionContext === 'cluster-initial' && !isFeatureConstant(expressionObj)) {
              return [new ValidationError(options.key, options.value, 'Feature data expressions are not supported with initial expression part of cluster properties.')];
          }
      }
      return [];
  }

  function validateBoolean(options) {
      var value = options.value;
      var key = options.key;
      var type = getType(value);
      if (type !== 'boolean') {
          return [new ValidationError(key, value, 'boolean expected, ' + type + ' found')];
      }
      return [];
  }

  function validateColor(options) {
      var key = options.key;
      var value = options.value;
      var type = getType(value);
      if (type !== 'string') {
          return [new ValidationError(key, value, 'color expected, ' + type + ' found')];
      }
      if (csscolorparser_1(value) === null) {
          return [new ValidationError(key, value, 'color expected, "' + value + '" found')];
      }
      return [];
  }

  function validateEnum(options) {
      var key = options.key;
      var value = options.value;
      var valueSpec = options.valueSpec;
      var errors = [];
      if (Array.isArray(valueSpec.values)) {
          if (valueSpec.values.indexOf(unbundle(value)) === -1) {
              errors.push(new ValidationError(key, value, 'expected one of [' + valueSpec.values.join(', ') + '], ' + JSON.stringify(value) + ' found'));
          }
      } else {
          if (Object.keys(valueSpec.values).indexOf(unbundle(value)) === -1) {
              errors.push(new ValidationError(key, value, 'expected one of [' + Object.keys(valueSpec.values).join(', ') + '], ' + JSON.stringify(value) + ' found'));
          }
      }
      return errors;
  }

  function validateFilter(options) {
      if (isExpressionFilter(deepUnbundle(options.value))) {
          return validateExpression(extend({}, options, {
              expressionContext: 'filter',
              valueSpec: { value: 'boolean' }
          }));
      } else {
          return validateNonExpressionFilter(options);
      }
  }
  function validateNonExpressionFilter(options) {
      var value = options.value;
      var key = options.key;
      if (getType(value) !== 'array') {
          return [new ValidationError(key, value, 'array expected, ' + getType(value) + ' found')];
      }
      var styleSpec = options.styleSpec;
      var type;
      var errors = [];
      if (value.length < 1) {
          return [new ValidationError(key, value, 'filter array must have at least 1 element')];
      }
      errors = errors.concat(validateEnum({
          key: key + '[0]',
          value: value[0],
          valueSpec: styleSpec.filter_operator,
          style: options.style,
          styleSpec: options.styleSpec
      }));
      switch (unbundle(value[0])) {
      case '<':
      case '<=':
      case '>':
      case '>=':
          if (value.length >= 2 && unbundle(value[1]) === '$type') {
              errors.push(new ValidationError(key, value, '"$type" cannot be use with operator "' + value[0] + '"'));
          }
      case '==':
      case '!=':
          if (value.length !== 3) {
              errors.push(new ValidationError(key, value, 'filter array for operator "' + value[0] + '" must have 3 elements'));
          }
      case 'in':
      case '!in':
          if (value.length >= 2) {
              type = getType(value[1]);
              if (type !== 'string') {
                  errors.push(new ValidationError(key + '[1]', value[1], 'string expected, ' + type + ' found'));
              }
          }
          for (var i = 2; i < value.length; i++) {
              type = getType(value[i]);
              if (unbundle(value[1]) === '$type') {
                  errors = errors.concat(validateEnum({
                      key: key + '[' + i + ']',
                      value: value[i],
                      valueSpec: styleSpec.geometry_type,
                      style: options.style,
                      styleSpec: options.styleSpec
                  }));
              } else if (type !== 'string' && type !== 'number' && type !== 'boolean') {
                  errors.push(new ValidationError(key + '[' + i + ']', value[i], 'string, number, or boolean expected, ' + type + ' found'));
              }
          }
          break;
      case 'any':
      case 'all':
      case 'none':
          for (var i$1 = 1; i$1 < value.length; i$1++) {
              errors = errors.concat(validateNonExpressionFilter({
                  key: key + '[' + i$1 + ']',
                  value: value[i$1],
                  style: options.style,
                  styleSpec: options.styleSpec
              }));
          }
          break;
      case 'has':
      case '!has':
          type = getType(value[1]);
          if (value.length !== 2) {
              errors.push(new ValidationError(key, value, 'filter array for "' + value[0] + '" operator must have 2 elements'));
          } else if (type !== 'string') {
              errors.push(new ValidationError(key + '[1]', value[1], 'string expected, ' + type + ' found'));
          }
          break;
      }
      return errors;
  }

  function validateProperty(options, propertyType) {
      var key = options.key;
      var style = options.style;
      var styleSpec = options.styleSpec;
      var value = options.value;
      var propertyKey = options.objectKey;
      var layerSpec = styleSpec[propertyType + '_' + options.layerType];
      if (!layerSpec) {
          return [];
      }
      var transitionMatch = propertyKey.match(/^(.*)-transition$/);
      if (propertyType === 'paint' && transitionMatch && layerSpec[transitionMatch[1]] && layerSpec[transitionMatch[1]].transition) {
          return validate({
              key: key,
              value: value,
              valueSpec: styleSpec.transition,
              style: style,
              styleSpec: styleSpec
          });
      }
      var valueSpec = options.valueSpec || layerSpec[propertyKey];
      if (!valueSpec) {
          return [new ValidationError(key, value, 'unknown property "' + propertyKey + '"')];
      }
      var tokenMatch;
      if (getType(value) === 'string' && supportsPropertyExpression(valueSpec) && !valueSpec.tokens && (tokenMatch = /^{([^}]+)}$/.exec(value))) {
          return [new ValidationError(key, value, '"' + propertyKey + '" does not support interpolation syntax\n' + 'Use an identity property function instead: `{ "type": "identity", "property": ' + JSON.stringify(tokenMatch[1]) + ' }`.')];
      }
      var errors = [];
      if (options.layerType === 'symbol') {
          if (propertyKey === 'text-field' && style && !style.glyphs) {
              errors.push(new ValidationError(key, value, 'use of "text-field" requires a style "glyphs" property'));
          }
          if (propertyKey === 'text-font' && isFunction$1(deepUnbundle(value)) && unbundle(value.type) === 'identity') {
              errors.push(new ValidationError(key, value, '"text-font" does not support identity functions'));
          }
      }
      return errors.concat(validate({
          key: options.key,
          value: value,
          valueSpec: valueSpec,
          style: style,
          styleSpec: styleSpec,
          expressionContext: 'property',
          propertyType: propertyType,
          propertyKey: propertyKey
      }));
  }

  function validatePaintProperty(options) {
      return validateProperty(options, 'paint');
  }

  function validateLayoutProperty(options) {
      return validateProperty(options, 'layout');
  }

  function validateLayer(options) {
      var errors = [];
      var layer = options.value;
      var key = options.key;
      var style = options.style;
      var styleSpec = options.styleSpec;
      if (!layer.type && !layer.ref) {
          errors.push(new ValidationError(key, layer, 'either "type" or "ref" is required'));
      }
      var type = unbundle(layer.type);
      var ref = unbundle(layer.ref);
      if (layer.id) {
          var layerId = unbundle(layer.id);
          for (var i = 0; i < options.arrayIndex; i++) {
              var otherLayer = style.layers[i];
              if (unbundle(otherLayer.id) === layerId) {
                  errors.push(new ValidationError(key, layer.id, 'duplicate layer id "' + layer.id + '", previously used at line ' + otherLayer.id.__line__));
              }
          }
      }
      if ('ref' in layer) {
          [
              'type',
              'source',
              'source-layer',
              'filter',
              'layout'
          ].forEach(function (p) {
              if (p in layer) {
                  errors.push(new ValidationError(key, layer[p], '"' + p + '" is prohibited for ref layers'));
              }
          });
          var parent;
          style.layers.forEach(function (layer) {
              if (unbundle(layer.id) === ref) {
                  parent = layer;
              }
          });
          if (!parent) {
              errors.push(new ValidationError(key, layer.ref, 'ref layer "' + ref + '" not found'));
          } else if (parent.ref) {
              errors.push(new ValidationError(key, layer.ref, 'ref cannot reference another ref layer'));
          } else {
              type = unbundle(parent.type);
          }
      } else if (type !== 'background') {
          if (!layer.source) {
              errors.push(new ValidationError(key, layer, 'missing required property "source"'));
          } else {
              var source = style.sources && style.sources[layer.source];
              var sourceType = source && unbundle(source.type);
              if (!source) {
                  errors.push(new ValidationError(key, layer.source, 'source "' + layer.source + '" not found'));
              } else if (sourceType === 'vector' && type === 'raster') {
                  errors.push(new ValidationError(key, layer.source, 'layer "' + layer.id + '" requires a raster source'));
              } else if (sourceType === 'raster' && type !== 'raster') {
                  errors.push(new ValidationError(key, layer.source, 'layer "' + layer.id + '" requires a vector source'));
              } else if (sourceType === 'vector' && !layer['source-layer']) {
                  errors.push(new ValidationError(key, layer, 'layer "' + layer.id + '" must specify a "source-layer"'));
              } else if (sourceType === 'raster-dem' && type !== 'hillshade') {
                  errors.push(new ValidationError(key, layer.source, 'raster-dem source can only be used with layer type \'hillshade\'.'));
              } else if (type === 'line' && layer.paint && layer.paint['line-gradient'] && (sourceType !== 'geojson' || !source.lineMetrics)) {
                  errors.push(new ValidationError(key, layer, 'layer "' + layer.id + '" specifies a line-gradient, which requires a GeoJSON source with `lineMetrics` enabled.'));
              }
          }
      }
      errors = errors.concat(validateObject({
          key: key,
          value: layer,
          valueSpec: styleSpec.layer,
          style: options.style,
          styleSpec: options.styleSpec,
          objectElementValidators: {
              '*': function _() {
                  return [];
              },
              type: function type() {
                  return validate({
                      key: key + '.type',
                      value: layer.type,
                      valueSpec: styleSpec.layer.type,
                      style: options.style,
                      styleSpec: options.styleSpec,
                      object: layer,
                      objectKey: 'type'
                  });
              },
              filter: validateFilter,
              layout: function layout(options) {
                  return validateObject({
                      layer: layer,
                      key: options.key,
                      value: options.value,
                      style: options.style,
                      styleSpec: options.styleSpec,
                      objectElementValidators: {
                          '*': function _(options) {
                              return validateLayoutProperty(extend({ layerType: type }, options));
                          }
                      }
                  });
              },
              paint: function paint(options) {
                  return validateObject({
                      layer: layer,
                      key: options.key,
                      value: options.value,
                      style: options.style,
                      styleSpec: options.styleSpec,
                      objectElementValidators: {
                          '*': function _(options) {
                              return validatePaintProperty(extend({ layerType: type }, options));
                          }
                      }
                  });
              }
          }
      }));
      return errors;
  }

  function validateSource(options) {
      var value = options.value;
      var key = options.key;
      var styleSpec = options.styleSpec;
      var style = options.style;
      if (!value.type) {
          return [new ValidationError(key, value, '"type" is required')];
      }
      var type = unbundle(value.type);
      var errors;
      switch (type) {
      case 'vector':
      case 'raster':
      case 'raster-dem':
          errors = validateObject({
              key: key,
              value: value,
              valueSpec: styleSpec['source_' + type.replace('-', '_')],
              style: options.style,
              styleSpec: styleSpec
          });
          if ('url' in value) {
              for (var prop in value) {
                  if ([
                          'type',
                          'url',
                          'tileSize'
                      ].indexOf(prop) < 0) {
                      errors.push(new ValidationError(key + '.' + prop, value[prop], 'a source with a "url" property may not include a "' + prop + '" property'));
                  }
              }
          }
          return errors;
      case 'geojson':
          errors = validateObject({
              key: key,
              value: value,
              valueSpec: styleSpec.source_geojson,
              style: style,
              styleSpec: styleSpec
          });
          if (value.cluster) {
              for (var prop$1 in value.clusterProperties) {
                  var ref = value.clusterProperties[prop$1];
                  var operator = ref[0];
                  var mapExpr = ref[1];
                  var reduceExpr = typeof operator === 'string' ? [
                      operator,
                      ['accumulated'],
                      [
                          'get',
                          prop$1
                      ]
                  ] : operator;
                  errors.push.apply(errors, validateExpression({
                      key: key + '.' + prop$1 + '.map',
                      value: mapExpr,
                      expressionContext: 'cluster-map'
                  }));
                  errors.push.apply(errors, validateExpression({
                      key: key + '.' + prop$1 + '.reduce',
                      value: reduceExpr,
                      expressionContext: 'cluster-reduce'
                  }));
              }
          }
          return errors;
      case 'video':
          return validateObject({
              key: key,
              value: value,
              valueSpec: styleSpec.source_video,
              style: style,
              styleSpec: styleSpec
          });
      case 'image':
          return validateObject({
              key: key,
              value: value,
              valueSpec: styleSpec.source_image,
              style: style,
              styleSpec: styleSpec
          });
      case 'canvas':
          return [new ValidationError(key, null, 'Please use runtime APIs to add canvas sources, rather than including them in stylesheets.', 'source.canvas')];
      default:
          return validateEnum({
              key: key + '.type',
              value: value.type,
              valueSpec: {
                  values: [
                      'vector',
                      'raster',
                      'raster-dem',
                      'geojson',
                      'video',
                      'image'
                  ]
              },
              style: style,
              styleSpec: styleSpec
          });
      }
  }

  function validateLight(options) {
      var light = options.value;
      var styleSpec = options.styleSpec;
      var lightSpec = styleSpec.light;
      var style = options.style;
      var errors = [];
      var rootType = getType(light);
      if (light === undefined) {
          return errors;
      } else if (rootType !== 'object') {
          errors = errors.concat([new ValidationError('light', light, 'object expected, ' + rootType + ' found')]);
          return errors;
      }
      for (var key in light) {
          var transitionMatch = key.match(/^(.*)-transition$/);
          if (transitionMatch && lightSpec[transitionMatch[1]] && lightSpec[transitionMatch[1]].transition) {
              errors = errors.concat(validate({
                  key: key,
                  value: light[key],
                  valueSpec: styleSpec.transition,
                  style: style,
                  styleSpec: styleSpec
              }));
          } else if (lightSpec[key]) {
              errors = errors.concat(validate({
                  key: key,
                  value: light[key],
                  valueSpec: lightSpec[key],
                  style: style,
                  styleSpec: styleSpec
              }));
          } else {
              errors = errors.concat([new ValidationError(key, light[key], 'unknown property "' + key + '"')]);
          }
      }
      return errors;
  }

  function validateString(options) {
      var value = options.value;
      var key = options.key;
      var type = getType(value);
      if (type !== 'string') {
          return [new ValidationError(key, value, 'string expected, ' + type + ' found')];
      }
      return [];
  }

  function validateFormatted(options) {
      if (validateString(options).length === 0) {
          return [];
      }
      return validateExpression(options);
  }

  var VALIDATORS = {
      '*': function _() {
          return [];
      },
      'array': validateArray,
      'boolean': validateBoolean,
      'number': validateNumber,
      'color': validateColor,
      'constants': validateConstants,
      'enum': validateEnum,
      'filter': validateFilter,
      'function': validateFunction,
      'layer': validateLayer,
      'object': validateObject,
      'source': validateSource,
      'light': validateLight,
      'string': validateString,
      'formatted': validateFormatted
  };
  function validate(options) {
      var value = options.value;
      var valueSpec = options.valueSpec;
      var styleSpec = options.styleSpec;
      if (valueSpec.expression && isFunction$1(unbundle(value))) {
          return validateFunction(options);
      } else if (valueSpec.expression && isExpression(deepUnbundle(value))) {
          return validateExpression(options);
      } else if (valueSpec.type && VALIDATORS[valueSpec.type]) {
          return VALIDATORS[valueSpec.type](options);
      } else {
          var valid = validateObject(extend({}, options, { valueSpec: valueSpec.type ? styleSpec[valueSpec.type] : valueSpec }));
          return valid;
      }
  }

  function validateGlyphsURL (options) {
      var value = options.value;
      var key = options.key;
      var errors = validateString(options);
      if (errors.length) {
          return errors;
      }
      if (value.indexOf('{fontstack}') === -1) {
          errors.push(new ValidationError(key, value, '"glyphs" url must include a "{fontstack}" token'));
      }
      if (value.indexOf('{range}') === -1) {
          errors.push(new ValidationError(key, value, '"glyphs" url must include a "{range}" token'));
      }
      return errors;
  }

  function validateStyleMin(style, styleSpec) {
      styleSpec = styleSpec || v8;
      var errors = [];
      errors = errors.concat(validate({
          key: '',
          value: style,
          valueSpec: styleSpec.$root,
          styleSpec: styleSpec,
          style: style,
          objectElementValidators: {
              glyphs: validateGlyphsURL,
              '*': function _() {
                  return [];
              }
          }
      }));
      if (style.constants) {
          errors = errors.concat(validateConstants({
              key: 'constants',
              value: style.constants,
              style: style,
              styleSpec: styleSpec
          }));
      }
      return sortErrors(errors);
  }
  validateStyleMin.source = wrapCleanErrors(validateSource);
  validateStyleMin.light = wrapCleanErrors(validateLight);
  validateStyleMin.layer = wrapCleanErrors(validateLayer);
  validateStyleMin.filter = wrapCleanErrors(validateFilter);
  validateStyleMin.paintProperty = wrapCleanErrors(validatePaintProperty);
  validateStyleMin.layoutProperty = wrapCleanErrors(validateLayoutProperty);
  function sortErrors(errors) {
      return [].concat(errors).sort(function (a, b) {
          return a.line - b.line;
      });
  }
  function wrapCleanErrors(inner) {
      return function () {
          var arguments$1 = arguments;

          var args = [], len = arguments.length;
          while (len--)
              { args[len] = arguments$1[len]; }
          return sortErrors(inner.apply(this, args));
      };
  }

  var jsonlint = createCommonjsModule(function (module, exports) {
  /* parser generated by jison 0.4.15 */
  /*
    Returns a Parser object of the following structure:

    Parser: {
      yy: {}
    }

    Parser.prototype: {
      yy: {},
      trace: function(),
      symbols_: {associative list: name ==> number},
      terminals_: {associative list: number ==> name},
      productions_: [...],
      performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
      table: [...],
      defaultActions: {...},
      parseError: function(str, hash),
      parse: function(input),

      lexer: {
          EOF: 1,
          parseError: function(str, hash),
          setInput: function(input),
          input: function(),
          unput: function(str),
          more: function(),
          less: function(n),
          pastInput: function(),
          upcomingInput: function(),
          showPosition: function(),
          test_match: function(regex_match_array, rule_index),
          next: function(),
          lex: function(),
          begin: function(condition),
          popState: function(),
          _currentRules: function(),
          topState: function(),
          pushState: function(condition),

          options: {
              ranges: boolean           (optional: true ==> token location info will include a .range[] member)
              flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
              backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
          },

          performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
          rules: [...],
          conditions: {associative list: name ==> set},
      }
    }


    token location info (@$, _$, etc.): {
      first_line: n,
      last_line: n,
      first_column: n,
      last_column: n,
      range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
    }


    the parseError function receives a 'hash' object with these members for lexer and parser errors: {
      text:        (matched text)
      token:       (the produced terminal token, if any)
      line:        (yylineno)
    }
    while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
      loc:         (yylloc)
      expected:    (string describing the set of expected tokens)
      recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
    }
  */
  var parser = (function(){
  var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v){ }return o},$V0=[1,12],$V1=[1,13],$V2=[1,9],$V3=[1,10],$V4=[1,11],$V5=[1,14],$V6=[1,15],$V7=[14,18,22,24],$V8=[18,22],$V9=[22,24];
  var parser = {trace: function trace() { },
  yy: {},
  symbols_: {"error":2,"JSONString":3,"STRING":4,"JSONNumber":5,"NUMBER":6,"JSONNullLiteral":7,"NULL":8,"JSONBooleanLiteral":9,"TRUE":10,"FALSE":11,"JSONText":12,"JSONValue":13,"EOF":14,"JSONObject":15,"JSONArray":16,"{":17,"}":18,"JSONMemberList":19,"JSONMember":20,":":21,",":22,"[":23,"]":24,"JSONElementList":25,"$accept":0,"$end":1},
  terminals_: {2:"error",4:"STRING",6:"NUMBER",8:"NULL",10:"TRUE",11:"FALSE",14:"EOF",17:"{",18:"}",21:":",22:",",23:"[",24:"]"},
  productions_: [0,[3,1],[5,1],[7,1],[9,1],[9,1],[12,2],[13,1],[13,1],[13,1],[13,1],[13,1],[13,1],[15,2],[15,3],[20,3],[19,1],[19,3],[16,2],[16,3],[25,1],[25,3]],
  performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
  /* this == yyval */

  var $0 = $$.length - 1;
  switch (yystate) {
  case 1:
   // replace escaped characters with actual character
            this.$ = new String(yytext.replace(/\\(\\|")/g, "$"+"1")
                       .replace(/\\n/g,'\n')
                       .replace(/\\r/g,'\r')
                       .replace(/\\t/g,'\t')
                       .replace(/\\v/g,'\v')
                       .replace(/\\f/g,'\f')
                       .replace(/\\b/g,'\b'));
            this.$.__line__ =  this._$.first_line;
          
  break;
  case 2:

              this.$ = new Number(yytext);
              this.$.__line__ =  this._$.first_line;
          
  break;
  case 3:

              this.$ = null;
          
  break;
  case 4:

              this.$ = new Boolean(true);
              this.$.__line__ = this._$.first_line;
          
  break;
  case 5:

              this.$ = new Boolean(false);
              this.$.__line__ = this._$.first_line;
          
  break;
  case 6:
  return this.$ = $$[$0-1];
  break;
  case 13:
  this.$ = {}; Object.defineProperty(this.$, '__line__', {
              value: this._$.first_line,
              enumerable: false
          });
  break;
  case 14: case 19:
  this.$ = $$[$0-1]; Object.defineProperty(this.$, '__line__', {
              value: this._$.first_line,
              enumerable: false
          });
  break;
  case 15:
  this.$ = [$$[$0-2], $$[$0]];
  break;
  case 16:
  this.$ = {}; this.$[$$[$0][0]] = $$[$0][1];
  break;
  case 17:
  this.$ = $$[$0-2]; $$[$0-2][$$[$0][0]] = $$[$0][1];
  break;
  case 18:
  this.$ = []; Object.defineProperty(this.$, '__line__', {
              value: this._$.first_line,
              enumerable: false
          });
  break;
  case 20:
  this.$ = [$$[$0]];
  break;
  case 21:
  this.$ = $$[$0-2]; $$[$0-2].push($$[$0]);
  break;
  }
  },
  table: [{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,12:1,13:2,15:7,16:8,17:$V5,23:$V6},{1:[3]},{14:[1,16]},o($V7,[2,7]),o($V7,[2,8]),o($V7,[2,9]),o($V7,[2,10]),o($V7,[2,11]),o($V7,[2,12]),o($V7,[2,3]),o($V7,[2,4]),o($V7,[2,5]),o([14,18,21,22,24],[2,1]),o($V7,[2,2]),{3:20,4:$V0,18:[1,17],19:18,20:19},{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,13:23,15:7,16:8,17:$V5,23:$V6,24:[1,21],25:22},{1:[2,6]},o($V7,[2,13]),{18:[1,24],22:[1,25]},o($V8,[2,16]),{21:[1,26]},o($V7,[2,18]),{22:[1,28],24:[1,27]},o($V9,[2,20]),o($V7,[2,14]),{3:20,4:$V0,20:29},{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,13:30,15:7,16:8,17:$V5,23:$V6},o($V7,[2,19]),{3:5,4:$V0,5:6,6:$V1,7:3,8:$V2,9:4,10:$V3,11:$V4,13:31,15:7,16:8,17:$V5,23:$V6},o($V8,[2,17]),o($V8,[2,15]),o($V9,[2,21])],
  defaultActions: {16:[2,6]},
  parseError: function parseError(str, hash) {
      if (hash.recoverable) {
          this.trace(str);
      } else {
          throw new Error(str);
      }
  },
  parse: function parse(input) {
      var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, TERROR = 2, EOF = 1;
      var args = lstack.slice.call(arguments, 1);
      var lexer = Object.create(this.lexer);
      var sharedState = { yy: {} };
      for (var k in this.yy) {
          if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
              sharedState.yy[k] = this.yy[k];
          }
      }
      lexer.setInput(input, sharedState.yy);
      sharedState.yy.lexer = lexer;
      sharedState.yy.parser = this;
      if (typeof lexer.yylloc == 'undefined') {
          lexer.yylloc = {};
      }
      var yyloc = lexer.yylloc;
      lstack.push(yyloc);
      var ranges = lexer.options && lexer.options.ranges;
      if (typeof sharedState.yy.parseError === 'function') {
          this.parseError = sharedState.yy.parseError;
      } else {
          this.parseError = Object.getPrototypeOf(this).parseError;
      }
      
          function lex() {
              var token;
              token = lexer.lex() || EOF;
              if (typeof token !== 'number') {
                  token = self.symbols_[token] || token;
              }
              return token;
          }
      var symbol, preErrorSymbol, state, action, r, yyval = {}, p, len, newState, expected;
      while (true) {
          state = stack[stack.length - 1];
          if (this.defaultActions[state]) {
              action = this.defaultActions[state];
          } else {
              if (symbol === null || typeof symbol == 'undefined') {
                  symbol = lex();
              }
              action = table[state] && table[state][symbol];
          }
                      if (typeof action === 'undefined' || !action.length || !action[0]) {
                  var errStr = '';
                  expected = [];
                  for (p in table[state]) {
                      if (this.terminals_[p] && p > TERROR) {
                          expected.push('\'' + this.terminals_[p] + '\'');
                      }
                  }
                  if (lexer.showPosition) {
                      errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                  } else {
                      errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                  }
                  this.parseError(errStr, {
                      text: lexer.match,
                      token: this.terminals_[symbol] || symbol,
                      line: lexer.yylineno,
                      loc: yyloc,
                      expected: expected
                  });
              }
          if (action[0] instanceof Array && action.length > 1) {
              throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
          }
          switch (action[0]) {
          case 1:
              stack.push(symbol);
              vstack.push(lexer.yytext);
              lstack.push(lexer.yylloc);
              stack.push(action[1]);
              symbol = null;
              if (!preErrorSymbol) {
                  yyleng = lexer.yyleng;
                  yytext = lexer.yytext;
                  yylineno = lexer.yylineno;
                  yyloc = lexer.yylloc;
              } else {
                  symbol = preErrorSymbol;
                  preErrorSymbol = null;
              }
              break;
          case 2:
              len = this.productions_[action[1]][1];
              yyval.$ = vstack[vstack.length - len];
              yyval._$ = {
                  first_line: lstack[lstack.length - (len || 1)].first_line,
                  last_line: lstack[lstack.length - 1].last_line,
                  first_column: lstack[lstack.length - (len || 1)].first_column,
                  last_column: lstack[lstack.length - 1].last_column
              };
              if (ranges) {
                  yyval._$.range = [
                      lstack[lstack.length - (len || 1)].range[0],
                      lstack[lstack.length - 1].range[1]
                  ];
              }
              r = this.performAction.apply(yyval, [
                  yytext,
                  yyleng,
                  yylineno,
                  sharedState.yy,
                  action[1],
                  vstack,
                  lstack
              ].concat(args));
              if (typeof r !== 'undefined') {
                  return r;
              }
              if (len) {
                  stack = stack.slice(0, -1 * len * 2);
                  vstack = vstack.slice(0, -1 * len);
                  lstack = lstack.slice(0, -1 * len);
              }
              stack.push(this.productions_[action[1]][0]);
              vstack.push(yyval.$);
              lstack.push(yyval._$);
              newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
              stack.push(newState);
              break;
          case 3:
              return true;
          }
      }
      return true;
  }};
  /* generated by jison-lex 0.3.4 */
  var lexer = (function(){
  var lexer = ({

  EOF:1,

  parseError:function parseError(str, hash) {
          if (this.yy.parser) {
              this.yy.parser.parseError(str, hash);
          } else {
              throw new Error(str);
          }
      },

  // resets the lexer, sets new input
  setInput:function (input, yy) {
          this.yy = yy || this.yy || {};
          this._input = input;
          this._more = this._backtrack = this.done = false;
          this.yylineno = this.yyleng = 0;
          this.yytext = this.matched = this.match = '';
          this.conditionStack = ['INITIAL'];
          this.yylloc = {
              first_line: 1,
              first_column: 0,
              last_line: 1,
              last_column: 0
          };
          if (this.options.ranges) {
              this.yylloc.range = [0,0];
          }
          this.offset = 0;
          return this;
      },

  // consumes and returns one char from the input
  input:function () {
          var ch = this._input[0];
          this.yytext += ch;
          this.yyleng++;
          this.offset++;
          this.match += ch;
          this.matched += ch;
          var lines = ch.match(/(?:\r\n?|\n).*/g);
          if (lines) {
              this.yylineno++;
              this.yylloc.last_line++;
          } else {
              this.yylloc.last_column++;
          }
          if (this.options.ranges) {
              this.yylloc.range[1]++;
          }

          this._input = this._input.slice(1);
          return ch;
      },

  // unshifts one char (or a string) into the input
  unput:function (ch) {
          var len = ch.length;
          var lines = ch.split(/(?:\r\n?|\n)/g);

          this._input = ch + this._input;
          this.yytext = this.yytext.substr(0, this.yytext.length - len);
          //this.yyleng -= len;
          this.offset -= len;
          var oldLines = this.match.split(/(?:\r\n?|\n)/g);
          this.match = this.match.substr(0, this.match.length - 1);
          this.matched = this.matched.substr(0, this.matched.length - 1);

          if (lines.length - 1) {
              this.yylineno -= lines.length - 1;
          }
          var r = this.yylloc.range;

          this.yylloc = {
              first_line: this.yylloc.first_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.first_column,
              last_column: lines ?
                  (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                   + oldLines[oldLines.length - lines.length].length - lines[0].length :
                this.yylloc.first_column - len
          };

          if (this.options.ranges) {
              this.yylloc.range = [r[0], r[0] + this.yyleng - len];
          }
          this.yyleng = this.yytext.length;
          return this;
      },

  // When called from action, caches matched text and appends it on next action
  more:function () {
          this._more = true;
          return this;
      },

  // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
  reject:function () {
          if (this.options.backtrack_lexer) {
              this._backtrack = true;
          } else {
              return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                  text: "",
                  token: null,
                  line: this.yylineno
              });

          }
          return this;
      },

  // retain first n characters of the match
  less:function (n) {
          this.unput(this.match.slice(n));
      },

  // displays already matched input, i.e. for error messages
  pastInput:function () {
          var past = this.matched.substr(0, this.matched.length - this.match.length);
          return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
      },

  // displays upcoming input, i.e. for error messages
  upcomingInput:function () {
          var next = this.match;
          if (next.length < 20) {
              next += this._input.substr(0, 20-next.length);
          }
          return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
      },

  // displays the character position where the lexing error occurred, i.e. for error messages
  showPosition:function () {
          var pre = this.pastInput();
          var c = new Array(pre.length + 1).join("-");
          return pre + this.upcomingInput() + "\n" + c + "^";
      },

  // test the lexed token: return FALSE when not a match, otherwise return token
  test_match:function (match, indexed_rule) {
          var token,
              lines,
              backup;

          if (this.options.backtrack_lexer) {
              // save context
              backup = {
                  yylineno: this.yylineno,
                  yylloc: {
                      first_line: this.yylloc.first_line,
                      last_line: this.last_line,
                      first_column: this.yylloc.first_column,
                      last_column: this.yylloc.last_column
                  },
                  yytext: this.yytext,
                  match: this.match,
                  matches: this.matches,
                  matched: this.matched,
                  yyleng: this.yyleng,
                  offset: this.offset,
                  _more: this._more,
                  _input: this._input,
                  yy: this.yy,
                  conditionStack: this.conditionStack.slice(0),
                  done: this.done
              };
              if (this.options.ranges) {
                  backup.yylloc.range = this.yylloc.range.slice(0);
              }
          }

          lines = match[0].match(/(?:\r\n?|\n).*/g);
          if (lines) {
              this.yylineno += lines.length;
          }
          this.yylloc = {
              first_line: this.yylloc.last_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.last_column,
              last_column: lines ?
                           lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                           this.yylloc.last_column + match[0].length
          };
          this.yytext += match[0];
          this.match += match[0];
          this.matches = match;
          this.yyleng = this.yytext.length;
          if (this.options.ranges) {
              this.yylloc.range = [this.offset, this.offset += this.yyleng];
          }
          this._more = false;
          this._backtrack = false;
          this._input = this._input.slice(match[0].length);
          this.matched += match[0];
          token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
          if (this.done && this._input) {
              this.done = false;
          }
          if (token) {
              return token;
          } else if (this._backtrack) {
              // recover context
              for (var k in backup) {
                  this[k] = backup[k];
              }
              return false; // rule action called reject() implying the next rule should be tested instead.
          }
          return false;
      },

  // return next match in input
  next:function () {
          if (this.done) {
              return this.EOF;
          }
          if (!this._input) {
              this.done = true;
          }

          var token,
              match,
              tempMatch,
              index;
          if (!this._more) {
              this.yytext = '';
              this.match = '';
          }
          var rules = this._currentRules();
          for (var i = 0; i < rules.length; i++) {
              tempMatch = this._input.match(this.rules[rules[i]]);
              if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                  match = tempMatch;
                  index = i;
                  if (this.options.backtrack_lexer) {
                      token = this.test_match(tempMatch, rules[i]);
                      if (token !== false) {
                          return token;
                      } else if (this._backtrack) {
                          match = false;
                          continue; // rule action called reject() implying a rule MISmatch.
                      } else {
                          // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                          return false;
                      }
                  } else if (!this.options.flex) {
                      break;
                  }
              }
          }
          if (match) {
              token = this.test_match(match, rules[index]);
              if (token !== false) {
                  return token;
              }
              // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
              return false;
          }
          if (this._input === "") {
              return this.EOF;
          } else {
              return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                  text: "",
                  token: null,
                  line: this.yylineno
              });
          }
      },

  // return next match that has a token
  lex:function lex() {
          var r = this.next();
          if (r) {
              return r;
          } else {
              return this.lex();
          }
      },

  // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
  begin:function begin(condition) {
          this.conditionStack.push(condition);
      },

  // pop the previously active lexer condition state off the condition stack
  popState:function popState() {
          var n = this.conditionStack.length - 1;
          if (n > 0) {
              return this.conditionStack.pop();
          } else {
              return this.conditionStack[0];
          }
      },

  // produce the lexer rule set which is active for the currently active lexer condition state
  _currentRules:function _currentRules() {
          if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
              return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
          } else {
              return this.conditions["INITIAL"].rules;
          }
      },

  // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
  topState:function topState(n) {
          n = this.conditionStack.length - 1 - Math.abs(n || 0);
          if (n >= 0) {
              return this.conditionStack[n];
          } else {
              return "INITIAL";
          }
      },

  // alias for begin(condition)
  pushState:function pushState(condition) {
          this.begin(condition);
      },

  // return the number of states currently on the stack
  stateStackSize:function stateStackSize() {
          return this.conditionStack.length;
      },
  options: {},
  performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
  switch($avoiding_name_collisions) {
  case 0:/* skip whitespace */
  break;
  case 1:return 6
  break;
  case 2:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2); return 4
  break;
  case 3:return 17
  break;
  case 4:return 18
  break;
  case 5:return 23
  break;
  case 6:return 24
  break;
  case 7:return 22
  break;
  case 8:return 21
  break;
  case 9:return 10
  break;
  case 10:return 11
  break;
  case 11:return 8
  break;
  case 12:return 14
  break;
  case 13:return 'INVALID'
  break;
  }
  },
  rules: [/^(?:\s+)/,/^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/,/^(?:"(?:\\[\\"bfnrt/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/,/^(?:\{)/,/^(?:\})/,/^(?:\[)/,/^(?:\])/,/^(?:,)/,/^(?::)/,/^(?:true\b)/,/^(?:false\b)/,/^(?:null\b)/,/^(?:$)/,/^(?:.)/],
  conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13],"inclusive":true}}
  });
  return lexer;
  })();
  parser.lexer = lexer;
  function Parser () {
    this.yy = {};
  }
  Parser.prototype = parser;parser.Parser = Parser;
  return new Parser;
  })();


  if (typeof commonjsRequire !== 'undefined' && 'object' !== 'undefined') {
  exports.parser = parser;
  exports.Parser = parser.Parser;
  exports.parse = function () { return parser.parse.apply(parser, arguments); };
  }
  });
  var jsonlint_1 = jsonlint.parser;
  var jsonlint_2 = jsonlint.Parser;
  var jsonlint_3 = jsonlint.parse;

  function validateStyle$$1(style, styleSpec) {
      if (style instanceof String || typeof style === 'string' || style instanceof Buffer) {
          try {
              style = jsonlint.parse(style.toString());
          } catch (e) {
              return [new ParsingError$1(e)];
          }
      }
      styleSpec = styleSpec || v8;
      return validateStyleMin(style, styleSpec);
  }

  var expression$1 = {
      StyleExpression: StyleExpression,
      isExpression: isExpression,
      createExpression: createExpression,
      createPropertyExpression: createPropertyExpression,
      normalizePropertyExpression: normalizePropertyExpression,
      ZoomConstantExpression: ZoomConstantExpression,
      ZoomDependentExpression: ZoomDependentExpression,
      StylePropertyFunction: StylePropertyFunction
  };
  var styleFunction = {
      convertFunction: convertFunction,
      createFunction: createFunction,
      isFunction: isFunction$1
  };
  var visit = {
      eachSource: eachSource,
      eachLayer: eachLayer,
      eachProperty: eachProperty
  };
  validateStyle$$1.parsed = validateStyle$$1;
  validateStyle$$1.latest = validateStyle$$1;

  exports.v8 = v8;
  exports.latest = v8;
  exports.format = format;
  exports.migrate = migrate;
  exports.composite = composite;
  exports.diff = diffStyles;
  exports.ValidationError = ValidationError;
  exports.ParsingError = ParsingError$1;
  exports.expression = expression$1;
  exports.featureFilter = createFilter;
  exports.Color = Color;
  exports.function = styleFunction;
  exports.validate = validateStyle$$1;
  exports.visit = visit;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/@mapbox/mapbox-gl-style-spec/reference/latest.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-gl-style-spec/reference/latest.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v8_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v8.json */ "./node_modules/@mapbox/mapbox-gl-style-spec/reference/v8.json");
var _v8_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./v8.json */ "./node_modules/@mapbox/mapbox-gl-style-spec/reference/v8.json", 1);


/* harmony default export */ __webpack_exports__["default"] = (_v8_json__WEBPACK_IMPORTED_MODULE_0__);


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-gl-style-spec/reference/v8.json":
/*!*********************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-gl-style-spec/reference/v8.json ***!
  \*********************************************************************/
/*! exports provided: $version, $root, sources, source, source_vector, source_raster, source_raster_dem, source_geojson, source_video, source_image, layer, layout, layout_background, layout_fill, layout_circle, layout_heatmap, layout_fill-extrusion, layout_line, layout_symbol, layout_raster, layout_hillshade, filter, filter_operator, geometry_type, function, function_stop, expression, expression_name, light, paint, paint_fill, paint_fill-extrusion, paint_line, paint_circle, paint_heatmap, paint_symbol, paint_raster, paint_hillshade, paint_background, transition, property-type, default */
/***/ (function(module) {

module.exports = {"$version":8,"$root":{"version":{"required":true,"type":"enum","values":[8],"doc":"Style specification version number. Must be 8.","example":8},"name":{"type":"string","doc":"A human-readable name for the style.","example":"Bright"},"metadata":{"type":"*","doc":"Arbitrary properties useful to track with the stylesheet, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'."},"center":{"type":"array","value":"number","doc":"Default map center in longitude and latitude.  The style center will be used only if the map has not been positioned by other means (e.g. map options or user interaction).","example":[-73.9749,40.7736]},"zoom":{"type":"number","doc":"Default zoom level.  The style zoom will be used only if the map has not been positioned by other means (e.g. map options or user interaction).","example":12.5},"bearing":{"type":"number","default":0,"period":360,"units":"degrees","doc":"Default bearing, in degrees. The bearing is the compass direction that is \"up\"; for example, a bearing of 90° orients the map so that east is up. This value will be used only if the map has not been positioned by other means (e.g. map options or user interaction).","example":29},"pitch":{"type":"number","default":0,"units":"degrees","doc":"Default pitch, in degrees. Zero is perpendicular to the surface, for a look straight down at the map, while a greater value like 60 looks ahead towards the horizon. The style pitch will be used only if the map has not been positioned by other means (e.g. map options or user interaction).","example":50},"light":{"type":"light","doc":"The global light source.","example":{"anchor":"viewport","color":"white","intensity":0.4}},"sources":{"required":true,"type":"sources","doc":"Data source specifications.","example":{"mapbox-streets":{"type":"vector","url":"mapbox://mapbox.mapbox-streets-v6"}}},"sprite":{"type":"string","doc":"A base URL for retrieving the sprite image and metadata. The extensions `.png`, `.json` and scale factor `@2x.png` will be automatically appended. This property is required if any layer uses the `background-pattern`, `fill-pattern`, `line-pattern`, `fill-extrusion-pattern`, or `icon-image` properties. The URL must be absolute, containing the [scheme, authority and path components](https://en.wikipedia.org/wiki/URL#Syntax).","example":"mapbox://sprites/mapbox/bright-v8"},"glyphs":{"type":"string","doc":"A URL template for loading signed-distance-field glyph sets in PBF format. The URL must include `{fontstack}` and `{range}` tokens. This property is required if any layer uses the `text-field` layout property. The URL must be absolute, containing the [scheme, authority and path components](https://en.wikipedia.org/wiki/URL#Syntax).","example":"mapbox://fonts/mapbox/{fontstack}/{range}.pbf"},"transition":{"type":"transition","doc":"A global transition definition to use as a default across properties, to be used for timing transitions between one value and the next when no property-specific transition is set. Collision-based symbol fading is controlled independently of the style's `transition` property.","example":{"duration":300,"delay":0}},"layers":{"required":true,"type":"array","value":"layer","doc":"Layers will be drawn in the order of this array.","example":[{"id":"water","source":"mapbox-streets","source-layer":"water","type":"fill","paint":{"fill-color":"#00ffff"}}]}},"sources":{"*":{"type":"source","doc":"Specification of a data source. For vector and raster sources, either TileJSON or a URL to a TileJSON must be provided. For image and video sources, a URL must be provided. For GeoJSON sources, a URL or inline GeoJSON must be provided."}},"source":["source_vector","source_raster","source_raster_dem","source_geojson","source_video","source_image"],"source_vector":{"type":{"required":true,"type":"enum","values":{"vector":{"doc":"A vector tile source."}},"doc":"The type of the source."},"url":{"type":"string","doc":"A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<mapid>`."},"tiles":{"type":"array","value":"string","doc":"An array of one or more tile source URLs, as in the TileJSON spec."},"bounds":{"type":"array","value":"number","length":4,"default":[-180,-85.051129,180,85.051129],"doc":"An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by Mapbox GL."},"scheme":{"type":"enum","values":{"xyz":{"doc":"Slippy map tilenames scheme."},"tms":{"doc":"OSGeo spec scheme."}},"default":"xyz","doc":"Influences the y direction of the tile coordinates. The global-mercator (aka Spherical Mercator) profile is assumed."},"minzoom":{"type":"number","default":0,"doc":"Minimum zoom level for which tiles are available, as in the TileJSON spec."},"maxzoom":{"type":"number","default":22,"doc":"Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."},"attribution":{"type":"string","doc":"Contains an attribution to be displayed when the map is shown to a user."},"*":{"type":"*","doc":"Other keys to configure the data source."}},"source_raster":{"type":{"required":true,"type":"enum","values":{"raster":{"doc":"A raster tile source."}},"doc":"The type of the source."},"url":{"type":"string","doc":"A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<mapid>`."},"tiles":{"type":"array","value":"string","doc":"An array of one or more tile source URLs, as in the TileJSON spec."},"bounds":{"type":"array","value":"number","length":4,"default":[-180,-85.051129,180,85.051129],"doc":"An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by Mapbox GL."},"minzoom":{"type":"number","default":0,"doc":"Minimum zoom level for which tiles are available, as in the TileJSON spec."},"maxzoom":{"type":"number","default":22,"doc":"Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."},"tileSize":{"type":"number","default":512,"units":"pixels","doc":"The minimum visual size to display tiles for this layer. Only configurable for raster layers."},"scheme":{"type":"enum","values":{"xyz":{"doc":"Slippy map tilenames scheme."},"tms":{"doc":"OSGeo spec scheme."}},"default":"xyz","doc":"Influences the y direction of the tile coordinates. The global-mercator (aka Spherical Mercator) profile is assumed."},"attribution":{"type":"string","doc":"Contains an attribution to be displayed when the map is shown to a user."},"*":{"type":"*","doc":"Other keys to configure the data source."}},"source_raster_dem":{"type":{"required":true,"type":"enum","values":{"raster-dem":{"doc":"A RGB-encoded raster DEM source"}},"doc":"The type of the source."},"url":{"type":"string","doc":"A URL to a TileJSON resource. Supported protocols are `http:`, `https:`, and `mapbox://<mapid>`."},"tiles":{"type":"array","value":"string","doc":"An array of one or more tile source URLs, as in the TileJSON spec."},"bounds":{"type":"array","value":"number","length":4,"default":[-180,-85.051129,180,85.051129],"doc":"An array containing the longitude and latitude of the southwest and northeast corners of the source's bounding box in the following order: `[sw.lng, sw.lat, ne.lng, ne.lat]`. When this property is included in a source, no tiles outside of the given bounds are requested by Mapbox GL."},"minzoom":{"type":"number","default":0,"doc":"Minimum zoom level for which tiles are available, as in the TileJSON spec."},"maxzoom":{"type":"number","default":22,"doc":"Maximum zoom level for which tiles are available, as in the TileJSON spec. Data from tiles at the maxzoom are used when displaying the map at higher zoom levels."},"tileSize":{"type":"number","default":512,"units":"pixels","doc":"The minimum visual size to display tiles for this layer. Only configurable for raster layers."},"attribution":{"type":"string","doc":"Contains an attribution to be displayed when the map is shown to a user."},"encoding":{"type":"enum","values":{"terrarium":{"doc":"Terrarium format PNG tiles. See https://aws.amazon.com/es/public-datasets/terrain/ for more info."},"mapbox":{"doc":"Mapbox Terrain RGB tiles. See https://www.mapbox.com/help/access-elevation-data/#mapbox-terrain-rgb for more info."}},"default":"mapbox","doc":"The encoding used by this source. Mapbox Terrain RGB is used by default"},"*":{"type":"*","doc":"Other keys to configure the data source."}},"source_geojson":{"type":{"required":true,"type":"enum","values":{"geojson":{"doc":"A GeoJSON data source."}},"doc":"The data type of the GeoJSON source."},"data":{"type":"*","doc":"A URL to a GeoJSON file, or inline GeoJSON."},"maxzoom":{"type":"number","default":18,"doc":"Maximum zoom level at which to create vector tiles (higher means greater detail at high zoom levels)."},"attribution":{"type":"string","doc":"Contains an attribution to be displayed when the map is shown to a user."},"buffer":{"type":"number","default":128,"maximum":512,"minimum":0,"doc":"Size of the tile buffer on each side. A value of 0 produces no buffer. A value of 512 produces a buffer as wide as the tile itself. Larger values produce fewer rendering artifacts near tile edges and slower performance."},"tolerance":{"type":"number","default":0.375,"doc":"Douglas-Peucker simplification tolerance (higher means simpler geometries and faster performance)."},"cluster":{"type":"boolean","default":false,"doc":"If the data is a collection of point features, setting this to true clusters the points by radius into groups. Cluster groups become new `Point` features in the source with additional properties:\n * `cluster` Is `true` if the point is a cluster \n * `cluster_id` A unqiue id for the cluster to be used in conjunction with the [cluster inspection methods](https://www.mapbox.com/mapbox-gl-js/api/#geojsonsource#getclusterexpansionzoom)\n * `point_count` Number of original points grouped into this cluster\n * `point_count_abbreviated` An abbreviated point count"},"clusterRadius":{"type":"number","default":50,"minimum":0,"doc":"Radius of each cluster if clustering is enabled. A value of 512 indicates a radius equal to the width of a tile."},"clusterMaxZoom":{"type":"number","doc":"Max zoom on which to cluster points if clustering is enabled. Defaults to one zoom less than maxzoom (so that last zoom features are not clustered)."},"clusterProperties":{"type":"*","doc":"An object defining custom properties on the generated clusters if clustering is enabled, aggregating values from clustered points. Has the form `{\"property_name\": [operator, map_expression]}`. `operator` is any expression function that accepts at least 2 operands (e.g. `\"+\"` or `\"max\"`) — it accumulates the property value from clusters/points the cluster contains; `map_expression` produces the value of a single point.\n\nExample: `{\"sum\": [\"+\", [\"get\", \"scalerank\"]]}`.\n\nFor more advanced use cases, in place of `operator`, you can use a custom reduce expression that references a special `[\"accumulated\"]` value, e.g.:\n`{\"sum\": [[\"+\", [\"accumulated\"], [\"get\", \"sum\"]], [\"get\", \"scalerank\"]]}`"},"lineMetrics":{"type":"boolean","default":false,"doc":"Whether to calculate line distance metrics. This is required for line layers that specify `line-gradient` values."},"generateId":{"type":"boolean","default":false,"doc":"Whether to generate ids for the geojson features. When enabled, the `feature.id` property will be auto assigned based on its index in the `features` array, over-writing any previous values."}},"source_video":{"type":{"required":true,"type":"enum","values":{"video":{"doc":"A video data source."}},"doc":"The data type of the video source."},"urls":{"required":true,"type":"array","value":"string","doc":"URLs to video content in order of preferred format."},"coordinates":{"required":true,"doc":"Corners of video specified in longitude, latitude pairs.","type":"array","length":4,"value":{"type":"array","length":2,"value":"number","doc":"A single longitude, latitude pair."}}},"source_image":{"type":{"required":true,"type":"enum","values":{"image":{"doc":"An image data source."}},"doc":"The data type of the image source."},"url":{"required":true,"type":"string","doc":"URL that points to an image."},"coordinates":{"required":true,"doc":"Corners of image specified in longitude, latitude pairs.","type":"array","length":4,"value":{"type":"array","length":2,"value":"number","doc":"A single longitude, latitude pair."}}},"layer":{"id":{"type":"string","doc":"Unique layer name.","required":true},"type":{"type":"enum","values":{"fill":{"doc":"A filled polygon with an optional stroked border.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"}}},"line":{"doc":"A stroked line.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"}}},"symbol":{"doc":"An icon or a text label.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"}}},"circle":{"doc":"A filled circle.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"}}},"heatmap":{"doc":"A heatmap.","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"fill-extrusion":{"doc":"An extruded (3D) polygon.","sdk-support":{"basic functionality":{"js":"0.27.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"}}},"raster":{"doc":"Raster map textures such as satellite imagery.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"}}},"hillshade":{"doc":"Client-side hillshading visualization based on DEM data. Currently, the implementation only supports Mapbox Terrain RGB and Mapzen Terrarium tiles.","sdk-support":{"basic functionality":{"js":"0.43.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"background":{"doc":"The background color or pattern of the map.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"}}}},"doc":"Rendering type of this layer.","required":true},"metadata":{"type":"*","doc":"Arbitrary properties useful to track with the layer, but do not influence rendering. Properties should be prefixed to avoid collisions, like 'mapbox:'."},"source":{"type":"string","doc":"Name of a source description to be used for this layer. Required for all layer types except `background`."},"source-layer":{"type":"string","doc":"Layer to use from a vector tile source. Required for vector tile sources; prohibited for all other source types, including GeoJSON sources."},"minzoom":{"type":"number","minimum":0,"maximum":24,"doc":"The minimum zoom level for the layer. At zoom levels less than the minzoom, the layer will be hidden."},"maxzoom":{"type":"number","minimum":0,"maximum":24,"doc":"The maximum zoom level for the layer. At zoom levels equal to or greater than the maxzoom, the layer will be hidden."},"filter":{"type":"filter","doc":"A expression specifying conditions on source features. Only features that match the filter are displayed. Zoom expressions in filters are only evaluated at integer zoom levels. The `feature-state` expression is not supported in filter expressions."},"layout":{"type":"layout","doc":"Layout properties for the layer."},"paint":{"type":"paint","doc":"Default paint properties for this layer."}},"layout":["layout_fill","layout_line","layout_circle","layout_heatmap","layout_fill-extrusion","layout_symbol","layout_raster","layout_hillshade","layout_background"],"layout_background":{"visibility":{"type":"enum","values":{"visible":{"doc":"The layer is shown."},"none":{"doc":"The layer is not shown."}},"default":"visible","doc":"Whether this layer is displayed.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"}},"property-type":"constant"}},"layout_fill":{"visibility":{"type":"enum","values":{"visible":{"doc":"The layer is shown."},"none":{"doc":"The layer is not shown."}},"default":"visible","doc":"Whether this layer is displayed.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"}},"property-type":"constant"}},"layout_circle":{"visibility":{"type":"enum","values":{"visible":{"doc":"The layer is shown."},"none":{"doc":"The layer is not shown."}},"default":"visible","doc":"Whether this layer is displayed.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"}},"property-type":"constant"}},"layout_heatmap":{"visibility":{"type":"enum","values":{"visible":{"doc":"The layer is shown."},"none":{"doc":"The layer is not shown."}},"default":"visible","doc":"Whether this layer is displayed.","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}},"property-type":"constant"}},"layout_fill-extrusion":{"visibility":{"type":"enum","values":{"visible":{"doc":"The layer is shown."},"none":{"doc":"The layer is not shown."}},"default":"visible","doc":"Whether this layer is displayed.","sdk-support":{"basic functionality":{"js":"0.27.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"}},"property-type":"constant"}},"layout_line":{"line-cap":{"type":"enum","values":{"butt":{"doc":"A cap with a squared-off end which is drawn to the exact endpoint of the line."},"round":{"doc":"A cap with a rounded end which is drawn beyond the endpoint of the line at a radius of one-half of the line's width and centered on the endpoint of the line."},"square":{"doc":"A cap with a squared-off end which is drawn beyond the endpoint of the line at a distance of one-half of the line's width."}},"default":"butt","doc":"The display of line endings.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"line-join":{"type":"enum","values":{"bevel":{"doc":"A join with a squared-off end which is drawn beyond the endpoint of the line at a distance of one-half of the line's width."},"round":{"doc":"A join with a rounded end which is drawn beyond the endpoint of the line at a radius of one-half of the line's width and centered on the endpoint of the line."},"miter":{"doc":"A join with a sharp, angled corner which is drawn with the outer sides beyond the endpoint of the path until they meet."}},"default":"miter","doc":"The display of lines when joining.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.40.0","android":"5.2.0","ios":"3.7.0","macos":"0.6.0"}},"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"line-miter-limit":{"type":"number","default":2,"doc":"Used to automatically convert miter joins to bevel joins for sharp angles.","requires":[{"line-join":"miter"}],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"line-round-limit":{"type":"number","default":1.05,"doc":"Used to automatically convert round joins to miter joins for shallow angles.","requires":[{"line-join":"round"}],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"visibility":{"type":"enum","values":{"visible":{"doc":"The layer is shown."},"none":{"doc":"The layer is not shown."}},"default":"visible","doc":"Whether this layer is displayed.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"property-type":"constant"}},"layout_symbol":{"symbol-placement":{"type":"enum","values":{"point":{"doc":"The label is placed at the point where the geometry is located."},"line":{"doc":"The label is placed along the line of the geometry. Can only be used on `LineString` and `Polygon` geometries."},"line-center":{"doc":"The label is placed at the center of the line of the geometry. Can only be used on `LineString` and `Polygon` geometries. Note that a single feature in a vector tile may contain multiple line geometries."}},"default":"point","doc":"Label placement relative to its geometry.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"`line-center` value":{"js":"0.47.0","android":"6.4.0","ios":"4.3.0","macos":"0.10.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"symbol-spacing":{"type":"number","default":250,"minimum":1,"units":"pixels","doc":"Distance between two symbol anchors.","requires":[{"symbol-placement":"line"}],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"symbol-avoid-edges":{"type":"boolean","default":false,"doc":"If true, the symbols will not cross tile edges to avoid mutual collisions. Recommended in layers that don't have enough padding in the vector tile to prevent collisions, or if it is a point symbol layer placed after a line symbol layer.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"symbol-sort-key":{"type":"number","doc":"Sorts features in ascending order based on this value. Features with a higher sort key will appear above features with a lower sort key wehn they overlap. Features with a lower sort key will have priority over other features when doing placement.","sdk-support":{"js":"0.53.0"},"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"symbol-z-order":{"type":"enum","values":{"auto":{"doc":"If `symbol-sort-key` is set, sort based on that. Otherwise sort symbols by their position relative to the viewport."},"viewport-y":{"doc":"Symbols will be sorted by their y-position relative to the viewport."},"source":{"doc":"Symbols will be rendered in the same order as the source data with no sorting applied."}},"default":"auto","doc":"Controls the order in which overlapping symbols in the same layer are rendered","sdk-support":{"basic functionality":{"js":"0.49.0","android":"6.6.0","ios":"4.5.0","macos":"0.12.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-allow-overlap":{"type":"boolean","default":false,"doc":"If true, the icon will be visible even if it collides with other previously drawn symbols.","requires":["icon-image"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-ignore-placement":{"type":"boolean","default":false,"doc":"If true, other symbols can be visible even if they collide with the icon.","requires":["icon-image"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-optional":{"type":"boolean","default":false,"doc":"If true, text will display without their corresponding icons when the icon collides with other symbols and the text does not.","requires":["icon-image","text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-rotation-alignment":{"type":"enum","values":{"map":{"doc":"When `symbol-placement` is set to `point`, aligns icons east-west. When `symbol-placement` is set to `line` or `line-center`, aligns icon x-axes with the line."},"viewport":{"doc":"Produces icons whose x-axes are aligned with the x-axis of the viewport, regardless of the value of `symbol-placement`."},"auto":{"doc":"When `symbol-placement` is set to `point`, this is equivalent to `viewport`. When `symbol-placement` is set to `line` or `line-center`, this is equivalent to `map`."}},"default":"auto","doc":"In combination with `symbol-placement`, determines the rotation behavior of icons.","requires":["icon-image"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"`auto` value":{"js":"0.25.0","android":"4.2.0","ios":"3.4.0","macos":"0.3.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-size":{"type":"number","default":1,"minimum":0,"units":"factor of the original icon size","doc":"Scales the original size of the icon by the provided factor. The new pixel size of the image will be the original pixel size multiplied by `icon-size`. 1 is the original size; 3 triples the size of the image.","requires":["icon-image"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.35.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-text-fit":{"type":"enum","values":{"none":{"doc":"The icon is displayed at its intrinsic aspect ratio."},"width":{"doc":"The icon is scaled in the x-dimension to fit the width of the text."},"height":{"doc":"The icon is scaled in the y-dimension to fit the height of the text."},"both":{"doc":"The icon is scaled in both x- and y-dimensions."}},"default":"none","doc":"Scales the icon to fit around the associated text.","requires":["icon-image","text-field"],"sdk-support":{"basic functionality":{"js":"0.21.0","android":"4.2.0","ios":"3.4.0","macos":"0.2.1"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-text-fit-padding":{"type":"array","value":"number","length":4,"default":[0,0,0,0],"units":"pixels","doc":"Size of the additional area added to dimensions determined by `icon-text-fit`, in clockwise order: top, right, bottom, left.","requires":["icon-image","text-field",{"icon-text-fit":["both","width","height"]}],"sdk-support":{"basic functionality":{"js":"0.21.0","android":"4.2.0","ios":"3.4.0","macos":"0.2.1"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"icon-image":{"type":"string","doc":"Name of image in sprite to use for drawing an image background.","tokens":true,"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.35.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"}},"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-rotate":{"type":"number","default":0,"period":360,"units":"degrees","doc":"Rotates the icon clockwise.","requires":["icon-image"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.21.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-padding":{"type":"number","default":2,"minimum":0,"units":"pixels","doc":"Size of the additional area around the icon bounding box used for detecting symbol collisions.","requires":["icon-image"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"icon-keep-upright":{"type":"boolean","default":false,"doc":"If true, the icon may be flipped to prevent it from being rendered upside-down.","requires":["icon-image",{"icon-rotation-alignment":"map"},{"symbol-placement":["line","line-center"]}],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"icon-offset":{"type":"array","value":"number","length":2,"default":[0,0],"doc":"Offset distance of icon from its anchor. Positive values indicate right and down, while negative values indicate left and up. Each component is multiplied by the value of `icon-size` to obtain the final offset in pixels. When combined with `icon-rotate` the offset will be as if the rotated direction was up.","requires":["icon-image"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.29.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-anchor":{"type":"enum","values":{"center":{"doc":"The center of the icon is placed closest to the anchor."},"left":{"doc":"The left side of the icon is placed closest to the anchor."},"right":{"doc":"The right side of the icon is placed closest to the anchor."},"top":{"doc":"The top of the icon is placed closest to the anchor."},"bottom":{"doc":"The bottom of the icon is placed closest to the anchor."},"top-left":{"doc":"The top left corner of the icon is placed closest to the anchor."},"top-right":{"doc":"The top right corner of the icon is placed closest to the anchor."},"bottom-left":{"doc":"The bottom left corner of the icon is placed closest to the anchor."},"bottom-right":{"doc":"The bottom right corner of the icon is placed closest to the anchor."}},"default":"center","doc":"Part of the icon placed closest to the anchor.","requires":["icon-image"],"sdk-support":{"basic functionality":{"js":"0.40.0","android":"5.2.0","ios":"3.7.0","macos":"0.6.0"},"data-driven styling":{"js":"0.40.0","android":"5.2.0","ios":"3.7.0","macos":"0.6.0"}},"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"icon-pitch-alignment":{"type":"enum","values":{"map":{"doc":"The icon is aligned to the plane of the map."},"viewport":{"doc":"The icon is aligned to the plane of the viewport."},"auto":{"doc":"Automatically matches the value of `icon-rotation-alignment`."}},"default":"auto","doc":"Orientation of icon when map is pitched.","requires":["icon-image"],"sdk-support":{"basic functionality":{"js":"0.39.0","android":"5.2.0","ios":"3.7.0","macos":"0.6.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-pitch-alignment":{"type":"enum","values":{"map":{"doc":"The text is aligned to the plane of the map."},"viewport":{"doc":"The text is aligned to the plane of the viewport."},"auto":{"doc":"Automatically matches the value of `text-rotation-alignment`."}},"default":"auto","doc":"Orientation of text when map is pitched.","requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.21.0","android":"4.2.0","ios":"3.4.0","macos":"0.2.1"},"`auto` value":{"js":"0.25.0","android":"4.2.0","ios":"3.4.0","macos":"0.3.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-rotation-alignment":{"type":"enum","values":{"map":{"doc":"When `symbol-placement` is set to `point`, aligns text east-west. When `symbol-placement` is set to `line` or `line-center`, aligns text x-axes with the line."},"viewport":{"doc":"Produces glyphs whose x-axes are aligned with the x-axis of the viewport, regardless of the value of `symbol-placement`."},"auto":{"doc":"When `symbol-placement` is set to `point`, this is equivalent to `viewport`. When `symbol-placement` is set to `line` or `line-center`, this is equivalent to `map`."}},"default":"auto","doc":"In combination with `symbol-placement`, determines the rotation behavior of the individual glyphs forming the text.","requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"`auto` value":{"js":"0.25.0","android":"4.2.0","ios":"3.4.0","macos":"0.3.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-field":{"type":"formatted","default":"","tokens":true,"doc":"Value to use for a text label. If a plain `string` is provided, it will be treated as a `formatted` with default/inherited formatting options.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.33.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-font":{"type":"array","value":"string","default":["Open Sans Regular","Arial Unicode MS Regular"],"doc":"Font stack to use for displaying text.","requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.43.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}},"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-size":{"type":"number","default":16,"minimum":0,"units":"pixels","doc":"Font size.","requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.35.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-max-width":{"type":"number","default":10,"minimum":0,"units":"ems","doc":"The maximum line width for text wrapping.","requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.40.0","android":"5.2.0","ios":"3.7.0","macos":"0.6.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-line-height":{"type":"number","default":1.2,"units":"ems","doc":"Text leading value for multi-line text.","requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"text-letter-spacing":{"type":"number","default":0,"units":"ems","doc":"Text tracking amount.","requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.40.0","android":"5.2.0","ios":"3.7.0","macos":"0.6.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-justify":{"type":"enum","values":{"left":{"doc":"The text is aligned to the left."},"center":{"doc":"The text is centered."},"right":{"doc":"The text is aligned to the right."}},"default":"center","doc":"Text justification options.","requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.39.0","android":"5.2.0","ios":"3.7.0","macos":"0.6.0"}},"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-anchor":{"type":"enum","values":{"center":{"doc":"The center of the text is placed closest to the anchor."},"left":{"doc":"The left side of the text is placed closest to the anchor."},"right":{"doc":"The right side of the text is placed closest to the anchor."},"top":{"doc":"The top of the text is placed closest to the anchor."},"bottom":{"doc":"The bottom of the text is placed closest to the anchor."},"top-left":{"doc":"The top left corner of the text is placed closest to the anchor."},"top-right":{"doc":"The top right corner of the text is placed closest to the anchor."},"bottom-left":{"doc":"The bottom left corner of the text is placed closest to the anchor."},"bottom-right":{"doc":"The bottom right corner of the text is placed closest to the anchor."}},"default":"center","doc":"Part of the text placed closest to the anchor.","requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.39.0","android":"5.2.0","ios":"3.7.0","macos":"0.6.0"}},"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-max-angle":{"type":"number","default":45,"units":"degrees","doc":"Maximum angle change between adjacent characters.","requires":["text-field",{"symbol-placement":["line","line-center"]}],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"text-rotate":{"type":"number","default":0,"period":360,"units":"degrees","doc":"Rotates the text clockwise.","requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.35.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-padding":{"type":"number","default":2,"minimum":0,"units":"pixels","doc":"Size of the additional area around the text bounding box used for detecting symbol collisions.","requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"text-keep-upright":{"type":"boolean","default":true,"doc":"If true, the text may be flipped vertically to prevent it from being rendered upside-down.","requires":["text-field",{"text-rotation-alignment":"map"},{"symbol-placement":["line","line-center"]}],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-transform":{"type":"enum","values":{"none":{"doc":"The text is not altered."},"uppercase":{"doc":"Forces all letters to be displayed in uppercase."},"lowercase":{"doc":"Forces all letters to be displayed in lowercase."}},"default":"none","doc":"Specifies how to capitalize text, similar to the CSS `text-transform` property.","requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.33.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-offset":{"type":"array","doc":"Offset distance of text from its anchor. Positive values indicate right and down, while negative values indicate left and up.","value":"number","units":"ems","length":2,"default":[0,0],"requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.35.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature"]},"property-type":"data-driven"},"text-allow-overlap":{"type":"boolean","default":false,"doc":"If true, the text will be visible even if it collides with other previously drawn symbols.","requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-ignore-placement":{"type":"boolean","default":false,"doc":"If true, other symbols can be visible even if they collide with the text.","requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-optional":{"type":"boolean","default":false,"doc":"If true, icons will display without their corresponding text when the text collides with other symbols and the icon does not.","requires":["text-field","icon-image"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"visibility":{"type":"enum","values":{"visible":{"doc":"The layer is shown."},"none":{"doc":"The layer is not shown."}},"default":"visible","doc":"Whether this layer is displayed.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"property-type":"constant"}},"layout_raster":{"visibility":{"type":"enum","values":{"visible":{"doc":"The layer is shown."},"none":{"doc":"The layer is not shown."}},"default":"visible","doc":"Whether this layer is displayed.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"property-type":"constant"}},"layout_hillshade":{"visibility":{"type":"enum","values":{"visible":{"doc":"The layer is shown."},"none":{"doc":"The layer is not shown."}},"default":"visible","doc":"Whether this layer is displayed.","sdk-support":{"basic functionality":{"js":"0.43.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"},"data-driven styling":{}},"property-type":"constant"}},"filter":{"type":"array","value":"*","doc":"A filter selects specific features from a layer."},"filter_operator":{"type":"enum","values":{"==":{"doc":"`[\"==\", key, value]` equality: `feature[key] = value`"},"!=":{"doc":"`[\"!=\", key, value]` inequality: `feature[key] ≠ value`"},">":{"doc":"`[\">\", key, value]` greater than: `feature[key] > value`"},">=":{"doc":"`[\">=\", key, value]` greater than or equal: `feature[key] ≥ value`"},"<":{"doc":"`[\"<\", key, value]` less than: `feature[key] < value`"},"<=":{"doc":"`[\"<=\", key, value]` less than or equal: `feature[key] ≤ value`"},"in":{"doc":"`[\"in\", key, v0, ..., vn]` set inclusion: `feature[key] ∈ {v0, ..., vn}`"},"!in":{"doc":"`[\"!in\", key, v0, ..., vn]` set exclusion: `feature[key] ∉ {v0, ..., vn}`"},"all":{"doc":"`[\"all\", f0, ..., fn]` logical `AND`: `f0 ∧ ... ∧ fn`"},"any":{"doc":"`[\"any\", f0, ..., fn]` logical `OR`: `f0 ∨ ... ∨ fn`"},"none":{"doc":"`[\"none\", f0, ..., fn]` logical `NOR`: `¬f0 ∧ ... ∧ ¬fn`"},"has":{"doc":"`[\"has\", key]` `feature[key]` exists"},"!has":{"doc":"`[\"!has\", key]` `feature[key]` does not exist"}},"doc":"The filter operator."},"geometry_type":{"type":"enum","values":{"Point":{"doc":"Filter to point geometries."},"LineString":{"doc":"Filter to line geometries."},"Polygon":{"doc":"Filter to polygon geometries."}},"doc":"The geometry type for the filter to select."},"function":{"expression":{"type":"expression","doc":"An expression."},"stops":{"type":"array","doc":"An array of stops.","value":"function_stop"},"base":{"type":"number","default":1,"minimum":0,"doc":"The exponential base of the interpolation curve. It controls the rate at which the result increases. Higher values make the result increase more towards the high end of the range. With `1` the stops are interpolated linearly."},"property":{"type":"string","doc":"The name of a feature property to use as the function input.","default":"$zoom"},"type":{"type":"enum","values":{"identity":{"doc":"Return the input value as the output value."},"exponential":{"doc":"Generate an output by interpolating between stops just less than and just greater than the function input."},"interval":{"doc":"Return the output value of the stop just less than the function input."},"categorical":{"doc":"Return the output value of the stop equal to the function input."}},"doc":"The interpolation strategy to use in function evaluation.","default":"exponential"},"colorSpace":{"type":"enum","values":{"rgb":{"doc":"Use the RGB color space to interpolate color values"},"lab":{"doc":"Use the LAB color space to interpolate color values."},"hcl":{"doc":"Use the HCL color space to interpolate color values, interpolating the Hue, Chroma, and Luminance channels individually."}},"doc":"The color space in which colors interpolated. Interpolating colors in perceptual color spaces like LAB and HCL tend to produce color ramps that look more consistent and produce colors that can be differentiated more easily than those interpolated in RGB space.","default":"rgb"},"default":{"type":"*","required":false,"doc":"A value to serve as a fallback function result when a value isn't otherwise available. It is used in the following circumstances:\n* In categorical functions, when the feature value does not match any of the stop domain values.\n* In property and zoom-and-property functions, when a feature does not contain a value for the specified property.\n* In identity functions, when the feature value is not valid for the style property (for example, if the function is being used for a `circle-color` property but the feature property value is not a string or not a valid color).\n* In interval or exponential property and zoom-and-property functions, when the feature value is not numeric.\nIf no default is provided, the style property's default is used in these circumstances."}},"function_stop":{"type":"array","minimum":0,"maximum":22,"value":["number","color"],"length":2,"doc":"Zoom level and value pair."},"expression":{"type":"array","value":"*","minimum":1,"doc":"An expression defines a function that can be used for data-driven style properties or feature filters."},"expression_name":{"doc":"","type":"enum","values":{"let":{"doc":"Binds expressions to named variables, which can then be referenced in the result expression using [\"var\", \"variable_name\"].","group":"Variable binding","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"var":{"doc":"References variable bound using \"let\".","group":"Variable binding","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"literal":{"doc":"Provides a literal array or object value.","group":"Types","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"array":{"doc":"Asserts that the input is an array (optionally with a specific item type and length).  If, when the input expression is evaluated, it is not of the asserted type, then this assertion will cause the whole expression to be aborted.","group":"Types","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"at":{"doc":"Retrieves an item from an array.","group":"Lookup","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"case":{"doc":"Selects the first output whose corresponding test condition evaluates to true.","group":"Decision","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"match":{"doc":"Selects the output whose label value matches the input value, or the fallback value if no match is found. The input can be any expression (e.g. `[\"get\", \"building_type\"]`). Each label must either be a single literal value or an array of literal values (e.g. `\"a\"` or `[\"c\", \"b\"]`), and those values must be all strings or all numbers. (The values `\"1\"` and `1` cannot both be labels in the same match expression.) Each label must be unique. If the input type does not match the type of the labels, the result will be the fallback value.","group":"Decision","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"coalesce":{"doc":"Evaluates each expression in turn until the first non-null value is obtained, and returns that value.","group":"Decision","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"step":{"doc":"Produces discrete, stepped results by evaluating a piecewise-constant function defined by pairs of input and output values (\"stops\"). The `input` may be any numeric expression (e.g., `[\"get\", \"population\"]`). Stop inputs must be numeric literals in strictly ascending order. Returns the output value of the stop just less than the input, or the first input if the input is less than the first stop.","group":"Ramps, scales, curves","sdk-support":{"basic functionality":{"js":"0.42.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"interpolate":{"doc":"Produces continuous, smooth results by interpolating between pairs of input and output values (\"stops\"). The `input` may be any numeric expression (e.g., `[\"get\", \"population\"]`). Stop inputs must be numeric literals in strictly ascending order. The output type must be `number`, `array<number>`, or `color`.\n\nInterpolation types:\n- `[\"linear\"]`: interpolates linearly between the pair of stops just less than and just greater than the input.\n- `[\"exponential\", base]`: interpolates exponentially between the stops just less than and just greater than the input. `base` controls the rate at which the output increases: higher values make the output increase more towards the high end of the range. With values close to 1 the output increases linearly.\n- `[\"cubic-bezier\", x1, y1, x2, y2]`: interpolates using the cubic bezier curve defined by the given control points.","group":"Ramps, scales, curves","sdk-support":{"basic functionality":{"js":"0.42.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"interpolate-hcl":{"doc":"Produces continuous, smooth results by interpolating between pairs of input and output values (\"stops\"). Works like `interpolate`, but the output type must be `color`, and the interpolation is performed in the Hue-Chroma-Luminance color space.","group":"Ramps, scales, curves","sdk-support":{"basic functionality":{"js":"0.49.0"}}},"interpolate-lab":{"doc":"Produces continuous, smooth results by interpolating between pairs of input and output values (\"stops\"). Works like `interpolate`, but the output type must be `color`, and the interpolation is performed in the CIELAB color space.","group":"Ramps, scales, curves","sdk-support":{"basic functionality":{"js":"0.49.0"}}},"ln2":{"doc":"Returns mathematical constant ln(2).","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"pi":{"doc":"Returns the mathematical constant pi.","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"e":{"doc":"Returns the mathematical constant e.","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"typeof":{"doc":"Returns a string describing the type of the given value.","group":"Types","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"string":{"doc":"Asserts that the input value is a string. If multiple values are provided, each one is evaluated in order until a string is obtained. If none of the inputs are strings, the expression is an error.","group":"Types","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"number":{"doc":"Asserts that the input value is a number. If multiple values are provided, each one is evaluated in order until a number is obtained. If none of the inputs are numbers, the expression is an error.","group":"Types","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"boolean":{"doc":"Asserts that the input value is a boolean. If multiple values are provided, each one is evaluated in order until a boolean is obtained. If none of the inputs are booleans, the expression is an error.","group":"Types","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"object":{"doc":"Asserts that the input value is an object. If multiple values are provided, each one is evaluated in order until an object is obtained. If none of the inputs are objects, the expression is an error.","group":"Types","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"collator":{"doc":"Returns a `collator` for use in locale-dependent comparison operations. The `case-sensitive` and `diacritic-sensitive` options default to `false`. The `locale` argument specifies the IETF language tag of the locale to use. If none is provided, the default locale is used. If the requested locale is not available, the `collator` will use a system-defined fallback locale. Use `resolved-locale` to test the results of locale fallback behavior.","group":"Types","sdk-support":{"basic functionality":{"js":"0.45.0","android":"6.5.0","ios":"4.2.0","macos":"0.9.0"}}},"format":{"doc":"Returns `formatted` text containing annotations for use in mixed-format `text-field` entries. If set, the `text-font` argument overrides the font specified by the root layout properties. If set, the `font-scale` argument specifies a scaling factor relative to the `text-size` specified in the root layout properties.","group":"Types","sdk-support":{"basic functionality":{"js":"0.48.0","android":"6.7.0","ios":"4.6.0","macos":"0.12.0"}}},"number-format":{"doc":"Converts the input number into a string representation using the providing formatting rules. If set, the `locale` argument specifies the locale to use, as a BCP 47 language tag. If set, the `currency` argument specifies an ISO 4217 code to use for currency-style formatting. If set, the `min-fraction-digits` and `max-fraction-digits` arguments specify the minimum and maximum number of fractional digits to include.","group":"Types","sdk-support":{"basic functionality":{"js":"0.54.0"}}},"to-string":{"doc":"Converts the input value to a string. If the input is `null`, the result is `\"\"`. If the input is a boolean, the result is `\"true\"` or `\"false\"`. If the input is a number, it is converted to a string as specified by the [\"NumberToString\" algorithm](https://tc39.github.io/ecma262/#sec-tostring-applied-to-the-number-type) of the ECMAScript Language Specification. If the input is a color, it is converted to a string of the form `\"rgba(r,g,b,a)\"`, where `r`, `g`, and `b` are numerals ranging from 0 to 255, and `a` ranges from 0 to 1. Otherwise, the input is converted to a string in the format specified by the [`JSON.stringify`](https://tc39.github.io/ecma262/#sec-json.stringify) function of the ECMAScript Language Specification.","group":"Types","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"to-number":{"doc":"Converts the input value to a number, if possible. If the input is `null` or `false`, the result is 0. If the input is `true`, the result is 1. If the input is a string, it is converted to a number as specified by the [\"ToNumber Applied to the String Type\" algorithm](https://tc39.github.io/ecma262/#sec-tonumber-applied-to-the-string-type) of the ECMAScript Language Specification. If multiple values are provided, each one is evaluated in order until the first successful conversion is obtained. If none of the inputs can be converted, the expression is an error.","group":"Types","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"to-boolean":{"doc":"Converts the input value to a boolean. The result is `false` when then input is an empty string, 0, `false`, `null`, or `NaN`; otherwise it is `true`.","group":"Types","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"to-rgba":{"doc":"Returns a four-element array containing the input color's red, green, blue, and alpha components, in that order.","group":"Color","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"to-color":{"doc":"Converts the input value to a color. If multiple values are provided, each one is evaluated in order until the first successful conversion is obtained. If none of the inputs can be converted, the expression is an error.","group":"Types","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"rgb":{"doc":"Creates a color value from red, green, and blue components, which must range between 0 and 255, and an alpha component of 1. If any component is out of range, the expression is an error.","group":"Color","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"rgba":{"doc":"Creates a color value from red, green, blue components, which must range between 0 and 255, and an alpha component which must range between 0 and 1. If any component is out of range, the expression is an error.","group":"Color","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"get":{"doc":"Retrieves a property value from the current feature's properties, or from another object if a second argument is provided. Returns null if the requested property is missing.","group":"Lookup","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"has":{"doc":"Tests for the presence of an property value in the current feature's properties, or from another object if a second argument is provided.","group":"Lookup","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"length":{"doc":"Gets the length of an array or string.","group":"Lookup","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"properties":{"doc":"Gets the feature properties object.  Note that in some cases, it may be more efficient to use [\"get\", \"property_name\"] directly.","group":"Feature data","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"feature-state":{"doc":"Retrieves a property value from the current feature's state. Returns null if the requested property is not present on the feature's state. A feature's state is not part of the GeoJSON or vector tile data, and must be set programmatically on each feature. Note that [\"feature-state\"] can only be used with paint properties that support data-driven styling.","group":"Feature data","sdk-support":{"basic functionality":{"js":"0.46.0"}}},"geometry-type":{"doc":"Gets the feature's geometry type: Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon.","group":"Feature data","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"id":{"doc":"Gets the feature's id, if it has one.","group":"Feature data","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"zoom":{"doc":"Gets the current zoom level.  Note that in style layout and paint properties, [\"zoom\"] may only appear as the input to a top-level \"step\" or \"interpolate\" expression.","group":"Zoom","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"heatmap-density":{"doc":"Gets the kernel density estimation of a pixel in a heatmap layer, which is a relative measure of how many data points are crowded around a particular pixel. Can only be used in the `heatmap-color` property.","group":"Heatmap","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"line-progress":{"doc":"Gets the progress along a gradient line. Can only be used in the `line-gradient` property.","group":"Feature data","sdk-support":{"basic functionality":{"js":"0.45.0","android":"6.5.0","ios":"4.6.0","macos":"0.12.0"}}},"accumulated":{"doc":"Gets the value of a cluster property accumulated so far. Can only be used in the `clusterProperties` option of a clustered GeoJSON source.","group":"Feature data","sdk-support":{"basic functionality":{"js":"0.53.0"}}},"+":{"doc":"Returns the sum of the inputs.","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"*":{"doc":"Returns the product of the inputs.","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"-":{"doc":"For two inputs, returns the result of subtracting the second input from the first. For a single input, returns the result of subtracting it from 0.","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"/":{"doc":"Returns the result of floating point division of the first input by the second.","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"%":{"doc":"Returns the remainder after integer division of the first input by the second.","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"^":{"doc":"Returns the result of raising the first input to the power specified by the second.","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"sqrt":{"doc":"Returns the square root of the input.","group":"Math","sdk-support":{"basic functionality":{"js":"0.42.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"log10":{"doc":"Returns the base-ten logarithm of the input.","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"ln":{"doc":"Returns the natural logarithm of the input.","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"log2":{"doc":"Returns the base-two logarithm of the input.","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"sin":{"doc":"Returns the sine of the input.","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"cos":{"doc":"Returns the cosine of the input.","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"tan":{"doc":"Returns the tangent of the input.","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"asin":{"doc":"Returns the arcsine of the input.","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"acos":{"doc":"Returns the arccosine of the input.","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"atan":{"doc":"Returns the arctangent of the input.","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"min":{"doc":"Returns the minimum value of the inputs.","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"max":{"doc":"Returns the maximum value of the inputs.","group":"Math","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"round":{"doc":"Rounds the input to the nearest integer. Halfway values are rounded away from zero. For example, `[\"round\", -1.5]` evaluates to -2.","group":"Math","sdk-support":{"basic functionality":{"js":"0.45.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"abs":{"doc":"Returns the absolute value of the input.","group":"Math","sdk-support":{"basic functionality":{"js":"0.45.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"ceil":{"doc":"Returns the smallest integer that is greater than or equal to the input.","group":"Math","sdk-support":{"basic functionality":{"js":"0.45.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"floor":{"doc":"Returns the largest integer that is less than or equal to the input.","group":"Math","sdk-support":{"basic functionality":{"js":"0.45.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"==":{"doc":"Returns `true` if the input values are equal, `false` otherwise. The comparison is strictly typed: values of different runtime types are always considered unequal. Cases where the types are known to be different at parse time are considered invalid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.","group":"Decision","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"},"collator":{"js":"0.45.0","android":"6.5.0","ios":"4.2.0","macos":"0.9.0"}}},"!=":{"doc":"Returns `true` if the input values are not equal, `false` otherwise. The comparison is strictly typed: values of different runtime types are always considered unequal. Cases where the types are known to be different at parse time are considered invalid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.","group":"Decision","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"},"collator":{"js":"0.45.0","android":"6.5.0","ios":"4.2.0","macos":"0.9.0"}}},">":{"doc":"Returns `true` if the first input is strictly greater than the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.","group":"Decision","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"},"collator":{"js":"0.45.0","android":"6.5.0","ios":"4.2.0","macos":"0.9.0"}}},"<":{"doc":"Returns `true` if the first input is strictly less than the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.","group":"Decision","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"},"collator":{"js":"0.45.0","android":"6.5.0","ios":"4.2.0","macos":"0.9.0"}}},">=":{"doc":"Returns `true` if the first input is greater than or equal to the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.","group":"Decision","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"},"collator":{"js":"0.45.0","android":"6.5.0","ios":"4.2.0","macos":"0.9.0"}}},"<=":{"doc":"Returns `true` if the first input is less than or equal to the second, `false` otherwise. The arguments are required to be either both strings or both numbers; if during evaluation they are not, expression evaluation produces an error. Cases where this constraint is known not to hold at parse time are considered in valid and will produce a parse error. Accepts an optional `collator` argument to control locale-dependent string comparisons.","group":"Decision","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"},"collator":{"js":"0.45.0","android":"6.5.0","ios":"4.2.0","macos":"0.9.0"}}},"all":{"doc":"Returns `true` if all the inputs are `true`, `false` otherwise. The inputs are evaluated in order, and evaluation is short-circuiting: once an input expression evaluates to `false`, the result is `false` and no further input expressions are evaluated.","group":"Decision","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"any":{"doc":"Returns `true` if any of the inputs are `true`, `false` otherwise. The inputs are evaluated in order, and evaluation is short-circuiting: once an input expression evaluates to `true`, the result is `true` and no further input expressions are evaluated.","group":"Decision","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"!":{"doc":"Logical negation. Returns `true` if the input is `false`, and `false` if the input is `true`.","group":"Decision","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"is-supported-script":{"doc":"Returns `true` if the input string is expected to render legibly. Returns `false` if the input string contains sections that cannot be rendered without potential loss of meaning (e.g. Indic scripts that require complex text shaping, or right-to-left scripts if the the `mapbox-gl-rtl-text` plugin is not in use in Mapbox GL JS).","group":"String"},"upcase":{"doc":"Returns the input string converted to uppercase. Follows the Unicode Default Case Conversion algorithm and the locale-insensitive case mappings in the Unicode Character Database.","group":"String","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"downcase":{"doc":"Returns the input string converted to lowercase. Follows the Unicode Default Case Conversion algorithm and the locale-insensitive case mappings in the Unicode Character Database.","group":"String","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"concat":{"doc":"Returns a `string` consisting of the concatenation of the inputs. Each input is converted to a string as if by `to-string`.","group":"String","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}}},"resolved-locale":{"doc":"Returns the IETF language tag of the locale being used by the provided `collator`. This can be used to determine the default system locale, or to determine if a requested locale was successfully loaded.","group":"String","sdk-support":{"basic functionality":{"js":"0.45.0","android":"6.5.0","ios":"4.2.0","macos":"0.9.0"}}}}},"light":{"anchor":{"type":"enum","default":"viewport","values":{"map":{"doc":"The position of the light source is aligned to the rotation of the map."},"viewport":{"doc":"The position of the light source is aligned to the rotation of the viewport."}},"property-type":"data-constant","transition":false,"expression":{"interpolated":false,"parameters":["zoom"]},"doc":"Whether extruded geometries are lit relative to the map or viewport.","example":"map","sdk-support":{"basic functionality":{"js":"0.27.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"}}},"position":{"type":"array","default":[1.15,210,30],"length":3,"value":"number","property-type":"data-constant","transition":true,"expression":{"interpolated":true,"parameters":["zoom"]},"doc":"Position of the light source relative to lit (extruded) geometries, in [r radial coordinate, a azimuthal angle, p polar angle] where r indicates the distance from the center of the base of an object to its light, a indicates the position of the light relative to 0° (0° when `light.anchor` is set to `viewport` corresponds to the top of the viewport, or 0° when `light.anchor` is set to `map` corresponds to due north, and degrees proceed clockwise), and p indicates the height of the light (from 0°, directly above, to 180°, directly below).","example":[1.5,90,80],"sdk-support":{"basic functionality":{"js":"0.27.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"}}},"color":{"type":"color","property-type":"data-constant","default":"#ffffff","expression":{"interpolated":true,"parameters":["zoom"]},"transition":true,"doc":"Color tint for lighting extruded geometries.","sdk-support":{"basic functionality":{"js":"0.27.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"}}},"intensity":{"type":"number","property-type":"data-constant","default":0.5,"minimum":0,"maximum":1,"expression":{"interpolated":true,"parameters":["zoom"]},"transition":true,"doc":"Intensity of lighting (on a scale from 0 to 1). Higher numbers will present as more extreme contrast.","sdk-support":{"basic functionality":{"js":"0.27.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"}}}},"paint":["paint_fill","paint_line","paint_circle","paint_heatmap","paint_fill-extrusion","paint_symbol","paint_raster","paint_hillshade","paint_background"],"paint_fill":{"fill-antialias":{"type":"boolean","default":true,"doc":"Whether or not the fill should be antialiased.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"fill-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"doc":"The opacity of the entire fill layer. In contrast to the `fill-color`, this value will also affect the 1px stroke around the fill, if the stroke is used.","transition":true,"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.21.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-color":{"type":"color","default":"#000000","doc":"The color of the filled part of this layer. This color can be specified as `rgba` with an alpha component and the color's opacity will not affect the opacity of the 1px stroke, if it is used.","transition":true,"requires":[{"!":"fill-pattern"}],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.19.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-outline-color":{"type":"color","doc":"The outline color of the fill. Matches the value of `fill-color` if unspecified.","transition":true,"requires":[{"!":"fill-pattern"},{"fill-antialias":true}],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.19.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","doc":"The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"fill-translate-anchor":{"type":"enum","values":{"map":{"doc":"The fill is translated relative to the map."},"viewport":{"doc":"The fill is translated relative to the viewport."}},"doc":"Controls the frame of reference for `fill-translate`.","default":"map","requires":["fill-translate"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"fill-pattern":{"type":"string","transition":true,"doc":"Name of image in sprite to use for drawing image fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.49.0","android":"6.5.0","macos":"0.11.0","ios":"4.4.0"}},"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"cross-faded-data-driven"}},"paint_fill-extrusion":{"fill-extrusion-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"doc":"The opacity of the entire fill extrusion layer. This is rendered on a per-layer, not per-feature, basis, and data-driven styling is not available.","transition":true,"sdk-support":{"basic functionality":{"js":"0.27.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"fill-extrusion-color":{"type":"color","default":"#000000","doc":"The base color of the extruded fill. The extrusion's surfaces will be shaded differently based on this color in combination with the root `light` settings. If this color is specified as `rgba` with an alpha component, the alpha component will be ignored; use `fill-extrusion-opacity` to set layer opacity.","transition":true,"requires":[{"!":"fill-extrusion-pattern"}],"sdk-support":{"basic functionality":{"js":"0.27.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"},"data-driven styling":{"js":"0.27.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","doc":"The geometry's offset. Values are [x, y] where negatives indicate left and up (on the flat plane), respectively.","sdk-support":{"basic functionality":{"js":"0.27.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"fill-extrusion-translate-anchor":{"type":"enum","values":{"map":{"doc":"The fill extrusion is translated relative to the map."},"viewport":{"doc":"The fill extrusion is translated relative to the viewport."}},"doc":"Controls the frame of reference for `fill-extrusion-translate`.","default":"map","requires":["fill-extrusion-translate"],"sdk-support":{"basic functionality":{"js":"0.27.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"fill-extrusion-pattern":{"type":"string","transition":true,"doc":"Name of image in sprite to use for drawing images on extruded fills. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.","sdk-support":{"basic functionality":{"js":"0.27.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"},"data-driven styling":{"js":"0.49.0","android":"6.5.0","macos":"0.11.0","ios":"4.4.0"}},"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"cross-faded-data-driven"},"fill-extrusion-height":{"type":"number","default":0,"minimum":0,"units":"meters","doc":"The height with which to extrude this layer.","transition":true,"sdk-support":{"basic functionality":{"js":"0.27.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"},"data-driven styling":{"js":"0.27.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-base":{"type":"number","default":0,"minimum":0,"units":"meters","doc":"The height with which to extrude the base of this layer. Must be less than or equal to `fill-extrusion-height`.","transition":true,"requires":["fill-extrusion-height"],"sdk-support":{"basic functionality":{"js":"0.27.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"},"data-driven styling":{"js":"0.27.0","android":"5.1.0","ios":"3.6.0","macos":"0.5.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-vertical-gradient":{"type":"boolean","default":true,"doc":"Whether to apply a vertical gradient to the sides of a fill-extrusion layer. If true, sides will be shaded slightly darker farther down.","transition":false,"sdk-support":{"basic functionality":{"js":"0.50.0","ios":"4.7.0","macos":"0.13.0"}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_line":{"line-opacity":{"type":"number","doc":"The opacity at which the line will be drawn.","default":1,"minimum":0,"maximum":1,"transition":true,"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.29.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-color":{"type":"color","doc":"The color with which the line will be drawn.","default":"#000000","transition":true,"requires":[{"!":"line-pattern"}],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.23.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","doc":"The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"line-translate-anchor":{"type":"enum","values":{"map":{"doc":"The line is translated relative to the map."},"viewport":{"doc":"The line is translated relative to the viewport."}},"doc":"Controls the frame of reference for `line-translate`.","default":"map","requires":["line-translate"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"line-width":{"type":"number","default":1,"minimum":0,"transition":true,"units":"pixels","doc":"Stroke thickness.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.39.0","android":"5.2.0","ios":"3.7.0","macos":"0.6.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-gap-width":{"type":"number","default":0,"minimum":0,"doc":"Draws a line casing outside of a line's actual path. Value indicates the width of the inner gap.","transition":true,"units":"pixels","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.29.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-offset":{"type":"number","default":0,"doc":"The line's offset. For linear features, a positive value offsets the line to the right, relative to the direction of the line, and a negative value to the left. For polygon features, a positive value results in an inset, and a negative value results in an outset.","transition":true,"units":"pixels","sdk-support":{"basic functionality":{"js":"0.12.1","android":"3.0.0","ios":"3.1.0","macos":"0.1.0"},"data-driven styling":{"js":"0.29.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-blur":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","doc":"Blur applied to the line, in pixels.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.29.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-dasharray":{"type":"array","value":"number","doc":"Specifies the lengths of the alternating dashes and gaps that form the dash pattern. The lengths are later scaled by the line width. To convert a dash length to pixels, multiply the length by the current line width. Note that GeoJSON sources with `lineMetrics: true` specified won't render dashed lines to the expected scale. Also note that zoom-dependent expressions will be evaluated only at integer zoom levels.","minimum":0,"transition":true,"units":"line widths","requires":[{"!":"line-pattern"}],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"cross-faded"},"line-pattern":{"type":"string","transition":true,"doc":"Name of image in sprite to use for drawing image lines. For seamless patterns, image width must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.49.0","android":"6.5.0","macos":"0.11.0","ios":"4.4.0"}},"expression":{"interpolated":false,"parameters":["zoom","feature"]},"property-type":"cross-faded-data-driven"},"line-gradient":{"type":"color","doc":"Defines a gradient with which to color a line feature. Can only be used with GeoJSON sources that specify `\"lineMetrics\": true`.","transition":false,"requires":[{"!":"line-dasharray"},{"!":"line-pattern"},{"source":"geojson","has":{"lineMetrics":true}}],"sdk-support":{"basic functionality":{"js":"0.45.0","android":"6.5.0","ios":"4.4.0","macos":"0.11.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["line-progress"]},"property-type":"color-ramp"}},"paint_circle":{"circle-radius":{"type":"number","default":5,"minimum":0,"transition":true,"units":"pixels","doc":"Circle radius.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.18.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-color":{"type":"color","default":"#000000","doc":"The fill color of the circle.","transition":true,"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.18.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-blur":{"type":"number","default":0,"doc":"Amount to blur the circle. 1 blurs the circle such that only the centerpoint is full opacity.","transition":true,"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.20.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-opacity":{"type":"number","doc":"The opacity at which the circle will be drawn.","default":1,"minimum":0,"maximum":1,"transition":true,"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.20.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","doc":"The geometry's offset. Values are [x, y] where negatives indicate left and up, respectively.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"circle-translate-anchor":{"type":"enum","values":{"map":{"doc":"The circle is translated relative to the map."},"viewport":{"doc":"The circle is translated relative to the viewport."}},"doc":"Controls the frame of reference for `circle-translate`.","default":"map","requires":["circle-translate"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"circle-pitch-scale":{"type":"enum","values":{"map":{"doc":"Circles are scaled according to their apparent distance to the camera."},"viewport":{"doc":"Circles are not scaled."}},"default":"map","doc":"Controls the scaling behavior of the circle when the map is pitched.","sdk-support":{"basic functionality":{"js":"0.21.0","android":"4.2.0","ios":"3.4.0","macos":"0.2.1"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"circle-pitch-alignment":{"type":"enum","values":{"map":{"doc":"The circle is aligned to the plane of the map."},"viewport":{"doc":"The circle is aligned to the plane of the viewport."}},"default":"viewport","doc":"Orientation of circle when map is pitched.","sdk-support":{"basic functionality":{"js":"0.39.0","android":"5.2.0","ios":"3.7.0","macos":"0.6.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"circle-stroke-width":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","doc":"The width of the circle's stroke. Strokes are placed outside of the `circle-radius`.","sdk-support":{"basic functionality":{"js":"0.29.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"},"data-driven styling":{"js":"0.29.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-stroke-color":{"type":"color","default":"#000000","doc":"The stroke color of the circle.","transition":true,"sdk-support":{"basic functionality":{"js":"0.29.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"},"data-driven styling":{"js":"0.29.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-stroke-opacity":{"type":"number","doc":"The opacity of the circle's stroke.","default":1,"minimum":0,"maximum":1,"transition":true,"sdk-support":{"basic functionality":{"js":"0.29.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"},"data-driven styling":{"js":"0.29.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"}},"paint_heatmap":{"heatmap-radius":{"type":"number","default":30,"minimum":1,"transition":true,"units":"pixels","doc":"Radius of influence of one heatmap point in pixels. Increasing the value makes the heatmap smoother, but less detailed.","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"},"data-driven styling":{"js":"0.43.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"heatmap-weight":{"type":"number","default":1,"minimum":0,"transition":false,"doc":"A measure of how much an individual point contributes to the heatmap. A value of 10 would be equivalent to having 10 points of weight 1 in the same spot. Especially useful when combined with clustering.","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"},"data-driven styling":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"heatmap-intensity":{"type":"number","default":1,"minimum":0,"transition":true,"doc":"Similar to `heatmap-weight` but controls the intensity of the heatmap globally. Primarily used for adjusting the heatmap based on zoom level.","sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"heatmap-color":{"type":"color","default":["interpolate",["linear"],["heatmap-density"],0,"rgba(0, 0, 255, 0)",0.1,"royalblue",0.3,"cyan",0.5,"lime",0.7,"yellow",1,"red"],"doc":"Defines the color of each pixel based on its density value in a heatmap.  Should be an expression that uses `[\"heatmap-density\"]` as input.","transition":false,"sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["heatmap-density"]},"property-type":"color-ramp"},"heatmap-opacity":{"type":"number","doc":"The global opacity at which the heatmap layer will be drawn.","default":1,"minimum":0,"maximum":1,"transition":true,"sdk-support":{"basic functionality":{"js":"0.41.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_symbol":{"icon-opacity":{"doc":"The opacity at which the icon will be drawn.","type":"number","default":1,"minimum":0,"maximum":1,"transition":true,"requires":["icon-image"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.33.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-color":{"type":"color","default":"#000000","transition":true,"doc":"The color of the icon. This can only be used with sdf icons.","requires":["icon-image"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.33.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-color":{"type":"color","default":"rgba(0, 0, 0, 0)","transition":true,"doc":"The color of the icon's halo. Icon halos can only be used with SDF icons.","requires":["icon-image"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.33.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-width":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","doc":"Distance of halo to the icon outline.","requires":["icon-image"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.33.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-blur":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","doc":"Fade out the halo towards the outside.","requires":["icon-image"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.33.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","doc":"Distance that the icon's anchor is moved from its original placement. Positive values indicate right and down, while negative values indicate left and up.","requires":["icon-image"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"icon-translate-anchor":{"type":"enum","values":{"map":{"doc":"Icons are translated relative to the map."},"viewport":{"doc":"Icons are translated relative to the viewport."}},"doc":"Controls the frame of reference for `icon-translate`.","default":"map","requires":["icon-image","icon-translate"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"text-opacity":{"type":"number","doc":"The opacity at which the text will be drawn.","default":1,"minimum":0,"maximum":1,"transition":true,"requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.33.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-color":{"type":"color","doc":"The color with which the text will be drawn.","default":"#000000","transition":true,"requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.33.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-color":{"type":"color","default":"rgba(0, 0, 0, 0)","transition":true,"doc":"The color of the text's halo, which helps it stand out from backgrounds.","requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.33.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-width":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","doc":"Distance of halo to the font outline. Max text halo width is 1/4 of the font-size.","requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.33.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-blur":{"type":"number","default":0,"minimum":0,"transition":true,"units":"pixels","doc":"The halo's fadeout distance towards the outside.","requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{"js":"0.33.0","android":"5.0.0","ios":"3.5.0","macos":"0.4.0"}},"expression":{"interpolated":true,"parameters":["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-translate":{"type":"array","value":"number","length":2,"default":[0,0],"transition":true,"units":"pixels","doc":"Distance that the text's anchor is moved from its original placement. Positive values indicate right and down, while negative values indicate left and up.","requires":["text-field"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"text-translate-anchor":{"type":"enum","values":{"map":{"doc":"The text is translated relative to the map."},"viewport":{"doc":"The text is translated relative to the viewport."}},"doc":"Controls the frame of reference for `text-translate`.","default":"map","requires":["text-field","text-translate"],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_raster":{"raster-opacity":{"type":"number","doc":"The opacity at which the image will be drawn.","default":1,"minimum":0,"maximum":1,"transition":true,"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-hue-rotate":{"type":"number","default":0,"period":360,"transition":true,"units":"degrees","doc":"Rotates hues around the color wheel.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-brightness-min":{"type":"number","doc":"Increase or reduce the brightness of the image. The value is the minimum brightness.","default":0,"minimum":0,"maximum":1,"transition":true,"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-brightness-max":{"type":"number","doc":"Increase or reduce the brightness of the image. The value is the maximum brightness.","default":1,"minimum":0,"maximum":1,"transition":true,"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-saturation":{"type":"number","doc":"Increase or reduce the saturation of the image.","default":0,"minimum":-1,"maximum":1,"transition":true,"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-contrast":{"type":"number","doc":"Increase or reduce the contrast of the image.","default":0,"minimum":-1,"maximum":1,"transition":true,"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"raster-resampling":{"type":"enum","doc":"The resampling/interpolation method to use for overscaling, also known as texture magnification filter","values":{"linear":{"doc":"(Bi)linear filtering interpolates pixel values using the weighted average of the four closest original source pixels creating a smooth but blurry look when overscaled"},"nearest":{"doc":"Nearest neighbor filtering interpolates pixel values using the nearest original source pixel creating a sharp but pixelated look when overscaled"}},"default":"linear","sdk-support":{"basic functionality":{"js":"0.47.0","android":"6.3.0","ios":"4.2.0","macos":"0.9.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"raster-fade-duration":{"type":"number","default":300,"minimum":0,"transition":false,"units":"milliseconds","doc":"Fade duration when a new tile is added.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_hillshade":{"hillshade-illumination-direction":{"type":"number","default":335,"minimum":0,"maximum":359,"doc":"The direction of the light source used to generate the hillshading with 0 as the top of the viewport if `hillshade-illumination-anchor` is set to `viewport` and due north if `hillshade-illumination-anchor` is set to `map`.","transition":false,"sdk-support":{"basic functionality":{"js":"0.43.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-illumination-anchor":{"type":"enum","values":{"map":{"doc":"The hillshade illumination is relative to the north direction."},"viewport":{"doc":"The hillshade illumination is relative to the top of the viewport."}},"default":"viewport","doc":"Direction of light source when map is rotated.","sdk-support":{"basic functionality":{"js":"0.43.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"},"data-driven styling":{}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-exaggeration":{"type":"number","doc":"Intensity of the hillshade","default":0.5,"minimum":0,"maximum":1,"transition":true,"sdk-support":{"basic functionality":{"js":"0.43.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-shadow-color":{"type":"color","default":"#000000","doc":"The shading color of areas that face away from the light source.","transition":true,"sdk-support":{"basic functionality":{"js":"0.43.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-highlight-color":{"type":"color","default":"#FFFFFF","doc":"The shading color of areas that faces towards the light source.","transition":true,"sdk-support":{"basic functionality":{"js":"0.43.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"hillshade-accent-color":{"type":"color","default":"#000000","doc":"The shading color used to accentuate rugged terrain like sharp cliffs and gorges.","transition":true,"sdk-support":{"basic functionality":{"js":"0.43.0","android":"6.0.0","ios":"4.0.0","macos":"0.7.0"},"data-driven styling":{}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"}},"paint_background":{"background-color":{"type":"color","default":"#000000","doc":"The color with which the background will be drawn.","transition":true,"requires":[{"!":"background-pattern"}],"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"},"background-pattern":{"type":"string","transition":true,"doc":"Name of image in sprite to use for drawing an image background. For seamless patterns, image width and height must be a factor of two (2, 4, 8, ..., 512). Note that zoom-dependent expressions will be evaluated only at integer zoom levels.","sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"}},"expression":{"interpolated":false,"parameters":["zoom"]},"property-type":"cross-faded"},"background-opacity":{"type":"number","default":1,"minimum":0,"maximum":1,"doc":"The opacity at which the background will be drawn.","transition":true,"sdk-support":{"basic functionality":{"js":"0.10.0","android":"2.0.1","ios":"2.0.0","macos":"0.1.0"}},"expression":{"interpolated":true,"parameters":["zoom"]},"property-type":"data-constant"}},"transition":{"duration":{"type":"number","default":300,"minimum":0,"units":"milliseconds","doc":"Time allotted for transitions to complete."},"delay":{"type":"number","default":0,"minimum":0,"units":"milliseconds","doc":"Length of time before a transition begins."}},"property-type":{"data-driven":{"type":"property-type","doc":"Property is interpolable and can be represented using a property expression."},"cross-faded":{"type":"property-type","doc":"Property is non-interpolable; rather, its values will be cross-faded to smoothly transition between integer zooms."},"cross-faded-data-driven":{"type":"property-type","doc":"Property is non-interpolable; rather, its values will be cross-faded to smoothly transition between integer zooms. It can be represented using a property expression."},"color-ramp":{"type":"property-type","doc":"Property should be specified using a color ramp from which the output color can be sampled based on a property calculation."},"data-constant":{"type":"property-type","doc":"Property is interpolable but cannot be represented using a property expression."},"constant":{"type":"property-type","doc":"Property is constant across all zoom levels and property values."}}};

/***/ }),

/***/ "./node_modules/@mapbox/mapbox-gl-style-spec/util/ref_properties.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-gl-style-spec/util/ref_properties.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

/* harmony default export */ __webpack_exports__["default"] = (['type', 'source', 'source-layer', 'minzoom', 'maxzoom', 'filter', 'layout']);


/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) { validLen = len }

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) { return 0 }

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) { return -1 }
  if (y < x) { return 1 }
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) { return 0 }

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) { return utf8ToBytes(string).length } // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) { encoding = 'utf8' }

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) { throw new TypeError('Unknown encoding: ' + encoding) }
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) { return '' }
  if (arguments.length === 0) { return utf8Slice(this, 0, length) }
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) { throw new TypeError('Argument must be a Buffer') }
  if (this === b) { return true }
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) { str += ' ... ' }
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) { return 0 }

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) { return -1 }
  if (y < x) { return 1 }
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) { return -1 }

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) { byteOffset = buffer.length + byteOffset }
  if (byteOffset >= buffer.length) {
    if (dir) { return -1 }
    else { byteOffset = buffer.length - 1 }
  } else if (byteOffset < 0) {
    if (dir) { byteOffset = 0 }
    else { return -1 }
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) { foundIndex = i }
        if (i - foundIndex + 1 === valLength) { return foundIndex * indexSize }
      } else {
        if (foundIndex !== -1) { i -= i - foundIndex }
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) { byteOffset = arrLength - valLength }
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) { return i }
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) { throw new TypeError('Invalid hex string') }

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) { return i }
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) { encoding = 'utf8' }
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) { length = remaining }

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) { encoding = 'utf8' }

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) { throw new TypeError('Unknown encoding: ' + encoding) }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) { start = 0 }
  if (!end || end < 0 || end > len) { end = len }

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) { start = 0 }
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) { end = 0 }
  } else if (end > len) {
    end = len
  }

  if (end < start) { end = start }

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) { throw new RangeError('offset is not uint') }
  if (offset + ext > length) { throw new RangeError('Trying to access beyond buffer length') }
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) { checkOffset(offset, byteLength, this.length) }

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) { checkOffset(offset, 1, this.length) }
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) { checkOffset(offset, 2, this.length) }
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) { checkOffset(offset, 2, this.length) }
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) { checkOffset(offset, 4, this.length) }

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) { checkOffset(offset, 4, this.length) }

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) { checkOffset(offset, byteLength, this.length) }

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) { val -= Math.pow(2, 8 * byteLength) }

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) { checkOffset(offset, byteLength, this.length) }

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) { val -= Math.pow(2, 8 * byteLength) }

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) { checkOffset(offset, 1, this.length) }
  if (!(this[offset] & 0x80)) { return (this[offset]) }
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) { checkOffset(offset, 2, this.length) }
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) { checkOffset(offset, 2, this.length) }
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) { checkOffset(offset, 4, this.length) }

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) { checkOffset(offset, 4, this.length) }

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) { checkOffset(offset, 4, this.length) }
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) { checkOffset(offset, 4, this.length) }
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) { checkOffset(offset, 8, this.length) }
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) { checkOffset(offset, 8, this.length) }
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) { throw new TypeError('"buffer" argument must be a Buffer instance') }
  if (value > max || value < min) { throw new RangeError('"value" argument is out of bounds') }
  if (offset + ext > buf.length) { throw new RangeError('Index out of range') }
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) { checkInt(this, value, offset, 1, 0xff, 0) }
  if (!Buffer.TYPED_ARRAY_SUPPORT) { value = Math.floor(value) }
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) { value = 0xffff + value + 1 }
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) { checkInt(this, value, offset, 2, 0xffff, 0) }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) { checkInt(this, value, offset, 2, 0xffff, 0) }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) { value = 0xffffffff + value + 1 }
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) { checkInt(this, value, offset, 4, 0xffffffff, 0) }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) { checkInt(this, value, offset, 4, 0xffffffff, 0) }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) { checkInt(this, value, offset, 1, 0x7f, -0x80) }
  if (!Buffer.TYPED_ARRAY_SUPPORT) { value = Math.floor(value) }
  if (value < 0) { value = 0xff + value + 1 }
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) { checkInt(this, value, offset, 2, 0x7fff, -0x8000) }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) { checkInt(this, value, offset, 2, 0x7fff, -0x8000) }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) { checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000) }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) { checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000) }
  if (value < 0) { value = 0xffffffff + value + 1 }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) { throw new RangeError('Index out of range') }
  if (offset < 0) { throw new RangeError('Index out of range') }
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) { start = 0 }
  if (!end && end !== 0) { end = this.length }
  if (targetStart >= target.length) { targetStart = target.length }
  if (!targetStart) { targetStart = 0 }
  if (end > 0 && end < start) { end = start }

  // Copy 0 bytes; we're done
  if (end === start) { return 0 }
  if (target.length === 0 || this.length === 0) { return 0 }

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) { throw new RangeError('sourceStart out of bounds') }
  if (end < 0) { throw new RangeError('sourceEnd out of bounds') }

  // Are we oob?
  if (end > this.length) { end = this.length }
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) { val = 0 }

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) { return '' }
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) { return str.trim() }
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) { return '0' + n.toString(16) }
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) { bytes.push(0xEF, 0xBF, 0xBD) }
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) { bytes.push(0xEF, 0xBF, 0xBD) }
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) { bytes.push(0xEF, 0xBF, 0xBD) }
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) { bytes.push(0xEF, 0xBF, 0xBD) }
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) { break }
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) { break }
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) { break }
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) { break }
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) { break }

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) { break }
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/mapbox-to-css-font/index.js":
/*!**************************************************!*\
  !*** ./node_modules/mapbox-to-css-font/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
var italicRE = /(italic|oblique)$/i;

var fontCache = {};

module.exports = function(fonts, size) {
  var cssData = fontCache[fonts];
  if (!cssData) {
    if (!Array.isArray(fonts)) {
      fonts = [fonts];
    }
    var weight = 'normal';
    var style = 'normal';
    var fontFamilies = []
    var haveWeight, haveStyle;
    for (var i = 0, ii = fonts.length; i < ii; ++i) {
      var font = fonts[i];
      var parts = font.split(' ');
      var maybeWeight = parts[parts.length - 1].toLowerCase();
      if (maybeWeight == 'normal' || maybeWeight == 'italic' || maybeWeight == 'oblique') {
        style = haveStyle ? style : maybeWeight;
        parts.pop();
        maybeWeight = parts[parts.length - 1].toLowerCase();
      } else if (italicRE.test(maybeWeight)) {
        maybeWeight = maybeWeight.replace(italicRE, '');
        style = haveStyle ? style : parts[parts.length - 1].replace(maybeWeight, '');
      }
      for (var w in fontWeights) {
        if (maybeWeight == w || maybeWeight == w.replace('-', '') || maybeWeight == w.replace('-', sp)) {
          weight = haveWeight ? weight : fontWeights[w];
          parts.pop();
          break;
        }
      }
      if (!haveWeight && typeof maybeWeight == 'number') {
        weight = maybeWeight;
      }
      var fontFamily = parts.join(sp)
          .replace('Klokantech Noto Sans', 'Noto Sans');
      if (fontFamily.indexOf(sp) !== -1) {
        fontFamily = '"' + fontFamily + '"';
      }
      fontFamilies.push(fontFamily);
    }
    // CSS font property: font-style font-weight font-size font-family
    cssData = fontCache[fonts] = [style, weight, fontFamilies];
  }
  return cssData[0] + sp + cssData[1] + sp + size + 'px' + sp + cssData[2];
}


/***/ }),

/***/ "./node_modules/ol/AssertionError.js":
/*!*******************************************!*\
  !*** ./node_modules/ol/AssertionError.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./node_modules/ol/util.js");
/**
 * @module ol/AssertionError
 */


/**
 * Error object thrown when an assertion failed. This is an ECMA-262 Error,
 * extended with a `code` property.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error.
 */
var AssertionError = /*@__PURE__*/(function (Error) {
  function AssertionError(code) {
    var path = _util_js__WEBPACK_IMPORTED_MODULE_0__["VERSION"] === 'latest' ? _util_js__WEBPACK_IMPORTED_MODULE_0__["VERSION"] : 'v' + _util_js__WEBPACK_IMPORTED_MODULE_0__["VERSION"].split('-')[0];
    var message = 'Assertion failed. See https://openlayers.org/en/' + path +
    '/doc/errors/#' + code + ' for details.';

    Error.call(this, message);

    /**
     * Error code. The meaning of the code can be found on
     * https://openlayers.org/en/latest/doc/errors/ (replace `latest` with
     * the version found in the OpenLayers script's header comment if a version
     * other than the latest is used).
     * @type {number}
     * @api
     */
    this.code = code;

    /**
     * @type {string}
     */
    this.name = 'AssertionError';

    // Re-assign message, see https://github.com/Rich-Harris/buble/issues/40
    this.message = message;
  }

  if ( Error ) { AssertionError.__proto__ = Error; }
  AssertionError.prototype = Object.create( Error && Error.prototype );
  AssertionError.prototype.constructor = AssertionError;

  return AssertionError;
}(Error));

/* harmony default export */ __webpack_exports__["default"] = (AssertionError);

//# sourceMappingURL=AssertionError.js.map

/***/ }),

/***/ "./node_modules/ol/asserts.js":
/*!************************************!*\
  !*** ./node_modules/ol/asserts.js ***!
  \************************************/
/*! exports provided: assert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assert", function() { return assert; });
/* harmony import */ var _AssertionError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AssertionError.js */ "./node_modules/ol/AssertionError.js");
/**
 * @module ol/asserts
 */


/**
 * @param {*} assertion Assertion we expected to be truthy.
 * @param {number} errorCode Error code.
 */
function assert(assertion, errorCode) {
  if (!assertion) {
    throw new _AssertionError_js__WEBPACK_IMPORTED_MODULE_0__["default"](errorCode);
  }
}

//# sourceMappingURL=asserts.js.map

/***/ }),

/***/ "./node_modules/ol/color.js":
/*!**********************************!*\
  !*** ./node_modules/ol/color.js ***!
  \**********************************/
/*! exports provided: asString, fromString, asArray, normalize, toString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asString", function() { return asString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromString", function() { return fromString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asArray", function() { return asArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return normalize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toString", function() { return toString; });
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asserts.js */ "./node_modules/ol/asserts.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/ol/math.js");
/**
 * @module ol/color
 */




/**
 * A color represented as a short array [red, green, blue, alpha].
 * red, green, and blue should be integers in the range 0..255 inclusive.
 * alpha should be a float in the range 0..1 inclusive. If no alpha value is
 * given then `1` will be used.
 * @typedef {Array<number>} Color
 * @api
 */


/**
 * This RegExp matches # followed by 3, 4, 6, or 8 hex digits.
 * @const
 * @type {RegExp}
 * @private
 */
var HEX_COLOR_RE_ = /^#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})$/i;


/**
 * Regular expression for matching potential named color style strings.
 * @const
 * @type {RegExp}
 * @private
 */
var NAMED_COLOR_RE_ = /^([a-z]*)$/i;


/**
 * Return the color as an rgba string.
 * @param {Color|string} color Color.
 * @return {string} Rgba string.
 * @api
 */
function asString(color) {
  if (typeof color === 'string') {
    return color;
  } else {
    return toString(color);
  }
}

/**
 * Return named color as an rgba string.
 * @param {string} color Named color.
 * @return {string} Rgb string.
 */
function fromNamed(color) {
  var el = document.createElement('div');
  el.style.color = color;
  if (el.style.color !== '') {
    document.body.appendChild(el);
    var rgb = getComputedStyle(el).color;
    document.body.removeChild(el);
    return rgb;
  } else {
    return '';
  }
}


/**
 * @param {string} s String.
 * @return {Color} Color.
 */
var fromString = (
  function() {

    // We maintain a small cache of parsed strings.  To provide cheap LRU-like
    // semantics, whenever the cache grows too large we simply delete an
    // arbitrary 25% of the entries.

    /**
     * @const
     * @type {number}
     */
    var MAX_CACHE_SIZE = 1024;

    /**
     * @type {Object<string, Color>}
     */
    var cache = {};

    /**
     * @type {number}
     */
    var cacheSize = 0;

    return (
      /**
       * @param {string} s String.
       * @return {Color} Color.
       */
      function(s) {
        var color;
        if (cache.hasOwnProperty(s)) {
          color = cache[s];
        } else {
          if (cacheSize >= MAX_CACHE_SIZE) {
            var i = 0;
            for (var key in cache) {
              if ((i++ & 3) === 0) {
                delete cache[key];
                --cacheSize;
              }
            }
          }
          color = fromStringInternal_(s);
          cache[s] = color;
          ++cacheSize;
        }
        return color;
      }
    );

  })();

/**
 * Return the color as an array. This function maintains a cache of calculated
 * arrays which means the result should not be modified.
 * @param {Color|string} color Color.
 * @return {Color} Color.
 * @api
 */
function asArray(color) {
  if (Array.isArray(color)) {
    return color;
  } else {
    return fromString(color);
  }
}

/**
 * @param {string} s String.
 * @private
 * @return {Color} Color.
 */
function fromStringInternal_(s) {
  var r, g, b, a, color;

  if (NAMED_COLOR_RE_.exec(s)) {
    s = fromNamed(s);
  }

  if (HEX_COLOR_RE_.exec(s)) { // hex
    var n = s.length - 1; // number of hex digits
    var d; // number of digits per channel
    if (n <= 4) {
      d = 1;
    } else {
      d = 2;
    }
    var hasAlpha = n === 4 || n === 8;
    r = parseInt(s.substr(1 + 0 * d, d), 16);
    g = parseInt(s.substr(1 + 1 * d, d), 16);
    b = parseInt(s.substr(1 + 2 * d, d), 16);
    if (hasAlpha) {
      a = parseInt(s.substr(1 + 3 * d, d), 16);
    } else {
      a = 255;
    }
    if (d == 1) {
      r = (r << 4) + r;
      g = (g << 4) + g;
      b = (b << 4) + b;
      if (hasAlpha) {
        a = (a << 4) + a;
      }
    }
    color = [r, g, b, a / 255];
  } else if (s.indexOf('rgba(') == 0) { // rgba()
    color = s.slice(5, -1).split(',').map(Number);
    normalize(color);
  } else if (s.indexOf('rgb(') == 0) { // rgb()
    color = s.slice(4, -1).split(',').map(Number);
    color.push(1);
    normalize(color);
  } else {
    Object(_asserts_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(false, 14); // Invalid color
  }
  return color;
}


/**
 * TODO this function is only used in the test, we probably shouldn't export it
 * @param {Color} color Color.
 * @return {Color} Clamped color.
 */
function normalize(color) {
  color[0] = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["clamp"])((color[0] + 0.5) | 0, 0, 255);
  color[1] = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["clamp"])((color[1] + 0.5) | 0, 0, 255);
  color[2] = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["clamp"])((color[2] + 0.5) | 0, 0, 255);
  color[3] = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["clamp"])(color[3], 0, 1);
  return color;
}


/**
 * @param {Color} color Color.
 * @return {string} String.
 */
function toString(color) {
  var r = color[0];
  if (r != (r | 0)) {
    r = (r + 0.5) | 0;
  }
  var g = color[1];
  if (g != (g | 0)) {
    g = (g + 0.5) | 0;
  }
  var b = color[2];
  if (b != (b | 0)) {
    b = (b + 0.5) | 0;
  }
  var a = color[3] === undefined ? 1 : color[3];
  return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

//# sourceMappingURL=color.js.map

/***/ }),

/***/ "./node_modules/ol/math.js":
/*!*********************************!*\
  !*** ./node_modules/ol/math.js ***!
  \*********************************/
/*! exports provided: clamp, cosh, roundUpToPowerOfTwo, squaredSegmentDistance, squaredDistance, solveLinearSystem, toDegrees, toRadians, modulo, lerp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cosh", function() { return cosh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundUpToPowerOfTwo", function() { return roundUpToPowerOfTwo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredSegmentDistance", function() { return squaredSegmentDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "squaredDistance", function() { return squaredDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "solveLinearSystem", function() { return solveLinearSystem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toDegrees", function() { return toDegrees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRadians", function() { return toRadians; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modulo", function() { return modulo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lerp", function() { return lerp; });
/* harmony import */ var _asserts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./asserts.js */ "./node_modules/ol/asserts.js");
/**
 * @module ol/math
 */


/**
 * Takes a number and clamps it to within the provided bounds.
 * @param {number} value The input number.
 * @param {number} min The minimum value to return.
 * @param {number} max The maximum value to return.
 * @return {number} The input number if it is within bounds, or the nearest
 *     number within the bounds.
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}


/**
 * Return the hyperbolic cosine of a given number. The method will use the
 * native `Math.cosh` function if it is available, otherwise the hyperbolic
 * cosine will be calculated via the reference implementation of the Mozilla
 * developer network.
 *
 * @param {number} x X.
 * @return {number} Hyperbolic cosine of x.
 */
var cosh = (function() {
  // Wrapped in a iife, to save the overhead of checking for the native
  // implementation on every invocation.
  var cosh;
  if ('cosh' in Math) {
    // The environment supports the native Math.cosh function, use it…
    cosh = Math.cosh;
  } else {
    // … else, use the reference implementation of MDN:
    cosh = function(x) {
      var y = /** @type {Math} */ (Math).exp(x);
      return (y + 1 / y) / 2;
    };
  }
  return cosh;
}());


/**
 * @param {number} x X.
 * @return {number} The smallest power of two greater than or equal to x.
 */
function roundUpToPowerOfTwo(x) {
  Object(_asserts_js__WEBPACK_IMPORTED_MODULE_0__["assert"])(0 < x, 29); // `x` must be greater than `0`
  return Math.pow(2, Math.ceil(Math.log(x) / Math.LN2));
}


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
function squaredSegmentDistance(x, y, x1, y1, x2, y2) {
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
  return squaredDistance(x, y, x1, y1);
}


/**
 * Returns the square of the distance between the points (x1, y1) and (x2, y2).
 * @param {number} x1 X1.
 * @param {number} y1 Y1.
 * @param {number} x2 X2.
 * @param {number} y2 Y2.
 * @return {number} Squared distance.
 */
function squaredDistance(x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return dx * dx + dy * dy;
}


/**
 * Solves system of linear equations using Gaussian elimination method.
 *
 * @param {Array<Array<number>>} mat Augmented matrix (n x n + 1 column)
 *                                     in row-major order.
 * @return {Array<number>} The resulting vector.
 */
function solveLinearSystem(mat) {
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
}


/**
 * Converts radians to to degrees.
 *
 * @param {number} angleInRadians Angle in radians.
 * @return {number} Angle in degrees.
 */
function toDegrees(angleInRadians) {
  return angleInRadians * 180 / Math.PI;
}


/**
 * Converts degrees to radians.
 *
 * @param {number} angleInDegrees Angle in degrees.
 * @return {number} Angle in radians.
 */
function toRadians(angleInDegrees) {
  return angleInDegrees * Math.PI / 180;
}

/**
 * Returns the modulo of a / b, depending on the sign of b.
 *
 * @param {number} a Dividend.
 * @param {number} b Divisor.
 * @return {number} Modulo.
 */
function modulo(a, b) {
  var r = a % b;
  return r * b < 0 ? r + b : r;
}

/**
 * Calculates the linearly interpolated value of x between a and b.
 *
 * @param {number} a Number
 * @param {number} b Number
 * @param {number} x Value to be interpolated.
 * @return {number} Interpolated value.
 */
function lerp(a, b, x) {
  return a + x * (b - a);
}

//# sourceMappingURL=math.js.map

/***/ }),

/***/ "./node_modules/ol/style/Fill.js":
/*!***************************************!*\
  !*** ./node_modules/ol/style/Fill.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util.js */ "./node_modules/ol/util.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../color.js */ "./node_modules/ol/color.js");
/**
 * @module ol/style/Fill
 */




/**
 * @typedef {Object} Options
 * @property {import("../color.js").Color|import("../colorlike.js").ColorLike} [color] A color, gradient or pattern.
 * See {@link module:ol/color~Color} and {@link module:ol/colorlike~ColorLike} for possible formats.
 * Default null; if null, the Canvas/renderer default black will be used.
 */


/**
 * @classdesc
 * Set fill style for vector features.
 * @api
 */
var Fill = function Fill(opt_options) {

  var options = opt_options || {};

  /**
   * @private
   * @type {import("../color.js").Color|import("../colorlike.js").ColorLike}
   */
  this.color_ = options.color !== undefined ? options.color : null;

  /**
   * @private
   * @type {string|undefined}
   */
  this.checksum_ = undefined;
};

/**
 * Clones the style. The color is not cloned if it is an {@link module:ol/colorlike~ColorLike}.
 * @return {Fill} The cloned style.
 * @api
 */
Fill.prototype.clone = function clone () {
  var color = this.getColor();
  return new Fill({
    color: Array.isArray(color) ? color.slice() : color || undefined
  });
};

/**
 * Get the fill color.
 * @return {import("../color.js").Color|import("../colorlike.js").ColorLike} Color.
 * @api
 */
Fill.prototype.getColor = function getColor () {
  return this.color_;
};

/**
 * Set the color.
 *
 * @param {import("../color.js").Color|import("../colorlike.js").ColorLike} color Color.
 * @api
 */
Fill.prototype.setColor = function setColor (color) {
  this.color_ = color;
  this.checksum_ = undefined;
};

/**
 * @return {string} The checksum.
 */
Fill.prototype.getChecksum = function getChecksum () {
  if (this.checksum_ === undefined) {
    var color = this.color_;
    if (color) {
      if (Array.isArray(color) || typeof color == 'string') {
        this.checksum_ = 'f' + Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["asString"])(/** @type {import("../color.js").Color|string} */ (color));
      } else {
        this.checksum_ = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["getUid"])(this.color_);
      }
    } else {
      this.checksum_ = 'f-';
    }
  }

  return this.checksum_;
};

/* harmony default export */ __webpack_exports__["default"] = (Fill);

//# sourceMappingURL=Fill.js.map

/***/ }),

/***/ "./node_modules/ol/style/Text.js":
/*!***************************************!*\
  !*** ./node_modules/ol/style/Text.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Fill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Fill.js */ "./node_modules/ol/style/Fill.js");
/* harmony import */ var _TextPlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TextPlacement.js */ "./node_modules/ol/style/TextPlacement.js");
/**
 * @module ol/style/Text
 */




/**
 * The default fill color to use if no fill was set at construction time; a
 * blackish `#333`.
 *
 * @const {string}
 */
var DEFAULT_FILL_COLOR = '#333';


/**
 * @typedef {Object} Options
 * @property {string} [font] Font style as CSS 'font' value, see:
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font. Default is '10px sans-serif'
 * @property {number} [maxAngle] When `placement` is set to `'line'`, allow a maximum angle between adjacent characters.
 * The expected value is in radians, and the default is 45° (`Math.PI / 4`).
 * @property {number} [offsetX=0] Horizontal text offset in pixels. A positive will shift the text right.
 * @property {number} [offsetY=0] Vertical text offset in pixels. A positive will shift the text down.
 * @property {boolean} [overflow=false] For polygon labels or when `placement` is set to `'line'`, allow text to exceed
 * the width of the polygon at the label position or the length of the path that it follows.
 * @property {import("./TextPlacement.js").default|string} [placement] Text placement.
 * @property {number} [scale] Scale.
 * @property {boolean} [rotateWithView=false] Whether to rotate the text with the view.
 * @property {number} [rotation=0] Rotation in radians (positive rotation clockwise).
 * @property {string} [text] Text content.
 * @property {string} [textAlign] Text alignment. Possible values: 'left', 'right', 'center', 'end' or 'start'.
 * Default is 'center' for `placement: 'point'`. For `placement: 'line'`, the default is to let the renderer choose a
 * placement where `maxAngle` is not exceeded.
 * @property {string} [textBaseline='middle'] Text base line. Possible values: 'bottom', 'top', 'middle', 'alphabetic',
 * 'hanging', 'ideographic'.
 * @property {import("./Fill.js").default} [fill] Fill style. If none is provided, we'll use a dark fill-style (#333).
 * @property {import("./Stroke.js").default} [stroke] Stroke style.
 * @property {import("./Fill.js").default} [backgroundFill] Fill style for the text background when `placement` is
 * `'point'`. Default is no fill.
 * @property {import("./Stroke.js").default} [backgroundStroke] Stroke style for the text background  when `placement`
 * is `'point'`. Default is no stroke.
 * @property {Array<number>} [padding=[0, 0, 0, 0]] Padding in pixels around the text for decluttering and background. The order of
 * values in the array is `[top, right, bottom, left]`.
 */


/**
 * @classdesc
 * Set text style for vector features.
 * @api
 */
var Text = function Text(opt_options) {

  var options = opt_options || {};

  /**
  * @private
  * @type {string|undefined}
  */
  this.font_ = options.font;

  /**
  * @private
  * @type {number|undefined}
  */
  this.rotation_ = options.rotation;

  /**
  * @private
  * @type {boolean|undefined}
  */
  this.rotateWithView_ = options.rotateWithView;

  /**
  * @private
  * @type {number|undefined}
  */
  this.scale_ = options.scale;

  /**
  * @private
  * @type {string|undefined}
  */
  this.text_ = options.text;

  /**
  * @private
  * @type {string|undefined}
  */
  this.textAlign_ = options.textAlign;

  /**
  * @private
  * @type {string|undefined}
  */
  this.textBaseline_ = options.textBaseline;

  /**
  * @private
  * @type {import("./Fill.js").default}
  */
  this.fill_ = options.fill !== undefined ? options.fill :
    new _Fill_js__WEBPACK_IMPORTED_MODULE_0__["default"]({color: DEFAULT_FILL_COLOR});

  /**
  * @private
  * @type {number}
  */
  this.maxAngle_ = options.maxAngle !== undefined ? options.maxAngle : Math.PI / 4;

  /**
  * @private
  * @type {import("./TextPlacement.js").default|string}
  */
  this.placement_ = options.placement !== undefined ? options.placement : _TextPlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"].POINT;

  /**
  * @private
  * @type {boolean}
  */
  this.overflow_ = !!options.overflow;

  /**
  * @private
  * @type {import("./Stroke.js").default}
  */
  this.stroke_ = options.stroke !== undefined ? options.stroke : null;

  /**
  * @private
  * @type {number}
  */
  this.offsetX_ = options.offsetX !== undefined ? options.offsetX : 0;

  /**
  * @private
  * @type {number}
  */
  this.offsetY_ = options.offsetY !== undefined ? options.offsetY : 0;

  /**
  * @private
  * @type {import("./Fill.js").default}
  */
  this.backgroundFill_ = options.backgroundFill ? options.backgroundFill : null;

  /**
  * @private
  * @type {import("./Stroke.js").default}
  */
  this.backgroundStroke_ = options.backgroundStroke ? options.backgroundStroke : null;

  /**
  * @private
  * @type {Array<number>}
  */
  this.padding_ = options.padding === undefined ? null : options.padding;
};

/**
* Clones the style.
* @return {Text} The cloned style.
* @api
*/
Text.prototype.clone = function clone () {
  return new Text({
    font: this.getFont(),
    placement: this.getPlacement(),
    maxAngle: this.getMaxAngle(),
    overflow: this.getOverflow(),
    rotation: this.getRotation(),
    rotateWithView: this.getRotateWithView(),
    scale: this.getScale(),
    text: this.getText(),
    textAlign: this.getTextAlign(),
    textBaseline: this.getTextBaseline(),
    fill: this.getFill() ? this.getFill().clone() : undefined,
    stroke: this.getStroke() ? this.getStroke().clone() : undefined,
    offsetX: this.getOffsetX(),
    offsetY: this.getOffsetY(),
    backgroundFill: this.getBackgroundFill() ? this.getBackgroundFill().clone() : undefined,
    backgroundStroke: this.getBackgroundStroke() ? this.getBackgroundStroke().clone() : undefined
  });
};

/**
* Get the `overflow` configuration.
* @return {boolean} Let text overflow the length of the path they follow.
* @api
*/
Text.prototype.getOverflow = function getOverflow () {
  return this.overflow_;
};

/**
* Get the font name.
* @return {string|undefined} Font.
* @api
*/
Text.prototype.getFont = function getFont () {
  return this.font_;
};

/**
* Get the maximum angle between adjacent characters.
* @return {number} Angle in radians.
* @api
*/
Text.prototype.getMaxAngle = function getMaxAngle () {
  return this.maxAngle_;
};

/**
* Get the label placement.
* @return {import("./TextPlacement.js").default|string} Text placement.
* @api
*/
Text.prototype.getPlacement = function getPlacement () {
  return this.placement_;
};

/**
* Get the x-offset for the text.
* @return {number} Horizontal text offset.
* @api
*/
Text.prototype.getOffsetX = function getOffsetX () {
  return this.offsetX_;
};

/**
* Get the y-offset for the text.
* @return {number} Vertical text offset.
* @api
*/
Text.prototype.getOffsetY = function getOffsetY () {
  return this.offsetY_;
};

/**
* Get the fill style for the text.
* @return {import("./Fill.js").default} Fill style.
* @api
*/
Text.prototype.getFill = function getFill () {
  return this.fill_;
};

/**
* Determine whether the text rotates with the map.
* @return {boolean|undefined} Rotate with map.
* @api
*/
Text.prototype.getRotateWithView = function getRotateWithView () {
  return this.rotateWithView_;
};

/**
* Get the text rotation.
* @return {number|undefined} Rotation.
* @api
*/
Text.prototype.getRotation = function getRotation () {
  return this.rotation_;
};

/**
* Get the text scale.
* @return {number|undefined} Scale.
* @api
*/
Text.prototype.getScale = function getScale () {
  return this.scale_;
};

/**
* Get the stroke style for the text.
* @return {import("./Stroke.js").default} Stroke style.
* @api
*/
Text.prototype.getStroke = function getStroke () {
  return this.stroke_;
};

/**
* Get the text to be rendered.
* @return {string|undefined} Text.
* @api
*/
Text.prototype.getText = function getText () {
  return this.text_;
};

/**
* Get the text alignment.
* @return {string|undefined} Text align.
* @api
*/
Text.prototype.getTextAlign = function getTextAlign () {
  return this.textAlign_;
};

/**
* Get the text baseline.
* @return {string|undefined} Text baseline.
* @api
*/
Text.prototype.getTextBaseline = function getTextBaseline () {
  return this.textBaseline_;
};

/**
* Get the background fill style for the text.
* @return {import("./Fill.js").default} Fill style.
* @api
*/
Text.prototype.getBackgroundFill = function getBackgroundFill () {
  return this.backgroundFill_;
};

/**
* Get the background stroke style for the text.
* @return {import("./Stroke.js").default} Stroke style.
* @api
*/
Text.prototype.getBackgroundStroke = function getBackgroundStroke () {
  return this.backgroundStroke_;
};

/**
* Get the padding for the text.
* @return {Array<number>} Padding.
* @api
*/
Text.prototype.getPadding = function getPadding () {
  return this.padding_;
};

/**
* Set the `overflow` property.
*
* @param {boolean} overflow Let text overflow the path that it follows.
* @api
*/
Text.prototype.setOverflow = function setOverflow (overflow) {
  this.overflow_ = overflow;
};

/**
* Set the font.
*
* @param {string|undefined} font Font.
* @api
*/
Text.prototype.setFont = function setFont (font) {
  this.font_ = font;
};

/**
* Set the maximum angle between adjacent characters.
*
* @param {number} maxAngle Angle in radians.
* @api
*/
Text.prototype.setMaxAngle = function setMaxAngle (maxAngle) {
  this.maxAngle_ = maxAngle;
};

/**
* Set the x offset.
*
* @param {number} offsetX Horizontal text offset.
* @api
*/
Text.prototype.setOffsetX = function setOffsetX (offsetX) {
  this.offsetX_ = offsetX;
};

/**
* Set the y offset.
*
* @param {number} offsetY Vertical text offset.
* @api
*/
Text.prototype.setOffsetY = function setOffsetY (offsetY) {
  this.offsetY_ = offsetY;
};

/**
* Set the text placement.
*
* @param {import("./TextPlacement.js").default|string} placement Placement.
* @api
*/
Text.prototype.setPlacement = function setPlacement (placement) {
  this.placement_ = placement;
};

/**
* Set the fill.
*
* @param {import("./Fill.js").default} fill Fill style.
* @api
*/
Text.prototype.setFill = function setFill (fill) {
  this.fill_ = fill;
};

/**
* Set the rotation.
*
* @param {number|undefined} rotation Rotation.
* @api
*/
Text.prototype.setRotation = function setRotation (rotation) {
  this.rotation_ = rotation;
};

/**
* Set the scale.
*
* @param {number|undefined} scale Scale.
* @api
*/
Text.prototype.setScale = function setScale (scale) {
  this.scale_ = scale;
};

/**
* Set the stroke.
*
* @param {import("./Stroke.js").default} stroke Stroke style.
* @api
*/
Text.prototype.setStroke = function setStroke (stroke) {
  this.stroke_ = stroke;
};

/**
* Set the text.
*
* @param {string|undefined} text Text.
* @api
*/
Text.prototype.setText = function setText (text) {
  this.text_ = text;
};

/**
* Set the text alignment.
*
* @param {string|undefined} textAlign Text align.
* @api
*/
Text.prototype.setTextAlign = function setTextAlign (textAlign) {
  this.textAlign_ = textAlign;
};

/**
* Set the text baseline.
*
* @param {string|undefined} textBaseline Text baseline.
* @api
*/
Text.prototype.setTextBaseline = function setTextBaseline (textBaseline) {
  this.textBaseline_ = textBaseline;
};

/**
* Set the background fill.
*
* @param {import("./Fill.js").default} fill Fill style.
* @api
*/
Text.prototype.setBackgroundFill = function setBackgroundFill (fill) {
  this.backgroundFill_ = fill;
};

/**
* Set the background stroke.
*
* @param {import("./Stroke.js").default} stroke Stroke style.
* @api
*/
Text.prototype.setBackgroundStroke = function setBackgroundStroke (stroke) {
  this.backgroundStroke_ = stroke;
};

/**
* Set the padding (`[top, right, bottom, left]`).
*
* @param {!Array<number>} padding Padding.
* @api
*/
Text.prototype.setPadding = function setPadding (padding) {
  this.padding_ = padding;
};

/* harmony default export */ __webpack_exports__["default"] = (Text);

//# sourceMappingURL=Text.js.map

/***/ }),

/***/ "./node_modules/ol/style/TextPlacement.js":
/*!************************************************!*\
  !*** ./node_modules/ol/style/TextPlacement.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @module ol/style/TextPlacement
 */

/**
 * Text placement. One of `'point'`, `'line'`. Default is `'point'`. Note that
 * `'line'` requires the underlying geometry to be a {@link module:ol/geom/LineString~LineString},
 * {@link module:ol/geom/Polygon~Polygon}, {@link module:ol/geom/MultiLineString~MultiLineString} or
 * {@link module:ol/geom/MultiPolygon~MultiPolygon}.
 * @enum {string}
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  POINT: 'point',
  LINE: 'line'
});

//# sourceMappingURL=TextPlacement.js.map

/***/ }),

/***/ "./node_modules/ol/util.js":
/*!*********************************!*\
  !*** ./node_modules/ol/util.js ***!
  \*********************************/
/*! exports provided: abstract, inherits, getUid, VERSION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "abstract", function() { return abstract; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inherits", function() { return inherits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUid", function() { return getUid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERSION", function() { return VERSION; });
/**
 * @module ol/util
 */

/**
 * @return {?} Any return.
 */
function abstract() {
  return /** @type {?} */ ((function() {
    throw new Error('Unimplemented abstract method.');
  })());
}

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
 *     inherits(ChildClass, ParentClass);
 *
 *     var child = new ChildClass('a', 'b', 'see');
 *     child.foo(); // This works.
 *
 * @param {!Function} childCtor Child constructor.
 * @param {!Function} parentCtor Parent constructor.
 * @function module:ol.inherits
 * @deprecated
 * @api
 */
function inherits(childCtor, parentCtor) {
  childCtor.prototype = Object.create(parentCtor.prototype);
  childCtor.prototype.constructor = childCtor;
}

/**
 * Counter for getUid.
 * @type {number}
 * @private
 */
var uidCounter_ = 0;

/**
 * Gets a unique ID for an object. This mutates the object so that further calls
 * with the same object as a parameter returns the same value. Unique IDs are generated
 * as a strictly increasing sequence. Adapted from goog.getUid.
 *
 * @param {Object} obj The object to get the unique ID for.
 * @return {string} The unique ID for the object.
 * @function module:ol.getUid
 * @api
 */
function getUid(obj) {
  return obj.ol_uid || (obj.ol_uid = String(++uidCounter_));
}

/**
 * OpenLayers version.
 * @type {string}
 */
var VERSION = '5.3.0';

//# sourceMappingURL=util.js.map

/***/ }),

/***/ "./node_modules/webfont-matcher/lib/fonts/google.js":
/*!**********************************************************!*\
  !*** ./node_modules/webfont-matcher/lib/fonts/google.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.10.0
(function() {
  var families;

  module.exports = {
    icon: 'icons/google.svg',
    name: 'google',
    title: 'Google Fonts',
    link: 'google.com/fonts',
    getNames: function() {
      return families;
    },
    getLink: function(name) {
      return "https://fonts.google.com/specimen/" + (name.replace(/( )/g, '+'));
    },
    normalizeName: function(name) {
      return name;
    }
  };

  families = ["ABeeZee", "Abel", "Abril Fatface", "Aclonica", "Acme", "Actor", "Adamina", "Advent Pro", "Aguafina Script", "Akronim", "Aladin", "Aldrich", "Alef", "Alegreya", "Alegreya SC", "Alegreya Sans", "Alegreya Sans SC", "Alex Brush", "Alfa Slab One", "Alice", "Alike", "Alike Angular", "Allan", "Allerta", "Allerta Stencil", "Allura", "Almendra", "Almendra Display", "Almendra SC", "Amarante", "Amaranth", "Amatic SC", "Amethysta", "Amiri", "Amita", "Anaheim", "Andada", "Andika", "Angkor", "Annie Use Your Telescope", "Anonymous Pro", "Antic", "Antic Didone", "Antic Slab", "Anton", "Arapey", "Arbutus", "Arbutus Slab", "Architects Daughter", "Archivo Black", "Archivo Narrow", "Arimo", "Arizonia", "Armata", "Artifika", "Arvo", "Arya", "Asap", "Asar", "Asset", "Astloch", "Asul", "Atomic Age", "Aubrey", "Audiowide", "Autour One", "Average", "Average Sans", "Averia Gruesa Libre", "Averia Libre", "Averia Sans Libre", "Averia Serif Libre", "Bad Script", "Balthazar", "Bangers", "Basic", "Battambang", "Baumans", "Bayon", "Belgrano", "Belleza", "BenchNine", "Bentham", "Berkshire Swash", "Bevan", "Bigelow Rules", "Bigshot One", "Bilbo", "Bilbo Swash Caps", "Biryani", "Bitter", "Black Ops One", "Bokor", "Bonbon", "Boogaloo", "Bowlby One", "Bowlby One SC", "Brawler", "Bree Serif", "Bubblegum Sans", "Bubbler One", "Buda", "Buenard", "Butcherman", "Butterfly Kids", "Cabin", "Cabin Condensed", "Cabin Sketch", "Caesar Dressing", "Cagliostro", "Calligraffitti", "Cambay", "Cambo", "Candal", "Cantarell", "Cantata One", "Cantora One", "Capriola", "Cardo", "Carme", "Carrois Gothic", "Carrois Gothic SC", "Carter One", "Catamaran", "Caudex", "Caveat", "Caveat Brush", "Cedarville Cursive", "Ceviche One", "Changa One", "Chango", "Chau Philomene One", "Chela One", "Chelsea Market", "Chenla", "Cherry Cream Soda", "Cherry Swash", "Chewy", "Chicle", "Chivo", "Chonburi", "Cinzel", "Cinzel Decorative", "Clicker Script", "Coda", "Coda Caption", "Codystar", "Combo", "Comfortaa", "Coming Soon", "Concert One", "Condiment", "Content", "Contrail One", "Convergence", "Cookie", "Copse", "Corben", "Courgette", "Cousine", "Coustard", "Covered By Your Grace", "Crafty Girls", "Creepster", "Crete Round", "Crimson Text", "Croissant One", "Crushed", "Cuprum", "Cutive", "Cutive Mono", "Damion", "Dancing Script", "Dangrek", "Dawning of a New Day", "Days One", "Dekko", "Delius", "Delius Swash Caps", "Delius Unicase", "Della Respira", "Denk One", "Devonshire", "Dhurjati", "Didact Gothic", "Diplomata", "Diplomata SC", "Domine", "Donegal One", "Doppio One", "Dorsa", "Dosis", "Dr Sugiyama", "Droid Sans", "Droid Sans Mono", "Droid Serif", "Duru Sans", "Dynalight", "EB Garamond", "Eagle Lake", "Eater", "Economica", "Eczar", "Ek Mukta", "Electrolize", "Elsie", "Elsie Swash Caps", "Emblema One", "Emilys Candy", "Engagement", "Englebert", "Enriqueta", "Erica One", "Esteban", "Euphoria Script", "Ewert", "Exo", "Exo 2", "Expletus Sans", "Fanwood Text", "Fascinate", "Fascinate Inline", "Faster One", "Fasthand", "Fauna One", "Federant", "Federo", "Felipa", "Fenix", "Finger Paint", "Fira Mono", "Fira Sans", "Fjalla One", "Fjord One", "Flamenco", "Flavors", "Fondamento", "Fontdiner Swanky", "Forum", "Francois One", "Freckle Face", "Fredericka the Great", "Fredoka One", "Freehand", "Fresca", "Frijole", "Fruktur", "Fugaz One", "GFS Didot", "GFS Neohellenic", "Gabriela", "Gafata", "Galdeano", "Galindo", "Gentium Basic", "Gentium Book Basic", "Geo", "Geostar", "Geostar Fill", "Germania One", "Gidugu", "Gilda Display", "Give You Glory", "Glass Antiqua", "Glegoo", "Gloria Hallelujah", "Goblin One", "Gochi Hand", "Gorditas", "Goudy Bookletter 1911", "Graduate", "Grand Hotel", "Gravitas One", "Great Vibes", "Griffy", "Gruppo", "Gudea", "Gurajada", "Habibi", "Halant", "Hammersmith One", "Hanalei", "Hanalei Fill", "Handlee", "Hanuman", "Happy Monkey", "Headland One", "Henny Penny", "Herr Von Muellerhoff", "Hind", "Hind Siliguri", "Hind Vadodara", "Holtwood One SC", "Homemade Apple", "Homenaje", "IM Fell DW Pica", "IM Fell DW Pica SC", "IM Fell Double Pica", "IM Fell Double Pica SC", "IM Fell English", "IM Fell English SC", "IM Fell French Canon", "IM Fell French Canon SC", "IM Fell Great Primer", "IM Fell Great Primer SC", "Iceberg", "Iceland", "Imprima", "Inconsolata", "Inder", "Indie Flower", "Inika", "Inknut Antiqua", "Irish Grover", "Istok Web", "Italiana", "Italianno", "Itim", "Jacques Francois", "Jacques Francois Shadow", "Jaldi", "Jim Nightshade", "Jockey One", "Jolly Lodger", "Josefin Sans", "Josefin Slab", "Joti One", "Judson", "Julee", "Julius Sans One", "Junge", "Jura", "Just Another Hand", "Just Me Again Down Here", "Kadwa", "Kalam", "Kameron", "Kantumruy", "Karla", "Karma", "Kaushan Script", "Kavoon", "Kdam Thmor", "Keania One", "Kelly Slab", "Kenia", "Khand", "Khmer", "Khula", "Kite One", "Knewave", "Kotta One", "Koulen", "Kranky", "Kreon", "Kristi", "Krona One", "Kurale", "La Belle Aurore", "Laila", "Lakki Reddy", "Lancelot", "Lateef", "Lato", "League Script", "Leckerli One", "Ledger", "Lekton", "Lemon", "Libre Baskerville", "Life Savers", "Lilita One", "Lily Script One", "Limelight", "Linden Hill", "Lobster", "Lobster Two", "Londrina Outline", "Londrina Shadow", "Londrina Sketch", "Londrina Solid", "Lora", "Love Ya Like A Sister", "Loved by the King", "Lovers Quarrel", "Luckiest Guy", "Lusitana", "Lustria", "Macondo", "Macondo Swash Caps", "Magra", "Maiden Orange", "Mako", "Mallanna", "Mandali", "Marcellus", "Marcellus SC", "Marck Script", "Margarine", "Marko One", "Marmelad", "Martel", "Martel Sans", "Marvel", "Mate", "Mate SC", "Maven Pro", "McLaren", "Meddon", "MedievalSharp", "Medula One", "Megrim", "Meie Script", "Merienda", "Merienda One", "Merriweather", "Merriweather Sans", "Metal", "Metal Mania", "Metamorphous", "Metrophobic", "Michroma", "Milonga", "Miltonian", "Miltonian Tattoo", "Miniver", "Miss Fajardose", "Modak", "Modern Antiqua", "Molengo", "Molle", "Monda", "Monofett", "Monoton", "Monsieur La Doulaise", "Montaga", "Montez", "Montserrat", "Montserrat Alternates", "Montserrat Subrayada", "Moul", "Moulpali", "Mountains of Christmas", "Mouse Memoirs", "Mr Bedfort", "Mr Dafoe", "Mr De Haviland", "Mrs Saint Delafield", "Mrs Sheppards", "Muli", "Mystery Quest", "NTR", "Neucha", "Neuton", "New Rocker", "News Cycle", "Niconne", "Nixie One", "Nobile", "Nokora", "Norican", "Nosifer", "Nothing You Could Do", "Noticia Text", "Noto Sans", "Noto Serif", "Nova Cut", "Nova Flat", "Nova Mono", "Nova Oval", "Nova Round", "Nova Script", "Nova Slim", "Nova Square", "Numans", "Nunito", "Odor Mean Chey", "Offside", "Old Standard TT", "Oldenburg", "Oleo Script", "Oleo Script Swash Caps", "Open Sans", "Open Sans Condensed", "Oranienbaum", "Orbitron", "Oregano", "Orienta", "Original Surfer", "Oswald", "Over the Rainbow", "Overlock", "Overlock SC", "Ovo", "Oxygen", "Oxygen Mono", "PT Mono", "PT Sans", "PT Sans Caption", "PT Sans Narrow", "PT Serif", "PT Serif Caption", "Pacifico", "Palanquin", "Palanquin Dark", "Paprika", "Parisienne", "Passero One", "Passion One", "Pathway Gothic One", "Patrick Hand", "Patrick Hand SC", "Patua One", "Paytone One", "Peddana", "Peralta", "Permanent Marker", "Petit Formal Script", "Petrona", "Philosopher", "Piedra", "Pinyon Script", "Pirata One", "Plaster", "Play", "Playball", "Playfair Display", "Playfair Display SC", "Podkova", "Poiret One", "Poller One", "Poly", "Pompiere", "Pontano Sans", "Poppins", "Port Lligat Sans", "Port Lligat Slab", "Pragati Narrow", "Prata", "Preahvihear", "Press Start 2P", "Princess Sofia", "Prociono", "Prosto One", "Puritan", "Purple Purse", "Quando", "Quantico", "Quattrocento", "Quattrocento Sans", "Questrial", "Quicksand", "Quintessential", "Qwigley", "Racing Sans One", "Radley", "Rajdhani", "Raleway", "Raleway Dots", "Ramabhadra", "Ramaraja", "Rambla", "Rammetto One", "Ranchers", "Rancho", "Ranga", "Rationale", "Ravi Prakash", "Redressed", "Reenie Beanie", "Revalia", "Rhodium Libre", "Ribeye", "Ribeye Marrow", "Righteous", "Risque", "Roboto", "Roboto Condensed", "Roboto Mono", "Roboto Slab", "Rochester", "Rock Salt", "Rokkitt", "Romanesco", "Ropa Sans", "Rosario", "Rosarivo", "Rouge Script", "Rozha One", "Rubik", "Rubik Mono One", "Rubik One", "Ruda", "Rufina", "Ruge Boogie", "Ruluko", "Rum Raisin", "Ruslan Display", "Russo One", "Ruthie", "Rye", "Sacramento", "Sahitya", "Sail", "Salsa", "Sanchez", "Sancreek", "Sansita One", "Sarala", "Sarina", "Sarpanch", "Satisfy", "Scada", "Scheherazade", "Schoolbell", "Seaweed Script", "Sevillana", "Seymour One", "Shadows Into Light", "Shadows Into Light Two", "Shanti", "Share", "Share Tech", "Share Tech Mono", "Shojumaru", "Short Stack", "Siemreap", "Sigmar One", "Signika", "Signika Negative", "Simonetta", "Sintony", "Sirin Stencil", "Six Caps", "Skranji", "Slabo 13px", "Slabo 27px", "Slackey", "Smokum", "Smythe", "Sniglet", "Snippet", "Snowburst One", "Sofadi One", "Sofia", "Sonsie One", "Sorts Mill Goudy", "Source Code Pro", "Source Sans Pro", "Source Serif Pro", "Special Elite", "Spicy Rice", "Spinnaker", "Spirax", "Squada One", "Sree Krushnadevaraya", "Stalemate", "Stalinist One", "Stardos Stencil", "Stint Ultra Condensed", "Stint Ultra Expanded", "Stoke", "Strait", "Sue Ellen Francisco", "Sumana", "Sunshiney", "Supermercado One", "Sura", "Suranna", "Suravaram", "Suwannaphum", "Swanky and Moo Moo", "Syncopate", "Tangerine", "Taprom", "Tauri", "Teko", "Telex", "Tenali Ramakrishna", "Tenor Sans", "Text Me One", "The Girl Next Door", "Tienne", "Tillana", "Timmana", "Tinos", "Titan One", "Titillium Web", "Trade Winds", "Trocchi", "Trochut", "Trykker", "Tulpen One", "Ubuntu", "Ubuntu Condensed", "Ubuntu Mono", "Ultra", "Uncial Antiqua", "Underdog", "Unica One", "UnifrakturCook", "UnifrakturMaguntia", "Unkempt", "Unlock", "Unna", "VT323", "Vampiro One", "Varela", "Varela Round", "Vast Shadow", "Vesper Libre", "Vibur", "Vidaloka", "Viga", "Voces", "Volkhov", "Vollkorn", "Voltaire", "Waiting for the Sunrise", "Wallpoet", "Walter Turncoat", "Warnes", "Wellfleet", "Wendy One", "Wire One", "Work Sans", "Yanone Kaffeesatz", "Yantramanav", "Yellowtail", "Yeseva One", "Yesteryear", "Zeyada"];

}).call(this);


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") { g = window; }
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./olms.js":
/*!*****************!*\
  !*** ./olms.js ***!
  \*****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./index.js");
/* harmony import */ var _stylefunction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stylefunction */ "./stylefunction.js");



_index__WEBPACK_IMPORTED_MODULE_0__["default"].apply = _index__WEBPACK_IMPORTED_MODULE_0__["apply"];
_index__WEBPACK_IMPORTED_MODULE_0__["default"].applyBackground = _index__WEBPACK_IMPORTED_MODULE_0__["applyBackground"];
_index__WEBPACK_IMPORTED_MODULE_0__["default"].applyStyle = _index__WEBPACK_IMPORTED_MODULE_0__["applyStyle"];
_index__WEBPACK_IMPORTED_MODULE_0__["default"].stylefunction = _stylefunction__WEBPACK_IMPORTED_MODULE_1__["default"];

/* harmony default export */ __webpack_exports__["default"] = (_index__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./stylefunction.js":
/*!**************************!*\
  !*** ./stylefunction.js ***!
  \**************************/
/*! exports provided: getValue, default, _filterCache, _evaluateFilter, _fromTemplate, _getValue, _functionCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getValue", function() { return getValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_filterCache", function() { return filterCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_evaluateFilter", function() { return evaluateFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_fromTemplate", function() { return fromTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_getValue", function() { return getValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_functionCache", function() { return functionCache; });
/* harmony import */ var ol_style_Style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ol/style/Style */ "ol/style/Style");
/* harmony import */ var ol_style_Style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ol_style_Style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ol_style_Fill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ol/style/Fill */ "ol/style/Fill");
/* harmony import */ var ol_style_Fill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ol_style_Fill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ol_style_Stroke__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ol/style/Stroke */ "ol/style/Stroke");
/* harmony import */ var ol_style_Stroke__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ol_style_Stroke__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ol_style_Icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ol/style/Icon */ "ol/style/Icon");
/* harmony import */ var ol_style_Icon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(ol_style_Icon__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ol_style_Text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ol/style/Text */ "./node_modules/ol/style/Text.js");
/* harmony import */ var ol_style_Circle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ol/style/Circle */ "ol/style/Circle");
/* harmony import */ var ol_style_Circle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(ol_style_Circle__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ol_geom_Point__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ol/geom/Point */ "ol/geom/Point");
/* harmony import */ var ol_geom_Point__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ol_geom_Point__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _mapbox_mapbox_gl_style_spec_deref__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mapbox/mapbox-gl-style-spec/deref */ "./node_modules/@mapbox/mapbox-gl-style-spec/deref.js");
/* harmony import */ var _mapbox_mapbox_gl_style_spec_reference_latest__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @mapbox/mapbox-gl-style-spec/reference/latest */ "./node_modules/@mapbox/mapbox-gl-style-spec/reference/latest.js");
/* harmony import */ var _mapbox_mapbox_gl_style_spec__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @mapbox/mapbox-gl-style-spec */ "./node_modules/@mapbox/mapbox-gl-style-spec/dist/index.js");
/* harmony import */ var _mapbox_mapbox_gl_style_spec__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_mapbox_mapbox_gl_style_spec__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var mapbox_to_css_font__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! mapbox-to-css-font */ "./node_modules/mapbox-to-css-font/index.js");
/* harmony import */ var mapbox_to_css_font__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(mapbox_to_css_font__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./util */ "./util.js");
/*
ol-mapbox-style - Use Mapbox Style objects with OpenLayers
Copyright 2016-present ol-mapbox-style contributors
License: https://raw.githubusercontent.com/boundlessgeo/ol-mapbox-gl-style/master/LICENSE
*/














var isFunction = _mapbox_mapbox_gl_style_spec__WEBPACK_IMPORTED_MODULE_9__["function"].isFunction;
var convertFunction = _mapbox_mapbox_gl_style_spec__WEBPACK_IMPORTED_MODULE_9__["function"].convertFunction;
var isExpression = _mapbox_mapbox_gl_style_spec__WEBPACK_IMPORTED_MODULE_9__["expression"].isExpression;
var createPropertyExpression = _mapbox_mapbox_gl_style_spec__WEBPACK_IMPORTED_MODULE_9__["expression"].createPropertyExpression;

var types = {
  'Point': 1,
  'MultiPoint': 1,
  'LineString': 2,
  'MultiLineString': 2,
  'Polygon': 3,
  'MultiPolygon': 3
};

var expressionData = function(rawExpression, propertySpec) {
  var compiledExpression = createPropertyExpression(rawExpression, propertySpec);
  if (compiledExpression.result === 'error') {
    throw new Error(compiledExpression.value.map(function (err) { return ((err.key) + ": " + (err.message)); }).join(', '));
  }
  return compiledExpression.value;
};

var emptyObj = {};
var zoomObj = {zoom: 0};
var functionCache = {};

/**
 * @private
 * @param {Object} layer Gl object layer.
 * @param {string} layoutOrPaint 'layout' or 'paint'.
 * @param {string} property Feature property.
 * @param {number} zoom Zoom.
 * @param {Object} feature Gl feature.
 * @return {?} Value.
 */
function getValue(layer, layoutOrPaint, property, zoom, feature) {
  var layerId = layer.id;
  if (!functionCache[layerId]) {
    functionCache[layerId] = {};
  }
  var functions = functionCache[layerId];
  if (!functions[property]) {
    var value = (layer[layoutOrPaint] || emptyObj)[property];
    var propertySpec = _mapbox_mapbox_gl_style_spec_reference_latest__WEBPACK_IMPORTED_MODULE_8__["default"][(layoutOrPaint + "_" + (layer.type))][property];
    if (value === undefined) {
      value = propertySpec.default;
    }
    var isExpr = isExpression((value));
    if (!isExpr && isFunction(value)) {
      value = convertFunction(value, propertySpec);
      isExpr = true;
    }
    if (isExpr) {
      var compiledExpression = expressionData(value, propertySpec);
      functions[property] = compiledExpression.evaluate.bind(compiledExpression);
    } else {
      if (propertySpec.type == 'color') {
        value = _mapbox_mapbox_gl_style_spec__WEBPACK_IMPORTED_MODULE_9__["Color"].parse(value);
      }
      functions[property] = function() {
        return value;
      };
    }
  }
  zoomObj.zoom = zoom;
  return functions[property](zoomObj, feature);
}

var filterCache = {};
function evaluateFilter(layerId, filter, feature, zoom) {
  if (!(layerId in filterCache)) {
    filterCache[layerId] = Object(_mapbox_mapbox_gl_style_spec__WEBPACK_IMPORTED_MODULE_9__["featureFilter"])(filter);
  }
  zoomObj.zoom = zoom;
  return filterCache[layerId](zoomObj, feature);
}

var colorCache = {};
function colorWithOpacity(color, opacity) {
  if (color && opacity !== undefined) {
    var colorData = colorCache[color];
    if (!colorData) {
      colorCache[color] = colorData = {
        color: color.toArray(),
        opacity: color.a
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
 * ```js
 * import stylefunction from 'ol-mapbox-style/stylefunction';
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
 * @param {Array<number>} [resolutions=[78271.51696402048, 39135.75848201024,
 * 19567.87924100512, 9783.93962050256, 4891.96981025128, 2445.98490512564,
 * 1222.99245256282, 611.49622628141, 305.748113140705, 152.8740565703525,
 * 76.43702828517625, 38.21851414258813, 19.109257071294063, 9.554628535647032,
 * 4.777314267823516, 2.388657133911758, 1.194328566955879, 0.5971642834779395,
 * 0.29858214173896974, 0.14929107086948487, 0.07464553543474244]]
 * Resolutions for mapping resolution to zoom level.
 * @param {Object} [spriteData=undefined] Sprite data from the url specified in
 * the Mapbox Style object's `sprite` property. Only required if a `sprite`
 * property is specified in the Mapbox Style object.
 * @param {Object} [spriteImageUrl=undefined] Sprite image url for the sprite
 * specified in the Mapbox Style object's `sprite` property. Only required if a
 * `sprite` property is specified in the Mapbox Style object.
 * @param {function(Array<string>):string} [getFonts=undefined] Function that
 * receives a font stack as arguments, and returns a (modified) font stack that
 * is available. Font names are the names used in the Mapbox Style object. If
 * not provided, the font stack will be used as-is. This function can also be
 * used for loading web fonts.
 * @return {ol.style.StyleFunction} Style function for use in
 * `ol.layer.Vector` or `ol.layer.VectorTile`.
 */
/* harmony default export */ __webpack_exports__["default"] = (function(olLayer, glStyle, source, resolutions, spriteData, spriteImageUrl, getFonts) {
  if (!resolutions) {
    resolutions = [];
    for (var res = 78271.51696402048; resolutions.length < 21; res /= 2) {
      resolutions.push(res);
    }
  }
  if (typeof glStyle == 'string') {
    glStyle = JSON.parse(glStyle);
  }
  if (glStyle.version != 8) {
    throw new Error('glStyle version 8 required.');
  }

  var spriteImage, spriteImgSize;
  if (spriteImageUrl) {
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
      spriteImage = img;
      spriteImgSize = [img.width, img.height];
      olLayer.changed();
      img.onload = null;
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
        if ((ctx.measureText(line + word).width <= width)) {
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

  var allLayers = Object(_mapbox_mapbox_gl_style_spec_deref__WEBPACK_IMPORTED_MODULE_7__["default"])(glStyle.layers);

  var layersBySourceLayer = {};
  var mapboxLayers = [];
  var mapboxSource;
  for (var i = 0, ii = allLayers.length; i < ii; ++i) {
    var layer = allLayers[i];
    var layerId = layer.id;
    if (typeof source == 'string' && layer.source == source ||
        source.indexOf(layerId) !== -1) {
      var sourceLayer = layer['source-layer'];
      if (!mapboxSource) {
        mapboxSource = layer.source;
        var source$1 = glStyle.sources[mapboxSource];
        if (!source$1) {
          throw new Error(("Source \"" + mapboxSource + "\" is not defined"));
        }
        var type = source$1.type;
        if (type !== 'vector' && type !== 'geojson') {
          throw new Error(("Source \"" + mapboxSource + "\" is not of type \"vector\" or \"geojson\", but \"" + type + "\""));
        }
      }
      var layers = layersBySourceLayer[sourceLayer];
      if (!layers) {
        layers = layersBySourceLayer[sourceLayer] = [];
      }
      layers.push({
        layer: layer,
        index: i
      });
      mapboxLayers.push(layerId);
    }
    // TODO revisit when diffing gets added
    delete functionCache[layerId];
    delete filterCache[layerId];
  }

  var textHalo = new ol_style_Stroke__WEBPACK_IMPORTED_MODULE_2___default.a();
  var textColor = new ol_style_Fill__WEBPACK_IMPORTED_MODULE_1___default.a();

  var iconImageCache = {};
  var patternCache = {};
  var styles = [];

  var styleFunction = function(feature, resolution) {
    var properties = feature.getProperties();
    var layers = layersBySourceLayer[properties.layer];
    if (!layers) {
      return;
    }
    var zoom = resolutions.indexOf(resolution);
    if (zoom == -1) {
      zoom = Object(_util__WEBPACK_IMPORTED_MODULE_11__["getZoomForResolution"])(resolution, resolutions);
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
      var layerId = layer.id;

      var layout = layer.layout || emptyObj;
      var paint = layer.paint || emptyObj;
      if (layout.visibility === 'none' || ('minzoom' in layer && zoom < layer.minzoom) ||
          ('maxzoom' in layer && zoom >= layer.maxzoom)) {
        continue;
      }
      var filter = layer.filter;
      if (!filter || evaluateFilter(layerId, filter, f, zoom)) {
        var color = (void 0), opacity = (void 0), fill = (void 0), stroke = (void 0), strokeColor = (void 0), style = (void 0);
        var index = layerData.index;
        if (type == 3 && layer.type == 'fill') {
          opacity = getValue(layer, 'paint', 'fill-opacity', zoom, f);
          if ('fill-pattern' in paint) {
            var fillIcon = getValue(layer, 'paint', 'fill-pattern', zoom, f);
            if (fillIcon) {
              var icon = fromTemplate(fillIcon, properties);
              if (spriteImage && spriteData && spriteData[icon]) {
                ++stylesLength;
                style = styles[stylesLength];
                if (!style || !style.getFill() || style.getStroke() || style.getText()) {
                  style = styles[stylesLength] = new ol_style_Style__WEBPACK_IMPORTED_MODULE_0___default.a({
                    fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_1___default.a()
                  });
                }
                fill = style.getFill();
                style.setZIndex(index);
                var icon_cache_key = icon + '.' + opacity;
                var pattern = patternCache[icon_cache_key];
                if (!pattern) {
                  var spriteImageData = spriteData[icon];
                  var canvas = document.createElement('canvas');
                  canvas.width = spriteImageData.width;
                  canvas.height = spriteImageData.height;
                  var ctx = canvas.getContext('2d');
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
            color = colorWithOpacity(getValue(layer, 'paint', 'fill-color', zoom, f), opacity);
            if (color) {
              ++stylesLength;
              style = styles[stylesLength];
              if (!style || !style.getFill() || style.getStroke() || style.getText()) {
                style = styles[stylesLength] = new ol_style_Style__WEBPACK_IMPORTED_MODULE_0___default.a({
                  fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_1___default.a()
                });
              }
              fill = style.getFill();
              fill.setColor(color);
              style.setZIndex(index);
            }
            if ('fill-outline-color' in paint) {
              strokeColor = colorWithOpacity(getValue(layer, 'paint', 'fill-outline-color', zoom, f), opacity);
            }
            if (strokeColor) {
              ++stylesLength;
              style = styles[stylesLength];
              if (!style || !style.getStroke() || style.getFill() || style.getText()) {
                style = styles[stylesLength] = new ol_style_Style__WEBPACK_IMPORTED_MODULE_0___default.a({
                  stroke: new ol_style_Stroke__WEBPACK_IMPORTED_MODULE_2___default.a()
                });
              }
              stroke = style.getStroke();
              stroke.setLineCap(_mapbox_mapbox_gl_style_spec_reference_latest__WEBPACK_IMPORTED_MODULE_8__["default"]['layout_line']['line-cap']);
              stroke.setLineJoin(_mapbox_mapbox_gl_style_spec_reference_latest__WEBPACK_IMPORTED_MODULE_8__["default"]['layout_line']['line-join']);
              stroke.setMiterLimit(_mapbox_mapbox_gl_style_spec_reference_latest__WEBPACK_IMPORTED_MODULE_8__["default"]['layout_line']['line-miter-limit']);
              stroke.setColor(strokeColor);
              stroke.setWidth(1);
              stroke.setLineDash(null);
              style.setZIndex(index);
            }
          }
        }
        if (type != 1 && layer.type == 'line') {
          color = !('line-pattern' in paint) && 'line-color' in paint ?
            colorWithOpacity(getValue(layer, 'paint', 'line-color', zoom, f), getValue(layer, 'paint', 'line-opacity', zoom, f)) :
            undefined;
          var width = getValue(layer, 'paint', 'line-width', zoom, f);
          if (color && width > 0) {
            ++stylesLength;
            style = styles[stylesLength];
            if (!style || !style.getStroke() || style.getFill() || style.getText()) {
              style = styles[stylesLength] = new ol_style_Style__WEBPACK_IMPORTED_MODULE_0___default.a({
                stroke: new ol_style_Stroke__WEBPACK_IMPORTED_MODULE_2___default.a()
              });
            }
            stroke = style.getStroke();
            stroke.setLineCap(getValue(layer, 'layout', 'line-cap', zoom, f));
            stroke.setLineJoin(getValue(layer, 'layout', 'line-join', zoom, f));
            stroke.setMiterLimit(getValue(layer, 'layout', 'line-miter-limit', zoom, f));
            stroke.setColor(color);
            stroke.setWidth(width);
            stroke.setLineDash(paint['line-dasharray'] ?
              getValue(layer, 'paint', 'line-dasharray', zoom, f).map(function(x) {
                return x * width;
              }) : null);
            style.setZIndex(index);
          }
        }

        var hasImage = false;
        var text = null;
        var placementAngle = 0;
        var icon$1 = (void 0), iconImg = (void 0), skipLabel = (void 0);
        if ((type == 1 || type == 2) && 'icon-image' in layout) {
          var iconImage = getValue(layer, 'layout', 'icon-image', zoom, f);
          if (iconImage) {
            icon$1 = fromTemplate(iconImage, properties);
            var styleGeom = undefined;
            if (spriteImage && spriteData && spriteData[icon$1]) {
              var iconRotationAlignment = getValue(layer, 'layout', 'icon-rotation-alignment', zoom, f);
              if (type == 2) {
                var geom = feature.getGeometry();
                // ol package and ol-debug.js only
                if (geom.getFlatMidpoint) {
                  var extent = geom.getExtent();
                  var size = Math.sqrt(Math.max(
                    Math.pow((extent[2] - extent[0]) / resolution, 2),
                    Math.pow((extent[3] - extent[1]) / resolution, 2))
                  );
                  if (size > 150) {
                    //FIXME Do not hard-code a size of 150
                    var midpoint = geom.getFlatMidpoint();
                    styleGeom = new ol_geom_Point__WEBPACK_IMPORTED_MODULE_6___default.a(midpoint);
                    var placement = getValue(layer, 'layout', 'symbol-placement', zoom, f);
                    if (placement === 'line' && iconRotationAlignment === 'map') {
                      var stride = geom.getStride();
                      var coordinates = geom.getFlatCoordinates();
                      for (var i$1 = 0, ii$1 = coordinates.length - stride; i$1 < ii$1; i$1 += stride) {
                        var x1 = coordinates[i$1];
                        var y1 = coordinates[i$1 + 1];
                        var x2 = coordinates[i$1 + stride];
                        var y2 = coordinates[i$1 + stride + 1];
                        var minX = Math.min(x1, x2);
                        var minY = Math.min(y1, y2);
                        var maxX = Math.max(x1, x2);
                        var maxY = Math.max(y1, y2);
                        if (midpoint[0] >= minX && midpoint[0] <= maxX &&
                            midpoint[1] >= minY && midpoint[1] <= maxY) {
                          placementAngle = Math.atan2(y1 - y2, x2 - x1);
                          break;
                        }
                      }
                    }
                  }
                }
              }
              if (type !== 2 || styleGeom) {
                ++stylesLength;
                style = styles[stylesLength];
                if (!style || !style.getImage() || style.getFill() || style.getStroke()) {
                  style = styles[stylesLength] = new ol_style_Style__WEBPACK_IMPORTED_MODULE_0___default.a();
                }
                style.setGeometry(styleGeom);
                var iconSize = getValue(layer, 'layout', 'icon-size', zoom, f);
                var iconColor = paint['icon-color'] !== undefined ? getValue(layer, 'paint', 'icon-color', zoom, f) : null;
                var icon_cache_key$1 = icon$1 + '.' + iconSize;
                if (iconColor !== null) {
                  icon_cache_key$1 += '.' + iconColor;
                }
                iconImg = iconImageCache[icon_cache_key$1];
                if (!iconImg) {
                  var spriteImageData$1 = spriteData[icon$1];
                  if (iconColor !== null) {
                    // cut out the sprite and color it
                    color = colorWithOpacity(iconColor, 1);
                    var canvas$1 = document.createElement('canvas');
                    canvas$1.width = spriteImageData$1.width;
                    canvas$1.height = spriteImageData$1.height;
                    var ctx$1 = canvas$1.getContext('2d');
                    ctx$1.drawImage(
                      spriteImage,
                      spriteImageData$1.x,
                      spriteImageData$1.y,
                      spriteImageData$1.width,
                      spriteImageData$1.height,
                      0,
                      0,
                      spriteImageData$1.width,
                      spriteImageData$1.height
                    );
                    var data = ctx$1.getImageData(0, 0, canvas$1.width, canvas$1.height);
                    for (var c = 0, cc = data.data.length; c < cc; c += 4) {
                      data.data[c] = color[0];
                      data.data[c + 1] = color[1];
                      data.data[c + 2] = color[2];
                    }
                    ctx$1.putImageData(data, 0, 0);
                    iconImg = iconImageCache[icon_cache_key$1] = new ol_style_Icon__WEBPACK_IMPORTED_MODULE_3___default.a({
                      img: canvas$1,
                      imgSize: [canvas$1.width, canvas$1.height],
                      scale: iconSize / spriteImageData$1.pixelRatio
                    });
                  } else {
                    iconImg = iconImageCache[icon_cache_key$1] = new ol_style_Icon__WEBPACK_IMPORTED_MODULE_3___default.a({
                      img: spriteImage,
                      imgSize: spriteImgSize,
                      size: [spriteImageData$1.width, spriteImageData$1.height],
                      offset: [spriteImageData$1.x, spriteImageData$1.y],
                      rotateWithView: iconRotationAlignment === 'map',
                      scale: iconSize / spriteImageData$1.pixelRatio
                    });
                  }
                }
                iconImg.setRotation(placementAngle + Object(_util__WEBPACK_IMPORTED_MODULE_11__["deg2rad"])(getValue(layer, 'layout', 'icon-rotate', zoom, f)));
                iconImg.setOpacity(getValue(layer, 'paint', 'icon-opacity', zoom, f));
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
            style = styles[stylesLength] = new ol_style_Style__WEBPACK_IMPORTED_MODULE_0___default.a();
          }
          var circleRadius = getValue(layer, 'paint', 'circle-radius', zoom, f);
          var circleStrokeColor = getValue(layer, 'paint', 'circle-stroke-color', zoom, f);
          var circleColor = getValue(layer, 'paint', 'circle-color', zoom, f);
          var circleOpacity = getValue(layer, 'paint', 'circle-opacity', zoom, f);
          var circleStrokeOpacity = getValue(layer, 'paint', 'circle-stroke-opacity', zoom, f);
          var circleStrokeWidth = getValue(layer, 'paint', 'circle-stroke-width', zoom, f);
          var cache_key = circleRadius + '.' + circleStrokeColor + '.' +
            circleColor + '.' + circleOpacity + '.' + circleStrokeWidth;
          iconImg = iconImageCache[cache_key];
          if (!iconImg) {
            iconImg = new ol_style_Circle__WEBPACK_IMPORTED_MODULE_5___default.a({
              radius: circleRadius,
              stroke: circleStrokeWidth === 0 ? undefined : new ol_style_Stroke__WEBPACK_IMPORTED_MODULE_2___default.a({
                width: circleStrokeWidth,
                color: colorWithOpacity(circleStrokeColor, circleStrokeOpacity)
              }),
              fill: new ol_style_Fill__WEBPACK_IMPORTED_MODULE_1___default.a({
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

        var label = (void 0);
        if ('text-field' in layout) {
          var textField = getValue(layer, 'layout', 'text-field', zoom, f).toString();
          label = fromTemplate(textField, properties);
        }
        if (label && !skipLabel) {
          if (!hasImage) {
            ++stylesLength;
            style = styles[stylesLength];
            if (!style || !style.getText() || style.getFill() || style.getStroke()) {
              style = styles[stylesLength] = new ol_style_Style__WEBPACK_IMPORTED_MODULE_0___default.a();
            }
            style.setImage(undefined);
            style.setGeometry(undefined);
          }
          if (!style.getText()) {
            style.setText(text || new ol_style_Text__WEBPACK_IMPORTED_MODULE_4__["default"]());
          }
          text = style.getText();
          var textSize = getValue(layer, 'layout', 'text-size', zoom, f);
          var fontArray = getValue(layer, 'layout', 'text-font', zoom, f);
          var font = mapbox_to_css_font__WEBPACK_IMPORTED_MODULE_10___default()(getFonts ? getFonts(fontArray) : fontArray, textSize);
          var textTransform = layout['text-transform'];
          if (textTransform == 'uppercase') {
            label = label.toUpperCase();
          } else if (textTransform == 'lowercase') {
            label = label.toLowerCase();
          }
          var wrappedLabel = type == 2 ? label : wrapText(label, font, getValue(layer, 'layout', 'text-max-width', zoom, f));
          text.setText(wrappedLabel);
          text.setFont(font);
          text.setRotation(Object(_util__WEBPACK_IMPORTED_MODULE_11__["deg2rad"])(getValue(layer, 'layout', 'text-rotate', zoom, f)));
          var textAnchor = getValue(layer, 'layout', 'text-anchor', zoom, f);
          var placement$1 = (hasImage || type == 1) ? 'point' : getValue(layer, 'layout', 'symbol-placement', zoom, f);
          text.setPlacement(placement$1);
          if (placement$1 == 'point') {
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
          var textOffset = getValue(layer, 'layout', 'text-offset', zoom, f);
          text.setOffsetX(textOffset[0] * textSize);
          text.setOffsetY(textOffset[1] * textSize);
          opacity = getValue(layer, 'paint', 'text-opacity', zoom, f);
          textColor.setColor(colorWithOpacity(getValue(layer, 'paint', 'text-color', zoom, f), opacity));
          text.setFill(textColor);
          var haloColor = colorWithOpacity(getValue(layer, 'paint', 'text-halo-color', zoom, f), opacity);
          if (haloColor) {
            textHalo.setColor(haloColor);
            textHalo.setWidth(getValue(layer, 'paint', 'text-halo-width', zoom, f));
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
});




/***/ }),

/***/ "./util.js":
/*!*****************!*\
  !*** ./util.js ***!
  \*****************/
/*! exports provided: deg2rad, getZoomForResolution */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deg2rad", function() { return deg2rad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getZoomForResolution", function() { return getZoomForResolution; });
function deg2rad(degrees) {
  return degrees * Math.PI / 180;
}

function getZoomForResolution(resolution, resolutions) {
  var i = 0;
  var ii = resolutions.length;
  for (; i < ii; ++i) {
    var candidate = resolutions[i];
    if (candidate < resolution && i + 1 < ii) {
      var zoomFactor = resolutions[i] / resolutions[i + 1];
      return i + Math.log(resolutions[i] / resolution) / Math.log(zoomFactor);
    }
  }
  return ii - 1;
}


/***/ }),

/***/ "ol/Map":
/*!*************************!*\
  !*** external "ol.Map" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.Map;

/***/ }),

/***/ "ol/Observable":
/*!********************************!*\
  !*** external "ol.Observable" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.Observable;

/***/ }),

/***/ "ol/format/GeoJSON":
/*!************************************!*\
  !*** external "ol.format.GeoJSON" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.format.GeoJSON;

/***/ }),

/***/ "ol/format/MVT":
/*!********************************!*\
  !*** external "ol.format.MVT" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.format.MVT;

/***/ }),

/***/ "ol/geom/Point":
/*!********************************!*\
  !*** external "ol.geom.Point" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.geom.Point;

/***/ }),

/***/ "ol/layer/Tile":
/*!********************************!*\
  !*** external "ol.layer.Tile" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.layer.Tile;

/***/ }),

/***/ "ol/layer/Vector":
/*!**********************************!*\
  !*** external "ol.layer.Vector" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.layer.Vector;

/***/ }),

/***/ "ol/layer/VectorTile":
/*!**************************************!*\
  !*** external "ol.layer.VectorTile" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.layer.VectorTile;

/***/ }),

/***/ "ol/proj":
/*!**************************!*\
  !*** external "ol.proj" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.proj;

/***/ }),

/***/ "ol/source/TileJSON":
/*!*************************************!*\
  !*** external "ol.source.TileJSON" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.source.TileJSON;

/***/ }),

/***/ "ol/source/Vector":
/*!***********************************!*\
  !*** external "ol.source.Vector" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.source.Vector;

/***/ }),

/***/ "ol/source/VectorTile":
/*!***************************************!*\
  !*** external "ol.source.VectorTile" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.source.VectorTile;

/***/ }),

/***/ "ol/style/Circle":
/*!**********************************!*\
  !*** external "ol.style.Circle" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.style.Circle;

/***/ }),

/***/ "ol/style/Fill":
/*!********************************!*\
  !*** external "ol.style.Fill" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.style.Fill;

/***/ }),

/***/ "ol/style/Icon":
/*!********************************!*\
  !*** external "ol.style.Icon" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.style.Icon;

/***/ }),

/***/ "ol/style/Stroke":
/*!**********************************!*\
  !*** external "ol.style.Stroke" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.style.Stroke;

/***/ }),

/***/ "ol/style/Style":
/*!*********************************!*\
  !*** external "ol.style.Style" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.style.Style;

/***/ }),

/***/ "ol/tilegrid":
/*!******************************!*\
  !*** external "ol.tilegrid" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.tilegrid;

/***/ }),

/***/ "ol/tilegrid/TileGrid":
/*!***************************************!*\
  !*** external "ol.tilegrid.TileGrid" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ol.tilegrid.TileGrid;

/***/ })

/******/ })["default"];
//# sourceMappingURL=olms-debug.js.map