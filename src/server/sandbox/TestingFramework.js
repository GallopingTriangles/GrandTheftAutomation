// TESTING FRAMEWORK
var assertions = {
	// check if condition is true
  assertTrue: function(condition, message, failCb) {
  	var errorMessage = 'Expected to be true, but got false';
  	if (message) {
  		errorMessage = message;
  	}
  	if (!condition) {
      console.log('ERROR:', errorMessage);
      if (failCb) {
	      failCb(errorMessage);
      }
  	}
  },
  
  // check if input is present/defined
  assertDefined: function(variable, name, failCb) {
  	var failCb = failCb || function() {};
    this.assertTrue(
      variable !== undefined,
      'Expected variable "' + name + '" to be defined, but got undefined',
      failCb
    );
  },

  // check if actual input equals expected input
  assertEqual: function(expected, actual) {
		this.assertTrue(
			expected === actual, 
			'Expected to equal ' + expected + ', but got: ' + actual
		);
	},

  // check if the actual input equals one of the options
	assertOptions: function(options, actual) {
    this.assertTrue(
      options.indexOf(actual) >= 0,
      'Expected to equal ' + options + ', but got: ' + actual
    );
	},

  // check if variable is equal to expected type
  assertType: function(variable, type, name) {
    this.assertTrue(
      typeof variable === type,
      'Expected variable ' + name + ' to be ' + type + ', but got: ' + typeof variable
    );
  },

  // check if variable type is equal to BOOLEAN
  assertBoolean: function(variable, name) {
    this.assertType(variable, 'boolean', name);
  },

  // check if variable type is equal to STRING
  assertString: function(variable, name) {
    this.assertType(variable, 'string', name);
  },

  // check if variable type is equal to NUMBER
  assertNumber: function(variable, name) {
    this.assertType(variable, 'number', name);
  },

	assertThrow: function(expectedMessage, action) {
		var hasThrown = false;
		try {
			action();
		} catch (error) {
			hasThrown = true;
			this.assertEqual(expectedMessage, error.message);
		}
		this.assertTrue(hasThrown, 'Expected to throw an error, but nothing was thrown');
	},

	assertNotThrow: function (action) {
	  try {
	    action();
	  } catch (error) {
	    throw new Error('Expected not to throw error, but thrown "' + error.message + '"');
	  }
	},

	spy: function() {
		var that = function() {
			that.called = true;
		};
		that.assertNotCalled = function() {
			assertions.assertTrue(!that.called, 'Expected not to be called');
		};
		that.assertCalled = function() {
      assertions.assertTrue(that.called, 'Expected to be called');
		};
		return that;
	}
};

function SimpleReporter() {
	this.reportTestSuite = function(name) {
	  process.stdout.write('\n' + name + '\n');
	};
	this.reportTest = function(name) {
	  process.stdout.write('\t' + name + '\n');
	};
};

var getTestSuiteName = function(testSuiteConstructor, testSuitePrototype) {
  if (typeof(testSuitePrototype.getTestSuiteName) !== 'function') {
  	return testSuiteConstructor.name;
  }
  return testSuitePrototype.getTestSuiteName();
};

var createTestSuite = function(testSuiteConstructor) {
  return new testSuiteConstructor(assertions);
};

var runTestSuite = function(testSuiteConstructor, options) {
	var options = options || {};
	var reporter = options.reporter || new SimpleReporter();

  var testSuitePrototype = createTestSuite(testSuiteConstructor);

  reporter.reportTestSuite(
    getTestSuiteName(testSuiteConstructor, testSuitePrototype)
  );
  
  for (var testName in testSuitePrototype) {
  	if (testName.match(/^test/)) {
  		reporter.reportTest(testName);
  		var testSuite = createTestSuite(testSuiteConstructor);
  		testSuite[testName]();
  	}
  }
};

module.exports = runTestSuite;
module.exports.SimpleReporter = SimpleReporter;