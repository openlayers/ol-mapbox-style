import 'ol/ol.css';
import {apply} from 'ol-mapbox-style';

apply(
  'map',
  'https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_GCS_v2/VectorTileServer/resources/styles/',
  {
    projection: 'EPSG:4326',
  },
);
