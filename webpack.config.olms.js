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
    'ol/style/style': 'ol.style.Style',
    'ol/style/circle': 'ol.style.Circle',
    'ol/style/icon': 'ol.style.Icon',
    'ol/style/stroke': 'ol.style.Stroke',
    'ol/style/fill': 'ol.style.Fill',
    'ol/geom/point': 'ol.geom.Point',
    'ol/proj': 'ol.proj',
    'ol/tilegrid': 'ol.tilegrid',
    'ol/format/geojson': 'ol.format.GeoJSON',
    'ol/format/mvt': 'ol.format.MVT',
    'ol/canvasmap': 'ol.CanvasMap',
    'ol/observable': 'ol.Observable',
    'ol/layer/tile': 'ol.layer.Tile',
    'ol/layer/vector': 'ol.layer.Vector',
    'ol/layer/vectortile': 'ol.layer.VectorTile',
    'ol/source/tilejson': 'ol.source.TileJSON',
    'ol/source/vector': 'ol.source.Vector',
    'ol/source/vectortile': 'ol.source.VectorTile',
    'ol/source/xyz': 'ol.source.XYZ'
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
