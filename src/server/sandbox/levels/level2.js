var level2 = function(req, res, next) {
  console.log('IN LEVEL 2');

  req.body.phaser.lorenzo = 'dit is een test van lorenzo';

  next();
};

module.exports = level2;