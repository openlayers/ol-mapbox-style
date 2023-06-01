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
/**
 * Get the OpenLayers layer instance that contains the provided Mapbox Style
 * `layer`. Note that multiple Mapbox Style layers are combined in a single
 * OpenLayers layer instance when they use the same Mapbox Style `source`.
 * @param {Map|LayerGroup} map OpenLayers Map or LayerGroup.
 * @param {string} layerId Mapbox Style layer id.
 * @return {Layer} OpenLayers layer instance.
 */
export function getLayer(map: Map | LayerGroup, layerId: string): Layer;
/**
 * Get the OpenLayers layer instances for the provided Mapbox Style `source`.
 * @param {Map|LayerGroup} map OpenLayers Map or LayerGroup.
 * @param {string} sourceId Mapbox Style source id.
 * @return {Array<Layer>} OpenLayers layer instances.
 */
export function getLayers(map: Map | LayerGroup, sourceId: string): Array<Layer>;
/**
 * Get the OpenLayers source instance for the provided Mapbox Style `source`.
 * @param {Map|LayerGroup} map OpenLayers Map or LayerGroup.
 * @param {string} sourceId Mapbox Style source id.
 * @return {Source} OpenLayers source instance.
 */
export function getSource(map: Map | LayerGroup, sourceId: string): Source;
/**
 * Sets or removes a feature state. The feature state is taken into account for styling,
 * just like the feature's properties, and can be used e.g. to conditionally render selected
 * features differently.
 *
 * The feature state will be stored on the OpenLayers layer matching the feature identifier, in the
 * `mapbox-featurestate` property.
 * @param {Map|VectorLayer|VectorTileLayer} mapOrLayer OpenLayers Map or layer to set the feature
 * state on.
 * @param {FeatureIdentifier} feature Feature identifier.
 * @param {Object|null} state Feature state. Set to `null` to remove the feature state.
 */
export function setFeatureState(mapOrLayer: Map | import("ol/layer/Vector.js").default<any> | VectorTileLayer, feature: FeatureIdentifier, state: any | null): void;
/**
 * Sets or removes a feature state. The feature state is taken into account for styling,
 * just like the feature's properties, and can be used e.g. to conditionally render selected
 * features differently.
 * @param {Map|VectorLayer|VectorTileLayer} mapOrLayer Map or layer to set the feature state on.
 * @param {FeatureIdentifier} feature Feature identifier.
 * @return {Object|null} Feature state or `null` when no feature state is set for the given
 * feature identifier.
 */
export function getFeatureState(mapOrLayer: Map | import("ol/layer/Vector.js").default<any> | VectorTileLayer, feature: FeatureIdentifier): any | null;
/**
 * Get the Mapbox Layer object for the provided `layerId`.
 * @param {Map|LayerGroup} mapOrGroup Map or LayerGroup.
 * @param {string} layerId Mapbox Layer id.
 * @return {Object} Mapbox Layer object.
 */
export function getMapboxLayer(mapOrGroup: Map | LayerGroup, layerId: string): any;
/**
 * Add a new Mapbox Layer object to the style. The map will be re-rendered.
 * @param {Map|LayerGroup} mapOrGroup The Map or LayerGroup `apply` was called on.
 * @param {Object} mapboxLayer Mapbox Layer object.
 * @param {string} [beforeLayerId] Optional id of the Mapbox Layer before the new layer that will be added.
 * @return {Promise<void>} Resolves when the added layer is available.
 */
export function addMapboxLayer(mapOrGroup: Map | LayerGroup, mapboxLayer: any, beforeLayerId?: string | undefined): Promise<void>;
/**
 * Update a Mapbox Layer object in the style. The map will be re-rendered with the new style.
 * @param {Map|LayerGroup} mapOrGroup The Map or LayerGroup `apply` was called on.
 * @param {Object} mapboxLayer Updated Mapbox Layer object.
 */
export function updateMapboxLayer(mapOrGroup: Map | LayerGroup, mapboxLayer: any): void;
/**
 * Remove a Mapbox Layer object from the style. The map will be re-rendered.
 * @param {Map|LayerGroup} mapOrGroup The Map or LayerGroup `apply` was called on.
 * @param {string|Object} mapboxLayerIdOrLayer Mapbox Layer id or Mapbox Layer object.
 */
export function removeMapboxLayer(mapOrGroup: Map | LayerGroup, mapboxLayerIdOrLayer: string | any): void;
export const defaultResolutions: number[];
export type Map = import("ol").Map;
export type Layer = import("ol/layer").Layer;
export type LayerGroup = import("ol/layer").Group;
export type VectorLayer = import("ol/layer/Vector.js").default<any>;
export type VectorTileLayer = import("ol/layer").VectorTile;
export type Source = import("ol/source").Source;
export type FeatureIdentifier = {
    /**
     * The feature id.
     */
    id: string | number;
    /**
     * The source id.
     */
    source: string;
};
export type Options = import("./apply.js").Options;
export type ResourceType = import('./apply.js').ResourceType;
