import 'ol/ol.css';
import olms from 'ol-mapbox-style';

const style = {
  version: 8,
  name: 'Terrarium',
  center: [13.783578, 47.609499],
  zoom: 11,
  sources: {
    osm: {
      type: 'raster',
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.',
      tileSize: 256,
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      maxzoom: 19,
    },
    terrarium: {
      type: 'raster-dem',
      attribution:
        '<a href="https://github.com/tilezen/joerd/blob/master/docs/attribution.md" target="_blank">Data sources and attribution</a>',
      tileSize: 256,
      tiles: [
        'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',
      ],
      maxzoom: 15,
      encoding: 'terrarium',
    },
  },
  layers: [
    {
      id: 'osm',
      type: 'raster',
      source: 'osm',
    },
    {
      id: 'hillshade',
      type: 'hillshade',
      source: 'terrarium',
      paint: {
        'hillshade-accent-color': '#D8E8CF',
        'hillshade-exaggeration': {
          stops: [
            [6, 0.4],
            [14, 0.35],
            [18, 0.25],
          ],
        },
        'hillshade-shadow-color': '#6C6665',
        'hillshade-highlight-color': '#B8AAA3',
      },
    },
  ],
};

olms('map', style);
