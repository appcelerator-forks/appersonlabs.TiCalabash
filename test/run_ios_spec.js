'use strict';

describe('test harness should compile before we calabash-ify it', function () {
 it('should add 1+1 correctly', function (done) {
   var onePlusOne = 1 + 1;
   onePlusOne.should.equal(2);
   // must call done() so that mocha know that we are... done.
   // Useful for async tests.
   done();
 });
});

describe('setting up calabash in an Xcode Project', function () {
 it('should run calabash-ios setup on project', function (done) {
   var onePlusOne = 1 + 1;
   onePlusOne.should.equal(2);
   // must call done() so that mocha know that we are... done.
   // Useful for async tests.
   done();
 });
 it('confirm existance of -cal scheme target in xcodeproj', function (done) {
   var onePlusOne = 1 + 1;
   onePlusOne.should.equal(2);
   // must call done() so that mocha know that we are... done.
   // Useful for async tests.
   done();
 });
 it('confirm app compiles when -cal scheme is selected', function (done) {
   var onePlusOne = 1 + 1;
   onePlusOne.should.equal(2);
   // must call done() so that mocha know that we are... done.
   // Useful for async tests.
   done();
 });

});

describe('creating features folder', function () {
 it('should have features folders on tiapp root ', function (done) {
   var onePlusOne = 1 + 1;
   onePlusOne.should.equal(2);
   // must call done() so that mocha know that we are... done.
   // Useful for async tests.
   done();
 });
 it('should have copied tiapproot features folder to build/iphone', function (done) {
   var onePlusOne = 1 + 1;
   onePlusOne.should.equal(2);
   // must call done() so that mocha know that we are... done.
   // Useful for async tests.
   done();
 });
});

describe('calabash running on an simulator', function () {
 it('should run the .features and they should all pass', function (done) {
   var onePlusOne = 1 + 1;
   onePlusOne.should.equal(2);
   // must call done() so that mocha know that we are... done.
   // Useful for async tests.
   done();
 });

});


