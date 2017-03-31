(function(_g){(function(f){var r=(typeof require==='function'?require:function(name){return {"_":null,"ol/proj":ol.proj,"ol/tilegrid":ol.tilegrid,"ol/map":ol.Map,"ol/format/geojson":ol.format.GeoJSON,"ol/format/mvt":ol.format.MVT,"ol/layer/vector":ol.layer.Vector,"ol/layer/vectortile":ol.layer.VectorTile,"ol/source/vector":ol.source.Vector,"ol/source/vectortile":ol.source.VectorTile,"ol/style/style":ol.style.Style,"ol/style/fill":ol.style.Fill,"ol/style/stroke":ol.style.Stroke,"ol/style/circle":ol.style.Circle,"ol/style/icon":ol.style.Icon,"ol/style/text":ol.style.Text}[name];});if (typeof exports==='object'&&typeof module!=='undefined'){module.exports=f(r)}else if(typeof define==='function'&&define.amd){define(["_","ol/proj","ol/tilegrid","ol/map","ol/format/geojson","ol/format/mvt","ol/layer/vector","ol/layer/vectortile","ol/source/vector","ol/source/vectortile","ol/style/style","ol/style/fill","ol/style/stroke","ol/style/circle","ol/style/icon","ol/style/text"],f.bind(_g,r))}else{f(r)}})(function(require,define,module,exports){var _m=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyStyle = applyStyle;
exports.applyBackground = applyBackground;
exports.apply = apply;

var _function = require('@mapbox/mapbox-gl-style-spec/function');

var _function2 = _interopRequireDefault(_function);

var _mapboxToCssFont = require('mapbox-to-css-font');

var _mapboxToCssFont2 = _interopRequireDefault(_mapboxToCssFont);

var _mapboxToOlStyle = require('mapbox-to-ol-style');

var _mapboxToOlStyle2 = _interopRequireDefault(_mapboxToOlStyle);

var _webfontloader = require('webfontloader');

var _webfontloader2 = _interopRequireDefault(_webfontloader);

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

var _vector = require('ol/layer/vector');

var _vector2 = _interopRequireDefault(_vector);

var _vectortile = require('ol/layer/vectortile');

var _vectortile2 = _interopRequireDefault(_vectortile);

var _vector3 = require('ol/source/vector');

var _vector4 = _interopRequireDefault(_vector3);

var _vectortile3 = require('ol/source/vectortile');

var _vectortile4 = _interopRequireDefault(_vectortile3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var availableFonts; /*
                    ol-mapbox-style - Use Mapbox Style objects with OpenLayers
                    Copyright 2016-present Boundless Spatial, Inc.
                    License: https://raw.githubusercontent.com/boundlessgeo/ol-mapbox-gl-style/master/LICENSE.md
                    */

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
  var families = fonts.map(function (font) {
    return (0, _mapboxToCssFont2.default)(font, 1).split(' 1px ')[1];
  });
  _webfontloader2.default.load({
    google: {
      families: families
    },
    fontactive: function (family) {
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
    inactive: function () {
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

var spriteRegEx = /^(.*)(\?access_token=.*)$/;

function toSpriteUrl(url, extension) {
  var parts = url.match(spriteRegEx);
  return parts ? parts[1] + extension + (parts.length > 2 ? parts[2] : '') : url + extension;
}

/**
 * Applies a style function to an `ol.layer.VectorTile` or `ol.layer.Vector`
 * with an `ol.source.VectorTile` or an `ol.source.Vector`. The style function
 * will render all layers from the `glStyle` object that use the specified
 * `source`, or a subset of layers from the same source. The source needs to be
 * a `"type": "vector"` or `"type": "geojson"` source.
 *
 * @param {ol.layer.VectorTile} layer OpenLayers layer.
 * @param {string|Object} glStyle Mapbox Style object.
 * @param {string} source `source` key or an array of layer `id`s from the
 * Mapbox Style object. When a `source` key is provided, all layers for the
 * specified source will be included in the style function. When layer `id`s
 * are provided, they must be from layers that use the same source.
 * @return {Promise} Promise which will be resolved when the style can be used
 * for rendering.
 */
function applyStyle(layer, glStyle, source) {
  return new Promise(function (resolve, reject) {

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
      var spriteUrl = toSpriteUrl(glStyle.sprite, sizeFactor + '.json');
      xhr.open('GET', spriteUrl);
      xhr.onload = xhr.onerror = function () {
        if (!xhr.responseText) {
          reject(new Error('Sprites cannot be loaded from ' + spriteUrl));
        }
        spriteData = JSON.parse(xhr.responseText);
        onChange();
      };
      xhr.send();
      spriteImageUrl = toSpriteUrl(glStyle.sprite, sizeFactor + '.png');
      var spriteImage = document.createElement('IMG');
      spriteImage.onload = function () {
        onChange();
      };
      spriteImage.src = spriteImageUrl;
    }

    var resolutions;
    if (layer instanceof _vectortile2.default) {
      resolutions = layer.getSource().getTileGrid().getResolutions();
    }
    var style;
    function onChange() {
      if (!style && (!glStyle.sprite || spriteData) && (!availableFonts || availableFonts.length > 0)) {
        style = (0, _mapboxToOlStyle2.default)(glStyle, source, resolutions, spriteData, spriteImageUrl, availableFonts);
        layer.setStyle(style);
        resolve();
      } else if (style) {
        layer.setStyle(style);
      }
    }
    try {
      var layers = glStyle.layers;
      for (var i = 0, ii = layers.length; i < ii; ++i) {
        if (typeof source == 'string' && layers[i].source == source || source.indexOf(layers[i].id) >= 0) {
          preprocess(layers[i], onChange);
        }
      }
      onChange();
    } catch (e) {
      window.setTimeout(function () {
        reject(e);
      }, 0);
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
      element.style.backgroundColor = _function2.default['piecewise-constant'](paint['background-color'])(zoom);
    }
    if ('background-opacity' in paint) {
      element.style.backgroundOpacity = _function2.default.interpolated(paint['background-opacity'])(zoom);
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

function processStyle(glStyle, map, baseUrl, path, accessToken) {
  var view = map.getView();
  if ('center' in glStyle && !view.getCenter()) {
    view.setCenter(_proj2.default.fromLonLat(glStyle.center));
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
  if (glStyle.sprite && glStyle.sprite.indexOf('mapbox://') == 0) {
    glStyle.sprite = baseUrl + '/sprite' + accessToken;
  }

  var glLayers = glStyle.layers;
  var layerIds = [];

  function finalizeLayer(layer) {
    if (layerIds.length > 0) {
      map.addLayer(layer);
      applyStyle(layer, glStyle, layerIds).then(function () {
        layer.setVisible(true);
      }, function (e) {
        throw e;
      });
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

        if (glSource.type == 'vector') {
          url = glSource.url;
          if (url.indexOf('mapbox://') == 0) {
            mapid = url.replace('mapbox://', '');
            url = 'https://{a-d}.tiles.mapbox.com/v4/' + mapid + '/{z}/{x}/{y}.vector.pbf' + accessToken;
          }
          layer = new _vectortile2.default({
            source: new _vectortile4.default({
              format: new _mvt2.default(),
              tileGrid: _tilegrid2.default.createXYZ({
                tileSize: 512,
                maxZoom: 'maxzoom' in glSource ? glSource.maxzoom : 22,
                minZoom: glSource.minzoom
              }),
              tilePixelRatio: 8,
              url: url
            }),
            visible: false
          });
        } else if (glSource.type == 'geojson') {
          url = glSource.data;
          if (url.indexOf('http') != 0) {
            url = path + url;
          }
          layer = new _vector2.default({
            source: new _vector4.default({
              format: new _geojson2.default(),
              url: url
            }),
            visible: false
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
 * @param {ol.Map|HTMLElement|stribng} map Either an existing OpenLayers Map
 * instance, or a HTML element, or the id of a HTML element that will be the
 * target of a new OpenLayers Map.
 * @param {string} style Url pointing to a Mapbox Style object. When using
 * Mapbox APIs, the url must contain an access token and look like
 * `https://api.mapbox.com/styles/v1/mapbox/bright-v9?access_token=[your_access_token_here]`.
 * @return {ol.Map} The OpenLayers Map instance that will be populated with the
 * contents described in the Mapbox Style object.
 */
function apply(map, style) {

  var accessToken, baseUrl, path;

  if (!(map instanceof _map2.default)) {
    map = new _map2.default({
      target: map
    });
  }

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
  xhr.addEventListener('load', function () {
    var glStyle = JSON.parse(xhr.responseText);
    processStyle(glStyle, map, baseUrl, path, accessToken);
  });
  xhr.addEventListener('error', function () {
    throw new Error('Could not load ' + style);
  });
  xhr.send();

  return map;
}


},{"@mapbox/mapbox-gl-style-spec/function":3,"mapbox-to-css-font":4,"mapbox-to-ol-style":5,"ol/format/geojson":"ol/format/geojson","ol/format/mvt":"ol/format/mvt","ol/layer/vector":"ol/layer/vector","ol/layer/vectortile":"ol/layer/vectortile","ol/map":"ol/map","ol/proj":"ol/proj","ol/source/vector":"ol/source/vector","ol/source/vectortile":"ol/source/vectortile","ol/tilegrid":"ol/tilegrid","webfontloader":6}],2:[function(require,module,exports){
'use strict';

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


},{}],3:[function(require,module,exports){
'use strict';

var colorSpaces = require('./color_spaces');

function identityFunction(x) {
    return x;
}

function createFunction(parameters, defaultType) {
    var fun;

    if (!isFunctionDefinition(parameters)) {
        fun = function () {
            return parameters;
        };
        fun.isFeatureConstant = true;
        fun.isZoomConstant = true;
    } else {
        var zoomAndFeatureDependent = parameters.stops && typeof parameters.stops[0][0] === 'object';
        var featureDependent = zoomAndFeatureDependent || parameters.property !== undefined;
        var zoomDependent = zoomAndFeatureDependent || !featureDependent;
        var type = parameters.type || defaultType || 'exponential';

        var innerFun;
        if (type === 'exponential') {
            innerFun = evaluateExponentialFunction;
        } else if (type === 'interval') {
            innerFun = evaluateIntervalFunction;
        } else if (type === 'categorical') {
            innerFun = evaluateCategoricalFunction;
        } else if (type === 'identity') {
            innerFun = evaluateIdentityFunction;
        } else {
            throw new Error(("Unknown function type \"" + type + "\""));
        }

        var outputFunction;

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
                throw new Error(("Unknown color space: " + (parameters.colorSpace)));
            }
        } else {
            outputFunction = identityFunction;
        }

        // For categorical functions, generate an Object as a hashmap of the stops for fast searching
        var hashedStops = Object.create(null);
        if (innerFun === evaluateCategoricalFunction) {
            for (var i = 0; i < parameters.stops.length; i++) {
                hashedStops[parameters.stops[i][0]] = parameters.stops[i][1];
            }
        }

        if (zoomAndFeatureDependent) {
            var featureFunctions = {};
            var featureFunctionStops = [];
            for (var s$1 = 0; s$1 < parameters.stops.length; s$1++) {
                var stop = parameters.stops[s$1];
                if (featureFunctions[stop[0].zoom] === undefined) {
                    featureFunctions[stop[0].zoom] = {
                        zoom: stop[0].zoom,
                        type: parameters.type,
                        property: parameters.property,
                        stops: []
                    };
                }
                featureFunctions[stop[0].zoom].stops.push([stop[0].value, stop[1]]);
            }

            for (var z in featureFunctions) {
                featureFunctionStops.push([featureFunctions[z].zoom, createFunction(featureFunctions[z])]);
            }
            fun = function (zoom, feature) {
                return outputFunction(evaluateExponentialFunction({
                    stops: featureFunctionStops,
                    base: parameters.base
                }, zoom)(zoom, feature));
            };
            fun.isFeatureConstant = false;
            fun.isZoomConstant = false;
        } else if (zoomDependent) {
            fun = function (zoom) {
                if (innerFun === evaluateCategoricalFunction) {
                    return outputFunction(innerFun(parameters, zoom, hashedStops));
                } else {
                    return outputFunction(innerFun(parameters, zoom));
                }
            };
            fun.isFeatureConstant = true;
            fun.isZoomConstant = false;
        } else {
            fun = function (zoom, feature) {
                if (innerFun === evaluateCategoricalFunction) {
                    return outputFunction(innerFun(parameters, feature[parameters.property], hashedStops));
                } else {
                    return outputFunction(innerFun(parameters, feature[parameters.property]));
                }
            };
            fun.isFeatureConstant = false;
            fun.isZoomConstant = true;
        }
    }

    return fun;
}

function evaluateCategoricalFunction(parameters, input, hashedStops) {
    var value = hashedStops[input];
    if (value === undefined) {
        // If the input is not found, return the first value from the original array by default
        return parameters.stops[0][1];
    }

    return value;
}

function evaluateIntervalFunction(parameters, input) {
    // Edge cases
    var n = parameters.stops.length;
    if (n === 1) { return parameters.stops[0][1]; }
    if (input === undefined || input === null) { return parameters.stops[n - 1][1]; }
    if (input <= parameters.stops[0][0]) { return parameters.stops[0][1]; }
    if (input >= parameters.stops[n - 1][0]) { return parameters.stops[n - 1][1]; }

    var index = binarySearchForIndex(parameters.stops, input);

    return parameters.stops[index][1];
}

function evaluateExponentialFunction(parameters, input) {
    var base = parameters.base !== undefined ? parameters.base : 1;

    // Edge cases
    var n = parameters.stops.length;
    if (n === 1) { return parameters.stops[0][1]; }
    if (input === undefined || input === null) { return parameters.stops[n - 1][1]; }
    if (input <= parameters.stops[0][0]) { return parameters.stops[0][1]; }
    if (input >= parameters.stops[n - 1][0]) { return parameters.stops[n - 1][1]; }

    var index = binarySearchForIndex(parameters.stops, input);

    return interpolate(input, base, parameters.stops[index][0], parameters.stops[index + 1][0], parameters.stops[index][1], parameters.stops[index + 1][1]);
}

function evaluateIdentityFunction(parameters, input) {
    return input;
}

function binarySearchForIndex(stops, input) {
    var n = stops.length;
    var lowerIndex = 0;
    var upperIndex = n - 1;
    var currentIndex = 0;
    var currentValue, upperValue;

    while (lowerIndex <= upperIndex) {
        currentIndex = Math.floor((lowerIndex + upperIndex) / 2);
        currentValue = stops[currentIndex][0];
        upperValue = stops[currentIndex + 1][0];
        if (input >= currentValue && input < upperValue) {
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

function interpolate(input, base, inputLower, inputUpper, outputLower, outputUpper) {
    if (typeof outputLower === 'function') {
        return function () {
            var evaluatedLower = outputLower.apply(undefined, arguments);
            var evaluatedUpper = outputUpper.apply(undefined, arguments);
            return interpolate(input, base, inputLower, inputUpper, evaluatedLower, evaluatedUpper);
        };
    } else if (outputLower.length) {
        return interpolateArray(input, base, inputLower, inputUpper, outputLower, outputUpper);
    } else {
        return interpolateNumber(input, base, inputLower, inputUpper, outputLower, outputUpper);
    }
}

function interpolateNumber(input, base, inputLower, inputUpper, outputLower, outputUpper) {
    var difference = inputUpper - inputLower;
    var progress = input - inputLower;

    var ratio;
    if (base === 1) {
        ratio = progress / difference;
    } else {
        ratio = (Math.pow(base, progress) - 1) / (Math.pow(base, difference) - 1);
    }

    return outputLower * (1 - ratio) + outputUpper * ratio;
}

function interpolateArray(input, base, inputLower, inputUpper, outputLower, outputUpper) {
    var output = [];
    for (var i = 0; i < outputLower.length; i++) {
        output[i] = interpolateNumber(input, base, inputLower, inputUpper, outputLower[i], outputUpper[i]);
    }
    return output;
}

function isFunctionDefinition(value) {
    return typeof value === 'object' && (value.stops || value.type === 'identity');
}

module.exports.isFunctionDefinition = isFunctionDefinition;

module.exports.interpolated = function (parameters) {
    return createFunction(parameters, 'exponential');
};

module.exports['piecewise-constant'] = function (parameters) {
    return createFunction(parameters, 'interval');
};


},{"./color_spaces":2}],4:[function(require,module,exports){
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
    var fontFamily = parts.join(' ');
    // CSS font property: font-style font-weight font-size font-family
    cssData = fontCache[font] = [style, weight, fontFamily];
  }
  return cssData[0] + sp + cssData[1] + sp + size + 'px' + sp + cssData[2];
};


},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (glStyle, source, resolutions, spriteData, spriteImageUrl, fonts) {
  if (!resolutions) {
    resolutions = [];
    for (var res = 156543.03392804097; resolutions.length < 22; res /= 2) {
      resolutions.push(res);
    }
  }
  if (typeof glStyle == 'object') {
    // We do not want to modify the original, so we deep-clone it
    glStyle = JSON.stringify(glStyle);
  }
  glStyle = JSON.parse(glStyle);
  if (glStyle.version != 8) {
    throw new Error('glStyle version 8 required.');
  }

  var ctx = document.createElement('CANVAS').getContext('2d');
  var measureCache = {};
  function wrapText(text, font, em) {
    var key = em + font + text;
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
          lines.push(line);
          line = word;
        }
      }
      if (line) {
        lines.push(line);
      }
      wrappedText = measureCache[key] = lines.join('\n');
    }
    return wrappedText;
  }

  var allLayers = glStyle.layers;
  var layers = [];
  for (var i = 0, ii = allLayers.length; i < ii; ++i) {
    var layer = allLayers[i];
    if (!layer.layout) {
      layer.layout = {};
    }
    resolveRef(layer, glStyle);
    if (typeof source == 'string' && layer.source == source || source.indexOf(layer.id) !== -1) {
      layers.push(layer);
      preprocess(layer, fonts);
    }
  }

  var textHalo = new _stroke2.default();
  var textColor = new _fill2.default();

  var iconImageCache = {};

  var styles = [];

  return function (feature, resolution) {
    var zoom = resolutions.indexOf(resolution);
    if (zoom == -1) {
      zoom = getZoomForResolution(resolution, resolutions);
    }
    var properties = feature.getProperties();
    properties['$type'] = feature.getGeometry().getType().replace('Multi', '');
    var stylesLength = -1;
    for (var i = 0, ii = layers.length; i < ii; ++i) {
      var layer = layers[i];
      if (layer['source-layer'] && layer['source-layer'] != properties.layer || 'minzoom' in layer && zoom < layer.minzoom || 'maxzoom' in layer && zoom >= layer.maxzoom) {
        continue;
      }
      if (!layer.filter || evaluate(layer.filter, properties)) {
        var color, opacity, fill, stroke, strokeColor, style, text;
        var paint = layer.paint;
        var type = properties['$type'];
        if (type == 'Polygon') {
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
              style.setZIndex(i);
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
              style.setZIndex(i);
            }
          }
        }
        if (type != 'Point') {
          if (!('line-pattern' in paint) && 'line-color' in paint) {
            color = colorWithOpacity(paint['line-color'](zoom, properties), paint['line-opacity'](zoom, properties));
          }
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
            style.setZIndex(i);
          }
        }

        var icon;
        if (type == 'Point' && 'icon-image' in paint) {
          var iconImage = paint['icon-image'](zoom, properties);
          icon = fromTemplate(iconImage, properties);
          style = iconImageCache[icon];
          if (!style && spriteData && spriteImageUrl) {
            var spriteImageData = spriteData[icon];
            if (spriteImageData) {
              style = iconImageCache[icon] = new _style2.default({
                image: new _icon2.default({
                  src: spriteImageUrl,
                  size: [spriteImageData.width, spriteImageData.height],
                  offset: [spriteImageData.x, spriteImageData.y],
                  scale: paint['icon-size'](zoom, properties) / spriteImageData.pixelRatio
                })
              });
            }
          }
          if (style) {
            ++stylesLength;
            var iconImg = style.getImage();
            iconImg.setRotation(deg2rad(paint['icon-rotate'](zoom, properties)));
            iconImg.setOpacity(paint['icon-opacity'](zoom, properties));
            style.setZIndex(i);
            styles[stylesLength] = style;
          }
        }

        if (type == 'Point' && 'circle-radius' in paint) {
          ++stylesLength;
          var cache_key = paint['circle-radius'](zoom, properties) + '.' + paint['circle-stroke-color'](zoom, properties) + '.' + paint['circle-color'](zoom, properties);
          style = iconImageCache[cache_key];
          if (!style) {
            style = new _style2.default({
              image: new _circle2.default({
                radius: paint['circle-radius'](zoom, properties),
                stroke: new _stroke2.default({
                  color: colorWithOpacity(paint['circle-stroke-color'](zoom, properties), opacity)
                }),
                fill: new _fill2.default({
                  color: colorWithOpacity(paint['circle-color'](zoom, properties), opacity)
                })
              })
            });
          }
          style.setZIndex(i);
          styles[stylesLength] = style;
        }

        var label;
        if ('text-field' in paint) {
          var textField = paint['text-field'](zoom, properties);
          label = fromTemplate(textField, properties);
        }
        // TODO Add LineString handling as soon as it's supporte in OpenLayers
        if (label && type !== 'LineString') {
          ++stylesLength;
          style = styles[stylesLength];
          if (!style || !style.getText() || style.getFill() || style.getStroke()) {
            style = styles[stylesLength] = new _style2.default({
              text: new _text2.default({
                text: '',
                fill: textColor
              })
            });
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
          var wrappedLabel = wrapText(label, font, paint['text-max-width'](zoom, properties));
          text.setText(wrappedLabel);
          text.setFont(font);
          var offset = paint['text-offset'](zoom, properties);
          var yOffset = offset[1] * textSize + (wrappedLabel.split('\n').length - 1) * textSize;
          var anchor = paint['text-anchor'](zoom, properties);
          if (anchor.indexOf('top') == 0) {
            yOffset += 0.5 * textSize;
          } else if (anchor.indexOf('bottom') == 0) {
            yOffset -= 0.5 * textSize;
          }
          text.setOffsetX(offset[0] * textSize);
          text.setOffsetY(yOffset);
          text.getFill().setColor(paint['text-color'](zoom, properties));
          if (paint['text-halo-width']) {
            textHalo.setWidth(paint['text-halo-width'](zoom, properties));
            textHalo.setColor(paint['text-halo-color'](zoom, properties));
            text.setStroke(textHalo);
          } else {
            text.setStroke(undefined);
          }
          style.setZIndex(i);
        }
      }
    }

    if (stylesLength > -1) {
      styles.length = stylesLength + 1;
      return styles;
    }
  };
};

var _style = require('ol/style/style');

var _style2 = _interopRequireDefault(_style);

var _fill = require('ol/style/fill');

var _fill2 = _interopRequireDefault(_fill);

var _stroke = require('ol/style/stroke');

var _stroke2 = _interopRequireDefault(_stroke);

var _icon = require('ol/style/icon');

var _icon2 = _interopRequireDefault(_icon);

var _circle = require('ol/style/circle');

var _circle2 = _interopRequireDefault(_circle);

var _text = require('ol/style/text');

var _text2 = _interopRequireDefault(_text);

var _function = require('@mapbox/mapbox-gl-style-spec/function');

var _function2 = _interopRequireDefault(_function);

var _mapboxToCssFont = require('mapbox-to-css-font');

var _mapboxToCssFont2 = _interopRequireDefault(_mapboxToCssFont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
mapbox-to-ol-style - Create OpenLayers style functions from Mapbox Style objects
Copyright 2016-present Boundless Spatial, Inc.
License: https://raw.githubusercontent.com/boundlessgeo/mapbox-to-ol-style/master/LICENSE.md
*/

var functions = {
  interpolated: ['line-miter-limit', 'fill-opacity', 'line-opacity', 'line-width', 'text-halo-width', 'text-max-width', 'text-offset', 'text-size', 'icon-opacity', 'icon-rotate', 'icon-size', 'circle-radius'],
  'piecewise-constant': ['fill-color', 'fill-outline-color', 'icon-image', 'line-cap', 'line-color', 'line-join', 'line-dasharray', 'text-anchor', 'text-color', 'text-field', 'text-font', 'text-halo-color', 'circle-color', 'circle-stroke-color']
};

var defaults = {
  'fill-opacity': 1,
  'line-cap': 'butt',
  'line-join': 'miter',
  'line-miter-limit': 2,
  'line-opacity': 1,
  'line-width': 1,
  'text-anchor': 'center',
  'text-color': '#000000',
  'text-font': ['Open Sans Regular', 'Arial Unicode MS Regular'],
  'text-halo-color': 'rgba(0, 0, 0, 0)',
  'text-halo-width': 0,
  'text-max-width': 10,
  'text-offset': [0, 0],
  'text-size': 16,
  'icon-opacity': 1,
  'icon-rotate': 0,
  'icon-size': 1,
  'circle-color': '#000000',
  'circle-stroke-color': '#000000'
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
    if (!layer.paint[property]) {
      layer.paint[property] = layer.layout[property];
    }
  }
}

function convertToFunctions(properties, type) {
  for (var i = 0, ii = functions[type].length; i < ii; ++i) {
    var property = functions[type][i];
    if (property in properties) {
      properties[property] = _function2.default[type](properties[property]);
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
        if (availableFonts.indexOf(font) >= -1) {
          fontMap[fonts] = font;
          break;
        }
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

function evaluate(filterObj, properties) {
  var type = filterObj[0];
  var i, ii, result;
  if (type == '==') {
    return properties[filterObj[1]] === filterObj[2];
  } else if (type == '!=') {
    return properties[filterObj[1]] !== filterObj[2];
  } else if (type == '>') {
    return properties[filterObj[1]] > filterObj[2];
  } else if (type == '<') {
    return properties[filterObj[1]] < filterObj[2];
  } else if (type == '>=') {
    return properties[filterObj[1]] >= filterObj[2];
  } else if (type == '<=') {
    return properties[filterObj[1]] <= filterObj[2];
  } else if (type == 'in' || type == '!in') {
    result = false;
    var property = properties[filterObj[1]];
    for (i = 2, ii = filterObj.length; i < ii; ++i) {
      result = result || property == filterObj[i];
    }
    return type == 'in' ? result : !result;
  } else if (type == 'all') {
    for (i = 1, ii = filterObj.length; i < ii; ++i) {
      if (!evaluate(filterObj[i], properties)) {
        return false;
      }
    }
    return true;
  } else if (type == 'any') {
    for (i = 1, ii = filterObj.length; i < ii; ++i) {
      if (evaluate(filterObj[i], properties)) {
        return true;
      }
    }
    return false;
  } else if (type == 'none') {
    for (i = 1, ii = filterObj.length; i < ii; ++i) {
      if (evaluate(filterObj[i], properties)) {
        return false;
      }
    }
    return true;
  } else if (type == 'has' || type == '!has') {
    result = properties.hasOwnProperty(filterObj[1]);
    return type == 'has' ? result : !result;
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

var colorElement = document.createElement('div');
var colorRegEx = /^rgba?\((.*)\)$/;
var colorCache = {};

function colorWithOpacity(color, opacity) {
  if (color && opacity !== undefined) {
    var colorData = colorCache[color];
    if (!colorData) {
      colorElement.style.color = color;
      document.body.appendChild(colorElement);
      var colorString = getComputedStyle(colorElement).getPropertyValue('color');
      document.body.removeChild(colorElement);
      colorData = colorString.match(colorRegEx)[1].split(',').map(Number);
      colorCache[color] = colorData;
    }
    color = colorData.slice();
    color[3] = color.length > 3 ? color[3] * opacity : opacity;
    if (color[3] === 0) {
      color = undefined;
    }
  }
  return color;
}

function deg2rad(degrees) {
  return degrees * Math.PI / 180;
}

var templateRegEx = /^(.*)\{(.*)\}(.*)$/;

function fromTemplate(text, properties) {
  var parts = text.match(templateRegEx);
  if (parts) {
    var value = properties[parts[2]] || '';
    return parts[1] + value + parts[3];
  } else {
    return text;
  }
}

/**
 * Creates a style function from the `glStyle` object for all layers that use
 * the specified `source`, which needs to be a `"type": "vector"` or
 * `"type": "geojson"` source.
 *
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
 * Resolutions for mapping resolution to zoom level. For tile layers, this can
 * be `layer.getSource().getTileGrid().getResolutions()`.
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


},{"@mapbox/mapbox-gl-style-spec/function":3,"mapbox-to-css-font":4,"ol/style/circle":"ol/style/circle","ol/style/fill":"ol/style/fill","ol/style/icon":"ol/style/icon","ol/style/stroke":"ol/style/stroke","ol/style/style":"ol/style/style","ol/style/text":"ol/style/text"}],6:[function(require,module,exports){
"use strict";

/* Web Font Loader v1.6.27 - (c) Adobe Systems, Google. License: Apache 2.0 */(function () {
  function aa(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }function ba(a, b, c) {
    if (!a) { throw Error(); }if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);return function () {
        var c = Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c, d);return a.apply(b, c);
      };
    }return function () {
      return a.apply(b, arguments);
    };
  }function p(a, b, c) {
    p = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? aa : ba;return p.apply(null, arguments);
  }var q = Date.now || function () {
    return +new Date();
  };function ca(a, b) {
    this.a = a;this.m = b || a;this.c = this.m.document;
  }var da = !!window.FontFace;function t(a, b, c, d) {
    b = a.c.createElement(b);if (c) { for (var e in c) { c.hasOwnProperty(e) && ("style" == e ? b.style.cssText = c[e] : b.setAttribute(e, c[e])); } }d && b.appendChild(a.c.createTextNode(d));return b;
  }function u(a, b, c) {
    a = a.c.getElementsByTagName(b)[0];a || (a = document.documentElement);a.insertBefore(c, a.lastChild);
  }function v(a) {
    a.parentNode && a.parentNode.removeChild(a);
  }
  function w(a, b, c) {
    b = b || [];c = c || [];for (var d = a.className.split(/\s+/), e = 0; e < b.length; e += 1) {
      for (var f = !1, g = 0; g < d.length; g += 1) { if (b[e] === d[g]) {
        f = !0;break;
      } }f || d.push(b[e]);
    }b = [];for (e = 0; e < d.length; e += 1) {
      f = !1;for (g = 0; g < c.length; g += 1) { if (d[e] === c[g]) {
        f = !0;break;
      } }f || b.push(d[e]);
    }a.className = b.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
  }function y(a, b) {
    for (var c = a.className.split(/\s+/), d = 0, e = c.length; d < e; d++) { if (c[d] == b) { return !0; } }return !1;
  }
  function z(a) {
    if ("string" === typeof a.f) { return a.f; }var b = a.m.location.protocol;"about:" == b && (b = a.a.location.protocol);return "https:" == b ? "https:" : "http:";
  }function ea(a) {
    return a.m.location.hostname || a.a.location.hostname;
  }
  function A(a, b, c) {
    function d() {
      k && e && f && (k(g), k = null);
    }b = t(a, "link", { rel: "stylesheet", href: b, media: "all" });var e = !1,
        f = !0,
        g = null,
        k = c || null;da ? (b.onload = function () {
      e = !0;d();
    }, b.onerror = function () {
      e = !0;g = Error("Stylesheet failed to load");d();
    }) : setTimeout(function () {
      e = !0;d();
    }, 0);u(a, "head", b);
  }
  function B(a, b, c, d) {
    var e = a.c.getElementsByTagName("head")[0];if (e) {
      var f = t(a, "script", { src: b }),
          g = !1;f.onload = f.onreadystatechange = function () {
        g || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (g = !0, c && c(null), f.onload = f.onreadystatechange = null, "HEAD" == f.parentNode.tagName && e.removeChild(f));
      };e.appendChild(f);setTimeout(function () {
        g || (g = !0, c && c(Error("Script load timeout")));
      }, d || 5E3);return f;
    }return null;
  };function C() {
    this.a = 0;this.c = null;
  }function D(a) {
    a.a++;return function () {
      a.a--;E(a);
    };
  }function F(a, b) {
    a.c = b;E(a);
  }function E(a) {
    0 == a.a && a.c && (a.c(), a.c = null);
  };function G(a) {
    this.a = a || "-";
  }G.prototype.c = function (a) {
    var arguments$1 = arguments;

    for (var b = [], c = 0; c < arguments.length; c++) { b.push(arguments$1[c].replace(/[\W_]+/g, "").toLowerCase()); }return b.join(this.a);
  };function H(a, b) {
    this.c = a;this.f = 4;this.a = "n";var c = (b || "n4").match(/^([nio])([1-9])$/i);c && (this.a = c[1], this.f = parseInt(c[2], 10));
  }function fa(a) {
    return I(a) + " " + (a.f + "00") + " 300px " + J(a.c);
  }function J(a) {
    var b = [];a = a.split(/,\s*/);for (var c = 0; c < a.length; c++) {
      var d = a[c].replace(/['"]/g, "");-1 != d.indexOf(" ") || /^\d/.test(d) ? b.push("'" + d + "'") : b.push(d);
    }return b.join(",");
  }function K(a) {
    return a.a + a.f;
  }function I(a) {
    var b = "normal";"o" === a.a ? b = "oblique" : "i" === a.a && (b = "italic");return b;
  }
  function ga(a) {
    var b = 4,
        c = "n",
        d = null;a && ((d = a.match(/(normal|oblique|italic)/i)) && d[1] && (c = d[1].substr(0, 1).toLowerCase()), (d = a.match(/([1-9]00|normal|bold)/i)) && d[1] && (/bold/i.test(d[1]) ? b = 7 : /[1-9]00/.test(d[1]) && (b = parseInt(d[1].substr(0, 1), 10))));return c + b;
  };function ha(a, b) {
    this.c = a;this.f = a.m.document.documentElement;this.h = b;this.a = new G("-");this.j = !1 !== b.events;this.g = !1 !== b.classes;
  }function ia(a) {
    a.g && w(a.f, [a.a.c("wf", "loading")]);L(a, "loading");
  }function M(a) {
    if (a.g) {
      var b = y(a.f, a.a.c("wf", "active")),
          c = [],
          d = [a.a.c("wf", "loading")];b || c.push(a.a.c("wf", "inactive"));w(a.f, c, d);
    }L(a, "inactive");
  }function L(a, b, c) {
    if (a.j && a.h[b]) { if (c) { a.h[b](c.c, K(c)); }else { a.h[b](); } }
  };function ja() {
    this.c = {};
  }function ka(a, b, c) {
    var d = [],
        e;for (e in b) { if (b.hasOwnProperty(e)) {
      var f = a.c[e];f && d.push(f(b[e], c));
    } }return d;
  };function N(a, b) {
    this.c = a;this.f = b;this.a = t(this.c, "span", { "aria-hidden": "true" }, this.f);
  }function O(a) {
    u(a.c, "body", a.a);
  }function P(a) {
    return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + J(a.c) + ";" + ("font-style:" + I(a) + ";font-weight:" + (a.f + "00") + ";");
  };function Q(a, b, c, d, e, f) {
    this.g = a;this.j = b;this.a = d;this.c = c;this.f = e || 3E3;this.h = f || void 0;
  }Q.prototype.start = function () {
    var a = this.c.m.document,
        b = this,
        c = q(),
        d = new Promise(function (d, e) {
      function k() {
        q() - c >= b.f ? e() : a.fonts.load(fa(b.a), b.h).then(function (a) {
          1 <= a.length ? d() : setTimeout(k, 25);
        }, function () {
          e();
        });
      }k();
    }),
        e = new Promise(function (a, d) {
      setTimeout(d, b.f);
    });Promise.race([e, d]).then(function () {
      b.g(b.a);
    }, function () {
      b.j(b.a);
    });
  };function R(a, b, c, d, e, f, g) {
    this.v = a;this.B = b;this.c = c;this.a = d;this.s = g || "BESbswy";this.f = {};this.w = e || 3E3;this.u = f || null;this.o = this.j = this.h = this.g = null;this.g = new N(this.c, this.s);this.h = new N(this.c, this.s);this.j = new N(this.c, this.s);this.o = new N(this.c, this.s);a = new H(this.a.c + ",serif", K(this.a));a = P(a);this.g.a.style.cssText = a;a = new H(this.a.c + ",sans-serif", K(this.a));a = P(a);this.h.a.style.cssText = a;a = new H("serif", K(this.a));a = P(a);this.j.a.style.cssText = a;a = new H("sans-serif", K(this.a));a = P(a);this.o.a.style.cssText = a;O(this.g);O(this.h);O(this.j);O(this.o);
  }var S = { D: "serif", C: "sans-serif" },
      T = null;function U() {
    if (null === T) {
      var a = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);T = !!a && (536 > parseInt(a[1], 10) || 536 === parseInt(a[1], 10) && 11 >= parseInt(a[2], 10));
    }return T;
  }R.prototype.start = function () {
    this.f.serif = this.j.a.offsetWidth;this.f["sans-serif"] = this.o.a.offsetWidth;this.A = q();la(this);
  };
  function ma(a, b, c) {
    for (var d in S) { if (S.hasOwnProperty(d) && b === a.f[S[d]] && c === a.f[S[d]]) { return !0; } }return !1;
  }function la(a) {
    var b = a.g.a.offsetWidth,
        c = a.h.a.offsetWidth,
        d;(d = b === a.f.serif && c === a.f["sans-serif"]) || (d = U() && ma(a, b, c));d ? q() - a.A >= a.w ? U() && ma(a, b, c) && (null === a.u || a.u.hasOwnProperty(a.a.c)) ? V(a, a.v) : V(a, a.B) : na(a) : V(a, a.v);
  }function na(a) {
    setTimeout(p(function () {
      la(this);
    }, a), 50);
  }function V(a, b) {
    setTimeout(p(function () {
      v(this.g.a);v(this.h.a);v(this.j.a);v(this.o.a);b(this.a);
    }, a), 0);
  };function W(a, b, c) {
    this.c = a;this.a = b;this.f = 0;this.o = this.j = !1;this.s = c;
  }var X = null;W.prototype.g = function (a) {
    var b = this.a;b.g && w(b.f, [b.a.c("wf", a.c, K(a).toString(), "active")], [b.a.c("wf", a.c, K(a).toString(), "loading"), b.a.c("wf", a.c, K(a).toString(), "inactive")]);L(b, "fontactive", a);this.o = !0;oa(this);
  };
  W.prototype.h = function (a) {
    var b = this.a;if (b.g) {
      var c = y(b.f, b.a.c("wf", a.c, K(a).toString(), "active")),
          d = [],
          e = [b.a.c("wf", a.c, K(a).toString(), "loading")];c || d.push(b.a.c("wf", a.c, K(a).toString(), "inactive"));w(b.f, d, e);
    }L(b, "fontinactive", a);oa(this);
  };function oa(a) {
    0 == --a.f && a.j && (a.o ? (a = a.a, a.g && w(a.f, [a.a.c("wf", "active")], [a.a.c("wf", "loading"), a.a.c("wf", "inactive")]), L(a, "active")) : M(a.a));
  };function pa(a) {
    this.j = a;this.a = new ja();this.h = 0;this.f = this.g = !0;
  }pa.prototype.load = function (a) {
    this.c = new ca(this.j, a.context || this.j);this.g = !1 !== a.events;this.f = !1 !== a.classes;qa(this, new ha(this.c, a), a);
  };
  function ra(a, b, c, d, e) {
    var f = 0 == --a.h;(a.f || a.g) && setTimeout(function () {
      var a = e || null,
          k = d || null || {};if (0 === c.length && f) { M(b.a); }else {
        b.f += c.length;f && (b.j = f);var h,
            m = [];for (h = 0; h < c.length; h++) {
          var l = c[h],
              n = k[l.c],
              r = b.a,
              x = l;r.g && w(r.f, [r.a.c("wf", x.c, K(x).toString(), "loading")]);L(r, "fontloading", x);r = null;if (null === X) { if (window.FontFace) {
            var x = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),
                ya = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
            X = x ? 42 < parseInt(x[1], 10) : ya ? !1 : !0;
          } else { X = !1; } }X ? r = new Q(p(b.g, b), p(b.h, b), b.c, l, b.s, n) : r = new R(p(b.g, b), p(b.h, b), b.c, l, b.s, a, n);m.push(r);
        }for (h = 0; h < m.length; h++) { m[h].start(); }
      }
    }, 0);
  }function qa(a, b, c) {
    var d = [],
        e = c.timeout;ia(b);var d = ka(a.a, c, a.c),
        f = new W(a.c, b, e);a.h = d.length;b = 0;for (c = d.length; b < c; b++) { d[b].load(function (b, d, c) {
      ra(a, f, b, d, c);
    }); }
  };function sa(a, b) {
    this.c = a;this.a = b;
  }function ta(a, b, c) {
    var d = z(a.c);a = (a.a.api || "fast.fonts.net/jsapi").replace(/^.*http(s?):(\/\/)?/, "");return d + "//" + a + "/" + b + ".js" + (c ? "?v=" + c : "");
  }
  sa.prototype.load = function (a) {
    function b() {
      if (f["__mti_fntLst" + d]) {
        var c = f["__mti_fntLst" + d](),
            e = [],
            h;if (c) { for (var m = 0; m < c.length; m++) {
          var l = c[m].fontfamily;void 0 != c[m].fontStyle && void 0 != c[m].fontWeight ? (h = c[m].fontStyle + c[m].fontWeight, e.push(new H(l, h))) : e.push(new H(l));
        } }a(e);
      } else { setTimeout(function () {
        b();
      }, 50); }
    }var c = this,
        d = c.a.projectId,
        e = c.a.version;if (d) {
      var f = c.c.m;B(this.c, ta(c, d, e), function (e) {
        e ? a([]) : (f["__MonotypeConfiguration__" + d] = function () {
          return c.a;
        }, b());
      }).id = "__MonotypeAPIScript__" + d;
    } else { a([]); }
  };function ua(a, b) {
    this.c = a;this.a = b;
  }ua.prototype.load = function (a) {
    var this$1 = this;

    var b,
        c,
        d = this.a.urls || [],
        e = this.a.families || [],
        f = this.a.testStrings || {},
        g = new C();b = 0;for (c = d.length; b < c; b++) { A(this$1.c, d[b], D(g)); }var k = [];b = 0;for (c = e.length; b < c; b++) { if (d = e[b].split(":"), d[1]) { for (var h = d[1].split(","), m = 0; m < h.length; m += 1) { k.push(new H(d[0], h[m])); } }else { k.push(new H(d[0])); } }F(g, function () {
      a(k, f);
    });
  };function va(a, b, c) {
    a ? this.c = a : this.c = b + wa;this.a = [];this.f = [];this.g = c || "";
  }var wa = "//fonts.googleapis.com/css";function xa(a, b) {
    for (var c = b.length, d = 0; d < c; d++) {
      var e = b[d].split(":");3 == e.length && a.f.push(e.pop());var f = "";2 == e.length && "" != e[1] && (f = ":");a.a.push(e.join(f));
    }
  }
  function za(a) {
    if (0 == a.a.length) { throw Error("No fonts to load!"); }if (-1 != a.c.indexOf("kit=")) { return a.c; }for (var b = a.a.length, c = [], d = 0; d < b; d++) { c.push(a.a[d].replace(/ /g, "+")); }b = a.c + "?family=" + c.join("%7C");0 < a.f.length && (b += "&subset=" + a.f.join(","));0 < a.g.length && (b += "&text=" + encodeURIComponent(a.g));return b;
  };function Aa(a) {
    this.f = a;this.a = [];this.c = {};
  }
  var Ba = { latin: "BESbswy", "latin-ext": "\u00e7\u00f6\u00fc\u011f\u015f", cyrillic: "\u0439\u044f\u0416", greek: "\u03b1\u03b2\u03a3", khmer: "\u1780\u1781\u1782", Hanuman: "\u1780\u1781\u1782" },
      Ca = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" },
      Da = { i: "i", italic: "i", n: "n", normal: "n" },
      Ea = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
  function Fa(a) {
    for (var b = a.f.length, c = 0; c < b; c++) {
      var d = a.f[c].split(":"),
          e = d[0].replace(/\+/g, " "),
          f = ["n4"];if (2 <= d.length) {
        var g;var k = d[1];g = [];if (k) { for (var k = k.split(","), h = k.length, m = 0; m < h; m++) {
          var l;l = k[m];if (l.match(/^[\w-]+$/)) {
            var n = Ea.exec(l.toLowerCase());if (null == n) { l = ""; }else {
              l = n[2];l = null == l || "" == l ? "n" : Da[l];n = n[1];if (null == n || "" == n) { n = "4"; }else { var r = Ca[n],
                  n = r ? r : isNaN(n) ? "4" : n.substr(0, 1); }l = [l, n].join("");
            }
          } else { l = ""; }l && g.push(l);
        } }0 < g.length && (f = g);3 == d.length && (d = d[2], g = [], d = d ? d.split(",") : g, 0 < d.length && (d = Ba[d[0]]) && (a.c[e] = d));
      }a.c[e] || (d = Ba[e]) && (a.c[e] = d);for (d = 0; d < f.length; d += 1) { a.a.push(new H(e, f[d])); }
    }
  };function Ga(a, b) {
    this.c = a;this.a = b;
  }var Ha = { Arimo: !0, Cousine: !0, Tinos: !0 };Ga.prototype.load = function (a) {
    var b = new C(),
        c = this.c,
        d = new va(this.a.api, z(c), this.a.text),
        e = this.a.families;xa(d, e);var f = new Aa(e);Fa(f);A(c, za(d), D(b));F(b, function () {
      a(f.a, f.c, Ha);
    });
  };function Ia(a, b) {
    this.c = a;this.a = b;
  }Ia.prototype.load = function (a) {
    var b = this.a.id,
        c = this.c.m;b ? B(this.c, (this.a.api || "https://use.typekit.net") + "/" + b + ".js", function (b) {
      if (b) { a([]); }else if (c.Typekit && c.Typekit.config && c.Typekit.config.fn) {
        b = c.Typekit.config.fn;for (var e = [], f = 0; f < b.length; f += 2) { for (var g = b[f], k = b[f + 1], h = 0; h < k.length; h++) { e.push(new H(g, k[h])); } }try {
          c.Typekit.load({ events: !1, classes: !1, async: !0 });
        } catch (m) {}a(e);
      }
    }, 2E3) : a([]);
  };function Ja(a, b) {
    this.c = a;this.f = b;this.a = [];
  }Ja.prototype.load = function (a) {
    var b = this.f.id,
        c = this.c.m,
        d = this;b ? (c.__webfontfontdeckmodule__ || (c.__webfontfontdeckmodule__ = {}), c.__webfontfontdeckmodule__[b] = function (b, c) {
      for (var g = 0, k = c.fonts.length; g < k; ++g) {
        var h = c.fonts[g];d.a.push(new H(h.name, ga("font-weight:" + h.weight + ";font-style:" + h.style)));
      }a(d.a);
    }, B(this.c, z(this.c) + (this.f.api || "//f.fontdeck.com/s/css/js/") + ea(this.c) + "/" + b + ".js", function (b) {
      b && a([]);
    })) : a([]);
  };var Y = new pa(window);Y.a.c.custom = function (a, b) {
    return new ua(b, a);
  };Y.a.c.fontdeck = function (a, b) {
    return new Ja(b, a);
  };Y.a.c.monotype = function (a, b) {
    return new sa(b, a);
  };Y.a.c.typekit = function (a, b) {
    return new Ia(b, a);
  };Y.a.c.google = function (a, b) {
    return new Ga(b, a);
  };var Z = { load: p(Y.load, Y) };"function" === typeof define && define.amd ? define(function () {
    return Z;
  }) : "undefined" !== typeof module && module.exports ? module.exports = Z : (window.WebFont = Z, window.WebFontConfig && Y.load(window.WebFontConfig));
})();


},{}]},{},[1]);
var _r=_m(1);_g.olms=_r;return _r;})})(typeof window!=='undefined'?window:(typeof global!=='undefined'?global:(typeof self!=='undefined'?self:this)));