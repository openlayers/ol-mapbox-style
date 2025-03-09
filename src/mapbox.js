const mapboxBaseUrl = 'https://api.mapbox.com';

/**
 * @typedef {Object} Sprite
 * @property {string} id Id of the sprite source.
 * @property {string} url URL to the sprite source.
 */

/**
 * Gets the path from a mapbox:// URL.
 * @param {string} url The Mapbox URL.
 * @return {string} The path.
 * @private
 */
export function getMapboxPath(url) {
  const startsWith = 'mapbox://';
  if (url.indexOf(startsWith) !== 0) {
    return '';
  }
  return url.slice(startsWith.length);
}

/**
 * Normalizes legacy string-based or new-style array based sprite definitions into array-based.
 * @param {string|Array<Sprite>} sprite the sprite source.
 * @param {string} token The access token.
 * @param {string} styleUrl The style URL.
 * @return {Array<Sprite>} An array of sprite definitions with normalized URLs.
 * @private
 */
export function normalizeSpriteDefinition(sprite, token, styleUrl) {
  if (typeof sprite === 'string') {
    return [
      {
        'id': 'default',
        'url': normalizeSpriteUrl(sprite, token, styleUrl),
      },
    ];
  }

  for (const spriteObj of sprite) {
    spriteObj.url = normalizeSpriteUrl(spriteObj.url, token, styleUrl);
  }

  return sprite;
}

/**
 * Turns mapbox:// sprite URLs into resolvable URLs.
 * @param {string} url The sprite URL.
 * @param {string} token The access token.
 * @param {string} styleUrl The style URL.
 * @return {string} A resolvable URL.
 * @private
 */
export function normalizeSpriteUrl(url, token, styleUrl) {
  const mapboxPath = getMapboxPath(url);
  if (!mapboxPath) {
    return decodeURI(new URL(url, styleUrl).href);
  }
  const startsWith = 'sprites/';
  if (mapboxPath.indexOf(startsWith) !== 0) {
    throw new Error(`unexpected sprites url: ${url}`);
  }
  const sprite = mapboxPath.slice(startsWith.length);

  return `${mapboxBaseUrl}/styles/v1/${sprite}/sprite?access_token=${token}`;
}

/**
 * Turns mapbox:// style URLs into resolvable URLs.
 * @param {string} url The style URL.
 * @param {string} token The access token.
 * @return {string} A resolvable URL.
 * @private
 */
export function normalizeStyleUrl(url, token) {
  const mapboxPath = getMapboxPath(url);
  if (!mapboxPath) {
    return decodeURI(new URL(url, location.href).href);
  }
  const startsWith = 'styles/';
  if (mapboxPath.indexOf(startsWith) !== 0) {
    throw new Error(`unexpected style url: ${url}`);
  }
  const style = mapboxPath.slice(startsWith.length);

  return `${mapboxBaseUrl}/styles/v1/${style}?&access_token=${token}`;
}

const mapboxSubdomains = ['a', 'b', 'c', 'd'];

/**
 * Turns mapbox:// source URLs into vector tile URL templates.
 * @param {string} url The source URL.
 * @param {string} token The access token.
 * @param {string} tokenParam The access token key.
 * @param {string} styleUrl The style URL.
 * @return {Array<string>} A vector tile template.
 * @private
 */
export function normalizeSourceUrl(url, token, tokenParam, styleUrl) {
  const urlObject = new URL(url, styleUrl || location.href);
  const mapboxPath = getMapboxPath(url);
  if (!mapboxPath) {
    if (!token) {
      return [decodeURI(urlObject.href)];
    }
    if (!urlObject.searchParams.has(tokenParam)) {
      urlObject.searchParams.set(tokenParam, token);
    }
    return [decodeURI(urlObject.href)];
  }

  if (mapboxPath === 'mapbox.satellite') {
    const sizeFactor = window.devicePixelRatio >= 1.5 ? '@2x' : '';
    return [
      `https://api.mapbox.com/v4/${mapboxPath}/{z}/{x}/{y}${sizeFactor}.webp?access_token=${token}`,
    ];
  }
  return mapboxSubdomains.map(
    (sub) =>
      `https://${sub}.tiles.mapbox.com/v4/${mapboxPath}/{z}/{x}/{y}.vector.pbf?access_token=${token}`,
  );
}
