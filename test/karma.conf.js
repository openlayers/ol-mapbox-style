const path = require('path');

module.exports = function(karma) {
  karma.set({
    browserDisconnectTolerance: 2,
    frameworks: ['mocha'],
    client: {
      runInParent: true,
      mocha: {
        timeout: 2500
      }
    },
    files: [
      {
        pattern: path.resolve(__dirname, './index_test.js'),
        watched: false
      }, {
        pattern: '**/*',
        included: false,
        watched: false
      }
    ],
    exclude: [
      '**/*.test.js'
    ],
    proxies: {
      '/fixtures/': '/base/fixtures/'
    },
    preprocessors: {
      '**/*.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots'],
    webpack: {
      devtool: 'inline-source-map',
      node: {fs: 'empty'},
      mode: 'development'
    },
    webpackMiddleware: {
      noInfo: true
    }
  });

  process.env.CHROME_BIN = require('puppeteer').executablePath();
  if (process.env.CIRCLECI) {
    karma.set({
      browsers: ['Chrome'],
      preprocessors: {
        '../src/**/*.js': ['coverage']
      },
      coverageReporter: {
        reporters: [
          {
            type: 'lcovonly', // that's enough for coveralls, no HTML
            dir: '../coverage/',
            subdir: '.'
          },
          {
            type: 'text-summary' // prints the textual summary to the terminal
          }
        ]
      }
    });
  } else {
    karma.set({
      browsers: ['ChromeHeadless']
    });
  }
};
