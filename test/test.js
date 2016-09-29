var expect = require('expect.js');
var olms = require('../index.js');
var ol = require('openlayers');

describe('ol-mapbox-gl-style', function() {

  var brightV9, layer;
  beforeEach(function() {
    brightV9 = require('../node_modules/mapbox-gl-styles/styles/bright-v9.json');
    layer = new ol.layer.VectorTile({
      source: new ol.source.VectorTile({
        tileGrid: ol.tilegrid.createXYZ()
      })
    });
  });


  describe('getStyleFunction', function() {
    it('creates a style function and calls onChange', function(done) {
      var resolutions = layer.getSource().getTileGrid().getResolutions();
      var style = olms.getStyleFunction(brightV9, 'mapbox', resolutions, function() {
        done();
        // Callback will be called multiple times, but call done8) only once
        done = function() {};
      });
      expect(typeof style).to.be('function');
    });
  });

  describe('applyStyle', function() {
    it('applies a style function to a layer and resolves promise', function(done) {
      olms.applyStyle(layer, brightV9, 'mapbox').then(function() {
        done();
      });
    });
  });
});
