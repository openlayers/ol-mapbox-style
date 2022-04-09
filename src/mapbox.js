const mapboxBaseUrl = 'https://api.mapbox.com';

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

/**
 * Turns mapbox:// source URLs into vector tile URL templates.
 * @param {string} url The source URL.
 * @param {string} token The access token.
 * @param {string} tokenParam The access token key.
 * @param {string} styleUrl The style URL.
 * @return {string} A vector tile template.
 * @private
 */
export function normalizeSourceUrl(url, token, tokenParam, styleUrl) {
  const urlObject = new URL(url, styleUrl);
  const mapboxPath = getMapboxPath(url);
  if (!mapboxPath) {
    if (!token) {
      return decodeURI(urlObject.href);
    }
    urlObject.searchParams.set(tokenParam, token);
    return decodeURI(urlObject.href);
  }
  return `https://{a-d}.tiles.mapbox.com/v4/${mapboxPath}/{z}/{x}/{y}.vector.pbf?access_token=${token}`;
}
