var sandbox = function(req, res, next) {
	console.log('in sandbox');
  next();
};

module.exports = sandbox;