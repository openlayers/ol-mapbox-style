/*
ol-mapbox-style - Use Mapbox/MapLibre Style objects with OpenLayers
Copyright 2016-present ol-mapbox-style contributors
License: https://raw.githubusercontent.com/openlayers/ol-mapbox-style/master/LICENSE
*/

import {v8} from '@maplibre/maplibre-gl-style-spec';
import additional from './additionalspec.js';

export default {
  ...v8,
  paint_raster: {...v8.paint_raster, ...additional.paint_raster},
};
