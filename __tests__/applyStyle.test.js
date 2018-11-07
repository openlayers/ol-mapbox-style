/*eslint no-console: "off"*/
import 'isomorphic-fetch';
import nock from 'nock';
import should from 'should/as-function';

import VectorLayer from 'ol/layer/Vector';
import VectorTileLayer from 'ol/layer/VectorTile';
import ImageLayer from 'ol/layer/Image';
import VectorTileSource from 'ol/source/VectorTile';
import {createXYZ} from 'ol/tilegrid';

import glStyle from './fixtures/osm-liberty/style.json';
import glStyleLoresSprite from './fixtures/osm-liberty/osm-liberty.json';
import glStyleHiresSprite from './fixtures/osm-liberty/osm-liberty@2x.json';
import styleInvalidVersion from './fixtures/style-invalid-version.json';
import styleEmptySprite from './fixtures/style-empty-sprite.json';
import styleMissingSprite from './fixtures/style-missing-sprite.json';
import styleInvalidSpriteURL from './fixtures/style-invalid-sprite-url.json';

import {applyStyle} from '../index.js';


describe('applyStyle style argument validation', function() {
  const source = 'openmaptiles';
  const layer = new VectorLayer();

  beforeEach(function() {
    nock('https://rawgit.com')
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty.json')
      .reply(200, glStyleLoresSprite)
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty.png')
      .reply(200, '')
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty@2x.json')
      .reply(200, glStyleHiresSprite)
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty@2x.png')
      .reply(200, {});
  });

  afterEach(function() {
    nock.cleanAll();
  });

  test('should handle valid style as JSON', function(done) {
    applyStyle(layer, glStyle, source).then(done).catch(done);
  });

  test('should handle valid style as JSON string', function(done) {
    applyStyle(layer, JSON.stringify(glStyle), source).then(done).catch(done);
  });

  test('should reject invalid style version', function(done) {
    applyStyle(layer, styleInvalidVersion, source).then(function() {
      done(new Error('invalid style version promise should reject'));
    }).catch(function(err) {
      done();
    });
  });

  test('should reject invalid ol layer type', function(done) {
    applyStyle(new ImageLayer(), glStyle, source).then(function() {
      done(new Error('invalid ol layer type promise should reject'));
    }).catch(function(err) {
      done();
    });
  });

  test('should reject invalid ol layer source type', function(done) {
    applyStyle(new VectorLayer(), glStyle, 'natural_earth_shaded_relief').then(function() {
      done(new Error('invalid ol layer source promise should reject'));
    }).catch(function(err) {
      done();
    });
  });

});


describe('applyStyle style validation', function() {
  const source = 'openmaptiles';
  const layer = new VectorLayer();

  test('should handle missing sprite', function(done) {
    applyStyle(layer, styleMissingSprite, source).then(done).catch(done);
  });

  test('should handle empty sprite', function(done) {
    applyStyle(layer, styleEmptySprite, source).then(done).catch(done);
  });

  test('should reject invalid sprite URL', function(done) {
    applyStyle(layer, styleInvalidSpriteURL, source).then(function() {
      done(new Error('invalid sprite URL promise should reject'));
    }).catch(function(err) {
      done();
    });
  });

});


describe('applyStyle sprite retrieval', function() {
  const source = 'openmaptiles';
  const layer = new VectorLayer();


  afterEach(nock.cleanAll);

  test('should retrieve hires sprite', function(done) {
    const orig = global.devicePixelRatio;
    global.devicePixelRatio = 2;

    nock('https://rawgit.com')
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty@2x.json')
      .reply(200, glStyleHiresSprite)
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty@2x.png')
      .reply(200, {});

    applyStyle(layer, glStyle, source).then(done).catch(done);

    global.devicePixelRatio = orig;
  });

  test('should retrieve lores sprite', function(done) {
    const orig = global.devicePixelRatio;
    global.devicePixelRatio = 1;

    nock('https://rawgit.com')
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty.json')
      .reply(200, glStyleLoresSprite)
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty.png')
      .reply(200, '');

    applyStyle(layer, glStyle, source).then(done).catch(done);

    global.devicePixelRatio = orig;
  });

  test('should fall through to lores when hires not available', function(done) {
    const orig = global.devicePixelRatio;
    global.devicePixelRatio = 2;

    nock('https://rawgit.com')
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty.json')
      .reply(200, glStyleLoresSprite)
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty.png')
      .reply(200, '')
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty@2x.json')
      .reply(500, '')
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty@2x.png')
      .reply(500, '');

    applyStyle(layer, glStyle, source).then(done).catch(done);

    global.devicePixelRatio = orig;
  });

  test('should reject on failed lores fall through', function(done) {
    const orig = window.devicePixelRatio;
    window.devicePixelRatio = 2;

    nock('https://rawgit.com')
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty.json')
      .reply(500, '')
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty.png')
      .reply(500, '')
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty@2x.json')
      .reply(500, '')
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty@2x.png')
      .reply(500, '');

    applyStyle(layer, glStyle, source).then(function() {
      done(new Error('failed lowres fallthrough promise should reject'));
    }).catch(function(err) {
      done();
    });

    window.devicePixelRatio = orig;
  });

  test('should reject on empty sprite JSON', function(done) {

    // make a copy so we can safely modify
    const style = JSON.parse(JSON.stringify(styleEmptySprite));

    // give style a dummy sprite url
    style.sprite = 'http://dummy/sprite';

    // make that dummy sprite return json
    nock('http://dummy/').get(/\/sprite.*/).reply(200, {});

    applyStyle(layer, style, source).then(function() {
      done(new Error('empty sprite JSON promise should reject'));
    }).catch(function(err) {
      done();
    });
  });

});


describe('applyStyle functionality', function() {

  beforeEach(function() {
    nock('https://rawgit.com')
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty.json')
      .reply(200, glStyleLoresSprite)
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty.png')
      .reply(200, '')
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty@2x.json')
      .reply(200, glStyleHiresSprite)
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty@2x.png')
      .reply(200, {});
  });

  afterEach(function() {
    nock.cleanAll();
  });

  it('applies a style function to a layer and resolves promise', function(done) {
    const layer = new VectorTileLayer({
      source: new VectorTileSource({
        tileGrid: createXYZ({tileSize: 512, maxZoom: 22})
      })
    });
    should(layer.getStyle()).be.null;
    applyStyle(layer, glStyle, 'openmaptiles').then(function() {
      should(layer.getStyle()).be.a.Function();
      done();
    });
  });
});
