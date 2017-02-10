import should from 'should/as-function';
import {applyBackground, applyStyle, apply} from '../';
import Map from 'ol/map';
import VectorTileLayer from 'ol/layer/vectortile';
import VectorTileSource from 'ol/source/vectortile';
import projCommon from 'ol/proj/common';
import tilegrid from 'ol/tilegrid';
import brightV9 from '../node_modules/mapbox-gl-styles/styles/bright-v9.json';

delete brightV9.sprite;

describe('ol-mapbox-style', function() {

  projCommon.add();

  if (!('requestAnimationFrame' in global)) {
    global.requestAnimationFrame = function(fn) {
      return setTimeout(fn, 16);
    };
  }

  var layer;

  beforeEach(function() {
    layer = new VectorTileLayer({
      source: new VectorTileSource({
        tileGrid: tilegrid.createXYZ({tileSize: 512, maxZoom: 22})
      })
    });
  });

  describe('applyBackground', function() {
    it('applies a background to a map container', function() {
      var target = document.createElement('div');
      target.style.width = target.style.height = '100px';
      var map = new Map({target: target});
      applyBackground(map, brightV9);
      should(target.style.backgroundColor).be.exactly('rgb(248, 244, 240)');
    });
  });

  describe('applyStyle', function() {
    it('applies a style function to a layer and resolves promise', function(done) {
      should(layer.getStyle()).be.null;
      applyStyle(layer, brightV9, 'mapbox').then(function() {
        should(layer.getStyle()).be.a.Function();
        done();
      });
    });
  });

  describe('apply', function(done) {
    it('returns a map instance and adds a layer with a style function', function() {
      var target = document.createElement('div');
      var style = 'data:application/json;base64,' + btoa(JSON.stringify(brightV9));
      var map = apply(target, style);
      should(map instanceof Map).be.ok();
      map.getLayers().once('add', function() {
        should(map.getLayers().item(0).getStyle()).be.a.Function();
      });
    });
  });
});
