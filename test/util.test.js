import should from 'should';
import {wrapText} from '../src/util';

describe('util', function() {

  describe('wrapText()', function() {

    it('should not combine undefined when no next line exists', function() {
      const text = 'Shor T';
      const result = wrapText(text, 'normal 600 12px/1.2 "Open Sans"', 10, 0);
      should(result).equal(text);
    });

    it('should wrap text', function() {
      const text = 'Longer line of text for wrapping';
      const result = wrapText(text, 'normal 600 12px/1.2 "Open Sans"', 10, 0);
      result.includes('\n').should.be.true();
    });
  });
});
