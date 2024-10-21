import 'ol/ol.css';
import {apply} from 'ol-mapbox-style';
import {register as registerPMTiles} from 'pmtiles-protocol';

registerPMTiles();

apply('map', 'data/protomaps-dark-style.json');
