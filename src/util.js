import TileState from 'ol/TileState.js';
import {VectorTile} from 'ol';
import {getUid} from 'ol/util.js';
import {normalizeSourceUrl, normalizeStyleUrl} from './mapbox.js';
import {toPromise} from 'ol/functions.js';

/** @typedef {'Style'|'Source'|'Sprite'|'SpriteImage'|'Tiles'|'GeoJSON'} ResourceType */

/** @typedef {import("ol").Map} Map */
/** @typedef {import("ol/layer").Layer} Layer */
/** @typedef {import("ol/layer").Group} LayerGroup */
/** @typedef {import("ol/layer").Vector} VectorLayer */
/** @typedef {import("ol/layer").VectorTile} VectorTileLayer */
/** @typedef {import("ol/source").Source} Source */

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

export function getResolutionForZoom(zoom, resolutions) {
  const base = Math.floor(zoom);
  const factor = Math.pow(2, zoom - base);
  return resolutions[base] / factor;
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
  const transformedRequest = options.transformRequest
    ? options.transformRequest(url, resourceType) || url
    : url;
  const pendingRequest = toPromise(() => transformedRequest).then(
    (transformedRequest) => {
      if (!(transformedRequest instanceof Request)) {
        transformedRequest = new Request(transformedRequest);
      }
      if (!transformedRequest.headers.get('Accept')) {
        transformedRequest.headers.set('Accept', 'application/json');
      }
      if (metadata) {
        metadata.request = transformedRequest;
      }
      return fetch(transformedRequest)
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
    },
  );
  pendingRequests[url] = [transformedRequest, pendingRequest];
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

const tilejsonCache = {};
/**
 * @param {Object} glSource glStyle source object.
 * @param {string} styleUrl Style URL.
 * @param {Options} options Options.
 * @return {Promise<{tileJson: Object, tileLoadFunction: import('ol/Tile.js').LoadFunction}?>} TileJson and load function
 */
export function getTileJson(glSource, styleUrl, options = {}) {
  const cacheKey = [styleUrl, JSON.stringify(glSource)].toString();
  let promise = tilejsonCache[cacheKey];
  if (!promise || options.transformRequest) {
    let tileLoadFunction;
    if (options.transformRequest) {
      tileLoadFunction = (tile, src) => {
        const transformedRequest = options.transformRequest
          ? options.transformRequest(src, 'Tiles') || src
          : src;
        if (tile instanceof VectorTile) {
          tile.setLoader((extent, resolution, projection) => {
            toPromise(() => transformedRequest).then((transformedRequest) => {
              fetch(transformedRequest)
                .then((response) => response.arrayBuffer())
                .then((data) => {
                  const format = tile.getFormat();
                  const features = format.readFeatures(data, {
                    extent: extent,
                    featureProjection: projection,
                  });
                  // @ts-ignore
                  tile.setFeatures(features);
                })
                .catch((e) => tile.setState(TileState.ERROR));
            });
          });
        } else {
          const img = tile.getImage();
          toPromise(() => transformedRequest).then((transformedRequest) => {
            if (transformedRequest instanceof Request) {
              fetch(transformedRequest)
                .then((response) => response.blob())
                .then((blob) => {
                  const url = URL.createObjectURL(blob);
                  img.addEventListener('load', () => URL.revokeObjectURL(url));
                  img.addEventListener('error', () => URL.revokeObjectURL(url));
                  img.src = url;
                })
                .catch((e) => tile.setState(TileState.ERROR));
            } else {
              img.src = transformedRequest;
            }
          });
        }
      };
    }
    const url = glSource.url;
    if (url && !glSource.tiles) {
      const normalizedSourceUrl = normalizeSourceUrl(
        url,
        options.accessToken,
        options.accessTokenParam || 'access_token',
        styleUrl || location.href,
      );
      if (url.startsWith('mapbox://')) {
        promise = Promise.resolve({
          tileJson: Object.assign({}, glSource, {
            url: undefined,
            tiles: normalizedSourceUrl,
          }),
          tileLoadFunction,
        });
      } else {
        const metadata = {};
        promise = fetchResource(
          'Source',
          normalizedSourceUrl[0],
          options,
          metadata,
        ).then(function (tileJson) {
          tileJson.tiles = tileJson.tiles.map(function (tileUrl) {
            if (tileJson.scheme === 'tms') {
              tileUrl = tileUrl.replace('{y}', '{-y}');
            }
            return normalizeSourceUrl(
              tileUrl,
              options.accessToken,
              options.accessTokenParam || 'access_token',
              metadata.request.url,
            )[0];
          });
          return Promise.resolve({tileJson, tileLoadFunction});
        });
      }
    } else {
      glSource = Object.assign({}, glSource, {
        tiles: glSource.tiles.map(function (tileUrl) {
          if (glSource.scheme === 'tms') {
            tileUrl = tileUrl.replace('{y}', '{-y}');
          }
          return normalizeSourceUrl(
            tileUrl,
            options.accessToken,
            options.accessTokenParam || 'access_token',
            styleUrl || location.href,
          )[0];
        }),
      });
      promise = Promise.resolve({
        tileJson: Object.assign({}, glSource),
        tileLoadFunction,
      });
    }
    tilejsonCache[cacheKey] = promise;
  }
  return promise;
}

/**
 * @param {HTMLImageElement|HTMLCanvasElement} spriteImage Sprite image id.
 * @param {{x: number, y: number, width: number, height: number, pixelRatio: number}} spriteImageData Sprite image data.
 * @param {number} haloWidth Halo width.
 * @param {{r: number, g: number, b: number, a: number}} haloColor Halo color.
 * @return {HTMLCanvasElement} Canvas element with the halo.
 */
export function drawIconHalo(
  spriteImage,
  spriteImageData,
  haloWidth,
  haloColor,
) {
  const imgSize = [
    2 * haloWidth * spriteImageData.pixelRatio + spriteImageData.width,
    2 * haloWidth * spriteImageData.pixelRatio + spriteImageData.height,
  ];
  const imageCanvas = createCanvas(imgSize[0], imgSize[1]);
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
    spriteImageData.height,
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
          2 * Math.PI,
        );
      }
    }
  }
  imageContext.fill();
  return imageCanvas;
}

