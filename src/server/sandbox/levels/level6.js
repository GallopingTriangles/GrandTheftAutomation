var vm = require('vm');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');
// == USE GTA SANDBOX =====================================
var gtaSandbox = require('../gtaSandbox');

var level6 = function(req, res, next) {

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
  // route(['left', 'right']);
  //
	// ======================================================

	// == CASES =============================================
	// case 1: success, left turn followed by right turn
	// case 2: fail, didn't enable engine or speed invalid
	// case 3: fail, drove straight through the first intersection and crashed
	// case 4: fail, turned left at first intersection and drove straight through the second intersection
	// case 5: fail, turned right at first intersection and crashed
	// case 6: success, turned left at the second interstion into the park and then turned right on the path
	// case 7: fail, turned left at the second intersection into the park and then crashed straigt

	// == TESTING USER INPUT LEVEL 6 ========================
	runTestSuite(function UserInputTestLevel6(t) {

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
	  	this.testEnableCalledThreeTimes = function() {
	  		t.assertTrue(
	  		  calls,
	  		  'Expect enable() to be called 3 times, bug got called ' + calls + ' times',
	  		  function(error) {
	  		  	setCase(3, error);
	  		  }
	  		);
	  	};

      this.testEnableCalledWithArgument = function() {
        t.assertTrue(
          enabled[2],
          'Expected enable() to be called with an argument, but got called with ' + enabled[2],
          function(error) {
            setCase(3, error);
          }
        );
      };
      
      this.testEnableCalledWithString = function() {
        t.assertTrue(
          typeof enabled[2] === 'string',
          'Expected enable() to be called with an argument of type string, but got called with type ' + typeof enabled[2],
          function(error) {
            setCase(3, error);
          }
        );
      };

	  	// test if route is enabled thirdly
	  	this.testRouteEnabledThirdly = function() {
	  	  t.assertTrue(
	  	    enabled[2] === 'route',
	  	    'Expected "route" to be enabled thirdly, but got ' + enabled[2] + ' enabled thirdly',
	  	    function(error) {
	  	      setCase(3, error); // syntax error, route not enabled. car crashes
	  	    }
	  	  );
	  	};
      // end enabled tests
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
          	setCase(3, error);
          }
        );
	  	};

      this.testRouteCalledWithArgument = function() {
        t.assertTrue(
          route,
          'Expected function setRoute() to be called with an argument, but got called with ' + route,
          function(error) {
            setCase(3, error);
          }
        );
      };

      // test if the setRoute input is of data type array
      this.testRouteArgumentArray = function() {
        t.assertTrue(
          Array.isArray(route),
          'Expected setRoute() input to be an array, but got ' + typeof route,
          function(error) {
            setCase(3, error); // route is not defined, car crashes straight
          }
        );
      };

      // test if the array is not empty
      var arr = route || [];
      var len = arr.length;
      this.testRouteArrayNotEmpty = function() {
        t.assertTrue(
          len !== 0,
          'Expect setRoute() input array to be not empty, but got ' + len + ' input',
          function(error) {
          	setCase(3, error); 
          }
        );
      };

      this.testRouteArrayValueString = function() {
        t.assertTrue(
          typeof arr[0] === 'string',
          'Expected setRoute() input array elements to have type of string',
          function(error) {
            setCase(3, error);
          }
        );
      };

      // test if the array element is set to right or left
      this.testRouteArrayFirstValueLeftOrRight = function() {
      	var array = route || [];
        t.assertTrue(
          array[0] === 'left' || array[0] === 'right',
          'Expected setRoute() input array elements to be "left" or "right", but got ' + array[0],
          function(error) {
          	setCase(3, error);
          }
        );
      };

      this.testRouteArrayFirstValueLeft = function() {
      	var array = route || [];
        t.assertTrue(
          array[0] === 'left',
          'Expected setRoute() first element of input array to be "left", but got ' + array[0],
          function(error) {
            if (array[0] === 'right') {
            	setCase(5, error);
            } else {
            	setCase(3, error);
            }
          }
        );
      };

      // test if the array consists of one element
      this.testRouteArrayNotOneElement = function() {
      	var array = route || [];
        t.assertTrue(
          array.length !== 1,
          'Expect setRoute() input array to have more than 1 element, but got ' + array.length + ' element',
          function(error) {
          	if (array[0] === 'left') {
              setCase(4, error);
          	} else if (array[0] === 'right') {
              setCase(5, error);
          	}
          }
        );
      };

      // test if the array has two elements [or three elements for EASTER EGG]
      this.testRouteArrayTwoElements = function() { // compare length to 3 for EASTER EGG
        var array = route || [];
        t.assertTrue(
          array.length === 2,
          'Expect setRoute() input array to have length of 2, but got ' + array.length + ' ',
          function(error) {
          	if (array[1] === 'left' && array[2] === 'right') {
          		setCase(6, error); // EASTER EGG SUCCESS
          	} else if (array[1] === 'left') {
          		setCase(7, error); // EASTER EGG FAIL
          	} else {
              setCase(4, error);
          	}
          }
        );
      };

      this.testRouteArraySecondValueLeftOrRight = function() {
      	var array = route || [];
        t.assertTrue(
          array[1] === 'left' || array[1] === 'right',
          'Expected setRoute() input array elements to be "left" or "right", but got ' + array[1],
          function(error) {
          	setCase(4, error);
          }
        );
      };

      // test if the it is a success!
      this.testRouteArraySecondValueRight = function() {
      	var array = route || [];
        t.assertTrue(
          array[1] === 'right',
          'Expected setRoute() second element of input array to be "right", but got ' + array[1],
          function(error) {
            setCase(6, error);
          }
        );
      };	    

	  });

	});

  next();

};

module.exports = level6;