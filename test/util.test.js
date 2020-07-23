import should from 'should';
import {wrapText} from '../src/util';

describe('util', function() {

  describe('wrapText()', function() {

    it('properly wraps text', function() {
      const text = 'Verylongtext i i longtext short Shor T i i';
      const result = wrapText(text, 'normal 400 12px/1.2 sans-serif', 10, 0);
      should(result).equal('Verylongtext i i\nlongtext short\nShor T i i');
    });

    it('should not produce undefined lines', function() {
      const text = 'Shor T';
      const result = wrapText(text, 'normal 400 12px/1.2 sans-serif', 10, 0);
      should(result).equal(text);
    });

    it('should not combine re-combined lines when last is empty', function() {
      const text = 'i i';
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
