import 'ol/ol.css';
import {apply} from 'ol-mapbox-style';

const baseUrl = 'https://api.mapbox.com/styles/v1/mapbox/bright-v9';

let key = document.cookie.replace(/(?:(?:^|.*;\s*)mapbox_access_token\s*\=\s*([^;]*).*$)|^.*$/, '$1');
if (!key) {
  key = window.prompt('Enter your Mapbox API access token:');
  document.cookie = 'mapbox_access_token=' + key + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
}

apply('map', baseUrl + '?access_token=' + key);
