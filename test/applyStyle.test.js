import should from 'should';
import sinon from 'sinon';

import VectorLayer from 'ol/layer/Vector';
import VectorTileLayer from 'ol/layer/VectorTile';
import ImageLayer from 'ol/layer/Image';
import VectorTileSource from 'ol/source/VectorTile';
import {createXYZ} from 'ol/tilegrid';

import glStyle from './fixtures/osm-liberty/style.json';
import styleInvalidVersion from './fixtures/style-invalid-version.json';
import styleEmptySprite from './fixtures/style-empty-sprite.json';
import styleMissingSprite from './fixtures/style-missing-sprite.json';
import styleInvalidSpriteURL from './fixtures/style-invalid-sprite-url.json';

import {applyStyle} from '../index.js';


describe('applyStyle style argument validation', function() {
  const source = 'openmaptiles';
  const layer = new VectorLayer();

  it('should handle valid style as JSON', function(done) {
    applyStyle(layer, glStyle, source, 'fixtures/osm-liberty/').then(done).catch(done);
  });

  it('should handle valid style as JSON string', function(done) {
    applyStyle(layer, JSON.stringify(glStyle), source, 'fixtures/osm-liberty/').then(done).catch(done);
  });

  it('should reject invalid style version', function(done) {
    applyStyle(layer, styleInvalidVersion, source, 'fixtures/osm-liberty/').then(function() {
      done(new Error('invalid style version promise should reject'));
    }).catch(function(err) {
      done();
    });
  });

  it('should reject invalid ol layer type', function(done) {
    applyStyle(new ImageLayer(), glStyle, source, 'fixtures/osm-liberty/').then(function() {
      done(new Error('invalid ol layer type promise should reject'));
    }).catch(function(err) {
      done();
    });
  });

  it('should reject invalid ol layer source type', function(done) {
    applyStyle(new VectorLayer(), glStyle, 'natural_earth_shaded_relief', 'fixtures/osm-liberty/').then(function() {
      done(new Error('invalid ol layer source promise should reject'));
    }).catch(function(err) {
      done();
    });
  });

});


describe('applyStyle style validation', function() {
  const source = 'openmaptiles';
  const layer = new VectorLayer();

  it('should handle missing sprite', function(done) {
    applyStyle(layer, styleMissingSprite, source, 'fixtures/osm-liberty/').then(done).catch(done);
  });

  it('should handle empty sprite', function(done) {
    applyStyle(layer, styleEmptySprite, source, 'fixtures/osm-liberty/').then(done).catch(done);
  });

  it('should reject invalid sprite URL', function(done) {
    applyStyle(layer, styleInvalidSpriteURL, source, 'fixtures/osm-liberty/').then(function() {
      done(new Error('invalid sprite URL promise should reject'));
    }).catch(function(err) {
      done();
    });
  });

});


describe('applyStyle sprite retrieval', function() {
  const source = 'openmaptiles';
  const layer = new VectorLayer();

  let origDevicePixelRatio, spy;
  beforeEach(function() {
    origDevicePixelRatio = self.devicePixelRatio;
    spy = sinon.spy(self, 'fetch');
  });

  afterEach(function() {
    self.devicePixelRatio = origDevicePixelRatio;
    self.fetch.restore();
  });

  it('should retrieve hires sprite', function(done) {
    const style = Object.assign({}, glStyle);
    style.sprite = window.location.protocol + '//' + window.location.host + '/fixtures/osm-liberty/osm-liberty';

    global.devicePixelRatio = 2;

    applyStyle(layer, style, source).then(function() {
      should(spy.getCall(0).args[0]).endWith('/osm-liberty@2x.json');
      should(spy.callCount).be.exactly(1);
      done();
    }).catch(function(error) {
      done(error);
    });
  });

  it('should retrieve lores sprite', function(done) {
    const style = Object.assign({}, glStyle);
    style.sprite = window.location.protocol + '//' + window.location.host + '/fixtures/osm-liberty/osm-liberty';

    global.devicePixelRatio = 1;

    applyStyle(layer, style, source).then(function() {
      should(spy.getCall(0).args[0]).endWith('/osm-liberty.json');
      should(spy.callCount).be.exactly(1);
      done();
    }).catch(function(error) {
      done(error);
    });
  });

  it('should fall through to lores when hires not available and reject on lores not available', function(done) {
    const style = Object.assign({}, glStyle);
    style.sprite = window.location.protocol + '//' + window.location.host + '/invalid';

    global.devicePixelRatio = 2;

    applyStyle(layer, style, source).then(function() {
      done(new Error('should not resolve'));
    }).catch(function(error) {
      should(error.message.indexOf('/invalid.json')).be.greaterThan(-1);
      done();
    });
  });

  it('should reject on empty sprite JSON', function(done) {
    const style = Object.assign({}, glStyle);
    style.sprite = window.location.protocol + '//' + window.location.host + '/fixtures/empty';

    global.devicePixelRatio = 1;

    applyStyle(layer, style, source).then(function() {
      done(new Error('empty sprite JSON promise should reject'));
    }).catch(function(err) {
      done();
    });
  });

});


describe('applyStyle functionality', function() {

  it('applies a style function to a layer and resolves promise', function(done) {
    const layer = new VectorTileLayer({
      source: new VectorTileSource({
        tileGrid: createXYZ({tileSize: 512, maxZoom: 22})
      })
    });
    should(layer.getStyle()).be.null;
    applyStyle(layer, glStyle, 'openmaptiles', 'fixtures/osm-liberty/').then(function() {
      should(layer.getStyle()).be.a.Function();
      done();
    });
  });
});
