# ol-mapbox-style

Create [OpenLayers](https://openlayers.org/) maps from [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/) objects.

## Getting started

### Installation

To use the library in an application with an npm based dev environment, install it with

    npm install ol-mapbox-style

When installed this way, just import the ol-mapbox-style module, like in the usage example below. To use a standalone build of ol-mapbox-style, just include 'dist/olms.js' on your HTML page, and access the exported functions from the global `olms` object (e.g. `olms.apply()`, `olms.applyBackground()`). Note that the standalone build depends on the legacy build of OpenLayers.

**ol-mapbox-style requires [OpenLayers](https://npmjs.com/package/ol) version >= 6.13.0 < 7**.

### Usage examples

The code below creates an OpenLayers map from Mapbox's Bright v9 style, using a `https://` url:

```js
import apply from 'ol-mapbox-style';

apply('map', 'https://api.mapbox.com/styles/v1/mapbox/bright-v9?access_token=YOUR_MAPBOX_TOKEN');
```

To assign style and source to a layer only, use `applyStyle()`. `mapbox://` urls are also supported:

```js
import {applyStyle} from 'ol-mapbox-style';
import VectorTileLayer from 'ol/layer/VectorTile.js'

const layer = new VectorTileLayer({declutter: true});
applyStyle(layer, 'mapbox://styles/mapbox/bright-v9', {accessToken: 'YOUR_MAPBOX_TOKEN'});
```

Only commonly available system fonts and [Google Fonts](https://developers.google.com/fonts/) will automatically be available for any `text-font` defined in the Mapbox Style object. It is the responsibility of the application to load other fonts. Because `ol-mapbox-style` uses system and web fonts instead of PBF/SDF glyphs, the [font stack](https://www.mapbox.com/help/manage-fontstacks/) is treated a little different: style and weight are taken from the primary font (i.e. the first one in the font stack). Subsequent fonts in the font stack are only used if the primary font is not available/loaded, and they will be used with the style and weight of the primary font.

To apply the properties of the Mapbox Style's `background` layer to the map or a `VectorTile` layer, use the `applyBackground()` function.

There is also a low-level API available. To create a style function for individual OpenLayers vector or vector tile layers, use the `stylefunction` module:

```js
import {stylefunction} from 'ol-mapbox-style';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import GeoJSON from 'ol/format/GeoJSON.js';

const layer = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON(),
    url: 'data/states.geojson'
  })
});

fetch('data/states.json').then(function(response) {
  response.json().then(function(glStyle) {
    stylefunction(layer, glStyle, 'states');
  });
});
```

Note that this low-level API does not create a source for the layer, and extra work is required to set up sprite handling for styles that use icons.

## Compatibility notes

### Support for old browsers

Internet Explorer (version 11) and other old browsers (Android 4.x) are supported when polyfills for the following features are loaded:

*   `fetch` (including `Promise`)

## API

Consult the [documentation](./docs/README.md) for the full API.

## Building the library

    npm run build

The resulting distribution files will be in the `dist/` folder. To see the library in action, navigate to `dist/index.html`.

To run test locally, run

    npm test

For debugging tests in the browser, run

    npm run karma

and open a browser on the host and port indicated in the console output (usually <http://localhost:9876/>) and click the 'DEBUG' button to go to the debug environment.

[![CircleCI](https://circleci.com/gh/openlayers/ol-mapbox-style.svg?style=svg)](https://circleci.com/gh/openlayers/ol-mapbox-style)
