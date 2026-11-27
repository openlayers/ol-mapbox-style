/**
 * Mapbox's `["raster-value"]` cannot be registered like the operators below:
 * the parser would fold an unknown operator without arguments into a constant.
 * Instead, `raster-color` reads the raster value like a feature property.
 * @param {*} expression Expression.
 * @return {*} The expression with `["get", "raster-value"]` for `["raster-value"]`.
 */
export function rasterValueToGet(expression: any): any;
export function wrapImageExtraArgs(expression: any): any;
export const styleConfig: {};
export namespace cameraObj {
    let zoom: number;
    let distanceFromCenter: number;
}
