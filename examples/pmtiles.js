import 'ol/ol.css';
import {apply} from 'ol-mapbox-style';
import {fetch} from 'pmtiles-protocol';

apply('map', 'data/protomaps-dark-style.json', {
  transformRequest: (url) => fetch(url),
});
