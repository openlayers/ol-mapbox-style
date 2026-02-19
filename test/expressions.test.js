import RenderFeature from 'ol/render/Feature.js';
import should from 'should';
import {wrapImageExtraArgs} from '../src/expressions.js';
import {getValue, stylefunction} from '../src/stylefunction.js';

describe('Expressions', function () {
  describe('Mixed array expressions in layout properties', function () {
    it('should evaluate text-font array with expression correctly', function () {
      const glStyle = {
        version: 8,
        sources: {
          'foo': {
            type: 'vector',
          },
        },
        layers: [
          {
            id: 'test',
            type: 'symbol',
            source: 'foo',
            'source-layer': 'bar',
            layout: {
              'text-font': [
                ['concat', ['config', 'font'], ' Medium'],
                'Arial Unicode MS Bold',
              ],
            },
          },
        ],
        schema: {
          'font': {
            default: 'DIN Pro',
            type: 'string',
          },
        },
      };

      const layer = {
        getSource: () => ({getProjection: () => null}),
        setStyle: () => {},
        set: () => {},
        get: () => {},
      };
      // Initialize style function to populate styleConfig from schema
      stylefunction(layer, glStyle, 'foo', [1]);

      const feature = new RenderFeature(
        'Point',
        [0, 0],
        [],
        2,
        {layer: 'bar'},
        1,
      );

      // Mock function cache
      const functionCache = {};
      const featureState = {};

      const result = getValue(
        glStyle.layers[0],
        'layout',
        'text-font',
        feature,
        functionCache,
        featureState,
      );

      should(result).be.instanceOf(Array);
      should(result).have.length(2);
      should(result[0]).equal('DIN Pro Medium');
      should(result[1]).equal('Arial Unicode MS Bold');
    });
  });

  describe('wrapImageExtraArgs', function () {
    it('wraps the third argument in a literal expression if it is an object', function () {
      const start = ['image', 'name', {asd: 123}];
      const expected = ['image-config', 'name', ['literal', {asd: 123}]];
      should(wrapImageExtraArgs(start)).eql(expected);
    });
    it('does not wrap if the third argument is already an expression', function () {
      const start = ['image', 'name', ['literal', {asd: 123}]];
      // This test was flawed in my previous attempt (comparing reference).
      // The implementation returns new usage because of recursion or copy.
      // Wait, let's verify implementation of wrapImageExtraArgs.
      // It returns 'expression' if no change.
      should(wrapImageExtraArgs(start)).eql(start);
    });
    it('does not wrap if there are less than 3 arguments', function () {
      const start = ['image', 'name'];
      should(wrapImageExtraArgs(start)).eql(start);
    });
    it('works recursively', function () {
      const start = ['format', 'text', ['image', 'name', {asd: 123}]];
      const expected = [
        'format',
        'text',
        ['image-config', 'name', ['literal', {asd: 123}]],
      ];
      should(wrapImageExtraArgs(start)).eql(expected);
    });
  });
});
