# Changelog

## 12.4.0

* More precise angle computation for line labels
* Add support for `"text-keep-upright": false`
* Fix `text-field` value issues
* Update examples and add references to MapLibre
* Fix issue with missing `expandUrl` from OpenLayers

## 12.3.5

* Adjust `MapboxVectorLayer` type generics for OpenLayers v10

## 12.3.4

* Remove polyfill.io from examples, no code changes

## 12.3.3

* Type updates for OpenLayers 9.2.x

## 12.3.2

* Make minZoom inclusive by zoom instead of resolution internally

## 12.3.1

* Improved docs and examples
* Avoid `document.createElement()` for more web worker friendliness

## 12.3.0

* Use point resolution for hillshade calculation
* Fix layer minzoom
* Add webfonts option to override ol:webfonts
* Properly handle fractional layer minzoom and maxzoom

## 12.2.2

* Generous peer dependency range for ol

## 12.2.1

* Fall back to default icon-color when drawing SDF

## 12.2.0

* Fix zIndex of background layer when applying style to an existing map
* Use correct `line-color` and `background-color` defaults
* Add support for `circle-translate`
* Do not throw when style contains an unsupported layer type
* Fix rendering for zero text halo
* Fix scaling of `icon-offset`
* Allow computed values for `text-tranform`
* Add support for `text-ignore-placement` and `text-allow-overlap`

## 12.1.1

* Consider the `icon-size` layout property also for icons not provided by the stylesheet
* Handle fractional layer `minzoom` and `maxzoom` properly when fetching source data

## 12.1.0

* New 'updateMapboxSource()' utility function.
* Accept `Promise` as return type for `transformRequest()`
* Do not overwrite existing search param with access token

## 12.0.0

### Backwards incompatible changes

* The `transformRequest` hook is now called for every single `Tiles` request with the final url, instead of just once with the url template.
* Generated OpenLayers Tile and VectorTile sources previously used the template urls obtained by `source.getUrl()` or `source.getUrls()`. Now they use a `tileLoadFunction` configured by ol-mapbox-style instead.
* Generated OpenLayers Vector sources are now always configured with a `loader` by ol-mapbox-style. The `getUrl()` method will return the url without the `transformRequest` transform. When the url is templated (`{bbox-...}`), `getUrl()` will return `undefined`.

### Other changes

* The `transformRequest` hook now also accepts a url string as return value. When a `Request` is returned, it will be fully respected - not just the request's `url`.

## 11.0.3

* More ol versions included in peer dependency version range

## 11.0.2

* Make `ol` a peer dependency

## 11.0.1

* Use ol >= 7.x || v8.0.0-dev to allow deduping

## 11.0.0

### Backwards incompatible changes

* The ol-mapbox-style package now contains untranspiled modern JavaScript code. When targeting older browsers, make sure to configure your build tools to transpile the code accordingly.

### Other changes

* New `MapboxVectorLayer` export, which replaces `ol/layer/MapboxVector` from OpenLayers.

## 10.7.0

* Small fixes for add/update/removeMapboxLayer
* Support for SDF sprites
* Improved documentation for `applyStyle`

## 10.6.0

* `addMapboxLayer()` can now also add a layer as first layer in the layer stack.
* `addMapboxLayer()` is no longer restricted go layers with the same source.

## 10.5.0

* Add terrarium hillshade example
* Add getStyleForLayer() function for more efficient legend creation without `recordStyleLayer(true)`

## 10.4.0

### Changes that require attention

#### Font handling and loading

ol-mapbox-style no longer defaults to loading Google fonts when a required font is not available. Instead, it respects the new `metadata.ol:webfonts` field in the Mapbox Style document. Example:
```js
{
  "version": 8,
  "metadata": {
    "ol:webfonts": "https://mytileservergl.com/fonts/{font-family}/{fontweight}{-fontstyle}.css"
  }
  // ...
}
```
The supported template placeholders are
* {font-family}: CSS font family converted to lowercase, blanks replaced with `-`, e.g. `noto-sans`
* {Font+Family}: CSS font family in original case, blanks replaced with `+`, e.g. `Noto+Sans`
* {fontweight}: CSS font weight (numeric), e.g. `400`, `700`
* {fontstyle}: CSS font style, e.g. `normal`, `italic`
* {-fontstyle}: CSS font style other than normal, e.g. `-italic` or empty string for normal