function smoothstep(min, max, value) {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

/**
 * @param {HTMLImageElement} image SDF image
 * @param {{x: number, y: number, width: number, height: number}} area Area to unSDF
 * @param {{r: number, g: number, b: number, a: number}} color Color to use
 * @return {HTMLCanvasElement} Regular image
 */
export function drawSDF(image, area, color) {
  const imageCanvas = createCanvas(area.width, area.height);
  const imageContext = imageCanvas.getContext('2d');
  imageContext.drawImage(
    image,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    area.width,
    area.height,
  );
  const imageData = imageContext.getImageData(0, 0, area.width, area.height);
  const data = imageData.data;
  for (let i = 0, ii = imageData.width; i < ii; ++i) {
    for (let j = 0, jj = imageData.height; j < jj; ++j) {
      const index = (j * ii + i) * 4;
      const dist = data[index + 3] / 255;

      const buffer = 0.75;
      const gamma = 0.1;

      const alpha = smoothstep(buffer - gamma, buffer + gamma, dist);
      if (alpha > 0) {
        data[index + 0] = Math.round(255 * color.r * alpha);
        data[index + 1] = Math.round(255 * color.g * alpha);
        data[index + 2] = Math.round(255 * color.b * alpha);
        data[index + 3] = Math.round(255 * alpha);
      } else {
        data[index + 3] = 0;
      }
    }
  }
  imageContext.putImageData(imageData, 0, 0);
  return imageCanvas;
}

/**
 * @typedef {import("./apply.js").Options} Options
 * @private
 */
