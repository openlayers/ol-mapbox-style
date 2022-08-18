/**
 * Applies a style function to an `ol/layer/VectorTile` or `ol/layer/Vector`
 * with an `ol/source/VectorTile` or an `ol/source/Vector`. If the layer does not have a source
 * yet, it will be created and populated from the information in the `glStyle`.
 *
 * **Example:**
 * ```js
 * import {applyStyle} from 'ol-mapbox-style';
 * import {VectorTile} from 'ol/layer.js';
 *
 * const layer = new VectorTile({declutter: true});
 * applyStyle(layer, 'https://api.maptiler.com/maps/basic/style.json?key=YOUR_OPENMAPTILES_TOKEN');
 * ```
 *
 * The style function will render all layers from the `glStyle` object that use the source
 * of the first layer, the specified `source`, or a subset of layers from the same source. The
 * source needs to be a `"type": "vector"` or `"type": "geojson"` source.
 *
 * Two additional properties will be set on the provided layer:
 *
 *  * `mapbox-source`: The `id` of the Mapbox Style document's source that the
 *    OpenLayers layer was created from. Usually `apply()` creates one
 *    OpenLayers layer per Mapbox Style source, unless the layer stack has
 *    layers from different sources in between.
 *  * `mapbox-layers`: The `id`s of the Mapbox Style document's layers that are
 *    included in the OpenLayers layer.
 *
 * @param {VectorTileLayer|VectorLayer} layer OpenLayers layer. When the layer has a source configured,
 * it will be modified to use the configuration from the glStyle's `source`. Options specified on the
 * layer's source will override those from the glStyle's `source`, except for `url`,
 * `tileUrlFunction` and `tileGrid` (exception: when the source projection is not `EPSG:3857`).
 * @param {string|Object} glStyle Mapbox Style object.
 * @param {string|Array<string>} sourceOrLayers `source` key or an array of layer `id`s from the
 * Mapbox Style object. When a `source` key is provided, all layers for the
 * specified source will be included in the style function. When layer `id`s
 * are provided, they must be from layers that use the same source. When not provided or a falsey
 * value, all layers using the first source specified in the glStyle will be rendered.
 * @param {Options|string} optionsOrPath Options. Alternatively the path of the style file
 * (only required when a relative path is used for the `"sprite"` property of the style).
 * @param {Array<number>} resolutions Resolutions for mapping resolution to zoom level.
 * Only needed when working with non-standard tile grids or projections.
 * @return {Promise} Promise which will be resolved when the style can be used
 * for rendering.
 */
export function applyStyle(layer: VectorTileLayer | VectorLayer<any>, glStyle: string | any, sourceOrLayers?: string | Array<string>, optionsOrPath?: Options | string, resolutions?: Array<number>): Promise<any>;
/**
 * Applies properties of the Mapbox Style's first `background` layer to the
 * provided map or VectorTile layer.
 *
 * **Example:**
 * ```js
 * import {applyBackground} from 'ol-mapbox-style';
 * import {Map} from 'ol';
 *
 * const map = new Map({target: 'map'});
 * applyBackground(map, 'https://api.maptiler.com/maps/basic/style.json?key=YOUR_OPENMAPTILES_TOKEN');
 * ```
 * @param {Map|VectorTileLayer} mapOrLayer OpenLayers Map or VectorTile layer.
 * @param {Object|string} glStyle Mapbox Style object or url.
 * @param {Options} options Options.
 * @return {Promise} Promise that resolves when the background is applied.
 */
export function applyBackground(mapOrLayer: Map | VectorTileLayer, glStyle: any | string, options?: Options): Promise<any>;
/**
 * Creates an OpenLayers VectorTile source for a gl source entry.
 * @param {Object} glSource "source" entry from a Mapbox Style object.
 * @param {string|undefined} styleUrl URL to use for the source. This is expected to be the complete http(s) url,
 * with access key applied.
 * @param {Options} options Options.
 * @return {Promise<import("ol/source/VectorTile").default>} Promise resolving to a VectorTile source.
 * @private
 */
export function setupVectorSource(glSource: any, styleUrl: string | undefined, options: Options): Promise<import("ol/source/VectorTile").default>;
/**
 * Loads and applies a Mapbox Style object into an OpenLayers Map. This includes
 * the map background, the layers, the center and the zoom.
 *
 * **Example:**
 * ```js
 * import apply from 'ol-mapbox-style';
 *
 * apply('map', 'mapbox://styles/mapbox/bright-v9', {accessToken: 'YOUR_MAPBOX_TOKEN'});
 * ```
 *
 * The center and zoom will only be set if present in the Mapbox Style document,
 * and if not already set on the OpenLayers map.
 *
 * Layers will be added to the OpenLayers map, without affecting any layers that
 * might already be set on the map.
 *
 * Layers added by `apply()` will have two additional properties:
 *
 *  * `mapbox-source`: The `id` of the Mapbox Style document's source that the
 *    OpenLayers layer was created from. Usually `apply()` creates one
 *    OpenLayers layer per Mapbox Style source, unless the layer stack has
 *    layers from different sources in between.
 *  * `mapbox-layers`: The `id`s of the Mapbox Style document's layers that are
 *    included in the OpenLayers layer.
 *
 * This function sets an additional `mapbox-style` property on the OpenLayers
 * map instance, which holds the Mapbox Style object.
 *
 * @param {Map|HTMLElement|string} map Either an existing OpenLayers Map
 * instance, or a HTML element, or the id of a HTML element that will be the
 * target of a new OpenLayers Map.
 * @param {string|Object} style JSON style object or style url pointing to a
 * Mapbox Style object. When using Mapbox APIs, the url is the `styleUrl`
 * shown in Mapbox Studio's "share" panel. In addition, the `accessToken` option
 * (see below) must be set.
 * When passed as JSON style object, all OpenLayers layers created by `apply()`
 * will be immediately available, but they may not have a source yet (i.e. when
 * they are defined by a TileJSON url in the Mapbox Style document). When passed
 * as style url, layers will be added to the map when the Mapbox Style document
 * is loaded and parsed.
 * @param {Options} options Options.
 * @return {Promise<Map>} A promise that resolves after all layers have been added to
 * the OpenLayers Map instance, their sources set, and their styles applied. The
 * `resolve` callback will be called with the OpenLayers Map instance as
 * argument.
 */
