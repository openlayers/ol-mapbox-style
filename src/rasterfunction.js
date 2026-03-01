/*
ol-mapbox-style - Use Mapbox/MapLibre Style objects with OpenLayers
Copyright 2016-present ol-mapbox-style contributors
License: https://raw.githubusercontent.com/openlayers/ol-mapbox-style/master/LICENSE
*/

import {Color} from '@maplibre/maplibre-gl-style-spec';
import {getCenter} from 'ol/extent.js';
import ImageLayer from 'ol/layer/Image.js';
import {getPointResolution} from 'ol/proj.js';
import Raster from 'ol/source/Raster.js';
import {cameraObj} from './expressions.js';
import {hillshade, raster as rasterShader} from './shaders.js';
import {getValue} from './stylefunction.js';
import {defaultResolutions, emptyObj, getZoomForResolution} from './util.js';

const defaultShadowColor = Color.parse('#000000');
const defaultHighlightColor = Color.parse('#FFFFFF');
const defaultAccentColor = Color.parse('#000000');

/**
 * Creates a raster operations layer from a base tile layer.
 * Applies hue rotation, saturation, contrast, and brightness adjustments.
 * @param {import("ol/layer/Tile.js").default} tileLayer Base raster tile layer.
 * @return {ImageLayer<Raster>} The raster operations layer.
 */
export function createRasterOpLayer(tileLayer) {
  return new ImageLayer({
    source: new Raster({
      operationType: 'image',
      operation: rasterShader,
      sources: [tileLayer],
    }),
  });
}

/**
 * Creates a hillshade layer from a base tile layer.
 * @param {import("ol/layer/Tile.js").default} tileLayer Base raster tile layer.
 * @return {ImageLayer<Raster>} The hillshade layer.
 */
export function createHillshadeLayer(tileLayer) {
  return new ImageLayer({
    source: new Raster({
      operationType: 'image',
      operation: hillshade,
      sources: [tileLayer],
    }),
  });
}

/**
 * Attaches the `beforeoperations` event handler to a raster operations layer.
 * Reads raster paint properties from the style and passes them to the shader.
 * @param {ImageLayer<Raster>} layer The raster operations layer.
 * @param {Object} glLayer The Mapbox/MapLibre Style layer object.
 * @param {Object} options Options including `resolutions`.
 * @param {Object} functionCache Cache for style functions.
 */
export function configureRasterOpLayer(layer, glLayer, options, functionCache) {
  layer.getSource().on('beforeoperations', function (event) {
    cameraObj.zoom = getZoomForResolution(
      event.resolution,
      options.resolutions || defaultResolutions,
    );
    cameraObj.distanceFromCenter = 0;

    const data = event.data;
    data.saturation = getValue(
      glLayer,
      'paint',
      'raster-saturation',
      emptyObj,
      functionCache,
    );
    data.contrast = getValue(
      glLayer,
      'paint',
      'raster-contrast',
      emptyObj,
      functionCache,
    );
    data.brightnessHigh = getValue(
      glLayer,
      'paint',
      'raster-brightness-max',
      emptyObj,
      functionCache,
    );
    data.brightnessLow = getValue(
      glLayer,
      'paint',
      'raster-brightness-min',
      emptyObj,
      functionCache,
    );
    data.hueRotate = getValue(
      glLayer,
      'paint',
      'raster-hue-rotate',
      emptyObj,
      functionCache,
    );
  });
}

/**
 * Attaches the `beforeoperations` event handler to a hillshade layer.
 * Reads hillshade paint properties from the style and passes them to the shader.
 * @param {ImageLayer<Raster>} layer The hillshade layer.
 * @param {Object} glSource The Mapbox/MapLibre Style source object.
 * @param {Object} glLayer The Mapbox/MapLibre Style layer object.
 * @param {Object} options Options including `projection` and `resolutions`.
 * @param {Object} functionCache Cache for style functions.
 */
