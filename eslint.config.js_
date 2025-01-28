import openlayers from 'eslint-config-openlayers';

/**
 * @type {Array<import("eslint").Linter.Config>}
 */
export default [
  ...openlayers,
  {
    name: 'test-config',
    files: ['test/**/*'],
    languageOptions: {
      globals: {
        after: 'readonly',
        afterEach: 'readonly',
        afterLoadText: 'readonly',
        before: 'readonly',
        beforeEach: 'readonly',
        createMapDiv: 'readonly',
        defineCustomMapEl: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        disposeMap: 'readonly',
        it: 'readonly',
        render: 'readonly',
        where: 'readonly',
      },
    },
  },
  {
    name: 'examples-config',
    files: ['examples/**/*'],
    rules: {
      'import/no-unresolved': 'off',
    },
  },
];