In addition to providing fonts along with the style, this can be used to retrieve fonts from a CDN (e.g. `@fontsource`) or Google fonts. If this metadata field is not set to the style, the following default template will be used:

    https://cdn.jsdelivr.net/npm/@fontsource/{font-family}/{fontweight}{-fontstyle}.css

To retain the current behavior (i.e. use Google Fonts), the template URL will have to be

    https://fonts.googleapis.com/css?family={Font+Family}:{fontweight}{fontstyle}

### Other changes

* Fix a potential tile cache issue
* Fix problem caused by `getUid` function missing in the full build
* Make `updateMapboxStyle()` work with objects that are not a reference to the original one
* Add support for the `tms` tile scheme for `raster` and `vector` layers
* Add support for the `terrarium` encoding for `raster-dem` sources
* Fix an issue where the `icon-offset` layout property modifies the underlying Mapbox Style object
* Set the correct input projection for `geojson` sources when the `projection` option is used

## 10.3.4

* Fix addMapboxLayer - updateMapboxLayer - removeMapboxLayer sequence

## 10.3.3

* Fix `updateMapboxLayer()` and function/filter cache handling

## 10.3.2

* Export `removeMapboxLayer`

## 10.3.1

* Fix initial visibility of `vector` and `geojson` source layers

## 10.3.0

* Add support for `symbol-placement: "line-center"`

## 10.2.0

* Add support for the `"id"` expression

## 10.1.0

* New `removeMapboxLayer()` function
* Substantial fixes to the `addMapboxLayer()` function
* Manage OpenLayers layer visibility based on the visibility of its Mapbox layers

## 10.0.0

### Breaking changes

#### BBOX templates for `geojson` sources

Previously, the `{bbox-epsg-3857}` and `{bbox-epsg-[custom projection srs code]}` template replacement included the projection's SRS identifier, e.g. `1234,4567,4321,7654,EPSG:9876`. Now, the template replacement just includes the bounding box. This means that e.g. WFS source URLs need to be changed in the Mapbox style.

If you previously had a source definition like
```json
{
  "type": "geojson",
  "data": "https://ahocevar.com/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=osm:water_areas&outputFormat=application/json&srsname=EPSG:4326&bbox={bbox-epsg-3857}"
}
```

you have to change it to

```json
{
  "type": "geojson",
  "data": "https://ahocevar.com/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=osm:water_areas&outputFormat=application/json&srsname=EPSG:4326&bbox={bbox-epsg-3857},EPSG:3857"
}
```
The reason for this breaking change is compatibility with OCG API Features and other services that do not accept the SRS identifier as additional BBOX parameter.

## 9.7.0

* Improved icon halo - now looks the same as text halo
* New API for working with layer style objects and updating the rendered style
* Improved access token handling for the Mapbox example

## 9.6.0

* New `updateSource` option on `applyStyle()` for keeping pre-configured OpenLayers sources
* Fix `mapbox-layers` array for `raster` or `raster-dem` layers that share the same source
* Support for `paint` properties `icon-halo-color` and `icon-halo-width`

## 9.5.0

* Support for projections, using the new `projection` option

## 9.4.0

* Add support for labels with `symbol-spacing`

## 9.3.0

* Fix background bleeding issue when re-applying style
* Add support for `hillshade-highlight-color` and `hillshade-shadow-color`
* Fix geojson layers with `bbox` in combination with `transformRequest`
* Fix tilejson loading when using same source in different styles at the same time

## 9.2.4

* Update documentation for `getLayer()` and `getSource()` for `LayerGroup` support
* Update `getLayers()` to work with `LayerGroup`s
* Make `transformRequest` option work for raster sources with inlint TileJSON definition 

## 9.2.3

* Fix a regression that prevented mapbox:// tiles from getting loaded

## 9.2.2

* Avoid excessive data downloads for geojson layers below minzoom

## 9.2.1

* Allow setting OpenLayers layer opacity when no `raster-opacity` is set
* Use high resolution tiles for mapbox.satellite when browser supports it
* Support bounding box requests for `geojson` sources
* Fix 3-argument signature for `applyStyle()`
* Add support for raster-dem sources with hillshade layers

## 9.2.0

