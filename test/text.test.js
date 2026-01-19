import should from 'should';
import {getFonts, wrapText} from '../src/text.js';
import {createObserver} from './util.test.js';

describe('text', function () {
  describe('wrapText()', function () {
    it('properly wraps text', function () {
      const text = 'Verylongtext i i longtext short Shor T i i';
      const result = wrapText(text, 'normal 400 12px/1.2 sans-serif', 10, 0);
      should(result).equal('Verylongtext i i\nlongtext short\nShor T i i');
    });

    it('should not produce undefined lines', function () {
      const text = 'Shor T';
      const result = wrapText(text, 'normal 400 12px/1.2 sans-serif', 10, 0);
      should(result).equal(text);
    });

    it('should not combine re-combined lines when last is empty', function () {
      const text = 'i i';
      const result = wrapText(text, 'normal 400 12px/1.2 sans-serif', 10, 0);
      should(result).equal(text);
    });

    it('should wrap text', function () {
      const text = 'Longer line of text for wrapping';
      const result = wrapText(text, 'normal 400 12px/1.2 sans-serif', 10, 0);
      result.includes('\n').should.be.true();
    });

    it('should preserve hard breaks', function () {
      const text = 'Großer Sonnleitstein\n1639 m';
      const result = wrapText(text, 'normal 400 12px/1.2 sans-serif', 10, 0);
      should(result).equal('Großer\nSonnleitstein\n1639 m');
    });

    it('should combine lines with less than 30% max width', function () {
      const text = 'Single_Long_Word 30%';
      const result = wrapText(text, 'normal 400 12px/1.2 sans-serif', 10, 0);
      should(result).equal(text);
    });
  });

  describe('getFonts', function () {
    beforeEach(function () {
      const stylesheets = document.querySelectorAll('link[rel=stylesheet]');
      stylesheets.forEach(function (stylesheet) {
        stylesheet.remove();
      });
      document.fonts.clear();
    });

    it('does not load standard fonts', function () {
      getFonts(['monospace', 'sans-serif']);
      const stylesheets = document.querySelectorAll('link[rel=stylesheet]');
      should(stylesheets.length).eql(0);
    });

    it('loads fonts with a template using {Font+Family} and {fontstyle}', async function () {
      getFonts(
        [
          'Noto Sans Bold',
          'Noto Sans Regular Italic',
          'Averia Sans Libre Bold',
        ],
        'https://fonts.googleapis.com/css?family={Font+Family}:{fontweight}{fontstyle}',
      );
      await createObserver(3);
      let stylesheets = document.querySelectorAll('link[rel=stylesheet]');
      should(stylesheets.length).eql(3);
      should(stylesheets.item(0).href).eql(
        'https://fonts.googleapis.com/css?family=Noto+Sans:700normal',
      );
      should(stylesheets.item(1).href).eql(
        'https://fonts.googleapis.com/css?family=Noto+Sans:400italic',
      );
      should(stylesheets.item(2).href).eql(
        'https://fonts.googleapis.com/css?family=Averia+Sans+Libre:700normal',
      );

      // Does not load the same font twice
      getFonts(
        ['Noto Sans Bold'],
        'https://fonts.googleapis.com/css?family={Font+Family}:{fontweight}{fontstyle}',
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      stylesheets = document.querySelectorAll('link[rel=stylesheet]');
      should(stylesheets.length).eql(3);
    });

    it('loads fonts with a template using {font-family} and {-fontstyle}', async function () {
      getFonts(
        ['Noto Sans Regular', 'Averia Sans Libre Bold Italic'],
        './fonts/{font-family}/{fontweight}{-fontstyle}.css',
      );
      await createObserver(2);
      const stylesheets = document.querySelectorAll('link[rel=stylesheet]');
      should(stylesheets.length).eql(2);
      should(stylesheets.item(0).href).eql(
        location.origin + '/fonts/noto-sans/400.css',
      );
      should(stylesheets.item(1).href).eql(
        location.origin + '/fonts/averia-sans-libre/700-italic.css',
      );
    });

    it('uses the default template if none is provided', async function () {
      getFonts(['Averia Sans Libre']);
      await createObserver(1);
      const stylesheets = document.querySelectorAll('link[rel=stylesheet]');
      should(stylesheets.length).eql(1);
      should(stylesheets.item(0).href).eql(
        'https://cdn.jsdelivr.net/npm/@fontsource/averia-sans-libre/400.css',
      );
    });

    it('skip font loading when the loaded fonts fit the weight range', async function () {
      // Mock a font with a weight range
      const mockFont = {
        family: 'Custom Font',
        weight: '400 700', // Variable font with weight range
        style: 'normal',
      };

      // Mock document.fonts.load to return the font with weight range
      const originalLoad = document.fonts.load;
      document.fonts.load = async function () {
        return [mockFont];
      };

      try {
        // Request a font with weight 500, which falls within the 400-700 range
        getFonts(['Custom Font Medium']);

        // Wait a bit for the async operation to complete
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Verify no stylesheet was added because the font already exists with compatible weight range
        const stylesheets = document.querySelectorAll('link[rel=stylesheet]');
        should(stylesheets.length).eql(0);
      } finally {
        // Restore original function
        document.fonts.load = originalLoad;
      }
    });
  });
});
