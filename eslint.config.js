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
    name: 'shared-config',
    files: ['**/*'],
    rules: {
      'jsdoc/reject-any-type': 'off',
    },
  },
];
