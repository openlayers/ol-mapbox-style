/*
ol-mapbox-style - Use Mapbox/MapLibre Style objects with OpenLayers
Copyright 2016-present ol-mapbox-style contributors
License: https://raw.githubusercontent.com/openlayers/ol-mapbox-style/master/LICENSE
*/

import {cameraObj} from './expressions.js';
import {getValue} from './stylefunction.js';

/**
 * Number of colors the ramp is sampled at, evenly spaced over
 * `raster-color-range`.
 */
const RAMP_SIZE = 1024;

/**
 * @typedef {Object} RasterColor
 * @property {Array<number>} mix Weights of the premultiplied red, green and
 * blue channels (0-1), and an offset.
 * @property {Array<number>} range Raster values at the start and the end of the ramp.
 * @property {Uint8ClampedArray} ramp Colors as unpremultiplied RGBA (0-255).
 */

/**
 * Creates a function that resolves `raster-color`, `raster-color-mix` and
 * `raster-color-range` for a zoom level.
 * @param {Object} glLayer The Mapbox/MapLibre Style layer object.
 * @param {Object} functionCache Cache for style functions.
 * @return {function(number): RasterColor|undefined} Resolves the colors for a
 * zoom level, or `undefined` when the layer has no `raster-color`.
 */
export function createRasterColor(glLayer, functionCache) {
  if (!glLayer.paint || glLayer.paint['raster-color'] === undefined) {
    return () => undefined;
  }
  /** The raster value is evaluated like a feature property. */
  const feature = {properties: {'raster-value': 0}};
  /**
   * @param {'raster-color'|'raster-color-mix'|'raster-color-range'} property Name.
   * @return {*} Value.
   */
  const get = (property) =>
    getValue(glLayer, 'paint', property, feature, functionCache);

  /** @type {RasterColor|undefined} */
  let previous;
  return (zoom) => {
    cameraObj.zoom = zoom;
    const currentMix = get('raster-color-mix');
    const currentRange = get('raster-color-range');
    if (
      previous &&
      previous.range[0] === currentRange[0] &&
      previous.range[1] === currentRange[1]
    ) {
      // The ramp only depends on the range.
      previous = {mix: currentMix, range: currentRange, ramp: previous.ramp};
      return previous;
    }
    const ramp = new Uint8ClampedArray(RAMP_SIZE * 4);
    const [min, max] = currentRange;
    for (let i = 0; i < RAMP_SIZE; ++i) {
      feature.properties['raster-value'] =
        min + ((max - min) * i) / (RAMP_SIZE - 1);
      const rgba = get('raster-color').rgb;
      ramp[i * 4] = rgba[0] * 255;
      ramp[i * 4 + 1] = rgba[1] * 255;
      ramp[i * 4 + 2] = rgba[2] * 255;
      ramp[i * 4 + 3] = rgba[3] * 255;
    }
    previous = {mix: currentMix, range: currentRange, ramp};
    return previous;
  };
}
