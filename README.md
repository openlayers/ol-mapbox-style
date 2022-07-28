# ol-mapbox-style

Create [OpenLayers](https://openlayers.org/) maps from [Mapbox Style Specification](https://docs.mapbox.com/mapbox-gl-js/style-spec/) objects.

## Getting started

### Installation

To use the library in an application with an npm based dev environment, install it with

    npm install ol-mapbox-style

When installed this way, just import the ol-mapbox-style module, like in the usage example below. To use a standalone build of ol-mapbox-style, just include 'dist/olms.js' on your HTML page, and access the exported functions from the global `olms` object (e.g. `olms.apply()`, `olms.applyBackground()`). Note that the standalone build depends on the legacy build of OpenLayers.

**ol-mapbox-style requires [OpenLayers](https://npmjs.com/package/ol) version >= 6.13.0 < 7**.

### Usage

**See the [API](#api) section for the full documentation.**

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

### Support for old browsers

Internet Explorer (version 11) and other old browsers (Android 4.x) are supported when polyfills for the following features are loaded:

*   `fetch` (including `Promise`)

## Building the library

    npm run build

The resulting distribution files will be in the `dist/` folder. To see the library in action, navigate to `dist/index.html`.

To run test locally, run

    npm test

For debugging tests in the browser, run

    npm run karma

and open a browser on the host and port indicated in the console output (usually <http://localhost:9876/>) and click the 'DEBUG' button to go to the debug environment.

[![Test Job](https://github.com/openlayers/ol-mapbox-style/actions/workflows/test.yml/badge.svg)](https://github.com/openlayers/ol-mapbox-style/actions/workflows/test.yml)

<!--apidoc start-->

<a name="readmemd"></a>

# API

## Table of contents

### References

- [default](#default)

### Namespaces

- [types](#modulestypesmd)

### Functions

- [apply](#apply)
- [applyBackground](#applybackground)
- [applyStyle](#applystyle)
- [getFeatureState](#getfeaturestate)
- [getLayer](#getlayer)
- [getLayers](#getlayers)
- [getSource](#getsource)
- [recordStyleLayer](#recordstylelayer)
- [renderTransparent](#rendertransparent)
- [setFeatureState](#setfeaturestate)
- [stylefunction](#stylefunction)

## References

### default

Renames and re-exports [apply](#apply)

## Functions

### apply

▸ **apply**(`map`, `style`, `options?`): `Promise`<`Map`\>

Loads and applies a Mapbox Style object into an OpenLayers Map. This includes
the map background, the layers, the center and the zoom.

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

 * `mapbox-source`: The `id` of the Mapbox Style document's source that the
   OpenLayers layer was created from. Usually `apply()` creates one
   OpenLayers layer per Mapbox Style source, unless the layer stack has
   layers from different sources in between.
 * `mapbox-layers`: The `id`s of the Mapbox Style document's layers that are
   included in the OpenLayers layer.

This function sets an additional `mapbox-style` property on the OpenLayers
map instance, which holds the Mapbox Style object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `map` | `string` \| `HTMLElement` \| `Map` | Either an existing OpenLayers Map instance, or a HTML element, or the id of a HTML element that will be the target of a new OpenLayers Map. |
| `style` | `any` | JSON style object or style url pointing to a Mapbox Style object. When using Mapbox APIs, the url is the `styleUrl` shown in Mapbox Studio's "share" panel. In addition, the `accessToken` option (see below) must be set. When passed as JSON style object, all OpenLayers layers created by `apply()` will be immediately available, but they may not have a source yet (i.e. when they are defined by a TileJSON url in the Mapbox Style document). When passed as style url, layers will be added to the map when the Mapbox Style document is loaded and parsed. |
| `options` | [`Options`](#interfacestypesoptionsmd) | Options. |

#### Returns

`Promise`<`Map`\>

A promise that resolves after all layers have been added to
the OpenLayers Map instance, their sources set, and their styles applied. The
`resolve` callback will be called with the OpenLayers Map instance as
argument.

___

### applyBackground

▸ **applyBackground**(`mapOrLayer`, `glStyle`, `options?`): `Promise`<`any`\>

Applies properties of the Mapbox Style's first `background` layer to the
provided map or VectorTile layer.

**Example:**
```js
import {applyBackground} from 'ol-mapbox-style';
import {Map} from 'ol';

const map = new Map({target: 'map'});
applyBackground(map, 'https://api.maptiler.com/maps/basic/style.json?key=YOUR_OPENMAPTILES_TOKEN');
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapOrLayer` | `VectorTileLayer` \| `Map` | OpenLayers Map or VectorTile layer. |
| `glStyle` | `any` | Mapbox Style object or url. |
| `options` | [`Options`](#interfacestypesoptionsmd) | Options. |

#### Returns

`Promise`<`any`\>

Promise that resolves when the background is applied.

___

### applyStyle

▸ **applyStyle**(`layer`, `glStyle`, `sourceOrLayers?`, `optionsOrPath?`, `resolutions?`): `Promise`<`any`\>

Applies a style function to an `ol/layer/VectorTile` or `ol/layer/Vector`
with an `ol/source/VectorTile` or an `ol/source/Vector`. If the layer does not have a source
yet, it will be created and populated from the information in the `glStyle`.

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

 * `mapbox-source`: The `id` of the Mapbox Style document's source that the
   OpenLayers layer was created from. Usually `apply()` creates one
   OpenLayers layer per Mapbox Style source, unless the layer stack has
   layers from different sources in between.
 * `mapbox-layers`: The `id`s of the Mapbox Style document's layers that are
   included in the OpenLayers layer.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `layer` | `VectorLayer`<`any`\> \| `VectorTileLayer` | `undefined` | OpenLayers layer. When the layer has a source configured, it will be modified to use the configuration from the glStyle's `source`. Options specified on the layer's source will override those from the glStyle's `source`, except for `url`, `tileUrlFunction` and `tileGrid` (exception: when the source projection is not `EPSG:3857`). |
| `glStyle` | `any` | `undefined` | Mapbox Style object. |
| `sourceOrLayers` | `string` \| `string`[] | `''` | `source` key or an array of layer `id`s from the Mapbox Style object. When a `source` key is provided, all layers for the specified source will be included in the style function. When layer `id`s are provided, they must be from layers that use the same source. When not provided or a falsey value, all layers using the first source specified in the glStyle will be rendered. |
| `optionsOrPath` | `string` \| [`Options`](#interfacestypesoptionsmd) | `{}` | Options. Alternatively the path of the style file (only required when a relative path is used for the `"sprite"` property of the style). |
| `resolutions` | `number`[] | `undefined` | Resolutions for mapping resolution to zoom level. Only needed when working with non-standard tile grids or projections. |

#### Returns

`Promise`<`any`\>

Promise which will be resolved when the style can be used
for rendering.

___

### getFeatureState

▸ **getFeatureState**(`mapOrLayer`, `feature`): `any`

Sets or removes a feature state. The feature state is taken into account for styling,
just like the feature's properties, and can be used e.g. to conditionally render selected
features differently.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapOrLayer` | `VectorLayer`<`any`\> \| `VectorTileLayer` \| `Map` | Map or layer to set the feature state on. |
| `feature` | [`FeatureIdentifier`](#interfacestypesfeatureidentifiermd) | Feature identifier. |

#### Returns

`any`

Feature state or `null` when no feature state is set for the given
feature identifier.

___

### getLayer

▸ **getLayer**(`map`, `layerId`): `Layer`<`Source`, `LayerRenderer`<`any`\>\>

Get the OpenLayers layer instance that contains the provided Mapbox Style
`layer`. Note that multiple Mapbox Style layers are combined in a single
OpenLayers layer instance when they use the same Mapbox Style `source`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `map` | `Map` | OpenLayers Map. |
| `layerId` | `string` | Mapbox Style layer id. |

#### Returns

`Layer`<`Source`, `LayerRenderer`<`any`\>\>

OpenLayers layer instance.

___

### getLayers

▸ **getLayers**(`map`, `sourceId`): `Layer`<`Source`, `LayerRenderer`<`any`\>\>[]

Get the OpenLayers layer instances for the provided Mapbox Style `source`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `map` | `Map` | OpenLayers Map. |
| `sourceId` | `string` | Mapbox Style source id. |

#### Returns

`Layer`<`Source`, `LayerRenderer`<`any`\>\>[]

OpenLayers layer instances.

___

### getSource

▸ **getSource**(`map`, `sourceId`): `Source`

Get the OpenLayers source instance for the provided Mapbox Style `source`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `map` | `Map` | OpenLayers Map. |
| `sourceId` | `string` | Mapbox Style source id. |

#### Returns

`Source`

OpenLayers source instance.

___

### recordStyleLayer

▸ **recordStyleLayer**(`record?`): `void`

Turns recording of the Mapbox Style's `layer` on and off. When turned on,
the layer that a rendered feature belongs to will be set as the feature's
`mapbox-layer` property.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `record` | `boolean` | `false` | Recording of the style layer is on. |

#### Returns

`void`

___

### renderTransparent

▸ **renderTransparent**(`enabled`): `void`

Configure whether features with a transparent style should be rendered. When
set to `true`, it will be possible to hit detect content that is not visible,
like transparent fills of polygons, using `ol/layer/Layer#getFeatures()` or
`ol/Map#getFeaturesAtPixel()`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `enabled` | `boolean` | Rendering of transparent elements is enabled. Default is `false`. |

#### Returns

`void`

___

### setFeatureState

▸ **setFeatureState**(`mapOrLayer`, `feature`, `state`): `void`

Sets or removes a feature state. The feature state is taken into account for styling,
just like the feature's properties, and can be used e.g. to conditionally render selected
features differently.

The feature state will be stored on the OpenLayers layer matching the feature identifier, in the
`mapbox-featurestate` property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mapOrLayer` | `VectorLayer`<`any`\> \| `VectorTileLayer` \| `Map` | OpenLayers Map or layer to set the feature state on. |
| `feature` | [`FeatureIdentifier`](#interfacestypesfeatureidentifiermd) | Feature identifier. |
| `state` | `any` | Feature state. Set to `null` to remove the feature state. |

#### Returns

`void`

___

### stylefunction

▸ **stylefunction**(`olLayer`, `glStyle`, `sourceOrLayers`, `resolutions?`, `spriteData?`, `spriteImageUrl?`, `getFonts?`): `StyleFunction`

Creates a style function from the `glStyle` object for all layers that use
the specified `source`, which needs to be a `"type": "vector"` or
`"type": "geojson"` source and applies it to the specified OpenLayers layer.

Two additional properties will be set on the provided layer:

 * `mapbox-source`: The `id` of the Mapbox Style document's source that the
   OpenLayers layer was created from. Usually `apply()` creates one
   OpenLayers layer per Mapbox Style source, unless the layer stack has
   layers from different sources in between.
 * `mapbox-layers`: The `id`s of the Mapbox Style document's layers that are
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

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `olLayer` | `VectorLayer`<`any`\> \| `VectorTileLayer` | `undefined` | OpenLayers layer to apply the style to. In addition to the style, the layer will get two properties: `mapbox-source` will be the `id` of the `glStyle`'s source used for the layer, and `mapbox-layers` will be an array of the `id`s of the `glStyle`'s layers. |
| `glStyle` | `any` | `undefined` | Mapbox Style object. |
| `sourceOrLayers` | `string` \| `string`[] | `undefined` | `source` key or an array of layer `id`s from the Mapbox Style object. When a `source` key is provided, all layers for the specified source will be included in the style function. When layer `id`s are provided, they must be from layers that use the same source. |
| `resolutions` | `number`[] | `defaultResolutions` | Resolutions for mapping resolution to zoom level. |
| `spriteData` | `any` | `undefined` | Sprite data from the url specified in the Mapbox Style object's `sprite` property. Only required if a `sprite` property is specified in the Mapbox Style object. |
| `spriteImageUrl` | `string` | `undefined` | Sprite image url for the sprite specified in the Mapbox Style object's `sprite` property. Only required if a `sprite` property is specified in the Mapbox Style object. |
| `getFonts` | (`arg0`: `string`[]) => `string`[] | `undefined` | Function that receives a font stack as arguments, and returns a (modified) font stack that is available. Font names are the names used in the Mapbox Style object. If not provided, the font stack will be used as-is. This function can also be used for loading web fonts. |

#### Returns

`StyleFunction`

Style function for use in
`ol.layer.Vector` or `ol.layer.VectorTile`.


<a name="interfacestypesfeatureidentifiermd"></a>

# Interface: FeatureIdentifier<\>

[types](#modulestypesmd).FeatureIdentifier

## Table of contents

### Properties

- [id](#id)
- [source](#source)

## Properties

### id

• **id**: `string` \| `number`

The feature id.

___

### source

• **source**: `string`

The source id.


<a name="interfacestypesoptionsmd"></a>

# Interface: Options<\>

[types](#modulestypesmd).Options

## Table of contents

### Properties

- [accessToken](#accesstoken)
- [accessTokenParam](#accesstokenparam)
- [resolutions](#resolutions)
- [styleUrl](#styleurl)
- [transformRequest](#transformrequest)

## Properties

### accessToken

• **accessToken**: `string`

Access token for 'mapbox://' urls.

___

### accessTokenParam

• **accessTokenParam**: `string`

Access token param. For internal use.

___

### resolutions

• **resolutions**: `number`[]

Resolutions for mapping resolution to zoom level.
Only needed when working with non-standard tile grids or projections.

___

### styleUrl

• **styleUrl**: `string`

URL of the Mapbox GL style. Required for styles that were provided
as object, when they contain a relative sprite url, or sources referencing data by relative url.

___

### transformRequest

• **transformRequest**: (`arg0`: `string`, `arg1`: [`ResourceType`](#resourcetype)) => `void` \| `Request`

#### Type declaration

▸ (`arg0`, `arg1`): `void` \| `Request`

Function for controlling how `ol-mapbox-style` fetches resources. Can be used for modifying
the url, adding headers or setting credentials options. Called with the url and the resource
type as arguments, this function is supposed to return a `Request` object. Without a return value,
the original request will not be modified. For `Tiles` and `GeoJSON` resources, only the `url` of
the returned request will be respected.

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg0` | `string` |
| `arg1` | [`ResourceType`](#resourcetype) |

##### Returns

`void` \| `Request`


<a name="modulestypesmd"></a>

# Namespace: types

## Table of contents

### Interfaces

- [FeatureIdentifier](#interfacestypesfeatureidentifiermd)
- [Options](#interfacestypesoptionsmd)

### Type Aliases

- [ResourceType](#resourcetype)

## Type Aliases

### ResourceType

Ƭ **ResourceType**<\>: ``"Style"`` \| ``"Source"`` \| ``"Sprite"`` \| ``"SpriteImage"`` \| ``"Tiles"`` \| ``"GeoJSON"``

<!--apidoc end-->
