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

olms(
  'map',
  Object.assign(
    {},
    {
      'version': 8,
      'name': 'Mapbox Terrain-DEM tileset v1',
      'sources': {
        'mapbox-terrain-dem': {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
          'encoding': 'terrarium',
        },
        'mapbox': {
          'url': 'mapbox://mapbox.mapbox-streets-v7',
          'type': 'vector',
        },
      },
      'layers': [
        {
          'id': 'background',
          'type': 'background',
          'paint': {
            'background-color': '#f8f4f0',
          },
          'interactive': true,
        },
        {
          'id': 'mapbox-terrain-dem-layer',
          'source': 'mapbox-terrain-dem',
          'type': 'hillshade',
        },
        {
          'id': 'landuse_wood',
          'type': 'fill',
          'source': 'mapbox',
          'source-layer': 'landuse',
          'filter': ['==', 'class', 'wood'],
          'paint': {
            'fill-color': '#6a4',
            'fill-opacity': 0.1,
          },
          'metadata': {
            'mapbox:group': '1444849388993.3071',
          },
          'interactive': true,
        },
        {
          'interactive': true,
          'layout': {
            'line-cap': 'round',
          },
          'metadata': {
            'mapbox:group': '1444849382550.77',
          },
          'filter': [
            'all',
            ['!=', 'class', 'river'],
            ['!=', 'class', 'stream'],
            ['!=', 'class', 'canal'],
          ],
          'type': 'line',
          'source': 'mapbox',
          'id': 'waterway',
          'paint': {
            'line-color': '#a0c8f0',
            'line-width': {
              'base': 1.3,
              'stops': [
                [13, 0.5],
                [20, 2],
              ],
            },
          },
          'source-layer': 'waterway',
        },
        {
          'interactive': true,
          'layout': {
            'line-cap': 'round',
          },
          'metadata': {
            'mapbox:group': '1444849382550.77',
          },
          'filter': ['==', 'class', 'river'],
          'type': 'line',
          'source': 'mapbox',
          'id': 'waterway_river',
          'paint': {
            'line-color': '#a0c8f0',
            'line-width': {
              'base': 1.2,
              'stops': [
                [11, 0.5],
                [20, 6],
              ],
            },
          },
          'source-layer': 'waterway',
        },
        {
          'interactive': true,
          'layout': {
            'line-cap': 'round',
          },
          'metadata': {
            'mapbox:group': '1444849382550.77',
          },
          'filter': ['in', 'class', 'stream', 'canal'],
          'type': 'line',
          'source': 'mapbox',
          'id': 'waterway_stream_canal',
          'paint': {
            'line-color': '#a0c8f0',
            'line-width': {
              'base': 1.3,
              'stops': [
                [13, 0.5],
                [20, 6],
              ],
            },
          },
          'source-layer': 'waterway',
        },
        {
          'id': 'water',
          'type': 'fill',
          'source': 'mapbox',
          'source-layer': 'water',
          'paint': {
            'fill-color': '#a0c8f0',
          },
          'metadata': {
            'mapbox:group': '1444849382550.77',
          },
          'interactive': true,
        },
        {
          'id': 'water_offset',
          'paint': {
            'fill-color': 'white',
            'fill-opacity': 0.3,
            'fill-translate': [0, 2.5],
          },
          'metadata': {
            'mapbox:group': '1444849382550.77',
          },
          'interactive': true,
          'ref': 'water',
        },
        {
          'id': 'water_pattern',
          'paint': {
            'fill-translate': [0, 2.5],
            'fill-pattern': 'wave',
          },
          'metadata': {
            'mapbox:group': '1444849382550.77',
          },
          'interactive': true,
          'ref': 'water',
        },
      ],
      center: [13.783578, 47.609499],
      zoom: 11,
    }
  ),
  {accessToken: key}
);
