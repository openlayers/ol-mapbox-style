// import should from 'should/as-function';
import 'isomorphic-fetch';
import nock from 'nock';

import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import ImageLayer from 'ol/layer/Image';

import glStyle from './fixtures/osm-liberty/style.json';
import invalidStyle from './fixtures/style-invalid-version.json';

import {finalizeLayer} from '../index';


describe('finalizeLayer promise', function() {

  afterEach(nock.cleanAll);

  it ('should resolve with valid input and vector layer source', function(done) {
    const layer = new VectorLayer();
    layer.set('mapbox-layers', 'astring');
    const map = new Map({layers: [layer]});

    finalizeLayer(layer, ['astring'], glStyle, null, map)
      .then(done).catch(function(err) {
        done();
      });
  });

  it ('should resolve with valid input and non-vector source', function(done) {
    const layer = new ImageLayer();
    layer.set('mapbox-layers', 'astring');
    const map = new Map({layers: [layer]});

    finalizeLayer(layer, ['astring'], glStyle, null, map)
      .then(done).catch(function(err) {
        done();
      });
  });

  it ('should resolve successfully if no layer ids, regardless of layer source', function(done) {
    const layer = new VectorLayer();
    layer.set('mapbox-layers', 'astring');
    const map = new Map({layers: [layer]});

    finalizeLayer(layer, [], glStyle, null, map).then(done).catch(function(err) {
      done(err);
    });
  });

  it ('should not resolve at all if layer source does not exist', function(done) {

    try {
      it ('should time out', function() {
        const layer = new VectorLayer();
        finalizeLayer(layer, ['eh'], glStyle, null, new Map())
          .then(done).catch(function(err) {
            done(err);
          });
      }, 250);
    } catch (err) {
      done();
    }

  }, 1000);

  it ('should not resolve until layer has a source', function(done) {
    const map = new Map();
    const layer = new VectorLayer();
    const pr = finalizeLayer(layer, ['eh'], glStyle, null, map);

    nock('https://rawgit.com')
      .get('/maputnik/osm-liberty/gh-pages/sprites/osm-liberty.json')
      .reply(200, glStyle);

    try {
      it ('should time out', function() {
        pr.then(done).catch(done);
      }, 250);
      done(new Error('did not time out trying to resolve promise'));
    } catch (err) {
      // if we get here, assuming the promise is not resloving, which is correct
      layer.setSource(new VectorSource());
      pr.then(done).catch(done);
    }

  }, 10000);

  it ('should reject if applyStyle fails', function(done) {

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
