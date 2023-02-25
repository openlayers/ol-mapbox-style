# ol-mapbox-style

Create [OpenLayers](https://openlayers.org/) maps from [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/) objects.

## Getting started

Get an impression of what this library does by exploring the [live examples](https://unpkg.com/ol-mapbox-style/dist/examples/index.html). 

### Installation

To use the library in an application with an npm based dev environment, install it with

    npm install ol-mapbox-style

When installed this way, just import the ol-mapbox-style module, like in the usage example below. To use a standalone build of ol-mapbox-style, just include 'dist/olms.js' on your HTML page, and access the exported functions from the global `olms` object (e.g. `olms.apply()`, `olms.applyBackground()`). Note that the standalone build depends on the full build of OpenLayers.

**ol-mapbox-style v9 requires [OpenLayers](https://npmjs.com/package/ol) version >= 7 &lt; 8**.

**ol-mapbox-style v8 requires [OpenLayers](https://npmjs.com/package/ol) version >= 6.13.0 &lt; 7**.

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

Only commonly available system fonts and [Google Fonts](https://developers.google.com/fonts/) will automatically be available for any `text-font` defined in the Mapbox Style object. It is the responsibility of the application to load other fonts. Because `ol-mapbox-style` uses system and web fonts instead of PBF/SDF glyphs, the [font stack](https://www.mapbox.com/help/manage-fontstacks/) is treated a little different: style and weight are taken from the primary font (i.e. the first one in the font stack). Subsequent fonts in the font stack are only used if the primary font is not available/loaded, and they will be used with the style and weight of the primary font.

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

- [&lt;internal\\>](#modulesinternal_md)

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
- [recordStyleLayer](#recordStyleLayer)
- [renderTransparent](#renderTransparent)
- [setFeatureState](#setFeatureState)
- [stylefunction](#stylefunction)
- [updateMapboxLayer](#updateMapboxLayer)

### References

#### default

Renames and re-exports [apply](#apply)

### Functions

#### addMapboxLayer

▸ **addMapboxLayer**(`mapOrGroup`, `mapboxLayer`, `beforeLayerId?`): `void`

Add a new Mapbox Layer object to the style.

##### Parameters

| Name             | Type                  | Description                                                              |
| :--------------- | :-------------------- | :----------------------------------------------------------------------- |
| `mapOrGroup`     | `Map` \| `LayerGroup` | Map or LayerGroup.                                                       |
| `mapboxLayer`    | `any`                 | Mapbox Layer object.                                                     |
| `beforeLayerId?` | `string`              | Optional id of the Mapbox Layer before the new layer that will be added. |

##### Returns

`void`

* * *

#### apply

▸ **apply**(`mapOrGroupOrElement`, `style`, `options?`): `Promise`&lt;`Map` \| `LayerGroup`>

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
| `mapOrGroupOrElement` | `string` \| `HTMLElement` \| `Map` \| `LayerGroup` | Either an existing OpenLayers Map instance, or a HTML element, or the id of a HTML element that will be the target of a new OpenLayers Map, or a layer group. If layer group, styles releated to the map and view will be ignored.                                                                                                                                                                                                                                                                                                                                    |
| `style`               | `any`                                              | JSON style object or style url pointing to a Mapbox Style object. When using Mapbox APIs, the url is the `styleUrl` shown in Mapbox Studio's "share" panel. In addition, the `accessToken` option (see below) must be set. When passed as JSON style object, all OpenLayers layers created by `apply()` will be immediately available, but they may not have a source yet (i.e. when they are defined by a TileJSON url in the Mapbox Style document). When passed as style url, layers will be added to the map when the Mapbox Style document is loaded and parsed. |
| `options`             | [`Options`](#interfacesinternal_optionsmd)         | Options.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

##### Returns

`Promise`&lt;`Map` \| `LayerGroup`>

A promise that resolves after all layers have been added to
the OpenLayers Map instance or LayerGroup, their sources set, and their styles applied. The
`resolve` callback will be called with the OpenLayers Map instance or LayerGroup as
argument.

* * *

#### applyBackground

▸ **applyBackground**(`mapOrLayer`, `glStyle`, `options?`): `Promise`&lt;`any`>

Applies properties of the Mapbox Style's first `background` layer to the
provided map or VectorTile layer.

**Example:**

```js
import {applyBackground} from 'ol-mapbox-style';
import {Map} from 'ol';

const map = new Map({target: 'map'});
applyBackground(map, 'https://api.maptiler.com/maps/basic/style.json?key=YOUR_OPENMAPTILES_TOKEN');
```

##### Parameters

| Name         | Type                                       | Description                         |
| :----------- | :----------------------------------------- | :---------------------------------- |
| `mapOrLayer` | `VectorTileLayer` \| `Map`                 | OpenLayers Map or VectorTile layer. |
| `glStyle`    | `any`                                      | Mapbox Style object or url.         |
| `options`    | [`Options`](#interfacesinternal_optionsmd) | Options.                            |

##### Returns

`Promise`&lt;`any`>

Promise that resolves when the background is applied.

* * *

#### applyStyle

▸ **applyStyle**(`layer`, `glStyle`, `sourceOrLayersOrOptions?`, `optionsOrPath?`, `resolutions?`): `Promise`&lt;`any`>

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

| Name                       | Type                                                                                                                                   | Default value | Description                                                                                                                                                                                                                                                                                                                                                                                       |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `layer`                    | `VectorLayer`&lt;`any`> \| `VectorTileLayer`                                                                                           | `undefined`   | OpenLayers layer. When the layer has a source configured, it will be modified to use the configuration from the glStyle's `source`. Options specified on the layer's source will override those from the glStyle's `source`, except for `url`, `tileUrlFunction` and `tileGrid` (exception: when the source projection is not `EPSG:3857`).                                                       |
| `glStyle`                  | `any`                                                                                                                                  | `undefined`   | Mapbox Style object.                                                                                                                                                                                                                                                                                                                                                                              |
| `sourceOrLayersOrOptions?` | `string` \| `string`\[] \| [`Options`](#interfacesinternal_optionsmd) & [`ApplyStyleOptions`](#interfacesinternal_applystyleoptionsmd) | `''`          | Options or `source` key or an array of layer `id`s from the Mapbox Style object. When a `source` key is provided, all layers for the specified source will be included in the style function. When layer `id`s are provided, they must be from layers that use the same source. When not provided or a falsey value, all layers using the first source specified in the glStyle will be rendered. |
| `optionsOrPath?`           | `string` \| [`Options`](#interfacesinternal_optionsmd) & [`ApplyStyleOptions`](#interfacesinternal_applystyleoptionsmd)                | `{}`          | **Deprecated**. Options. Alternatively the path of the style file (only required when a relative path is used for the `"sprite"` property of the style).                                                                                                                                                                                                                                          |
| `resolutions?`             | `number`\[]                                                                                                                            | `undefined`   | **Deprecated**. Resolutions for mapping resolution to zoom level. Only needed when working with non-standard tile grids or projections, can also be supplied with options.                                                                                                                                                                                                                        |

##### Returns

`Promise`&lt;`any`>

Promise which will be resolved when the style can be used
for rendering.

* * *

#### getFeatureState

▸ **getFeatureState**(`mapOrLayer`, `feature`): `any`

Sets or removes a feature state. The feature state is taken into account for styling,
just like the feature's properties, and can be used e.g. to conditionally render selected
features differently.

##### Parameters

| Name         | Type                                                           | Description                               |
| :----------- | :------------------------------------------------------------- | :---------------------------------------- |
| `mapOrLayer` | `VectorLayer`&lt;`any`> \| `VectorTileLayer` \| `Map`          | Map or layer to set the feature state on. |
| `feature`    | [`FeatureIdentifier`](#interfacesinternal_featureidentifiermd) | Feature identifier.                       |

##### Returns

`any`

Feature state or `null` when no feature state is set for the given
feature identifier.

* * *

#### getLayer

▸ **getLayer**(`map`, `layerId`): `Layer`&lt;`Source`, `LayerRenderer`&lt;`any`>>

Get the OpenLayers layer instance that contains the provided Mapbox Style
`layer`. Note that multiple Mapbox Style layers are combined in a single
OpenLayers layer instance when they use the same Mapbox Style `source`.

##### Parameters

| Name      | Type                  | Description                   |
| :-------- | :-------------------- | :---------------------------- |
| `map`     | `Map` \| `LayerGroup` | OpenLayers Map or LayerGroup. |
| `layerId` | `string`              | Mapbox Style layer id.        |

##### Returns

`Layer`&lt;`Source`, `LayerRenderer`&lt;`any`>>

OpenLayers layer instance.

* * *

#### getLayers

▸ **getLayers**(`map`, `sourceId`): `Layer`&lt;`Source`, `LayerRenderer`&lt;`any`>>\[]

Get the OpenLayers layer instances for the provided Mapbox Style `source`.

##### Parameters

| Name       | Type                  | Description                   |
| :--------- | :-------------------- | :---------------------------- |
| `map`      | `Map` \| `LayerGroup` | OpenLayers Map or LayerGroup. |
| `sourceId` | `string`              | Mapbox Style source id.       |

##### Returns

`Layer`&lt;`Source`, `LayerRenderer`&lt;`any`>>\[]

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

| Name         | Type                                                           | Description                                               |
| :----------- | :------------------------------------------------------------- | :-------------------------------------------------------- |
| `mapOrLayer` | `VectorLayer`&lt;`any`> \| `VectorTileLayer` \| `Map`          | OpenLayers Map or layer to set the feature state on.      |
| `feature`    | [`FeatureIdentifier`](#interfacesinternal_featureidentifiermd) | Feature identifier.                                       |
| `state`      | `any`                                                          | Feature state. Set to `null` to remove the feature state. |

##### Returns

`void`

* * *

#### stylefunction

▸ **stylefunction**(`olLayer`, `glStyle`, `sourceOrLayers`, `resolutions?`, `spriteData?`, `spriteImageUrl?`, `getFonts?`, `getImage?`): `StyleFunction`

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

| Name             | Type                                                                                                                              | Default value        | Description                                                                                                                                                                                                                                                                                                             |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `olLayer`        | `VectorLayer`&lt;`any`> \| `VectorTileLayer`                                                                                      | `undefined`          | OpenLayers layer to apply the style to. In addition to the style, the layer will get two properties: `mapbox-source` will be the `id` of the `glStyle`'s source used for the layer, and `mapbox-layers` will be an array of the `id`s of the `glStyle`'s layers.                                                        |
| `glStyle`        | `any`                                                                                                                             | `undefined`          | Mapbox Style object.                                                                                                                                                                                                                                                                                                    |
| `sourceOrLayers` | `string` \| `string`\[]                                                                                                           | `undefined`          | `source` key or an array of layer `id`s from the Mapbox Style object. When a `source` key is provided, all layers for the specified source will be included in the style function. When layer `id`s are provided, they must be from layers that use the same source.                                                    |
| `resolutions`    | `number`\[]                                                                                                                       | `defaultResolutions` | Resolutions for mapping resolution to zoom level.                                                                                                                                                                                                                                                                       |
| `spriteData`     | `any`                                                                                                                             | `undefined`          | Sprite data from the url specified in the Mapbox Style object's `sprite` property. Only required if a `sprite` property is specified in the Mapbox Style object.                                                                                                                                                        |
| `spriteImageUrl` | `string`                                                                                                                          | `undefined`          | Sprite image url for the sprite specified in the Mapbox Style object's `sprite` property. Only required if a `sprite` property is specified in the Mapbox Style object.                                                                                                                                                 |
| `getFonts`       | (`arg0`: `string`\[]) => `string`\[]                                                                                              | `undefined`          | Function that receives a font stack as arguments, and returns a (modified) font stack that is available. Font names are the names used in the Mapbox Style object. If not provided, the font stack will be used as-is. This function can also be used for loading web fonts.                                            |
| `getImage?`      | (`arg0`: `VectorLayer`&lt;`any`> \| `VectorTileLayer`, `arg1`: `string`) => `string` \| `HTMLCanvasElement` \| `HTMLImageElement` | `undefined`          | Function that returns an image or a URL for an image name. If the result is an HTMLImageElement, it must already be loaded. The layer can be used to call layer.changed() when the loading and processing of the image has finished. This function can be used for icons not in the sprite or to override sprite icons. |

##### Returns

`StyleFunction`

Style function for use in
`ol.layer.Vector` or `ol.layer.VectorTile`.

* * *

#### updateMapboxLayer

▸ **updateMapboxLayer**(`mapOrGroup`, `mapboxLayer`): `void`

Update a Mapbox Layer object in the style. The map will be re-rendered with the new style.

##### Parameters

| Name          | Type                  | Description                  |
| :------------ | :-------------------- | :--------------------------- |
| `mapOrGroup`  | `Map` \| `LayerGroup` | Map or LayerGroup.           |
| `mapboxLayer` | `any`                 | Updated Mapbox Layer object. |

##### Returns

`void`

<a name="interfacesinternal_applystyleoptionsmd"></a>

## Interface: ApplyStyleOptions&lt;>

[<internal>](#modulesinternal_md).ApplyStyleOptions

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

## Interface: FeatureIdentifier&lt;>

[<internal>](#modulesinternal_md).FeatureIdentifier

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

<a name="interfacesinternal_optionsmd"></a>

## Interface: Options&lt;>

[<internal>](#modulesinternal_md).Options

### Table of contents

#### Properties

- [accessToken](#accessToken)
- [accessTokenParam](#accessTokenParam)
- [getImage](#getImage)
- [projection](#projection)
- [resolutions](#resolutions)
- [styleUrl](#styleUrl)
- [transformRequest](#transformRequest)

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

• **getImage**: (`arg0`: `VectorLayer`&lt;`any`> \| `VectorTileLayer`, `arg1`: `string`) => `string` \| `HTMLCanvasElement` \| `HTMLImageElement`

##### Type declaration

▸ (`arg0`, `arg1`): `string` \| `HTMLCanvasElement` \| `HTMLImageElement`

Function that returns an image for an icon name. If the result is an HTMLImageElement, it must already be
loaded. The layer can be used to call layer.changed() when the loading and processing of the image has finished.
This function be used for icons not in the sprite or to override sprite icons.

###### Parameters

| Name   | Type                                         |
| :----- | :------------------------------------------- |
| `arg0` | `VectorLayer`&lt;`any`> \| `VectorTileLayer` |
| `arg1` | `string`                                     |

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

• **transformRequest**: (`arg0`: `string`, `arg1`: [`ResourceType`](#ResourceType)) => `void` \| `Request`

##### Type declaration

▸ (`arg0`, `arg1`): `void` \| `Request`

Function for controlling how `ol-mapbox-style` fetches resources. Can be used for modifying
the url, adding headers or setting credentials options. Called with the url and the resource
type as arguments, this function is supposed to return a `Request` object. Without a return value,
the original request will not be modified. For `Tiles` and `GeoJSON` resources, only the `url` of
the returned request will be respected.

###### Parameters

| Name   | Type                            |
| :----- | :------------------------------ |
| `arg0` | `string`                        |
| `arg1` | [`ResourceType`](#ResourceType) |

###### Returns

`void` \| `Request`

<a name="modulesinternal_md"></a>

## Module: &lt;internal>

### Table of contents

#### Interfaces

- [ApplyStyleOptions](#interfacesinternal_applystyleoptionsmd)
- [FeatureIdentifier](#interfacesinternal_featureidentifiermd)
- [Options](#interfacesinternal_optionsmd)

#### Type Aliases

- [ResourceType](#ResourceType)

### Type Aliases

#### ResourceType

Ƭ **ResourceType**&lt;>: `"Style"` \| `"Source"` \| `"Sprite"` \| `"SpriteImage"` \| `"Tiles"` \| `"GeoJSON"`
