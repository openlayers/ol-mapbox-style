[ol-mapbox-style](../README.md) / [types](../modules/types.md) / Options

# Interface: Options<\>

[types](../modules/types.md).Options

## Table of contents

### Properties

- [accessToken](types.Options.md#accesstoken)
- [accessTokenParam](types.Options.md#accesstokenparam)
- [resolutions](types.Options.md#resolutions)
- [styleUrl](types.Options.md#styleurl)
- [transformRequest](types.Options.md#transformrequest)

## Properties

### accessToken

• **accessToken**: `string`

Access token for 'mapbox://' urls.

#### Defined in

[apply.js:48](https://github.com/openlayers/ol-mapbox-style/blob/066550e/src/apply.js#L48)

___

### accessTokenParam

• **accessTokenParam**: `string`

Access token param. For internal use.

#### Defined in

[apply.js:59](https://github.com/openlayers/ol-mapbox-style/blob/066550e/src/apply.js#L59)

___

### resolutions

• **resolutions**: `number`[]

Resolutions for mapping resolution to zoom level.
Only needed when working with non-standard tile grids or projections.

#### Defined in

[apply.js:55](https://github.com/openlayers/ol-mapbox-style/blob/066550e/src/apply.js#L55)

___

### styleUrl

• **styleUrl**: `string`

URL of the Mapbox GL style. Required for styles that were provided
as object, when they contain a relative sprite url.

#### Defined in

[apply.js:57](https://github.com/openlayers/ol-mapbox-style/blob/066550e/src/apply.js#L57)

___

### transformRequest

• **transformRequest**: (`arg0`: `string`, `arg1`: [`ResourceType`](../modules/types.md#resourcetype)) => `void` \| `Request`

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
| `arg1` | [`ResourceType`](../modules/types.md#resourcetype) |

##### Returns

`void` \| `Request`

#### Defined in

[apply.js:49](https://github.com/openlayers/ol-mapbox-style/blob/066550e/src/apply.js#L49)
