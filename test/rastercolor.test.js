import should from 'should';
import {createRasterColor} from '../src/rastercolor.js';
import {raster} from '../src/shaders.js';

const identity = {
  saturation: 0,
  contrast: 0,
  brightnessLow: 0,
  brightnessHigh: 1,
  hueRotate: 0,
};

// Swaps red (#FF4D4D) and green (#4DFF4D) pixels at 0.7 alpha, hides blue
// (#4D4DFF) ones and keeps opaque black ones.
const recode = {
  id: 'recode',
  type: 'raster',
  source: 'raster',
  paint: {
    'raster-color-mix': [1, 0.5, -1, 0],
    'raster-color-range': [-1, 1],
    'raster-color': [
      'step',
      ['raster-value'],
      'rgba(0, 0, 0, 0)',
      -0.19,
      '#000000',
      0.175,
      '#FF4D4D',
      0.47,
      '#4DFF4D',
    ],
  },
};

function shade(glLayer, pixels) {
  const data = Object.assign(
    {color: createRasterColor(glLayer, {})(0)},
    identity,
  );
  const image = new ImageData(
    new Uint8ClampedArray(pixels.flat()),
    pixels.length,
    1,
  );
  const result = raster([image], data).data;
  const out = [];
  for (let i = 0; i < result.length; i += 4) {
    out.push(Array.from(result.slice(i, i + 4)));
  }
  return out;
}

describe('raster-color', function () {
  it('is undefined without raster-color', function () {
    should(createRasterColor({id: 'a', type: 'raster'}, {})(0)).be.undefined();
    should(
      createRasterColor({id: 'a', type: 'raster', paint: {}}, {})(0),
    ).be.undefined();
  });

  it('uses the Mapbox defaults for mix and range', function () {
    const color = createRasterColor(
      {
        id: 'a',
        type: 'raster',
        paint: {
          'raster-color': [
            'interpolate',
            ['linear'],
            ['raster-value'],
            0,
            'black',
            1,
            'white',
          ],
        },
      },
      {},
    )(0);
    should(color.mix).eql([0.2126, 0.7152, 0.0722, 0]);
    should(color.range).eql([0, 1]);
    should(color.ramp.length).equal(1024 * 4);
    should(Array.from(color.ramp.slice(0, 4))).eql([0, 0, 0, 255]);
    should(Array.from(color.ramp.slice(1023 * 4))).eql([255, 255, 255, 255]);
  });

  it('evaluates mix and range for the zoom level', function () {
    const rasterColor = createRasterColor(
      {
        id: 'a',
        type: 'raster',
        paint: {
          'raster-color': 'red',
          'raster-color-mix': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            ['literal', [1, 0, 0, 0]],
            10,
            ['literal', [0, 1, 0, 0]],
          ],
          'raster-color-range': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0,
            ['literal', [0, 1]],
            10,
            ['literal', [0, 2]],
          ],
        },
      },
      {},
    );
    const first = rasterColor(5);
    should(first.mix).eql([0.5, 0.5, 0, 0]);
    should(first.range).eql([0, 1.5]);
    should(Array.from(first.ramp.slice(0, 4))).eql([255, 0, 0, 255]);
    should(rasterColor(5).ramp).equal(first.ramp);
    should(rasterColor(6).ramp).not.equal(first.ramp);
  });

  it('recodes colors', function () {
    should(
      shade(recode, [
        [77, 255, 77, 178],
        [255, 77, 77, 178],
        [77, 77, 255, 178],
        [0, 0, 0, 255],
        [0, 0, 0, 0],
      ]),
    ).eql([
      [255, 77, 77, 178],
      [77, 255, 77, 178],
      [0, 0, 0, 0],
      [0, 0, 0, 255],
      [0, 0, 0, 0],
    ]);
  });

  it('computes the raster value from premultiplied channels', function () {
    const glLayer = {
      id: 'a',
      type: 'raster',
      paint: {
        'raster-color-mix': [1, 0, 0, 0],
        'raster-color': ['step', ['raster-value'], '#000000', 0.5, '#FFFFFF'],
      },
    };
    should(
      shade(glLayer, [
        [255, 0, 0, 255],
        [255, 0, 0, 102],
      ]),
    ).eql([
      [255, 255, 255, 255],
      [0, 0, 0, 102],
    ]);
  });

  it('leaves pixels alone without raster-color', function () {
    should(shade({id: 'a', type: 'raster'}, [[77, 255, 77, 178]])).eql([
      [77, 255, 77, 178],
    ]);
  });
});
