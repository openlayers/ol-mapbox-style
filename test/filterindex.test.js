import Feature from 'ol/Feature.js';
import {fromExtent} from 'ol/geom/Polygon.js';
import should from 'should';
import {apply, getLayer, updateMapboxLayer} from '../src/apply.js';
import {createCandidateLayerLookup} from '../src/filterindex.js';

describe('createCandidateLayerLookup', function () {
  it('selects candidate layers in style order', function () {
    const layers = [
      undefined,
      ['==', 'class', 'road'],
      ['==', 'class', 'water'],
      ['in', 'class', 'road', 'path'],
      ['>', 'width', 5],
    ].map((filter, index) => ({layer: {filter}, index}));
    const getCandidateLayers = createCandidateLayerLookup(layers);
    should(getCandidateLayers({class: 'road'})).eql([
      layers[0],
      layers[1],
      layers[3],
      layers[4],
    ]);
    should(getCandidateLayers({class: 'water'})).eql([
      layers[0],
      layers[2],
      layers[4],
    ]);
    should(getCandidateLayers({})).eql([layers[0], layers[4]]);
  });

  it('uses updated layer filters', async function () {
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
    await updateMapboxLayer(map, {
      ...style.layers[1],
      filter: ['==', 'kind', 'road'],
    });
    const feature = new Feature(fromExtent([0, 0, 1, 1]));
    feature.set('kind', 'road');
    const styles = getLayer(map, 'road').getStyleFunction()(feature, 1);
    should(styles.map((style) => style.getZIndex())).eql([0, 1]);
    map.dispose();
  });
});
