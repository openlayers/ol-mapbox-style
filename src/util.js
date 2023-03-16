import {
  stylefunction as applyStylefunction,
  styleFunctionArgs,
} from './stylefunction.js';
import {expandUrl} from 'ol/tileurlfunction.js';
import {getUid} from 'ol';
import {normalizeSourceUrl, normalizeStyleUrl} from './mapbox.js';

/** @typedef {import("ol").Map} Map */
/** @typedef {import("ol/layer").Layer} Layer */
/** @typedef {import("ol/layer").Group} LayerGroup */
/** @typedef {import("ol/layer").Vector} VectorLayer */
/** @typedef {import("ol/layer").VectorTile} VectorTileLayer */
/** @typedef {import("ol/source").Source} Source */

/**
 * @typedef {Object} FeatureIdentifier
 * @property {string|number} id The feature id.
 * @property {string} source The source id.
 */

const functionCacheByStyleId = {};
const filterCacheByStyleId = {};

let styleId = 0;
export function getStyleId(glStyle) {
  if (!glStyle.id) {
    glStyle.id = styleId++;
  }
  return glStyle.id;
}

export function getStyleFunctionKey(glStyle, olLayer) {
  return getStyleId(glStyle) + '.' + getUid(olLayer);
}

/**
 * @param {Object} glStyle Mapboox style object.
 * @return {Object} Function cache.
 */
export function getFunctionCache(glStyle) {
  let functionCache = functionCacheByStyleId[glStyle.id];
  if (!functionCache) {
    functionCache = {};
    functionCacheByStyleId[getStyleId(glStyle)] = functionCache;
  }
  return functionCache;
}

export function clearFunctionCache() {
  for (const key in functionCacheByStyleId) {
    delete functionCacheByStyleId[key];
  }
}

/**
 * @param {Object} glStyle Mapboox style object.
 * @return {Object} Filter cache.
 */
export function getFilterCache(glStyle) {
  let filterCache = filterCacheByStyleId[glStyle.id];
  if (!filterCache) {
    filterCache = {};
    filterCacheByStyleId[getStyleId(glStyle)] = filterCache;
  }
  return filterCache;
}

export function deg2rad(degrees) {
  return (degrees * Math.PI) / 180;
}

export const defaultResolutions = (function () {
  const resolutions = [];
  for (let res = 78271.51696402048; resolutions.length <= 24; res /= 2) {
    resolutions.push(res);
  }
  return resolutions;
})();

/**
 * @param {number} width Width of the canvas.
 * @param {number} height Height of the canvas.
 * @return {HTMLCanvasElement} Canvas.
 */
export function createCanvas(width, height) {
  if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope && typeof OffscreenCanvas !== 'undefined') { // eslint-disable-line
    return /** @type {?} */ (new OffscreenCanvas(width, height));
  }
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

export function getZoomForResolution(resolution, resolutions) {
  let i = 0;
  const ii = resolutions.length;
  for (; i < ii; ++i) {
    const candidate = resolutions[i];
    if (candidate < resolution && i + 1 < ii) {
      const zoomFactor = resolutions[i] / resolutions[i + 1];
      return i + Math.log(resolutions[i] / resolution) / Math.log(zoomFactor);
    }
  }
  return ii - 1;
}

const pendingRequests = {};
/**
 * @param {ResourceType} resourceType Type of resource to load.
 * @param {string} url Url of the resource.
 * @param {Options} [options={}] Options.
 * @param {{request?: Request}} [metadata] Object to be filled with the request.
 * @return {Promise<Object|Response>} Promise that resolves with the loaded resource
 * or rejects with the Response object.
 * @private
 */
export function fetchResource(resourceType, url, options = {}, metadata) {
  if (url in pendingRequests) {
    if (metadata) {
      metadata.request = pendingRequests[url][0];
    }
    return pendingRequests[url][1];
  }
  const request = options.transformRequest
    ? options.transformRequest(url, resourceType) || new Request(url)
    : new Request(url);
  if (!request.headers.get('Accept')) {
    request.headers.set('Accept', 'application/json');
  }
  if (metadata) {
    metadata.request = request;
  }
  const pendingRequest = fetch(request)
    .then(function (response) {
      delete pendingRequests[url];
      return response.ok
        ? response.json()
        : Promise.reject(new Error('Error fetching source ' + url));
    })
    .catch(function (error) {
      delete pendingRequests[url];
      return Promise.reject(new Error('Error fetching source ' + url));
    });
  pendingRequests[url] = [request, pendingRequest];
  return pendingRequest;
}

