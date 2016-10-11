var vm = require('vm');

// == USE TESTING FRAMEWORK ===============================
var runTestSuite = require('../TestingFramework');

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
  // route(['left', 'left']);
  //
	// ======================================================

	// == CASES =============================================
	// case 1: success, left turn followed by left turn
	// case 2: fail, invalid engine or speed
	// case 3: fail, drove straight at first intersection
	// case 4: fail, turned left at first intersection but drove straight at second intersection
	// case 5: fail, turned right at first intersection
	// case 6: fail, turned left at first intersection and turned right at second intersection

var level7 = function(req, res, next) {

	// == TESTING USER INPUT LEVEL 7 ========================
	runTestSuite(function UserInputTestLevel7(t) {

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

	  	this.testRouteCalledOnce = function() {
        t.assertTrue(
          calls === 1,
          'Expected function setRoute() to be called once, but got called ' + calls + ' times',
          function() {
          	setCase(2);
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
	  		var array = route || [];
	  		var length = array.length;
	  	  t.assertTrue(
	  	    length !== 0,
	  	    'Expect setRoute() input array to be not empty, but got ' + length + ' input',
	  	    function() {
	  	    	setCase(3); 
	  	    }
	  	  );
	  	};

	  	// test if the array elements are of type string
	  	this.testRouteArrayString = function() {
	  		var array = route || [];
	  	  t.assertOptionsOfTypeString(
	  	    array,
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
          	setCase(6);
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
          array[1] === 'left',
          'Expected setRoute() second element of input array to be "left", but got ' + array[1],
          function() {
            setCase(6);
          }
        );
      };	

	  }); // end route input test

	});

  next();

};

module.exports = level7;