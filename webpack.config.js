const webpack = require('webpack');
const path = require('path');
// const Config = require('dotenv').config();

// const entry = common.getEntries(false);

module.exports = {
  entry: './index.js',
  devtool: 'source-map',
  node: {fs: "empty"},
  mode: 'development',
  output: {
    path: path.resolve('./dist'), // Path of output file
    filename: 'olms.js',
    library: 'olms',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        //exclude: /node_modules/,
        //include: /node_modules\/mapbox-to-ol-style/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      }
    ]
  },
}
