module.exports = function ReporterSpy(assertions) {
  var testSuiteName = null;
  var testNames = [];

  this.assertHasReportedTestSuite = function (expectedName) {
	  assertions.assertTrue(
      testSuiteName === expectedName,
      "Expected test suite '" + expectedName + "' to be reported"
	  );
  };

  this.assertHasReportedTest = function (expectedName) {
	  assertions.assertTrue(
      testNames.indexOf(expectedName) >= 0,
      "Expected test '" + expectedName + "' to be reported"
	  );
  };

  this.reportTestSuite = function (name) {
    testSuiteName = name;
  };

  this.reportTest = function (name) {
    testNames.push(name);
  };
};