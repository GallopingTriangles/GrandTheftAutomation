var runTestSuite = require('./TestingFramework');

runTestSuite(function StatelessTest(t) {
  var answer = 41;

  this.testItCanMutateVariable_andImmediatelyUseNewValue = function() {
    answer++;
    t.assertEqual(42, answer);
  }; 

  this.testItCanMutateVariableAgain_andGetTheSameResult = function() {
    answer++;
    t.assertEqual(42, answer);
  };
});