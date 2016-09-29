var expect = require('expect.js');
var olms = require('../index.js');

describe('ol-mapbox-gl-style', function() {

  var brightV9 = require('../node_modules/mapbox-gl-styles/styles/bright-v9.json');
  var resolutions = require('openlayers').tilegrid.createXYZ().getResolutions();

  describe('getStyleFunction', function() {
    it('creates a style function', function() {
      var style = olms.getStyleFunction(brightV9, 'mapbox', resolutions);
      expect(typeof style).to.be('function');
    });
  });
});
