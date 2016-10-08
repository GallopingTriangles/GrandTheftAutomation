var level3 = function(req, res, next) {
  console.log('IN LEVEL 3');

  req.body.bugs = [];

  next();
};

module.exports = level3;