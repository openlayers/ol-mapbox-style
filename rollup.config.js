import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import buble from '@rollup/plugin-buble';
import unassert from 'rollup-plugin-unassert';
import flowRemoveTypes from '@mapbox/flow-remove-types';
import {terser} from 'rollup-plugin-terser';

// Build es modules?
const esm = 'esm' in process.env;

import {fileURLToPath} from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const reviver = (key, value) => ['doc', 'example', 'sdk-support'].includes(key) ? undefined : value;

const config = [{
  external: id => /ol(\/.+)?$/.test(id),
  input: `${__dirname}/src/index.js`,
  output: {
    name: 'olms',
    globals: esm ? undefined : id => /ol(\/.+)?$/.test(id) ? id.replace(/\.js$/, '').split('/').join('.') : id,
    file: `${__dirname}/dist/${esm ? 'index.js' : 'olms.js'}`,
    format: esm ? 'esm' : 'umd',
    sourcemap: true,
    plugins: esm ? undefined : [terser()]
  },
  plugins: [
    {
      name: 'flow-remove-types',
      transform: (code) => ({
        code: flowRemoveTypes(code).toString(),
        map: null
      })
    },
    {
      name: 'json-min',
      transform(code, id) {
        if (id.endsWith('.json')) {
          const json = JSON.parse(code);
          const min = JSON.stringify(json, reviver);
          code = `export default ${min}`;
          return {
            code,
            map: null
          };
        }
        return null;
      }
    },
    unassert(),
    buble({
      transforms: {
        dangerousForOf: true,
      }
    }),
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs()
  ]
}];
export default config;