* New hook for supplying images without project sprite spritesheet
* Fix issue with new background handling, which is now done in a postrender function rather than prerender
* Simplified 3-argument signature of `applyStyle()`. The longer signatures continue to work, but are deprecated.

## 9.1.0

* `apply()` can now also apply to an `ol/layer/Group`.
* Backgrounds are no longer applied using OpenLayers's `setBackground()`, but with a prerender function for the first layer

## 9.0.0

### Breaking changes

* ol-mapbox-style now requires OpenLayers 7
* `icon-offset` has been fixed. If you previously worked around the x-value moving left instead of right with increasing offset, you have to remove this workaround now.

### Other changes

* Added support for `text-justify`

## 8.2.1

* Updated dependencies
* CI changes

## 8.2.0

* More secure regular expression for property templates; simplified template handling
* Avoid unnecessary TileJSON fetches
* New `SpriteImage` type for the `transformRequest` option

## 8.1.2

* Add require field to package.json's exports to avoid ESLint complaints

## 8.1.1

* Add main field to package.json to avoid ESLint complaints (was meant to go into 8.1.0 already)

## 8.1.0

* Add support for `icon-ignore-placement` and `icon-allow-overlap`
* Add main field to package.json to avoid ESLint complaints

## 8.0.8

* Fix relative source url handling for GeoJSON sources
* Fix website examples

## 8.0.7

* Use rollup instead of webpack for creating bundles

## 8.0.6

* Remove `webfont-matcher` dependency. Instead, load Google fonts only when they are not available already.
* Normalize Arial font name to make sure it can be detected.
* Use `sans-serif` as fallback font.

## 8.0.5

* Do not advertise the `dist/olms.js` cjs bundle in `package.json`, because its imports from `ol` are not cjs compliant. This should resolve problems with old bundlers that pick the cjs bundle instead of the ejs bundle.

## 8.0.4

* Add `Accept: application/json` header to requests for jsons. This avoids e.g. problems with Esri servers returning HTML instead of JSON
* Reduce build size by stripping more fields from the style spec json.

## 8.0.3

* Fix `applyStyle()` regression that broke the function when no `sourceOrLayer` was provided

## 8.0.2

* Fix display of optional arguments in API docs
* Fix layer stack regression when layers from one source are spread across multiple OpenLayers layers

## 8.0.1

* Display API docs correctly on npmjs.com

## 8.0.0

### Breaking changes

* The package now provides two separate bundles for umd and ejs. `dist/olms.js` is the umd bundle, `dist/index.js` the ejs bundle. No other JavaScript files are provided in the `dist/` folder any more.
* Imports from the `dist/` folder are no longer supported. They need to be replaced with imports from the package, e.g. `import {stylefunction} from "ol-mapbox-style"` instead of `import stylefunction from "ol-mapbox-style/dist/stylefunction"`.
* The `apply()` function has been replaced with an alias of the default export. This means that `apply()` now returns a `Promise<Map>` instead of a `Map`.
* The auto-generated types are now stricter, because they reference OpenLayers types correctly, instead of using `any`.

### Other changes

