import {
  convertFilter,
  featureFilter as createFilter,
  expression as styleExpression,
} from '@maplibre/maplibre-gl-style-spec';
import {cameraObj} from './expressions.js';

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
export function evaluateFilter(layerId, filter, feature, filterCache) {
  if (!(layerId in filterCache)) {
    try {
      filterCache[layerId] = createFilter(
        filter,
        `layers[${layerId}].filter`,
      ).filter;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(
        'Filter will evaluate to false: ' + /** @type {Error} */ (e).message,
      );
      filterCache[layerId] = function () {
        return false;
      };
    }
  }
  return filterCache[layerId](cameraObj, feature);
}

/**
 * @param {*} value Filter value.
 * @return {boolean} Whether a `Set` lookup of this value gives the same result
 * as comparing it with `==`.
 */
function isComparableValue(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    Number.isFinite(value)
  );
}

/**
 * @param {*} filter Layer filter in expression syntax.
 * @return {LayerCondition|undefined} Required condition, or undefined for
 * filters without such a simple condition.
 */
function getRequiredCondition(filter) {
  if (!Array.isArray(filter)) {
    return undefined;
  }
  const [operator, input] = filter;
  if (operator === 'all') {
    for (let i = 1, ii = filter.length; i < ii; ++i) {
      const condition = getRequiredCondition(filter[i]);
      if (condition) {
        return condition;
      }
    }
    return undefined;
  }
  if (
    !Array.isArray(input) ||
    input.length !== 2 ||
    input[0] !== 'get' ||
    typeof input[1] !== 'string'
  ) {
    return undefined;
  }
  let values;
  if (operator === '==' && filter.length === 3) {
    values = [filter[2]];
  } else if (
    operator === 'in' &&
    filter.length === 3 &&
    Array.isArray(filter[2]) &&
    filter[2][0] === 'literal'
  ) {
    values = filter[2][1];
  } else if (
    operator === 'match' &&
    filter.length === 5 &&
    filter[3] === true &&
    filter[4] === false
  ) {
    values = Array.isArray(filter[2]) ? filter[2] : [filter[2]];
  }
  if (!Array.isArray(values) || !values.every(isComparableValue)) {
    return undefined;
  }
  return {property: input[1], values: new Set(values)};
}

/**
 * Get a condition that every feature passing the layer filter meets: the
 * feature property has one of the values. Features that do not meet it can
 * skip the full filter evaluation.
 * @param {?} filter Layer filter, in expression or legacy syntax.
 * @return {LayerCondition|undefined} Required condition, or undefined for
 * filters without such a simple condition.
 */
export function getLayerCondition(filter) {
  if (!filter) {
    return undefined;
  }
  return getRequiredCondition(
    styleExpression.isExpressionFilter(filter) ? filter : convertFilter(filter),
  );
}
