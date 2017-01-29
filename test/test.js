import should from 'should/as-function';
import {applyStyle} from '../';
import VectorTileLayer from 'ol/layer/vectortile';
import VectorTileSource from 'ol/source/vectortile';
import projCommon from 'ol/proj/common';
import tilegrid from 'ol/tilegrid';
import brightV9 from '../node_modules/mapbox-gl-styles/styles/bright-v9.json';

delete brightV9.sprite;

describe('ol-mapbox-style', function() {

  projCommon.add();

  var layer;

  beforeEach(function() {
    layer = new VectorTileLayer({
      source: new VectorTileSource({
        tileGrid: tilegrid.createXYZ({tileSize: 512, maxZoom: 22})
      })
    });
  });

  describe('applyStyle', function() {
    it('applies a style function to a layer and resolves promise', function(done) {
      should(layer.getStyle()).be.null;
      applyStyle(layer, brightV9, 'mapbox').then(function() {
        should(layer.getStyle()).be.a.Function;
        done();
      });
    });
  });
});
