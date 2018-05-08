const path = require('path');

module.exports = {
  entry: './olms.js',
  devtool: 'source-map',
  node: {fs: 'empty'},
  mode: 'production',
  output: {
    path: path.resolve('./dist'), // Path of output file
    filename: 'olms.js',
    library: 'olms',
    libraryTarget: 'assign',
    libraryExport: 'default'
  },
  externals: {
    'ol/style/Style': 'ol.style.Style',
    'ol/style/Circle': 'ol.style.Circle',
    'ol/style/Icon': 'ol.style.Icon',
    'ol/style/Stroke': 'ol.style.Stroke',
    'ol/style/Fill': 'ol.style.Fill',
    'ol/geom/Point': 'ol.geom.Point',
    'ol/proj': 'ol.proj',
    'ol/tilegrid': 'ol.tilegrid',
    'ol/format/GeoJSON': 'ol.format.GeoJSON',
    'ol/format/MVT': 'ol.format.MVT',
    'ol/Map': 'ol.Map',
    'ol/Observable': 'ol.Observable',
    'ol/layer/Tile': 'ol.layer.Tile',
    'ol/layer/Vector': 'ol.layer.Vector',
    'ol/layer/VectorTile': 'ol.layer.VectorTile',
    'ol/source/TileJSON': 'ol.source.TileJSON',
    'ol/source/Vector': 'ol.source.Vector',
    'ol/source/VectorTile': 'ol.source.VectorTile',
    'ol/source/XYZ': 'ol.source.XYZ'
  },
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
