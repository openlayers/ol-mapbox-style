ol-mapbox-style

# ol-mapbox-style

## Table of contents

### References

- [default](README.md#default)

### Namespaces

- [types](modules/types.md)

### Functions

- [apply](README.md#apply)
- [applyBackground](README.md#applybackground)
- [applyStyle](README.md#applystyle)
- [getFeatureState](README.md#getfeaturestate)
- [getLayer](README.md#getlayer)
- [getLayers](README.md#getlayers)
- [getSource](README.md#getsource)
- [recordStyleLayer](README.md#recordstylelayer)
- [renderTransparent](README.md#rendertransparent)
- [setFeatureState](README.md#setfeaturestate)
- [stylefunction](README.md#stylefunction)

## References

### default

Renames and re-exports [apply](README.md#apply)

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
| `map` | `string` \| `Map` \| `HTMLElement` | Either an existing OpenLayers Map instance, or a HTML element, or the id of a HTML element that will be the target of a new OpenLayers Map. |
| `style` | `any` | JSON style object or style url pointing to a Mapbox Style object. When using Mapbox APIs, the url is the `styleUrl` shown in Mapbox Studio's "share" panel. In addition, the `accessToken` option (see below) must be set. When passed as JSON style object, all OpenLayers layers created by `apply()` will be immediately available, but they may not have a source yet (i.e. when they are defined by a TileJSON url in the Mapbox Style document). When passed as style url, layers will be added to the map when the Mapbox Style document is loaded and parsed. |
| `options` | [`Options`](interfaces/types.Options.md) | - |

#### Returns

`Promise`<`Map`\>

A promise that resolves after all layers have been added to
the OpenLayers Map instance, their sources set, and their styles applied. The
`resolve` callback will be called with the OpenLayers Map instance as
argument.

#### Defined in

[apply.js:769](https://github.com/openlayers/ol-mapbox-style/blob/066550e/src/apply.js#L769)

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
| `options` | [`Options`](interfaces/types.Options.md) | - |

#### Returns

`Promise`<`any`\>

Promise that resolves when the background is applied.

#### Defined in

[apply.js:440](https://github.com/openlayers/ol-mapbox-style/blob/066550e/src/apply.js#L440)

___

### applyStyle

▸ **applyStyle**(`layer`, `glStyle`, `sourceOrLayers`, `optionsOrPath?`, `resolutions`): `Promise`<`any`\>

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `layer` | `VectorLayer`<`any`\> \| `VectorTileLayer` | OpenLayers layer. When the layer has a source configured, it will be modified to use the configuration from the glStyle's `source`. Options specified on the layer's source will override those from the glStyle's `source`, except for `url`, `tileUrlFunction` and `tileGrid` (exception: when the source projection is not `EPSG:3857`). |
| `glStyle` | `any` | Mapbox Style object. |
| `sourceOrLayers` | `string` \| `string`[] | - |
| `optionsOrPath` | `string` \| [`Options`](interfaces/types.Options.md) | - |
| `resolutions` | `number`[] | - |

#### Returns

`Promise`<`any`\>

Promise which will be resolved when the style can be used
for rendering.

#### Defined in

[apply.js:128](https://github.com/openlayers/ol-mapbox-style/blob/066550e/src/apply.js#L128)

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
| `feature` | [`FeatureIdentifier`](interfaces/types.FeatureIdentifier.md) | Feature identifier. |

#### Returns

`any`

Feature state or `null` when no feature state is set for the given
feature identifier.

#### Defined in

[apply.js:997](https://github.com/openlayers/ol-mapbox-style/blob/066550e/src/apply.js#L997)

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

#### Defined in

[apply.js:913](https://github.com/openlayers/ol-mapbox-style/blob/066550e/src/apply.js#L913)

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

#### Defined in

[apply.js:929](https://github.com/openlayers/ol-mapbox-style/blob/066550e/src/apply.js#L929)

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

#### Defined in

[apply.js:946](https://github.com/openlayers/ol-mapbox-style/blob/066550e/src/apply.js#L946)

___

### recordStyleLayer

▸ **recordStyleLayer**(`record`): `void`

Turns recording of the Mapbox Style's `layer` on and off. When turned on,
the layer that a rendered feature belongs to will be set as the feature's
`mapbox-layer` property.

#### Parameters

| Name | Type |
| :------ | :------ |
| `record` | `boolean` |

#### Returns

`void`

#### Defined in

[stylefunction.js:226](https://github.com/openlayers/ol-mapbox-style/blob/066550e/src/stylefunction.js#L226)

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

#### Defined in

[stylefunction.js:166](https://github.com/openlayers/ol-mapbox-style/blob/066550e/src/stylefunction.js#L166)

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
| `feature` | [`FeatureIdentifier`](interfaces/types.FeatureIdentifier.md) | Feature identifier. |
| `state` | `any` | Feature state. Set to `null` to remove the feature state. |

#### Returns

`void`

#### Defined in

[apply.js:968](https://github.com/openlayers/ol-mapbox-style/blob/066550e/src/apply.js#L968)

___

### stylefunction

▸ **stylefunction**(`olLayer`, `glStyle`, `sourceOrLayers`, `resolutions?`, `spriteData`, `spriteImageUrl`, `getFonts`): `StyleFunction`

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
| `resolutions` | `number`[] | `defaultResolutions` | - |
| `spriteData` | `any` | `undefined` | - |
| `spriteImageUrl` | `string` | `undefined` | - |
| `getFonts` | (`arg0`: `string`[]) => `string`[] | `undefined` | - |

#### Returns

`StyleFunction`

Style function for use in
`ol.layer.Vector` or `ol.layer.VectorTile`.

#### Defined in

[stylefunction.js:293](https://github.com/openlayers/ol-mapbox-style/blob/066550e/src/stylefunction.js#L293)
