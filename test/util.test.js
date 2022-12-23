import should from 'should';
import {fetchResource, getTileJson} from '../src/util.js';

describe('util', function () {
  describe('fetchResource', function () {
    it('allows to transform requests with the transformRequest option', function (done) {
      fetchResource('Sprite', 'my://resource', {
        transformRequest: function (url, resourceType) {
          should(url).equal('my://resource');
          should(resourceType).equal('Sprite');
          return new Request('/fixtures/sprites.json');
        },
      }).then(function (sprite) {
        should(typeof sprite.accommodation_camping).equal('object');
        done();
      });
    });
    it('adds the request to the metadata for both pending and new requests', function (done) {
      const metadataNotPending = {};
      const metadataPending = {};
      fetchResource(
        'Sprite',
        'my://resource',
        {
          transformRequest: function (url, resourceType) {
            should(url).equal('my://resource');
            should(resourceType).equal('Sprite');
            return new Request('/fixtures/sprites.json');
          },
        },
        metadataNotPending
      );
      fetchResource(
        'Sprite',
        'my://resource',
        {
          transformRequest: function (url, resourceType) {
            should(url).equal('my://resource');
            should(resourceType).equal('Sprite');
            return new Request('/fixtures/sprites.json');
          },
        },
        metadataPending
      );
      should('request' in metadataPending).true();
      should(metadataPending.request).equal(metadataNotPending.request);
      done();
    });
  });
  describe('getTileJson', function () {
    it('resolves mapbox:// tile urls properly', function (done) {
      getTileJson(
        {
          url: 'mapbox://mapbox.mapbox-streets-v7',
          type: 'vector',
        },
        '',
        {accessToken: 'mytoken'}
      )
        .then(function (tilejson) {
          should(tilejson.tiles).eql([
            'https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/{z}/{x}/{y}.vector.pbf?access_token=mytoken',
            'https://b.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/{z}/{x}/{y}.vector.pbf?access_token=mytoken',
            'https://c.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/{z}/{x}/{y}.vector.pbf?access_token=mytoken',
            'https://d.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/{z}/{x}/{y}.vector.pbf?access_token=mytoken',
          ]);
          done();
        })
        .catch(done);
    });
  });
});
