/*
ol-mapbox-style - Use Mapbox Style objects with OpenLayers
Copyright 2016-present Boundless Spatial, Inc.
License: https://raw.githubusercontent.com/boundlessgeo/ol-mapbox-gl-style/master/LICENSE.md
*/

import glfun from 'mapbox-gl-style-spec/lib/function';
import mb2css from 'mapbox-to-css-font';
import getStyleFunction from 'mapbox-to-ol-style';
import {defaults} from 'mapbox-to-ol-style';
import WebFont from 'webfontloader';

var availableFonts = [];

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
        if (availableFonts.indexOf(font) == -1) {
          availableFonts.push(families[index]);
          onChange();
        }
      }
    },
    inactive: function() {
      availableFonts = undefined;
      onChange();
    },
    timeout: 1500
  });
}

function preprocess(layer, onChange) {
  if ('layout' in layer && 'text-field' in layer.layout) {
    loadFont(layer.layout['text-font'] || defaults['text-font'], onChange);
  }
}

var spriteRegEx = /^(.*)(\?access_token=.*)$/;

function toSpriteUrl(url, extension) {
  var parts = url.match(spriteRegEx);
  return parts ?
      parts[1] + extension + (parts.length > 2 ? parts[2] : '') :
      url + extension;
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
export function applyStyle(layer, glStyle, source) {
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
      var spriteUrl = toSpriteUrl(glStyle.sprite, sizeFactor + '.json');
      xhr.open('GET', spriteUrl);
      xhr.onload = xhr.onerror = function() {
        if (!xhr.responseText) {
          reject(new Error('Sprites cannot be loaded from ' + spriteUrl));
        }
        spriteData = JSON.parse(xhr.responseText);
        onChange();
      };
      xhr.send();
      spriteImageUrl = toSpriteUrl(glStyle.sprite, sizeFactor + '.png');
      var spriteImage = document.createElement('IMG');
      spriteImage.onload = function() {
        onChange();
      };
      spriteImage.src = spriteImageUrl;
    }

    var resolutions = layer.getSource().getTileGrid().getResolutions();
    var style;
    function onChange() {
      if (!style && (!glStyle.sprite || spriteData) && (!availableFonts || availableFonts.length > 0)) {
        style = getStyleFunction(glStyle, source, resolutions, spriteData, spriteImageUrl, availableFonts);
        layer.setStyle(style);
        resolve();
      } else if (style) {
        layer.setStyle(style);
      }
    }
    try {
      var layers = glStyle.layers;
      for (var i = 0, ii = layers.length; i < ii; ++i) {
        if (layers[i].source == source) {
          preprocess(layers[i], onChange);
        }
      }
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
export function applyBackground(map, glStyle) {

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
