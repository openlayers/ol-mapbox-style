import 'ol/ol.css';
import {PMTiles} from 'pmtiles';
import {apply} from 'ol-mapbox-style';

// Generic transformRequest function that can be used with any style
// that uses pmtiles:// URLs for sources and tiles
let styleUrl;
const pmtilesByUrl = {};
const tileUrlRegex = /^pmtiles:\/\/(.+)\/([0-9]+)\/([0-9]+)\/([0-9]+).mvt$/;
const tileCoordRegex = /\/([0-9]+)\/([0-9]+)\/([0-9]+).mvt$/;
const transformRequest = async (url, type) => {
  // Workaround for broken URL handling in Safari
  url = url.replace(/^pmtiles:\/\/http(s?)\/\//, 'pmtiles://http$1://');

  if (type === 'Style') {
    styleUrl = url;
  }
  /** @type {PMTiles} */
  let pmtiles;
  if (url.startsWith('pmtiles://')) {
    const baseUrl = url.slice(10).replace(tileCoordRegex, '');
    if (!pmtilesByUrl[baseUrl]) {
      pmtilesByUrl[baseUrl] = new PMTiles(
        new URL(url.slice(10), styleUrl).href,
      );
    }
    pmtiles = pmtilesByUrl[baseUrl];
  }
  if (!pmtiles) {
    return url;
  }
  if (type === 'Source') {
    const tileJson = await pmtiles.getTileJson(url);
    return `data:application/json,${encodeURIComponent(
      JSON.stringify(tileJson),
    )}`;
  }
  if (type === 'Tiles') {
    const [, baseUrl, z, x, y] = url.match(tileUrlRegex);
    const tileResult = await pmtilesByUrl[baseUrl].getZxy(
      Number(z),
      Number(x),
      Number(y),
    );
    const data = tileResult?.data ?? new ArrayBuffer(0);
    const objectUrl = URL.createObjectURL(new Blob([data]));
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
    return objectUrl;
  }
  return url;
};

apply('map', 'data/protomaps-dark-style.json', {
  transformRequest,
});
