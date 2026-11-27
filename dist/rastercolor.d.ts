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
export function createRasterColor(glLayer: any, functionCache: any): (arg0: number) => RasterColor | undefined;
export type RasterColor = {
    /**
     * Weights of the premultiplied red, green and
     * blue channels (0-1), and an offset.
     */
    mix: Array<number>;
    /**
     * Raster values at the start and the end of the ramp.
     */
    range: Array<number>;
    /**
     * Colors as unpremultiplied RGBA (0-255).
     */
    ramp: Uint8ClampedArray;
};
