import {
  Color,
  CompoundExpression,
  expressions,
} from '@maplibre/maplibre-gl-style-spec';
import {fromString} from 'ol/color.js';

function hsla(ctx, [h, s, l, a]) {
  h = h.evaluate(ctx);
  s = s.evaluate(ctx);
  l = l.evaluate(ctx);
  const alpha = a ? a.evaluate(ctx) : 1;
  return Color.parse(`hsla(${h}, ${s}%, ${l}%, ${alpha})`);
}

function rgbaToHsla(rgba) {
  const r = rgba[0] / 255;
  const g = rgba[1] / 255;
  const b = rgba[2] / 255;
  const a = rgba[3];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h, s;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100, a];
}

export function wrapImageExtraArgs(expression) {
  if (Array.isArray(expression)) {
    if (expression.length === 0) {
      return expression;
    }
    const op = expression[0];
    if (op === 'literal') {
      return expression;
    }
    if (
      op === 'image' &&
      expression.length === 3 &&
      typeof expression[2] === 'object' &&
      expression[2] !== null &&
      !Array.isArray(expression[2])
    ) {
      const newExpression = [
        'image-config',
        wrapImageExtraArgs(expression[1]),
        ['literal', expression[2]],
      ];
      return newExpression;
    }
    const length = expression.length;
    for (let i = 1; i < length; ++i) {
      const arg = expression[i];
      const newArg = wrapImageExtraArgs(arg);
      if (newArg !== arg) {
        const newExpression = [op];
        for (let j = 1; j < i; ++j) {
          newExpression.push(expression[j]);
        }
        newExpression.push(newArg);
        for (let j = i + 1; j < length; ++j) {
          newExpression.push(wrapImageExtraArgs(expression[j]));
        }
        return newExpression;
      }
    }
  }
  return expression;
}

// Shared config object for global expression evaluation context
export const styleConfig = {};
export const cameraObj = {zoom: 0, distanceFromCenter: 0};

// Add unsupported expressions to the MapLibre GL Style spec
CompoundExpression.register(expressions, {
  ...CompoundExpression.definitions,
  'pitch': [{kind: 'number'}, [], (ctx) => cameraObj.pitch || 0],
  'distance-from-center': [
    {kind: 'number'},
    [],
    (ctx) => cameraObj.distanceFromCenter || 0,
  ],
  'to-hsla': [
    {kind: 'array', itemType: {kind: 'number'}, N: 4},
    [{kind: 'string'}],
    (ctx, [v]) => {
      return rgbaToHsla(fromString(v.evaluate(ctx)));
    },
  ],
  'hsl': [
    {kind: 'color'},
    [{kind: 'number'}, {kind: 'number'}, {kind: 'number'}],
    hsla,
  ],
  'hsla': [
    {kind: 'color'},
    [{kind: 'number'}, {kind: 'number'}, {kind: 'number'}, {kind: 'number'}],
    hsla,
  ],
  'image-config': [
    {kind: 'value'},
    [{kind: 'string'}, {kind: 'value'}],
    (ctx, [v, c]) => v.evaluate(ctx),
  ],
  'measure-light': [{kind: 'number'}, [{kind: 'value'}], () => 1],
  'config': [
    {kind: 'value'},
    [{kind: 'string'}],
    (ctx, [key]) => {
      const value = styleConfig[key.evaluate(ctx)];
      return value === undefined ? {} : value;
    },
  ],
});