export function getGlStyle(glStyleOrUrl, options) {
  if (typeof glStyleOrUrl === 'string') {
    if (glStyleOrUrl.trim().startsWith('{')) {
      try {
        const glStyle = JSON.parse(glStyleOrUrl);
        return Promise.resolve(glStyle);
      } catch (error) {
        return Promise.reject(error);
      }
    } else {
      glStyleOrUrl = normalizeStyleUrl(glStyleOrUrl, options.accessToken);
      return fetchResource('Style', glStyleOrUrl, options);
    }
  } else {
    return Promise.resolve(glStyleOrUrl);
  }
}

function getTransformedTilesUrl(tilesUrl, options) {
  if (options.transformRequest) {
    const transformedRequest = options.transformRequest(tilesUrl, 'Tiles');
    if (transformedRequest instanceof Request) {
      return decodeURI(transformedRequest.url);
    }
  }
  return tilesUrl;
}

const tilejsonCache = {};
/**
 * @param {Object} glSource glStyle source object.
 * @param {string} styleUrl Style URL.
 * @param {Options} options Options.
 * @return {Object} TileJson
 */
export function getTileJson(glSource, styleUrl, options = {}) {
  const cacheKey = [styleUrl, JSON.stringify(glSource)].toString();
  let promise = tilejsonCache[cacheKey];
  if (!promise || options.transformRequest) {
    const url = glSource.url;
    if (url && !glSource.tiles) {
      const normalizedSourceUrl = normalizeSourceUrl(
        url,
        options.accessToken,
        options.accessTokenParam || 'access_token',
        styleUrl || location.href
      );
      if (url.startsWith('mapbox://')) {
        promise = Promise.resolve(
          Object.assign({}, glSource, {
            url: undefined,
            tiles: expandUrl(normalizedSourceUrl),
          })
        );
      } else {
        const metadata = {};
        promise = fetchResource(
          'Source',
          normalizedSourceUrl,
          options,
          metadata
        ).then(function (tileJson) {
          tileJson.tiles = tileJson.tiles.map(function (tileUrl) {
            return getTransformedTilesUrl(
              normalizeSourceUrl(
                tileUrl,
                options.accessToken,
                options.accessTokenParam || 'access_token',
                metadata.request.url
              ),
              options
            );
          });
          return Promise.resolve(tileJson);
        });
      }
    } else {
      glSource = Object.assign({}, glSource, {
        tiles: glSource.tiles.map(function (tileUrl) {
          return getTransformedTilesUrl(
            normalizeSourceUrl(
              tileUrl,
              options.accessToken,
              options.accessTokenParam || 'access_token',
              styleUrl || location.href
            ),
            options
          );
        }),
      });
      promise = Promise.resolve(Object.assign({}, glSource));
    }
    tilejsonCache[cacheKey] = promise;
  }
  return promise;
}

/**
 * @param {HTMLImageElement} spriteImage Sprite image id.
 * @param {{x: number, y: number, width: number, height: number, pixelRatio: number}} spriteImageData Sprite image data.
 * @param {number} haloWidth Halo width.
 * @param {{r: number, g: number, b: number, a: number}} haloColor Halo color.
 * @return {HTMLCanvasElement} Canvas element with the halo.
 */
export function drawIconHalo(
  spriteImage,
  spriteImageData,
  haloWidth,
  haloColor
) {
  const imageCanvas = document.createElement('canvas');
  const imgSize = [
    2 * haloWidth * spriteImageData.pixelRatio + spriteImageData.width,
    2 * haloWidth * spriteImageData.pixelRatio + spriteImageData.height,
  ];
  imageCanvas.width = imgSize[0];
  imageCanvas.height = imgSize[1];
  const imageContext = imageCanvas.getContext('2d');
  imageContext.drawImage(
    spriteImage,
    spriteImageData.x,
    spriteImageData.y,
    spriteImageData.width,
    spriteImageData.height,
    haloWidth * spriteImageData.pixelRatio,
    haloWidth * spriteImageData.pixelRatio,
    spriteImageData.width,
    spriteImageData.height
  );
  const imageData = imageContext.getImageData(0, 0, imgSize[0], imgSize[1]);
  imageContext.globalCompositeOperation = 'destination-over';
  imageContext.fillStyle = `rgba(${haloColor.r * 255},${haloColor.g * 255},${
    haloColor.b * 255
  },${haloColor.a})`;
  const data = imageData.data;
  for (let i = 0, ii = imageData.width; i < ii; ++i) {
    for (let j = 0, jj = imageData.height; j < jj; ++j) {
      const index = (j * ii + i) * 4;
      const alpha = data[index + 3];
      if (alpha > 0) {
        imageContext.arc(
          i,
          j,
          haloWidth * spriteImageData.pixelRatio,
          0,
          2 * Math.PI
        );
      }
    }
  }
  imageContext.fill();
  return imageCanvas;
}

