export function getStyleId(glStyle: any): any;
export function getStyleFunctionKey(glStyle: any, olLayer: any): string;
/**
 * @param {Object} glStyle Mapboox style object.
 * @return {Object} Function cache.
 */
export function getFunctionCache(glStyle: any): any;
export function clearFunctionCache(): void;
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
export function getResolutionForZoom(zoom: any, resolutions: any): number;
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
 * @return {Promise<{tileJson: Object, tileLoadFunction: import('ol/Tile.js').LoadFunction}?>} TileJson and load function
 */
export function getTileJson(glSource: any, styleUrl: string, options?: Options): Promise<{
    tileJson: any;
    tileLoadFunction: import('ol/Tile.js').LoadFunction;
} | null>;
/**
 * @param {HTMLImageElement|HTMLCanvasElement} spriteImage Sprite image id.
 * @param {{x: number, y: number, width: number, height: number, pixelRatio: number}} spriteImageData Sprite image data.
 * @param {number} haloWidth Halo width.
 * @param {{r: number, g: number, b: number, a: number}} haloColor Halo color.
 * @return {HTMLCanvasElement} Canvas element with the halo.
 */
export function drawIconHalo(spriteImage: HTMLImageElement | HTMLCanvasElement, spriteImageData: {
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
/**
 * @param {HTMLImageElement} image SDF image
 * @param {{x: number, y: number, width: number, height: number}} area Area to unSDF
 * @param {{r: number, g: number, b: number, a: number}} color Color to use
 * @return {HTMLCanvasElement} Regular image
 */
export function drawSDF(image: HTMLImageElement, area: {
    x: number;
    y: number;
    width: number;
    height: number;
}, color: {
    r: number;
    g: number;
    b: number;
    a: number;
}): HTMLCanvasElement;
export const defaultResolutions: number[];
export type ResourceType = 'Style' | 'Source' | 'Sprite' | 'SpriteImage' | 'Tiles' | 'GeoJSON';
export type Map = import("ol").Map;
export type Layer = import("ol/layer").Layer;
export type LayerGroup = import("ol/layer").Group;
export type VectorLayer = import("ol/layer").Vector;
export type VectorTileLayer = import("ol/layer").VectorTile;
export type Source = import("ol/source").Source;
export type Options = import("./apply.js").Options;
