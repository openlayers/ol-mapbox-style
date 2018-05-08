import 'ol/ol.css';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJsonFormat from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';

import stylefunction from 'ol-mapbox-style/stylefunction';

const layer = new VectorLayer({
  declutter: true,
  source: new VectorSource({
    format: new GeoJsonFormat(),
    url: 'data/states.geojson'
  })
});

const map = new Map({
  target: 'map',
  view: new View({
    center: [-13603186.115192635, 6785744.563386],
    zoom: 2
  })
});

fetch('data/states.json')
  .then(r => r.json())
  .then((glStyle) => {
    stylefunction(layer, glStyle, 'states');
    map.addLayer(layer);
  });