/**
 * Get the OpenLayers layer instance that contains the provided Mapbox Style
 * `layer`. Note that multiple Mapbox Style layers are combined in a single
 * OpenLayers layer instance when they use the same Mapbox Style `source`.
 * @param {Map|LayerGroup} map OpenLayers Map or LayerGroup.
 * @param {string} layerId Mapbox Style layer id.
 * @return {Layer} OpenLayers layer instance.
 */
export function getLayer(map, layerId) {
  const layers = map.getLayers().getArray();
  for (let i = 0, ii = layers.length; i < ii; ++i) {
    const mapboxLayers = layers[i].get('mapbox-layers');
    if (mapboxLayers && mapboxLayers.indexOf(layerId) !== -1) {
      return /** @type {Layer} */ (layers[i]);
    }
  }
}

/**
 * Get the OpenLayers layer instances for the provided Mapbox Style `source`.
 * @param {Map|LayerGroup} map OpenLayers Map or LayerGroup.
 * @param {string} sourceId Mapbox Style source id.
 * @return {Array<Layer>} OpenLayers layer instances.
 */
export function getLayers(map, sourceId) {
  const result = [];
  const layers = map.getLayers().getArray();
  for (let i = 0, ii = layers.length; i < ii; ++i) {
    if (layers[i].get('mapbox-source') === sourceId) {
      result.push(/** @type {Layer} */ (layers[i]));
    }
  }
  return result;
}

/**
 * Get the OpenLayers source instance for the provided Mapbox Style `source`.
 * @param {Map|LayerGroup} map OpenLayers Map or LayerGroup.
 * @param {string} sourceId Mapbox Style source id.
 * @return {Source} OpenLayers source instance.
 */
export function getSource(map, sourceId) {
  const layers = map.getLayers().getArray();
  for (let i = 0, ii = layers.length; i < ii; ++i) {
    const source = /** @type {Layer} */ (layers[i]).getSource();
    if (layers[i].get('mapbox-source') === sourceId) {
      return source;
    }
  }
}

/**
 * Sets or removes a feature state. The feature state is taken into account for styling,
 * just like the feature's properties, and can be used e.g. to conditionally render selected
 * features differently.
 *
 * The feature state will be stored on the OpenLayers layer matching the feature identifier, in the
 * `mapbox-featurestate` property.
 * @param {Map|VectorLayer|VectorTileLayer} mapOrLayer OpenLayers Map or layer to set the feature
 * state on.
 * @param {FeatureIdentifier} feature Feature identifier.
 * @param {Object|null} state Feature state. Set to `null` to remove the feature state.
 */
export function setFeatureState(mapOrLayer, feature, state) {
  const layers =
    'getLayers' in mapOrLayer
      ? getLayers(mapOrLayer, feature.source)
      : [mapOrLayer];
  for (let i = 0, ii = layers.length; i < ii; ++i) {
    const featureState = layers[i].get('mapbox-featurestate');
    if (featureState) {
      if (state) {
        featureState[feature.id] = state;
      } else {
        delete featureState[feature.id];
      }
      layers[i].changed();
    } else {
      throw new Error(`Map or layer for source "${feature.source}" not found.`);
    }
  }
}

/**
 * Sets or removes a feature state. The feature state is taken into account for styling,
 * just like the feature's properties, and can be used e.g. to conditionally render selected
 * features differently.
 * @param {Map|VectorLayer|VectorTileLayer} mapOrLayer Map or layer to set the feature state on.
 * @param {FeatureIdentifier} feature Feature identifier.
 * @return {Object|null} Feature state or `null` when no feature state is set for the given
 * feature identifier.
 */
export function getFeatureState(mapOrLayer, feature) {
  const layers =
    'getLayers' in mapOrLayer
      ? getLayers(mapOrLayer, feature.source)
      : [mapOrLayer];
  for (let i = 0, ii = layers.length; i < ii; ++i) {
    const featureState = layers[i].get('mapbox-featurestate');
    if (featureState && featureState[feature.id]) {
      return featureState[feature.id];
    }
  }
  return null;
}

/**
 * Get the Mapbox Layer object for the provided `layerId`.
 * @param {Map|LayerGroup} mapOrGroup Map or LayerGroup.
 * @param {string} layerId Mapbox Layer id.
 * @return {Object} Mapbox Layer object.
 */
export function getMapboxLayer(mapOrGroup, layerId) {
  const style = mapOrGroup.get('mapbox-style');
  const layerStyle = style.layers.find(function (layer) {
    return layer.id === layerId;
  });
  return layerStyle;
}

/**
 * Add a new Mapbox Layer object to the style. The map will be re-rendered.
 * @param {Map|LayerGroup} mapOrGroup The Map or LayerGroup `apply` was called on.
 * @param {Object} mapboxLayer Mapbox Layer object.
 * @param {string} [beforeLayerId] Optional id of the Mapbox Layer before the new layer that will be added.
 */
