import should from 'should';

import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/Tile.js';
import TileSource from 'ol/source/Tile.js';
import VectorTileSource from 'ol/source/VectorTile.js';

import glStyle from './fixtures/osm-liberty/style.json';
import invalidStyle from './fixtures/style-invalid-version.json';

import VectorTileLayer from 'ol/layer/VectorTile.js';
import {finalizeLayer} from '../src/apply.js';

describe('finalizeLayer promise', function () {
  it('should resolve with valid input and vector layer source', function (done) {
    const layer = new VectorTileLayer({
      source: new VectorTileSource({}),
    });
    const map = new Map();

    finalizeLayer(layer, ['park'], glStyle, 'fixtures/osm-liberty/', map)
      .then(done)
      .catch(function (err) {
        done(err);
      });
  });

  it('should resolve with valid input and non-vector source', function (done) {
    const layer = new TileLayer({
      source: new TileSource({}),
    });
    const map = new Map({layers: [layer]});

    finalizeLayer(
      layer,
      ['natural_earth'],
      glStyle,
      'fixtures/osm-liberty/',
      map,
    )
      .then(done)
      .catch(function (err) {
        done(err);
      });
  });

  it('should not resolve at all if layer source does not exist', function (done) {
    const layer = new VectorTileLayer();
    let resolved = false;
    finalizeLayer(layer, ['eh'], glStyle, 'fixtures/osm-liberty/', new Map())
      .then(function () {
        resolved = true;
      })
      .catch(function (err) {
        done(err);
      });

    setTimeout(function () {
      should(resolved).be.false;
      done();
    }, 500);
  });

  it('should not resolve until layer has a source', function (done) {
    const map = new Map();
    const layer = new VectorTileLayer();
    let resolved = false;
    let waitForSource = true;
    finalizeLayer(layer, ['park'], glStyle, 'fixtures/osm-liberty/', map)
      .then(function () {
        resolved = true;
        should(waitForSource).be.false;
        done();
      })
      .catch(function (err) {
        done(err);
      });

    setTimeout(function () {
      waitForSource = false;
      should(resolved).be.false;
      layer.setSource(new VectorTileSource({}));
    }, 500);
  });

  it('should reject if applyStyle fails', function (done) {
    // applyStyle will fail if glStyle's version prop is not '8'
    // note that to get to that point, the map has to have a layer that
    // has a source, as well as having stuff in layerIds.
    const layer = new VectorTileLayer({
      source: new VectorTileSource({}),
    });
    const map = new Map({layers: [layer]});

    finalizeLayer(layer, ['eh'], invalidStyle, null, map)
      .then(function () {
        done(new Error('should not have succeeded'));
      })
      .catch(function (err) {
        done();
      });
  });
});
