'use strict';

describe('hello_spec', function () {
 it('should add 1+1 correctly', function (done) {
   var onePlusOne = 1 + 2;
   onePlusOne.should.equal(3);
   // must call done() so that mocha know that we are... done.
   // Useful for async tests.
   done();
 });
});
