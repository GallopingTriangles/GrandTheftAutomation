var util = require('util');
var vm = require('vm');

var sandbox = (req, res, next) => {
	var level = req.body.level;

	// TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
	level = 4;// TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
	// TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST

	var code = req.body.log;
	// compile code
  var script = new vm.Script(code);
  // create new sandbox and empty context
  var sandbox = {};
  var context = new vm.createContext(sandbox);
  // run compiled code
  script.runInContext(context);

  req.body.phaser = {};
  req.body.bugs = [];

  // name and test for each level
  var levels = {
  	1: {name: 'color', test: color},
  	2: {name: 'engine', test: engine},
  	3: {name: 'speed', test: speed},
  	4: {name: 'sensor', test: sensor}
  }
  
  // new levels have to pass previous tests
  for (var i = 1; i <= level; i++) {
    var test = levels[i].test(context);
    req.body.phaser[levels[i].name] = test[0];
    if (test[1]) {
    	req.body.bugs.push(test[1]);
    }
  }

  next();
};


// color tests
var color = (context) => {
	var color = context.color;
	if (color === undefined) {
    return ['white', 'color is not defined'];
	} else if (typeof color !== 'string') {
		return ['white', 'color needs to be a "string"'];
	} else if (color === 'red' || color === 'blue' || color === 'black' || color === 'white' || color === 'panda') {
		return [color];
	} else {
		return ['white', 'color can only be "red", "blue", "black" or "white"'];
	}
};

// engine tests
var engine = (context) => {
  var engine = context.engine;
  if (engine === undefined) {
  	return [false, 'engine is not defined'];
  } else if (typeof engine !== 'boolean') {
  	return [false, 'engine needs to be a "boolean"'];
  } else if (engine === true) {
  	return [true];
  } else {
  	return [false, 'engine needs to be set to "true" to drive'];
  }
};

// speed tests
var speed = (context) => {
	var speed = context.speed;
  if (speed === undefined) {
    return [false, 'speed is not defined'];
  } else if (typeof speed !== 'number') {
  	return [false, 'speed needs to be a "number"'];
  } else if (speed < 0) {
    return [false, 'speed needs to be a "positive number"'];
  } else if (speed > 25) {
  	return [speed, 'the speed limit is "25" miles per hour'];
  } else {
  	return [speed];
  }
};

var sensor = (context) => {
  var sensor = context.sensor;
  if (sensor === undefined) {
  	return [false, 'sensor is not defined'];
  } else if (typeof sensor !== 'boolean') {
  	return [false, 'sensor needs to be a "boolean"'];
  } else if (sensor === true) {
  	return [true];
  } else {
  	return [false, 'sensor needs to be set to "true" to detect obstacles'];
  }
};

module.exports = sandbox;