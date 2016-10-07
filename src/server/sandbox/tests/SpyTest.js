var runTestSuite = require('./TestingFramework');

runTestSuite(function SpyTest(t) {
  
  this.testIsNotCalledInitially = function() {
    t.spy().assertNotCalled();
  };

  this.testItCanBeCalledAsFunction = function() {
    t.spy()();
  };

  this.testIsCalledAfterBeingCalled = function() {
    var aSpy = t.spy();
    aSpy();
    aSpy.assertCalled();
  };

  this.testAssertNotCalledFailsWhenWasCalled = function() {
    var aSpy = t.spy();
    aSpy();
    t.assertThrow('Expected not to be called', function() {
      aSpy.assertNotCalled();
    });
  };

  this.testAssertCalledFailsWhenWasNotCalled = function () {
    t.assertThrow('Expected to be called', function () {
      t.spy().assertCalled();
    });
  };
});