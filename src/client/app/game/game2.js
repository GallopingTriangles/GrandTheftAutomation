var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
  game.load.image('car', './assets/car-top-view-small.png');
  game.load.image('panda', './assets/panda.png');
  game.load.image('grass', './assets/grass.jpg');
}

var car;
// var obstacle_1;
// var obstacle_2;
var cursors;
function create() {
  // Use the p2 physics system
  game.physics.startSystem(Phaser.Physics.P2JS);
  // Turn on impact events for the world, to allow collision callbacks
  game.physics.p2.setImpactEvents(true);
  game.stage.backgroundColor = '#3e5f96';

  // CAR SPRITE
  car = game.add.sprite(500, 300, 'car');
  car.anchor.setTo(0.3, 0.5);

  // enable physics on the car
  game.physics.p2.enable(car);
  car.body.collideWorldBounds = true;
  car.body.setRectangle(car.width-20, car.height, -10);

  // create a collision group for the player, and one for the obstacles
  var playerCollisionGroup = game.physics.p2.createCollisionGroup();
  var obstacleCollisionGroup = game.physics.p2.createCollisionGroup();

  // collision group objects will still collide with the world bounds
  game.physics.p2.updateBoundsCollisionGroup();


  var obstacles = game.add.group();
  obstacles.enableBody = true;
  obstacles.physicsBodyType = Phaser.Physics.P2JS;

  for (var i = 0; i < 3; i++) {
    // create an obstacle
    var obstacle = obstacles.create(300, 150+180*i, 'grass');
    obstacle.scale.setTo(0.1, 0.1);
    obstacle.body.setRectangle(obstacle.width, obstacle.height);
    // assign a collision group to the obstacles
    obstacle.body.setCollisionGroup(obstacleCollisionGroup);
    obstacle.body.collides([playerCollisionGroup, obstacleCollisionGroup]);
    obstacle.body.static = true;
  }

  car.body.setCollisionGroup(playerCollisionGroup);
  car.body.collides([playerCollisionGroup, obstacleCollisionGroup], collision, this);

  // Initialize user control with the keyboard
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  //  Reset the cars velocity before rendering next frame;
  car.body.velocity.x = 0;
  car.body.velocity.y = 0;
  car.body.angularVelocity = 0;

  if (cursors.left.isDown) {
    car.body.angle -= 4;
  }
  if (cursors.right.isDown) {
    car.body.angle += 4;
  }

  if (cursors.up.isDown) {
    car.body.moveForward(300);
  } else if (cursors.down.isDown) {
    car.body.moveBackward(100);
  }
}

function collision() {
  console.log('hit');
}

function warning() {
  console.log('warning');
}

function render() {
}