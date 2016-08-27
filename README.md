# ol-mapbox-gl-style

Converts Mapbox GL Style objects for vector tile layers into OpenLayers style functions.

## Getting started

To use a standalone build of ol-mapbox-gl-style, just include 'dist/olms.js' on your HTML page. Otherwise just require the ol-mapbox-gl-style module, like in the snippet below.

The code below creates a Mapbox Streets v7 layer with the bright v9 style:

```js
var ol = require('openlayers');
var olms = require('ol-mapbox-gl-style');

var key = 'Your Mapbox Access Token here';

var tilegrid = ol.tilegrid.createXYZ({tileSize: 512, maxZoom: 22});
var layer = new ol.layer.VectorTile({
  source: new ol.source.VectorTile({
    attributions: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
      '© <a href="http://www.openstreetmap.org/copyright">' +
      'OpenStreetMap contributors</a>',
    format: new ol.format.MVT(),
    tileGrid: tilegrid,
    tilePixelRatio: 8,
    url: 'http://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/' +
        '{z}/{x}/{y}.vector.pbf?access_token=' + key
  })
});

var xhr = new XMLHttpRequest();
xhr.onload = function() {
  var resolutions = tilegrid.getResolutions();
  layer.setStyle(olms.getStyleFunction(xhr.responseText, 'mapbox', resolutions));
  map.addLayer(layer);
};
xhr.open('GET',
    'https://api.mapbox.com/styles/v1/mapbox/bright-v9?access_token=' + key);
xhr.send();
```

## API

### getStyleFunction

Creates a style function from the `glStyle` object for all layers that use
the specified `source`, which needs to be a `"type": "vector"`
source.

**Parameters**

-   `glStyle` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))** Mapbox GL style object.
-   `source` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `source` key from the Mapbox GL style object.
-   `resolutions` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** Resolutions for mapping resolution to
    zoom level. For tile layers, this can be
    `layer.getSource().getTileGrid().getResolutions()`.

Returns **ol.style.StyleFunction** Style function for use in
`ol.layer.Vector` or `ol.layer.VectorTile`.


## Building the library

    npm install
    npm run dist

The resulting binary (`olms.js`) will be in the `dist/` folder. To see the library in action, navigate to `example/index.html`.
