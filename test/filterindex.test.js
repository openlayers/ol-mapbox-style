import {featureFilter} from '@maplibre/maplibre-gl-style-spec';
import deepFreeze from 'deep-freeze';
import Feature from 'ol/Feature.js';
import {fromExtent} from 'ol/geom/Polygon.js';
import VectorLayer from 'ol/layer/Vector.js';
import should from 'should';
import {spy} from 'sinon';
import {apply, getLayer, updateMapboxLayer} from '../src/apply.js';
import {createFilterIndex} from '../src/filterindex.js';
import {stylefunction} from '../src/stylefunction.js';
import {getFilterCache} from '../src/util.js';

describe('filter index', function () {
  function layers(filters) {
    return filters.map((filter, index) => ({layer: {filter}, index}));
  }

  it('selects candidates and preserves order without modifying layers', function () {
    const data = deepFreeze(
      layers([
        undefined,
        ['==', 'class', 'road'],
        ['==', 'class', 'water'],
        ['in', 'class', 'road', 'road', 'path'],
        ['>', 'width', 5],
      ]),
    );
    const lookup = createFilterIndex(data);
    should(lookup({class: 'road'})).eql([data[0], data[1], data[3], data[4]]);
    should(lookup({class: 'water'})).eql([data[0], data[2], data[4]]);
    should(lookup({class: 'unknown'})).eql([data[0], data[4]]);
    should(lookup({})).eql([data[0], data[4]]);
    should(lookup({class: 'road'})).equal(lookup({class: 'road'}));
  });

  it('keeps numeric, string and boolean values distinct', function () {
    const data = layers([
      ['==', ['get', 'kind'], 1],
      ['==', ['get', 'kind'], '1'],
      ['==', ['get', 'kind'], true],
    ]);
    const lookup = createFilterIndex(data);
    should(lookup({kind: 1})).eql([data[0]]);
    should(lookup({kind: '1'})).eql([data[1]]);
    should(lookup({kind: true})).eql([data[2]]);
  });

  it('falls back when there is no shared indexable property', function () {
    const data = layers([
      ['==', 'a', 1],
      ['==', 'b', 2],
      ['>', 'a', 0],
    ]);
    should(createFilterIndex(data)({a: 1})).equal(data);
  });

  it('skips unrelated filters in the style function and keeps style order', function () {
    const style = {
      version: 8,
      sources: {data: {type: 'geojson'}},
      layers: [
        {id: 'road', filter: ['==', 'kind', 'road']},
        {id: 'water', filter: ['==', 'kind', 'water']},
        {id: 'fallback'},
      ].map((layer) => ({
        ...layer,
        type: 'fill',
        source: 'data',
        paint: {'fill-color': 'red'},
      })),
    };
    const feature = new Feature(fromExtent([0, 0, 1, 1]));
    const fn = stylefunction(new VectorLayer(), style, 'data');
    feature.set('kind', 'road');
    fn(feature, 1);
    feature.set('kind', 'water');
    fn(feature, 1);
    const cache = getFilterCache(style);
    const road = spy(cache, 'road');
    const water = spy(cache, 'water');
    feature.set('kind', 'road');
    should(fn(feature, 1).map((item) => item.getZIndex())).eql([0, 2]);
    should(road.callCount).equal(1);
    should(water.callCount).equal(0);
    should(fn(feature, 1, 'fallback').map((item) => item.getZIndex())).eql([2]);
    should(road.callCount).equal(1);
    should(water.callCount).equal(0);
    should(fn(feature, 1, 'water')).be.undefined();
    should(water.callCount).equal(0);
    should(fn(feature, 1, 'road').map((item) => item.getZIndex())).eql([0]);
    should(road.callCount).equal(2);
  });

  it('rebuilds the candidate index when a layer filter is updated', async function () {
    const style = {
      version: 8,
      sources: {
        data: {
          type: 'geojson',
          data: {type: 'FeatureCollection', features: []},
        },
      },
      layers: ['road', 'water'].map((kind) => ({
        id: kind,
        type: 'fill',
        source: 'data',
        filter: ['==', 'kind', kind],
        paint: {'fill-color': 'red'},
      })),
    };
    const map = await apply(document.createElement('div'), style);
    try {
      const layer = getLayer(map, 'road');
      const feature = new Feature(fromExtent([0, 0, 1, 1]));
      feature.set('kind', 'road');
      const indexes = () =>
        layer
          .getStyleFunction()(feature, 1)
          .map((item) => item.getZIndex());
      should(indexes()).eql([0]);
      await updateMapboxLayer(map, {
        ...style.layers[1],
        filter: ['==', 'kind', 'road'],
      });
      should(indexes()).eql([0, 1]);
      await updateMapboxLayer(map, {
        ...style.layers[0],
        filter: ['==', 'kind', 'other'],
      });
      should(indexes()).eql([1]);
    } finally {
      map.dispose();
    }
  });

  it('keeps the same filter results as the style-spec evaluator', function () {
    const filters = [
      undefined,
      ['==', 'class', 'road'],
      ['in', 'class', 'road', 'path'],
      ['all', ['==', '$type', 'Point'], ['==', 'class', 'road']],
      ['all', ['>', 'width', 2], ['==', 'class', 'road']],
      ['all', ['all', ['==', 'class', 'road']], ['>', 'width', 2]],
      ['any', ['==', 'class', 'water'], ['>', 'width', 2]],
      ['!=', 'class', 'road'],
      ['==', ['get', 'class'], 'road'],
      ['==', ['get', 'class'], ['literal', 'road']],
      ['in', ['get', 'class'], ['literal', ['road', 'path']]],
      ['in', ['get', 'class'], 'road'],
      ['all', ['==', ['get', 'class'], 'road'], ['has', 'width']],
      ['==', ['get', 'class'], null],
      ['in', ['get', 'class'], ['literal', [null, 'road']]],
      ['==', ['get', 'class', ['literal', {class: 'road'}]], 'road'],
      ['==', ['coalesce', ['get', 'class'], 'road'], 'road'],
      ['==', ['at', 0, ['get', 'classes']], 'road'],
    ];
    const data = layers(filters);
    const compiled = filters.map(
      (filter, i) => featureFilter(filter, `layers[${i}].filter`).filter,
    );
    const lookup = createFilterIndex(data);
    for (const value of [undefined, null, 'road', 'path', 'water', 0, false]) {
      for (const width of [undefined, 1, 3]) {
        const properties = {class: value, classes: ['road'], width};
        const feature = {properties, type: 1};
        const matches = (item) => compiled[item.index]({zoom: 14.5}, feature);
        should(lookup(properties).filter(matches)).eql(data.filter(matches));
      }
    }
  });
});
