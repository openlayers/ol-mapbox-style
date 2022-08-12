import 'ol/ol.css';
import olms from 'ol-mapbox-style';
import {Group as LayerGroup} from 'ol/layer.js';
import {Map, View} from 'ol';

const layerGroup = new LayerGroup();

new Map({
  target: 'map',
  view: new View({
    center: [-10203186.115192635, 4475744.563386],
    zoom: 4,
  }),
  layers: [layerGroup],
});

layerGroup.on('propertychange', () => {
  console.info(layerGroup.getLayers().getArray()); //eslint-disable-line no-console
});

olms(layerGroup, 'data/geojson-wms.json');
