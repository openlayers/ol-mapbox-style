import Map from 'ol/Map.js';
import MapboxVectorLayer from '../src/MapboxVectorLayer.js';
import View from 'ol/View.js';
import should from 'should';
import {defaultResolutions, getZoomForResolution} from '../src/util.js';
import {unByKey} from 'ol/Observable.js';

describe('ol/layer/MapboxVector', () => {
  describe('TileJSON', function () {
    it('lets ol-mapbox-style handle TileJSON URLs', function (done) {
      const layer = new MapboxVectorLayer({
        styleUrl:
          'data:,' +
          encodeURIComponent(
            JSON.stringify({
              version: 8,
              sources: {
                'foo': {
                  url: './fixtures/tilejson-mapboxvector.json',
                  type: 'vector',
                },
              },
              layers: [],
            }),
          ),
      });
      layer.on('error', function (e) {
        done(e.error);
      });
      const source = layer.getSource();
      const key = source.on('change', function () {
        if (source.getState() === 'ready') {
          unByKey(key);
          should(source.getTileUrlFunction()([0, 0, 0])).eql(
            'http://a.tiles.mapbox.com/v3/mapbox.geography-class/0/0/0.png',
          );
          done();
        }
      });
    });
  });

  describe('maxResolution', function () {
    const styleUrl =
      'data:,' +
      encodeURIComponent(
        JSON.stringify({
          version: 8,
          sources: {
            'foo': {
              tiles: ['/spec/ol/data/{z}-{x}-{y}.vector.pbf'],
              type: 'vector',
              tileSize: 256,
              minzoom: 6,
            },
          },
          layers: [],
        }),
      );

    it('accepts minZoom from configuration', function (done) {
      const layer = new MapboxVectorLayer({
        minZoom: 5,
        styleUrl: styleUrl,
      });
      const source = layer.getSource();
      source.on('change', function onchange() {
        if (source.getState() === 'ready') {
          source.un('change', onchange);
          should(layer.getMaxResolution()).eql(Infinity);
          done();
        }
      });
    });

    it('uses minZoom from source', function (done) {
      const layer = new MapboxVectorLayer({
        styleUrl: styleUrl,
      });
      layer.on('error', function (e) {
        done(e.error);
      });
      const source = layer.getSource();
      source.on('change', function onchange() {
        if (source.getState() === 'ready') {
          source.un('change', onchange);
          should(
            getZoomForResolution(layer.getMaxResolution(), defaultResolutions) +
              1e-12,
          ).eql(5);
          done();
        }
      });
    });
  });

  describe('background', function () {
    let map;
    const mapDiv = document.createElement('div');
    mapDiv.style.width = '20px';
    mapDiv.style.height = '20px';
    beforeEach(function () {
      document.body.appendChild(mapDiv);
      map = new Map({
        target: mapDiv,
        view: new View({
          zoom: 2,
          center: [0, 0],
        }),
      });
    });
    afterEach(function () {
      map.setTarget(null);
      document.body.removeChild(mapDiv);
    });

    it('works for styles without background', function (done) {
      const layer = new MapboxVectorLayer({
        styleUrl:
          'data:,' +
          encodeURIComponent(
            JSON.stringify({
              version: 8,
              sources: {
                'foo': {
                  tiles: ['/spec/ol/data/{z}-{x}-{y}.vector.pbf'],
                  type: 'vector',
                },
              },
              layers: [
                {
                  id: 'landuse',
                  type: 'fill',
                  source: 'foo',
                  'source-layer': 'landuse',
                  paint: {
                    'fill-color': '#ff0000',
                    'fill-opacity': 0.8,
                  },
                },
              ],
            }),
          ),
      });
      map.addLayer(layer);
      layer.getSource().once('change', () => {
        layer.once('postrender', (e) => {
          const pixel = Array.from(e.context.getImageData(0, 0, 1, 1).data);
          should(pixel).eql([0, 0, 0, 0]);
          done();
        });
      });
    });
  });

  describe('Access token', function () {
    let originalFetch, fetchUrl;
    beforeEach(function () {
      originalFetch = fetch;
      window.fetch = function (url) {
        fetchUrl = url;
        return Promise.resolve({ok: false});
      };
    });
    afterEach(function () {
      window.fetch = originalFetch;
    });
    it('applies correct access token', function (done) {
      new MapboxVectorLayer({
        styleUrl: 'mapbox://styles/mapbox/streets-v7',
        accessToken: '123',
      })
        .getSource()
        .once('change', () => {
          should(fetchUrl.url).eql(
            'https://api.mapbox.com/styles/v1/mapbox/streets-v7?&access_token=123',
          );
          done();
        });
    });
    it('applies correct access token from url', function (done) {
      new MapboxVectorLayer({
        styleUrl: 'foo?key=123',
      })
        .getSource()
        .once('change', () => {
          should(fetchUrl.url).eql(`${location.origin}/foo?key=123`);
          done();
        });
    });
  });
});
