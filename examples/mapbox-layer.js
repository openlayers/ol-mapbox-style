import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import MapboxVectorLayer from 'ol-mapbox-style/dist/MapboxVectorLayer';


let key = document.cookie.replace(/(?:(?:^|.*;\s*)mapbox_access_token\s*\=\s*([^;]*).*$)|^.*$/, '$1');
if (!key) {
  key = window.prompt('Enter your Mapbox API access token:');
  document.cookie = 'mapbox_access_token=' + key + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
}

new Map({
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2
  }),
  layers: [
    new MapboxVectorLayer({
      accessToken: key,
      styleURL: 'mapbox://styles/mapbox/bright-v9'
    })
  ]
});
