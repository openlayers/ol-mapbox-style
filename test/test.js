require('jsdom-global')();
var olms = require('../index.js');

describe('ol-mapbox-gl-style', function() {

  var brightV8 = require('../node_modules/mapbox-gl-styles/styles/bright-v8.json');

  describe('createStyleFunction', function() {
    olms.createStyleFunction(brightV8, 'mapbox');
  });
});
