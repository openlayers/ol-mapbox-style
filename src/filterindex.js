import {expression as styleExpression} from '@maplibre/maplibre-gl-style-spec';

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
  const [operator, input, value] = filter;
  if (operator === 'all') {
    for (const child of filter.slice(1)) {
      const condition = getCondition(child, expression);
      if (condition) {
        return condition;
      }
    }
    return undefined;
  }
  if (operator !== '==' && operator !== 'in') {
    return undefined;
  }
  let property = input;
  let values = filter.slice(2);
  if (expression) {
    if (!Array.isArray(input) || input.length !== 2 || input[0] !== 'get') {
      return undefined;
    }
    property = input[1];
    if (operator === 'in') {
      if (
        filter.length !== 3 ||
        !Array.isArray(value) ||
        value[0] !== 'literal'
      ) {
        return undefined;
      }
      values = value[1];
    }
  }
  if (
    typeof property !== 'string' ||
    property.startsWith('$') ||
    (operator === '==' && filter.length !== 3) ||
    !Array.isArray(values) ||
    !values.every(
      (value) =>
        typeof value === 'string' ||
        typeof value === 'boolean' ||
        Number.isFinite(value),
    )
  ) {
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
        buckets.set(value, {layers: []});
      }
      buckets.get(value).layers.push(layer);
    }
  });
  // Cache only values present in the style, never arbitrary feature values.
  return (properties) => {
    const bucket = buckets.get(properties[property]);
    return bucket
      ? (bucket.candidates ||= fallback
          .concat(bucket.layers)
          .sort((a, b) => a.index - b.index))
      : fallback;
  };
}
