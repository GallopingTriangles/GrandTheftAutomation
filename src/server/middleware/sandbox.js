var util = require('util');
var vm = require('vm');

var sandbox = (req, res, next) => {
	var level = req.body.level;
	// TEST
	level = 4;
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


  var levels = [color, engine, speed, sensor];
  for (var i = 0; i < level; i++) {
    var lev = levels[i](context);
    console.log(lev);
  }

  next();
};


// color tests
var color = (context) => {
	var color = context.color;
	if (color === undefined) {
    return [{color: 'blue'}, 'color is not defined'];
	} else if (typeof color !== 'string') {
		return [{color: 'blue'}, 'color needs to be a "string"'];
	} else if (color === 'red' || color === 'green' || color === 'blue') {
		return [{color: color}];
	} else {
		return [{color: 'blue'}, 'color can only be "green", "red" or "green"'];
	}
};

// engine tests
var engine = (context) => {
  var engine = context.engine;
  if (engine === undefined) {
  	return [{engine: false}, 'engine is not defined'];
  } else if (typeof engine !== 'boolean') {
  	return [{engine: false}, 'engine needs to be a "boolean"'];
  } else if (engine === true) {
  	return [{engine: true}];
  } else {
  	return [{engine: false}, 'engine needs to be set to "true" to drive'];
  }
};

// speed tests
var speed = (context) => {
	var speed = context.speed;
  if (speed === undefined) {
    return [{speed: 0}, 'speed is not defined'];
  } else if (typeof speed !== 'number') {
  	return [{speed: 0}, 'speed needs to be a "number"'];
  } else if (speed > 25) {
  	speed = Math.min(speed, 35);
  	return [{speed: speed}, 'the speed limit is "25" miles per hour'];
  } else {
  	return [{speed: speed}];
  }
};

var sensor = (context) => {
  var sensor = context.sensor;
  if (sensor === undefined) {
  	return [{sensor: false}, 'sensor is not defined'];
  } else if (typeof sensor !== 'boolean') {
  	return [{sensor: false}, 'sensor needs to be a "boolean"'];
  } else if (sensor === true) {
  	return [{sensor: true}];
  } else {
  	return [{sensor: false}, 'sensor needs to be set to "true" to detect obstacles'];
  }
};

module.exports = sandbox;