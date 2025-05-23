import deepFreeze from 'deep-freeze';
import Feature from 'ol/Feature.js';
import Polygon from 'ol/geom/Polygon.js';
import VectorLayer from 'ol/layer/Vector.js';
import Text from 'ol/style/Text.js';
import should from 'should';
import {
  apply,
  getFeatureState,
  getStyleForLayer,
  recordStyleLayer,
  renderTransparent,
  setFeatureState,
  stylefunction as applyStylefunction,
} from '../src/index.js';
import {getSpriteImageForIcon} from '../src/stylefunction.js';
import states from './fixtures/states.json';

describe('stylefunction', function () {
  describe('OpenLayers Style object creation', function () {
    let feature, layer;
    beforeEach(function () {
      feature = new Feature(
        new Polygon([
          [
            [-1, -1],
            [-1, 1],
            [1, 1],
            [1, -1],
            [-1, -1],
          ],
        ]),
      );
      layer = new VectorLayer();
    });

    afterEach(function () {
      recordStyleLayer(false);
      renderTransparent(false);
    });

    it('does not modify the input style object', function () {
      const style = JSON.parse(JSON.stringify(states));
      style.id = 'states';
      deepFreeze(style);
      should.doesNotThrow(function () {
        applyStylefunction(layer, style, 'states');
      });
    });

    it('does not modify the input style offsets', function (done) {
      const style = {
        version: '8',
        id: 'test',
        name: 'test',
        sprite: '/fixtures/sprites',
        sources: {
          'geojson': {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [0, 0],
                  },
                },
              ],
            },
          },
        },
        layers: [
          {
            id: 'test',
            type: 'symbol',
            source: 'geojson',
            layout: {
              'symbol-placement': 'point',
              'icon-image': 'amenity_firestation',
              'icon-offset': [0, 10],
            },
          },
        ],
      };
      const json = JSON.stringify(style);
      apply(document.createElement('div'), style)
        .then(function (map) {
          map.setSize([100, 100]);
          map.once('rendercomplete', function () {
            try {
              should(JSON.stringify(style)).equal(json);
              done();
            } catch (e) {
              done(e);
            }
          });
        })
        .catch(function (err) {
          done(err);
        });
    });

    it('adds an id to the style object when none is set', function () {
      const style = JSON.parse(JSON.stringify(states));
      style.id = undefined;
      applyStylefunction(layer, style, 'states');
      should.notEqual(style.id, undefined);
    });

    it('creates a style function with all layers of a source', function () {
      const style = applyStylefunction(layer, states, 'states');
      should(style).be.a.Function();
      feature.set('PERSONS', 2000000);
      should(style(feature, 1)).be.an.Array();
      feature.set('PERSONS', 4000000);
      should(style(feature, 1)).be.an.Array();
      feature.set('PERSONS', 6000000);
      should(style(feature, 1)).be.an.Array();
    });

    it('creates a style function with some layers of a source', function () {
      const style = applyStylefunction(layer, states, ['population_lt_2m']);
      should(style).be.a.Function;
      feature.set('PERSONS', 2000000);
      should(style(feature, 1)).be.an.Array();
      feature.set('PERSONS', 4000000);
      should(style(feature, 1)).be.undefined();
      feature.set('PERSONS', 6000000);
      should(style(feature, 1)).be.undefined();
    });

    it('Don not match layer ids to string `sourceOrLayers`', function () {
      const style = applyStylefunction(layer, states, 'population_lt_2m');
      should(style).be.a.Function;
      feature.set('PERSONS', 2000000);
      should(style(feature, 1)).be.undefined();
    });

    it('should handle has and !has', function () {
      const style = applyStylefunction(layer, states, ['has_male']);
      should(style).be.a.Function;
      should(style(feature, 1)).be.undefined();
      feature.set('MALE', 20000);
      should(style(feature, 1)).be.an.Array();
      const style2 = applyStylefunction(layer, states, ['not_has_male']);
      should(style2(feature, 1)).be.undefined();
      feature.unset('MALE');
      should(style2(feature, 1)).be.an.Array();
    });

    it('should handle layer visibility', function () {
      const style = applyStylefunction(layer, states, ['state_names']);
      should(style(feature, 1)).be.undefined();
    });

    it('records the style layer the feature belongs to', function () {
      const style = applyStylefunction(layer, states, [
        'population_lt_2m',
        'population_gt_4m',
      ]);
      recordStyleLayer(true);
      feature.set('PERSONS', 5000000);
      style(feature, 1);
      should(feature.get('mapbox-layer').id).equal('population_gt_4m');
      feature.set('PERSONS', 1000000);
      style(feature, 1);
      should(feature.get('mapbox-layer').id).equal('population_lt_2m');
    });

    it('does not render transparent content by default', function () {
      const styleObject = JSON.parse(JSON.stringify(states));
      styleObject.layers.push({
        'id': 'transparent',
        'type': 'fill',
        'source': 'states',
        'paint': {
          'fill-color': 'rgba(0,0,0,0)',
        },
      });
      const styleFn = applyStylefunction(layer, styleObject, ['transparent']);
      const style = styleFn(feature, 1);
      should(style).be.undefined;
    });

    it('renders transparent content when `renderTransparent(true)` is set', function () {
      const styleObject = JSON.parse(JSON.stringify(states));
      styleObject.layers.push({
        'id': 'transparent',
        'type': 'fill',
        'source': 'states',
        'paint': {
          'fill-color': 'rgba(0,0,0,0)',
        },
      });
      renderTransparent(true);
      const styleFn = applyStylefunction(layer, styleObject, ['transparent']);
      const style = styleFn(feature, 1);
      should(style).be.an.Array();
      should(style[0].getFill().getColor()).eql('transparent');
    });

    it('renders the correct fill color with opacity', function () {
      const styleObject = JSON.parse(JSON.stringify(states));
      styleObject.layers.push({
        'id': 'transparent',
        'type': 'fill',
        'source': 'states',
        'paint': {
          'fill-color': 'rgba(16,234,42,0.5)',
        },
      });
      renderTransparent(true);
      const styleFn = applyStylefunction(layer, styleObject, ['transparent']);
      const style = styleFn(feature, 1);
      should(style).be.an.Array();
      should(style[0].getFill().getColor()).eql('rgba(16,234,42,0.5)');
    });

    it('renders the outline when fill has zero opacity', function () {
      const styleObject = JSON.parse(JSON.stringify(states));
      styleObject.layers.push({
        'id': 'transparent',
        'type': 'fill',
        'source': 'states',
        'paint': {
          'fill-color': 'rgba(16,234,42,0)',
          'fill-outline-color': 'red',
        },
      });
      renderTransparent(false);
      const styleFn = applyStylefunction(layer, styleObject, ['transparent']);
      const style = styleFn(feature, 1);
      should(style).be.an.Array();
      should(style[0].getFill()).eql(null);
      should(style[0].getStroke().getColor()).eql('rgba(255,0,0,1)');
    });

    it('supports feature-state (layer)', function () {
      feature.setId(1);
      const styleObject = JSON.parse(JSON.stringify(states));
      styleObject.layers.push({
        'id': 'red_blue',
        'type': 'fill',
        'source': 'states',
        'paint': {
          'fill-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            'blue',
            'red',
          ],
        },
      });
      const styleFn = applyStylefunction(layer, styleObject, ['red_blue']);
      let style = styleFn(feature, 1);
      should(style).be.an.Array();
      should(style[0].getFill().getColor()).eql('rgba(255,0,0,1)');
      setFeatureState(layer, {source: 'states', id: 1}, {hover: true});
      should(getFeatureState(layer, {source: 'states', id: 1})).eql({
        hover: true,
      });
      style = styleFn(feature, 1);
      should(style[0].getFill().getColor()).eql('rgba(0,0,255,1)');
      setFeatureState(layer, {source: 'states', id: 1}, null);
      style = styleFn(feature, 1);
      should(style[0].getFill().getColor()).eql('rgba(255,0,0,1)');
    });
  });

  describe('Points with labels', function () {
    let style;
    beforeEach(function () {
      style = {
        version: '8',
        name: 'test',
        sources: {
          'geojson': {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [0, 0],
                  },
                  properties: {
                    'name': 'test',
                  },
                },
              ],
            },
          },
        },
        layers: [
          {
            id: 'test',
            type: 'symbol',
            source: 'geojson',
            layout: {
              'symbol-placement': 'point',
              'icon-image': 'donut',
              'text-anchor': 'bottom',
              'text-line-height': 1.2,
              'text-field': '{name}\n',
              'text-font': ['sans-serif'],
              'text-size': 12,
              'text-justify': 'center',
            },
            paint: {
              'text-halo-width': 2,
            },
          },
        ],
      };
    });

    it('calculates correct offsetY', function (done) {
      apply(document.createElement('div'), style)
        .then(function (map) {
          const layer = map.getLayers().item(0);
          const styleFunction = layer.getStyle();
          const feature = layer.getSource().getFeatures()[0];
          const styles = styleFunction(feature, 1);
          const text = styles[0].getText();
          const textHaloWidth = style.layers[0].paint['text-halo-width'];
          const textLineHeight = style.layers[0].layout['text-line-height'];
          const textSize = style.layers[0].layout['text-size'];
          // offsetY is the halo width plus half the distance between two lines
          should(text.getOffsetY()).eql(
            -textHaloWidth - 0.5 * (textLineHeight - 1) * textSize,
          );
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });

    it('trims the label-field', function (done) {
      apply(document.createElement('div'), style)
        .then(function (map) {
          const layer = map.getLayers().item(0);
          const styleFunction = layer.getStyle();
          const feature = layer.getSource().getFeatures()[0];
          const styles = styleFunction(feature, 1);
          const text = styles[0].getText();
          should(text.getText()).eql('test');
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });

    it('Zero width text halo should be no halo', function (done) {
      style.layers[0].paint['text-halo-color'] = 'red';
      style.layers[0].paint['text-halo-width'] = 0;
      apply(document.createElement('div'), style)
        .then(function (map) {
          const layer = map.getLayers().item(0);
          const styleFunction = layer.getStyle();
          const feature = layer.getSource().getFeatures()[0];
          const styles = styleFunction(feature, 1);
          const text = styles[0].getText();
          should(text.getStroke()).be.undefined();
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });
  });

  describe('Declutter mode', function () {
    let style;
    beforeEach(function () {
      style = {
        version: '8',
        name: 'test',
        sprite: '/fixtures/sprites',
        sources: {
          'geojson': {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [0, 0],
                  },
                  properties: {
                    'name': 'test',
                  },
                },
              ],
            },
          },
        },
        layers: [
          {
            id: 'test',
            type: 'symbol',
            source: 'geojson',
            layout: {
              'symbol-placement': 'point',
              'icon-image': 'amenity_firestation',
              'text-anchor': 'bottom',
              'text-line-height': 1.2,
              'text-field': '{name}\n',
              'text-font': ['sans-serif'],
              'text-size': 12,
              'text-justify': 'center',
            },
            paint: {
              'text-halo-width': 2,
              'icon-color': 'rgba(255,255,255,1)',
            },
          },
        ],
      };
    });

    describe('icon decluttering', function () {
      it('sets the declutter-mode "declutter" if not allow-overlap', function (done) {
        style.layers[0].layout['icon-allow-overlap'] = false;
        style.layers[0].layout['icon-ignore-placement'] = false;
        apply(document.createElement('div'), style)
          .then(function (map) {
            const layer = map.getLayers().item(0);
            layer.once('change', () => {
              const styleFunction = layer.getStyle();
              const feature = layer.getSource().getFeatures()[0];
              const styles = styleFunction(feature, 1);
              const image = styles[0].getImage();
              should(image.getDeclutterMode()).eql('declutter');
              done();
            });
          })
          .catch(function (err) {
            done(err);
          });
      });

      it('sets the declutter-mode "declutter" if not allow-overlap even if ignore-placement', function (done) {
        style.layers[0].layout['icon-allow-overlap'] = false;
        style.layers[0].layout['icon-ignore-placement'] = true;
        apply(document.createElement('div'), style)
          .then(function (map) {
            const layer = map.getLayers().item(0);
            layer.once('change', () => {
              const styleFunction = layer.getStyle();
              const feature = layer.getSource().getFeatures()[0];
              const styles = styleFunction(feature, 1);
              const image = styles[0].getImage();
              should(image.getDeclutterMode()).eql('declutter');
              done();
            });
          })
          .catch(function (err) {
            done(err);
          });
      });

      it('sets the declutter-mode "obstacle" if allow-overlap and not ignore-placement', function (done) {
        style.layers[0].layout['icon-allow-overlap'] = true;
        style.layers[0].layout['icon-ignore-placement'] = false;
        apply(document.createElement('div'), style)
          .then(function (map) {
            const layer = map.getLayers().item(0);
            layer.once('change', () => {
              const styleFunction = layer.getStyle();
              const feature = layer.getSource().getFeatures()[0];
              const styles = styleFunction(feature, 1);
              const image = styles[0].getImage();
              should(image.getDeclutterMode()).eql('obstacle');
              done();
            });
          })
          .catch(function (err) {
            done(err);
          });
      });

      it('sets the declutter-mode "none" if allow-overlap and ignore-placement', function (done) {
        style.layers[0].layout['icon-allow-overlap'] = true;
        style.layers[0].layout['icon-ignore-placement'] = true;
        apply(document.createElement('div'), style)
          .then(function (map) {
            const layer = map.getLayers().item(0);
            layer.once('change', () => {
              const styleFunction = layer.getStyle();
              const feature = layer.getSource().getFeatures()[0];
              const styles = styleFunction(feature, 1);
              const image = styles[0].getImage();
              should(image.getDeclutterMode()).eql('none');
              done();
            });
          })
          .catch(function (err) {
            done(err);
          });
      });
    });

    describe('text decluttering', function () {
      if ('getDeclutterMode' in Text.prototype) {
        it('sets the declutter-mode "declutter" if not allow-overlap', function (done) {
          style.layers[0].layout['text-allow-overlap'] = false;
          style.layers[0].layout['text-ignore-placement'] = false;
          apply(document.createElement('div'), style)
            .then(function (map) {
              const layer = map.getLayers().item(0);
              layer.once('change', () => {
                const styleFunction = layer.getStyle();
                const feature = layer.getSource().getFeatures()[0];
                const styles = styleFunction(feature, 1);
                const text = styles[0].getText();
                should(text.getDeclutterMode()).eql('declutter');
                done();
              });
            })
            .catch(function (err) {
              done(err);
            });
        });

        it('sets the declutter-mode "declutter" if not allow-overlap even if ignore-placement', function (done) {
          style.layers[0].layout['text-allow-overlap'] = false;
          style.layers[0].layout['text-ignore-placement'] = true;
          apply(document.createElement('div'), style)
            .then(function (map) {
              const layer = map.getLayers().item(0);
              layer.once('change', () => {
                const styleFunction = layer.getStyle();
                const feature = layer.getSource().getFeatures()[0];
                const styles = styleFunction(feature, 1);
                const text = styles[0].getText();
                should(text.getDeclutterMode()).eql('declutter');
                done();
              });
            })
            .catch(function (err) {
              done(err);
            });
        });

        it('sets the declutter-mode "obstacle" if allow-overlap and not ignore-placement', function (done) {
          style.layers[0].layout['text-allow-overlap'] = true;
          style.layers[0].layout['text-ignore-placement'] = false;
          apply(document.createElement('div'), style)
            .then(function (map) {
              const layer = map.getLayers().item(0);
              layer.once('change', () => {
                const styleFunction = layer.getStyle();
                const feature = layer.getSource().getFeatures()[0];
                const styles = styleFunction(feature, 1);
                const text = styles[0].getText();
                should(text.getDeclutterMode()).eql('obstacle');
                done();
              });
            })
            .catch(function (err) {
              done(err);
            });
        });

        it('sets the declutter-mode "none" if allow-overlap and ignore-placement', function (done) {
          style.layers[0].layout['text-allow-overlap'] = true;
          style.layers[0].layout['text-ignore-placement'] = true;
          apply(document.createElement('div'), style)
            .then(function (map) {
              const layer = map.getLayers().item(0);
              layer.once('change', () => {
                const styleFunction = layer.getStyle();
                const feature = layer.getSource().getFeatures()[0];
                const styles = styleFunction(feature, 1);
                const text = styles[0].getText();
                should(text.getDeclutterMode()).eql('none');
                done();
              });
            })
            .catch(function (err) {
              done(err);
            });
        });
      }
    });
  });

  describe('Icon color with zero opacity', function () {
    let style;
    beforeEach(function () {
      style = {
        version: '8',
        name: 'test',
        sprite: '/fixtures/sprites',
        sources: {
          'geojson': {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [0, 0],
                  },
                  properties: {
                    'name': 'test',
                  },
                },
              ],
            },
          },
        },
        layers: [
          {
            id: 'test',
            type: 'symbol',
            source: 'geojson',
            layout: {
              'symbol-placement': 'point',
              'icon-image': 'amenity_firestation',
              'text-anchor': 'bottom',
              'text-line-height': 1.2,
              'text-field': '{name}\n',
              'text-font': ['sans-serif'],
              'text-size': 12,
              'text-justify': 'center',
            },
            paint: {
              'text-halo-width': 2,
              'icon-color': 'rgba(255,255,255,0)',
            },
          },
        ],
      };
    });

    it('does not create an image style when iconColor opacity is 0', function (done) {
      apply(document.createElement('div'), style)
        .then(function (map) {
          const layer = map.getLayers().item(0);
          layer.once('change', () => {
            const styleFunction = layer.getStyle();
            const feature = layer.getSource().getFeatures()[0];
            const styles = styleFunction(feature, 1);
            const text = styles[0].getText();
            should(text.getText()).eql('test');
            const image = styles[0].getImage();
            should(image).eql(undefined);
            done();
          });
        })
        .catch(function (err) {
          done(err);
        });
    });
  });

  describe('Dynamic images', function () {
    let style;
    beforeEach(function () {
      style = {
        version: '8',
        name: 'test',
        sprite: '/fixtures/sprites',
        sources: {
          'geojson': {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [0, 0],
                  },
                  properties: {
                    'name': 'test',
                  },
                },
              ],
            },
          },
        },
        layers: [
          {
            id: 'test',
            type: 'symbol',
            source: 'geojson',
            layout: {
              'symbol-placement': 'point',
              'icon-image': 'dynamic',
            },
            paint: {
              'icon-color': 'rgba(255,255,255,1)',
            },
          },
        ],
      };
    });

    it('should not create an image style, if getImage returns no image', function (done) {
      function getImage(layer, name) {
        return undefined;
      }
      apply(document.createElement('div'), style, {getImage: getImage})
        .then(function (map) {
          const layer = map.getLayers().item(0);
          layer.once('change', () => {
            const styleFunction = layer.getStyle();
            const feature = layer.getSource().getFeatures()[0];
            const styles = styleFunction(feature, 1);
            should(styles).be.undefined();
            done();
          });
        })
        .catch(function (err) {
          done(err);
        });
    });

    it('should create an image style, if a URL string is returned', function (done) {
      function getImage(layer, name) {
        return '/fixtures/hospital.png';
      }
      apply(document.createElement('div'), style, {getImage: getImage})
        .then(function (map) {
          const layer = map.getLayers().item(0);
          layer.once('change', () => {
            const styleFunction = layer.getStyle();
            const feature = layer.getSource().getFeatures()[0];
            const styles = styleFunction(feature, 1);
            const image = styles[0].getImage();
            should(image.getSrc()).endWith('/fixtures/hospital.png');
            done();
          });
        })
        .catch(function (err) {
          done(err);
        });
    });

    it('should create an image style, when an image is returned after a layer changed', function (done) {
      let elem = undefined;
      function getImage(layer, name) {
        return elem;
      }
      apply(document.createElement('div'), style, {getImage: getImage})
        .then(function (map) {
          const layer = map.getLayers().item(0);
          layer.once('change', () => {
            const styleFunction = layer.getStyle();
            const feature = layer.getSource().getFeatures()[0];
            const styles = styleFunction(feature, 1);
            should(styles).be.undefined();
            layer.once('change', () => {
              // on next change getImage returns an image
              const newstyles = styleFunction(feature, 1);
              const newimage = newstyles[0].getImage();
              should(newimage).not.be.undefined();
              done();
            });
            elem = new Image();
            elem.src = '/fixtures/hospital.png';
            layer.changed();
          });
        })
        .catch(function (err) {
          done(err);
        });
    });

    it('should create an image style, if dynamic HTML image is returned', function (done) {
      const elem = new Image();
      elem.src = '/fixtures/hospital.png';
      function getImage(layer, name) {
        return elem;
      }
      elem.addEventListener('load', function () {
        apply(document.createElement('div'), style, {getImage: getImage})
          .then(function (map) {
            const layer = map.getLayers().item(0);
            layer.once('change', () => {
              const styleFunction = layer.getStyle();
              const feature = layer.getSource().getFeatures()[0];
              const styles = styleFunction(feature, 1);
              const image = styles[0].getImage();
              should(image).not.be.undefined();
              done();
            });
          })
          .catch(function (err) {
            done(err);
          });
      });
    });

    it('should create an image style, if canvas is returned', function (done) {
      function getImage(layer, name) {
        const canvas = document.createElement('canvas');
        canvas.width = 20;
        canvas.height = 20;
        return canvas;
      }
      apply(document.createElement('div'), style, {getImage: getImage})
        .then(function (map) {
          const layer = map.getLayers().item(0);
          layer.once('change', () => {
            const styleFunction = layer.getStyle();
            const feature = layer.getSource().getFeatures()[0];
            const styles = styleFunction(feature, 1);
            const image = styles[0].getImage();
            should(image).not.be.undefined();
            done();
          });
        })
        .catch(function (err) {
          done(err);
        });
    });
  });

  describe('Max angle', function () {
    let style;
    beforeEach(function () {
      style = {
        version: '8',
        name: 'test',
        sources: {
          'geojson': {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'LineString',
                    coordinates: [
                      [0, 0],
                      [1, 1],
                    ],
                  },
                  properties: {
                    'name': 'test',
                  },
                },
              ],
            },
          },
        },
        layers: [
          {
            id: 'test',
            type: 'symbol',
            source: 'geojson',
            layout: {
              'symbol-placement': 'line',
              'text-field': '{name}',
            },
          },
        ],
      };
    });

    it('should set max angle when exists', function (done) {
      style.layers[0].layout['text-max-angle'] = 0;
      apply(document.createElement('div'), style)
        .then(function (map) {
          const layer = map.getLayers().item(0);
          const styleFunction = layer.getStyle();
          const feature = layer.getSource().getFeatures()[0];
          const styles = styleFunction(feature, 1);
          const text = styles[0].getText();
          should(text.getMaxAngle()).eql(0);
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });

    it('should not set max angle when it doesnt exist', function (done) {
      apply(document.createElement('div'), style)
        .then(function (map) {
          const layer = map.getLayers().item(0);
          const styleFunction = layer.getStyle();
          const feature = layer.getSource().getFeatures()[0];
          const styles = styleFunction(feature, 1);
          const text = styles[0].getText();
          should(text.getMaxAngle()).eql(Math.PI / 4);
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });
  });

  describe('Multiple related styles', function () {
    let style;
    beforeEach(function () {
      style = {
        version: '8',
        name: 'test',
        sources: {
          'geojson': {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Polygon',
                    coordinates: [
                      [
                        [-1, -1],
                        [-1, 1],
                        [1, 1],
                        [1, -1],
                        [-1, -1],
                      ],
                    ],
                  },
                },
              ],
            },
          },
        },
        layers: [
          {
            id: 'test',
            type: 'fill',
            source: 'geojson',
            paint: {
              'fill-color': '#A6CEE3',
            },
          },
        ],
      };
    });

    it('returns distinct values for same layer id', function (done) {
      const style1 = JSON.parse(JSON.stringify(style));
      const style2 = JSON.parse(JSON.stringify(style));
      style2.layers[0].paint['fill-color'] = '#B2DF8A';

      Promise.all([
        apply(document.createElement('div'), style1),
        apply(document.createElement('div'), style2),
      ])
        .then(function (maps) {
          const layer1 = maps[0].getLayers().item(0);
          const layer2 = maps[1].getLayers().item(0);
          const styleFunction1 = layer1.getStyle();
          const feature1 = layer1.getSource().getFeatures()[0];
          const styles1 = styleFunction1(feature1, 1);
          const fill1 = styles1[0].getFill();
          should(fill1.getColor()).eql('rgba(166,206,227,1)');
          const styleFunction2 = layer2.getStyle();
          const feature2 = layer2.getSource().getFeatures()[0];
          const styles2 = styleFunction2(feature2, 1);
          const fill2 = styles2[0].getFill();
          should(fill2.getColor()).eql('rgba(178,223,138,1)');
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });
  });

  describe('getStyleForLayer()', function () {
    // create a mapbox style with a geojson source and two layers
    const style = {
      version: '8',
      name: 'test',
      sources: {
        'geojson': {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [-1, -1],
                      [-1, 1],
                      [1, 1],
                      [1, -1],
                      [-1, -1],
                    ],
                  ],
                },
              },
            ],
          },
        },
      },
      layers: [
        {
          id: 'test1',
          type: 'fill',
          source: 'geojson',
          paint: {
            'fill-color': '#A6CEE3',
          },
        },
        {
          id: 'test2',
          type: 'fill',
          source: 'geojson',
          paint: {
            'fill-color': '#B2DF8A',
          },
        },
      ],
    };

    it('returns the style for a layer', function (done) {
      apply(document.createElement('div'), style)
        .then(function (map) {
          const layer = map.getLayers().item(0);
          // use the getStyleForLayer function to get the styles array for the first layer
          // getStyleForLayer takes 4 arguments
          const [style1] = getStyleForLayer(
            layer.getSource().getFeatures()[0],
            1,
            layer,
            'test1',
          );
          should(style1.getFill().getColor()).eql('rgba(166,206,227,1)');
          // same as above fo the 2nd layer
          const [style2] = getStyleForLayer(
            layer.getSource().getFeatures()[0],
            1,
            layer,
            'test2',
          );
          should(style2.getFill().getColor()).eql('rgba(178,223,138,1)');
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });
  });

  describe('getSpriteImageForIcon()', function () {
    const defaultSpriteImage = {
      image: new Image(),
      size: [100, 100],
    };
    const altImage = {
      image: new Image(),
      size: [100, 100],
    };
    const spriteImages = {
      'default': defaultSpriteImage,
      'alt': altImage,
    };
    it('returns the image for an icon from the default sprite', function () {
      const image = getSpriteImageForIcon('firestation', spriteImages);
      should(image).eql(defaultSpriteImage);
    });
    it('returns the image for an icon from the alt sprite', function () {
      const image = getSpriteImageForIcon('alt:firestation', spriteImages);
      should(image).eql(altImage);
    });
  });
});
