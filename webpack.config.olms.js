const path = require('path');

module.exports = {
  entry: './src/olms.js',
  devtool: 'source-map',
  node: {fs: 'empty'},
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          __dirname
        ],
        use: {
          loader: 'buble-loader'
        }
      }
    ]
  },
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
    'ol/proj': 'ol.proj',
    'ol/tilegrid': 'ol.tilegrid',
    'ol/tilegrid/TileGrid': 'ol.tilegrid.TileGrid',
    'ol/format/GeoJSON': 'ol.format.GeoJSON',
    'ol/format/MVT': 'ol.format.MVT',
    'ol/Map': 'ol.Map',
    'ol/View': 'ol.View',
    'ol/Observable': 'ol.Observable',
    'ol/layer/Tile': 'ol.layer.Tile',
    'ol/layer/Vector': 'ol.layer.Vector',
    'ol/layer/VectorTile': 'ol.layer.VectorTile',
    'ol/source/TileJSON': 'ol.source.TileJSON',
    'ol/source/Vector': 'ol.source.Vector',
    'ol/source/VectorTile': 'ol.source.VectorTile'
  }
};
