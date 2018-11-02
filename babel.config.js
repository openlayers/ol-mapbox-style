const config = {
  presets: [
    '@babel/preset-env'
  ]
};

if (process.env.NODE_ENV === 'test') {
  config.plugins = ['rewire'];
}

module.exports = config;
