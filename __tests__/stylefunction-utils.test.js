/*eslint no-console: "off"*/
import should from 'should';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Color} from '@mapbox/mapbox-gl-style-spec';
import spec from '@mapbox/mapbox-gl-style-spec/reference/latest';


const stylefunction = require('../stylefunction');


describe('utility functions currently in stylefunction.js', function() {

  describe('colorWithOpacity()', function() {
    const colorWithOpacity = stylefunction.__get__('colorWithOpacity');
    const colorCache = stylefunction.__get__('colorCache');

    test('should not be identity with undefined opacity', function() {
      const glcolor = Color.parse('hsl(47, 13%, 86%)');
      const color = colorWithOpacity(glcolor);

      should.notStrictEqual(color, colorWithOpacity(glcolor));
      should(color).deepEqual(colorWithOpacity(glcolor));
    });

    test('should cache strictly by color', function() {

      const glcolor1 = Color.parse('hsl(47, 13%, 86%)');
      should.deepEqual([224, 222, 215, 1], colorWithOpacity(glcolor1, 1));
      should(colorCache).containDeep({
        [glcolor1.toString()]: {color: [224, 222, 215, 1], opacity: 1}
      });

      should.deepEqual([224, 222, 215, 0.5], colorWithOpacity(glcolor1, 0.5));
      should(colorCache).containDeep(colorCache, {
        [glcolor1.toString()]: {color: [224, 222, 215, 0.5], opacity: 1}
      });
    });

    test('should multiply alpha correctly', function() {

      const glcolor = Color.parse('rgba(255, 0, 0, 0.4)');
      should.deepEqual([255, 0, 0, 0.2], colorWithOpacity(glcolor, 0.5));
      should(colorCache).containDeep({
        [glcolor.toString()]: {color: [255, 0, 0, 0.2], opacity: 0.4}
      });
    });
  });

  describe('evaluateFilter()', function() {
    const filterCache = stylefunction.__get__('filterCache');
    const evaluateFilter = stylefunction.__get__('evaluateFilter');
    const feature = new Feature({geometry: new Point([0, 0], 'XY')});
    const zoom = 11;

    test('should be true with "all" filter', function() {
      const glLayerId = 'gl-layer-id';
      const filter = '[ "all" ]';

      should(filterCache).not.have.key(glLayerId);
      should(evaluateFilter(glLayerId, filter, feature, zoom)).be.true;
      should(filterCache).have.key(glLayerId);
    });

    test('should be false with LineString filter and Point geom', function() {
      const glLayerId = 'gl-layer-id-2';
      const filter = '[ "==", "$type", "LineString" ]';

      should(evaluateFilter(glLayerId, filter, feature, zoom)).be.false;
      should(filterCache).have.key(glLayerId);
    });

    test('should be true with Point filter and Point geom', function() {
      const glLayerId = 'gl-layer-id-2';
      const filter = '[ "==", "$type", "Point" ]';

      should(evaluateFilter(glLayerId, filter, feature, zoom)).be.false;
      should(filterCache).have.key(glLayerId);
    });

  });

  describe('fromTemplate()', function() {
    const fromTemplate = stylefunction.__get__('fromTemplate');
    const props = {de: 'BLAH', fun: 'not fun'};

    test('should replace single template string', function() {
      const tmpl = 'blah, blah, blah {de} blah';
      should.equal(tmpl.replace('{de}', 'BLAH'), fromTemplate(tmpl, props));
    });

    test('should replace two subs in template string', function() {
      const tmpl = 'blah, blah, blah {de} blah fun fun {fun}';
      should.equal(tmpl.replace('{de}', 'BLAH').replace('{fun}', 'not fun'), fromTemplate(tmpl, props));
    });

    test('should handle templates with no subs', function() {
      const tmpl = 'blah, blah, blah de blah fun fun fun';
      should.equal(tmpl, fromTemplate(tmpl, props));
    });

    test('should remove subs with no matching properties', function() {
      const tmpl = 'blah, blah, {what}blah de blah fun fun fun';
      const result = 'blah, blah, blah de blah fun fun fun';
      should.equal(result, fromTemplate(tmpl, props));
    });

    test('should handle minorly misshapen subs', function() {
      const tmpl = 'blah, blah, blah {de blah fun {fun} fun';
      should.equal(tmpl.replace('{fun}', 'not fun'), fromTemplate(tmpl, props));
    });

  });


  describe('getValue()', function() {
    const getValue = stylefunction.__get__('getValue');
    const functionCache = stylefunction.__get__('functionCache');
    const zoom = 11;
    const feature = new Feature({geometry: new Point([0, 0], 'XY')});
    const glLayer = {
      'id': 'landuse-residential',
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
        'fill-color': 'rgba(192, 216, 151, 0.53)',
        'fill-opacity': 0.7
      },
      'type': 'fill'
    };
    const glLayer2 = {
      'id': 'park_outline',
      'paint': {
        'line-color': 'rgba(159, 183, 118, 0.69)',
        'line-gap-width': {
          'stops': [
            [
              12,
              0
            ],
            [
              20,
              6
            ]
          ]
        }
      },
      'type': 'line'
    };

    test('should get correct default property', function() {
      const d = spec['layout_line']['line-cap']['default'];

      should.equal(getValue(glLayer2, 'layout', 'line-cap', zoom, feature), d);
      should(functionCache).have.key(glLayer2.id);
    });

    test('should get simple layout property', function() {
      should.equal(getValue(glLayer, 'layout', 'visibility', zoom, feature), 'visible');
      should(functionCache).have.key(glLayer.id);
    });

    test('should get simple paint property', function() {
      should.equal(getValue(glLayer, 'paint', 'fill-opacity', zoom, feature), 0.7);
    });

    test('should get color paint property', function() {
      const result = getValue(glLayer, 'paint', 'fill-color', zoom, feature);
      should(result).be.instanceof(Color);
    });

    test('should get complex paint property', function() {
      const result = getValue(glLayer2, 'paint', 'line-gap-width', 20, feature);
      should(result).equal(6);
    });

  });
});
