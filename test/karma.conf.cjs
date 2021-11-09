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
    reporters: ['dots'],
    webpack: {
      devtool: 'inline-source-map',
      mode: 'development',
    },
    webpackMiddleware: {
      noInfo: true,
    },
  });

  process.env.CHROME_BIN = require('puppeteer').executablePath();
};
