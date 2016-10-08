var level2 = function(req, res, next) {
  console.log('IN LEVEL 2');

  req.body.bugs = [];

  next();
};

module.exports = level2;