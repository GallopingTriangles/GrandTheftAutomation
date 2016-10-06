var runTestSuite = require('./TestingFramework');
var ReporterSpy = require("./ReporterSpy");

runTestSuite(function ReporterSpy_BehaviorTest(t) {
  var reporter = new ReporterSpy(t);

  this.testAssertHasReportedTestSuite_whenFailing = function () {
    t.assertThrow("Expected test suite 'HelloWorld' to be reported", function () {
      reporter.assertHasReportedTestSuite("HelloWorld");
    });
  };

  this.testAssertHasReportedTestSuite_whenFailing_withOtherName = function () {
    t.assertThrow("Expected test suite 'OtherTestSuite' to be reported", function () {
      reporter.assertHasReportedTestSuite("OtherTestSuite");
    });
  };

  this.testAssertHasReportedTestSuite_whenSucceeding = function () {
    t.assertNotThrow(function () {
      reporter.reportTestSuite("HelloWorld");
      reporter.assertHasReportedTestSuite("HelloWorld");
    });
  };

  this.testAssertHasReportedTestSuite_whenReporting_andFailing = function () {
    t.assertThrow("Expected test suite 'HelloWorld' to be reported", function () {
      reporter.reportTestSuite("OtherTestSuite");
      reporter.assertHasReportedTestSuite("HelloWorld");
    });
  };

  this.testAssertHasReportedTestSuite_whenReporting_andFailingWithDifferentName = function () {
    t.assertThrow("Expected test suite 'OtherTestSuite' to be reported", function () {
      reporter.reportTestSuite("HelloWorld");
      reporter.assertHasReportedTestSuite("OtherTestSuite");
    });
  };
    
  this.testAssertHasReportedTest_whenFailing = function () {
    t.assertThrow("Expected test 'testName' to be reported", function () {
      reporter.assertHasReportedTest("testName");
    });
  };

  this.testAssertHasReportedTest_whenFailing_withDifferentName = function () {
    t.assertThrow("Expected test 'testDifferentName' to be reported", function () {
      reporter.assertHasReportedTest("testDifferentName");
    });
  };

  this.testAssertHasReportedTest_whenSucceeding = function () {
    t.assertNotThrow(function () {
      reporter.reportTest("testName");
      reporter.assertHasReportedTest("testName");
    });
  };

  this.testAssertHasReportedTest_whenReporting_andFailing = function () {
    t.assertThrow("Expected test 'testName' to be reported", function () {
      reporter.reportTest("testOtherName");
      reporter.assertHasReportedTest("testName");
    });
  };

  this.testAssertHasReportedTest_whenReporting_andFailing_withOtherName = function () {
    t.assertThrow("Expected test 'testDifferentName' to be reported", function () {
      reporter.reportTest("testName");
      reporter.assertHasReportedTest("testDifferentName");
    });
  };

  this.testAssertHasReportedTest_whenSucceeding_withMultipleReports = function () {
    t.assertNotThrow(function () {
      reporter.reportTest("testName");
      reporter.reportTest("testOtherName");
      reporter.assertHasReportedTest("testName");
    });
  };
});