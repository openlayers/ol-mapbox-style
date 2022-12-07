import 'ol/ol.css';
import olms from 'ol-mapbox-style';

let key = document.cookie.replace(
  /(?:(?:^|.*;\s*)mapbox_access_token\s*\=\s*([^;]*).*$)|^.*$/,
  '$1'
);
if (!key) {
  key = window.prompt('Enter your Mapbox API access token:');
  document.cookie =
    'mapbox_access_token=' + key + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
}

olms(
  'map',
  {
    'version': 8,
    'center': [6.21354193248299, 46.44977405],
    'zoom': 12,
    'sources': {
      'dem': {
        'type': 'raster-dem',
        'tiles': [
          'https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}@2x.pngraw?access_token=pk.eyJ1IjoidnJvZ2VyIiwiYSI6ImNsYmFraTY0ZjE1Z3AzcXFoZ3NhanNteGIifQ.pBIhqRe5plCM0akTi-HRpA',
        ],
      },
    },
    'layers': [
      {
        'id': 'hillshading',
        'type': 'hillshade',
        'source': 'dem',
        'paint': {
          'hillshade-exaggeration': 0.25,
          'hillshade-light-direction': 45,
          'hillshade-highlight-color': '#025E73',
          'hillshade-shadow-color': '#011F26',
          'hillshade-accent-color': '#F2A71B',
        },
      },
    ],
  },
  {accessToken: key}
);