export function apply(map: Map | HTMLElement | string, style: string | any, options?: Options): Promise<Map>;
/**
 * Get the OpenLayers layer instance that contains the provided Mapbox Style
 * `layer`. Note that multiple Mapbox Style layers are combined in a single
 * OpenLayers layer instance when they use the same Mapbox Style `source`.
 * @param {Map} map OpenLayers Map.
 * @param {string} layerId Mapbox Style layer id.
 * @return {Layer} OpenLayers layer instance.
 */
export function getLayer(map: Map, layerId: string): Layer;
/**
 * Get the OpenLayers layer instances for the provided Mapbox Style `source`.
 * @param {Map} map OpenLayers Map.
 * @param {string} sourceId Mapbox Style source id.
 * @return {Array<Layer>} OpenLayers layer instances.
 */
export function getLayers(map: Map, sourceId: string): Array<Layer>;
/**
 * Get the OpenLayers source instance for the provided Mapbox Style `source`.
 * @param {Map} map OpenLayers Map.
 * @param {string} sourceId Mapbox Style source id.
 * @return {Source} OpenLayers source instance.
 */
export function getSource(map: Map, sourceId: string): Source;
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
export function setFeatureState(mapOrLayer: Map | VectorLayer<any> | VectorTileLayer, feature: FeatureIdentifier, state: any | null): void;
/**
 * Sets or removes a feature state. The feature state is taken into account for styling,
 * just like the feature's properties, and can be used e.g. to conditionally render selected
 * features differently.
 * @param {Map|VectorLayer|VectorTileLayer} mapOrLayer Map or layer to set the feature state on.
 * @param {FeatureIdentifier} feature Feature identifier.
 * @return {Object|null} Feature state or `null` when no feature state is set for the given
 * feature identifier.
 */
export function getFeatureState(mapOrLayer: Map | VectorLayer<any> | VectorTileLayer, feature: FeatureIdentifier): any | null;
export { finalizeLayer as _finalizeLayer };
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
export type Options = {
    /**
     * Access token for 'mapbox://' urls.
     */
    accessToken?: string | undefined;
    /**
     * Function for controlling how `ol-mapbox-style` fetches resources. Can be used for modifying
     * the url, adding headers or setting credentials options. Called with the url and the resource
     * type as arguments, this function is supposed to return a `Request` object. Without a return value,
     * the original request will not be modified. For `Tiles` and `GeoJSON` resources, only the `url` of
     * the returned request will be respected.
     */
    transformRequest?: ((arg0: string, arg1: ResourceType) => (Request | void)) | undefined;
    /**
     * Resolutions for mapping resolution to zoom level.
     * Only needed when working with non-standard tile grids or projections.
     */
    resolutions?: number[] | undefined;
    /**
     * URL of the Mapbox GL style. Required for styles that were provided
     * as object, when they contain a relative sprite url, or sources referencing data by relative url.
     */
    styleUrl?: string | undefined;
    /**
     * Access token param. For internal use.
     */
    accessTokenParam?: string | undefined;
};
export type ResourceType = 'Style' | 'Source' | 'Sprite' | 'SpriteImage' | 'Tiles' | 'GeoJSON';
export type Layer = import("ol/layer/Layer").default;
export type Source = import("ol/source/Source").default;
import VectorTileLayer from "ol/layer/VectorTile.js";
import VectorLayer from "ol/layer/Vector.js";
import Map from "ol/Map.js";
/**
 * If layerIds is not empty, applies the style specified in glStyle to the layer,
 * and adds the layer to the map.
 *
 * The layer may not yet have a source when the function is called.  If so, the style
 * is applied to the layer via a once listener on the 'change:source' event.
 *
 * @param {Layer} layer An OpenLayers layer instance.
 * @param {Array<string>} layerIds Array containing layer ids of already-processed layers.
 * @param {Object} glStyle Style as a JSON object.
 * @param {string|undefined} styleUrl The original style URL. Only required
 * when a relative path is used with the `"sprite"` property of the style.
 * @param {Map} map OpenLayers Map.
 * @param {Options} options Options.
 * @return {Promise} Returns a promise that resolves after the source has
 * been set on the specified layer, and the style has been applied.
 * @private
 */
declare function finalizeLayer(layer: Layer, layerIds: Array<string>, glStyle: any, styleUrl: string | undefined, map: Map, options?: Options): Promise<any>;
