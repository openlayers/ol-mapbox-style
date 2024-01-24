import 'ol/ol.css';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import {Map, View} from 'ol';
import {applyBackground, applyStyle} from 'ol-mapbox-style';

const baseUrl = 'https://api.maptiler.com/maps/basic/style.json';

let key = document.cookie.replace(
  /(?:(?:^|.*;\s*)maptiler_access_token\s*\=\s*([^;]*).*$)|^.*$/,
  '$1',
);
if (!key) {
  key = window.prompt('Enter your MapTiler API access token:');
  document.cookie =
    'maptiler_access_token=' + key + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
}
const styleUrl = baseUrl + '?key=' + key;

const layer = new VectorTileLayer({
  declutter: true,
});
applyStyle(layer, styleUrl);
applyBackground(layer, styleUrl);
new Map({
  target: 'map',
  layers: [layer],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});
