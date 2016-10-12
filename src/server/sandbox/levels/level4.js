var level4 = function(req, res, next) {

	// case: 2, // fail, crashed into obstacle after right turn --> CHANGE to car is not moving at all
  // case: 3, // fail, crash straight
  // case: 4, // fail, crash left
  // case: 5, // fail, stalls at intersection
  // case: 6, // fail, car did not start engine --> CHANGE to crash into obstacle after right turn

  next();
};

module.exports = level4;