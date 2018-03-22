import should from 'should/as-function';
import deepFreeze from 'deep-freeze';
import applyStyleFunction from '../stylefunction';
import states from './data/states.json';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import Polygon from 'ol/geom/Polygon';

describe('mapbox-to-ol-style', function() {

  let feature, layer;
  beforeEach(function() {
    feature = new Feature(new Polygon([[[-1, -1], [-1, 1], [1, 1], [1, -1], [-1, -1]]]));
    layer = new VectorLayer();
  });

  it('does not modify the input style object', function() {
    const style = JSON.parse(JSON.stringify(states));
    deepFreeze(style);
    should.doesNotThrow(function() {
      applyStyleFunction(layer, style, 'states');
    });
  });

  it('creates a style function with all layers of a source', function() {
    const style = applyStyleFunction(layer, states, 'states');
    should(style).be.a.Function();
    feature.set('PERSONS', 2000000);
    should(style(feature, 1)).be.an.Array();
    feature.set('PERSONS', 4000000);
    should(style(feature, 1)).be.an.Array();
    feature.set('PERSONS', 6000000);
    should(style(feature, 1)).be.an.Array();
  });

  it('creates a style function with some layers of a source', function() {
    const style = applyStyleFunction(layer, states, ['population_lt_2m']);
    should(style).be.a.Function;
    feature.set('PERSONS', 2000000);
    should(style(feature, 1)).be.an.Array();
    feature.set('PERSONS', 4000000);
    should(style(feature, 1)).be.undefined();
    feature.set('PERSONS', 6000000);
    should(style(feature, 1)).be.undefined();
  });

  it('should handle has and !has', function() {
    const style = applyStyleFunction(layer, states, ['has_male']);
    should(style).be.a.Function;
    should(style(feature, 1)).be.undefined();
    feature.set('MALE', 20000);
    should(style(feature, 1)).be.an.Array();
    const style2 = applyStyleFunction(layer, states, ['not_has_male']);
    should(style2(feature, 1)).be.undefined();
    feature.unset('MALE');
    should(style2(feature, 1)).be.an.Array();
  });

  it('should handle layer visibility', function() {
    const style = applyStyleFunction(layer, states, ['state_names']);
    should(style(feature, 1)).be.undefined();
  });

});
