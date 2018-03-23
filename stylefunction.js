/*
ol-mapbox-style - Use Mapbox Style objects with OpenLayers
Copyright 2016-present Boundless Spatial, Inc.
License: https://raw.githubusercontent.com/boundlessgeo/ol-mapbox-gl-style/master/LICENSE
*/

import Style from 'ol/style/style';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';
import Icon from 'ol/style/icon';
import Text from 'ol/style/text';
import Circle from 'ol/style/circle';
import Point from 'ol/geom/point';
import derefLayers from '@mapbox/mapbox-gl-style-spec/deref';
import glfun from '@mapbox/mapbox-gl-style-spec/function';
import createFilter from '@mapbox/mapbox-gl-style-spec/feature_filter';
import mb2css from 'mapbox-to-css-font';
import {deg2rad, getZoomForResolution} from './util';

const functionTypes = {
  'line-miter-limit': 'interpolated',
  'fill-opacity': 'interpolated',
  'line-opacity': 'interpolated',
  'line-width': 'interpolated',
  'text-halo-width': 'interpolated',
  'text-max-width': 'interpolated',
  'text-offset': 'interpolated',
  'text-opacity': 'interpolated',
  'text-rotate': 'interpolated',
  'text-size': 'interpolated',
  'icon-opacity': 'interpolated',
  'icon-rotate': 'interpolated',
  'icon-size': 'interpolated',
  'icon-color': 'interpolated',
  'circle-radius': 'interpolated',
  'circle-opacity': 'interpolated',
  'circle-stroke-width': 'interpolated',
  'circle-color': 'interpolated',
  'circle-stroke-color': 'interpolated',
  'text-halo-color': 'interpolated',
  'text-color': 'interpolated',
  'line-color': 'interpolated',
  'fill-outline-color': 'interpolated',
  'fill-color': 'interpolated',
  'icon-image': 'piecewise-constant',
  'line-cap': 'piecewise-constant',
  'line-join': 'piecewise-constant',
  'line-dasharray': 'piecewise-constant',
  'symbol-placement': 'piecewise-constant',
  'text-anchor': 'piecewise-constant',
  'text-field': 'piecewise-constant',
  'text-font': 'piecewise-constant'
};

