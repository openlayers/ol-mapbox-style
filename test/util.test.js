import should from 'should';
import {fetchResource} from '../src/util.js';

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
  });
});
