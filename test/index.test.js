import should from 'should';
import olms, {applyBackground, apply, getLayer, getLayers, getSource} from '..';
import Map from 'ol/Map';
import TileSource from 'ol/source/Tile';
import VectorSource from 'ol/source/Vector';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import {toLonLat} from 'ol/proj';

import HotOsm from './fixtures/hot-osm/hot-osm.json';
import brightV9 from 'mapbox-gl-styles/styles/bright-v9.json';
delete brightV9.sprite;

describe('ol-mapbox-style', function() {

  describe('olms', function() {

    let target;

    beforeEach(function() {
      target = document.createElement('div');
    });

    it('called with a url, returns a promise which resolves with an ol.Map as argument', function(done) {
      olms(target, './fixtures/hot-osm/hot-osm.json')
        .then(function(map) {
          should(map).be.instanceof(Map);
          map.setTarget(undefined);
          done();
        })
        .catch(function(error) {
          done(error);
        });
    });

    it('called with a json, rejects when a TileJSON url is invalid', function(done) {
      fetch('./fixtures/hot-osm/hot-osm.json').then(function(response) {
        response.json().then(function(json) {
          json.sources.osm.url = 'invalid';

          olms(target, json)
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

    it('returns a map instance and adds a layer with a style function', function(done) {
      const map = apply(target, brightV9);
      should(map).be.instanceof(Map);

      map.getLayers().once('add', function() {
        should(map.getLayers().item(0).getStyle()).be.a.Function();
        done();
      });
    });

    it('handles raster sources', function(done) {
      const map = apply(target, './fixtures/wms.json');

      let count = 0;
      map.getLayers().on('add', function() {
        ++count;
        if (count == 2) {
          const osm = map.getLayers().item(0);
          const wms = map.getLayers().item(1);
          should(osm.get('mapbox-layers')).eql(['osm']);
          should(wms.get('mapbox-layers')).eql(['states-wms']);
          const tileGrid = osm.getSource().getTileGrid();
          const tileUrlFunction = osm.getSource().getTileUrlFunction();
          const extent = [-1e7, -1e7, 1e7, 1e7];
          const urls = [];
          tileGrid.forEachTileCoord(extent, 1, function(tileCoord) {
            urls.push(tileUrlFunction(tileCoord));
          });
          should(urls).eql([
            'https://b.tile.openstreetmap.org/1/0/1.png',
            'https://c.tile.openstreetmap.org/1/0/0.png',
            'https://a.tile.openstreetmap.org/1/1/1.png',
            'https://b.tile.openstreetmap.org/1/1/0.png'
          ]);
          should(osm.getSource().getAttributions()({extent: extent})[0]).equal(
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.');
          should(wms.getSource().getTileGrid().getTileSize()).eql(256);
          should(wms.getSource().getTileGrid().getMaxZoom()).eql(12);
          done();
        }
      }, 200);
    });

    it('handles geojson sources', function(done) {
      const map = apply(target, './fixtures/geojson.json');
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

      apply(map, './fixtures/geojson-inline.json');
    });

    it('handles raster sources from TileJSON', function(done) {
      olms(target, './fixtures/tilejson.json')
        .then(function(map) {
          const source = map.getLayers().item(0).getSource();
          should(source).be.instanceof(TileSource);
          const tileGrid = source.getTileGrid();
          should(tileGrid.getMaxZoom()).equal(8);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });

    it('handles vector sources from TileJSON', function(done) {

      olms(target, HotOsm)
        .then(function(map) {
          const center = toLonLat(map.getView().getCenter());
          should(center[0]).be.approximately(8.54806714892635, 1e-8);
          should(center[1]).be.approximately(47.37180823552663, 1e-8);
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
            'type': 'raster',
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

  describe('getLayers', function() {
    let target;
    beforeEach(function() {
      target = document.createElement('div');
    });

    it('returns an array of layers', function(done) {
      const map = apply(target, brightV9);

      map.once('change:mapbox-style', function() {
        const layers = getLayers(map, 'mapbox');
        should(layers).be.an.instanceOf(Array);
        should(layers[0]).be.an.instanceOf(VectorTileLayer);
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
