import should from 'should';
import 'should-approximately-deep';
import olms, {applyBackground, apply, getLayer, getSource} from '../';
import Map from 'ol/Map';
import TileSource from 'ol/source/Tile';
import VectorSource from 'ol/source/Vector';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import {toLonLat} from 'ol/proj';

import 'isomorphic-fetch';
import nock from 'nock';

import WmsJson from '../example/data/wms.json';
import GeoJson from '../example/data/geojson.json';
import GeoJsonInline from '../example/data/geojson-inline.json';
import TileJson from '../example/data/tilejson.json';
import brightV9 from 'mapbox-gl-styles/styles/bright-v9.json';
delete brightV9.sprite;

describe('ol-mapbox-style', function() {

  beforeEach(function() {
    // setup the style doc as a nock
    nock('http://dummy')
      .defaultReplyHeaders({'access-control-allow-origin': '*'})
      .get('/hot-osm.json')
      .replyWithFile(200, __dirname + '/fixtures/hot-osm/hot-osm.json')
      .get('/wms.json')
      .reply(200, WmsJson)
      .get('/geojson.json')
      .reply(200, GeoJson)
      .get('/geojson-inline.json')
      .reply(200, Object.assign({}, GeoJsonInline, {sprite: 'http://dummy/sprite'}))
      .get('/sprite.png')
      .reply(200, '')
      .get('/sprite.json')
      .reply(200, {'not-empty': {}})
      .get('/tilejson.json')
      .reply(200, TileJson);
    nock('https://osm-lambda.tegola.io/')
      .defaultReplyHeaders({'access-control-allow-origin': '*'})
      .get('/v1/capabilities/osm.json')
      .replyWithFile(200, __dirname + '/fixtures/hot-osm/osm.json');
    nock('https://go-spatial.github.io/')
      .defaultReplyHeaders({'access-control-allow-origin': '*'})
      .get('/carto-assets/spritesets/osm_tegola_spritesheet.json')
      .replyWithFile(200, __dirname + '/fixtures/hot-osm/osm_tegola_spritesheet.json')
      .get('/carto-assets/spritesets/osm_tegola_spritesheet')
      .replyWithFile(200, __dirname + '/fixtures/hot-osm/osm_tegola_spritesheet.png')
      .get('/carto-assets/spritesets/osm_tegola_spritesheet@2x.json')
      .replyWithFile(200, __dirname + '/fixtures/hot-osm/osm_tegola_spritesheet@2x.json')
      .get('/carto-assets/spritesets/osm_tegola_spritesheet@2x.png')
      .replyWithFile(200, __dirname + '/fixtures/hot-osm/osm_tegola_spritesheet@2x.png');
  });

  afterEach(nock.cleanAll);

  describe('olms', function() {

    let target;

    beforeEach(function() {
      target = document.createElement('div');
    });

    it('returns a promise which resolves with an ol.Map as argument', function(done) {
      olms(target, 'http://dummy/hot-osm.json')
        .then(function(map) {
          should(map).be.instanceof(Map);
          map.setTarget(undefined);
          done();
        })
        .catch(function(error) {
          done(error);
        });
    });

    it('rejects when a TileJSON url is invalid', function(done) {
      nock.cleanAll();
      nock('http://dummy')
        .defaultReplyHeaders({'access-control-allow-origin': '*'})
        .get('/hot-osm.json')
        .replyWithFile(200, __dirname + '/fixtures/hot-osm/hot-osm.json');
      nock('https://osm-lambda.tegola.io/')
        .defaultReplyHeaders({'access-control-allow-origin': '*'})
        .get('/v1/capabilities/osm.json')
        .reply(500, {});

      olms(target, 'http://dummy/hot-osm.json')
        .then(function(map) {
          should(map).be.instanceof(Map);
          done(new Error('Should not resolve'));
        })
        .catch(function(err) {
          should(err.message).be.exactly('Error accessing data for source osm');
          done();
        });
    });


  });

  describe('applyBackground', function() {
    it('applies a background to a map container', function() {
      const target = document.createElement('div');
      target.style.width = target.style.height = '100px';
      const map = new Map({target: target});
      applyBackground(map, brightV9);
      should(target.style.backgroundColor).be.exactly('rgb(248, 244, 240)');
    });
  });

  describe('apply', function() {

    let target;
    beforeEach(function() {
      target = document.createElement('div');
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('returns a map instance and adds a layer with a style function', function(done) {
      const map = apply(target, brightV9);
      should(map).be.instanceof(Map);

      map.getLayers().once('add', function() {
        should(map.getLayers().item(0).getStyle()).be.a.Function();
        done();
      });
    });

    it('handles raster sources', function(done) {
      const map = apply(target, 'http://dummy/wms.json');

      let count = 0;
      map.getLayers().on('add', function() {
        ++count;
        if (count == 2) {
          const osm = map.getLayers().item(0);
          const wms = map.getLayers().item(1);
          should(osm.get('mapbox-layers')).eql(['osm']);
          should(wms.get('mapbox-layers')).eql(['states-wms']);
          should(osm.getSource().getUrls()).eql([
            'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
          ]);
          should(osm.getSource().getAttributions()()[0]).equal(
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.');
          should(wms.getSource().getTileGrid().getTileSize()).eql(256);
          should(wms.getSource().getTileGrid().getMaxZoom()).eql(12);
          done();
        }
      }, 200);
    });

    it('handles geojson sources', function(done) {
      const map = apply(target, 'http://dummy/geojson.json');
      map.getLayers().once('add', function(e) {
        const layer = e.element;
        const source = layer.getSource();
        should(source).be.instanceof(VectorSource);
        should(layer.getStyle()).be.a.Function();
        done();
      });
    });

    it('handles geojson sources with inline GeoJSON', function(done) {
      const map = new Map({target: target});
      map.getLayers().once('add', function(e) {
        const layer = e.element;
        const source = layer.getSource();
        should(source).be.instanceof(VectorSource);
        should(source.getFeatures()).have.length(100);
        should(layer.getStyle()).be.a.Function();
        done();
      });

      apply(map, 'http://dummy/geojson-inline.json');
    });

    it('handles raster sources from TileJSON', function(done) {
      const map = apply(target, 'http://dummy/tilejson.json');
      map.getLayers().once('add', function(e) {
        const source = e.element.getSource();
        should(source).be.instanceof(TileSource);
        source.once('change', function() {
          const tileGrid = source.getTileGrid();
          should(tileGrid.getMaxZoom()).equal(8);
          done();
        });
      });
    });

    it('handles vector sources from TileJSON', function(done) {

      olms(target, 'http://dummy/hot-osm.json')
        .then(function(map) {
          should(toLonLat(map.getView().getCenter())).be.approximatelyDeep([8.54806714892635, 47.37180823552663], 1e-8);
          should(map.getView().getZoom()).equal(12.241790506353492);
          const layer = map.getLayers().item(0);
          const source = layer.getSource();
          should(source).be.instanceof(VectorTileSource);
          should(layer.getStyle()).be.a.Function();
          done();
        }).catch(function(err) {
          done(err);
        });
    });

    it('handles visibility for raster layers', function(done) {
      const context = {
        'version': 8,
        'name': 'states-wms',
        'sources': {
          'states': {
            'type': 'raster',
            'maxzoom': 12,
            'tileSize': 256,
            'tiles': ['https://ahocevar.com/geoserver/gwc/service/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&SRS=EPSG:900913&LAYERS=topp:states&STYLES=&WIDTH=256&HEIGHT=256&BBOX={bbox-epsg-3857}']
          }
        },
        'layers': [
          {
            'id': 'states-wms',
            'source': 'states',
            'layout': {
              'visibility': 'none'
            }
          }
        ]
      };
      olms(target, context)
        .then(function(map) {
          should(map.getLayers().item(0).get('visible')).be.false();
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });

  });

  describe('getLayer', function() {
    let target;
    beforeEach(function() {
      target = document.createElement('div');
    });

    it('returns a layer', function(done) {
      const map = apply(target, brightV9);

      map.once('change:mapbox-style', function() {
        should(getLayer(map, 'landuse_park')).be.an.instanceOf(VectorTileLayer);
        done();
      });
    });
  });

  describe('getSource', function() {
    let target;
    beforeEach(function() {
      target = document.createElement('div');
    });

    it('returns a source', function(done) {
      const map = apply(target, brightV9);

      map.once('change:mapbox-style', function() {
        should(getSource(map, 'mapbox')).be.an.instanceOf(VectorTileSource);
        done();
      });
    });
  });
});
