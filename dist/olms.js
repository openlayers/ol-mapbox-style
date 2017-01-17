(function(_g){(function(f){var r=(typeof require==='function'?require:function(name){return {"_":null,"openlayers":ol}[name];});if (typeof exports==='object'&&typeof module!=='undefined'){module.exports=f(r)}else if(typeof define==='function'&&define.amd){define(["_","openlayers"],f.bind(_g,r))}else{f(r)}})(function(require,define,module,exports){var _m=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
ol-mapbox-style - Use Mapbox Style objects with OpenLayers
Copyright 2016 Boundless Spatial, Inc.
License: https://raw.githubusercontent.com/boundlessgeo/ol-mapbox-gl-style/master/LICENSE.md
*/

var ol = require('openlayers');
var glfun = require('mapbox-gl-style-spec/lib/function');
var mb2css = require('mapbox-to-css-font');
var FontFaceObserver = require('fontfaceobserver');

var functions = {
  interpolated: [
    'line-miter-limit',
    'fill-opacity',
    'line-opacity',
    'line-width',
    'text-halo-width',
    'text-max-width',
    'text-offset',
    'text-size',
    'icon-opacity',
    'icon-rotate',
    'icon-size',
    'circle-radius'
  ],
  'piecewise-constant': [
    'fill-color',
    'fill-outline-color',
    'icon-image',
    'line-cap',
    'line-color',
    'line-join',
    'line-dasharray',
    'text-anchor',
    'text-color',
    'text-field',
    'text-font',
    'text-halo-color',
    'circle-color',
    'circle-stroke-color'
  ]
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
  'circle-color' : '#000000',
  'circle-stroke-color' : '#000000'
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
      properties[property] = glfun[type](properties[property]);
    }
  }
}

var fontMap = {};

function chooseFont(fonts, onChange) {
  if (!Array.isArray(fonts)) {
    var stops = fonts.stops;
    if (stops) {
      for (var i = 0, ii = stops.length; i < ii; ++i) {
        chooseFont(stops[i][1], onChange);
      }
    }
    return;
  }
  var fontData = fontMap[fonts];
  if (!fontData) {
    fontData = fontMap[fonts] = {
      css: mb2css.parseFont(fonts[fonts.length - 1])
    };
  }
  var fontIndex = fontData.checking ? fonts.indexOf(fontData.checking) : 0;
  var css = fontData.css;
  if (!(fontData.checking || fontData.font)) {
    fontData.checking = fonts[fontIndex];
    css = mb2css.parseFont(fonts[fontIndex]);
    new FontFaceObserver(css[3], {
      weight: css[1],
      style: css[0]
    }).load().then(function() {
      fontData.css = css;
      fontData.font = fontData.checking;
      delete fontData.checking;
      onChange();
    }, function() {
      // Font is not available, try next
      ++fontIndex;
      if (fontIndex < fonts.length) {
        fontData.checking = fonts[fontIndex];
        chooseFont(fonts, onChange);
        onChange();
      }
    });
  }
}

function preprocess(layer, onChange) {
  if (!layer.paint) {
    layer.paint = {};
  }
  if (!layer.ref) {
    applyLayoutToPaint(layer);
  }
  applyDefaults(layer.paint);
  if (layer.paint['text-field']) {
    chooseFont(layer.paint['text-font'], onChange);
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
  var i, ii;
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
    var result = false;
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
  }
}

function getZoomForResolution(resolution, resolutions) {
  var candidate;
  var i = 0, ii = resolutions.length;
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

var spriteRegEx = /^(.*)(\?access_token=.*)$/;

function toSpriteUrl(url, extension) {
  var parts = url.match(spriteRegEx);
  return parts ?
      parts[1] + extension + (parts.length > 2 ? parts[2] : '') :
      url + extension;
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
 * the specified `source`, which needs to be a `"type": "vector"`
 * source.
 *
 * @param {string|Object} glStyle Mapbox Style object.
 * @param {string} source `source` key from the Mapbox Style object.
 * @param {Array<number>|undefined} [resolutions=[156543.03392804097,
 * 78271.51696402048, 39135.75848201024, 19567.87924100512, 9783.93962050256,
 * 4891.96981025128, 2445.98490512564, 1222.99245256282, 611.49622628141,
 * 305.748113140705, 152.8740565703525, 76.43702828517625, 38.21851414258813,
 * 19.109257071294063, 9.554628535647032, 4.777314267823516, 2.388657133911758,
 * 1.194328566955879, 0.5971642834779395, 0.29858214173896974,
 * 0.14929107086948487, 0.07464553543474244]]
 * Resolutions for mapping resolution to zoom level. For tile layers, this can
 * be `layer.getSource().getTileGrid().getResolutions()`.
 * @param {Function} [onChange=function() {}] Callback which will be called when
 * the style is ready to use for rendering, and every time a new resource (e.g.
 * icon sprite or font) is ready to be applied. When the `glStyle` has no
 * `sprite` and only standard fonts, the style will be ready to use immediately,
 * and the callback can be omitted.
 * @return {ol.style.StyleFunction} Style function for use in
 * `ol.layer.Vector` or `ol.layer.VectorTile`.
 */
function getStyleFunction(glStyle, source, resolutions, onChange) {
  if (!resolutions) {
    resolutions = [];
    for (var res = 156543.03392804097; resolutions.length < 22; res /= 2) {
      resolutions.push(res);
    }
  }
  onChange = onChange || function() {};
  if (typeof glStyle == 'object') {
    // We do not want to modify the original, so we deep-clone it
    glStyle = JSON.stringify(glStyle);
  }
  glStyle = JSON.parse(glStyle);
  if (glStyle.version != 8) {
    throw new Error('glStyle version 8 required.');
  }
  var spriteData;
  var spriteImage;
  var spriteImageSize;
  var spriteScale;
  if (glStyle.sprite) {
    spriteScale = ol.has.DEVICE_PIXEL_RATIO >= 1.5 ? 0.5 : 1;
    var xhr = new window.XMLHttpRequest();
    var sizeFactor = spriteScale == 0.5 ? '@2x' : '';
    var spriteUrl = toSpriteUrl(glStyle.sprite, sizeFactor + '.json');
    xhr.open('GET', spriteUrl);
    xhr.onload = xhr.onerror = function() {
      if (!xhr.responseText) {
        throw new Error('Sprites cannot be loaded from ' + spriteUrl);
      }
      spriteData = JSON.parse(xhr.responseText);
      onChange();
    };
    xhr.send();
    var spriteImageUrl = toSpriteUrl(glStyle.sprite, sizeFactor + '.png');
    spriteImage = document.createElement('IMG');
    spriteImage.onload = function() {
      spriteImageSize = [spriteImage.width, spriteImage.height];
      onChange();
    };
    spriteImage.src = spriteImageUrl;
  } else {
    window.setTimeout(onChange, 0);
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
        if ((ctx.measureText(line + word).width <= width)) {
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
    if (layer.source == source) {
      layers.push(layer);
      preprocess(layer, onChange);
    }
  }

  var textHalo = new ol.style.Stroke();
  var textColor = new ol.style.Fill();

  var iconImageCache = {};

  var styles = [];

  return function(feature, resolution) {
    var zoom = resolutions.indexOf(resolution);
    if (zoom == -1) {
      zoom = getZoomForResolution(resolution, resolutions);
    }
    var properties = feature.getProperties();
    properties['$type'] = feature.getGeometry().getType().replace('Multi', '');
    var stylesLength = -1;
    for (var i = 0, ii = layers.length; i < ii; ++i) {
      var layer = layers[i];
      if ((layer['source-layer'] && layer['source-layer'] != properties.layer) ||
          ('minzoom' in layer && zoom < layer.minzoom) ||
          ('maxzoom' in layer && zoom >= layer.maxzoom)) {
        continue;
      }
      if (!layer.filter || evaluate(layer.filter, properties)) {
        var color, opacity, fill, stroke, strokeColor, style, text;
        var paint = layer.paint;
        var type = properties['$type'];
        if (type == 'Polygon') {
          if (!('fill-pattern' in paint) && 'fill-color' in paint) {
            opacity = paint['fill-opacity'](zoom);
            color = colorWithOpacity(paint['fill-color'](zoom), opacity);
            if (color) {
              ++stylesLength;
              style = styles[stylesLength];
              if (!style || !style.getFill() || style.getStroke() || style.getText()) {
                style = styles[stylesLength] = new ol.style.Style({
                  fill: new ol.style.Fill()
                });
              }
              fill = style.getFill();
              fill.setColor(color);
              style.setZIndex(i);
            }
            if ('fill-outline-color' in paint) {
              strokeColor = colorWithOpacity(paint['fill-outline-color'](zoom), opacity);
            }
            if (strokeColor) {
              ++stylesLength;
              style = styles[stylesLength];
              if (!style || !style.getStroke() || style.getFill() || style.getText()) {
                style = styles[stylesLength] = new ol.style.Style({
                  stroke: new ol.style.Stroke()
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
            color = colorWithOpacity(
                paint['line-color'](zoom), paint['line-opacity'](zoom));
          }
          var width = paint['line-width'](zoom);
          if (color && width > 0) {
            ++stylesLength;
            style = styles[stylesLength];
            if (!style || !style.getStroke() || style.getFill() || style.getText()) {
              style = styles[stylesLength] = new ol.style.Style({
                stroke: new ol.style.Stroke()
              });
            }
            stroke = style.getStroke();
            stroke.setLineCap(paint['line-cap'](zoom));
            stroke.setLineJoin(paint['line-join'](zoom));
            stroke.setMiterLimit(paint['line-miter-limit'](zoom));
            stroke.setColor(color);
            stroke.setWidth(width);
            stroke.setLineDash(paint['line-dasharray'] ?
                paint['line-dasharray'](zoom).map(function(x) {
                  return x * width;
                }) : null);
            style.setZIndex(i);
          }
        }

        var icon;
        if (type == 'Point' && 'icon-image' in paint) {
          ++stylesLength;
          var iconImage = paint['icon-image'](zoom);
          icon = fromTemplate(iconImage, properties);
          style = iconImageCache[icon];
          if (!style && spriteData && spriteImageSize) {
            var spriteImageData = spriteData[icon];
            style = iconImageCache[icon] = new ol.style.Style({
              image: new ol.style.Icon({
                img: spriteImage,
                size: [spriteImageData.width, spriteImageData.height],
                imgSize: spriteImageSize,
                offset: [spriteImageData.x, spriteImageData.y],
                scale: paint['icon-size'](zoom) * spriteScale
              })
            });
          }
          if (style) {
            var iconImg = style.getImage();
            iconImg.setRotation(deg2rad(paint['icon-rotate'](zoom)));
            iconImg.setOpacity(paint['icon-opacity'](zoom));
            style.setZIndex(i);
            styles[stylesLength] = style;
          }
        }

        if (type == 'Point' && 'circle-radius' in paint) {
          ++stylesLength;
          var cache_key = paint['circle-radius'](zoom) + '.' +
            paint['circle-stroke-color'](zoom) + '.' +
            paint['circle-color'](zoom);
          style = iconImageCache[cache_key];
          if (!style) {
            style = new ol.style.Style({
              image: new ol.style.Circle({
                radius: paint['circle-radius'](zoom),
                stroke: new ol.style.Stroke({
                  color: colorWithOpacity(paint['circle-stroke-color'](zoom), opacity)
                }),
                fill: new ol.style.Fill({
                  color: colorWithOpacity(paint['circle-color'](zoom), opacity)
                })
              })
            });
          }
          style.setZIndex(i);
          styles[stylesLength] = style;
        }

        var label;
        if ('text-field' in paint) {
          var textField = paint['text-field'](zoom);
          label = fromTemplate(textField, properties);
        }
        // TODO Add LineString handling as soon as it's supporte in OpenLayers
        if (label && type !== 'LineString') {
          ++stylesLength;
          style = styles[stylesLength];
          if (!style || !style.getText() || style.getFill() || style.getStroke()) {
            style = styles[stylesLength] = new ol.style.Style({
              text: new ol.style.Text({
                text: '',
                fill: textColor
              })
            });
          }
          text = style.getText();
          var textSize = paint['text-size'](zoom);
          var font = mb2css.asCss(fontMap[paint['text-font'](zoom)].css, textSize);
          var textTransform = paint['text-transform'];
          if (textTransform == 'uppercase') {
            label = label.toUpperCase();
          } else if (textTransform == 'lowercase') {
            label = label.toLowerCase();
          }
          var wrappedLabel = wrapText(label, font, paint['text-max-width'](zoom));
          text.setText(wrappedLabel);
          text.setFont(font);
          var offset = paint['text-offset'](zoom);
          var yOffset = offset[1] * textSize + (wrappedLabel.split('\n').length - 1) * textSize;
          var anchor = paint['text-anchor'](zoom);
          if (anchor.indexOf('top') == 0) {
            yOffset += 0.5 * textSize;
          } else if (anchor.indexOf('bottom') == 0) {
            yOffset -= 0.5 * textSize;
          }
          text.setOffsetX(offset[0] * textSize);
          text.setOffsetY(yOffset);
          text.getFill().setColor(paint['text-color'](zoom));
          if (paint['text-halo-width']) {
            textHalo.setWidth(paint['text-halo-width'](zoom));
            textHalo.setColor(paint['text-halo-color'](zoom));
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
}

/**
 * Applies a style function to an `ol.layer.VectorTile` with an
 * `ol.source.VectorTile`. The style function will render all layers from the
 * `glStyle` object that use the specified `source`, which needs to be a
 * `"type": "vector"` source.
 *
 * @param {ol.layer.VectorTile} layer OpenLayers layer.
 * @param {string|Object} glStyle Mapbox Style object.
 * @param {string} source `source` key from the Mapbox Style object.
 * @return {Promise} Promise which will be resolved when the style can be used
 * for rendering.
 */
function applyStyle(layer, glStyle, source) {
  return new Promise(function(resolve, reject) {
    var resolutions = layer.getSource().getTileGrid().getResolutions();
    var style;
    var resolved = false;
    function onChange() {
      layer.setStyle(style);
      if (!resolved) {
        resolve();
        resolved = true;
      }
    }
    try {
      style = getStyleFunction(glStyle, source, resolutions, onChange);
    } catch (e) {
      window.setTimeout(function() {
        reject(e);
      }, 0);
    }
  });
}

/**
 * Applies properties of the Mapbox Style's `background` layer to the map.
 * @param {ol.Map} map OpenLayers Map. Must have a `target` configured.
 * @param {Object} glStyle Mapbox Style object.
 */
function applyBackground(map, glStyle) {

  var layer;

  function updateStyle() {
    var layout = layer.layout || {};
    var paint = layer.paint || {};
    var element = map.getTargetElement();
    var zoom = map.getView().getZoom();
    if ('background-color' in paint) {
      element.style.backgroundColor =
          glfun['piecewise-constant'](paint['background-color'])(zoom);
    }
    if ('background-opacity' in paint) {
      element.style.backgroundOpacity =
          glfun.interpolated(paint['background-opacity'])(zoom);
    }
    if (layout.visibility == 'none') {
      element.style.backgroundColor = '';
      element.style.backgroundOpacity = '';
    }
  }

  glStyle.layers.some(function(l) {
    if (l.type == 'background') {
      layer = l;
      updateStyle();
      map.on('change:resolution', updateStyle);
      return true;
    }
  });
}

module.exports = {
  applyBackground: applyBackground,
  applyStyle: applyStyle,
  getStyleFunction: getStyleFunction
};

},{"fontfaceobserver":2,"mapbox-gl-style-spec/lib/function":4,"mapbox-to-css-font":5,"openlayers":"openlayers"}],2:[function(require,module,exports){
(function(){function m(a,b){document.addEventListener?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function n(a){document.body?a():document.addEventListener?document.addEventListener("DOMContentLoaded",function c(){document.removeEventListener("DOMContentLoaded",c);a()}):document.attachEvent("onreadystatechange",function l(){if("interactive"==document.readyState||"complete"==document.readyState)document.detachEvent("onreadystatechange",l),a()})};function t(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c)}
function x(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;left:-999px;white-space:nowrap;font:"+b+";"}function y(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function z(a,b){function c(){var a=l;y(a)&&a.a.parentNode&&b(a.g)}var l=a;m(a.b,c);m(a.c,c);y(a)};function A(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"normal"}var B=null,C=null,E=null,F=null;function I(){if(null===E){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}E=""!==a.style.font}return E}function J(a,b){return[a.style,a.weight,I()?a.stretch:"","100px",b].join(" ")}
A.prototype.load=function(a,b){var c=this,l=a||"BESbswy",r=0,D=b||3E3,G=(new Date).getTime();return new Promise(function(a,b){var e;null===F&&(F=!!document.fonts);if(e=F)null===C&&(C=/OS X.*Version\/10\..*Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor)),e=!C;if(e){e=new Promise(function(a,b){function f(){(new Date).getTime()-G>=D?b():document.fonts.load(J(c,'"'+c.family+'"'),l).then(function(c){1<=c.length?a():setTimeout(f,25)},function(){b()})}f()});var K=new Promise(function(a,
c){r=setTimeout(c,D)});Promise.race([K,e]).then(function(){clearTimeout(r);a(c)},function(){b(c)})}else n(function(){function e(){var b;if(b=-1!=g&&-1!=h||-1!=g&&-1!=k||-1!=h&&-1!=k)(b=g!=h&&g!=k&&h!=k)||(null===B&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),B=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=B&&(g==u&&h==u&&k==u||g==v&&h==v&&k==v||g==w&&h==w&&k==w)),b=!b;b&&(d.parentNode&&d.parentNode.removeChild(d),clearTimeout(r),a(c))}
function H(){if((new Date).getTime()-G>=D)d.parentNode&&d.parentNode.removeChild(d),b(c);else{var a=document.hidden;if(!0===a||void 0===a)g=f.a.offsetWidth,h=p.a.offsetWidth,k=q.a.offsetWidth,e();r=setTimeout(H,50)}}var f=new t(l),p=new t(l),q=new t(l),g=-1,h=-1,k=-1,u=-1,v=-1,w=-1,d=document.createElement("div");d.dir="ltr";x(f,J(c,"sans-serif"));x(p,J(c,"serif"));x(q,J(c,"monospace"));d.appendChild(f.a);d.appendChild(p.a);d.appendChild(q.a);document.body.appendChild(d);u=f.a.offsetWidth;v=p.a.offsetWidth;
w=q.a.offsetWidth;H();z(f,function(a){g=a;e()});x(f,J(c,'"'+c.family+'",sans-serif'));z(p,function(a){h=a;e()});x(p,J(c,'"'+c.family+'",serif'));z(q,function(a){k=a;e()});x(q,J(c,'"'+c.family+'",monospace'))})})};"undefined"!==typeof module?module.exports=A:(window.FontFaceObserver=A,window.FontFaceObserver.prototype.load=A.prototype.load);}());

},{}],3:[function(require,module,exports){
'use strict';

// Constants
var Xn = 0.950470, // D65 standard referent
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

    return [
        116 * y - 16,
        500 * (x - y),
        200 * (y - z),
        rgbColor[3]
    ];
}

function labToRgb(labColor) {
    var y = (labColor[0] + 16) / 116,
        x = isNaN(labColor[1]) ? y : y + labColor[1] / 500,
        z = isNaN(labColor[2]) ? y : y - labColor[2] / 200;
    y = Yn * lab2xyz(y);
    x = Xn * lab2xyz(x);
    z = Zn * lab2xyz(z);
    return [
        xyz2rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z), // D65 -> sRGB
        xyz2rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z),
        xyz2rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z),
        labColor[3]
    ];
}

// HCL
function rgbToHcl(rgbColor) {
  var labColor = rgbToLab(rgbColor);
  var l = labColor[0],
    a = labColor[1],
    b = labColor[2];
  var h = Math.atan2(b, a) * rad2deg;
  return [
      h < 0 ? h + 360 : h,
      Math.sqrt(a * a + b * b),
      l,
      rgbColor[3]
  ];
}

function hclToRgb(hclColor) {
  var h = hclColor[0] * deg2rad,
    c = hclColor[1],
    l = hclColor[2];
  return labToRgb([
      l,
      Math.cos(h) * c,
      Math.sin(h) * c,
      hclColor[3]
  ]);
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

var colorSpaces = require('./color_spaces');

function identityFunction(x) {
    return x;
}

function createFunction(parameters, defaultType) {
    var fun;

    if (!isFunctionDefinition(parameters)) {
        fun = function() {
            return parameters;
        };
        fun.isFeatureConstant = true;
        fun.isZoomConstant = true;

    } else {
        var zoomAndFeatureDependent = parameters.stops && typeof parameters.stops[0][0] === 'object';
        var featureDependent = zoomAndFeatureDependent || parameters.property !== undefined;
        var zoomDependent = zoomAndFeatureDependent || !featureDependent;
        var inputType = parameters.stops && typeof (zoomAndFeatureDependent ? parameters.stops[0][0].property : parameters.stops[0][0]);
        var type = parameters.type || defaultType || (inputType === 'string' ? 'categorical' : 'exponential');

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
            throw new Error('Unknown function type "' + type + '"');
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
                    parameters.stops[s] = [
                        parameters.stops[s][0],
                        colorspace.forward(parameters.stops[s][1])
                    ];
                }
                outputFunction = colorspace.reverse;
            } else {
                throw new Error('Unknown color space: ' + parameters.colorSpace);
            }
        } else {
            outputFunction = identityFunction;
        }


        // For categorical functions, generate an Object as a hashmap of the stops for fast searching
        if (innerFun === evaluateCategoricalFunction) {
          var hashedStops = Object.create(null);
          for (var i = 0; i < parameters.stops.length; i++) {
            hashedStops[parameters.stops[i][0]] = parameters.stops[i][1];
          }
        }

        if (zoomAndFeatureDependent) {
            var featureFunctions = {};
            var featureFunctionStops = [];
            for (s = 0; s < parameters.stops.length; s++) {
                var stop = parameters.stops[s];
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
            fun = function(zoom, feature) {
                return outputFunction(evaluateExponentialFunction({
                  stops: featureFunctionStops,
                  base: parameters.base
                }, zoom)(zoom, feature));
            };
            fun.isFeatureConstant = false;
            fun.isZoomConstant = false;

        } else if (zoomDependent) {
            fun = function(zoom) {
                if (innerFun === evaluateCategoricalFunction) {
                  return outputFunction(innerFun(parameters, zoom, hashedStops));
                }
                else return outputFunction(innerFun(parameters, zoom));
            };
            fun.isFeatureConstant = true;
            fun.isZoomConstant = false;
        } else {
            fun = function(zoom, feature) {
                if (innerFun === evaluateCategoricalFunction) {
                  return outputFunction(innerFun(parameters, feature[parameters.property], hashedStops));
                }
                else return outputFunction(
                  innerFun(parameters, feature[parameters.property]));
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
    if (n === 1) return parameters.stops[0][1];
    if (input === undefined || input === null) return parameters.stops[n - 1][1];
    if (input <= parameters.stops[0][0]) return parameters.stops[0][1];
    if (input >= parameters.stops[n - 1][0]) return parameters.stops[n - 1][1];

    var index = binarySearchForIndex(parameters.stops, input);

    return parameters.stops[index][1];
}

function evaluateExponentialFunction(parameters, input) {
    var base = parameters.base !== undefined ? parameters.base : 1;

    // Edge cases
    var n = parameters.stops.length;
    if (n === 1) return parameters.stops[0][1];
    if (input === undefined || input === null) return parameters.stops[n - 1][1];
    if (input <= parameters.stops[0][0]) return parameters.stops[0][1];
    if (input >= parameters.stops[n - 1][0]) return parameters.stops[n - 1][1];

    var index = binarySearchForIndex(parameters.stops, input);

    return interpolate(
            input,
            base,
            parameters.stops[index][0],
            parameters.stops[index + 1][0],
            parameters.stops[index][1],
            parameters.stops[index + 1][1]
    );
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
    if (input >= currentValue && input < upperValue) { // Search complete
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
        return function() {
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

    return (outputLower * (1 - ratio)) + (outputUpper * ratio);
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

module.exports.interpolated = function(parameters) {
    return createFunction(parameters, 'exponential');
};

module.exports['piecewise-constant'] = function(parameters) {
    return createFunction(parameters, 'interval');
};

},{"./color_spaces":3}],5:[function(require,module,exports){
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

var fontMap = {};

function asCss(cssData, size) {
  cssData[2] = size + 'px';
  return cssData.join(' ');
}

function parseFont(font) {
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
  return [style, weight, 16, fontFamily];
}

module.exports = {
  parseFont: parseFont,
  asCss: asCss
}

},{}]},{},[1]);
var _r=_m(1);_g.olms=_r;return _r;})})(typeof window!=='undefined'?window:(typeof global!=='undefined'?global:(typeof self!=='undefined'?self:this)));