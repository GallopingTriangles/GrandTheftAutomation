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

	  	this.testEnableInputType = function() {
        t.assertOptionsOfTypeString(
          enabled,
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

	  	// test is setRoute function has input
	    this.testRouteDefined = function() {
	      t.assertTrue(
	        route,
	        'Expected route to be defined, but got ' + route,
	        function() {
	        	setCase(3); // no route defined, car crashes straigt
	        }
	      );
	    };

      // test if the setRoute input is of data type array
      this.testRouteArray = function() {
        t.assertTrue(
          Array.isArray(route),
          'Expected setRoute() input to be an array, but got ' + typeof route,
          function() {
            setCase(3); // route is not defined, car crashes straight
          }
        );
      };

      // test if the array is not empty
      this.testRouteArrayNotEmpty = function() {
        t.assertTrue(
          route.length !== 0,
          'Expect setRoute() input array to be not empty, but got ' + route.length + ' input',
          function() {
          	setCase(3); // NO
          }
        );
      };

      // test if the array elements are of type string
      this.testRouteArrayString = function() {
        t.assertOptionsOfTypeString(
          route,
          function() {
          	setCase(3);
          }
        );
      };

      // test if the array element is set to right or left
      this.testRouteArrayValue = function() {
        t.assertTrue(
          route[0] === 'left' || route[0] === 'right',
          'Expected setRoute() input array elements to be "left" or "right", but got ' + route[0],
          function() {
          	setCase(3);
          }
        );
      };

      // test if the array consists of one element
      this.testRouteArrayNotOneElement = function() {
        t.assertTrue(
          route.length !== 1,
          'Expect setRoute() input array to have more than 1 element, but got ' + route.length + ' element(s)',
          function() {
          	if (route[0] === 'left') {
              setCase(4);
          	} else if (route[0] === 'right') {
              setCase(5);
          	}
          }
        );
      };

      this.testRouteArrayTwoOrThreeElements = function() {

      };	    

	  });

	});

  next();

};

module.exports = level6;