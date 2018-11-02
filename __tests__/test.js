import should from 'should';
import 'should-approximately-deep';
import {applyBackground, apply, getLayer, getSource} from '../';
import Map from 'ol/Map';
import TileSource from 'ol/source/Tile';
import VectorSource from 'ol/source/Vector';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import {toLonLat} from 'ol/proj';
import brightV9 from '../node_modules/mapbox-gl-styles/styles/bright-v9.json';
import WmsJson from '../example/data/wms.json';
import GeoJson from '../example/data/geojson.json';
import GeoJsonInline from '../example/data/geojson-inline.json';
import TileJson from '../example/data/tilejson.json';

import 'isomorphic-fetch';
import nock from 'nock';

import camo3dJSON from './fixtures/camo3d.json';

delete brightV9.sprite;

describe('ol-mapbox-style', function() {

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
      should(map instanceof Map).be.ok();

      map.getLayers().once('add', function() {
        should(map.getLayers().item(0).getStyle()).be.a.Function();
        done();
      });
    });

    it('handles raster sources', function(done) {

      nock('http://dummy')
        .get('/wms.json')
        .reply(200, WmsJson);

      const map = apply(target, 'http://dummy/wms.json');

      let count = 0;
      map.getLayers().on('add', function() {
        ++count;
        if (count == 2) {
          const osm = map.getLayers().item(0);
          const wms = map.getLayers().item(1);
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
      nock('http://dummy')
        .get('/geojson.json')
        .reply(200, GeoJson);

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

      nock('http://dummy')
        .get('/geojson-inline.json')
        .reply(200, Object.assign({}, GeoJsonInline, {sprite: 'http://dummy/sprite'}))
        .get('/sprite.png')
        .reply(200, '')
        .get('/sprite.json')
        .reply(200, {'not-empty': {}});

      apply(map, 'http://dummy/geojson-inline.json');
    });

    it('handles raster sources from TileJSON', function(done) {
      nock('http://dummy')
        .get('/tilejson.json')
        .reply(200, TileJson);

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

      // the sprite and glyph settings cause unnecessary fetches.
      delete camo3dJSON.sprite;
      delete camo3dJSON.glyphs;

      // setup the style doc as a nock
      nock('http://dummy')
        .get('/camo3d.json')
        .reply(200, camo3dJSON);

      const map = apply(target, 'http://dummy/camo3d.json');

      map.getLayers().once('add', function(e) {
        should(toLonLat(map.getView().getCenter())).be.approximatelyDeep([7.1434, 50.7338], 1e-4);
        should(map.getView().getZoom()).equal(14.11);
        const layer = e.element;
        layer.once('change:source', function() {
          const source = layer.getSource();
          should(source).be.instanceof(VectorTileSource);
          should(layer.getStyle()).be.a.Function();
        });
        done();
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
      const map = apply(target, context);
      map.getLayers().once('add', function() {
        should(map.getLayers().item(0).get('visible')).be.false();
        done();
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
