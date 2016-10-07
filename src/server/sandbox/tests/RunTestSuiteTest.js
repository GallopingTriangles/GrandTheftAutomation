var runTestSuite = require('./TestingFramework');
var ReporterSpy = require('./ReporterSpy');

runTestSuite(function RunTestSuiteTest(t) {
	var reporter = new ReporterSpy(t);

	this.testItOutputsNameOfTheTest = function() {
	  runTestSuite(function TestSuiteName(t) {
	    this.testSomeTestName = function() {};
	    this.testSomeOtherTestName = function() {};
	  }, {reporter: reporter});

	  reporter.assertHasReportedTestSuite('TestSuiteName');
	  reporter.assertHasReportedTest('testSomeTestName');
	  reporter.assertHasReportedTest('testSomeOtherTestName');
	};

	this.testItCanHaveCustomNameOfTheTestSuite = function() {
    runTestSuite(function(t) {
      this.getTestSuiteName = function() {
        return 'CustomNameOfTheTestSuite';
      };
    }, {reporter: reporter});

    reporter.assertHasReportedTestSuite('CustomNameOfTheTestSuite');
	}; 
});
