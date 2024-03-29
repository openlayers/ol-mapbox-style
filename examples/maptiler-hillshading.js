import 'ol/ol.css';
import olms from 'ol-mapbox-style';

let key = document.cookie.replace(
  /(?:(?:^|.*;\s*)maptiler_access_token\s*\=\s*([^;]*).*$)|^.*$/,
  '$1',
);
if (!key) {
  key = window.prompt('Enter your MapTiler API access token:');
  document.cookie =
    'maptiler_access_token=' + key + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
}

fetch(`https://api.maptiler.com/maps/outdoor-v2/style.json?key=${key}`)
  .then((response) => response.json())
  .then((style) => {
    olms(
      'map',
      Object.assign({}, style, {
        center: [13.783578, 47.609499],
        zoom: 11,
      }),
      {
        webfont:
          'https://fonts.googleapis.com/css?family={Font+Family}:{fontweight}{fontstyle}',
      },
    );
  });
