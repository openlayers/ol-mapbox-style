import 'babel-polyfill';
import should from 'should/as-function';
import 'should-approximately-deep';
import {applyBackground, applyStyle, apply} from '../';
import Map from 'ol/map';
import TileSource from 'ol/source/tile';
import VectorSource from 'ol/source/vector';
import VectorTileLayer from 'ol/layer/vectortile';
import VectorTileSource from 'ol/source/vectortile';
import proj from 'ol/proj';
import tilegrid from 'ol/tilegrid';
import brightV9 from '../node_modules/mapbox-gl-styles/styles/bright-v9.json';

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

  describe('apply', function(done) {

    var target;
    beforeEach(function() {
      target = document.createElement('div');
    });

    it('returns a map instance and adds a layer with a style function', function(done) {
      var style = 'data:application/json;base64,' + btoa(JSON.stringify(brightV9));
      var map = apply(target, style);
      should(map instanceof Map).be.ok();
      map.getLayers().once('add', function() {
        should(map.getLayers().item(0).getStyle()).be.a.Function();
        done();
      });
    });

    it('handles raster sources', function(done) {
      var map = apply(target, '../example/data/wms.json');
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
          should(osm.getSource().getAttributions()[0].getHTML()).equal(
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.');
          should(wms.getSource().getTileGrid().getTileSize()).eql(256);
          should(wms.getSource().getTileGrid().getMaxZoom()).eql(12);
          done();
        }
      });
    });

    it('handles geojson sources', function(done) {
      var map = apply(target, '../example/data/geojson.json');
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
      apply(map, '../example/data/geojson-inline.json');
    });

    it('handles raster sources from TileJSON', function(done) {
      var map = apply(target, '../example/data/tilejson.json');
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
      var map = apply(target, 'https://rawgit.com/PetersonGIS/CamoStyle/b783aadd625bf0d874f77daa6c597b585f0b63fd/camo3d.json');
      map.getLayers().once('add', function(e) {
        should(proj.toLonLat(map.getView().getCenter())).be.approximatelyDeep([7.1434, 50.7338], 1e-4);
        should(map.getView().getZoom()).equal(14.11);
        var layer = e.element;
        layer.once('change:source', function() {
          var source = layer.getSource();
          should(source).be.instanceof(VectorTileSource);
          should(layer.getStyle()).be.a.Function();
          should(source.getAttributions()[0].getHTML()).equal('Tegola OSM');
          done();
        });
      });
    });

    it('handles visibility for raster layers', function() {
      var context = {
        "version": 8,
        "name": "states-wms",
        "sources": {
          "states": {
            "type": "raster",
            "maxzoom": 12,
            "tileSize": 256,
            "tiles": ["https://ahocevar.com/geoserver/gwc/service/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&SRS=EPSG:900913&LAYERS=topp:states&STYLES=&WIDTH=256&HEIGHT=256&BBOX={bbox-epsg-3857}"]
          }
        },
        "layers": [
          {
            "id": "states-wms",
            "source": "states",
            "layout": {
              "visibility": "none"
            }
          }
        ]
      };
      var map = apply(target, context);
      should(map.getLayers().item(0).get('visible')).be.false();
    });

  });
});
