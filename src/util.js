import {assign} from 'ol/obj.js';
import {normalizeSourceUrl, normalizeStyleUrl} from 'ol/layer/MapboxVector.js';

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
  } else {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }
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
 * @param {'Style'|'Source'|'Sprite'|'Tile'} resourceType Type of resource to load.
 * @param {string} url Url of the resource.
 * @param {Options} [options={}] Options.
 * @return {Promise<Object|Response>} Promise that resolves with the loaded resource
 * or rejects with the Response object.
 * @private
 */
export function fetchResource(resourceType, url, options = {}) {
  if (url in pendingRequests) {
    return pendingRequests[url];
  } else {
    const request = options.transformRequest
      ? options.transformRequest(url, resourceType)
      : new Request(url);
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
    pendingRequests[url] = pendingRequest;
    return pendingRequest;
  }
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
    if (url) {
      const normalizedUrl = normalizeSourceUrl(
        url,
        options.accessToken,
        options.accessTokenParam || 'access_token',
        styleUrl || location.href
      );
      if (url.startsWith('mapbox://')) {
        promise = Promise.resolve(
          assign({}, glSource, {
            url: undefined,
            tiles: normalizedUrl,
          })
        );
      } else {
        promise = fetchResource('Source', normalizedUrl, options).then(
          function (tileJson) {
            tileJson.tiles = tileJson.tiles.map(function (tileUrl) {
              let normalizedTileUrl = normalizeSourceUrl(
                tileUrl,
                options.accessToken,
                options.accessTokenParam || 'access_token',
                normalizedUrl || location.href
              );
              if (options.transformRequest) {
                normalizedTileUrl = decodeURI(
                  options.transformRequest(normalizedTileUrl, 'Tile').url
                );
              }
              return normalizedTileUrl;
            });
            return Promise.resolve(tileJson);
          }
        );
      }
    } else {
      glSource = assign({}, glSource, {
        tiles: glSource.tiles.map(function (tileUrl) {
          return normalizeSourceUrl(
            tileUrl,
            options.accessToken,
            options.accessTokenParam || 'access_token',
            styleUrl || location.href
          );
        }),
      });
      promise = Promise.resolve(assign({}, glSource));
    }
    if (!options.transformRequest) {
      tilejsonCache[cacheKey] = promise;
    }
  }
  return promise;
}

/** @typedef {import("./index.js").Options} Options */
