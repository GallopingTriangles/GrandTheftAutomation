var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
  game.load.image('car', './assets/car-top-view-small.png');
  game.load.image('panda', './assets/panda.png');
  game.load.image('grass', './assets/grass.png')
}

var car;

function create() {
  // Use the p2 physics system
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.setImpactEvents(true);
  game.stage.backgroundColor = '#3e5f96';

  // CAR SPRITE
  car = game.add.sprite(400, 300, 'car');
  car.anchor.setTo(.3, .5);
  // enable physics on the car
  game.physics.p2.enable(car);
  car.body.collideWorldBounds = true;

  // Initialize user control with the keyboard
  cursors = game.input.keyboard.createCursorKeys();

  var pandaCollisionGroup = game.physics.p2.createCollisionGroup();
  var playerCollisionGroup = game.physics.p2.createCollisionGroup();

  var pandas = game.add.group();
    pandas.enableBody = true;
    pandas.physicsBodyType = Phaser.Physics.P2JS;

  for (var i = 0; i < 4; i++) {
    var panda = pandas.create(game.world.randomX, game.world.randomY, 'panda');
    panda.body.setRectangle(40, 40);

    //  Tell the panda to use the pandaCollisionGroup
    panda.body.setCollisionGroup(pandaCollisionGroup);

    //  Pandas will collide against themselves and the player
    //  If you don't set this they'll not collide with anything.
    //  The first parameter is either an array or a single collision group.
    panda.body.collides([pandaCollisionGroup, playerCollisionGroup]);
  }
}

function update() {
  //  Reset the cars velocity before rendering next frame;
  car.body.velocity.x = 0;
  car.body.velocity.y = 0;
  car.body.angularVelocity = 0;

  if (cursors.up.isDown) {
    car.body.moveForward(300);
    leftRight(true);
  } else if (cursors.down.isDown) {
    car.body.moveBackward(100);
    leftRight(false);
  }
}

function render() {
}

// HELPER FUNCTIONS

function leftRight(forward) {
  var angularVelocity;

  if (forward) {
    angularVelocity = 90;
  } else {
    angularVelocity = 30;
  }

  if (cursors.left.isDown) {
    car.body.rotateLeft(angularVelocity)
  } else if (cursors.right.isDown) {
    car.body.rotateRight(angularVelocity);
  }
}
