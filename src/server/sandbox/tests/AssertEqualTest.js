var runTestSuite = require("./TestingFramework");

runTestSuite(function AssertEqualTest(t) {
  
  this.testSuccess = function() {
    t.assertEqual(42, 42);
  };

  this.testSuccess_whenExpectedIsDifferent = function() {
    t.assertEqual(29, 29);
  };

  this.testFailure = function() {
    t.assertThrow('Expected to equal 42, but got: 29', function() {
      t.assertEqual(42, 29);
    });
  };

  this.testFailure_withDifferentExpectedAndActual = function() {
    t.assertThrow('Expected to equal 94, but got: 1027', function() {
      t.assertEqual(94, 1027);
    });
  };
});