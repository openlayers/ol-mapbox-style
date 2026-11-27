/*
ol-mapbox-style - Use Mapbox/MapLibre Style objects with OpenLayers
Copyright 2016-present ol-mapbox-style contributors
License: https://raw.githubusercontent.com/openlayers/ol-mapbox-style/master/LICENSE
*/

/**
 * Style properties that the MapLibre style reference does not have, like ones
 * only Mapbox supports, in the same form, merged into `./stylespec.js`.
 *
 * `raster-color` uses `["raster-value"]`, which is evaluated as
 * `["get", "raster-value"]` (see `rasterValueToGet()` in `./expressions.js`),
 * so it is data driven here, with the raster value as feature property.
 */
export default {
  paint_raster: {
    'raster-color': {
      type: 'color',
      'property-type': 'data-driven',
      expression: {interpolated: true, parameters: ['feature']},
      transition: false,
      default: 'rgba(0, 0, 0, 0)',
    },
    'raster-color-mix': {
      type: 'array',
      value: 'number',
      length: 4,
      'property-type': 'data-constant',
      expression: {interpolated: true, parameters: ['zoom']},
      transition: true,
      default: [0.2126, 0.7152, 0.0722, 0],
    },
    'raster-color-range': {
      type: 'array',
      value: 'number',
      length: 2,
      'property-type': 'data-constant',
      expression: {interpolated: true, parameters: ['zoom']},
      transition: true,
      default: [0, 1],
    },
  },
};
