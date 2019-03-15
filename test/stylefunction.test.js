import should from 'should';
import deepFreeze from 'deep-freeze';
import applyStyleFunction from '../stylefunction';
import olms from '../index';
import states from './fixtures/states.json';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import Polygon from 'ol/geom/Polygon';

describe('stylefunction', function() {

  describe('OpenLayers Style object creation', function() {
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

  describe('Points with labels', function() {

    let style;
    beforeEach(function() {
      style = {
        version: '8',
        name: 'test',
        sources: {
          'geojson': {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [0, 0]
                },
                properties: {
                  'name': 'test'
                }
              }]
            }
          }
        },
        layers: [{
          id: 'test',
          type: 'symbol',
          source: 'geojson',
          layout: {
            'symbol-placement': 'point',
            'icon-image': 'donut',
            'text-anchor': 'bottom',
            'text-line-height': 1.2,
            'text-field': '{name}',
            'text-font': ['sans-serif'],
            'text-size': 12,
            'text-justify': 'center'
          },
          paint: {
            'text-halo-width': 2
          }
        }]
      };
    });

    it('calculates correct offsetY', function(done) {
      olms(document.createElement('div'), style).then(function(map) {
        const layer = map.getLayers().item(0);
        const styleFunction = layer.getStyle();
        const feature = layer.getSource().getFeatures()[0];
        const styles = styleFunction(feature, 1);
        const text = styles[0].getText();
        const textHaloWidth = style.layers[0].paint['text-halo-width'];
        const textLineHeight = style.layers[0].layout['text-line-height'];
        const textSize = style.layers[0].layout['text-size'];
        // offsetY is the halo width plus half the distance between two lines
        should(text.getOffsetY()).eql(-textHaloWidth - (0.5 * (textLineHeight - 1)) * textSize);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('Max angle', function() {
    let style;
    beforeEach(function() {
      style = {
        version: '8',
        name: 'test',
        sources: {
          'geojson': {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: [[0, 0], [1, 1]]
                },
                properties: {
                  'name': 'test'
                }
              }]
            }
          }
        },
        layers: [{
          id: 'test',
          type: 'symbol',
          source: 'geojson',
          layout: {
            'symbol-placement': 'line',
            'text-field': '{name}'
          }
        }]
      };
    });

    it('should set max angle when exists', function(done) {
      style.layers[0].layout['text-max-angle'] = 0;
      olms(document.createElement('div'), style).then(function(map) {
        const layer = map.getLayers().item(0);
        const styleFunction = layer.getStyle();
        const feature = layer.getSource().getFeatures()[0];
        const styles = styleFunction(feature, 1);
        const text = styles[0].getText();
        should(text.getMaxAngle()).eql(0);
        done();
      }).catch(function(err) {
        done(err);
      });
    });

    it('should not set max angle when it doesnt exist', function(done) {
      olms(document.createElement('div'), style).then(function(map) {
        const layer = map.getLayers().item(0);
        const styleFunction = layer.getStyle();
        const feature = layer.getSource().getFeatures()[0];
        const styles = styleFunction(feature, 1);
        const text = styles[0].getText();
        should(text.getMaxAngle()).eql(Math.PI / 4);
        done();
      }).catch(function(err) {
        done(err);
      });
    });
  });
});
