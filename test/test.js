var olms = require('../index.js');

describe('ol-mapbox-gl-style', function() {

  var brightV9 = require('../node_modules/mapbox-gl-styles/styles/bright-v9.json');
  var resolutions = require('openlayers').tilegrid.createXYZ().getResolutions();

  describe('getStyleFunction', function() {
    olms.getStyleFunction(brightV9, 'mapbox', resolutions);
  });
});
