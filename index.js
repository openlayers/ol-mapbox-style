/*
ol-mapbox-gl-style - Use Mapbox GL style objects with OpenLayers
Copyright 2016 Boundless Spatial, Inc.
License: https://raw.githubusercontent.com/boundlessgeo/ol-mapbox-gl-style/master/LICENSE.md
*/

var ol = require('openlayers');
var glfun = require('mapbox-gl-function');
var colorToArray = require('color-string').get.rgb;

var functions = {
  interpolated: [
    'line-miter-limit',
    'fill-opacity',
    'line-opacity',
    'line-width'
  ],
  'piecewise-constant': [
    'fill-color',
    'fill-outline-color',
    'line-color'
  ]
};

var defaults = {
  'line-cap': 'butt',
  'line-join': 'miter',
  'line-miter-limit' : 2,
  'line-width': 1
};

function applyDefaults(properties) {
  for (var property in defaults) {
    if (!(property in properties)) {
      properties[property] = defaults[property];
    }
  }
}

function convertToFunctions(properties, type) {
  for (var i = 0, ii = functions[type].length; i < ii; ++i) {
    var property = functions[type][i];
    properties[property] = glfun[type](properties[property]);
  }
}

function preprocess(layer) {
  if (!layer.paint) {
    layer.paint = {};
  }
  applyDefaults(layer.paint);
  convertToFunctions(layer.paint, 'interpolated');
  convertToFunctions(layer.paint, 'piecewise-constant');
  if (!layer.ref) {
    applyDefaults(layer.layout);
    convertToFunctions(layer.layout, 'interpolated');
    convertToFunctions(layer.layout, 'piecewise-constant');
  }
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
    if (candidate < resolutions && i + 1 < ii) {
      var zoomFactor = resolutions[i] / resolutions[i + 1];
      return Math.log(resolutions[i] / resolution) / Math.log(zoomFactor);
    }
  }
  return resolutions[ii - 1];
}

function colorWithOpacity(color, opacity) {
  if (color && opacity !== undefined) {
    color = colorToArray(color);
    color[3] *= opacity;
    if (color[3] === 0) {
      color = undefined;
    }
  }
  return color;
}

/**
 * Creates a style function from the `glStyle` object for all layers that use
 * the specified `source`, which needs to be a `"type": "vector"`
 * source.
 *
 * @param {string|Object} glStyle Mapbox GL style object.
 * @param {string} source `source` key from the Mapbox GL style object.
 * @param {Array<number>} resolutions Resolutions for mapping resolution to
 * zoom level. For tile layers, this can be
 * `layer.getSource().getTileGrid().getResolutions()`.
 * @return {ol.style.StyleFunction} Style function for use in
 * `ol.layer.Vector` or `ol.layer.VectorTile`.
 */
function getStyleFunction(glStyle, source, resolutions) {
  if (typeof glStyle == 'object') {
    // We do not want to modify the original, so we deep-clone it
    glStyle = JSON.stringify(glStyle);
  }
  glStyle = JSON.parse(glStyle);
  if (glStyle.version != 8) {
    throw new Error('glStyle version 8 required.');
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
      preprocess(layer);
    }
  }

  var styles = [];

  return function(feature, resolution) {
    var zoom = resolutions.indexOf(resolution);
    if (zoom == -1) {
      zoom = getZoomForResolution(resolution, resolutions);
    }
    var properties = feature.getProperties();
    properties['$type'] = feature.getGeometry().getType().replace('Multi', '');
    var stylesLength = -1;
    var color, opacity, fill, layer, stroke, strokeColor, style;
    for (var i = 0, ii = layers.length; i < ii; ++i) {
      layer = layers[i];
      if ((layer['source-layer'] && layer['source-layer'] != properties.layer) ||
          ('minzoom' in layer && zoom < layer.minzoom) ||
          ('maxzoom' in layer && zoom > layer.maxzoom)) {
        continue;
      }
      if (!layer.filter || evaluate(layer.filter, properties)) {
        var layout = layer.layout;
        var paint = layer.paint;
        if (properties['$type'] == 'Polygon') {
          opacity = paint['fill-opacity'](zoom);
          color = colorWithOpacity(paint['fill-color'](zoom), opacity);
          strokeColor = colorWithOpacity(paint['fill-outline-color'](zoom), opacity);
          if (color) {
            ++stylesLength;
            style = styles[stylesLength];
            if (!style || !style.getFill()) {
              style = styles[stylesLength] = new ol.style.Style({
                fill: new ol.style.Fill()
              });
            }
            fill = style.getFill();
            fill.setColor(color);
            style.setZIndex(i);
          }
          if (strokeColor) {
            ++stylesLength;
            style = styles[stylesLength];
            if (!style || !style.getFill()) {
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
        if (properties['$type'] == 'LineString') {
          color = colorWithOpacity(
              paint['line-color'](zoom), paint['line-opacity'](zoom));
          var width = paint['line-width'](zoom);
          if (color && width > 0) {
            ++stylesLength;
            style = styles[stylesLength];
            if (!style || !style.getStroke()) {
              style = styles[stylesLength] = new ol.style.Style({
                stroke: new ol.style.Stroke()
              });
            }
            stroke = style.getStroke();
            stroke.setLineCap(layout['line-cap']);
            stroke.setLineJoin(layout['line-join']);
            stroke.setMiterLimit(layout['line-miter-limit'](zoom));
            stroke.setColor(color);
            stroke.setWidth(width);
            stroke.setLineDash(paint['line-dasharray'] ?
                paint['line-dasharray'].map(function(x) {
                  return x * width * ol.has.DEVICE_PIXEL_RATIO;
                }) : null);
            style.setZIndex(i);
          }
        }
      }
    }
    if (stylesLength > -1) {
      styles.length = stylesLength + 1;
      return styles;
    }
  };
}

module.exports = {
  getStyleFunction: getStyleFunction
};
