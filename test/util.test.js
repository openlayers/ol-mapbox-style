import Map from 'ol/Map.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import brightV9 from 'mapbox-gl-styles/styles/bright-v9.json';
import should from 'should';
import {Feature} from 'ol';
import {Polygon} from 'ol/geom.js';
import {
  addMapboxLayer,
  fetchResource,
  getLayer,
  getLayers,
  getMapboxLayer,
  getSource,
  getTileJson,
  removeMapboxLayer,
  updateMapboxLayer,
} from '../src/util.js';
import {apply} from '../src/apply.js';

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
        metadataNotPending
      );
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
        metadataPending
      );
      should('request' in metadataPending).true();
      should(metadataPending.request).equal(metadataNotPending.request);
      done();
    });
  });
  describe('getTileJson', function () {
    it('resolves mapbox:// tile urls properly', function (done) {
      getTileJson(
        {
          url: 'mapbox://mapbox.mapbox-streets-v7',
          type: 'vector',
        },
        '',
        {accessToken: 'mytoken'}
      )
        .then(function (tilejson) {
          should(tilejson.tiles).eql([
            'https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/{z}/{x}/{y}.vector.pbf?access_token=mytoken',
            'https://b.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/{z}/{x}/{y}.vector.pbf?access_token=mytoken',
            'https://c.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/{z}/{x}/{y}.vector.pbf?access_token=mytoken',
            'https://d.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/{z}/{x}/{y}.vector.pbf?access_token=mytoken',
          ]);
          done();
        })
        .catch(done);
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
              .indexOf('landuse_park')
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

    it('adds a mapbox layer at the end of the layer stack', function () {
      const layer = getLayer(map, 'landuse_park');
      const oldRevision = layer.getRevision();
      addMapboxLayer(
        map,
        {
          id: 'inserted',
          source: 'mapbox',
        },
        'landuse_park'
      );
      should.notEqual(getMapboxLayer(map, 'inserted'), undefined);
      should.notEqual(layer.get('mapbox-layers').indexOf('inserted'), -1);
      should.equal(layer.getRevision(), oldRevision + 1);
    });
  });

  describe('updateMapboxLayer', function () {
    let target;
    beforeEach(function () {
      target = document.createElement('div');
    });

    it('updates a mapbox layer', function (done) {
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
        .catch(function (error) {
          done(error);
        });
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
        .catch(function (error) {
          done(error);
        });
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
            'landuse_park'
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
        .catch(function (error) {
          done(error);
        });
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
        .catch(function (error) {
          done(error);
        });
    });
  });
});
