module.exports = {
  entry: './index.js',
  devtool: 'source-map',
  node: {fs: 'empty'},
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      }
    ]
  }
};
