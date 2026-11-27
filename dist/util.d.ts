/**
 * @param {Object} glStyle Mapbox style object.
 * @return {Object} Function cache.
 */
export function getFunctionCache(glStyle: any): any;
/**
 * @param {Object} glStyle Mapbox style object.
 * @return {Object} Filter cache.
 */
export function getFilterCache(glStyle: any): any;
/**
 * OpenLayers sources created for the style's vector and GeoJSON sources, by
 * source id, so the layers of one source share it, and its data is loaded and
 * parsed once. Vector tile sources are cached as a promise.
 * @param {Object} glStyle Mapbox style object.
 * @return {Object<string, Promise<import("ol/source/VectorTile.js").default>|import("ol/source/Vector.js").default>} Source cache.
 */
export function getSourceCache(glStyle: any): {
    [x: string]: Promise<import("ol/source/VectorTile.js").default<import("ol/render/Feature.js").default>> | import("ol/source/Vector.js").default<import("ol").Feature<import("ol/geom.js").Geometry, {
        [x: string]: any;
    }>>;
};
/**
 * Removes cached functions and filters of a style layer, so they are compiled
 * again from the layer's current definition.
 * @param {Object} glStyle Mapbox style object.
 * @param {string} layerId Mapbox layer id.
 */
export function clearLayerCache(glStyle: any, layerId: string): void;
export function deg2rad(degrees: any): number;
/**
 * @param {number} width Width of the canvas.
 * @param {number} height Height of the canvas.
 * @return {HTMLCanvasElement} Canvas.
 */
export function createCanvas(width: number, height: number): HTMLCanvasElement;
export function getZoomForResolution(resolution: any, resolutions: any): number;
export function getResolutionForZoom(zoom: any, resolutions: any): number;
export function clearPendingRequests(): void;
/**
 * @param {ResourceType} resourceType Type of resource to load.
 * @param {string} url Url of the resource.
 * @param {Options} [options] Options.
 * @param {{url?: string}} [metadata] Object to be filled with the request.
 * @return {Promise<Object|Response>} Promise that resolves with the loaded resource
 * or rejects with the Response object.
 * @private
 */
export function fetchResource(resourceType: ResourceType, url: string, options?: Options, metadata?: {
    url?: string;
}): Promise<any | Response>;
export function getGlStyle(glStyleOrUrl: any, options: any): Promise<any>;
/**
 * @param {Object} glSource glStyle source object.
 * @param {string} styleUrl Style URL.
 * @param {Options} options Options.
 * @return {Promise<{tileJson: Object, tileLoadFunction: import('ol/Tile.js').LoadFunction}?>} TileJson and load function
 */
export function getTileJson(glSource: any, styleUrl: string, options?: Options): Promise<{
    tileJson: any;
    tileLoadFunction: import("ol/Tile.js").LoadFunction;
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
 * @param {HTMLImageElement|HTMLCanvasElement} image SDF image
 * @param {{x: number, y: number, width: number, height: number}} area Area to unSDF
 * @param {{r: number, g: number, b: number, a: number}} color Color to use
 * @return {HTMLCanvasElement} Regular image
 */
export function drawSDF(image: HTMLImageElement | HTMLCanvasElement, area: {
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
/** @typedef {'Style'|'Source'|'Sprite'|'SpriteImage'|'Tiles'|'GeoJSON'} ResourceType */
/** @typedef {import("ol").Map} Map */
/** @typedef {import("ol/layer/Layer.js").default} Layer */
/** @typedef {import("ol/layer/Group.js").default} LayerGroup */
/** @typedef {import("ol/layer/Vector.js").default} VectorLayer */
/** @typedef {import("ol/layer/VectorTile.js").default} VectorTileLayer */
/** @typedef {import("ol/source/Source.js").default} Source */
export const emptyObj: Readonly<{}>;
export const defaultResolutions: number[];
export type ResourceType = "Style" | "Source" | "Sprite" | "SpriteImage" | "Tiles" | "GeoJSON";
export type Map = import("ol").Map;
export type Layer = import("ol/layer/Layer.js").default;
export type LayerGroup = import("ol/layer/Group.js").default;
export type VectorLayer = import("ol/layer/Vector.js").default;
export type VectorTileLayer = import("ol/layer/VectorTile.js").default;
export type Source = import("ol/source/Source.js").default;
export type Options = import("./apply.js").Options;
