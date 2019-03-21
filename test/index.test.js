import should from 'should';
import olms, {applyBackground, apply, getLayer, getLayers, getSource} from '..';
import {_getFonts as getFonts} from '../index';
import Map from 'ol/Map';
import TileSource from 'ol/source/Tile';
import VectorSource from 'ol/source/Vector';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import {toLonLat} from 'ol/proj';

import brightV9 from 'mapbox-gl-styles/styles/bright-v9.json';
import backgroundStyle from './fixtures/background.json';
import {defaultResolutions} from '../util';
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
      applyBackground(map, backgroundStyle);
      should(target.style.backgroundColor).be.exactly('rgb(248, 244, 240)');
      should(target.style.opacity).be.eql('0.75');
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
      olms(target, './fixtures/wms.json')
        .then(function(map) {
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
        })
        .catch(function(err) {
          done(err);
        });
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

      olms(target, './fixtures/hot-osm/hot-osm.json')
        .then(function(map) {
          const center = toLonLat(map.getView().getCenter());
          should(center[0]).be.approximately(8.54806714892635, 1e-8);
          should(center[1]).be.approximately(47.37180823552663, 1e-8);
          should(map.getView().getZoom()).equal(12.241790506353492);
          should(map.getView().getResolution()).equal(defaultResolutions[0] / Math.pow(2, 12.241790506353492));
          const layer = map.getLayers().item(0);
          const source = layer.getSource();
          should(source).be.instanceof(VectorTileSource);
          should(layer.getStyle()).be.a.Function();
          done();
        }).catch(function(err) {
          done(err);
        });
    });

    it('creates a view with default resolutions', function(done) {
      olms(target, './fixtures/hot-osm/hot-osm.json')
        .then(function(map) {
          should(map.getView().getResolutions()).eql(defaultResolutions);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });

    it('creates a view with default resolutions for a map with an undefined view', function(done) {
      olms(new Map({
        target: target
      }), './fixtures/hot-osm/hot-osm.json')
        .then(function(map) {
          should(map.getView().getResolutions()).eql(defaultResolutions);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });

    describe('raster sources and layers', function() {

      let context;

      beforeEach(function() {
        context = {
          'version': 8,
          'name': 'states-wms',
          'sources': {
            'states': {
              'type': 'raster',
              'maxzoom': 12,
              'tileSize': 256,
              'tiles': ['https://ahocevar.com/geoserver/gwc/service/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&SRS=EPSG:900913&LAYERS=topp:states&STYLES=&WIDTH=256&HEIGHT=256&BBOX={bbox-epsg-3857}']
            },
            'hillshading': {
              'type': 'raster',
              'tileSize': 1024,
              'url': 'fixtures/tilejson.raster.json'
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
            },
            {
              'id': 'hillshading',
              'source': 'hillshading',
              'type': 'raster'
            }
          ]
        };
      });

      it('creates the correct tile grid for raster sources', function(done) {
        olms(target, context)
          .then(function(map) {
            const statesSource = map.getLayers().item(0).getSource();
            const statesTileGrid = statesSource.getTileGrid();
            should(statesTileGrid.getTileSize()).eql(256);
            should(statesTileGrid.getExtent()).eql([-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244]);
            should(statesTileGrid.getOrigin()).eql([-20037508.342789244, 20037508.342789244]);
            should(statesTileGrid.getMinZoom()).eql(0);
            should(statesTileGrid.getMaxZoom()).eql(12);

            const hillshadingSource = map.getLayers().item(1).getSource();
            const hillshadingTileGrid = hillshadingSource.getTileGrid();
            should(hillshadingTileGrid.getTileSize()).eql(1024);
            should(hillshadingTileGrid.getMinZoom()).eql(0);
            should(hillshadingTileGrid.getMaxZoom()).eql(20);

            done();
          })
          .catch(function(err) {
            done(err);
          });
      });

      it('limits layer minzoom to source minzoom', function(done) {
        context.sources.states.minzoom = 10;
        olms(target, context)
          .then(function(map) {
            should(map.getLayers().item(0).getMaxResolution()).eql(defaultResolutions[9] + 1e-9);
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });

      it('respects layer minzoom and maxzoom', function(done) {
        context.layers[0].minzoom = 10;
        context.layers[0].maxzoom = 12;
        olms(target, context)
          .then(function(map) {
            should(map.getLayers().item(0).getMaxResolution()).eql(defaultResolutions[10] + 1e-9);
            should(map.getLayers().item(0).getMinResolution()).eql(defaultResolutions[12] + 1e-9);
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });

      it('handles visibility', function(done) {
        olms(target, context)
          .then(function(map) {
            should(map.getLayers().item(0).get('visible')).be.false();
            should(map.getLayers().item(1).get('visible')).be.true();
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });

    });

    describe('vector sources and layers', function() {

      let context;

      beforeEach(function() {
        context = {
          'version': 8,
          'name': 'osm',
          'sources': {
            'osm': {
              'type': 'vector',
              'bounds': [-180, -85.0511, 180, 85.0511],
              'minzoom': 0,
              'maxzoom': 20,
              'tiles': [
                'https://osm-lambda.tegola.io/v1/maps/osm/{z}/{x}/{y}.pbf'
              ]
            }
          },
          'layers': [{
            'id': 'airports',
            'type': 'fill',
            'source': 'osm',
            'source-layer': 'transport_areas',
            'minzoom': 12,
            'maxzoom': 23,
            'filter': [
              'all',
              [
                '==',
                'type',
                'apron'
              ]
            ],
            'layout': {
              'visibility': 'visible'
            },
            'paint': {
              'fill-color': 'rgba(221, 221, 221, 1)'
            }
          }, {
            'id': 'landuse_areas_z7',
            'type': 'fill',
            'source': 'osm',
            'source-layer': 'landuse_areas',
            'minzoom': 7,
            'maxzoom': 10,
            'filter': [
              'all',
              [
                'in',
                'type',
                'forest',
                'wood',
                'nature_reserve'
              ]
            ],
            'layout': {
              'visibility': 'visible'
            },
            'paint': {
              'fill-color': 'rgba(178, 194, 157, 1)'
            }
          }]
        };
      });

      it('creates the correct tile grid for vector sources', function(done) {
        olms(target, context)
          .then(function(map) {
            const source = map.getLayers().item(0).getSource();
            const tileGrid = source.getTileGrid();
            should(tileGrid.getTileSize()).eql(512);
            should(tileGrid.getExtent()).eql([-20037508.342789244, -20037471.205137074, 20037508.342789244, 20037471.205137093]);
            should(tileGrid.getOrigin()).eql([-20037508.342789244, 20037508.342789244]);
            should(tileGrid.getMinZoom()).eql(0);
            should(tileGrid.getMaxZoom()).eql(20);
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });

      it('limits layer minzoom to source minzoom', function(done) {
        context.sources.osm.minzoom = 8;
        olms(target, context)
          .then(function(map) {
            should(map.getLayers().item(0).getMaxResolution()).eql(defaultResolutions[8] + 1e-9);
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });

      it('limits layer minzoom to TileJSON source minzoom', function(done) {
        const osm = context.sources.osm;
        osm.minzoom = 8;
        context.sources.osm = {
          type: 'vector',
          url: 'data:text/plain;charset=UTF-8,' + JSON.stringify(osm)
        };
        olms(target, context)
          .then(function(map) {
            should(map.getLayers().item(0).getMaxResolution()).eql(defaultResolutions[8] + 1e-9);
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });

      it('respects layer minzoom and maxzoom', function(done) {
        olms(target, context)
          .then(function(map) {
            should(map.getLayers().item(0).getMaxResolution()).eql(defaultResolutions[7] + 1e-9);
            should(map.getLayers().item(0).getMinResolution()).eql(defaultResolutions[23] + 1e-9);
            done();
          })
          .catch(function(err) {
            done(err);
          });
      });

    });

  });

  describe('getLayer', function() {
    let target;
    beforeEach(function() {
      target = document.createElement('div');
    });

    it('returns a layer', function(done) {
      olms(target, brightV9).then(function(map) {
        // add another layer that has no 'mapbox-layers' set
        map.addLayer(new VectorTileLayer());
        should(getLayer(map, 'landuse_park')).be.an.instanceOf(VectorTileLayer);
        done();
      }).catch(function(error) {
        done(error);
      });
    });
  });

  describe('getLayers', function() {
    let target;
    beforeEach(function() {
      target = document.createElement('div');
    });

    it('returns an array of layers', function(done) {
      olms(target, brightV9).then(function(map) {
        // add another layer that has no 'mapbox-layers' set
        map.addLayer(new VectorTileLayer());
        const layers = getLayers(map, 'mapbox');
        should(layers).be.an.instanceOf(Array);
        should(layers[0]).be.an.instanceOf(VectorTileLayer);
        should(getLayers(map, 'mapbo').length).eql(0);
        done();
      }).catch(function(error) {
        done(error);
      });
    });
  });


  describe('getSource', function() {
    let target;
    beforeEach(function() {
      target = document.createElement('div');
    });

    it('returns a source', function(done) {
      olms(target, brightV9).then(function(map) {
        // add another layer that has no 'mapbox-source' set
        map.addLayer(new VectorTileLayer());
        should(getSource(map, 'mapbox')).be.an.instanceOf(VectorTileSource);
        should(getSource(map, 'mapbo')).be.undefined();
        done();
      }).catch(function(error) {
        done(error);
      });
    });
  });

  describe('getFonts', function() {
    it('does not loads standard fonts', function() {
      getFonts(['monospace', 'sans-serif']);
      const stylesheets = document.querySelectorAll('link[rel=stylesheet]');
      should(stylesheets.length).eql(0);
    });

    it('loads fonts from fonts.google.com', function() {
      let stylesheets;
      getFonts(['Noto Sans Bold', 'Noto Sans Regular Italic']);
      stylesheets = document.querySelectorAll('link[rel=stylesheet]');
      should(stylesheets.length).eql(2);
      should(stylesheets.item(0).href).eql('https://fonts.googleapis.com/css?family=Noto+Sans:700normal');
      should(stylesheets.item(1).href).eql('https://fonts.googleapis.com/css?family=Noto+Sans:400italic');

      // already loaded family, no additional link
      getFonts(['Noto Sans Bold']);
      stylesheets = document.querySelectorAll('link[rel=stylesheet]');
      should(stylesheets.length).eql(2);
    });
  });
});
