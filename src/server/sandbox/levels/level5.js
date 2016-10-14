var vm = require('vm');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');
// == USE GTA SANDBOX =====================================
var gtaSandbox = require('../gtaSandbox');

var level5 = function(req, res, next) {

	// == EXPECTED USER INPUT ===============================
	// 
	// enable('engine');
	//
	// setColor('white / black / red / blue');
  // 
  // setSpeed(100);
  //
  // enable('sensor');
  //
  // enable('route');
  // 
  // route(['left']) |or| route(['right'])
  //
	// ======================================================

	// == CASES =============================================
	// case 1: success, left turn
	// case 2: fail, engine not on or speed 0
	// case 3: success, right turn
	// case 4: fail, crashed going straight
  // case 5: fail, right turn

	// == TESTING USER INPUT LEVEL 5 ========================
	runTestSuite(function UserInputTestLevel5(t) {
  // USER INPUT
  var userInput = req.body.log;
  // == NEW GTA SANDBOX == //
  var context = new gtaSandbox().create(userInput);

  var setCaseCount = 1;
  var setCase = function(caseNo, errorMessage) {
  	if (setCaseCount === 1) {
      req.body.phaser.case = caseNo;
      req.body.bugs.push(errorMessage);
      setCaseCount++;
  	}
  };

  // == ENABLED TESTS == //
  runTestSuite(function EnabledInputTest(t) {
  	var enabled = context.testEnabled.values;
    var calls = context.testEnabled.calls;
  	// test if enabled function has expected behaviour
    this.testEnabledCalledThreeTimes = function() {
      t.assertTrue(
        calls === 3,
        'Expect enable() to be called three times, but got called ' + calls + ' times',
        function(error) {
        	setCase(4, error); 
        }
      );
    };

    this.testEnableCalledWithArgument = function() {
      t.assertTrue(
        enabled[2] !== undefined,
        'Expected enable() to be called with an argument, but got called with ' + enabled[2],
        function(error) {
          setCase(4, error);
        }
      );
    };

    // test if all the input is of data type string
    this.testEnableInputType = function() {
    	t.assertOptionsOfTypeString(
        enabled,
        function(error) {
        	setCase(4, error); // input error of lastly added item, car crashes
        }
    	);
    };

    // test if route is enabled thirdly
    this.testRouteEnabledThirdly = function() {
      var enabledThird = '';
      enabled[2] ? enabledThird = enabled[2] : enabledThird = '';
      t.assertTrue(
        enabledThird === 'route',
        'Expected "route" to be enabled thirdly, but got ' + enabled + ' enabled thirdly',
        function(error) {
          setCase(4, error); // syntax error, route not enabled. car crashes
        }
      );
    }
  });

  // == ROUTE TESTS == //
  runTestSuite(function RouteInputTest(t) {
  	var route = context.testSetRoute.value;
  	var calls = context.testSetRoute.calls;
    // test if the set route function is called
    this.testRouteCalled = function() {
      t.assertTrue(
        calls,
        'Expected function setRoute() to be called, but got not called',
        function(error) {
        	setCase(4, error); // no route is created, car crashes straight
        }
      );
    };

    this.testRouteCalledWithArgument = function() {
      t.assertTrue(
        route,
        'Expected function setRoute() to be called with an argument, but got called with ' + route,
        function(error) {
          setCase(4, error);
        }
      );
    };

    // test if the setRoute input is of data type array
    this.testRouteArray = function() {
      t.assertTrue(
        Array.isArray(route),
        'Expected setRoute() input to be an array, but got ' + typeof route,
        function(error) {
          setCase(4, error); // route is not defined, car crashes straight
        }
      );
    };

    var el;
    var len = 0;
    if (route) {
      el = route[0];
      len = route.length;
    }
    this.testRouteArrayElementString = function() {
      t.assertTrue(
        typeof el === 'string',
        'Expect setRoute() input array elements to be of type string, but got ' + typeof el,
        function(error) {
          setCase(4, error);
        }
      );
    };

    // test if the array consists of one element
    this.testRouteArrayOneElement = function() {
      t.assertTrue(
        len === 1,
        'Expect setRoute() input array to have one element, but got ' + len + ' element(s)',
        function(error) {
        	setCase(4, error); // NOT SURE WHAT TO DO IN THIS CASE
        }
      );
    };

    this.testRouteArrayValueLeftOrRight = function() {
      t.assertTrue(
        el === 'left' || el === 'right',
        'Expected setRoute() input array to have elements of value "left" or "right", but got ' + el,
        function(error) {
          setCase(4, error);
        }
      );
    };

    this.testRouteArrayValueLeft = function() {
      t.assertTrue(
        el === 'left',
        'Expected setRoute() input array element to have value "left", but got ' + el,
        function(error) {
          if (el === 'right') {
            setCase(5, error); // ADD THIS FAIL CASE TO PHASER, RIGHT TURN....
          } else {
            setCase(4, error);
          }
        }
      );
    };
  });

	});

	next();

};

module.exports = level5;
