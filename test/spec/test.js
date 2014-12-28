/* global describe, it */

(function () {
  'use strict';

  describe('Give it some context', function () {
    describe('maybe a bit more context here', function () {
      it('can test using mocha', function () {
        assert.equal(true, true);
      });
      it('should is installed also', function () {
        true.should.eql(true);

      });
    });
  });
})();
