import 'ol/ol.css';
import {apply} from 'ol-mapbox-style';

apply('map', 'data/geojson-wfs.json', {
  transformRequest: (urlStr, type) => {
    if (type === 'GeoJSON') {
      const url = new URL(urlStr + '&transformRequest=true');
      const req = new Request(url);
      return req;
    }
  },
});
