import Map from 'ol/Map.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import brightV9 from 'mapbox-gl-styles/styles/bright-v9.json';
import should from 'should';
import {Feature} from 'ol';
import {Polygon} from 'ol/geom.js';
import {
  addMapboxLayer,
  apply,
  getLayer,
  getLayers,
  getMapboxLayer,
  getSource,
  removeMapboxLayer,
  setupVectorSource,
  updateMapboxLayer,
  updateMapboxSource,
} from '../src/apply.js';
import {fetchResource} from '../src/util.js';

describe('util', function () {
  describe('fetchResource', function () {
    it('allows to transform requests with the transformRequest option', function (done) {
      fetchResource('Sprite', 'my://resource', {
        transformRequest: function (url, resourceType) {
          should(url).equal('my://resource');
          should(resourceType).equal('Sprite');
          return new Request('/fixtures/sprites.json');
        },
      }).then(function (sprite) {
        should(typeof sprite.accommodation_camping).equal('object');
        done();
      });
    });
    it('adds the request to the metadata for both pending and new requests', function (done) {
      const metadataNotPending = {};
      const metadataPending = {};
      Promise.all([
        fetchResource(
          'Sprite',
          'my://resource',
          {
            transformRequest: function (url, resourceType) {
              should(url).equal('my://resource');
              should(resourceType).equal('Sprite');
              return new Request('/fixtures/sprites.json');
            },
          },
          metadataNotPending,
        ),
        fetchResource(
          'Sprite',
          'my://resource',
          {
            transformRequest: function (url, resourceType) {
              should(url).equal('my://resource');
              should(resourceType).equal('Sprite');
              return new Request('/fixtures/sprites.json');
            },
          },
          metadataPending,
        ),
      ])
        .then(() => {
          should('request' in metadataPending).true();
          should(metadataPending.request).equal(metadataNotPending.request);
          done();
        })
        .catch((err) => done(err));
    });
  });
  describe('getTileJson', function () {
    it('resolves mapbox:// tile urls properly', function (done) {
      setupVectorSource(
        {
          url: 'mapbox://mapbox.mapbox-streets-v7',
          type: 'vector',
        },
        location.href + '?getTileJson',
        {
          accessToken: 'mytoken',
        },
      )
        .then(function (source) {
          const url = source.getTileUrlFunction()([0, 0, 0]);
          should(url).eql(
            'https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/0/0/0.vector.pbf?access_token=mytoken',
          );
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('getLayer', function () {
    let target;
    beforeEach(function () {
      target = document.createElement('div');
    });

    it('returns a layer', function (done) {
      apply(target, brightV9)
        .then(function (map) {
          // add another layer that has no 'mapbox-layers' set
          map.addLayer(new VectorTileLayer());
          should(
            getLayer(map, 'landuse_park')
              .get('mapbox-layers')
              .indexOf('landuse_park'),
          ).equal(1);
          done();
        })
        .catch(function (error) {
          done(error);
        });
    });
  });

  describe('getLayers', function () {
    let target;
    beforeEach(function () {
      target = document.createElement('div');
    });

    it('returns an array of layers', function (done) {
      apply(target, brightV9)
        .then(function (map) {
          // add another layer that has no 'mapbox-layers' set
          map.addLayer(new VectorTileLayer());
          const layers = getLayers(map, 'mapbox');
          should(layers).be.an.instanceOf(Array);
          should(layers[0]).be.an.instanceOf(VectorTileLayer);
          should(getLayers(map, 'mapbo').length).eql(0);
          done();
        })
        .catch(function (error) {
          done(error);
        });
    });
  });

  describe('getSource', function () {
    let target;
    beforeEach(function () {
      target = document.createElement('div');
    });

    it('returns a source', function (done) {
      apply(target, brightV9)
        .then(function (map) {
          // add another layer that has no 'mapbox-source' set
          map.addLayer(new VectorTileLayer());
          should(getSource(map, 'mapbox')).be.an.instanceOf(VectorTileSource);
          should(getSource(map, 'mapbo')).be.undefined();
          done();
        })
        .catch(function (error) {
          done(error);
        });
    });
  });

  describe('getMapboxLayer', function () {
    let target;
    beforeEach(function () {
      target = document.createElement('div');
    });

    it('returns a mapbox layer', function (done) {
      apply(target, brightV9)
        .then(function (map) {
          should(getMapboxLayer(map, 'landuse_park').id).eql('landuse_park');
          done();
        })
        .catch(function (error) {
          done(error);
        });
    });
  });

  describe('addMapboxLayer', function (done) {
    let map;
    beforeEach(function (done) {
      const target = document.createElement('div');
      map = new Map({
        target: target,
      });
      apply(map, JSON.parse(JSON.stringify(brightV9))).then(() => done());
    });
    afterEach(function () {
      map.setTarget(null);
    });

    it('adds a mapbox layer before a specific layer', function (done) {
      const layer = getLayer(map, 'landuse_park');
      should.equal(layer.get('mapbox-layers').indexOf('landuse_park'), 1);
      should.equal(
        map
          .get('mapbox-style')
          .layers.findIndex((l) => l.id === 'landuse_park'),
        2,
      );
      const oldRevision = layer.getRevision();
      addMapboxLayer(
        map,
        {
          id: 'inserted',
          source: 'mapbox',
        },
        'landuse_park',
      )
        .then(() => {
          should.deepEqual(getMapboxLayer(map, 'inserted'), {
            id: 'inserted',
            source: 'mapbox',
          });
          should.equal(layer.get('mapbox-layers').indexOf('landuse_park'), 2);
          should.equal(
            map
              .get('mapbox-style')
              .layers.findIndex((l) => l.id === 'landuse_park'),
            3,
          );
          should.equal(layer.get('mapbox-layers').indexOf('inserted'), 1);
          should.equal(
            map
              .get('mapbox-style')
              .layers.findIndex((l) => l.id === 'inserted'),
            2,
          );
          should.equal(layer.getRevision(), oldRevision + 1);
          done();
        })
        .catch((err) => done(err));
    });

    it('adds a mapbox layer at the end of the layer stack', function (done) {
      const layer = getLayer(map, 'country_label_1');
      addMapboxLayer(map, {
        id: 'inserted',
        source: 'mapbox',
      })
        .then(() => {
          should.equal(
            map
              .get('mapbox-style')
              .layers.findIndex((l) => l.id === 'inserted'),
            map.get('mapbox-style').layers.length - 1,
          );
          should.equal(
            layer.get('mapbox-layers').indexOf('inserted'),
            layer.get('mapbox-layers').length - 1,
          );
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('addMapboxLayer with multiple sources', function (done) {
    let map;
    beforeEach(function (done) {
      const target = document.createElement('div');
      map = new Map({
        target: target,
      });
      apply(map, {
        version: 8,
        sources: {
          source1: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {type: 'Point', coordinates: [0, 0]},
                },
              ],
            },
          },
          source2: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: {type: 'Point', coordinates: [16, 48]},
                },
              ],
            },
          },
        },
        layers: [
          {
            id: 'layer1',
            source: 'source1',
            type: 'circle',
          },
          {
            id: 'layer2',
            source: 'source2',
            type: 'circle',
          },
        ],
      })
        .then(() => done())
        .catch((err) => done(err));
    });
    afterEach(function () {
      map.setTarget(null);
    });

    it('adds a mapbox layer at the beginning of the layer stack', function (done) {
      addMapboxLayer(
        map,
        {
          id: 'inserted',
          source: 'source1',
        },
        'layer1',
      )
        .then(() => {
          const layer = getLayer(map, 'inserted');
          should.equal(
            map
              .get('mapbox-style')
              .layers.findIndex((l) => l.id === 'inserted'),
            0,
          );
          should.equal(layer.get('mapbox-layers').indexOf('inserted'), 0);
          done();
        })
        .catch((err) => done(err));
    });

    it('adds layers between sources - next layer', function (done) {
      addMapboxLayer(
        map,
        {
          id: 'inserted',
          source: 'source1',
        },
        'layer2',
      )
        .then(() => {
          const layer = getLayer(map, 'inserted');
          should.equal(map.getLayers().getArray().indexOf(layer), 0);
          should.equal(
            map
              .get('mapbox-style')
              .layers.findIndex((l) => l.id === 'inserted'),
            1,
          );
          should.equal(layer.get('mapbox-layers').indexOf('inserted'), 1);
          done();
        })
        .catch((err) => done(err));
    });

    it('adds layers between sources - previous layer', function (done) {
      addMapboxLayer(
        map,
        {
          id: 'inserted',
          source: 'source2',
        },
        'layer2',
      )
        .then(() => {
          const layer = getLayer(map, 'inserted');
          should.equal(map.getLayers().getArray().indexOf(layer), 1);
          should.equal(
            map
              .get('mapbox-style')
              .layers.findIndex((l) => l.id === 'inserted'),
            1,
          );
          should.equal(layer.get('mapbox-layers').indexOf('inserted'), 0);
          done();
        })
        .catch((err) => done(err));
    });

    it('appends an OpenLayers layer for a Mapbox layer', function (done) {
      addMapboxLayer(map, {
        id: 'inserted',
        source: 'source1',
        type: 'circle',
      })
        .then(() => {
          const layer = getLayer(map, 'inserted');
          should(layer).be.instanceOf(VectorLayer);
          should.equal(map.getLayers().getArray().length, 3);
          should.deepEqual(layer.get('mapbox-layers'), ['inserted']);
          should.equal(map.getLayers().getArray().indexOf(layer), 2);
          should.equal(layer.getVisible(), true);
          done();
        })
        .catch((err) => done(err));
    });

    it('inserts an OpenLayers layer for a Mapbox layer', function (done) {
      map.get('mapbox-style').sources.source3 = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {type: 'Point', coordinates: [3, 60]},
            },
          ],
        },
      };
      addMapboxLayer(
        map,
        {
          id: 'inserted',
          source: 'source3',
        },
        'layer2',
      )
        .then(() => {
          const layer = getLayer(map, 'inserted');
          should(layer).be.instanceOf(VectorLayer);
          should.equal(map.getLayers().getArray().length, 3);
          should.deepEqual(layer.get('mapbox-layers'), ['inserted']);
          should.equal(map.getLayers().getArray().indexOf(layer), 1);
          should.equal(layer.getVisible(), true);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('updateMapboxSource', function () {
    let map, target, source1, source2, source3;
    beforeEach(function () {
      target = document.createElement('div');
      map = new Map({target: target});
      source1 = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {type: 'Point', coordinates: [1, 1]},
            },
          ],
        },
      };
      source2 = {
        type: 'vector',
        tiles: ['http://example.com/{z}/{x}/{y}.pbf'],
      };
      source3 = {
        type: 'raster',
        tiles: ['http://example.com/{z}/{x}/{y}.png'],
      };
      return apply(map, {
        version: 8,
        sources: {
          source1: source1,
          source2: source2,
          source3: source3,
        },
        layers: [
          {
            id: 'layer1',
            source: 'source1',
            type: 'circle',
          },
          {
            id: 'layer2',
            source: 'source2',
            'source-layer': 'layer2',
            type: 'circle',
          },
          {
            id: 'layer3',
            source: 'source3',
            type: 'raster',
          },
        ],
      });
    });
    it('updates a geojson source', function (done) {
      should(getSource(map, 'source1').getFeatures()[0].get('modified')).eql(
        undefined,
      );
      source1.data.features[0].properties.modified = true;
      updateMapboxSource(map, 'source1', source1).then(function () {
        try {
          const source = getSource(map, 'source1');
          should(source).eql(getLayer(map, 'layer1').getSource());
          should(source.getFeatures()[0].get('modified')).eql(true);
          should();
          done();
        } catch (err) {
          done(err);
        }
      });
    });
    it('updates a vector source', function (done) {
      should(getSource(map, 'source2').getUrls()[0]).eql(
        'http://example.com/{z}/{x}/{y}.pbf',
      );
      source2.tiles[0] = 'http://example.com/{z}/{x}/{y}.mvt';
      updateMapboxSource(map, 'source2', source2).then(function () {
        try {
          const source = getSource(map, 'source2');
          should(source).eql(getLayer(map, 'layer2').getSource());
          should(source.getUrls()[0]).eql('http://example.com/{z}/{x}/{y}.mvt');
          done();
        } catch (err) {
          done(err);
        }
      });
    });
    it('updates a raster source', function (done) {
      should(getSource(map, 'source3').getTileUrlFunction()([0, 0, 0])).eql(
        'http://example.com/0/0/0.png',
      );
      source3.tiles[0] = 'http://example.com/{z}/{x}/{y}.jpg';
      updateMapboxSource(map, 'source3', source3).then(function () {
        try {
          const source = getSource(map, 'source3');
          should(source).eql(getLayer(map, 'layer3').getSource());
          should(source.getTileUrlFunction()([0, 0, 0])).eql(
            'http://example.com/0/0/0.jpg',
          );
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  });

  describe('updateMapboxLayer', function () {
    let target;
    beforeEach(function () {
      target = document.createElement('div');
    });

    it('updates a geojson source', function (done) {
      apply(target, JSON.parse(JSON.stringify(brightV9)))
        .then(function (map) {
          // add another layer that has no 'mapbox-layers' set
          map.addLayer(new VectorTileLayer());
          const layer = getMapboxLayer(map, 'landuse_park');
          layer.paint['fill-color'] = 'red';
          updateMapboxLayer(map, layer);
          const getStyle = getLayer(map, 'landuse_park').getStyle();
          const feature = new Feature({
            geometry: new Polygon([
              [
                [0, 0],
                [0, 1],
                [1, 1],
                [1, 0],
                [0, 0],
              ],
            ]),
            layer: 'landuse',
            class: 'park',
          });
          let styles = getStyle(feature, 1);
          should(styles[0].getFill().getColor()).eql('rgba(255,0,0,1)');
          layer.paint['fill-color'] = 'blue';
          updateMapboxLayer(map, layer);
          styles = getStyle(feature, 1);
          should(styles[0].getFill().getColor()).eql('rgba(0,0,255,1)');
          done();
        })
        .catch((err) => done(err));
    });

    it('updates a mapbox layer with a new object', function (done) {
      apply(target, JSON.parse(JSON.stringify(brightV9)))
        .then(function (map) {
          // add another layer that has no 'mapbox-layers' set
          map.addLayer(new VectorTileLayer());
          const layer = JSON.parse(
            JSON.stringify(getMapboxLayer(map, 'landuse_park')),
          );
          layer.paint['fill-color'] = 'red';
          updateMapboxLayer(map, layer);
          const getStyle = getLayer(map, 'landuse_park').getStyle();
          const feature = new Feature({
            geometry: new Polygon([
              [
                [0, 0],
                [0, 1],
                [1, 1],
                [1, 0],
                [0, 0],
              ],
            ]),
            layer: 'landuse',
            class: 'park',
          });
          const styles = getStyle(feature, 1);
          should(styles[0].getFill().getColor()).eql('rgba(255,0,0,1)');
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('removeMapboxLayer', function () {
    let target;
    beforeEach(function () {
      target = document.createElement('div');
    });

    it('removes a mapbox layer', function (done) {
      apply(target, JSON.parse(JSON.stringify(brightV9)))
        .then(function (map) {
          const layer = getLayer(map, 'landuse_park');
          const oldRevision = layer.getRevision();
          const mapboxLayer = getMapboxLayer(map, 'landuse_park');
          removeMapboxLayer(map, mapboxLayer);
          should.equal(getMapboxLayer(map, 'landuse_park'), undefined);
          should.equal(layer.get('mapbox-layers').indexOf('landuse_park'), -1);
          should.equal(layer.getRevision(), oldRevision + 1);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('add-update-remove Mapbox layer', function () {
    let target;
    beforeEach(function () {
      target = document.createElement('div');
    });
    it('adds, updates and removes a mapbox layer', function (done) {
      apply(target, JSON.parse(JSON.stringify(brightV9)))
        .then(function (map) {
          addMapboxLayer(
            map,
            {
              id: 'inserted',
              source: 'mapbox',
              type: 'fill',
              filter: ['==', 'class', 'inserted'],
              paint: {
                'fill-color': 'red',
              },
            },
            'landuse_park',
          );
          should(getLayer(map, 'inserted')).eql(getLayer(map, 'landuse_park'));
          let getStyle = getLayer(map, 'inserted').getStyle();
          const feature = new Feature({
            geometry: new Polygon([
              [
                [0, 0],
                [0, 1],
                [1, 1],
                [1, 0],
                [0, 0],
              ],
            ]),
            class: 'inserted',
          });
          let styles = getStyle(feature, 1);
          should(styles[0].getFill().getColor()).eql('rgba(255,0,0,1)');

          const inserted = getMapboxLayer(map, 'inserted');
          inserted.paint['fill-color'] = 'blue';
          updateMapboxLayer(map, inserted);
          getStyle = getLayer(map, 'inserted').getStyle();
          styles = getStyle(feature, 1);
          should(styles[0].getFill().getColor()).eql('rgba(0,0,255,1)');
          removeMapboxLayer(map, inserted);
          should(getLayer(map, 'inserted')).eql(undefined);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe('manageVisibility', function () {
    let target;
    beforeEach(function () {
      target = document.createElement('div');
    });

    it('manages layer visibility', function (done) {
      apply(target, JSON.parse(JSON.stringify(brightV9)))
        .then(function (map) {
          const layer = getLayer(map, 'landuse_park');
          should.equal(layer.getVisible(), true);

          const landuseParkLayer = getMapboxLayer(map, 'landuse_park');
          const mapboxSource = landuseParkLayer.source;
          const mapboxLayers = map
            .get('mapbox-style')
            .layers.filter((layer) => layer.source == mapboxSource);
          mapboxLayers.forEach((mapboxLayer) => {
            mapboxLayer.layout = Object.assign(mapboxLayer.layout || {}, {
              visibility: 'none',
            });
            updateMapboxLayer(map, mapboxLayer);
          });
          should.equal(layer.getVisible(), false);
          landuseParkLayer.layout.visibility = 'visible';
          updateMapboxLayer(map, landuseParkLayer);
          should.equal(layer.getVisible(), true);
          done();
        })
        .catch((err) => done(err));
    });
  });
});
