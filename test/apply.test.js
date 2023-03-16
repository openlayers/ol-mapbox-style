import Feature from 'ol/Feature.js';
import LayerGroup from 'ol/layer/Group.js';
import Map from 'ol/Map.js';
import Point from 'ol/geom/Point.js';
import RasterSource from 'ol/source/Raster.js';
import TileSource from 'ol/source/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import View from 'ol/View.js';
import backgroundNoneStyle from './fixtures/background-none.json';
import backgroundStyle from './fixtures/background.json';
import brightV9 from 'mapbox-gl-styles/styles/bright-v9.json';
import should from 'should';
import {METERS_PER_UNIT, get, toLonLat} from 'ol/proj.js';
import {
  apply,
  applyBackground,
  getFeatureState,
  setFeatureState,
} from '../src/index.js';
import {defaultResolutions} from '../src/util.js';
delete brightV9.sprite;

describe('ol-mapbox-style', function () {
  describe('apply', function () {
    let target;

    beforeEach(function () {
      target = document.createElement('div');
    });

    it('called with a url, returns a promise which resolves with an ol.Map as argument', function (done) {
      apply(target, './fixtures/hot-osm/hot-osm.json')
        .then(function (map) {
          should(map).be.instanceof(Map);
          map.setTarget(undefined);
          done();
        })
        .catch(function (error) {
          done(error);
        });
    });

    it('called with a json, rejects when a TileJSON url is invalid', function (done) {
      fetch('./fixtures/hot-osm/hot-osm.json').then(function (response) {
        response.json().then(function (json) {
          json.sources.osm.url = 'invalid';

          apply(target, json)
            .then(function (map) {
              should(map).be.instanceof(Map);
              done(new Error('Should not resolve'));
            })
            .catch(function (err) {
              should(err.message).be.exactly(
                'Error accessing data for source osm'
              );
              done();
            });
        });
      });
    });

    it('supports feature-state (map)', function () {
      return apply(target, './fixtures/hot-osm/hot-osm.json').then(function (
        map
      ) {
        setFeatureState(map, {id: '1', source: 'osm'}, {hover: true});
        should(getFeatureState(map, {id: '1', source: 'osm'})).be.eql({
          hover: true,
        });
      });
    });

    it('adds a background layer', function (done) {
      apply(target, brightV9)
        .then(function (map) {
          should(map).be.instanceof(Map);
          const layer = map.getLayers().item(0);
          should(
            layer.render({viewState: {resolution: 1}}).className
          ).be.exactly('ol-mapbox-style-background');
          done();
        })
        .catch(done);
    });

    it('adds a layer with a style function', function (done) {
      apply(target, brightV9)
        .then(function (map) {
          should(map).be.instanceof(Map);
          const layer = map.getLayers().item(1);
          should(layer).be.instanceof(VectorTileLayer);
          should(layer.getStyle()).be.a.Function();
          done();
        })
        .catch(done);
    });

    describe('raster sources', function () {
      let map;
      this.beforeEach(function (done) {
        apply(target, './fixtures/wms.json').then((olMap) => {
          map = olMap;
          done();
        });
      });

      it('handles raster sources', function () {
        const osm = map.getLayers().item(1);
        const wms = map.getLayers().item(2);
        should(osm.get('mapbox-layers')).eql(['osm']);
        should(wms.get('mapbox-layers')).eql(['states-wms']);
        const tileGrid = osm.getSource().getTileGrid();
        const tileUrlFunction = osm.getSource().getTileUrlFunction();
        const extent = [-1e7, -1e7, 1e7, 1e7];
        const urls = [];
        tileGrid.forEachTileCoord(extent, 1, function (tileCoord) {
          urls.push(tileUrlFunction(tileCoord));
        });
        should(urls).eql([
          'https://a.tile.openstreetmap.org/1/0/0.png',
          'https://b.tile.openstreetmap.org/1/0/1.png',
          'https://c.tile.openstreetmap.org/1/1/0.png',
          'https://a.tile.openstreetmap.org/1/1/1.png',
        ]);
        should(osm.getSource().getAttributions()({extent: extent})[0]).equal(
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.'
        );
        should(wms.getSource().getTileGrid().getTileSize()).eql(256);
        should(wms.getSource().getTileGrid().getMaxZoom()).eql(12);
      });

      it('handles raster layer opacity when raster-opacity is set', function () {
        const wms = map.getLayers().item(2);
        const wmsLayer = map
          .get('mapbox-style')
          .layers.find((l) => l.id === 'states-wms');
        wmsLayer.paint['raster-opacity'] = 0.5;
        wms.dispatchEvent({type: 'prerender', frameState: {viewState: {}}});
        should(wms.getOpacity()).eql(0.5);
      });

      it('lets OpenLayers handle raster opacity when raster-opacity is not set', function () {
        const osm = map.getLayers().item(1);
        osm.setOpacity(0.5);
        osm.dispatchEvent({type: 'prerender', frameState: {viewState: {}}});
        should(osm.getOpacity()).eql(0.5);
      });
    });

    describe('raster-dem sources', function () {
      let map;
      this.beforeEach(function (done) {
        apply(target, './fixtures/raster-dem.json').then((olMap) => {
          map = olMap;
          done();
        });
      });

      it('handles raster-dem sources', function () {
        const rasterDem = map.getLayers().item(0);
        should(rasterDem.get('mapbox-layers')).eql(['hillshading']);
        should(rasterDem.getSource()).be.instanceof(RasterSource);
      });
    });

    it('handles geojson sources', function (done) {
      apply(target, './fixtures/geojson.json')
        .then(function (map) {
          const layer = map.getAllLayers()[1];
          const source = layer.getSource();
          should(source).be.instanceof(VectorSource);
          should(layer.getStyle()).be.a.Function();
          done();
        })
        .catch(done);
    });

    it('handles geojson wfs sources with bbox loadingstrategy', function (done) {
      apply(target, './fixtures/geojson-wfs.json')
        .then(function (map) {
          const layer = map
            .getAllLayers()
            .find((x) => x.get('mapbox-source') === 'water_areas');
          const source = layer.getSource();
          const url = new URL(
            source
              .getUrl()
              .call(this, map.getView().calculateExtent(), 1, get('EPSG:3857'))
          );
          const bbox = url.searchParams.get('bbox');
          const extent = map.getView().calculateExtent();
          should(bbox).be.equal(extent.join(','));
          should(source).be.instanceof(VectorSource);
          should(layer.getStyle()).be.a.Function();
          done();
        })
        .catch(done);
    });

    it('handles geojson wfs sources with bbox loadingstrategy and custom projection', function (done) {
      fetch('./fixtures/geojson-wfs.json')
        .then(function (response) {
          return response.json();
        })
        .then(function (style) {
          style.sources.water_areas.data =
            style.sources.water_areas.data.replace('3857', '4326');
          apply(target, style, {projection: 'EPSG:4326'})
            .then(function (map) {
              const layer = map
                .getAllLayers()
                .find((x) => x.get('mapbox-source') === 'water_areas');
              const source = layer.getSource();
              const url = new URL(
                source
                  .getUrl()
                  .call(
                    this,
                    map.getView().calculateExtent(),
                    1,
                    map.getView().getProjection()
                  )
              );
              const bbox = url.searchParams.get('bbox');
              const extent = map.getView().calculateExtent();
              should(bbox).be.equal(extent.join(','));
              done();
            })
            .catch(done);
        });
    });

    it('handles geojson wfs sources with bbox loadingstrategy & transformRequest', function (done) {
      apply(target, './fixtures/geojson-wfs.json', {
        transformRequest: (urlStr, type) => {
          if (type === 'GeoJSON') {
            const url = new URL(urlStr + '&transformRequest=true');
            return new Request(url);
          }
        },
      })
        .then(function (map) {
          const layer = map
            .getAllLayers()
            .find((x) => x.get('mapbox-source') === 'water_areas');
          const source = layer.getSource();
          const url = new URL(
            source
              .getUrl()
              .call(this, map.getView().calculateExtent(), 1, get('EPSG:3857'))
          );
          should(url.searchParams.get('transformRequest')).be.equal('true');
          should(source).be.instanceof(VectorSource);
          should(layer.getStyle()).be.a.Function();
          done();
        })
        .catch(done);
    });

    it('handles geojson sources with inline GeoJSON', function (done) {
      const map = new Map({target: target});
      map.getLayers().once('add', function (e) {
        const layer = e.element;
        const source = layer.getSource();
        should(source).be.instanceof(VectorSource);
        should(source.getFeatures()).have.length(100);
        should(layer.getStyle()).be.a.Function();
        done();
      });

      apply(map, './fixtures/geojson-inline.json');
    });

    it('handles raster sources from TileJSON', function (done) {
      apply(target, './fixtures/tilejson.json')
        .then(function (map) {
          const source = map.getLayers().item(1).getSource();
          should(source).be.instanceof(TileSource);
          const tileGrid = source.getTileGrid();
          should(tileGrid.getMaxZoom()).equal(8);
          done();
        })
        .catch(done);
    });

    it('handles vector sources from TileJSON', function (done) {
      apply(target, './fixtures/hot-osm/hot-osm.json')
        .then(function (map) {
          const center = toLonLat(map.getView().getCenter());
          should(center[0]).be.approximately(8.54806714892635, 1e-8);
          should(center[1]).be.approximately(47.37180823552663, 1e-8);
          should(map.getView().getZoom()).equal(12.241790506353492);
          should(map.getView().getResolution()).equal(
            defaultResolutions[0] / Math.pow(2, 12.241790506353492)
          );
          const layer = map.getLayers().item(1);
          const source = layer.getSource();
          should(source).be.instanceof(VectorTileSource);
          should(layer.getStyle()).be.a.Function();
          done();
        })
        .catch(done);
    });

    it('creates a view with default resolutions', function (done) {
      apply(target, './fixtures/hot-osm/hot-osm.json')
        .then(function (map) {
          should(map.getView().getMaxResolution()).eql(defaultResolutions[0]);
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });

    it('creates a view with default resolutions and non-standard projection', function (done) {
      apply(
        target,
        {
          version: 8,
          center: [16, 48],
          zoom: 14,
          sources: {
            'wms-source': {
              type: 'raster',
              tiles: ['{bbox-epsg-4326}'],
            },
          },
          layers: [
            {
              id: 'wms-layer',
              type: 'raster',
              source: 'wms-source',
            },
          ],
        },
        {
          projection: 'EPSG:4326',
        }
      )
        .then(function (map) {
          should(map.getView().getProjection().getCode()).eql('EPSG:4326');
          should(map.getView().getCenter()).eql([16, 48]);
          should(map.getView().getZoom()).eql(14);
          should(map.getView().getMaxResolution()).eql(
            defaultResolutions[0] / METERS_PER_UNIT.degrees
          );
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });

    it('creates a view with default resolutions for a map with an undefined view', function (done) {
      apply(
        new Map({
          target: target,
        }),
        './fixtures/hot-osm/hot-osm.json'
      )
        .then(function (map) {
          should(map.getView().getMaxResolution()).eql(defaultResolutions[0]);
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });

    it('maintains incomplete view config when configured with a map', function (done) {
      apply(
        new Map({
          target: target,
          view: new View({
            maxZoom: 11,
          }),
        }),
        './fixtures/hot-osm/hot-osm.json'
      )
        .then(function (map) {
          should(map.getView().getMaxZoom()).eql(11);
          done();
        })
        .catch(function (err) {
          done(err);
        });
    });

    describe('raster sources and layers', function () {
      let context;

      beforeEach(function () {
        context = {
          'version': 8,
          'name': 'states-wms',
          'sources': {
            'states': {
              'type': 'raster',
              'maxzoom': 12,
              'tileSize': 256,
              'tiles': [
                'https://ahocevar.com/geoserver/gwc/service/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&SRS=EPSG:900913&LAYERS=topp:states&STYLES=&WIDTH=256&HEIGHT=256&BBOX={bbox-epsg-3857}',
              ],
            },
            'hillshading': {
              'type': 'raster',
              'tileSize': 1024,
              'url': 'fixtures/tilejson.raster.json',
            },
          },
          'layers': [
            {
              'id': 'states-wms',
              'source': 'states',
              'type': 'raster',
              'layout': {
                'visibility': 'none',
              },
            },
            {
              'id': 'hillshading',
              'source': 'hillshading',
              'type': 'raster',
            },
          ],
        };
      });

      it('creates the correct tile grid for raster sources', function (done) {
        apply(target, context)
          .then(function (map) {
            const statesSource = map.getLayers().item(0).getSource();
            const statesTileGrid = statesSource.getTileGrid();
            should(statesTileGrid.getTileSize()).eql(256);
            should(statesTileGrid.getExtent()).eql([
              -20037508.342789244, -20037508.342789244, 20037508.342789244,
              20037508.342789244,
            ]);
            should(statesTileGrid.getOrigin()).eql([
              -20037508.342789244, 20037508.342789244,
            ]);
            should(statesTileGrid.getMinZoom()).eql(0);
            should(statesTileGrid.getMaxZoom()).eql(12);

            const hillshadingSource = map.getLayers().item(1).getSource();
            const hillshadingTileGrid = hillshadingSource.getTileGrid();
            should(hillshadingTileGrid.getTileSize()).eql(1024);
            should(hillshadingTileGrid.getMinZoom()).eql(0);
            should(hillshadingTileGrid.getMaxZoom()).eql(20);

            done();
          })
          .catch(function (err) {
            done(err);
          });
      });

      it('correctly replaces extent template with tile extent', function (done) {
        apply(target, context)
          .then(function (map) {
            const statesSource = map.getLayers().item(0).getSource();
            should(
              statesSource.getTileUrlFunction()(
                [0, 0, 0],
                1,
                map.getView().getProjection()
              )
            ).eql(
              'https://ahocevar.com/geoserver/gwc/service/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&SRS=EPSG:900913&LAYERS=topp:states&STYLES=&WIDTH=256&HEIGHT=256&BBOX=-20037508.342789244,-20037508.342789244,20037508.342789244,20037508.342789244'
            );
            done();
          })
          .catch(function (err) {
            done(err);
          });
      });

      it('creates the correct tile grid for custom projections', function (done) {
        apply(target, context, {projection: 'EPSG:4326'})
          .then(function (map) {
            const statesSource = map.getLayers().item(0).getSource();
            const statesTileGrid = statesSource.getTileGrid();
            should(statesTileGrid.getTileSize()).eql(256);
            should(statesTileGrid.getExtent()).eql([-180, -90, 180, 90]);
            should(statesTileGrid.getOrigin()).eql([-180, 90]);
            done();
          })
          .catch(function (err) {
            done(err);
          });
      });

      it('correctly replaces extent template with tile extent for custom projections', function (done) {
        context.sources.states.tiles = [
          'https://ahocevar.com/geoserver/gwc/service/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&SRS=EPSG:4326&LAYERS=topp:states&STYLES=&WIDTH=256&HEIGHT=256&BBOX={bbox-epsg-4326}',
        ];
        apply(target, context, {projection: 'EPSG:4326'})
          .then(function (map) {
            const statesSource = map.getLayers().item(0).getSource();
            should(
              statesSource.getTileUrlFunction()(
                [0, 0, 0],
                1,
                map.getView().getProjection()
              )
            ).eql(
              'https://ahocevar.com/geoserver/gwc/service/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&SRS=EPSG:4326&LAYERS=topp:states&STYLES=&WIDTH=256&HEIGHT=256&BBOX=-180,-270,180,90'
            );
            done();
          })
          .catch(function (err) {
            done(err);
          });
      });

      it('limits layer minzoom to source minzoom', function (done) {
        context.sources.states.minzoom = 10;
        apply(target, context)
          .then(function (map) {
            should(map.getLayers().item(0).getMaxResolution()).eql(
              defaultResolutions[9] + 1e-9
            );
            done();
          })
          .catch(function (err) {
            done(err);
          });
      });

      it('respects layer minzoom and maxzoom', function (done) {
        context.layers[0].minzoom = 10;
        context.layers[0].maxzoom = 12;
        apply(target, context)
          .then(function (map) {
            should(map.getLayers().item(0).getMaxResolution()).eql(
              defaultResolutions[10] + 1e-9
            );
            should(map.getLayers().item(0).getMinResolution()).eql(
              defaultResolutions[12] + 1e-9
            );
            done();
          })
          .catch(function (err) {
            done(err);
          });
      });

      it('limits layer minzoom for geojson sources', function (done) {
        apply(target, './fixtures/geojson-wfs.json')
          .then(function (map) {
            const layer = map.getAllLayers()[1];
            should(layer.getMaxResolution()).eql(defaultResolutions[5] + 1e-9);
            done();
          })
          .catch(function (err) {
            done(err);
          });
      });

      it('handles visibility', function (done) {
        apply(target, context)
          .then(function (map) {
            should(map.getLayers().item(0).get('visible')).be.false();
            should(map.getLayers().item(1).get('visible')).be.true();
            done();
          })
          .catch(function (err) {
            done(err);
          });
      });

      it('calls transformRequest', function (done) {
        let calledForRasterSource = false;
        apply(target, context, {
          transformRequest: function (url, type) {
            if (type === 'Tiles' && url === context.sources.states.tiles[0]) {
              calledForRasterSource = true;
            }
          },
        })
          .then(function () {
            should(calledForRasterSource).be.true();
            done();
          })
          .catch(done);
      });
    });

    describe('vector sources and layers', function () {
      let context;

      beforeEach(function () {
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
                'https://osm-lambda.tegola.io/v1/maps/osm/{z}/{x}/{y}.pbf',
              ],
            },
          },
          'layers': [
            {
              'id': 'airports',
              'type': 'fill',
              'source': 'osm',
              'source-layer': 'transport_areas',
              'minzoom': 12,
              'maxzoom': 23,
              'filter': ['all', ['==', 'type', 'apron']],
              'layout': {
                'visibility': 'visible',
              },
              'paint': {
                'fill-color': 'rgba(221, 221, 221, 1)',
              },
            },
            {
              'id': 'landuse_areas_z7',
              'type': 'fill',
              'source': 'osm',
              'source-layer': 'landuse_areas',
              'minzoom': 7,
              'maxzoom': 10,
              'filter': [
                'all',
                ['in', 'type', 'forest', 'wood', 'nature_reserve'],
              ],
              'layout': {
                'visibility': 'visible',
              },
              'paint': {
                'fill-color': 'rgba(178, 194, 157, 1)',
              },
            },
          ],
        };
      });

      it('creates the correct tile grid for vector sources', function (done) {
        apply(target, context)
          .then(function (map) {
            const source = map.getLayers().item(0).getSource();
            const tileGrid = source.getTileGrid();
            should(tileGrid.getTileSize()).eql(512);
            should(tileGrid.getExtent()).eql([
              -20037508.342789244, -20037471.205137074, 20037508.342789244,
              20037471.205137093,
            ]);
            should(tileGrid.getOrigin()).eql([
              -20037508.342789244, 20037508.342789244,
            ]);
            should(tileGrid.getMinZoom()).eql(0);
            should(tileGrid.getMaxZoom()).eql(20);
            done();
          })
          .catch(function (err) {
            done(err);
          });
      });

      it('limits layer minzoom to source minzoom', function (done) {
        context.sources.osm.minzoom = 8;
        apply(target, context)
          .then(function (map) {
            should(map.getLayers().item(0).getMaxResolution()).eql(
              defaultResolutions[8] + 1e-9
            );
            done();
          })
          .catch(function (err) {
            done(err);
          });
      });

      it('limits layer minzoom to TileJSON source minzoom', function (done) {
        const osm = context.sources.osm;
        osm.minzoom = 8;
        context.sources.osm = {
          type: 'vector',
          url: 'data:text/plain;charset=UTF-8,' + JSON.stringify(osm),
        };
        apply(target, context)
          .then(function (map) {
            should(map.getLayers().item(0).getMaxResolution()).eql(
              defaultResolutions[8] + 1e-9
            );
            done();
          })
          .catch(function (err) {
            done(err);
          });
      });

      it('respects layer minzoom and maxzoom', function (done) {
        apply(target, context)
          .then(function (map) {
            should(map.getLayers().item(0).getMaxResolution()).eql(
              defaultResolutions[7] + 1e-9
            );
            should(map.getLayers().item(0).getMinResolution()).eql(
              defaultResolutions[23] + 1e-9
            );
            done();
          })
          .catch(function (err) {
            done(err);
          });
      });
    });

    describe('layer stacking', function () {
      let context;

      beforeEach(function () {
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
                'https://osm-lambda.tegola.io/v1/maps/osm/{z}/{x}/{y}.pbf',
              ],
            },
            'hillshading': {
              'type': 'raster',
              'tileSize': 1024,
              'url': 'fixtures/tilejson.raster.json',
            },
          },
          'layers': [
            {
              'id': 'airports',
              'type': 'fill',
              'source': 'osm',
              'source-layer': 'transport_areas',
              'minzoom': 12,
              'maxzoom': 23,
              'filter': ['all', ['==', 'type', 'apron']],
              'layout': {
                'visibility': 'visible',
              },
              'paint': {
                'fill-color': 'rgba(221, 221, 221, 1)',
              },
            },
            {
              'id': 'hillshading',
              'type': 'raster',
              'source': 'hillshading',
            },
            {
              'id': 'landuse_areas_z7',
              'type': 'fill',
              'source': 'osm',
              'source-layer': 'landuse_areas',
              'minzoom': 7,
              'maxzoom': 10,
              'filter': [
                'all',
                ['in', 'type', 'forest', 'wood', 'nature_reserve'],
              ],
              'layout': {
                'visibility': 'visible',
              },
              'paint': {
                'fill-color': 'rgba(178, 194, 157, 1)',
              },
            },
          ],
        };
      });

      it('creates the correct layer stack', function (done) {
        apply(target, context)
          .then(function (map) {
            const stack = map.getAllLayers().map(function (layer) {
              return layer.get('mapbox-layers');
            });
            should(stack[0]).eql(['airports']);
            should(stack[1]).eql(['hillshading']);
            should(stack[2]).eql(['landuse_areas_z7']);
            done();
          })
          .catch(function (err) {
            done(err);
          });
      });
    });
  });

  describe('applyBackground', function () {
    let map;
    beforeEach(function () {
      map = new Map({
        target: document.createElement('div'),
        view: new View({
          center: [0, 0],
          zoom: 0,
        }),
      });
      map.setSize([100, 100]);
    });
    afterEach(function () {
      map.setTarget(null);
    });

    it('applies a background for a map', function (done) {
      applyBackground(map, backgroundStyle)
        .then(function () {
          should(
            map
              .getLayers()
              .item(0)
              .render({viewState: {resolution: 1}}).style.backgroundColor
          ).be.exactly('rgba(248, 244, 240, 0.75)');
          done();
        })
        .catch(done);
    });
    it('applies a background for a layer group', function (done) {
      const layerGroup = new LayerGroup();
      applyBackground(layerGroup, backgroundStyle)
        .then(function () {
          should(
            layerGroup
              .getLayers()
              .item(0)
              .render({viewState: {resolution: 1}}).style.backgroundColor
          ).be.exactly('rgba(248, 244, 240, 0.75)');
          done();
        })
        .catch(done);
    });
    it('applies a background to a layer', function (done) {
      const layer = new VectorTileLayer({
        source: new VectorTileSource({}),
      });
      applyBackground(layer, backgroundStyle)
        .then(function () {
          should(layer.getBackground()(1)).eql('rgba(248,244,240,0.75)');
          done();
        })
        .catch(done);
    });
    it('ignores background if layout: {visibility: "none"} (with map)', function () {
      applyBackground(map, backgroundNoneStyle);
      const layer = new VectorLayer({
        opacity: 0.5,
        source: new VectorSource({
          features: [new Feature(new Point([0, 0]))],
        }),
      });
      map.addLayer(layer);
      let backgroundColor;
      layer.on('postrender', function (e) {
        backgroundColor = Array.from(e.context.getImageData(0, 0, 1, 1).data);
      });
      map.renderSync();
      should(backgroundColor).eql([0, 0, 0, 0]);
    });
    it('ignores background if layout: {visibility: "none"} (with a layer)', function () {
      const layer = new VectorTileLayer({
        source: new VectorTileSource({}),
      });
      map.addLayer(layer);
      applyBackground(layer, backgroundNoneStyle);
      let backgroundColor;
      layer.on('postrender', function (e) {
        backgroundColor = Array.from(e.context.getImageData(0, 0, 1, 1).data);
      });
      map.renderSync();
      should(backgroundColor).eql([0, 0, 0, 0]);
    });
    it('works with a glStyle url', function (done) {
      applyBackground(map, './fixtures/background.json')
        .then(function () {
          should(
            map
              .getLayers()
              .item(0)
              .render({viewState: {resolution: 1}}).style.backgroundColor
          ).be.exactly('rgba(248, 244, 240, 0.75)');
          done();
        })
        .catch(done);
    });
  });
});
