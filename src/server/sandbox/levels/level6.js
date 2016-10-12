var vm = require('vm');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');

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
    // == VIRTUAL MACHINE =================================
    var funcColor = 'var setColor = function(input) { testColor = input; };';
    var funcSpeed = 'var setSpeed = function(input) { testSpeed = input; };';
    var funcEnable = 'var enable = function(input) { testEnable.push(input); if (input === "engine") { testEngine = true; }; if (input === "sensor") { testSensor = true; }; if (input === "route") { testRoute = true }; };';
    var funcTurn = 'var turn = function(input) { testTurn.value = input; testTurn.count++ };';
    var funcRoute = 'var setRoute = function(input) { route.directions = input; route.count++ };';

    // input for virtual machine
    var input = funcColor + funcSpeed + funcEnable + funcTurn + funcRoute + userInput;
    var script = new vm.Script(input);

    var sandbox = {
	  	sensor: {
	  		front: false
	  	},
	  	map: {
	      intersection: false
	  	},
	  	route: {
	  		directions: undefined,
	  		count: 0
	  	},
	  	testEnable: [],
	  	testEngine: undefined,
	  	testColor: undefined,
	  	testSpeed: undefined,
	  	testSensor: undefined,
	  	testRoute: undefined,
	  	testRoute: undefined
	  };

	  var context = new vm.createContext(sandbox);
	  script.runInContext(context);

	  var setCaseCount = 1;
	  var setCase = function(caseNo) {
	  	if (setCaseCount === 1) {
	      req.body.phaser.case = caseNo;
	      setCaseCount++;
	  	}
	  };

	  // == ENABLED TESTS == //
	  runTestSuite(function EnabledInputTest(t) {
	  	var enabled = context.testEnable;
	  	this.testEnableCalledThreeTimes = function() {
	  		t.assertTrue(
	  		  enabled.length === 3,
	  		  'Expect enable() to be called 3 times, bug got called ' + enabled.length + ' times',
	  		  function() {
	  		  	setCase(3);
	  		  }
	  		);
	  	};

      this.testEnableCalledWithArgument = function() {
        t.assertTrue(
          enabled[2],
          'Expected enable() to be called with an argument, but got called with ' + enabled[2],
          function() {
            setCase(3);
          }
        );
      };
      
      this.testEnableCalledWithString = function() {
        t.assertTrue(
          typeof enabled[2] === 'string',
          'Expected enable() to be called with an argument of type string, but got called with type ' + typeof enabled[2],
          function() {
            setCase(3);
          }
        );
      };

	  	// test if route is enabled thirdly
	  	this.testRouteEnabledThirdly = function() {
	  	  var enabledThird = '';
	  	  context.testEnable[2] ? enabledThird = context.testEnable[2] : enabledThird = '';
	  	  t.assertTrue(
	  	    enabledThird === 'route',
	  	    'Expected route to be enabled thirdly, but got ' + enabledThird + ' enabled thirdly',
	  	    function() {
	  	      setCase(3); // syntax error, route not enabled. car crashes
	  	    }
	  	  );
	  	};
      // end enabled tests
	  });

	  // == ROUTE TESTS == //
	  runTestSuite(function RouteInputTest(t) {
	  	var route = context.route.directions;
	  	var calls = context.route.count;
	  	// test if the set route function is called
	  	this.testRouteCalled = function() {
        t.assertTrue(
          calls,
          'Expected function setRoute() to be called, but got not called',
          function() {
          	setCase(3);
          }
        );
	  	};

      this.testRouteCalledWithArgument = function() {
        t.assertTrue(
          route,
          'Expected function setRoute() to be called with an argument, but got called with ' + route,
          function() {
            setCase(3);
          }
        );
      };

      // test if the setRoute input is of data type array
      this.testRouteArgumentArray = function() {
        t.assertTrue(
          Array.isArray(route),
          'Expected setRoute() input to be an array, but got ' + typeof route,
          function() {
            setCase(3); // route is not defined, car crashes straight
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
          function() {
          	setCase(3); 
          }
        );
      };

      this.testRouteArrayValueString = function() {
        t.assertTrue(
          typeof arr[0] === 'string',
          'Expected setRoute() input array elements to have type of string',
          function() {
            setCase(3);
          }
        );
      };

      // test if the array element is set to right or left
      this.testRouteArrayFirstValueLeftOrRight = function() {
      	var array = route || [];
        t.assertTrue(
          array[0] === 'left' || array[0] === 'right',
          'Expected setRoute() input array elements to be "left" or "right", but got ' + array[0],
          function() {
          	setCase(3);
          }
        );
      };

      this.testRouteArrayFirstValueLeft = function() {
      	var array = route || [];
        t.assertTrue(
          array[0] === 'left',
          'Expected setRoute() first element of input array to be "left", but got ' + array[0],
          function() {
            if (array[0] === 'right') {
            	setCase(5);
            } else {
            	setCase(3);
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
          function() {
          	if (array[0] === 'left') {
              setCase(4);
          	} else if (array[0] === 'right') {
              setCase(5);
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
          function() {
          	if (array[1] === 'left' && array[2] === 'right') {
          		setCase(6); // EASTER EGG SUCCESS
          	} else if (array[1] === 'left') {
          		setCase(7); // EASTER EGG FAIL
          	} else {
              setCase(4);
          	}
          }
        );
      };

      this.testRouteArraySecondValueLeftOrRight = function() {
      	var array = route || [];
        t.assertTrue(
          array[1] === 'left' || array[1] === 'right',
          'Expected setRoute() input array elements to be "left" or "right", but got ' + array[1],
          function() {
          	setCase(4);
          }
        );
      };

      // test if the it is a success!
      this.testRouteArraySecondValueRight = function() {
      	var array = route || [];
        t.assertTrue(
          array[1] === 'right',
          'Expected setRoute() second element of input array to be "right", but got ' + array[1],
          function() {
            setCase(7);
          }
        );
      };	    

	  });

	});

  next();

};

module.exports = level6;