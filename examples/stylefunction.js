import 'ol/ol.css';
import GeoJsonFormat from 'ol/format/GeoJSON.js';
import Map from 'ol/Map.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import View from 'ol/View.js';

import {stylefunction} from 'ol-mapbox-style';

const layer = new VectorLayer({
  declutter: true,
  source: new VectorSource({
    format: new GeoJsonFormat(),
    url: 'data/states.geojson',
  }),
});

const map = new Map({
  target: 'map',
  view: new View({
    center: [-13603186.115192635, 6785744.563386],
    zoom: 2,
  }),
});

fetch('data/states.json')
  .then((r) => r.json())
  .then((glStyle) => {
    stylefunction(layer, glStyle, 'states');
    if (map.getLayers().getArray().indexOf(layer) === -1) {
      map.addLayer(layer);
    }
  });
