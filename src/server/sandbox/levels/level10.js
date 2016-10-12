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
  // enable('gps');
  //
  // WRITE MORE STUFF HERE
  //
	// ======================================================

	// == CASES =============================================
	// case 1: success,
	// case 2: fail, invalid engine or speed
  // case: 9 // fail: [STRAIGHT, LEFT, STRAIGHT, LEFT]
  // case: 3 // fail: [STRAIGHT, LEFT, STRAIGHT, STRAIGHT]
  // case: 4 // fail: [STRAIGHT, LEFT, RIGHT]
  // case: 5 // fail: [STRAIGHT, STRAIGHT]
  // case: 6 // fail: [STRAIGHT, RIGHT]
  // case: 7 // fail: [LEFT, LEFT]
  // case: 8 // fail: [RIGHT]
  // case: 2 // fail: USER DID NOT ENABLE THE ENGINE

var level10 = function(req, res, next) {

  runTestSuite(function UserInputTestLevel10(t) {
    // USER INPUT
		var userInput = req.body.log;
	  // == VIRTUAL MACHINE =================================
	  var funcColor = 'var setColor = function(input) { testColor = input; };';
	  var funcSpeed = 'var setSpeed = function(input) { testSpeed = input; };';
	  var funcEnable = 'var enable = function(input) { testEnabled.values.push(input); testEnabled.count++; if (input === "engine") { testEngine = true; }; if (input === "sensor") { testSensor = true; }; if (input === "gps") { testGps = true }; };';
	  var funcTurn = 'var turn = function(input) { testTurn.value = input; testTurn.count++ };';
	  var funcRoute = 'var setRoute = function(input) { route.directions = input; route.count++ };';
    var reroute = 'gps.reroute = function() { testReroute++; };';

	  // input for virtual machine
	  var input = funcColor + funcSpeed + funcEnable + funcTurn + funcRoute + reroute + userInput;
	  var script = new vm.Script(input);

    var Sandbox = function() {
      this.sandbox = {
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
		  	testEnabled: {
          values: [],
          count: 0
        },
        testEngine: undefined,
        testColor: undefined,
        testSpeed: undefined,
        testSensor: undefined,
        testRoute: undefined,
        testRoute: undefined,
        testTurn: {
        	value: undefined,
        	count: 0
        },
        testGps: undefined,
        testReroute: 0,
        gps: {
          intersection: false
        }
        };
      };

      var setCaseCount = 1;
      var setCase = function(caseNo) {
      if (setCaseCount === 1) {
       req.body.phaser.case = caseNo;
       setCaseCount++;
      }
    };

    // == ENABLED TESTS == //
    runTestSuite(function EnabledGpsInputTest(t) {
      // create new sandbox
      var sb = new Sandbox().sandbox;
      // create new virtual machine
      var context = new vm.createContext(sb);
      script.runInContext(context);

      //console.log(context);

      var enabled = context.testEnabled.values;
      var calls = context.testEnabled.count;

      this.testEnabledCalledThreeTimes = function() {
        t.assertTrue(
          calls === 3,
          'Expected function enabled() to be called 3 times, but got called ' + calls + ' time(s)',
          function() {
           setCase(4);
          }
        );
      };

      this.testEnabledCalledWithArgument = function() {
        t.assertTrue(
          enabled[2],
          'Expected function enabled() to be called with an argument, but got ' + enabled[2],
          function() {
            setCase(4);
          }
        );
      };

      this.testEnabledInputTypeString = function() {
        t.assertTrue(
          typeof enabled[2] === 'string',
          'Expected function enabled() to be called with an argument of type string, but got called with type ' + typeof enabled[2],
          function() {
           setCase(4);
          }
        );
      };

      this.testEnabledInputValueGps = function() {
        t.assertTrue(
          enabled[2] === 'gps',
          'Expected function enabled() to be called with argument "gps", but got called with ' + enabled[2],
          function() {
           setCase(4);
          }
        );
      };
      });

      runTestSuite(function ConditionalTest(t) {
      var sb = new Sandbox().sandbox;
      var context = new vm.createContext(sb);
      script.runInContext(context);

      var calls = context.testTurn.count;

      this.testTurnNotCalledOutsideConditional = function() {
       t.assertTrue(
         calls === 0,
         'Expected function turn() not to be called outside if statement, but got called ' + calls + ' time(s)',
         function() {
         	setCase(2);
         }
       );
      };

      this.testConditionalPresence = function() {
       t.assertTrue(
         userInput.indexOf('if') !== -1,
         'Expected code to have an if statement, example: "if (gps.intersection) { do something... }"',
         function() {
         	setCase(3);
         }
       );
      };

      this.testConditionalLeftOrRightorStraightPresence = function() {
      	t.assertTrue(
         userInput.indexOf("gps.intersection === 'left'") !== -1 || userInput.indexOf("gps.intersection === 'right'") !== -1 ||
         userInput.indexOf("gps.intersection === 'straight'"),
         'Expect code to have an if statement with conditional: if (gps.intersection === "left") {.. or if (gps.intersection === "right") {.. or if (gps.intersection === "straight") {..',
         function() {
           // ADD FAIL CALLBACK
         }
      	);
      };

      this.testThreeConditionalsPresent = function() {
       var input = userInput;
       var count = 0;
       var pos = input.indexOf('if');
       while (pos !== -1) {
       	count++;
       	pos = input.indexOf('if', pos + 1);
       }
       t.assertTrue(
         count >= 3,
         'Expected code to have three if statements, but got ' + count + ' if statement(s)',
         function() {
         	// ADD FAIL CALLBACK
         }
       );
      };
     });

      // == ENABLED TESTS == //
     runTestSuite(function EnabledGpsInputTest(t) {
       // create new sandbox
       var sb = new Sandbox().sandbox;
       // create new virtual machine
       var context = new vm.createContext(sb);
       script.runInContext(context);

        var enabled = context.testEnabled.values;
        var calls = context.testEnabled.count;

        this.testEnabledCalledThreeTimes = function() {
          t.assertTrue(
            calls === 3,
            'Expected function enabled() to be called 3 times, but got called ' + calls + ' time(s)',
            function() {
             setCase(4);
            }
          );
        };

      this.testConditionalLeftPresence = function() {
      	t.assertTrue(
         userInput.indexOf("gps.intersection === 'left'") !== -1,
         'Expect code to have an if statement with conditinal: if (gps.intersection === "left") {..',
         function() {
           // ADD FAIL CALLBACK
         }
      	);
      };

      this.testConditionalRightPresence = function() {
      	t.assertTrue(
         userInput.indexOf("gps.intersection === 'right'") !== -1,
         'Expect code to have an if statement with conditinal: (gps.intersection === "right") {..',
         function() {
           // ADD FAIL CALLBACK
         }
      	);
      };

      this.testConditionalStraightPresence = function() {
      	t.assertTrue(
         userInput.indexOf("gps.intersection === 'straight'") !== -1,
         'Expect code to have an if statement with conditinal: (gps.intersection === "straight") {..',
         function() {
           // ADD FAIL CALLBACK
         }
      	);
      };

       var calls = context.testTurn.count;

       this.testTurnNotCalledOutsideConditional = function() {
         t.assertTrue(
           calls === 0,
           'Expected function turn() not to be called outside if statement, but got called ' + calls + ' time(s)',
           function() {
           	setCase(2);
           }
         );
       };

       this.testConditionalPresence = function() {
         t.assertTrue(
           userInput.indexOf('if') !== -1,
           'Expected code to have an if statement, example: "if (gps.intersection) { do something... }"',
           function() {
           	setCase(5);
           }
         );
       };

       this.testConditionalLeftRightStraightPresence = function() {
       	t.assertTrue(
           userInput.indexOf("gps.intersection === 'left'") !== -1 || userInput.indexOf("gps.intersection === 'right'") !== -1 || userInput.indexOf("gps.intersection === 'straight'") !== -1,
           'Expect code to have an if statement with conditional: if (gps.intersection === "left") {.. or if (gps.intersection === "right") {..',
           function() {
             setCase(5);
           }
       	);
       };

       this.testThreeConditionalsPresent = function() {
         var input = userInput;
         var count = 0;
         var pos = input.indexOf('if');
         while (pos !== -1) {
         	count++;
         	pos = input.indexOf('if', pos + 1);
         }
         t.assertTrue(
           count >= 3,
           'Expected code to have three if statements, but got ' + count + ' if statement(s)',
           function() {
             setCase(5);
           }
         );
       };

       this.testConditionalStraightPresence = function() {
        t.assertTrue(
           userInput.indexOf("gps.intersection === 'straight'") !== -1,
           'Expect code to have an if statement with conditinal: (gps.intersection === "straight") {..',
           function() {
             setCase(5);
           }
        );
       };

       this.testConditionalLeftPresence = function() {
       	t.assertTrue(
           userInput.indexOf("gps.intersection === 'left'") !== -1,
           'Expect code to have an if statement with conditinal: if (gps.intersection === "left") {..',
           function() {
             setCase(5);
           }
       	);
       };

       this.testConditionalRightPresence = function() {
       	t.assertTrue(
           userInput.indexOf("gps.intersection === 'right'") !== -1,
           'Expect code to have an if statement with conditinal: (gps.intersection === "right") {..',
           function() {
             setCase(5);
           }
       	);
       };
 	  });

    // == CONDITIONAL LEFT TESTS == //
	  runTestSuite(function GpsIntersectionLeftTest(t) {
	  	var sb = new Sandbox().sandbox;
      sb.gps.intersection = 'left';

      var context = new vm.createContext(sb);
      script.runInContext(context);

      var turn = context.testTurn.value;
      var calls = context.testTurn.count;

      this.testTurnCalled = function() {
        t.assertTrue(
          calls,
          'Expected function turn() to be called in if statement, but got ' + calls + ' calls',
          function() {
          	// ADD FAIL CALLBACK
          }
        );
      };

      this.testTurnCalledOnce = function() {
        t.assertTrue(
          calls === 1,
          'Expected function turn() to be called once in if statement, but got ' + calls + ' calls',
          function() {
          	// ADD FAIL CALLBACK
          }
        );
      };

      this.testTurnCalledWithArgument = function() {
        t.assertTrue(
          turn,
          'Expected function turn() to be called with an argument, but got ' + turn,
          function() {
            // ADD FAIL CALLBACK
          }
        );
      };

      this.testTurnInputString = function() {
      	t.assertTrue(
          typeof turn === 'string',
          'Expected function turn() argument to be of type string, but got type of ' + typeof turn,
          function() {
          	// ADD FAIL CALLBACK
          }
      	);
      };

      this.testTurnInputValue = function() {
        t.assertTrue(
          turn === 'left' || turn === 'right' || turn === 'straight',
          'Expected function turn() argument to have value "left" or "right" or "straight", but got value ' + turn,
          function() {
          	// ADD FAIL CALLBACK
          }
        );
      };

      this.testTurnInputValueLeft = function() {
        t.assertTrue(
          turn === 'left',
          'Expected function turn() argument to have value "left", but got value ' + turn,
          function() {
          	// ADD FAIL CALLBACK
          }
        );
      };
	  });

    // == CONDITIONAL RIGHT TESTS == //
	  runTestSuite(function GpsIntersectionRightTest(t) {
	  	var sb = new Sandbox().sandbox;
      sb.gps.intersection = 'right';

      var context = new vm.createContext(sb);
      script.runInContext(context);

      var turn = context.testTurn.value;
      var calls = context.testTurn.count;

      this.testTurnCalled = function() {
        t.assertTrue(
          calls,
          'Extected function turn() to be called in if statement, but got ' + calls + ' calls',
          function() {
          	// ADD FAIL CALLBACK
          }
        );
      };

      this.testTurnCalledOnce = function() {
        t.assertTrue(
          calls === 1,
          'Expected function turn() to be called once in if statement, but got ' + calls + ' calls',
          function() {
          	// ADD FAIL CALLBACK
          }
        );
      };

      this.testTurnCalledWithArgument = function() {
        t.assertTrue(
          turn,
          'Expected function turn() to be called with an argument, but got ' + turn,
          function() {
            // ADD FAIL CALLBACK
          }
        );
      };

      this.testTurnInputString = function() {
      	t.assertTrue(
          typeof turn === 'string',
          'Expected function turn() argument to be of type string, but got type of ' + typeof turn,
          function() {
          	// ADD FAIL CALLBACK
          }
      	);
      };

      this.testTurnInputValue = function() {
        t.assertTrue(
          turn === 'left' || turn === 'right' || turn === 'straight',
          'Expected function turn() argument to have value "left" or "right" or "straight", but got value ' + turn,
          function() {
          	// ADD FAIL CALLBACK
          }
        );
      };

      this.testTurnInputValueRight = function() {
        t.assertTrue(
          turn === 'right',
          'Expected function turn() argument to have value "right", but got value ' + turn,
          function() {
          	// ADD FAIL CALLBACK
          }
        );
      };
	  });

    // == CONDITIONAL STRAIGHT TESTS == //
    runTestSuite(function GpsIntersectionStraightTest(t) {
      var sb = new Sandbox().sandbox;
      sb.gps.intersection = 'straight';

      var context = new vm.createContext(sb);
      script.runInContext(context);

      var turn = context.testTurn.value;
      var calls = context.testTurn.count;


      this.testTurnCalled = function() {
        t.assertTrue(
          calls,
          'Extected function turn() to be called in if statement, but got ' + calls + ' calls',
          function() {
            setCase(5);
          }
        );
      };

      this.testTurnCalledOnce = function() {
        t.assertTrue(
          calls === 1,
          'Expected function turn() to be called once in if statement, but got ' + calls + ' calls',
          function() {
            setCase(5);
          }
        );
      };

      this.testTurnCalledWithArgument = function() {
        t.assertTrue(
          turn,
          'Expected function turn() to be called with an argument, but got ' + turn,
          function() {
            setCase(5);
          }
        );
      };

      this.testTurnInputString = function() {
        t.assertTrue(
          typeof turn === 'string',
          'Expected function turn() argument to be of type string, but got type of ' + typeof turn,
          function() {
            setCase(5);
          }
        );
      };

      this.testTurnInputValue = function() {
        t.assertTrue(
          turn === 'left' || turn === 'right' || turn === 'straight',
          'Expected function turn() argument to have value "left", "right" or "straight", but got value ' + turn,
          function() {
            setCase(5);
          }
        );
      };


      this.testTurnInputValueStraight = function() {
        t.assertTrue(
          turn === 'straight',
          'Expected function turn() argument to have value "straight", but got value ' + turn,
          function() {
            if (turn === 'left') {
              setCase(7);
            } else if (turn === 'right') {
              setCase(8);
            } else {
              setCase(5);
            }
          }
        );
      };
    });
  

    // == CONDITIONAL LEFT TESTS == //
    runTestSuite(function GpsIntersectionLeftTest(t) {
      var sb = new Sandbox().sandbox;
      sb.gps.intersection = 'left';

      var context = new vm.createContext(sb);
      script.runInContext(context);

      var turn = context.testTurn.value;
      var calls = context.testTurn.count;   

      this.testTurnCalled = function() {
        t.assertTrue(
          calls,
          'Extected function turn() to be called in if statement, but got ' + calls + ' calls',
          function() {
            setCase(5);
          }
        );
      };

      this.testTurnCalledOnce = function() {
        t.assertTrue(
          calls === 1,
          'Expected function turn() to be called once in if statement, but got ' + calls + ' calls',
          function() {
            setCase(5);
          }
        );
      };

      this.testTurnCalledWithArgument = function() {
        t.assertTrue(
          turn,
          'Expected function turn() to be called with an argument, but got ' + turn,
          function() {
            setCase(5);
          }
        );
      };

      this.testTurnInputString = function() {
        t.assertTrue(
          typeof turn === 'string',
          'Expected function turn() argument to be of type string, but got type of ' + typeof turn,
          function() {
            setCase(5);
          }
        );
      };

      this.testTurnInputValue = function() {
        t.assertTrue(
          turn === 'left' || turn === 'right' || turn === 'straight',
          'Expected function turn() argument to have value "left", "right" or "straight", but got value ' + turn,
          function() {
            setCase(5);
          }
        );
      };

      this.testTurnInputValueLeft = function() {
        t.assertTrue(
          turn === 'left',
          'Expected function turn() argument to have value "left", but got value ' + turn,
          function() {
            if (turn === 'straight') {
              setCase(5);
            } else if (turn === 'right') {
              setCase(6);
            } else {
              setCase(5);
            }
          }
        );
      };
    });

    // == CONDITIONAL Right TESTS == //
    runTestSuite(function GpsIntersectionRightTest(t) {
      var sb = new Sandbox().sandbox;
      sb.gps.intersection = 'right';

      var context = new vm.createContext(sb);
      script.runInContext(context);

      var turn = context.testTurn.value;
      var calls = context.testTurn.count;   

      this.testTurnCalled = function() {
        t.assertTrue(
          calls,
          'Extected function turn() to be called in if statement, but got ' + calls + ' calls',
          function() {
            setCase(3);
          }
        );
      };

      this.testTurnCalledOnce = function() {
        t.assertTrue(
          calls === 1,
          'Expected function turn() to be called once in if statement, but got ' + calls + ' calls',
          function() {
            setCase(3);
          }
        );
      };

      this.testTurnCalledWithArgument = function() {
        t.assertTrue(
          turn,
          'Expected function turn() to be called with an argument, but got ' + turn,
          function() {
            setCase(3);
          }
        );
      };

      this.testTurnInputString = function() {
        t.assertTrue(
          typeof turn === 'string',
          'Expected function turn() argument to be of type string, but got type of ' + typeof turn,
          function() {
            setCase(3);
          }
        );
      };

      this.testTurnInputValue = function() {
        t.assertTrue(
          turn === 'left' || turn === 'right' || turn === 'straight',
          'Expected function turn() argument to have value "left", "right" or "straight", but got value ' + turn,
          function() {
            setCase(3);
          }
        );
      };

      this.testTurnInputValueRight = function() {
        t.assertTrue(
          turn === 'right',
          'Expected function turn() argument to have value "right", but got value ' + turn,
          function() {
            if (turn === 'left') {
              setCase(9);
            } else if (turn === 'straight') {
              setCase(3);
            } else {
              setCase(5);
            }
          }
        );
      };
    });
  
  });

  next();

};

module.exports = level10;
