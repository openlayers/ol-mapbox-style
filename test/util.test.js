import should from 'should';
import {wrapText} from '../src/util';

describe('util', function() {

  describe('wrapText()', function() {

    it('should not combine undefined when no next line exists', function() {
      const text = 'Shor T';
      const result = wrapText(text, 'normal 400 12px/1.2 sans-serif', 10, 0);
      should(result).equal(text);
    });

    it('should wrap text', function() {
      const text = 'Longer line of text for wrapping';
      const result = wrapText(text, 'normal 400 12px/1.2 sans-serif', 10, 0);
      result.includes('\n').should.be.true();
    });

    it('should preserve hard breaks', function() {
      const text = 'Großer Sonnleitstein\n1639 m';
      const result = wrapText(text, 'normal 400 12px/1.2 sans-serif', 10, 0);
      should(result).equal('Großer\nSonnleitstein\n1639 m');
    });

    it('should combine lines with less than 30% max width', function() {
      const text = 'Single_Long_Word 30%';
      const result = wrapText(text, 'normal 400 12px/1.2 sans-serif', 10, 0);
      should(result).equal(text);
    });
  });
});
