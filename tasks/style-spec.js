/*
ol-mapbox-style - Use Mapbox/MapLibre Style objects with OpenLayers
Copyright 2016-present ol-mapbox-style contributors
License: https://raw.githubusercontent.com/openlayers/ol-mapbox-style/master/LICENSE
*/

/**
 * Writes the published form of `src/stylespec.js`: `layout_*`/`paint_*` only,
 * reduced to the fields the expression engine reads, repeats spread from shared
 * constants.
 */

import {expressions, v8} from '@maplibre/maplibre-gl-style-spec';
import {execFileSync} from 'child_process';
import {copyFileSync, existsSync, rmSync, writeFileSync} from 'fs';
import {relative} from 'path';
import {fileURLToPath} from 'url';

const specFile = fileURLToPath(new URL('../src/stylespec.js', import.meta.url));
const expressionsFile = fileURLToPath(
  new URL('../src/expressions.js', import.meta.url),
);
const backupFile = `${specFile}.bak`;
const root = fileURLToPath(new URL('..', import.meta.url));

/**
 * Descriptor fields the expression engine reads.
 * @type {Set<string>}
 */
const KEEP = new Set([
  'default',
  'expression',
  'length',
  'property-type',
  'tokens',
  'type',
  'value',
  'values',
]);

/**
 * Descriptor fields nothing reads, listed so that a *new* upstream field is
 * reported rather than dropped silently.
 * @type {Set<string>}
 */
const DROP = new Set([
  'maximum',
  'minimum',
  'overridable',
  'period',
  'requires',
  'transition',
  'units',
]);

/**
 * @param {string} section Section name, e.g. `paint_line`.
 * @param {string} property Property name, e.g. `line-width`.
 * @return {Object} The descriptor, reduced to the fields the engine reads.
 */
function trimDescriptor(section, property) {
  const descriptor = v8[section][property];
  const trimmed = {};
  const unknown = [];
  for (const field of Object.keys(descriptor)) {
    if (KEEP.has(field)) {
      trimmed[field] = descriptor[field];
    } else if (!DROP.has(field)) {
      unknown.push(field);
    }
  }
  if (unknown.length > 0) {
    throw new Error(
      `Unrecognized field(s) on ${section}.${property}: ${unknown.sort().join(', ')}.\n` +
        'Decide whether the expression engine reads them, then add each one to ' +
        'KEEP or DROP in tasks/style-spec.js.',
    );
  }
  return trimmed;
}

/**
 * @return {Object<string, Object<string, Object>>} Every `layout_*` and
 *     `paint_*` descriptor in the stock reference, trimmed and sorted.
 */
function buildSpec() {
  const spec = {};
  const sections = Object.keys(v8)
    .filter((section) => /^(layout|paint)_/.test(section))
    .sort();
  for (const section of sections) {
    spec[section] = {};
    for (const property of Object.keys(v8[section]).sort()) {
      spec[section][property] = trimDescriptor(section, property);
    }
  }
  return spec;
}

/**
 * Half the descriptors repeat - `visibility` appears in every `layout_*`
 * section - so each distinct body is emitted once and spread into the
 * properties sharing it, which keeps every property its own object.
 * @param {Object<string, Object<string, Object>>} spec The reference.
 * @return {Map<string, string>} Constant name by descriptor JSON.
 */
function sharedDescriptors(spec) {
  const uses = new Map();
  for (const section of Object.keys(spec)) {
    for (const property of Object.keys(spec[section])) {
      const body = JSON.stringify(spec[section][property]);
      uses.set(body, (uses.get(body) || 0) + 1);
    }
  }
  const names = new Map();
  const taken = new Set();
  for (const section of Object.keys(spec)) {
    for (const property of Object.keys(spec[section])) {
      const descriptor = spec[section][property];
      const body = JSON.stringify(descriptor);
      if (uses.get(body) < 2 || names.has(body)) {
        continue;
      }
      const base =
        `${descriptor['property-type'] || 'any'}-${descriptor.type || 'any'}`
          .toLowerCase()
          .replace(/[^a-z0-9]+(.)/g, (match, character) =>
            character.toUpperCase(),
          );
      let name = base;
      for (let i = 2; taken.has(name); ++i) {
        name = `${base}${i}`;
      }
      taken.add(name);
      names.set(body, name);
    }
  }
  return names;
}

