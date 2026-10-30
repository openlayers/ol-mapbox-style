import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Point from 'ol/geom/Point.js';
import VectorLayer from 'ol/layer/Vector.js';
import Executor from 'ol/render/canvas/Executor.js';
import VectorSource from 'ol/source/Vector.js';
import ImageStyle from 'ol/style/Image.js';
import Text from 'ol/style/Text.js';
import should from 'should';
import sinon from 'sinon';
import {stylefunction} from '../src/stylefunction.js';
import {defaultResolutions} from '../src/util.js';

describe('symbol optional dependencies', function () {
  let originalImage, originalText, settings, canvas;

  beforeEach(function () {
    originalImage = Object.getOwnPropertyDescriptor(
      ImageStyle.prototype,
      'setOptional',
    );
    originalText = Object.getOwnPropertyDescriptor(
      Text.prototype,
      'setOptional',
    );
    settings = new WeakMap();
    for (const prototype of [ImageStyle.prototype, Text.prototype]) {
      if (typeof prototype.setOptional !== 'function') {
        Object.defineProperty(prototype, 'setOptional', {
          configurable: true,
          value(value) {
            settings.set(this, value);
          },
        });
      }
    }
    canvas = document.createElement('canvas');
    canvas.width = 20;
    canvas.height = 20;
    canvas.getContext('2d').fillRect(0, 0, 20, 20);
  });

  afterEach(function () {
    for (const [prototype, descriptor] of [
      [ImageStyle.prototype, originalImage],
      [Text.prototype, originalText],
    ]) {
      if (descriptor) {
        Object.defineProperty(prototype, 'setOptional', descriptor);
      } else {
        delete prototype.setOptional;
      }
    }
  });

  function optional(symbol) {
    return typeof symbol.getOptional === 'function'
      ? symbol.getOptional()
      : settings.get(symbol);
  }

  function createStyle(layout = {}) {
    return {
      version: 8,
      sources: {data: {type: 'geojson'}},
      layers: (Array.isArray(layout) ? layout : [layout]).map(
        (properties, index) => ({
          id: `shield-${index}`,
          type: 'symbol',
          source: 'data',
          layout: {
            'icon-image': 'shield',
            'text-field': '39',
            'text-font': ['monospace'],
            'icon-allow-overlap': false,
            'text-allow-overlap': true,
            ...properties,
          },
        }),
      ),
    };
  }

  function createFunction(layout, layer = new VectorLayer()) {
    return stylefunction(
      layer,
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
        should(optional(style.getImage())).equal(iconOptional);
        should(optional(style.getText())).equal(textOptional);
        should(style.getImage().getDeclutterMode()).equal('declutter');
        should(style.getText().getDeclutterMode()).equal('obstacle');
      });
    }
  }

  it('uses the specification defaults when optional properties are omitted', function () {
    const style = createFunction()(new Feature(new Point([0, 0])), 1)[0];
    should(optional(style.getImage())).equal(false);
    should(optional(style.getText())).equal(false);
  });

  it('updates settings on reused styles when zoom changes', function () {
    const fn = createFunction({
      'icon-optional': ['step', ['zoom'], false, 14, true],
      'text-optional': ['step', ['zoom'], true, 14, false],
    });
    const feature = new Feature(new Point([0, 0]));
    const first = fn(feature, defaultResolutions[13])[0];
    const firstImage = first.getImage();
    should(optional(firstImage)).equal(false);
    should(optional(first.getText())).equal(true);
    const second = fn(feature, defaultResolutions[14])[0];
    should(second).equal(first);
    should(optional(second.getImage())).equal(true);
    should(optional(second.getText())).equal(false);
    should(optional(firstImage)).equal(false);
    const third = fn(feature, defaultResolutions[13])[0];
    should(third.getImage()).equal(firstImage);
    should(optional(third.getText())).equal(true);
  });

  it('keeps working when OpenLayers has no optional-dependency API', function () {
    delete ImageStyle.prototype.setOptional;
    delete Text.prototype.setOptional;
    const style = createFunction()(new Feature(new Point([0, 0])), 1)[0];
    should(style.getImage()).be.ok();
    should(style.getText()).be.ok();
    should(optional(style.getImage())).equal(undefined);
    should(optional(style.getText())).equal(undefined);
  });

  it('keeps different optional settings separate in the shared icon cache', function () {
    const fn = createFunction([
      {'icon-optional': false},
      {'icon-optional': true},
      {'icon-optional': false},
    ]);
    const styles = fn(new Feature(new Point([0, 0])), 1);
    const images = styles.map((style) => style.getImage());
    should(optional(images[0])).equal(false);
    should(optional(images[1])).equal(true);
    should(images[0]).not.equal(images[1]);
    should(images[0]).equal(images[2]);
  });

  for (const missing of [ImageStyle, Text]) {
    it(`uses the other optional API when ${missing.name} lacks its setter`, function () {
      delete missing.prototype.setOptional;
      const style = createFunction()(new Feature(new Point([0, 0])), 1)[0];
      should(optional(style.getImage())).equal(
        missing === ImageStyle ? undefined : false,
      );
      should(optional(style.getText())).equal(
        missing === Text ? undefined : false,
      );
    });
  }

  for (const part of ['icon', 'text']) {
    for (const value of [false, true]) {
      it(`renders colliding symbols with ${part}-optional ${value} using the native OL API`, function () {
        if (!originalImage || !originalText) {
          this.skip();
        }
        const layer = new VectorLayer({
          declutter: true,
          source: new VectorSource({
            features: [
              new Feature(new Point([-5, 0])),
              new Feature(new Point([5, 0])),
            ],
          }),
        });
        createFunction(
          {
            'icon-allow-overlap': part === 'text',
            'text-allow-overlap': part === 'icon',
            [`${part}-optional`]: value,
          },
          layer,
        );
        const target = document.createElement('div');
        target.style.width = '100px';
        target.style.height = '100px';
        document.body.appendChild(target);
        const map = new Map({
          target,
          pixelRatio: 1,
          layers: [layer],
          view: new View({center: [0, 0], resolution: 1}),
        });
        const replay = sinon.spy(Executor.prototype, 'replayImageOrLabelArgs_');
        try {
          map.renderSync();
          const parts = replay.args.map(([args]) =>
            'contextInstructions' in args[2] ? 'text' : 'image',
          );
          should(parts.filter((p) => p === 'image').length).equal(
            part === 'icon' ? 1 : value ? 2 : 1,
          );
          should(parts.filter((p) => p === 'text').length).equal(
            part === 'text' ? 1 : value ? 2 : 1,
          );
        } finally {
          replay.restore();
          map.dispose();
          target.remove();
        }
      });
    }
  }
});