export function configureHillshadeLayer(
  layer,
  glSource,
  glLayer,
  options,
  functionCache,
) {
  layer.getSource().on('beforeoperations', function (event) {
    const data = event.data;
    data.resolution = getPointResolution(
      options.projection || 'EPSG:3857',
      event.resolution,
      getCenter(event.extent),
      'm',
    );
    const zoom = getZoomForResolution(
      event.resolution,
      options.resolutions || defaultResolutions,
    );
    cameraObj.zoom = zoom;
    cameraObj.distanceFromCenter = 0;
    data.zoom = zoom;
    data.encoding = glSource.encoding;

    // Hillshade method (standard, basic, combined, igor, multidirectional)
    data.method =
      getValue(glLayer, 'paint', 'hillshade-method', emptyObj, functionCache) ||
      'standard';

    data.exaggeration = getValue(
      glLayer,
      'paint',
      'hillshade-exaggeration',
      emptyObj,
      functionCache,
    );

    // Illumination directions - normalize to array (for multidirectional)
    let dirValue = getValue(
      glLayer,
      'paint',
      'hillshade-illumination-direction',
      emptyObj,
      functionCache,
    );
    if (dirValue === null || dirValue === undefined) {
      dirValue = 335;
    }
    data.azimuths = Array.isArray(dirValue) ? dirValue : [dirValue];
    data.sunAz = data.azimuths[0];

    // Illumination altitudes - normalize to array (for basic, combined, multidirectional)
    let altValue = getValue(
      glLayer,
      'paint',
      'hillshade-illumination-altitude',
      emptyObj,
      functionCache,
    );
    if (altValue === null || altValue === undefined) {
      altValue = 45;
    }
    data.altitudes = Array.isArray(altValue) ? altValue : [altValue];

    // Helper to unwrap Color values from expression wrappers
    function unwrapColor(val) {
      if (val && val.values) {
        return val.values[0];
      }
      return val;
    }

    // Helper to parse color array properties.
    // colorArray values may be a single color string, a Color object,
    // or an array of color strings (for multidirectional).
    // Must distinguish ["#ff0000", "#00ff00"] from ["interpolate", ...].
    function getColorArray(property) {
      const raw = glLayer.paint?.[property];
      if (
        Array.isArray(raw) &&
        raw.length > 0 &&
        typeof raw[0] === 'string' &&
        Color.parse(raw[0]) !== undefined
      ) {
        // Array of color strings - parse each individually
        return raw.map((c) => Color.parse(c));
      }
      // Single value or expression - use getValue
      let val = getValue(glLayer, 'paint', property, emptyObj, functionCache);
      val = unwrapColor(val);
      return val ? [val] : undefined;
    }

    data.highlightColors = getColorArray('hillshade-highlight-color');
    data.highlightColor = data.highlightColors?.[0] || defaultHighlightColor;
    if (!data.highlightColors) {
      data.highlightColors = [data.highlightColor];
    }

    data.shadowColors = getColorArray('hillshade-shadow-color');
    data.shadowColor = data.shadowColors?.[0] || defaultShadowColor;
    if (!data.shadowColors) {
      data.shadowColors = [data.shadowColor];
    }

    data.accentColor =
      unwrapColor(
        getValue(
          glLayer,
          'paint',
          'hillshade-accent-color',
          emptyObj,
          functionCache,
        ),
      ) || defaultAccentColor;
  });
}

/**
 * Keys that indicate a raster layer requires shader operations.
 * @type {Array<string>}
 */
export const rasterOperationKeys = [
  'raster-saturation',
  'raster-contrast',
  'raster-brightness-max',
  'raster-brightness-min',
  'raster-hue-rotate',
];

/**
 * Returns a prerender listener for raster layers that updates opacity.
 * @param {Object} glLayer The Mapbox/MapLibre Style layer object.
 * @param {import("ol/layer/Base.js").default} layer The OpenLayers layer.
 * @param {Object} functionCache Cache for style functions.
 * @return {function(import("ol/render/Event.js").default): void} Prerender listener.
 */
export function prerenderRasterLayer(glLayer, layer, functionCache) {
  let zoom = null;
  return function (event) {
    if (
      glLayer.paint &&
      'raster-opacity' in glLayer.paint &&
      event.frameState.viewState.zoom !== zoom
    ) {
      zoom = event.frameState.viewState.zoom;
      delete functionCache[glLayer.id];
      updateRasterLayerProperties(glLayer, layer, zoom, functionCache);
    }
  };
}

/**
 * Updates raster layer opacity from style properties.
 * @param {Object} glLayer The Mapbox/MapLibre Style layer object.
 * @param {import("ol/layer/Base.js").default} layer The OpenLayers layer.
 * @param {number} zoom Current zoom level.
 * @param {Object} functionCache Cache for style functions.
 */
function updateRasterLayerProperties(glLayer, layer, zoom, functionCache) {
  cameraObj.zoom = zoom;
  cameraObj.distanceFromCenter = 0;
  const opacity = getValue(
    glLayer,
    'paint',
    'raster-opacity',
    emptyObj,
    functionCache,
  );
  layer.setOpacity(opacity);
}
