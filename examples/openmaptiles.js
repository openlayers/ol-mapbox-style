import 'ol/ol.css';
import olms from 'ol-mapbox-style';

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

olms('map', baseUrl + '?key=' + key);
