const {join} = require('path');
const path = require('path');

module.exports = function (karma) {
  karma.set({
    browsers: ['ChromeHeadless'],
    browserDisconnectTolerance: 2,
    frameworks: ['webpack', 'mocha'],
    client: {
      runInParent: true,
      mocha: {
        timeout: 2500,
      },
    },
    files: [
      {
        pattern: '**/*.test.js',
        watched: false,
      },
      {
        pattern: '**/*',
        included: false,
        watched: false,
      },
    ],
    proxies: {
      '/fixtures/': '/base/fixtures/',
    },
    preprocessors: {
      '**/*.js': ['webpack', 'sourcemap'],
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-coverage-istanbul-reporter',
    ],
    reporters: ['dots', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['html', 'text-summary'],
      dir: path.join(__dirname, '..', 'coverage'),
      fixWebpackSourcePaths: true,
    },
    webpack: {
      devtool: 'inline-source-map',
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js/,
            include: /src/,
            exclude: /node_modules|\.test\.js$/,
            use: 'coverage-istanbul-loader',
          },
          {
            test: /\.js$/,
            enforce: 'pre',
            use: ['remove-flow-types-loader'],
            include: join(
              __dirname,
              '..',
              'node_modules',
              '@mapbox',
              'mapbox-gl-style-spec'
            ),
          },
        ],
      },
      resolve: {
        fallback: {
          'assert': path.join(__dirname, '..', 'node_modules', 'nanoassert'),
        },
      },
    },
    webpackMiddleware: {
      noInfo: true,
    },
  });

  process.env.CHROME_BIN = require('puppeteer').executablePath();
};