* `apply()`, `applyStyle()` and `applyBackground()` now take an `options` argument, which can contain a `transformRequest` option. With that function, urls and requests for styles, sprites, tiles and data can be modified. This can be useful e.g. to fix relative urls or to add credentials.
* Another available option is `accessToken`. In combination with the new support for `mapbox://` urls, it has become much easier to use maps and styles from Mapbox.
* Finally, a set of resolutions can be configured in the `options`. This makes it much easier to work with layers or maps in projections other than Web Mercator.
* The `applyStyle()` function has become more powerful and can now create and populate the source of the provided layer.
* [`feature-state`](https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/#feature-state) is now supported. The new functions `setFeatureState()` and `getFeatureState()` can be used to set and get the feature state.
* The build size is now at least 80 kB smaller because of pre-processing of the style specification from the `@mapbox/mapbox-gl-style-spec` package. The umd bundle no longer contains the OpenLayers code that has been there by accident for a few releases, which had unnecessarily increased the build size by almost 400 kB.
* The API docs are now generated with typedoc instead of documentation.js

## 7.1.1

* Do not use overflow for line labels

## 7.1.0

* Declutter also vector layers
* Allow text to overflow polygons

## 7.0.0

### Breaking changes

ol-mapbox-style now requires OpenLayers >= 6.13.

### All changes

* Add support for rich text labels (with OpenLayers v6.13+)
* Require ol >= 6.13

## 6.9.0

* Add support for the `icon-offset` layout property
* Fix `circle` layers with default radius

## 6.8.3

* Fix handling of fonts with two-word weights (e.g. "Semi Bold")
* Fix rendering of fill-outline when fill is fully transparent

## 6.8.2

* Use OpenLayers's fixed `ol/View#getProperties()` method, if available
* Avoid applying background if layout is none

## 6.8.1

* Fix color calculation for zero opacity when `renderTransparent(true)` is set.

## 6.8.0

* New `renderTransparent()` configuration option for more flexible hit detection
* Add `stylefunction` module functions to legacy build
* Better default view detection to avoid overwriting of view configurations

## 6.7.0

* `applyBackground()` now also accepts an OpenLayers >= 6.10 `VectorTile` layer as first argument.

## 6.6.0

* Publish declaration source maps
* Fix TileJSON handling of relative urls
* Cache functions and filters per `stylefunction` invocation

## 6.5.3

* Fix handling of `icon-color`

## 6.5.2

* Publish auto-generated `.d.ts` files for TypeScript

## 6.5.1

* Remove `ol` peer dependency from `package.json` for easier of use dev versions of `ol`

## 6.5.0

* Export `setupVectorSource()` for use in OpenLayers

## 6.4.2

* Fix import of `@mapbox/mapbox-gl-style-spec`

## 6.4.1

* Fix `webfont-matcher` import

## 6.4.0

* Change package to `"type": "module"`
* Updates to work seamlessly with ol > 6.5

## 6.3.2

* Support relative urls for TileJSON tiles (#320)

## 6.3.1

* Do not render icons when `icon-color` has zero opacity (#317)

## 6.3.0

* New `stylefunction.recordStyleLayer()` function to know which rendered layer a feature belongs to (#309)

## 6.2.1

* Improved support for relative urls in style documents (#307)

## 6.2.0

* Improved support for relative urls in style documents (#304)
* Allow empty spritesheets (#306)
* Added support for `fill-extrusion`, using a 2D fallback (#303)

## 6.1.4

* Fix OpenLayers version mismatch with legacy builds (was missing in 6.1.3) #291

## 6.1.3

* Added `Object.assign` polyfill for compatibility with old browsers #281
* Fix line wrapping of text labels #283 #284
* Fix OpenLayers version mismatch with legacy builds #291

## 6.1.2

* No more polyfills for `Object.assign` and `String#startsWith` needed #276
* Fixed issue with disappearing labels #273
* MultiLineString labeling improvements #272
* Improved developer experience with proper TypeScript configuration #270


## 6.1.1

* Fix version issue with @mapbox/mapbox-gl-style-spec

## 6.1.0

* Improvements and bug fixes for multi-line text and wrapping
* Support for running `stylefunction` in web workers

## 6.0.0

### Breaking changes

#### Module paths

ol-mapbox-style now ships with transpiled modules in the `dist/` folder, and sources in the `src/` folder. Previously, all modules were provided in the root directory.

When upgrading, the import paths need to be checked. For example,
```js
import stylefunction from 'ol-mapbox-style/stylefunction';
```
needs to be changed to
```js
import stylefunction from 'ol-mapbox-style/dist/stylefunction';
```

### Other changes

* Allow mapbox:// urls for all layer types, not just vector

## 5.0.2

* Update dependencies
* Use ol@6.0.1
* Do not fail when icons come from an expression
* Only set the maxResolution on a new view, instead of the whole resolutions array

## 5.0.0-beta.3

* Fix an issue with `icon-color´ handling
* Fix an issue with parsing Google font names
* Add support for the `icon-anchor` property
* More efficient handling or tilejson and shared vector tile sources

## 5.0.0-beta.2

* More efficient midpoint rendering
* Only include style spec once
* Trim the label-field string
* Round text size to integer pixels

## 5.0.0-beta.1

* Requires ol@6
* Uses new OpenLayers z-index ordering for decluttered content
* Support for the `text-rotation-alignment` property
* Better `max-angle` handling in combination with `text-letter-spacing`

## 4.3.0

* Load Google fonts with the correct weight and style
* Support for the `text-max-angle` layout property
* More efficient color handling without cache
* Improve text wrapping for to avoid short lines
* Apply default resolutions (Mapbox zoom levels) to the view
* Do not create layers for unsupported layer types
* Support for the `text-translate` paint property
* Improve performance for circle styles

## 4.2.1

* Smarter text wrapping. We now try to distribute text more evenly across lines
* Take letter spacing into account for calculating line breaks
* Add support for the `text-line-height` layout property
* Respect text halo for text anchor
* Fix how we interpret the `text-halo-width` paint property
* Respect `tileSize` for TileJSON when specified in the style doc

## 4.1.0

v4.1.0 brings a few performance improvements and bug fixes:

* More efficient font caching
* Always stroke polygons to be in line with the style spec
* Stroke polygons without drawing the outline a 2nd time
* Do not cache transparent colors, making hiding features more efficient
* Fix background opacity
* Respect minzoom from TileJSON sources, avoiding underzooming which can lead to loading thousands of tiles

## 4.0.0

### Breaking changes

#### Zoom handling

The way how we handle `zoom`, `minzoom` and `maxzoom` throughout the library has been reworked:

* When ol-mapbox-style creates an `ol/View` instance, it will be configured with the zoom level range that mapbox-gl uses. When updating from previous versions, you will notice that the zoom levels of the OpenLayers view will now match those in the Mapbox Style object. Previously OpenLayers zoom levels were higher by 1.
* When a Mapbox Style object is configured with a `zoom`, the zoom level will now be interpreted like in mapbox-gl, i.e. you will be zoomed in one level deeper than before the update.
* `minzoom` and `maxzoom` on a Mapbox Style layer were previously determined by the tile size of the underlying source. For raster sources with a tile size of 256, this means that `minzoom` and `maxzoom` are zoomed in one level deeper than before the update. For sources with a tile size of 512, nothing changes.
* `minzoom` and `maxzoom` on a Mapbox Style source now influence the `ol/tilegrid/TileGrid` that ol-mapbox-style creates for a source in a different way. The resolutions will always match mapbox-gl default zoom levels.
* `minzoom` and `maxzoom` on Mapbox Style layers no longer  influences whether the `ol/layer/Layer` instance is  set `visible` at a certain resolution. Instead, the layer's `maxResolution` and `minResolution` are set.

### Other changes

* Add support for `text-letter-spacing`

## 3.9.0

* Reduce garbage by reusing padding array
* Fix `getSource()`, `getLayer()` and `getLayers()` utility functions
* Add support for `text-padding`

## 3.8.0

* Add `getLayers()` utility function

## 3.7.2

* Use karma for tests
* Fix handling of relative paths
* Use CircleCI for continuous integration
* Do not limit raster layers to a `maxzoom` of 24
* Fix visibility handling

## 3.7.1

* Fix raster layer `minzoom` and `maxzoom`

## 3.7.0

* Support `minzoom` and `maxzoom` for raster layers

## 3.6.4

* Use TileJSON relative urls only when a TileJSON `url` was used

## 3.6.3

* Fix `icon-rotation`

## 3.6.2

* Fix standalone build

## 3.6.1

* Use TileJSON for all raster and vector sources
* Add support for TileJSON bounds
* Transfer copyright to the contributors
* Fix source/layer extent handling
* Add support for `raster-opacity`

## 3.5.0

* Do not set `zIndex` on layers
* Add support for `icon-rotation-alignment`: `'map'`

## 3.4.0

* Set layer properties only once and use first index as `zIndex`

## 3.3.0

* Improve docs, error handling and tests
* Stop using empty layer ids for `finalizeLayer()`
* Add default export that returns a `Promise` instead of an `ol/Map` instance
* Make layer ids for background unique
* Handle errors for unavailable TileJSON sources
* Factor out functions from `processStyle`'s monster loop
* Remove tile load transition for raster layers entirely

## 3.2.0

* Update dev dependencies
* Cleaned up `applyStyle()` and added tests
* Add support for `circle-stroke-opacity`
* Use block scope variables

## 3.1.0

* Use transpiled imports for mapbox-gl-style-spec

## 3.0.1

* Fix local font detection

## 3.0.0

* Add `mapbox-style` property to the `ol/Map` instance
* Add `getSource()` and `getLayer()` helper functions
* Move examples to ES6
* Allow users to specify custom resolutions
* Add support for `fill-pattern`
* Add support for filter expressions
* Smarter font stack handling
* Opacity transition only for the bottom layer

## 2.11.2

* README updates
* Fix imports

## 2.11.0

* Use webpack and babel instead of browserify
* Add continuous integration, coverage reports and use sonarqube for language quality
* Use jest for testing
* Add attribution to sources created by `apply`
* Depend on ol@5
* Move mapbox-to-ol-style package into this library
* Clear caches when `applyStyle` is called again
* Provide a standalone build

## 2.10.4

* Do not use isomorphic-fetch
* Fix typos in API docs

## 2.10.3

* Respect existing map view when setting `center` and `zoom`
* Run eslint on the code

## 2.10.2

* Set `maxResolution` on the layer, respecting `minzoom` of the source

## 2.10.0

* Update mapbox-to-ol-style and openlayers versions

## 2.9.1

* Fix background

## 2.9.0

* Do not fail when `setTarget(null)` is called on the map
* Set center and zoom when no view was created

## 2.8.4

* Fix background color

## 2.8.3

* Revert to older `mapbox-gl-style-spec` version

## 2.8.1

* Fix numeric interpolation

## 2.8.0

* Simplify web font handling
* Fix sprite urls

## 2.7.2

* Properly initialize path parts

## 2.7.1

* Only set extent when it has not been set before
* Update examples

## 2.7.0

* Fallback to low-res sprites when `@2x` spritesheet is not available
* Use native OpenLayers decluttering

## 2.6.6

* Make ESRI relative paths work with `apply()`

## 2.6.5

* Make examples mobile and cross-browser ready

## 2.6.2

* Cleanup and documentation improvements

## 2.6.1

* Performance improvements

## 2.6.0

* Decluttering of labels and symbols
* Added support for horizontal `text-anchor`

## 2.5.1

* Fixed a bug with function properties

## 2.5.0

* Respect `visibility` from all layers's `layout`

## 2.4.0

* Add support for raster and tilejson sources

## 2.3.0

* Fix a minor point styling issue
* Fix polygon outline leaks when using line styles on polygons
* Add optional `path` argument to `applyStyle()`

## 2.2.5

* Fix build on Windows

## 2.2.4

* Performance improvmeents from the `mapbox-to-ol-style` package

## 2.2.0

* Add support for `has` and `!has` filters

## 2.1.0

* Added new `apply()  function, which drastically simplifies the API.

## 2.0.0

### Switch to the ol package

With version 2.x, ol-mapbox-style switched to the [`ol`](https://npmjs.com/package/ol) npm package for the OpenLayers dependency. Users of `dist/olms.js` will not notice this change. Applications that have been using the [`openlayers`](https://npmjs.com/package/openlayers) npm package should be migrated to the `ol` package too.

If switching to `ol` is not yet desired, it is still possible to use ol-mapbox-style with the `openlayers` package, with the help of [`standalonify`](https://www.npmjs.com/package/standalonify). You have to require OpenLayers as `global.ol = require('openlayers');`. To build the bundle, use a command like the following:

``` sh
$ node_modules/.bin/browserify -g [ babelify --plugins [ transform-es2015-modules-commonjs ] ]  -p [ standalonify --name null --deps [ null --ol/style/style ol.style.Style --ol/style/fill ol.style.Fill --ol/style/stroke ol.style.Stroke --ol/style/circle ol.style.Circle --ol/style/icon ol.style.Icon --ol/style/text ol.style.Text ] ] example/index.js > example/bundle.js
```

### `getStyleFunction` moved to separate mapbox-to-ol-style package

For applications that do not need sprites and web fonts for their styles, a separate [`mapbox-to-ol-style`](https://npmjs.com/package/mapbox-to-ol-style) package with focus on small build size and minimal dependencies has been created. ol-mapbox-style depends on that package.

If you have previously been using the `getStyleFunction` function, you now have to import it from `mapbox-to-ol-style`. If you have not used anything else from ol-mapbox-style, you can uninstall it.

### Google fonts no longer need to be included in the html

ol-mapbox-style now automatically loads web fonts from Google. So in most cases, it is no longer necessary to scan the Mapbox Style for fonts and include them manually in the html of the application.
