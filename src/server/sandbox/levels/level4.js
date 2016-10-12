var level4 = function(req, res, next) {

	// case: 2, // fail, crashed into obstacle after right turn
  // case: 3, // fail, crash straight
  // case: 4, // fail, crash left
  // case: 5, // fail, stalls at intersection
  // case: 6, // fail, car did not start engine

  next();
};

module.exports = level4;