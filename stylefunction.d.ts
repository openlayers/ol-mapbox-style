/**
 * @private
 * @param {Object} layer Gl object layer.
 * @param {string} layoutOrPaint 'layout' or 'paint'.
 * @param {string} property Feature property.
 * @param {number} zoom Zoom.
 * @param {Object} feature Gl feature.
 * @param {Object} [functionCache] Function cache.
 * @param {Object} [featureState] Feature state.
 * @return {?} Value.
 */
export function getValue(layer: any, layoutOrPaint: string, property: string, zoom: number, feature: any, functionCache?: any, featureState?: any): unknown;
/**
 * Configure whether features with a transparent style should be rendered. When
 * set to `true`, it will be possible to hit detect content that is not visible,
 * like transparent fills of polygons, using `ol/layer/Layer#getFeatures()` or
 * `ol/Map#getFeaturesAtPixel()`
 * @param {boolean} enabled Rendering of transparent elements is enabled.
 * Default is `false`.
 */
export function renderTransparent(enabled: boolean): void;
/**
 * Turns recording of the Mapbox/MapLibre Style's `layer` on and off. When turned on,
 * the layer that a rendered feature belongs to will be set as the feature's
 * `mapbox-layer` property.
 * @param {boolean} record Recording of the style layer is on.
 */
export function recordStyleLayer(record?: boolean): void;
/**
 * Creates a style function from the `glStyle` object for all layers that use
 * the specified `source`, which needs to be a `"type": "vector"` or
 * `"type": "geojson"` source and applies it to the specified OpenLayers layer.
 *
 * Two additional properties will be set on the provided layer:
 *
 *  * `mapbox-source`: The `id` of the Mapbox/MapLibre Style document's source that the
 *    OpenLayers layer was created from. Usually `apply()` creates one
 *    OpenLayers layer per Mapbox/MapLibre Style source, unless the layer stack has
 *    layers from different sources in between.
 *  * `mapbox-layers`: The `id`s of the Mapbox/MapLibre Style document's layers that are
 *    included in the OpenLayers layer.
 *
 * This function also works in a web worker. In worker mode, the main thread needs
 * to listen to messages from the worker and respond with another message to make
 * sure that sprite image loading works:
 *
 * ```js
 *  worker.addEventListener('message', event => {
 *   if (event.data.action === 'loadImage') {
 *     const image = new Image();
 *     image.crossOrigin = 'anonymous';
 *     image.addEventListener('load', function() {
 *       createImageBitmap(image, 0, 0, image.width, image.height).then(imageBitmap => {
 *         worker.postMessage({
 *           action: 'imageLoaded',
 *           image: imageBitmap,
 *           src: event.data.src
 *         }, [imageBitmap]);
 *       });
 *     });
 *     image.src = event.data.src;
 *   }
 * });
 * ```
 *
 * @param {VectorLayer|VectorTileLayer} olLayer OpenLayers layer to
 * apply the style to. In addition to the style, the layer will get two
 * properties: `mapbox-source` will be the `id` of the `glStyle`'s source used
 * for the layer, and `mapbox-layers` will be an array of the `id`s of the
 * `glStyle`'s layers.
 * @param {string|Object} glStyle Mapbox/MapLibre Style object.
 * @param {string|Array<string>} sourceOrLayers `source` key or an array of layer `id`s
 * from the Mapbox/MapLibre Style object. When a `source` key is provided, all layers for
 * the specified source will be included in the style function. When layer `id`s
 * are provided, they must be from layers that use the same source.
 * @param {Array<number>} resolutions
 * Resolutions for mapping resolution to zoom level.
 * @param {Object} spriteData Sprite data from the url specified in
 * the Mapbox/MapLibre Style object's `sprite` property. Only required if a `sprite`
 * property is specified in the Mapbox/MapLibre Style object.
 * @param {string|Request|Promise<string|Request>} spriteImageUrl Sprite image url for the sprite
 * specified in the Mapbox/MapLibre Style object's `sprite` property. Only required if a
 * `sprite` property is specified in the Mapbox/MapLibre Style object.
 * @param {function(Array<string>, string=):Array<string>} getFonts Function that
 * receives a font stack and the url template from the GL style's `metadata['ol:webfonts']`
 * property (if set) as arguments, and returns a (modified) font stack that
 * is available. Font names are the names used in the Mapbox/MapLibre Style object. If
 * not provided, the font stack will be used as-is. This function can also be
 * used for loading web fonts.
 * @param {function(VectorLayer|VectorTileLayer, string):HTMLImageElement|HTMLCanvasElement|string|undefined} [getImage]
 * Function that returns an image or a URL for an image name. If the result is an HTMLImageElement, it must already be
 * loaded. The layer can be used to call layer.changed() when the loading and processing of the image has finished.
 * This function can be used for icons not in the sprite or to override sprite icons.
 * @return {StyleFunction} Style function for use in
 * `ol.layer.Vector` or `ol.layer.VectorTile`.
 */
export function stylefunction(olLayer: VectorLayer | VectorTileLayer, glStyle: string | any, sourceOrLayers: string | Array<string>, resolutions?: Array<number>, spriteData?: any, spriteImageUrl?: string | Request | Promise<string | Request>, getFonts?: (arg0: Array<string>, arg1: string | undefined) => Array<string>, getImage?: (arg0: VectorLayer | VectorTileLayer, arg1: string) => HTMLImageElement | HTMLCanvasElement | string | undefined, ...args: any[]): StyleFunction;
/**
 * Get the the style for a specific Mapbox layer only. This can be useful for creating a legend.
 * @param {import("ol/Feature").default|import("ol/render/Feature").default} feature OpenLayers feature.
 * @param {number} resolution View resolution.
 * @param {import("ol/layer").Vector|import("ol/layer").VectorTile} olLayer OpenLayers layer.
 * @param {string} layerId Id of the Mapbox layer to get the style for
 * @return {Array<import("ol/style").Style>} Styles for the provided Mapbox layer.
 */
export function getStyleForLayer(feature: import("ol/Feature").default | import("ol/render/Feature").default, resolution: number, olLayer: import("ol/layer").Vector | import("ol/layer").VectorTile, layerId: string): Array<import("ol/style").Style>;
export const styleFunctionArgs: {};
export type VectorLayer = import("ol/layer/Vector").default;
export type VectorTileLayer = import("ol/layer/VectorTile").default;
export type StyleFunction = import("ol/style/Style").StyleFunction;
export type ResourceType = import("./util.js").ResourceType;
/**
 * @private
 * @param {?} color Color.
 * @param {number} [opacity] Opacity.
 * @return {string} Color.
 */
declare function colorWithOpacity(color: unknown, opacity?: number): string;
/**
 * @private
 * @param {string} layerId Layer id.
 * @param {?} filter Filter.
 * @param {Object} feature Feature.
 * @param {number} zoom Zoom.
 * @param {Object} [filterCache] Filter cache.
 * @return {boolean} Filter result.
 */
declare function evaluateFilter(layerId: string, filter: unknown, feature: any, zoom: number, filterCache?: any): boolean;
/**
 * @private
 * @param {string} text Text.
 * @param {Object} properties Properties.
 * @return {string} Text.
 */
declare function fromTemplate(text: string, properties: any): string;
export { colorWithOpacity as _colorWithOpacity, evaluateFilter as _evaluateFilter, fromTemplate as _fromTemplate, getValue as _getValue };