const defaults = {
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

const types = {
  'Point': 1,
  'MultiPoint': 1,
  'LineString': 2,
  'MultiLineString': 2,
  'Polygon': 3,
  'MultiPolygon': 3
};

const functionCache = {};
function getValue(layerId, layoutOrPaint, property, zoom, properties) {
  if (!functionCache[layerId]) {
    functionCache[layerId] = {};
  }
  const functions = functionCache[layerId];
  if (!functions[property]) {
    let value = layoutOrPaint[property];
    if (value === undefined) {
      value = defaults[property];
    }
    functions[property] = glfun(value, {
      function: functionTypes[property],
      type: property.indexOf('color') !== -1 ? 'color' :
        typeof value == 'object' && value.stops && typeof value.stops[0][0] == 'number' ? 'number' : undefined
    });
  }
  return functions[property](zoom, properties);
}

const fontMap = {};
function chooseFont(fonts, availableFonts) {
  if (fontMap[fonts]) {
    return fontMap[fonts];
  }
  if (availableFonts) {
    for (let i = 0, ii = fonts.length; i < ii; ++i) {
      const font = fonts[i];
      if (availableFonts.indexOf(font) != -1) {
        fontMap[fonts] = font;
        break;
      }
    }
    if (!fontMap[fonts]) {
      // fallback font
      fontMap[fonts] = fonts[fonts.length - 1];
    }
  } else {
    fontMap[fonts] = fonts[0];
  }
  return fontMap[fonts];
}

const filterCache = {};
function evaluateFilter(layerId, filter, feature) {
  if (!(layerId in filterCache)) {
    filterCache[layerId] = createFilter(filter);
  }
  return filterCache[layerId](feature);
}

const colorCache = {};
function colorWithOpacity(color, opacity) {
  if (color && opacity !== undefined) {
    let colorData = colorCache[color];
    if (!colorData) {
      colorCache[color] = colorData = {
        color: [
          color[0] * 255 / color[3],
          color[1] * 255 / color[3],
          color[2] * 255 / color[3],
          color[3]
        ],
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

const templateRegEx = /^([^]*)\{(.*)\}([^]*)$/;
function fromTemplate(text, properties) {
  let parts;
  do {
    parts = text.match(templateRegEx);
    if (parts) {
      const value = properties[parts[2]] || '';
      text = parts[1] + value + parts[3];
    }
  } while (parts);
  return text;
}

const emptyObj = {};

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
 * @param {Array<string>} [fonts=undefined] Array of available fonts, using the
 * same font names as the Mapbox Style object. If not provided, the style
 * function will always use the first font from the font array.
 * @return {ol.style.StyleFunction} Style function for use in
 * `ol.layer.Vector` or `ol.layer.VectorTile`.
 */
export default function(olLayer, glStyle, source, resolutions, spriteData, spriteImageUrl, fonts) {
  if (!resolutions) {
    resolutions = [];
    for (let res = 78271.51696402048; resolutions.length < 21; res /= 2) {
      resolutions.push(res);
    }
  }
  if (typeof glStyle == 'string') {
    glStyle = JSON.parse(glStyle);
  }
  if (glStyle.version != 8) {
    throw new Error('glStyle version 8 required.');
  }

  let spriteImage, spriteImgSize;
  if (spriteImageUrl) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
      spriteImage = img;
      spriteImgSize = [img.width, img.height];
      olLayer.changed();
    };
    img.src = spriteImageUrl;
  }

  const ctx = document.createElement('CANVAS').getContext('2d');
  const measureCache = {};
  function wrapText(text, font, em) {
    const key = em + ',' + font + ',' + text;
    let wrappedText = measureCache[key];
    if (!wrappedText) {
      ctx.font = font;
      const oneEm = ctx.measureText('M').width;
      const width = oneEm * em;
      const words = text.split(' ');
      let line = '';
      const lines = [];
      for (let i = 0, ii = words.length; i < ii; ++i) {
        const word = words[i];
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

  const allLayers = derefLayers(glStyle.layers);

  const layersBySourceLayer = {};
  const mapboxLayers = [];
  let mapboxSource;
  for (let i = 0, ii = allLayers.length; i < ii; ++i) {
    const layer = allLayers[i];
    if (typeof source == 'string' && layer.source == source ||
        source.indexOf(layer.id) !== -1) {
      const sourceLayer = layer['source-layer'];
      if (!mapboxSource) {
        mapboxSource = layer.source;
      }
      let layers = layersBySourceLayer[sourceLayer];
      if (!layers) {
        layers = layersBySourceLayer[sourceLayer] = [];
      }
      layers.push({
        layer: layer,
        index: i
      });
      mapboxLayers.push(layer.id);
    }
  }

  const textHalo = new Stroke();
  const textColor = new Fill();

  const iconImageCache = {};

  const styles = [];

  const styleFunction = function(feature, resolution) {
    const properties = feature.getProperties();
    const layers = layersBySourceLayer[properties.layer];
    if (!layers) {
      return;
    }
    let zoom = resolutions.indexOf(resolution);
    if (zoom == -1) {
      zoom = getZoomForResolution(resolution, resolutions);
    }
    const type = types[feature.getGeometry().getType()];
    const f = {
      properties: properties,
      type: type
    };
    let stylesLength = -1;
    for (let i = 0, ii = layers.length; i < ii; ++i) {
      const layerData = layers[i];
      const layer = layerData.layer;
      const layerId = layer.id;
      // TODO revisit when diffing gets added
      delete functionCache[layerId];
      delete filterCache[layerId];

      const layout = layer.layout || emptyObj;
      const paint = layer.paint || emptyObj;
      if (layout.visibility === 'none' || ('minzoom' in layer && zoom < layer.minzoom) ||
          ('maxzoom' in layer && zoom >= layer.maxzoom)) {
        continue;
      }
      const filter = layer.filter;
      if (!filter || evaluateFilter(layerId, filter, f)) {
        let color, opacity, fill, stroke, strokeColor, style;
        const index = layerData.index;
        if (type == 3) {
          if (!('fill-pattern' in paint) && 'fill-color' in paint) {
            opacity = getValue(layerId, paint, 'fill-opacity', zoom, properties);
            color = colorWithOpacity(getValue(layerId, paint, 'fill-color', zoom, properties), opacity);
            if (color) {
              ++stylesLength;
              style = styles[stylesLength];
              if (!style || !style.getFill() || style.getStroke() || style.getText()) {
                style = styles[stylesLength] = new Style({
                  fill: new Fill()
                });
              }
              fill = style.getFill();
              fill.setColor(color);
              style.setZIndex(index);
            }
            if ('fill-outline-color' in paint) {
              strokeColor = colorWithOpacity(getValue(layerId, paint, 'fill-outline-color', zoom, properties), opacity);
            }
            if (strokeColor) {
              ++stylesLength;
              style = styles[stylesLength];
              if (!style || !style.getStroke() || style.getFill() || style.getText()) {
                style = styles[stylesLength] = new Style({
                  stroke: new Stroke()
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
          color = !('line-pattern' in paint) && 'line-color' in paint ?
            colorWithOpacity(getValue(layerId, paint, 'line-color', zoom, properties), getValue(layerId, paint, 'line-opacity', zoom, properties)) :
            undefined;
          const width = getValue(layerId, paint, 'line-width', zoom, properties);
          if (color && width > 0) {
            ++stylesLength;
            style = styles[stylesLength];
            if (!style || !style.getStroke() || style.getFill() || style.getText()) {
              style = styles[stylesLength] = new Style({
                stroke: new Stroke()
              });
            }
            stroke = style.getStroke();
            stroke.setLineCap(getValue(layerId, layout, 'line-cap', zoom, properties));
            stroke.setLineJoin(getValue(layerId, layout, 'line-join', zoom, properties));
            stroke.setMiterLimit(getValue(layerId, layout, 'line-miter-limit', zoom, properties));
            stroke.setColor(color);
            stroke.setWidth(width);
            stroke.setLineDash(paint['line-dasharray'] ?
              getValue(layerId, paint, 'line-dasharray', zoom, properties).map(function(x) {
                return x * width;
              }) : null);
            style.setZIndex(index);
          }
        }

        let hasImage = false;
        let text = null;
        let icon, iconImg, skipLabel;
        if ((type == 1 || type == 2) && 'icon-image' in layout) {
          const iconImage = getValue(layerId, layout, 'icon-image', zoom, properties);
          if (iconImage) {
            icon = fromTemplate(iconImage, properties);
            let styleGeom = undefined;
            if (spriteImage && spriteData && spriteData[icon]) {
              if (type == 2) {
                const geom = feature.getGeometry();
                // ol package and ol-debug.js only
                if (geom.getFlatMidpoint) {
                  const extent = geom.getExtent();
                  const size = Math.sqrt(Math.max(
                    Math.pow((extent[2] - extent[0]) / resolution, 2),
                    Math.pow((extent[3] - extent[1]) / resolution, 2))
                  );
                  if (size > 150) {
                    //FIXME Do not hard-code a size of 150
                    styleGeom = new Point(geom.getFlatMidpoint());
                  }
                }
              }
              if (type !== 2 || styleGeom) {
                ++stylesLength;
                style = styles[stylesLength];
                if (!style || !style.getImage() || style.getFill() || style.getStroke()) {
                  style = styles[stylesLength] = new Style();
                }
                style.setGeometry(styleGeom);
                const iconSize = getValue(layerId, layout, 'icon-size', zoom, properties);
                const iconColor = paint['icon-color'] !== undefined ? getValue(layerId, paint, 'icon-color', zoom, properties) : null;
                let icon_cache_key = icon + '.' + iconSize;
                if (iconColor !== null) {
                  icon_cache_key += '.' + iconColor;
                }
                iconImg = iconImageCache[icon_cache_key];
                if (!iconImg) {
                  const spriteImageData = spriteData[icon];
                  if (iconColor !== null) {
                    // cut out the sprite and color it
                    color = colorWithOpacity(iconColor, 1);
                    const canvas = document.createElement('canvas');
                    canvas.width = spriteImageData.width;
                    canvas.height = spriteImageData.height;
                    const ctx = canvas.getContext('2d');
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
                    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    for (let c = 0, cc = data.data.length; c < cc; c += 4) {
                      data.data[c] = color[0];
                      data.data[c + 1] = color[1];
                      data.data[c + 2] = color[2];
                    }
                    ctx.putImageData(data, 0, 0);
                    iconImg = iconImageCache[icon_cache_key] = new Icon({
                      img: canvas,
                      imgSize: [canvas.width, canvas.height],
                      scale: iconSize / spriteImageData.pixelRatio
                    });
                  } else {
                    iconImg = iconImageCache[icon_cache_key] = new Icon({
                      img: spriteImage,
                      imgSize: spriteImgSize,
                      size: [spriteImageData.width, spriteImageData.height],
                      offset: [spriteImageData.x, spriteImageData.y],
                      scale: iconSize / spriteImageData.pixelRatio
                    });
                  }
                }
                iconImg.setRotation(deg2rad(getValue(layerId, layout, 'icon-rotate', zoom, properties)));
                iconImg.setOpacity(getValue(layerId, paint, 'icon-opacity', zoom, properties));
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
            style = styles[stylesLength] = new Style();
          }
          const circleRadius = getValue(layerId, paint, 'circle-radius', zoom, properties);
          const circleStrokeColor = getValue(layerId, paint, 'circle-stroke-color', zoom, properties);
          const circleColor = getValue(layerId, paint, 'circle-color', zoom, properties);
          const circleOpacity = getValue(layerId, paint, 'circle-opacity', zoom, properties);
          const circleStrokeWidth = getValue(layerId, paint, 'circle-stroke-width', zoom, properties);
          const cache_key = circleRadius + '.' + circleStrokeColor + '.' +
            circleColor + '.' + circleOpacity + '.' + circleStrokeWidth;
          iconImg = iconImageCache[cache_key];
          if (!iconImg) {
            iconImg = new Circle({
              radius: circleRadius,
              stroke: circleStrokeWidth === 0 ? undefined : new Stroke({
                width: circleStrokeWidth,
                color: colorWithOpacity(circleStrokeColor, circleOpacity)
              }),
              fill: new Fill({
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

        let label;
        if ('text-field' in layout) {
          const textField = getValue(layerId, layout, 'text-field', zoom, properties);
          label = fromTemplate(textField, properties);
        }
        if (label && !skipLabel) {
          if (!hasImage) {
            ++stylesLength;
            style = styles[stylesLength];
            if (!style || !style.getText() || style.getFill() || style.getStroke()) {
              style = styles[stylesLength] = new Style();
            }
            style.setImage(undefined);
            style.setGeometry(undefined);
          }
          if (!style.getText()) {
            style.setText(text || new Text());
          }
          text = style.getText();
          const textSize = getValue(layerId, layout, 'text-size', zoom, properties);
          const font = mb2css(chooseFont(getValue(layerId, layout, 'text-font', zoom, properties)), textSize);
          const textTransform = layout['text-transform'];
          if (textTransform == 'uppercase') {
            label = label.toUpperCase();
          } else if (textTransform == 'lowercase') {
            label = label.toLowerCase();
          }
          const wrappedLabel = type == 2 ? label : wrapText(label, font, getValue(layerId, layout, 'text-max-width', zoom, properties));
          text.setText(wrappedLabel);
          text.setFont(font);
          text.setRotation(deg2rad(getValue(layerId, layout, 'text-rotate', zoom, properties)));
          const textAnchor = getValue(layerId, layout, 'text-anchor', zoom, properties);
          const placement = (hasImage || type == 1) ? 'point' : getValue(layerId, layout, 'symbol-placement', zoom, properties);
          text.setPlacement(placement);
          if (placement == 'point') {
            let textAlign = 'center';
            if (textAnchor.indexOf('left') !== -1) {
              textAlign = 'left';
            } else if (textAnchor.indexOf('right') !== -1) {
              textAlign = 'right';
            }
            text.setTextAlign(textAlign);
          } else {
            text.setTextAlign();
          }
          let textBaseline = 'middle';
          if (textAnchor.indexOf('bottom') == 0) {
            textBaseline = 'bottom';
          } else if (textAnchor.indexOf('top') == 0) {
            textBaseline = 'top';
          }
          text.setTextBaseline(textBaseline);
          const textOffset = getValue(layerId, layout, 'text-offset', zoom, properties);
          text.setOffsetX(textOffset[0] * textSize);
          text.setOffsetY(textOffset[1] * textSize);
          opacity = getValue(layerId, paint, 'text-opacity', zoom, properties);
          textColor.setColor(colorWithOpacity(getValue(layerId, paint, 'text-color', zoom, properties), opacity));
          text.setFill(textColor);
          const haloColor = colorWithOpacity(getValue(layerId, paint, 'text-halo-color', zoom, properties), opacity);
          if (haloColor) {
            textHalo.setColor(haloColor);
            textHalo.setWidth(getValue(layerId, paint, 'text-halo-width', zoom, properties));
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
}
