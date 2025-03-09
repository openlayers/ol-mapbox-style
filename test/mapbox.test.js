import should from 'should';
import {
  getMapboxPath,
  normalizeSourceUrl,
  normalizeSpriteDefinition,
  normalizeSpriteUrl,
  normalizeStyleUrl,
} from '../src/mapbox.js';

describe('Mapbox utilities', function () {
  describe('getMapboxPath()', () => {
    const cases = [
      {
        url: 'mapbox://path/to/resource',
        expected: 'path/to/resource',
      },
      {
        url: 'mapbox://path/to/resource?query',
        expected: 'path/to/resource?query',
      },
      {
        url: 'https://example.com/resource',
        expected: '',
      },
    ];

    for (const c of cases) {
      it(`works for ${c.url}`, () => {
        should(getMapboxPath(c.url)).equal(c.expected);
      });
    }
  });

  describe('normalizeStyleUrl()', () => {
    const cases = [
      {
        url: 'mapbox://styles/mapbox/bright-v9',
        expected:
          'https://api.mapbox.com/styles/v1/mapbox/bright-v9?&access_token=test-token',
      },
      {
        url: 'https://example.com/style',
        expected: 'https://example.com/style',
      },
    ];

    const token = 'test-token';
    for (const c of cases) {
      it(`works for ${c.url}`, () => {
        should(normalizeStyleUrl(c.url, token)).equal(c.expected);
      });
    }
  });

  describe('normalizeSpriteUrl()', () => {
    const cases = [
      {
        url: 'mapbox://sprites/mapbox/bright-v9',
        expected:
          'https://api.mapbox.com/styles/v1/mapbox/bright-v9/sprite?access_token=test-token',
      },
      {
        url: 'https://example.com/sprite',
        expected: 'https://example.com/sprite',
      },
      {
        url: '../sprite',
        expected: 'https://example.com:8000/sprite',
      },
      {
        url: '/sprite',
        expected: 'https://example.com:8000/sprite',
      },
      {
        url: './sprite',
        expected: 'https://example.com:8000/mystyle/sprite',
      },
    ];

    const token = 'test-token';
    for (const c of cases) {
      it(`works for ${c.url}`, () => {
        should(
          normalizeSpriteUrl(
            c.url,
            token,
            'https://example.com:8000/mystyle/style.json',
          ),
        ).equal(c.expected);
      });
    }
  });

  describe('normalizeSpriteDefinition()', () => {
    const cases = [
      {
        sprite: 'mapbox://sprites/mapbox/bright-v9',
        expected: [
          {
            id: 'default',
            url: 'https://api.mapbox.com/styles/v1/mapbox/bright-v9/sprite?access_token=test-token',
          },
        ],
      },
      {
        sprite: [
          {
            id: 'base',
            url: 'mapbox://sprites/mapbox/bright-v9',
          },
        ],
        expected: [
          {
            id: 'base',
            url: 'https://api.mapbox.com/styles/v1/mapbox/bright-v9/sprite?access_token=test-token',
          },
        ],
      },
      {
        sprite: [
          {
            id: 'example',
            url: 'https://example.com/sprite',
          },
          {
            id: 'local',
            url: '../sprite',
          },
        ],
        expected: [
          {
            id: 'example',
            url: 'https://example.com/sprite',
          },
          {
            id: 'local',
            url: 'https://example.com:8000/sprite',
          },
        ],
      },
    ];

    const token = 'test-token';
    for (const c of cases) {
      it(`works for ${c.sprite}`, () => {
        should(
          normalizeSpriteDefinition(
            c.sprite,
            token,
            'https://example.com:8000/mystyle/style.json',
          ),
        ).deepEqual(c.expected);
      });
    }
  });

  describe('normalizeSourceUrl()', () => {
    const cases = [
      {
        url: 'mapbox://mapbox.mapbox-streets-v7',
        expected: [
          'https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/{z}/{x}/{y}.vector.pbf?access_token=test-token',
          'https://b.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/{z}/{x}/{y}.vector.pbf?access_token=test-token',
          'https://c.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/{z}/{x}/{y}.vector.pbf?access_token=test-token',
          'https://d.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/{z}/{x}/{y}.vector.pbf?access_token=test-token',
        ],
      },
      {
        url: 'https://example.com/source/{z}/{x}/{y}.pbf',
        expected: [
          'https://example.com/source/{z}/{x}/{y}.pbf?token=test-token',
        ],
      },
      {
        url: 'https://example.com/source/{z}/{x}/{y}.pbf?foo=bar',
        expected: [
          'https://example.com/source/{z}/{x}/{y}.pbf?foo=bar&token=test-token',
        ],
      },
      {
        url: [
          'https://example.com/source/{z}/{x}/{y}.pbf?token=override-token',
        ],
        expected: [
          'https://example.com/source/{z}/{x}/{y}.pbf?token=override-token',
        ],
      },
    ];

    const token = 'test-token';
    const tokenParam = 'token';
    for (const c of cases) {
      it(`works for ${c.url}`, () => {
        should(
          normalizeSourceUrl(c.url, token, tokenParam, location.href),
        ).deepEqual(c.expected);
      });
    }
  });
});
