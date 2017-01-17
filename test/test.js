import expect from 'expect.js';
import olms from '../';
import VectorTileLayer from 'ol/layer/vectortile';
import VectorTileSource from 'ol/source/vectortile';
import projCommon from 'ol/proj/common';
import tilegrid from 'ol/tilegrid';
import brightV9 from '../node_modules/mapbox-gl-styles/styles/bright-v9.json';

describe('ol-mapbox-gl-style', function() {

  projCommon.add();

  var layer;
  beforeEach(function() {
    layer = new VectorTileLayer({
      source: new VectorTileSource({
        tileGrid: tilegrid.createXYZ({tileSize: 512, maxZoom: 22})
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
