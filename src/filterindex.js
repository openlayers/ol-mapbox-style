import {expression as styleExpression} from '@maplibre/maplibre-gl-style-spec';

/**
 * @param {*} value Filter value.
 * @return {boolean} Whether the value can be indexed.
 */
function isLiteral(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    (typeof value === 'number' && Number.isFinite(value))
  );
}

/**
 * Extract a necessary equality condition. Unsupported filters remain unindexed.
 * @param {*} filter Layer filter.
 * @param {boolean} expression Whether the filter uses expression syntax.
 * @return {{property: string, values: Array<*>}|undefined} Condition.
 */
function getCondition(filter, expression) {
  if (!Array.isArray(filter)) {
    return undefined;
  }
  if (filter[0] === 'all') {
    for (let i = 1; i < filter.length; ++i) {
      const condition = getCondition(filter[i], expression);
      if (condition) {
        return condition;
      }
    }
    return undefined;
  }
  let property = filter[1];
  if (expression !== Array.isArray(property)) {
    return undefined;
  }
  if (expression) {
    if (property.length !== 2 || property[0] !== 'get') {
      return undefined;
    }
    property = property[1];
  }
  if (typeof property !== 'string' || property.startsWith('$')) {
    return undefined;
  }
  let values;
  if (filter[0] === '==' && filter.length === 3 && isLiteral(filter[2])) {
    values = [filter[2]];
  } else if (filter[0] === 'in') {
    if (expression) {
      const literal = filter[2];
      if (
        filter.length !== 3 ||
        !Array.isArray(literal) ||
        literal[0] !== 'literal' ||
        !Array.isArray(literal[1])
      ) {
        return undefined;
      }
      values = literal[1];
    } else {
      values = filter.slice(2);
    }
  }
  if (!values || !values.every(isLiteral)) {
    return undefined;
  }
  return {property, values};
}

/**
 * Select layers using a necessary filter condition on a common property.
 * The full filter still needs to be evaluated for every candidate.
 * @template {{layer: *, index: number}} T
 * @param {Array<T>} layers Layers in rendering order.
 * @return {function(Object): Array<T>} Candidate lookup.
 */
export function createFilterIndex(layers) {
  const conditions = layers.map(({layer}) =>
    getCondition(
      layer.filter,
      styleExpression.isExpressionFilter(layer.filter),
    ),
  );
  const counts = new Map();
  let property;
  let count = 1;
  for (const condition of conditions) {
    if (condition) {
      const n = (counts.get(condition.property) || 0) + 1;
      counts.set(condition.property, n);
      if (n > count) {
        property = condition.property;
        count = n;
      }
    }
  }
  if (property === undefined) {
    return () => layers;
  }
  const fallback = [];
  const buckets = new Map();
  layers.forEach((layer, i) => {
    const condition = conditions[i];
    if (!condition || condition.property !== property) {
      fallback.push(layer);
      return;
    }
    for (const value of new Set(condition.values)) {
      if (!buckets.has(value)) {
        buckets.set(value, []);
      }
      buckets.get(value).push(layer);
    }
  });
  // Cache only values present in the style, never arbitrary feature values.
  const candidates = new Map();
  return (properties) => {
    const value = properties[property];
    if (!buckets.has(value)) {
      return fallback;
    }
    if (!candidates.has(value)) {
      candidates.set(
        value,
        fallback.concat(buckets.get(value)).sort((a, b) => a.index - b.index),
      );
    }
    return candidates.get(value);
  };
}
