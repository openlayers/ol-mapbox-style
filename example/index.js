var ol = require('openlayers');
var olms = require('../');

require('../node_modules/openlayers/dist/ol.css');

var key = document.cookie.replace(/(?:(?:^|.*;\s*)mapbox_access_token\s*\=\s*([^;]*).*$)|^.*$/, '$1');
if (!key) {
  key = window.prompt('Enter your Mapbox API access token:');
  document.cookie = 'mapbox_access_token=' + key + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
}

var tilegrid = ol.tilegrid.createXYZ({tileSize: 512, maxZoom: 22});
var layer = new ol.layer.VectorTile({
  source: new ol.source.VectorTile({
    attributions: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
      '© <a href="http://www.openstreetmap.org/copyright">' +
      'OpenStreetMap contributors</a>',
    format: new ol.format.MVT(),
    tileGrid: tilegrid,
    tilePixelRatio: 8,
    url: 'https://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/' +
        '{z}/{x}/{y}.vector.pbf?access_token=' + key
  })
});
var map = new ol.Map({
  target: 'map',
  view: new ol.View({
    center: [1822363, 6141705],
    zoom: 11,
    maxResolution: 78271.51696402048
  })
});
var url = 'https://api.mapbox.com/styles/v1/mapbox/bright-v9?access_token=' + key;
var xhr = new XMLHttpRequest();
xhr.onload = function() {
  var resolutions = tilegrid.getResolutions();
  layer.setStyle(olms.getStyleFunction(xhr.responseText, 'mapbox', resolutions));
  map.addLayer(layer);
};
xhr.open('GET', url);
xhr.send();
