import 'ol/ol.css';
import olms from 'ol-mapbox-style';

let key = document.cookie.replace(
  /(?:(?:^|.*;\s*)mapbox_access_token\s*\=\s*([^;]*).*$)|^.*$/,
  '$1'
);
if (!key) {
  key = window.prompt('Enter your Mapbox API access token:');
  if (key) {
    document.cookie =
      'mapbox_access_token=' + key + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
  }
}

olms('map', 'mapbox://styles/mapbox/bright-v9', {accessToken: key});