/**
 * @param {Object<string, Object<string, Object>>} spec The reference.
 * @return {string} The contents of `src/stylespec.js`.
 */
function renderSpec(spec) {
  const shared = sharedDescriptors(spec);
  let constants = '';
  for (const [body, name] of shared) {
    constants += `const ${name} = ${JSON.stringify(JSON.parse(body), null, 2)};\n\n`;
  }
  let entries = '';
  for (const section of Object.keys(spec)) {
    entries += `  ${JSON.stringify(section)}: {\n`;
    for (const property of Object.keys(spec[section])) {
      const body = JSON.stringify(spec[section][property]);
      const value = shared.has(body)
        ? `{...${shared.get(body)}}`
        : JSON.stringify(spec[section][property], null, 2);
      entries += `    ${JSON.stringify(property)}: ${value},\n`;
    }
    entries += '  },\n';
  }
  return `/**
 * GENERATED - run \`npm run style-spec:restore\` to restore the original.
 */

${constants}export default {
${entries}};
`;
}

/**
 * Sets the current file aside, then writes the published form over it. An
 * existing backup is left alone: it means a previous `generate` was never
 * restored, and it, not the generated file, holds the original.
 */
function generate() {
  if (!existsSync(backupFile)) {
    copyFileSync(specFile, backupFile);
  }
  writeFileSync(specFile, renderSpec(buildSpec()));
  execFileSync('npx', ['eslint', '--fix', specFile], {cwd: root});
  // eslint-disable-next-line no-console
  console.log(`Wrote ${relative(root, specFile)}.`);
}

/**
 * Puts back whatever `generate` set aside. A no-op without a backup, so that a
 * stray `postpack` cannot fail a publish.
 */
function restore() {
  if (!existsSync(backupFile)) {
    // eslint-disable-next-line no-console
    console.log(`No ${relative(root, backupFile)} to restore.`);
    return;
  }
  copyFileSync(backupFile, specFile);
  rmSync(backupFile);
  // eslint-disable-next-line no-console
  console.log(`Restored ${relative(root, specFile)}.`);
}

/**
 * `src/expressions.js` registers operators the stock engine lacks, so that
 * Mapbox styles using them parse. If upstream adds one, the local definition
 * silently wins.
 * @return {Promise<Array<string>>} Problems found.
 */
async function checkExpressions() {
  // The registry holds every expression; `definitions` only the compound ones.
  const stock = new Map(Object.entries(expressions));
  await import(expressionsFile);
  const registered = Object.entries(expressions);
  const problems = [];
  const overridden = registered
    .filter(
      ([name, definition]) => stock.has(name) && stock.get(name) !== definition,
    )
    .map(([name]) => name);
  if (overridden.length > 0) {
    problems.push(
      `src/expressions.js overrides ${overridden.sort().join(', ')}, which the ` +
        'stock engine now defines itself. The local definition wins silently, ' +
        'so drop it or record why it has to differ.',
    );
  }
  return problems;
}

/**
 * @return {Promise<Array<string>>} Problems found, empty if all is well.
 */
async function check() {
  try {
    // Throws on a descriptor field in neither KEEP nor DROP.
    buildSpec();
  } catch (error) {
    return [error.message];
  }
  return checkExpressions();
}

const [command] = process.argv.slice(2);

if (command === 'generate') {
  generate();
} else if (command === 'restore') {
  restore();
} else if (command === 'check') {
  const problems = await check();
  if (problems.length > 0) {
    // eslint-disable-next-line no-console
    console.error(
      `src/stylespec.js needs attention:\n\n${problems.map((p) => `  - ${p}`).join('\n')}\n`,
    );
    process.exit(1);
  }
} else {
  // eslint-disable-next-line no-console
  console.error(
    'Usage:\n' +
      '  node tasks/style-spec.js generate\n' +
      '  node tasks/style-spec.js restore\n' +
      '  node tasks/style-spec.js check',
  );
  process.exit(1);
}
