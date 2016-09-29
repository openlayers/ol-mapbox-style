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

fetch('https://api.mapbox.com/styles/v1/mapbox/bright-v9?access_token=' + key).then(function(response) {
  response.json().then(function(glStyle) {
    glStyle.sprite = 'https://api.mapbox.com/styles/v1/mapbox/bright-v9/sprite?access_token=' + key;
    olms.applyStyle(layer, glStyle, 'mapbox').then(function() {
      map.addLayer(layer);
    });
  });
});
```

Note that it is the responsibility of the application to load web fonts used by the GL Style.

## API

### fontWeights

Mappings of common font weight terms to numerical weights. The default is
based on <http://www.css3-tutorial.net/text-font/font-weight>. Weight terms are
all lowercase, with dashes separating words.

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
-   `onChange` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Callback which will be called when the style is
    ready to use for rendering, and every time a new resource (e.g. icon sprite
    or font) is ready to be applied.

Returns **ol.style.StyleFunction** Style function for use in
`ol.layer.Vector` or `ol.layer.VectorTile`.

### applyStyle

Applies a style function to an `ol.layer.VectorTile` with an
`ol.source.VectorTile`. The style function will render all layers from the
`glStyle` object that use the specified `source`, which needs to be a
`"type": "vector"` source.

**Parameters**

-   `layer` **ol.layer.VectorTile** OpenLayers layer.
-   `glStyle` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object))** Mapbox GL style object.
-   `source` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** `source` key from the Mapbox GL style object.

Returns **[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)** Promise which will be resolved when the style can be used
for rendering.

## Building the library

    npm install
    npm run dist

The resulting binary (`olms.js`) will be in the `dist/` folder. To see the library in action, navigate to `example/index.html`.
