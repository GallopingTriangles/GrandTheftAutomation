var level4 = function(req, res, next) {
  console.log('IN LEVEL 4');

  next();
};

module.exports = level4;