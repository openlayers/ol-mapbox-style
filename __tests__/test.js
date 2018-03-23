import 'babel-polyfill';
import should from 'should/as-function';
import 'should-approximately-deep';
import {applyBackground, applyStyle, apply} from '../';
import Map from 'ol/canvasmap';
import TileSource from 'ol/source/tile';
import VectorSource from 'ol/source/vector';
import VectorTileLayer from 'ol/layer/vectortile';
import VectorTileSource from 'ol/source/vectortile';
import proj from 'ol/proj';
import tilegrid from 'ol/tilegrid';
import brightV9 from '../node_modules/mapbox-gl-styles/styles/bright-v9.json';
import WmsJson from '../example/data/wms.json';
import GeoJson from '../example/data/geojson.json';
import GeoJsonInline from '../example/data/geojson-inline.json';
import TileJson from '../example/data/tilejson.json';

import 'isomorphic-fetch';
import nock from 'nock';

delete brightV9.sprite;

describe('ol-mapbox-style', function() {

  describe('applyBackground', function() {
    it('applies a background to a map container', function() {
      var target = document.createElement('div');
      target.style.width = target.style.height = '100px';
      var map = new Map({target: target});
      applyBackground(map, brightV9);
      should(target.style.backgroundColor).be.exactly('rgb(248, 244, 240)');
    });
  });

  describe('applyStyle', function() {
    var layer = new VectorTileLayer({
      source: new VectorTileSource({
        tileGrid: tilegrid.createXYZ({tileSize: 512, maxZoom: 22})
      })
    });
    it('applies a style function to a layer and resolves promise', function(done) {
      should(layer.getStyle()).be.null;
      applyStyle(layer, brightV9, 'mapbox').then(function() {
        should(layer.getStyle()).be.a.Function();
        done();
      });
    });
  });

  describe('apply', function() {

    var target;
    beforeEach(function() {
      target = document.createElement('div');
    });

    afterEach(() => {
      nock.cleanAll();
    });

    it('returns a map instance and adds a layer with a style function', function(done) {
      var map = apply(target, brightV9);
      should(map instanceof Map).be.ok();

      setTimeout(function() {
        should(map.getLayers().item(0).getStyle()).be.a.Function();
        done();
      }, 200);
    });

    it('handles raster sources', function(done) {

      nock('http://dummy')
        .get('/wms.json')
        .reply(200, WmsJson);

      var map = apply(target, 'http://dummy/wms.json');

      var count = 0;
      map.getLayers().on('add', function() {
        ++count;
        if (count == 2) {
          var osm = map.getLayers().item(0);
          var wms = map.getLayers().item(1);
          should(osm.getSource().getUrls()).eql([
            'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
          ]);
          should(osm.getSource().getAttributions2()()[0]).equal(
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

      var map = apply(target, 'http://dummy/geojson.json');
      map.getLayers().once('add', function(e) {
        var layer = e.element;
        var source = layer.getSource();
        should(source).be.instanceof(VectorSource);
        should(layer.getStyle()).be.a.Function();
        done();
      });
    });

    it('handles geojson sources with inline GeoJSON', function(done) {
      var map = new Map({target: target});
      map.getLayers().once('add', function(e) {
        var layer = e.element;
        var source = layer.getSource();
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
        .reply(200, {});

      apply(map, 'http://dummy/geojson-inline.json');
    });

    it('handles raster sources from TileJSON', function(done) {
      nock('http://dummy')
        .get('/tilejson.json')
        .reply(200, TileJson);

      var map = apply(target, 'http://dummy/tilejson.json');
      map.getLayers().once('add', function(e) {
        var source = e.element.getSource();
        should(source).be.instanceof(TileSource);
        source.once('change', function() {
          var tileGrid = source.getTileGrid();
          should(tileGrid.getMaxZoom()).equal(8);
          done();
        });
      });
    });

    it('handles vector sources from TileJSON', function(done) {
      var style_url = 'https://rawgit.com/PetersonGIS/CamoStyle/b783aadd625bf0d874f77daa6c597b585f0b63fd/camo3d.json';
      fetch(style_url)
        .then(r => r.json())
        .then((styleDoc) => {
          // the sprite and glyph settings cause unnecessary fetches.
          delete styleDoc.sprite;
          delete styleDoc.glyphs;

          // setup the style doc as a nock
          nock('http://dummy')
            .get('/camo3d.json')
            .reply(200, styleDoc);

          var map = apply(target, 'http://dummy/camo3d.json');

          map.getLayers().once('add', function(e) {
            should(proj.toLonLat(map.getView().getCenter())).be.approximatelyDeep([7.1434, 50.7338], 1e-4);
            should(map.getView().getZoom()).equal(14.11);
            var layer = e.element;
            layer.once('change:source', function() {
              var source = layer.getSource();
              should(source).be.instanceof(VectorTileSource);
              should(layer.getStyle()).be.a.Function();
            });
            done();
          });
        })
        .catch(err => {
          console.error('Error', err); // eslint-disable-line
        });
    });

    it('handles visibility for raster layers', function() {
      var context = {
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
      var map = apply(target, context);
      should(map.getLayers().item(0).get('visible')).be.false();
    });

  });
});
