/**
 * @typedef {Object} LayerCondition
 * @property {string} property Feature property.
 * @property {Set<*>} values Values the property needs to have.
 */
/**
 * @param {string} layerId Layer id.
 * @param {?} filter Filter.
 * @param {Object} feature Feature.
 * @param {Object} filterCache Filter cache.
 * @return {boolean} Filter result.
 */
export function evaluateFilter(layerId: string, filter: unknown, feature: any, filterCache: any): boolean;
/**
 * Get a condition that every feature passing the layer filter meets: the
 * feature property has one of the values. Features that do not meet it can
 * skip the full filter evaluation.
 * @param {?} filter Layer filter, in expression or legacy syntax.
 * @return {LayerCondition|undefined} Required condition, or undefined for
 * filters without such a simple condition.
 */
export function getLayerCondition(filter: unknown): LayerCondition | undefined;
export type LayerCondition = {
    /**
     * Feature property.
     */
    property: string;
    /**
     * Values the property needs to have.
     */
    values: Set<any>;
};
