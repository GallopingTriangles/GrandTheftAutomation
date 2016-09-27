var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
  game.load.image('player', './assets/car-top-view-small.png');
  game.load.image('panda', './assets/panda.png');
  game.load.image('grass', './assets/grass.jpg');
}

var player;
var cursors;
var sensor;
function create() {
  // Use the p2 physics system
  game.physics.startSystem(Phaser.Physics.P2JS);
  // Turn on impact events for the world, to allow collision callbacks
  game.physics.p2.setImpactEvents(true);
  game.stage.backgroundColor = '#3e5f96';

  // PLAYER SPRITE
  player = game.add.sprite(500, 300, 'player');
  player.anchor.setTo(0.3, 0.5);

  // enable physics on the player
  game.physics.p2.enable(player);
  player.body.collideWorldBounds = true;
  player.body.setRectangle(player.width-20, player.height, -10);

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
    var obstacle = obstacles.create(300, 50+200*i, 'grass');
    obstacle.scale.setTo(0.1, 0.1);
    obstacle.body.setRectangle(obstacle.width, obstacle.height);
    // assign a collision group to the obstacles
    obstacle.body.setCollisionGroup(obstacleCollisionGroup);
    obstacle.body.collides([playerCollisionGroup, obstacleCollisionGroup]);
    obstacle.body.static = true;
  }

  player.body.setCollisionGroup(playerCollisionGroup);
  player.body.collides([playerCollisionGroup, obstacleCollisionGroup], collision, this);

  // create the sensor in front of the player
  sensor = game.add.sprite(player.body.x, player.body.y, 'sensor');
  // sensor.anchor.setTo(0);
  game.physics.p2.enable(sensor);
  // sensor.width = player.width;
  // sensor.height = player.height;
  sensor.alpha = 0.1;
  sensor.enableBody = true;

  // Initialize user control with the keyboard
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  //  Reset the players velocity before rendering next frame;
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;
  player.body.angularVelocity = 0;


  if (cursors.left.isDown) {
    player.body.angle -= 4;
  }
  if (cursors.right.isDown) {
    player.body.angle += 4;
  }
  if (cursors.up.isDown) {
    player.body.moveForward(300);
  }
  if (cursors.down.isDown) {
    player.body.moveBackward(180);
  }
  sensor.body.x = player.body.x-5;
  sensor.body.y = player.body.y-50;
  sensor.body.angle = player.body.angle;
}

function collision() {
  console.log('hit');
}

function warning() {
  console.log('warning');
}

function render() {
}