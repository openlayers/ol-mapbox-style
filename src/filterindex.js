import {
  convertFilter,
  expression as styleExpression,
} from '@maplibre/maplibre-gl-style-spec';

/**
 * @param {*} value Filter value.
 * @return {boolean} Whether looking up layers by this value gives the same
 * result as comparing it with `==`.
 */
function isIndexableValue(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    Number.isFinite(value)
  );
}

/**
 * Get a condition that every feature passing the filter meets: the feature
 * property has one of the values. Returns undefined for filters without such a
 * simple condition.
 * @param {*} filter Layer filter in expression syntax.
 * @return {{property: string, values: Array<*>}|undefined} Required condition.
 */
function getRequiredCondition(filter) {
  if (!Array.isArray(filter)) {
    return undefined;
  }
  const [operator, input] = filter;
  if (operator === 'all') {
    for (const child of filter.slice(1)) {
      const condition = getRequiredCondition(child);
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
  if (!Array.isArray(values) || !values.every(isIndexableValue)) {
    return undefined;
  }
  return {property: input[1], values};
}

/**
 * Create a function that returns the layers whose filter can match a feature
 * with the given properties. It uses the required condition on the property
 * that most layer filters test. The returned layers still need their full
 * filter evaluated.
 * @template {{layer: *, index: number}} T
 * @param {Array<T>} layers Layers in rendering order.
 * @return {function(Object): Array<T>} Returns the candidate layers for the
 * properties of a feature.
 */
export function createCandidateLayerLookup(layers) {
  const conditions = layers.map(({layer}) => {
    const filter = layer.filter;
    if (!filter) {
      return undefined;
    }
    return getRequiredCondition(
      styleExpression.isExpressionFilter(filter)
        ? filter
        : convertFilter(filter),
    );
  });

  const layerCountByProperty = new Map();
  let indexedProperty;
  let indexedLayerCount = 1;
  for (const condition of conditions) {
    if (condition) {
      const layerCount =
        (layerCountByProperty.get(condition.property) || 0) + 1;
      layerCountByProperty.set(condition.property, layerCount);
      if (layerCount > indexedLayerCount) {
        indexedProperty = condition.property;
        indexedLayerCount = layerCount;
      }
    }
  }
  if (indexedProperty === undefined) {
    return () => layers;
  }

  const unindexedLayers = [];
  const entriesByValue = new Map();
  layers.forEach((layer, i) => {
    const condition = conditions[i];
    if (!condition || condition.property !== indexedProperty) {
      unindexedLayers.push(layer);
      return;
    }
    for (const value of new Set(condition.values)) {
      if (!entriesByValue.has(value)) {
        entriesByValue.set(value, {layers: []});
      }
      entriesByValue.get(value).layers.push(layer);
    }
  });

  // Only values that a filter mentions get an entry, so caching candidates on
  // the entries cannot grow with the data.
  return (properties) => {
    const entry = entriesByValue.get(properties[indexedProperty]);
    return entry
      ? (entry.candidates ||= unindexedLayers
          .concat(entry.layers)
          .sort((a, b) => a.index - b.index))
      : unindexedLayers;
  };
}
