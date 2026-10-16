/**
 * Creates a raster operations layer from a base tile layer.
 * Applies hue rotation, saturation, contrast, and brightness adjustments.
 * @param {import("ol/layer/Tile.js").default} tileLayer Base raster tile layer.
 * @return {ImageLayer<Raster>} The raster operations layer.
 */
export function createRasterOpLayer(tileLayer: import("ol/layer/Tile.js").default): ImageLayer<Raster>;
/**
 * Creates a hillshade layer from a base tile layer.
 * @param {import("ol/layer/Tile.js").default} tileLayer Base raster tile layer.
 * @return {ImageLayer<Raster>} The hillshade layer.
 */
export function createHillshadeLayer(tileLayer: import("ol/layer/Tile.js").default): ImageLayer<Raster>;
/**
 * Attaches the `beforeoperations` event handler to a raster operations layer.
 * Reads raster paint properties from the style and passes them to the shader.
 * @param {ImageLayer<Raster>} layer The raster operations layer.
 * @param {Object} glLayer The Mapbox/MapLibre Style layer object.
 * @param {Object} options Options including `resolutions`.
 * @param {Object} functionCache Cache for style functions.
 */
export function configureRasterOpLayer(layer: ImageLayer<Raster>, glLayer: any, options: any, functionCache: any): void;
/**
 * Attaches the `beforeoperations` event handler to a hillshade layer.
 * Reads hillshade paint properties from the style and passes them to the shader.
 * @param {ImageLayer<Raster>} layer The hillshade layer.
 * @param {Object} glSource The Mapbox/MapLibre Style source object.
 * @param {Object} glLayer The Mapbox/MapLibre Style layer object.
 * @param {Object} options Options including `projection` and `resolutions`.
 * @param {Object} functionCache Cache for style functions.
 */
export function configureHillshadeLayer(layer: ImageLayer<Raster>, glSource: any, glLayer: any, options: any, functionCache: any): void;
/**
 * Returns a prerender listener for raster layers that updates opacity.
 * @param {Object} glLayer The Mapbox/MapLibre Style layer object.
 * @param {import("ol/layer/Base.js").default} layer The OpenLayers layer.
 * @param {Object} functionCache Cache for style functions.
 * @return {function(import("ol/render/Event.js").default): void} Prerender listener.
 */
export function prerenderRasterLayer(glLayer: any, layer: import("ol/layer/Base.js").default, functionCache: any): (arg0: import("ol/render/Event.js").default) => void;
/**
 * Keys that indicate a raster layer requires shader operations.
 * @type {Array<string>}
 */
export const rasterOperationKeys: Array<string>;
import ImageLayer from 'ol/layer/Image.js';
import Raster from 'ol/source/Raster.js';