export function addMapboxLayer(mapOrGroup, mapboxLayer, beforeLayerId) {
  const mapboxLayers = mapOrGroup.get('mapbox-style').layers;
  let index;
  if (beforeLayerId !== undefined) {
    const beforeLayer = getMapboxLayer(mapOrGroup, beforeLayerId);
    if (beforeLayer === undefined) {
      throw new Error(`Layer with id "${beforeLayerId}" not found.`);
    }
    index = mapboxLayers.indexOf(beforeLayer);
  } else {
    index = mapboxLayers.length;
  }
  if (index === 0) {
    throw new Error('Cannot add layer before first layer.');
  }
  if (mapboxLayers[index - 1].source !== mapboxLayer.source) {
    throw new Error('Added layer and layer before must use the same source.');
  }
  if (mapboxLayers.some((layer) => layer.id === mapboxLayer.id)) {
    throw new Error(`Layer with id "${mapboxLayer.id}" already exists.`);
  }
  mapboxLayers.splice(index, 0, mapboxLayer);

  const args =
    styleFunctionArgs[
      getStyleFunctionKey(
        mapOrGroup.get('mapbox-style'),
        getLayer(mapOrGroup, mapboxLayers[index - 1].id)
      )
    ];
  if (args) {
    const [
      olLayer,
      glStyle,
      sourceOrLayers,
      resolutions,
      spriteData,
      spriteImageUrl,
      getFonts,
      getImage,
    ] = args;
    if (Array.isArray(sourceOrLayers)) {
      const layerIndex = beforeLayerId
        ? sourceOrLayers.indexOf(beforeLayerId)
        : sourceOrLayers.length;
      sourceOrLayers.splice(layerIndex, 0, mapboxLayer.id);
    }
    applyStylefunction(
      olLayer,
      glStyle,
      sourceOrLayers,
      resolutions,
      spriteData,
      spriteImageUrl,
      getFonts,
      getImage
    );
  } else {
    getLayer(mapOrGroup, mapboxLayers[index - 1].id).changed();
  }
}

/**
 * Update a Mapbox Layer object in the style. The map will be re-rendered with the new style.
 * @param {Map|LayerGroup} mapOrGroup The Map or LayerGroup `apply` was called on.
 * @param {Object} mapboxLayer Updated Mapbox Layer object.
 */
export function updateMapboxLayer(mapOrGroup, mapboxLayer) {
  const glStyle = mapOrGroup.get('mapbox-style');
  const mapboxLayers = glStyle.layers;
  const index = mapboxLayers.findIndex(function (layer) {
    return layer.id === mapboxLayer.id;
  });
  if (index === -1) {
    throw new Error(`Layer with id "${mapboxLayer.id}" not found.`);
  }
  const oldLayer = mapboxLayers[index];
  if (oldLayer.source !== mapboxLayer.source) {
    throw new Error(
      'Updated layer and previous version must use the same source.'
    );
  }
  delete getFunctionCache(glStyle)[mapboxLayer.id];
  delete getFilterCache(glStyle)[mapboxLayer.id];
  applyStylefunction.apply(
    undefined,
    styleFunctionArgs[
      getStyleFunctionKey(
        mapOrGroup.get('mapbox-style'),
        getLayer(mapOrGroup, mapboxLayer.id)
      )
    ]
  );
}

/**
 * Remove a Mapbox Layer object from the style. The map will be re-rendered.
 * @param {Map|LayerGroup} mapOrGroup The Map or LayerGroup `apply` was called on.
 * @param {string|Object} mapboxLayerIdOrLayer Mapbox Layer id or Mapbox Layer object.
 */
export function removeMapboxLayer(mapOrGroup, mapboxLayerIdOrLayer) {
  const mapboxLayerId =
    typeof mapboxLayerIdOrLayer === 'string'
      ? mapboxLayerIdOrLayer
      : mapboxLayerIdOrLayer.id;
  const layer = getLayer(mapOrGroup, mapboxLayerId);
  /** @type {Array<Object>} */
  const layerMapboxLayers = layer.get('mapbox-layers');
  if (layerMapboxLayers.length === 1) {
    throw new Error(
      'Cannot remove last Mapbox layer from an OpenLayers layer.'
    );
  }
  layerMapboxLayers.splice(layerMapboxLayers.indexOf(mapboxLayerId), 1);
  const layers = mapOrGroup.get('mapbox-style').layers;
  layers.splice(
    layers.findIndex((layer) => layer.id === mapboxLayerId),
    1
  );
  applyStylefunction.apply(
    undefined,
    styleFunctionArgs[
      getStyleFunctionKey(mapOrGroup.get('mapbox-style'), layer)
    ]
  );
}

/**
 * @typedef {import("./apply.js").Options} Options
 * @typedef {import('./apply.js').ResourceType} ResourceType
 * @private
 */
