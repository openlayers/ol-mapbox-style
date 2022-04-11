const {join} = require('path');
const path = require('path');

/**
 * @param {'js' | 'es.js'} type Type.
 * @return {Object} Webpack config.
 */
const createConfig = (type) => ({
  entry: './src/index.js',
  devtool: 'source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['remove-flow-types-loader'],
        include: join(
          __dirname,
          'node_modules',
          '@mapbox',
          'mapbox-gl-style-spec'
        ),
      },
      {
        type: 'javascript/auto',
        test: /\.json$/,
        include: join(
          __dirname,
          'node_modules',
          '@mapbox',
          'mapbox-gl-style-spec',
          'reference'
        ),
        use: ['json-strip-loader?keys[]=doc,keys[]=example,keys[]=sdk-support'],
      },
      {
        test: /\.js$/,
        include: [__dirname],
        exclude: [join(__dirname, 'node_modules', 'ol')],
        use: {
          loader: 'buble-loader',
          options: {
            transforms: {dangerousForOf: true},
          },
        },
      },
    ],
  },
  output: {
    path: path.resolve('./dist'), // Path of output file
    filename: type === 'js' ? 'olms.js' : 'index.js',
    library: {
      name: type === 'js' ? 'olms' : undefined,
      type: type === 'js' ? 'umd' : 'module',
    },
  },
  resolve: {
    fallback: {
      'assert': path.join(__dirname, 'node_modules', 'nanoassert'),
    },
  },
  externals: [
    function ({request}, callback) {
      if (/^ol\/.+$/.test(request)) {
        return callback(null, {
          commonjs: request,
          commonjs2: request,
          amd: request,
          module: request,
          root: request.replace(/\.js$/, '').split('/'),
        });
      }
      callback();
    },
  ],
});

module.exports = [
  createConfig('js'),
  Object.assign(createConfig('es.js'), {
    experiments: {outputModule: true},
    optimization: {minimize: false},
  }),
];
