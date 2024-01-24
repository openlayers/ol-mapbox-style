import 'ol/ol.css';
import olms from 'ol-mapbox-style';

olms(
  'map',
  'https://www.arcgis.com/sharing/rest/content/items/2afe5b807fa74006be6363fd243ffb30/resources/styles/root.json',
  {
    transformRequest(url, type) {
      if (type === 'Source') {
        return new Request(
          url.replace('/VectorTileServer', '/VectorTileServer/'),
        );
      }
    },
  },
);
