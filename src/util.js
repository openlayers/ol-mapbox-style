import {expandUrl} from 'ol/tileurlfunction.js';
import {normalizeSourceUrl, normalizeStyleUrl} from './mapbox.js';

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
 * @typedef {import("./apply.js").Options} Options
 * @typedef {import('./apply.js').ResourceType} ResourceType
 * @private
 */
