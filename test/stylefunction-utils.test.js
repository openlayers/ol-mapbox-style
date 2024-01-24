/*eslint no-console: "off"*/
import Color from '@mapbox/mapbox-gl-style-spec/util/color.js';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import should from 'should';
import spec from '@mapbox/mapbox-gl-style-spec/reference/v8.json';

import {
  _colorWithOpacity as colorWithOpacity,
  _evaluateFilter as evaluateFilter,
  _fromTemplate as fromTemplate,
  _getValue as getValue,
} from '../src/stylefunction.js';

describe('utility functions currently in stylefunction.js', function () {
  describe('colorWithOpacity()', function () {
    it('should parse Color instances', function () {
      should(colorWithOpacity(new Color(1, 0, 0, 1), 1)).eql('rgba(255,0,0,1)');
      should(colorWithOpacity(new Color(1, 0, 0, 1), 0.25)).eql(
        'rgba(255,0,0,0.25)',
      );
      should(colorWithOpacity(new Color(1, 0, 0, 1))).eql('rgba(255,0,0,1)');
      should(colorWithOpacity(new Color(1, 0, 0, 1))).eql('rgba(255,0,0,1)');
    });

    it('should return undefined if alpha or opacity is 0', function () {
      should(colorWithOpacity(new Color(1, 0, 0, 0), 1)).eql(undefined);
      should(colorWithOpacity(new Color(1, 0, 0, 1), 0)).eql(undefined);
    });
  });

  describe('evaluateFilter()', function () {
    const filterCache = {};
    const feature = new Feature({geometry: new Point([0, 0], 'XY')});
    const zoom = 11;

    it('should be true with "all" filter', function () {
      const glLayerId = 'gl-layer-id';
      const filter = '[ "all" ]';

      should(filterCache).not.have.key(glLayerId);
      should(evaluateFilter(glLayerId, filter, feature, zoom, filterCache)).be
        .true;
      should(filterCache).have.key(glLayerId);
    });

    it('should be false with LineString filter and Point geom', function () {
      const glLayerId = 'gl-layer-id-2';
      const filter = '[ "==", "$type", "LineString" ]';

      should(evaluateFilter(glLayerId, filter, feature, zoom, filterCache)).be
        .false;
      should(filterCache).have.key(glLayerId);
    });

    it('should be true with Point filter and Point geom', function () {
      const glLayerId = 'gl-layer-id-2';
      const filter = '[ "==", "$type", "Point" ]';

      should(evaluateFilter(glLayerId, filter, feature, zoom, filterCache)).be
        .false;
      should(filterCache).have.key(glLayerId);
    });
  });

  describe('fromTemplate()', function () {
    const props = {de: 'BLAH', fun: 'not fun'};

    it('should replace single template string', function () {
      const tmpl = 'blah, blah, blah {de} blah';
      should.equal(tmpl.replace('{de}', 'BLAH'), fromTemplate(tmpl, props));
    });

    it('should replace two subs in template string', function () {
      const tmpl = 'blah, blah, blah {de} blah fun fun {fun}';
      should.equal(
        tmpl.replace('{de}', 'BLAH').replace('{fun}', 'not fun'),
        fromTemplate(tmpl, props),
      );
    });

    it('should handle templates with no subs', function () {
      const tmpl = 'blah, blah, blah de blah fun fun fun';
      should.equal(tmpl, fromTemplate(tmpl, props));
    });

    it('should remove subs with no matching properties', function () {
      const tmpl = 'blah, blah, {what}blah de blah fun fun fun';
      const result = 'blah, blah, blah de blah fun fun fun';
      should.equal(result, fromTemplate(tmpl, props));
    });

    it('should handle minorly misshapen subs', function () {
      const tmpl = 'blah, blah, blah {de blah fun {fun} fun';
      should.equal(tmpl.replace('{fun}', 'not fun'), fromTemplate(tmpl, props));
    });
  });

  describe('getValue()', function () {
    const zoom = 11;
    const feature = new Feature({geometry: new Point([0, 0], 'XY')});
    const functionCache = {};
    const glLayer = {
      'id': 'landuse-residential',
      'layout': {
        'visibility': 'visible',
      },
      'paint': {
        'fill-color': 'rgba(192, 216, 151, 0.53)',
        'fill-opacity': 0.7,
      },
      'type': 'fill',
    };
    const glLayer2 = {
      'id': 'park_outline',
      'paint': {
        'line-color': 'rgba(159, 183, 118, 0.69)',
        'line-gap-width': {
          'stops': [
            [12, 0],
            [20, 6],
          ],
        },
      },
      'type': 'line',
    };

    it('should get correct default property', function () {
      const d = spec['layout_line']['line-cap']['default'];

      should.equal(
        getValue(glLayer2, 'layout', 'line-cap', zoom, feature, functionCache),
        d,
      );
      should(functionCache).have.key(glLayer2.id);
    });

    it('should get simple layout property', function () {
      should.equal(
        getValue(glLayer, 'layout', 'visibility', zoom, feature, functionCache),
        'visible',
      );
      should(functionCache).have.key(glLayer.id);
    });

    it('should get simple paint property', function () {
      should.equal(
        getValue(glLayer, 'paint', 'fill-opacity', zoom, feature),
        0.7,
      );
    });

    it('should get color paint property', function () {
      const result = getValue(glLayer, 'paint', 'fill-color', zoom, feature);
      should(result).be.instanceof(Color);
    });

    it('should get complex paint property', function () {
      const result = getValue(glLayer2, 'paint', 'line-gap-width', 20, feature);
      should(result).equal(6);
    });
  });
});
