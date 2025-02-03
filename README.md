Create [OpenLayers](https://openlayers.org/) maps from [Mapbox Style](https://docs.mapbox.com/mapbox-gl-js/style-spec/) or [MapLibre Style](https://maplibre.org/maplibre-style-spec/) objects.

## Getting started

Get an impression of what this library does by exploring the [live examples](https://openlayers.org/ol-mapbox-style/examples/). 

### Installation

To use the library in an application with an npm based dev environment, install it with

    npm install ol-mapbox-style

When installed this way, just import from ol-mapbox-style, as shown in the usage examples below. To use a standalone build of ol-mapbox-style, include 'dist/olms.js' on your HTML page, and access the exported functions from the global `olms` object (e.g. `olms.apply()`, `olms.applyBackground()`). Note that the standalone build depends on the full build of OpenLayers.

**ol-mapbox-style >=12.4 is required for [OpenLayers](https://npmjs.com/package/ol) >10.3.1**.

**ol-mapbox-style >=9 requires [OpenLayers](https://npmjs.com/package/ol) version >=7 &lt;11**.

**ol-mapbox-style 8 requires [OpenLayers](https://npmjs.com/package/ol) version >=6.13 &lt;7**.

### Usage

**See the [project page](https://openlayers.org/ol-mapbox-style/) for the full documentation.**

The code below creates an OpenLayers map from Mapbox's Bright v9 style, using a `https://` url:

```js
import { apply } from 'ol-mapbox-style';

apply('map', 'https://api.mapbox.com/styles/v1/mapbox/bright-v9?access_token=YOUR_MAPBOX_TOKEN');
```

To assign style and source to a layer only, use `applyStyle()`. `mapbox://` urls are also supported:

```js
import {applyStyle} from 'ol-mapbox-style';
import VectorTileLayer from 'ol/layer/VectorTile.js'

const layer = new VectorTileLayer({declutter: true});
applyStyle(layer, 'mapbox://styles/mapbox/bright-v9', {accessToken: 'YOUR_MAPBOX_TOKEN'});
```

To apply the properties of the Mapbox/MapLibre Style's `background` layer to the map or a `VectorTile` layer, use the `applyBackground()` function.

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

### Font handling

`ol-mapbox-style` cannot use PBF/SDF glyphs for `text-font` layout property, as defined in the Mapbox/MapLibre Style specification. Instead, it relies on web fonts. A `ol:webfonts` metadata property can be set on the root of the Style object to specify a location for webfonts, e.g.

```js
{
  "version": 8,
  "metadata": {
    "ol:webfonts": "https://my.server/fonts/{font-family}/{fontweight}{-fontstyle}.css"
  }
  // ...
}
```

As an alternative, the `webfonts` option of the `apply()` or `applyStyle()` functions can be used.

The following placeholders can be used in the template url:

- `{font-family}`: CSS font family converted to lowercase, blanks replaced with -, e.g. noto-sans
- `{Font+Family}`: CSS font family in original case, blanks replaced with +, e.g. Noto+Sans
- `{fontweight}`: CSS font weight (numeric), e.g. 400, 700
- `{fontstyle}`: CSS font style, e.g. normal, italic
- `{-fontstyle}`: CSS font style other than normal, e.g. -italic or empty string for normal

If no `metadata['ol:webfonts']` property is available on the Style object, [Fontsource Fonts](https://fontsource.org/) will be used. It is also possible for the application to load other fonts, using css. If a font is already available in the browser, `ol-mapbox-style` will not load it.

Because of this difference, the [font stack](https://www.mapbox.com/help/manage-fontstacks/) is treated a little different than defined in the spec: style and weight are taken from the primary font (i.e. the first one in the font stack). Subsequent fonts in the font stack are only used if the primary font is not available/loaded, and they will be used with the style and weight of the primary font.

## Building the library

    npm run build

The resulting distribution files will be in the `dist/` folder. To see the library in action, navigate to `dist/index.html`.

To run test locally, run

    npm test

For debugging tests in the browser, run

    npm run karma

and open a browser on the host and port indicated in the console output (usually <http://localhost:9876/>) and click the 'DEBUG' button to go to the debug environment.

[![Test Job](https://github.com/openlayers/ol-mapbox-style/actions/workflows/test.yml/badge.svg)](https://github.com/openlayers/ol-mapbox-style/actions/workflows/test.yml)
