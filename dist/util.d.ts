/**
 * @param {Object} glStyle Mapboox style object.
 * @return {Object} Function cache.
 */
export function getFunctionCache(glStyle: any): any;
/**
 * @param {Object} glStyle Mapboox style object.
 * @return {Object} Filter cache.
 */
export function getFilterCache(glStyle: any): any;
export function deg2rad(degrees: any): number;
/**
 * @param {number} width Width of the canvas.
 * @param {number} height Height of the canvas.
 * @return {HTMLCanvasElement} Canvas.
 */
export function createCanvas(width: number, height: number): HTMLCanvasElement;
export function getZoomForResolution(resolution: any, resolutions: any): number;
/**
 * @param {ResourceType} resourceType Type of resource to load.
 * @param {string} url Url of the resource.
 * @param {Options} [options={}] Options.
 * @param {{request?: Request}} [metadata] Object to be filled with the request.
 * @return {Promise<Object|Response>} Promise that resolves with the loaded resource
 * or rejects with the Response object.
 * @private
 */
export function fetchResource(resourceType: ResourceType, url: string, options?: import("./apply.js").Options | undefined, metadata?: {
    request?: Request | undefined;
} | undefined): Promise<any | Response>;
export function getGlStyle(glStyleOrUrl: any, options: any): Promise<any>;
/**
 * @param {Object} glSource glStyle source object.
 * @param {string} styleUrl Style URL.
 * @param {Options} options Options.
 * @return {Object} TileJson
 */
export function getTileJson(glSource: any, styleUrl: string, options?: Options): any;
/**
 * @param {HTMLImageElement} spriteImage Sprite image id.
 * @param {{x: number, y: number, width: number, height: number, pixelRatio: number}} spriteImageData Sprite image data.
 * @param {number} haloWidth Halo width.
 * @param {{r: number, g: number, b: number, a: number}} haloColor Halo color.
 * @return {HTMLCanvasElement} Canvas element with the halo.
 */
export function drawIconHalo(spriteImage: HTMLImageElement, spriteImageData: {
    x: number;
    y: number;
    width: number;
    height: number;
    pixelRatio: number;
}, haloWidth: number, haloColor: {
    r: number;
    g: number;
    b: number;
    a: number;
}): HTMLCanvasElement;
export const defaultResolutions: number[];
export type Options = import("./apply.js").Options;
export type ResourceType = import('./apply.js').ResourceType;
