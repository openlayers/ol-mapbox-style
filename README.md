# ol-mapbox-style

Create [OpenLayers](https://openlayers.org/) maps from [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/) objects.

## Getting started

Get an impression of what this library does by exploring the [live examples](https://openlayers.org/ol-mapbox-style/examples/). 

### Installation

To use the library in an application with an npm based dev environment, install it with

    npm install ol-mapbox-style

When installed this way, just import the ol-mapbox-style module, like in the usage example below. To use a standalone build of ol-mapbox-style, just include 'dist/olms.js' on your HTML page, and access the exported functions from the global `olms` object (e.g. `olms.apply()`, `olms.applyBackground()`). Note that the standalone build depends on the full build of OpenLayers.

**ol-mapbox-style >=v9 requires [OpenLayers](https://npmjs.com/package/ol) version >=7**.

**ol-mapbox-style v8 requires [OpenLayers](https://npmjs.com/package/ol) version >=6.13.0 &lt;7**.

### Usage

**See the [API](#api) section for the full documentation.**

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

### Font handling

`ol-mapbox-style` cannot use PBF/SDF glyphs for `text-font` layout property, as defined in the Mapbox Style specification. Instead, it relies on web fonts. A `ol:webfonts` metadata property can be set on the root of the Style object to specify a location for webfonts, e.g.

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

# API

<a name="readmemd"></a>

## ol-mapbox-style

### Table of contents

#### References

- [default](#default)

#### Modules

- [\\&lt;internal>](#modulesinternal_md)

#### Classes

- [MapboxVectorLayer](#classesmapboxvectorlayermd)

#### Functions

- [addMapboxLayer](#addMapboxLayer)
- [apply](#apply)
- [applyBackground](#applyBackground)
- [applyStyle](#applyStyle)
- [getFeatureState](#getFeatureState)
- [getLayer](#getLayer)
- [getLayers](#getLayers)
- [getMapboxLayer](#getMapboxLayer)
- [getSource](#getSource)
- [getStyleForLayer](#getStyleForLayer)
- [recordStyleLayer](#recordStyleLayer)
- [removeMapboxLayer](#removeMapboxLayer)
- [renderTransparent](#renderTransparent)
- [setFeatureState](#setFeatureState)
- [stylefunction](#stylefunction)
- [updateMapboxLayer](#updateMapboxLayer)
- [updateMapboxSource](#updateMapboxSource)

### References

#### default

Renames and re-exports [apply](#apply)

### Functions

#### addMapboxLayer

▸ **addMapboxLayer**(`mapOrGroup`, `mapboxLayer`, `beforeLayerId?`): `Promise`\\&lt;`void`>

Add a new Mapbox Layer object to the style. The map will be re-rendered.

##### Parameters

| Name             | Type                  | Description                                                              |
| :--------------- | :-------------------- | :----------------------------------------------------------------------- |
| `mapOrGroup`     | `Map` \| `LayerGroup` | The Map or LayerGroup `apply` was called on.                             |
| `mapboxLayer`    | `any`                 | Mapbox Layer object.                                                     |
| `beforeLayerId?` | `string`              | Optional id of the Mapbox Layer before the new layer that will be added. |

##### Returns

`Promise`\\&lt;`void`>

Resolves when the added layer is available.

* * *

#### apply

▸ **apply**(`mapOrGroupOrElement`, `style`, `options?`): `Promise`\\&lt;`Map` \| `LayerGroup`>

Loads and applies a Mapbox Style object into an OpenLayers Map or LayerGroup.
This includes the map background, the layers, and for Map instances that did not
have a View defined yet also the center and the zoom.

**Example:**

```js
import apply from 'ol-mapbox-style';

apply('map', 'mapbox://styles/mapbox/bright-v9', {accessToken: 'YOUR_MAPBOX_TOKEN'});
```

The center and zoom will only be set if present in the Mapbox Style document,
and if not already set on the OpenLayers map.

Layers will be added to the OpenLayers map, without affecting any layers that
might already be set on the map.

Layers added by `apply()` will have two additional properties:

- `mapbox-source`: The `id` of the Mapbox Style document's source that the
  OpenLayers layer was created from. Usually `apply()` creates one
  OpenLayers layer per Mapbox Style source, unless the layer stack has
  layers from different sources in between.
- `mapbox-layers`: The `id`s of the Mapbox Style document's layers that are
  included in the OpenLayers layer.

This function sets an additional `mapbox-style` property on the OpenLayers
Map or LayerGroup instance, which holds the Mapbox Style object.

##### Parameters

| Name                  | Type                                               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :-------------------- | :------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mapOrGroupOrElement` | `string` \| `Map` \| `LayerGroup` \| `HTMLElement` | Either an existing OpenLayers Map instance, or a HTML element, or the id of a HTML element that will be the target of a new OpenLayers Map, or a layer group. If layer group, styles releated to the map and view will be ignored.                                                                                                                                                                                                                                                                                                                                    |
| `style`               | `any`                                              | JSON style object or style url pointing to a Mapbox Style object. When using Mapbox APIs, the url is the `styleUrl` shown in Mapbox Studio's "share" panel. In addition, the `accessToken` option (see below) must be set. When passed as JSON style object, all OpenLayers layers created by `apply()` will be immediately available, but they may not have a source yet (i.e. when they are defined by a TileJSON url in the Mapbox Style document). When passed as style url, layers will be added to the map when the Mapbox Style document is loaded and parsed. |
| `options`             | [`Options`](#interfacesinternal_optionsmd)         | Options.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

##### Returns

`Promise`\\&lt;`Map` \| `LayerGroup`>

A promise that resolves after all layers have been added to
the OpenLayers Map instance or LayerGroup, their sources set, and their styles applied. The
`resolve` callback will be called with the OpenLayers Map instance or LayerGroup as
argument.

* * *

#### applyBackground

▸ **applyBackground**(`mapOrLayer`, `glStyle`, `options?`): `Promise`\\&lt;`any`>

Applies properties of the Mapbox Style's first `background` layer to the
provided map or layer (group).

**Example:**

```js
import {applyBackground} from 'ol-mapbox-style';
import {Map} from 'ol';

const map = new Map({target: 'map'});
applyBackground(map, 'https://api.maptiler.com/maps/basic/style.json?key=YOUR_OPENMAPTILES_TOKEN');
```

##### Parameters

| Name         | Type                                       | Description                      |
| :----------- | :----------------------------------------- | :------------------------------- |
| `mapOrLayer` | `Map` \| `BaseLayer`                       | OpenLayers Map or layer (group). |
| `glStyle`    | `any`                                      | Mapbox Style object or url.      |
| `options`    | [`Options`](#interfacesinternal_optionsmd) | Options.                         |

##### Returns

`Promise`\\&lt;`any`>

Promise that resolves when the background is applied.

* * *

#### applyStyle

▸ **applyStyle**(`layer`, `glStyle`, `sourceOrLayersOrOptions?`, `optionsOrPath?`, `resolutions?`): `Promise`\\&lt;`any`>

Applies a style function to an `ol/layer/VectorTile` or `ol/layer/Vector`
with an `ol/source/VectorTile` or an `ol/source/Vector`. If the layer does not have a source
yet, it will be created and populated from the information in the `glStyle` (unless `updateSource` is
set to `false`).

**Example:**

```js
import {applyStyle} from 'ol-mapbox-style';
import {VectorTile} from 'ol/layer.js';

const layer = new VectorTile({declutter: true});
applyStyle(layer, 'https://api.maptiler.com/maps/basic/style.json?key=YOUR_OPENMAPTILES_TOKEN');
```

The style function will render all layers from the `glStyle` object that use the source
of the first layer, the specified `source`, or a subset of layers from the same source. The
source needs to be a `"type": "vector"` or `"type": "geojson"` source.

Two additional properties will be set on the provided layer:

- `mapbox-source`: The `id` of the Mapbox Style document's source that the
  OpenLayers layer was created from. Usually `apply()` creates one
  OpenLayers layer per Mapbox Style source, unless the layer stack has
  layers from different sources in between.
- `mapbox-layers`: The `id`s of the Mapbox Style document's layers that are
  included in the OpenLayers layer.

##### Parameters

| Name                       | Type                                                                                                                                   | Default value | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `layer`                    | `VectorLayer`\\&lt;`any`> \| `VectorTileLayer`\\&lt;`any`>                                                                             | `undefined`   | OpenLayers layer. When the layer has a source configured, it will be modified to use the configuration from the glStyle's `source`. Options specified on the layer's source will override those from the glStyle's `source`, except for `url` and `tileUrlFunction`. When the source projection is the default (`EPSG:3857`), the `tileGrid` will also be overridden. If you'd rather not have ol-mapbox-style modify the source, configure `applyStyle()` with the `updateSource: false` option. |
| `glStyle`                  | `any`                                                                                                                                  | `undefined`   | Mapbox Style object.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `sourceOrLayersOrOptions?` | `string` \| `string`\[] \| [`Options`](#interfacesinternal_optionsmd) & [`ApplyStyleOptions`](#interfacesinternal_applystyleoptionsmd) | `''`          | Options or `source` key or an array of layer `id`s from the Mapbox Style object. When a `source` key is provided, all layers for the specified source will be included in the style function. When layer `id`s are provided, they must be from layers that use the same source. When not provided or a falsey value, all layers using the first source specified in the glStyle will be rendered.                                                                                                 |
| `optionsOrPath?`           | `string` \| [`Options`](#interfacesinternal_optionsmd) & [`ApplyStyleOptions`](#interfacesinternal_applystyleoptionsmd)                | `{}`          | **Deprecated**. Options. Alternatively the path of the style file (only required when a relative path is used for the `"sprite"` property of the style).                                                                                                                                                                                                                                                                                                                                          |
| `resolutions?`             | `number`\[]                                                                                                                            | `undefined`   | **Deprecated**. Resolutions for mapping resolution to zoom level. Only needed when working with non-standard tile grids or projections, can also be supplied with options.                                                                                                                                                                                                                                                                                                                        |

##### Returns

`Promise`\\&lt;`any`>

Promise which will be resolved when the style can be used
for rendering.

* * *

#### getFeatureState

▸ **getFeatureState**(`mapOrLayer`, `feature`): `any`

Sets or removes a feature state. The feature state is taken into account for styling,
just like the feature's properties, and can be used e.g. to conditionally render selected
features differently.

##### Parameters

| Name         | Type                                                                | Description                               |
| :----------- | :------------------------------------------------------------------ | :---------------------------------------- |
| `mapOrLayer` | `Map` \| `VectorLayer`\\&lt;`any`> \| `VectorTileLayer`\\&lt;`any`> | Map or layer to set the feature state on. |
| `feature`    | [`FeatureIdentifier`](#interfacesinternal_featureidentifiermd)      | Feature identifier.                       |

##### Returns

`any`

Feature state or `null` when no feature state is set for the given
feature identifier.

* * *

#### getLayer

▸ **getLayer**(`map`, `layerId`): `Layer`\\&lt;`Source`, `LayerRenderer`\\&lt;`any`>>

Get the OpenLayers layer instance that contains the provided Mapbox Style
`layer`. Note that multiple Mapbox Style layers are combined in a single
OpenLayers layer instance when they use the same Mapbox Style `source`.

##### Parameters

| Name      | Type                  | Description                   |
| :-------- | :-------------------- | :---------------------------- |
| `map`     | `Map` \| `LayerGroup` | OpenLayers Map or LayerGroup. |
| `layerId` | `string`              | Mapbox Style layer id.        |

##### Returns

`Layer`\\&lt;`Source`, `LayerRenderer`\\&lt;`any`>>

OpenLayers layer instance.

* * *

#### getLayers

▸ **getLayers**(`map`, `sourceId`): `Layer`\\&lt;`Source`, `LayerRenderer`\\&lt;`any`>>\[]

Get the OpenLayers layer instances for the provided Mapbox Style `source`.

##### Parameters

| Name       | Type                  | Description                   |
| :--------- | :-------------------- | :---------------------------- |
| `map`      | `Map` \| `LayerGroup` | OpenLayers Map or LayerGroup. |
| `sourceId` | `string`              | Mapbox Style source id.       |

##### Returns

`Layer`\\&lt;`Source`, `LayerRenderer`\\&lt;`any`>>\[]

OpenLayers layer instances.

* * *

#### getMapboxLayer

▸ **getMapboxLayer**(`mapOrGroup`, `layerId`): `any`

Get the Mapbox Layer object for the provided `layerId`.

##### Parameters

| Name         | Type                  | Description        |
| :----------- | :-------------------- | :----------------- |
| `mapOrGroup` | `Map` \| `LayerGroup` | Map or LayerGroup. |
| `layerId`    | `string`              | Mapbox Layer id.   |

##### Returns

`any`

Mapbox Layer object.

* * *

#### getSource

▸ **getSource**(`map`, `sourceId`): `Source`

Get the OpenLayers source instance for the provided Mapbox Style `source`.

##### Parameters

| Name       | Type                  | Description                   |
| :--------- | :-------------------- | :---------------------------- |
| `map`      | `Map` \| `LayerGroup` | OpenLayers Map or LayerGroup. |
| `sourceId` | `string`              | Mapbox Style source id.       |

##### Returns

`Source`

OpenLayers source instance.

* * *

#### getStyleForLayer

▸ **getStyleForLayer**(`feature`, `resolution`, `olLayer`, `layerId`): `Style`\[]

Get the the style for a specific Mapbox layer only. This can be useful for creating a legend.

##### Parameters

| Name         | Type                                                       | Description                                 |
| :----------- | :--------------------------------------------------------- | :------------------------------------------ |
| `feature`    | `Feature`\\&lt;`Geometry`> \| `RenderFeature`              | OpenLayers feature.                         |
| `resolution` | `number`                                                   | View resolution.                            |
| `olLayer`    | `VectorLayer`\\&lt;`any`> \| `VectorTileLayer`\\&lt;`any`> | OpenLayers layer.                           |
| `layerId`    | `string`                                                   | Id of the Mapbox layer to get the style for |

##### Returns

`Style`\[]

Styles for the provided Mapbox layer.

* * *

#### recordStyleLayer

▸ **recordStyleLayer**(`record?`): `void`

Turns recording of the Mapbox Style's `layer` on and off. When turned on,
the layer that a rendered feature belongs to will be set as the feature's
`mapbox-layer` property.

##### Parameters

| Name     | Type      | Default value | Description                         |
| :------- | :-------- | :------------ | :---------------------------------- |
| `record` | `boolean` | `false`       | Recording of the style layer is on. |

##### Returns

`void`

* * *

#### removeMapboxLayer

▸ **removeMapboxLayer**(`mapOrGroup`, `mapboxLayerIdOrLayer`): `void`

Remove a Mapbox Layer object from the style. The map will be re-rendered.

##### Parameters

| Name                   | Type                  | Description                                  |
| :--------------------- | :-------------------- | :------------------------------------------- |
| `mapOrGroup`           | `Map` \| `LayerGroup` | The Map or LayerGroup `apply` was called on. |
| `mapboxLayerIdOrLayer` | `any`                 | Mapbox Layer id or Mapbox Layer object.      |

##### Returns

`void`

* * *

#### renderTransparent

▸ **renderTransparent**(`enabled`): `void`

Configure whether features with a transparent style should be rendered. When
set to `true`, it will be possible to hit detect content that is not visible,
like transparent fills of polygons, using `ol/layer/Layer#getFeatures()` or
`ol/Map#getFeaturesAtPixel()`

##### Parameters

| Name      | Type      | Description                                                       |
| :-------- | :-------- | :---------------------------------------------------------------- |
| `enabled` | `boolean` | Rendering of transparent elements is enabled. Default is `false`. |

##### Returns

`void`

* * *

#### setFeatureState

▸ **setFeatureState**(`mapOrLayer`, `feature`, `state`): `void`

Sets or removes a feature state. The feature state is taken into account for styling,
just like the feature's properties, and can be used e.g. to conditionally render selected
features differently.

The feature state will be stored on the OpenLayers layer matching the feature identifier, in the
`mapbox-featurestate` property.

##### Parameters

| Name         | Type                                                                | Description                                               |
| :----------- | :------------------------------------------------------------------ | :-------------------------------------------------------- |
| `mapOrLayer` | `Map` \| `VectorLayer`\\&lt;`any`> \| `VectorTileLayer`\\&lt;`any`> | OpenLayers Map or layer to set the feature state on.      |
| `feature`    | [`FeatureIdentifier`](#interfacesinternal_featureidentifiermd)      | Feature identifier.                                       |
| `state`      | `any`                                                               | Feature state. Set to `null` to remove the feature state. |

##### Returns

`void`

* * *

#### stylefunction

▸ **stylefunction**(`olLayer`, `glStyle`, `sourceOrLayers`, `resolutions?`, `spriteData?`, `spriteImageUrl?`, `getFonts?`, `getImage?`, `...args`): `StyleFunction`

Creates a style function from the `glStyle` object for all layers that use
the specified `source`, which needs to be a `"type": "vector"` or
`"type": "geojson"` source and applies it to the specified OpenLayers layer.

Two additional properties will be set on the provided layer:

- `mapbox-source`: The `id` of the Mapbox Style document's source that the
  OpenLayers layer was created from. Usually `apply()` creates one
  OpenLayers layer per Mapbox Style source, unless the layer stack has
  layers from different sources in between.
- `mapbox-layers`: The `id`s of the Mapbox Style document's layers that are
  included in the OpenLayers layer.

This function also works in a web worker. In worker mode, the main thread needs
to listen to messages from the worker and respond with another message to make
sure that sprite image loading works:

```js
 worker.addEventListener('message', event => {
  if (event.data.action === 'loadImage') {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.addEventListener('load', function() {
      createImageBitmap(image, 0, 0, image.width, image.height).then(imageBitmap => {
        worker.postMessage({
          action: 'imageLoaded',
          image: imageBitmap,
          src: event.data.src
        }, [imageBitmap]);
      });
    });
    image.src = event.data.src;
  }
});
```

##### Parameters

| Name             | Type                                                                                                                                            | Default value        | Description                                                                                                                                                                                                                                                                                                                                                       |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `olLayer`        | `VectorLayer`\\&lt;`any`> \| `VectorTileLayer`\\&lt;`any`>                                                                                      | `undefined`          | OpenLayers layer to apply the style to. In addition to the style, the layer will get two properties: `mapbox-source` will be the `id` of the `glStyle`'s source used for the layer, and `mapbox-layers` will be an array of the `id`s of the `glStyle`'s layers.                                                                                                  |
| `glStyle`        | `any`                                                                                                                                           | `undefined`          | Mapbox Style object.                                                                                                                                                                                                                                                                                                                                              |
| `sourceOrLayers` | `string` \| `string`\[]                                                                                                                         | `undefined`          | `source` key or an array of layer `id`s from the Mapbox Style object. When a `source` key is provided, all layers for the specified source will be included in the style function. When layer `id`s are provided, they must be from layers that use the same source.                                                                                              |
| `resolutions`    | `number`\[]                                                                                                                                     | `defaultResolutions` | Resolutions for mapping resolution to zoom level.                                                                                                                                                                                                                                                                                                                 |
| `spriteData`     | `any`                                                                                                                                           | `undefined`          | Sprite data from the url specified in the Mapbox Style object's `sprite` property. Only required if a `sprite` property is specified in the Mapbox Style object.                                                                                                                                                                                                  |
| `spriteImageUrl` | `string` \| `Request` \| `Promise`\\&lt;`string` \| `Request`>                                                                                  | `undefined`          | Sprite image url for the sprite specified in the Mapbox Style object's `sprite` property. Only required if a `sprite` property is specified in the Mapbox Style object.                                                                                                                                                                                           |
| `getFonts`       | (`arg0`: `string`\[], `arg1`: `string`) => `string`\[]                                                                                          | `undefined`          | Function that receives a font stack and the url template from the GL style's `metadata['ol:webfonts']` property (if set) as arguments, and returns a (modified) font stack that is available. Font names are the names used in the Mapbox Style object. If not provided, the font stack will be used as-is. This function can also be used for loading web fonts. |
| `getImage?`      | (`arg0`: `VectorLayer`\\&lt;`any`> \| `VectorTileLayer`\\&lt;`any`>, `arg1`: `string`) => `string` \| `HTMLCanvasElement` \| `HTMLImageElement` | `undefined`          | Function that returns an image or a URL for an image name. If the result is an HTMLImageElement, it must already be loaded. The layer can be used to call layer.changed() when the loading and processing of the image has finished. This function can be used for icons not in the sprite or to override sprite icons.                                           |
| `...args`        | `any`                                                                                                                                           | `undefined`          | -                                                                                                                                                                                                                                                                                                                                                                 |

##### Returns

`StyleFunction`

Style function for use in
`ol.layer.Vector` or `ol.layer.VectorTile`.

* * *

#### updateMapboxLayer

▸ **updateMapboxLayer**(`mapOrGroup`, `mapboxLayer`): `void`

Update a Mapbox Layer object in the style. The map will be re-rendered with the new style.

##### Parameters

| Name          | Type                  | Description                                  |
| :------------ | :-------------------- | :------------------------------------------- |
| `mapOrGroup`  | `Map` \| `LayerGroup` | The Map or LayerGroup `apply` was called on. |
| `mapboxLayer` | `any`                 | Updated Mapbox Layer object.                 |

##### Returns

`void`

* * *

#### updateMapboxSource

▸ **updateMapboxSource**(`mapOrGroup`, `id`, `mapboxSource`): `Promise`\\&lt;`Source`>

Updates a Mapbox source object in the style. The according OpenLayers source will be replaced
and the map will be re-rendered.

##### Parameters

| Name           | Type                  | Description                                        |
| :------------- | :-------------------- | :------------------------------------------------- |
| `mapOrGroup`   | `Map` \| `LayerGroup` | The Map or LayerGroup `apply` was called on.       |
| `id`           | `string`              | Key of the source in the `sources` object literal. |
| `mapboxSource` | `any`                 | Mapbox source object.                              |

##### Returns

`Promise`\\&lt;`Source`>

Promise that resolves when the source has been updated.

<a name="classesmapboxvectorlayermd"></a>

## Class: MapboxVectorLayer

**`Classdesc`**

```js
import {MapboxVectorLayer} from 'ol-mapbox-style';
```

A vector tile layer based on a Mapbox style that uses a single vector source.  Configure
the layer with the `styleUrl` and `accessToken` shown in Mapbox Studio's share panel.
If the style uses more than one source, use the `source` property to choose a single
vector source.  If you want to render a subset of the layers in the style, use the `layers`
property (all layers must share the same vector source).  See the constructor options for
more detail.

    const map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      layers: [
        new MapboxVectorLayer({
          styleUrl: 'mapbox://styles/mapbox/bright-v9',
          accessToken: 'your-mapbox-access-token-here',
        }),
      ],
      target: 'map',
    });

On configuration or loading error, the layer will trigger an `'error'` event.  Listeners
will receive an object with an `error` property that can be used to diagnose the problem.

**Note for users of the full build**: The `MapboxVectorLayer` requires the
[ol-mapbox-style](https://github.com/openlayers/ol-mapbox-style) library to be loaded as well.

**`Param`**

Options.

**`Fires`**

module:ol/events/Event~BaseEvent#event:error

**`Api`**

### Hierarchy

- `VectorTileLayer`

  ↳ **`MapboxVectorLayer`**

### Table of contents

#### Constructors

- [constructor](#constructor)

#### Properties

- [accessToken](#accessToken)

### Constructors

#### constructor

• **new MapboxVectorLayer**(`options`): [`MapboxVectorLayer`](#classesmapboxvectorlayermd)

##### Parameters

| Name      | Type                                         | Description                                                                 |
| :-------- | :------------------------------------------- | :-------------------------------------------------------------------------- |
| `options` | [`Options`](#interfacesinternal_options-1md) | Layer options. At a minimum, `styleUrl` and `accessToken` must be provided. |

##### Returns

[`MapboxVectorLayer`](#classesmapboxvectorlayermd)

##### Overrides

VectorTileLayer.constructor

### Properties

#### accessToken

• **accessToken**: `string`

<a name="interfacesinternal_applystyleoptionsmd"></a>

## Interface: ApplyStyleOptions\\&lt;>

[\\&lt;internal>](#modulesinternal_md).ApplyStyleOptions

### Table of contents

#### Properties

- [layers](#layers)
- [source](#source)
- [updateSource](#updateSource)

### Properties

#### layers

• **layers**: `string`\[]

Layers. If no source is provided, the layers with the
provided ids will be used from the style's `layers` array. All layers need to use the same source.

* * *

#### source

• **source**: `string`

Source. Default is `''`, which causes the first source in the
style to be used.

* * *

#### updateSource

• **updateSource**: `boolean`

Update or create vector (tile) layer source with parameters
specified for the source in the mapbox style definition.

<a name="interfacesinternal_featureidentifiermd"></a>

## Interface: FeatureIdentifier\\&lt;>

[\\&lt;internal>](#modulesinternal_md).FeatureIdentifier

### Table of contents

#### Properties

- [id](#id)
- [source](#source)

### Properties

#### id

• **id**: `string` \| `number`

The feature id.

* * *

#### source

• **source**: `string`

The source id.

<a name="interfacesinternal_options-1md"></a>

## Interface: Options\\&lt;>

[\\&lt;internal>](#modulesinternal_md).Options

### Table of contents

#### Properties

- [accessToken](#accessToken)
- [background](#background)
- [className](#className)
- [declutter](#declutter)
- [extent](#extent)
- [layers](#layers)
- [map](#map)
- [maxResolution](#maxResolution)
- [maxZoom](#maxZoom)
- [minResolution](#minResolution)
- [minZoom](#minZoom)
- [opacity](#opacity)
- [preload](#preload)
- [properties](#properties)
- [renderBuffer](#renderBuffer)
- [renderMode](#renderMode)
- [renderOrder](#renderOrder)
- [source](#source)
- [styleUrl](#styleUrl)
- [updateWhileAnimating](#updateWhileAnimating)
- [updateWhileInteracting](#updateWhileInteracting)
- [useInterimTilesOnError](#useInterimTilesOnError)
- [visible](#visible)
- [zIndex](#zIndex)

### Properties

#### accessToken

• **accessToken**: `string`

The access token for your Mapbox style. This has to be provided
for `mapbox://` style urls. For `https://` and other urls, any access key must be the last query
parameter of the style url.

* * *

#### background

• **background**: `false` \| `BackgroundColor`

Background color for the layer.
If not specified, the background from the Mapbox style object will be used. Set to `false` to prevent
the Mapbox style's background from being used.

* * *

#### className

• **className**: `string`

A CSS class name to set to the layer element.

* * *

#### declutter

• **declutter**: `boolean`

Declutter images and text. Decluttering is applied to all
image and text styles of all Vector and VectorTile layers that have set this to `true`. The priority
is defined by the z-index of the layer, the `zIndex` of the style and the render order of features.
Higher z-index means higher priority. Within the same z-index, a feature rendered before another has
higher priority.

As an optimization decluttered features from layers with the same `className` are rendered above
the fill and stroke styles of all of those layers regardless of z-index.  To opt out of this
behavior and place declutterd features with their own layer configure the layer with a `className`
other than `ol-layer`.

* * *

#### extent

• **extent**: `Extent`

The bounding extent for layer rendering.  The layer will not be
rendered outside of this extent.

* * *

#### layers

• **layers**: `string`\[]

Limit rendering to the list of included layers.  All layers
must share the same vector source.  If your style uses more than one source, you need to use
either the `source` property or the `layers` property to limit rendering to a single vector
source.

* * *

#### map

• **map**: `Map`

Sets the layer as overlay on a map. The map will not manage
this layer in its layers collection, and the layer will be rendered on top. This is useful for
temporary layers. The standard way to add a layer to a map and have it managed by the map is to
use `map.addLayer()`.

* * *

#### maxResolution

• **maxResolution**: `number`

The maximum resolution (exclusive) below which this layer will
be visible. If neither `maxResolution` nor `minZoom` are defined, the layer's `maxResolution` will
match the style source's `minzoom`.

* * *

#### maxZoom

• **maxZoom**: `number`

The maximum view zoom level (inclusive) at which this layer will
be visible.

* * *

#### minResolution

• **minResolution**: `number`

The minimum resolution (inclusive) at which this layer will be
visible.

* * *

#### minZoom

• **minZoom**: `number`

The minimum view zoom level (exclusive) above which this layer will
be visible. If neither `maxResolution` nor `minZoom` are defined, the layer's `minZoom` will match
the style source's `minzoom`.

* * *

#### opacity

• **opacity**: `number`

Opacity (0, 1).

* * *

#### preload

• **preload**: `number`

Preload. Load low-resolution tiles up to `preload` levels. `0`
means no preloading.

* * *

#### properties

• **properties**: `Object`

Arbitrary observable properties. Can be accessed with `#get()` and `#set()`.

* * *

#### renderBuffer

• **renderBuffer**: `number`

The buffer in pixels around the tile extent used by the
renderer when getting features from the vector tile for the rendering or hit-detection.
Recommended value: Vector tiles are usually generated with a buffer, so this value should match
the largest possible buffer of the used tiles. It should be at least the size of the largest
point symbol or line width.

* * *

#### renderMode

• **renderMode**: `VectorTileRenderType`

Render mode for vector tiles:

- `'hybrid'`: Polygon and line elements are rendered as images, so pixels are scaled during zoom
  animations. Point symbols and texts are accurately rendered as vectors and can stay upright on
  rotated views.
- `'vector'`: Everything is rendered as vectors. Use this mode for improved performance on vector
  tile layers with only a few rendered features (e.g. for highlighting a subset of features of
  another layer with the same source).

* * *

#### renderOrder

• **renderOrder**: `OrderFunction`

Render order. Function to be used when sorting
features before rendering. By default features are drawn in the order that they are created. Use
`null` to avoid the sort, but get an undefined draw order.

* * *

#### source

• **source**: `string`

If your style uses more than one source, you need to use either the
`source` property or the `layers` property to limit rendering to a single vector source.  The
`source` property corresponds to the id of a vector source in your Mapbox style.

* * *

#### styleUrl

• **styleUrl**: `string`

The URL of the Mapbox style object to use for this layer.  For a
style created with Mapbox Studio and hosted on Mapbox, this will look like
'mapbox://styles/you/your-style'.

* * *

#### updateWhileAnimating

• **updateWhileAnimating**: `boolean`

When set to `true`, feature batches will be
recreated during animations. This means that no vectors will be shown clipped, but the setting
will have a performance impact for large amounts of vector data. When set to `false`, batches
will be recreated when no animation is active.

* * *

#### updateWhileInteracting

• **updateWhileInteracting**: `boolean`

When set to `true`, feature batches will be
recreated during interactions. See also `updateWhileAnimating`.

* * *

#### useInterimTilesOnError

• **useInterimTilesOnError**: `boolean`

Use interim tiles on error.

* * *

#### visible

• **visible**: `boolean`

Visibility.

* * *

#### zIndex

• **zIndex**: `number`

The z-index for layer rendering.  At rendering time, the layers
will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
method was used.

<a name="interfacesinternal_optionsmd"></a>

## Interface: Options\\&lt;>

[\\&lt;internal>](#modulesinternal_md).Options

### Table of contents

#### Properties

- [accessToken](#accessToken)
- [accessTokenParam](#accessTokenParam)
- [getImage](#getImage)
- [projection](#projection)
- [resolutions](#resolutions)
- [styleUrl](#styleUrl)
- [transformRequest](#transformRequest)
- [webfonts](#webfonts)

### Properties

#### accessToken

• **accessToken**: `string`

Access token for 'mapbox://' urls.

* * *

#### accessTokenParam

• **accessTokenParam**: `string`

Access token param. For internal use.

* * *

#### getImage

• **getImage**: (`arg0`: `VectorLayer`\\&lt;`any`> \| `VectorTileLayer`\\&lt;`any`>, `arg1`: `string`) => `string` \| `HTMLCanvasElement` \| `HTMLImageElement`

Function that returns an image for an icon name. If the result is an HTMLImageElement, it must already be
loaded. The layer can be used to call layer.changed() when the loading and processing of the image has finished.
This function be used for icons not in the sprite or to override sprite icons.

##### Type declaration

▸ (`arg0`, `arg1`): `string` \| `HTMLCanvasElement` \| `HTMLImageElement`

###### Parameters

| Name   | Type                                                       |
| :----- | :--------------------------------------------------------- |
| `arg0` | `VectorLayer`\\&lt;`any`> \| `VectorTileLayer`\\&lt;`any`> |
| `arg1` | `string`                                                   |

###### Returns

`string` \| `HTMLCanvasElement` \| `HTMLImageElement`

* * *

#### projection

• **projection**: `string`

Only useful when working with non-standard projections.
Code of a projection registered with OpenLayers. All sources of the style must be provided in this
projection. The projection must also have a valid extent defined, which will be used to determine the
origin and resolutions of the tile grid for all tiled sources of the style. When provided, the bbox
placeholder in tile and geojson urls changes: the default is `{bbox-epsg-3857}`, when projection is e.g.
set to `EPSG:4326`, the bbox placeholder will be `{bbox-epsg-4326}`.

* * *

#### resolutions

• **resolutions**: `number`\[]

Only useful when working with non-standard projections.
Resolutions for mapping resolution to the `zoom` used in the Mapbox style.

* * *

#### styleUrl

• **styleUrl**: `string`

URL of the Mapbox GL style. Required for styles that were provided
as object, when they contain a relative sprite url, or sources referencing data by relative url.

* * *

#### transformRequest

• **transformRequest**: (`arg0`: `string`, `arg1`: [`ResourceType`](#ResourceType)) => `string` \| `void` \| `Request` \| `Promise`\\&lt;`string` \| `Request`>

Function for controlling how `ol-mapbox-style` fetches resources. Can be used for modifying
the url, adding headers or setting credentials options. Called with the url and the resource
type as arguments, this function is supposed to return a `Request` or a url `string`, or a promise tehereof.
Without a return value the original request will not be modified.

##### Type declaration

▸ (`arg0`, `arg1`): `string` \| `void` \| `Request` \| `Promise`\\&lt;`string` \| `Request`>

###### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `arg0` | `string`                        |
| `arg1` | [`ResourceType`](#ResourceType) |

###### Returns

`string` \| `void` \| `Request` \| `Promise`\\&lt;`string` \| `Request`>

* * *

#### webfonts

• **webfonts**: `string`

Template for resolving webfonts. Can be used to specify where to fetch
web fonts when no `ol:webfonts` metadata is set in the style object. See `getFonts()` and the
"Font handling" section in `README.md` for details.

<a name="modulesinternal_md"></a>

## Module: \\&lt;internal>

### Table of contents

#### Interfaces

- [ApplyStyleOptions](#interfacesinternal_applystyleoptionsmd)
- [FeatureIdentifier](#interfacesinternal_featureidentifiermd)
- [Options](#interfacesinternal_optionsmd)
- [Options](#interfacesinternal_options-1md)

#### Type Aliases

- [ResourceType](#ResourceType)

### Type Aliases

#### ResourceType

Ƭ **ResourceType**\\&lt;>: `"Style"` \| `"Source"` \| `"Sprite"` \| `"SpriteImage"` \| `"Tiles"` \| `"GeoJSON"`
