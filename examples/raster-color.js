import olms from 'ol-mapbox-style';
import 'ol/ol.css';

const style = {
  version: 8,
  name: 'Elevation bands',
  center: [13.783578, 47.609499],
  zoom: 9,
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
      type: 'raster',
      attribution:
        '<a href="https://github.com/tilezen/joerd/blob/master/docs/attribution.md" target="_blank">Data sources and attribution</a>',
      tileSize: 256,
      tiles: [
        'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',
      ],
      maxzoom: 15,
    },
  },
  layers: [
    {
      id: 'osm',
      type: 'raster',
      source: 'osm',
    },
    {
      id: 'elevation',
      type: 'raster',
      source: 'terrarium',
      paint: {
        // Terrarium tiles encode elevation in meters as
        // R * 256 + G + B / 256 - 32768, with channels from 0 to 255.
        // The mix weights channels from 0 to 1, so they are multiplied by 255.
        'raster-color-mix': [256 * 255, 255, 255 / 256, -32768],
        // The raster value is now in meters.
        'raster-color-range': [0, 4000],
        'raster-color': [
          'step',
          ['raster-value'],
          'rgba(0, 0, 0, 0)',
          500,
          'rgba(102, 170, 68, 0.5)',
          1000,
          'rgba(221, 204, 85, 0.5)',
          1500,
          'rgba(221, 136, 51, 0.5)',
          2000,
          'rgba(170, 68, 34, 0.5)',
          2500,
          'rgba(255, 255, 255, 0.8)',
        ],
        // Interpolating encoded pixels would give wrong elevations.
        'raster-resampling': 'nearest',
      },
    },
  ],
};

olms('map', style);
