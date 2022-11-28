/**
 * Gets the path from a mapbox:// URL.
 * @param {string} url The Mapbox URL.
 * @return {string} The path.
 * @private
 */
export function getMapboxPath(url: string): string;
/**
 * Turns mapbox:// sprite URLs into resolvable URLs.
 * @param {string} url The sprite URL.
 * @param {string} token The access token.
 * @param {string} styleUrl The style URL.
 * @return {string} A resolvable URL.
 * @private
 */
export function normalizeSpriteUrl(url: string, token: string, styleUrl: string): string;
/**
 * Turns mapbox:// style URLs into resolvable URLs.
 * @param {string} url The style URL.
 * @param {string} token The access token.
 * @return {string} A resolvable URL.
 * @private
 */
export function normalizeStyleUrl(url: string, token: string): string;
/**
 * Turns mapbox:// source URLs into vector tile URL templates.
 * @param {string} url The source URL.
 * @param {string} token The access token.
 * @param {string} tokenParam The access token key.
 * @param {string} styleUrl The style URL.
 * @return {string} A vector tile template.
 * @private
 */
export function normalizeSourceUrl(url: string, token: string, tokenParam: string, styleUrl: string): string;
