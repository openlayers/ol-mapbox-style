import should from 'should';
import 'isomorphic-fetch';
import nock from 'nock';

import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import TileLayer from 'ol/layer/Tile';
import TileSource from 'ol/source/Tile';

import glStyle from './fixtures/osm-liberty/style.json';
import invalidStyle from './fixtures/style-invalid-version.json';

const finalizeLayer = require('../index').__get__('finalizeLayer');

describe('finalizeLayer promise', function() {

  beforeEach(function() {
    nock('https://rawgit.com')
      .defaultReplyHeaders({'access-control-allow-origin': '*'})
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty.json')
      .replyWithFile(200, __dirname + '/fixtures/osm-liberty/osm-liberty.json')
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty.png')
      .replyWithFile(200, __dirname + '/fixtures/osm-liberty/osm-liberty.png')
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty@2x.json')
      .replyWithFile(200, __dirname + '/fixtures/osm-liberty/osm-liberty@2x.json')
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty@2x.png')
      .replyWithFile(200, __dirname + '/fixtures/osm-liberty/osm-liberty@2x.png');
  });

  afterEach(nock.cleanAll);

  it('should resolve with valid input and vector layer source', function(done) {
    const layer = new VectorLayer({
      source: new VectorSource()
    });
    const map = new Map();

    finalizeLayer(layer, ['park'], glStyle, null, map)
      .then(done).catch(function(err) {
        done(err);
      });
  });

  it('should resolve with valid input and non-vector source', function(done) {
    const layer = new TileLayer({
      source: new TileSource({})
    });
    const map = new Map({layers: [layer]});

    finalizeLayer(layer, ['natural_earth'], glStyle, null, map)
      .then(done).catch(function(err) {
        done(err);
      });
  });

  it('should not resolve at all if layer source does not exist', function(done) {
    const layer = new VectorLayer();
    let resolved = false;
    finalizeLayer(layer, ['eh'], glStyle, null, new Map())
      .then(function() {
        resolved = true;
      }).catch(function(err) {
        done(err);
      });

    setTimeout(function() {
      should(resolved).be.false;
      done();
    }, 500);
  });

  it('should not resolve until layer has a source', function(done) {
    const map = new Map();
    const layer = new VectorLayer();
    let resolved = false;
    let waitForSource = true;
    finalizeLayer(layer, ['park'], glStyle, null, map)
      .then(function() {
        resolved = true;
        should(waitForSource).be.false;
        done();
      }).catch(function(err) {
        done(err);
      });

    setTimeout(function() {
      waitForSource = false;
      should(resolved).be.false;
      layer.setSource(new VectorSource());
    }, 500);
  });

  it('should reject if applyStyle fails', function(done) {

    // applyStyle will fail if glStyle's version prop is not '8'
    // note that to get to that point, the map has to have a layer that
    // has a source, as well as having stuff in layerIds.
    const layer = new VectorLayer({source: new VectorSource()});
    const map = new Map({layers: [layer]});

    finalizeLayer(layer, ['eh'], invalidStyle, null, map)
      .then(function() {
        done(new Error('should not have succeeded'));
      })
      .catch(function(err) {
        done();
      });
  });

});
