var runTestSuite = require('./TestingFramework');

runTestSuite(function AssertTrueTest(t) {
  
  this.testSuccess = function() {
    t.assertTrue(true);
  };

  this.testFailure = function() {
    t.assertThrow('Expected to be true, but got false', function() {
      t.assertTrue(false);
    });
  };

  this.testCustomFailureMessage = function() {
  	t.assertThrow('it is not true!', function() {
  		t.assertTrue(false, 'it is not true!');
  	})
  };

  this.testCustomFailureMessage_withOtherMessage = function() {
  	t.assertThrow('should be true', function() {
      t.assertTrue(false, 'should be true');
  	});
  };
});