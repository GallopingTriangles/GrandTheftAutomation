var TestingFramework = require('./TestingFramework');
var runTestSuite = TestingFramework;
var SimpleReporter = TestingFramework.SimpleReporter;

var ReporterSpy = require('./ReporterSpy');

const IMPLEMENTATIONS = [
  SimpleReporter,
  ReporterSpy
];

IMPLEMENTATIONS.forEach(function(ReporterImplementation) {
  runTestSuite(function(t) {
    this.getTestSuiteName = function() {
      return ReporterImplementation.name + '_ReporterTest';
    };

    var reporter = new ReporterImplementation();

    this.testDefines_reportTestSuite = function() {
      var reportTestSuite = reporter.reportTestSuite;
      t.assertEqual('function', typeof(reportTestSuite));
      t.assertEqual(1, reportTestSuite.length);
    };

    this.testDefines_reportTest = function () {
	    var reportTest = reporter.reportTest;
	    t.assertEqual('function', typeof(reportTest));
	    t.assertEqual(1, reportTest.length);
	  };
  });
});