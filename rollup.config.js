import {fileURLToPath} from 'url';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const config = [
  {
    external: (id) => /ol(\/.+)?$/.test(id),
    input: `${__dirname}/src/index.js`,
    output: {
      name: 'olms',
      globals: (id) =>
        /ol(\/.+)?$/.test(id)
          ? id.replace(/\.js$/, '').split('/').join('.')
          : id,
      file: `${__dirname}/dist/olms.js`,
      format: 'umd',
      sourcemap: true,
      plugins: [terser()],
    },
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      commonjs(),
    ],
  },
];
export default config;
