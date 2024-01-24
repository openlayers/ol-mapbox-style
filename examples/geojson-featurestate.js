import 'ol/ol.css';
import olms, {setFeatureState} from 'ol-mapbox-style';

const styleUrl = 'data/geojson.json';

fetch(styleUrl)
  .then((response) => response.json())
  .then((glStyle) => {
    glStyle.layers.push({
      'id': 'state-hover',
      'type': 'fill',
      'source': 'states',
      'paint': {
        'fill-color': 'red',
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          0.5,
          0,
        ],
      },
    });
    return olms('map', glStyle, {styleUrl: styleUrl});
  })
  .then((map) => {
    let hoveredStateId = null;
    map.on('pointermove', function (evt) {
      const features = map.getFeaturesAtPixel(evt.pixel);
      if (features.length > 0) {
        if (hoveredStateId !== null) {
          setFeatureState(map, {source: 'states', id: hoveredStateId}, null);
        }
        hoveredStateId = features[0].getId();
        setFeatureState(
          map,
          {source: 'states', id: hoveredStateId},
          {hover: true},
        );
      } else if (hoveredStateId !== null) {
        setFeatureState(map, {source: 'states', id: hoveredStateId}, null);
        hoveredStateId = null;
      }
    });
  });
