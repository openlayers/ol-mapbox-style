import {Map, View} from 'ol';
import {applyStyle} from 'ol-mapbox-style';
import VectorLayer from 'ol/layer/Vector.js';
import 'ol/ol.css';
import {fromLonLat} from 'ol/proj.js';

const layer = new VectorLayer();
applyStyle(layer, 'data/geojson.json');
new Map({
  target: 'map',
  layers: [layer],
  view: new View({
    center: fromLonLat([-122.19952899999998, 51.920367528011525]),
    zoom: 3,
  }),
});
