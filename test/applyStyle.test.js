import should from 'should';
import sinon from 'sinon';

import ImageLayer from 'ol/layer/Image.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import {createXYZ} from 'ol/tilegrid.js';

import glStyle from './fixtures/osm-liberty/style.json';
import styleEmptySprite from './fixtures/style-empty-sprite.json';
import styleInvalidSpriteURL from './fixtures/style-invalid-sprite-url.json';
import styleInvalidVersion from './fixtures/style-invalid-version.json';
import styleMissingSprite from './fixtures/style-missing-sprite.json';

import VectorSource from 'ol/source/Vector.js';
import {applyStyle} from '../src/apply.js';

describe('applyStyle with source creation', function () {
  it('accepts incorrect source with simple 3-parameter configuration', function (done) {
    const layer = new VectorLayer();
    applyStyle(layer, '/fixtures/geojson.json', {
      source: 'not_in_style',
    })
      .then(() => {
        done(new Error('Expected to reject'));
      })
      .catch((e) => done());
  });
  it('accepts correct source with simple 3-parameter configuration', function (done) {
    const layer = new VectorLayer();
    applyStyle(layer, '/fixtures/geojson.json', {
      source: 'states',
    })
      .then(() => {
        done();
      })
      .catch((e) => done(e));
  });
  it('configures vector layer with source and style', function (done) {
    const layer = new VectorLayer();
    applyStyle(layer, '/fixtures/geojson.json').then(function () {
      try {
        should(layer.getSource()).be.an.instanceOf(VectorSource);
        should(layer.getSource().getUrl()).equal(
          `${location.origin}/fixtures/states.geojson`
        );
        should(layer.getStyle()).be.an.instanceOf(Function);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('uses a Request object from the transformRequest option', function (done) {
    const layer = new VectorLayer();
    applyStyle(layer, '/fixtures/geojson.json', 'states', {
      transformRequest: function (url, type) {
        if (type === 'GeoJSON') {
          url += '?foo=bar';
        }
        return new Request(url);
      },
    }).then(function () {
      try {
        should(layer.getSource()).be.an.instanceOf(VectorSource);
        should(layer.getSource().getUrl()).equal(
          `${location.origin}/fixtures/states.geojson?foo=bar`
        );
        should(layer.getStyle()).be.an.instanceOf(Function);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('respects source options from layer config', function (done) {
    const source = new VectorSource();
    const layer = new VectorLayer({
      source: source,
    });
    const loader = function (extent, resolution, projection, success, failure) {
      fetch(/** @type {string} */ (layer.getSource().getUrl()))
        .then((response) => {
          response.json().then((json) => {
            const features = this.getFormat().readFeatures(json, {
              featureProjection: projection,
            });
            success(
              /** @type {Array<import("ol/Feature").default>} */ (features)
            );
          });
        })
        .catch((error) => {
          failure();
        });
    };
    layer.getSource().setLoader(loader);

    applyStyle(layer, '/fixtures/geojson.json', 'states').then(function () {
      try {
        should(layer.getSource()).equal(source);
        should(layer.getSource().getUrl()).equal(
          `${location.origin}/fixtures/states.geojson`
        );
        should(layer.getSource().loader_).equal(loader);
        should(layer.getStyle()).be.an.instanceOf(Function);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it('configures vector tile layer with source and style', function (done) {
    const layer = new VectorTileLayer();
    applyStyle(layer, '/fixtures/osm-liberty/style.json')
      .then(function () {
        try {
          should(layer.getSource()).be.an.instanceOf(VectorTileSource);
          should(layer.getSource().getUrls()[0]).equal(
            `${location.origin}/fixtures/osm-liberty/tiles/v3/{z}/{x}/{y}.pbf`
          );
          should(layer.getStyle()).be.an.instanceOf(Function);
          should(layer.get('mapbox-source')).equal('openmaptiles');
          should(layer.get('mapbox-layers').length).equal(94);
          done();
        } catch (e) {
          done(e);
        }
      })
      .catch(function (e) {
        done(e);
      });
  });
  it('respects the transformRequest option', function (done) {
    const layer = new VectorTileLayer();
    applyStyle(layer, '/fixtures/osm-liberty/style.json', 'openmaptiles', {
      transformRequest(url, type) {
        if (type === 'Tiles') {
          url += '?foo=bar';
        }
        return new Request(url);
      },
    })
      .then(function () {
        try {
          should(layer.getSource()).be.an.instanceOf(VectorTileSource);
          should(layer.getSource().getUrls()[0]).equal(
            `${location.origin}/fixtures/osm-liberty/tiles/v3/{z}/{x}/{y}.pbf?foo=bar`
          );
          should(layer.getStyle()).be.an.instanceOf(Function);
          done();
        } catch (e) {
          done(e);
        }
      })
      .catch(function (e) {
        done(e);
      });
  });
  it('respects source options from layer config', function (done) {
    const source = new VectorTileSource({});
    const layer = new VectorTileLayer({
      source: source,
    });
    const loader = function (tile, url) {
      tile.setLoader(function (extent, resolution, projection) {
        fetch(url + '?foo=bar').then(function (response) {
          response.arrayBuffer().then(function (data) {
            const format = tile.getFormat();
            const features = format.readFeatures(data, {
              extent: extent,
              featureProjection: projection,
            });
            tile.setFeatures(features);
          });
        });
      });
    };
    layer.getSource().setTileLoadFunction(loader);
    applyStyle(layer, '/fixtures/osm-liberty/style.json', 'openmaptiles')
      .then(function () {
        try {
          should(layer.getSource()).equal(source);
          should(layer.getSource().getTileLoadFunction()).equal(loader);
          should(layer.getStyle()).be.an.instanceOf(Function);
          done();
        } catch (e) {
          done(e);
        }
      })
      .catch(function (e) {
        done(e);
      });
  });
  it('accepts options as 3rd argument', function (done) {
    const accessToken = 'mytoken';
    const mapboxLayer = new VectorLayer();
    applyStyle(mapboxLayer, 'mapbox://styles/my/style', {
      accessToken: accessToken,
      transformRequest(url, type) {
        should(url).endWith(accessToken);
        done();
      },
    });
  });
});

describe('applyStyle without source creation', function () {
  it('leaves vector source untouched when updateSource is false', function (done) {
    const source = new VectorSource({});
    const layer = new VectorLayer({
      source: source,
    });
    const loader = function (extent, resolution, projection, success, failure) {
      fetch(/** @type {string} */ (layer.getSource().getUrl()))
        .then((response) => {
          response.json().then((json) => {
            const features = this.getFormat().readFeatures(json, {
              featureProjection: projection,
            });
            success(
              /** @type {Array<import("ol/Feature").default>} */ (features)
            );
          });
        })
        .catch((error) => {
          failure();
        });
    };
    layer.getSource().setLoader(loader);
    applyStyle(layer, '/fixtures/osm-liberty/style.json', 'openmaptiles', {
      updateSource: false,
    })
      .then(function () {
        try {
          should(layer.getSource()).equal(source);
          should(layer.getSource().getUrl()).be.undefined();
          should(layer.getSource().getAttributions()).be.null();
          should(layer.getSource().loader_).equal(loader);
          should(layer.getStyle()).be.an.instanceOf(Function);
          done();
        } catch (e) {
          done(e);
        }
      })
      .catch(function (e) {
        done(e);
      });
  });
  it('leaves vector tile source untouched when updateSource is false', function (done) {
    const source = new VectorTileSource({});
    const layer = new VectorTileLayer({
      source: source,
    });
    const loader = function (tile, url) {
      tile.setLoader(function (extent, resolution, projection) {
        fetch(url + '?foo=bar').then(function (response) {
          response.arrayBuffer().then(function (data) {
            const format = tile.getFormat();
            const features = format.readFeatures(data, {
              extent: extent,
              featureProjection: projection,
            });
            tile.setFeatures(features);
          });
        });
      });
    };
    layer.getSource().setTileLoadFunction(loader);
    applyStyle(layer, '/fixtures/osm-liberty/style.json', 'openmaptiles', {
      updateSource: false,
    })
      .then(function () {
        try {
          should(layer.getSource()).equal(source);
          should(layer.getSource().getUrls()).be.null();
          should(layer.getSource().getAttributions()).be.null();
          should(layer.getSource().getTileLoadFunction()).equal(loader);
          should(layer.getStyle()).be.an.instanceOf(Function);
          done();
        } catch (e) {
          done(e);
        }
      })
      .catch(function (e) {
        done(e);
      });
  });
});

describe('maxResolution', function () {
  const glStyle = {
    version: 8,
    sources: {
      'foo': {
        tiles: ['/fixtures/{z}-{x}-{y}.vector.pbf'],
        type: 'vector',
        minzoom: 6,
      },
    },
    layers: [],
  };

  it('accepts minZoom from configuration', function (done) {
    const layer = new VectorTileLayer({
      minZoom: 5,
    });
    applyStyle(layer, glStyle)
      .then(function () {
        should(layer.getMaxResolution()).equal(Infinity);
        done();
      })
      .catch(function (e) {
        done(e);
      });
  });

  it('uses minZoom from source', function (done) {
    const layer = new VectorTileLayer();
    applyStyle(layer, glStyle)
      .then(function () {
        should(layer.getMaxResolution()).equal(
          layer.getSource().getTileGrid().getResolution(6)
        );
        done();
      })
      .catch(function (e) {
        done(e);
      });
  });
});

describe('applyStyle style argument validation', function () {
  const source = 'openmaptiles';
  const layer = new VectorTileLayer();

  it('should handle valid style as JSON', function (done) {
    applyStyle(layer, glStyle, source, 'fixtures/osm-liberty/')
      .then(done)
      .catch(done);
  });

  it('should handle valid style as JSON string', function (done) {
    applyStyle(layer, JSON.stringify(glStyle), source, 'fixtures/osm-liberty/')
      .then(done)
      .catch(done);
  });

  it('should reject invalid style version', function (done) {
    applyStyle(layer, styleInvalidVersion, source, 'fixtures/osm-liberty/')
      .then(function () {
        done(new Error('invalid style version promise should reject'));
      })
      .catch(function (err) {
        done();
      });
  });

  it('should reject invalid ol layer type', function (done) {
    applyStyle(new ImageLayer(), glStyle, source, 'fixtures/osm-liberty/')
      .then(function () {
        done(new Error('invalid ol layer type promise should reject'));
      })
      .catch(function (err) {
        done();
      });
  });

  it('should reject invalid ol layer source type', function (done) {
    applyStyle(
      layer,
      glStyle,
      'natural_earth_shaded_relief',
      'fixtures/osm-liberty/'
    )
      .then(function () {
        done(new Error('invalid ol layer source promise should reject'));
      })
      .catch(function (err) {
        done();
      });
  });
});

describe('applyStyle style validation', function () {
  const source = 'openmaptiles';
  const layer = new VectorTileLayer();

  it('should handle missing sprite', function (done) {
    applyStyle(layer, styleMissingSprite, source, 'fixtures/osm-liberty/')
      .then(done)
      .catch(done);
  });

  it('should handle empty sprite', function (done) {
    applyStyle(layer, styleEmptySprite, source, 'fixtures/osm-liberty/')
      .then(done)
      .catch(done);
  });

  it('should reject invalid sprite URL', function (done) {
    applyStyle(layer, styleInvalidSpriteURL, source, 'fixtures/osm-liberty/')
      .then(function () {
        done(new Error('invalid sprite URL promise should reject'));
      })
      .catch(function (err) {
        done();
      });
  });
});

describe('applyStyle sprite retrieval', function () {
  const source = 'openmaptiles';
  const layer = new VectorTileLayer();

  let origDevicePixelRatio, spy;
  beforeEach(function () {
    origDevicePixelRatio = self.devicePixelRatio;
    spy = sinon.spy(self, 'fetch');
  });

  afterEach(function () {
    devicePixelRatio = origDevicePixelRatio;
    self.fetch.restore();
  });

  it('should retrieve hires sprite', function (done) {
    devicePixelRatio = 2;
    applyStyle(layer, glStyle, source, 'fixtures/osm-liberty/')
      .then(function () {
        should(spy.getCall(0).args[0].url).endWith('/osm-liberty@2x.json');
        should(spy.callCount).be.exactly(1);
        done();
      })
      .catch(function (error) {
        done(error);
      });
  });

  it('should retrieve lores sprite', function (done) {
    devicePixelRatio = 1;
    applyStyle(layer, glStyle, source, 'fixtures/osm-liberty/')
      .then(function () {
        should(spy.getCall(0).args[0].url).endWith('/osm-liberty.json');
        should(spy.callCount).be.exactly(1);
        done();
      })
      .catch(function (error) {
        done(error);
      });
  });

  it('should fall through to lores when hires not available and reject on lores not available', function (done) {
    const style = Object.assign({}, glStyle);
    style.sprite =
      window.location.protocol + '//' + window.location.host + '/invalid';

    devicePixelRatio = 2;

    applyStyle(layer, style, source)
      .then(function () {
        done(new Error('should not resolve'));
      })
      .catch(function (error) {
        should(error.message.indexOf('/invalid.json')).be.greaterThan(-1);
        done();
      });
  });

  it('should reject when sprite JSON is not found', function (done) {
    const style = Object.assign({}, glStyle);
    style.sprite = './not-found';

    devicePixelRatio = 1;

    applyStyle(layer, style, source)
      .then(function () {
        done(new Error('sprite JSON not found - promise should reject'));
      })
      .catch(function (err) {
        done();
      });
  });
});

describe('applyStyle functionality', function () {
  it('applies a style function to a layer and resolves promise', function (done) {
    const layer = new VectorTileLayer({
      source: new VectorTileSource({
        tileGrid: createXYZ({tileSize: 512, maxZoom: 22}),
      }),
    });
    should(layer.getStyle()).be.null;
    applyStyle(layer, glStyle, 'openmaptiles', 'fixtures/osm-liberty/').then(
      function () {
        should(layer.getStyle()).be.a.Function();
        done();
      }
    );
  });
});

describe('applyStyle supports transformRequest object', function () {
  it('applies transformRequest to all Vector Tile request types', function (done) {
    const layer = new VectorTileLayer();
    const expectedRequestTypes = new Set([
      'Style',
      'Sprite',
      'SpriteImage',
      'Source',
      'Tiles',
    ]);
    const seenRequestTypes = new Set();
    applyStyle(layer, '/fixtures/hot-osm/hot-osm.json', '', {
      transformRequest: function (url, type) {
        seenRequestTypes.add(type);
        return new Request(url);
      },
    })
      .then(function () {
        should.deepEqual(
          expectedRequestTypes,
          seenRequestTypes,
          `Request types seen by transformRequest: ${Array.from(
            seenRequestTypes
          )} do not match those expected for a Vector Tile style: ${Array.from(
            expectedRequestTypes
          )}`
        );
        done();
      })
      .catch(function (error) {
        done(error);
      });
  });
  it('applies transformRequest to GeoJSON request types', function (done) {
    const layer = new VectorLayer();
    const expectedRequestTypes = new Set(['Style', 'GeoJSON']);
    const seenRequestTypes = new Set();
    applyStyle(layer, '/fixtures/geojson.json', '', {
      transformRequest: function (url, type) {
        seenRequestTypes.add(type);
        return new Request(url);
      },
    })
      .then(function () {
        should.deepEqual(
          expectedRequestTypes,
          seenRequestTypes,
          `Request types seen by transformRequest: ${Array.from(
            seenRequestTypes
          )} do not match those expected for a GeoJSON style: ${Array.from(
            expectedRequestTypes
          )}`
        );
        done();
      })
      .catch(function (error) {
        done(error);
      });
  });
});
