import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import VectorLayer from 'ol/layer/Vector.js';
import Style from 'ol/style/Style.js';
import should from 'should';
import {stylefunction} from '../src/stylefunction.js';
import {defaultResolutions} from '../src/util.js';

describe('symbol optional dependencies', function () {
  let originalImage, originalText, settings, canvas;

  beforeEach(function () {
    originalImage = Object.getOwnPropertyDescriptor(
      Style.prototype,
      'setImageOptional',
    );
    originalText = Object.getOwnPropertyDescriptor(
      Style.prototype,
      'setTextOptional',
    );
    settings = new WeakMap();
    for (const part of ['Image', 'Text']) {
      Object.defineProperty(Style.prototype, `set${part}Optional`, {
        configurable: true,
        value(value) {
          if (!settings.has(this)) {
            settings.set(this, {});
          }
          settings.get(this)[part] = value;
        },
      });
    }
    canvas = document.createElement('canvas');
    canvas.width = 20;
    canvas.height = 20;
  });

  afterEach(function () {
    for (const [part, descriptor] of [
      ['Image', originalImage],
      ['Text', originalText],
    ]) {
      if (descriptor) {
        Object.defineProperty(
          Style.prototype,
          `set${part}Optional`,
          descriptor,
        );
      } else {
        delete Style.prototype[`set${part}Optional`];
      }
    }
  });

  function createStyle(layout = {}) {
    return {
      version: 8,
      sources: {data: {type: 'geojson'}},
      layers: [
        {
          id: 'shield',
          type: 'symbol',
          source: 'data',
          layout: {
            'icon-image': 'shield',
            'text-field': '39',
            'text-font': ['monospace'],
            'icon-allow-overlap': false,
            'text-allow-overlap': true,
            ...layout,
          },
        },
      ],
    };
  }

  function createFunction(layout) {
    return stylefunction(
      new VectorLayer(),
      createStyle(layout),
      'data',
      undefined,
      undefined,
      undefined,
      undefined,
      () => canvas,
    );
  }

  for (const iconOptional of [false, true]) {
    for (const textOptional of [false, true]) {
      it(`translates optional ${iconOptional}/${textOptional} without changing overlap modes`, function () {
        const fn = createFunction({
          'icon-optional': iconOptional,
          'text-optional': textOptional,
        });
        const style = fn(new Feature(new Point([0, 0])), 1)[0];
        should(settings.get(style)).eql({
          Image: iconOptional,
          Text: textOptional,
        });
        should(style.getImage().getDeclutterMode()).equal('declutter');
        should(style.getText().getDeclutterMode()).equal('obstacle');
      });
    }
  }

  it('uses the specification defaults when optional properties are omitted', function () {
    const style = createFunction()(new Feature(new Point([0, 0])), 1)[0];
    should(settings.get(style)).eql({Image: false, Text: false});
  });

  it('updates settings on reused styles when zoom changes', function () {
    const fn = createFunction({
      'icon-optional': ['step', ['zoom'], false, 14, true],
      'text-optional': ['step', ['zoom'], true, 14, false],
    });
    const feature = new Feature(new Point([0, 0]));
    const first = fn(feature, defaultResolutions[13])[0];
    should(settings.get(first)).eql({Image: false, Text: true});
    const second = fn(feature, defaultResolutions[14])[0];
    should(second).equal(first);
    should(settings.get(second)).eql({Image: true, Text: false});
  });

  it('keeps working when OpenLayers has no optional-dependency API', function () {
    delete Style.prototype.setImageOptional;
    delete Style.prototype.setTextOptional;
    const style = createFunction()(new Feature(new Point([0, 0])), 1)[0];
    should(style.getImage()).be.ok();
    should(style.getText()).be.ok();
    should(settings.has(style)).equal(false);
  });
});
