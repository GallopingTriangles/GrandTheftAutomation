var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
  game.load.image('car', './assets/car-top-view.png');
}

var car;

function create() {
  // Use the p2 physics system
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.stage.backgroundColor = '#3e5f96';

  car = game.add.sprite(400, 300, 'car');
  car.scale.setTo(.2, .2);

  //
  // car.anchor.setTo(.3, .5);

  // enable physics on the car
  game.physics.p2.enable(car);
  console.log('Car body: ', car.body);
  car.body.collideWorldBounds = true;

  cursors = game.input.keyboard.createCursorKeys();

}

function update() {
  //  Reset the cars velocity before rendering next frame;
  // car.body.velocity.x = 0;
  // car.body.velocity.y = 0;
  // car.body.angularVelocity = 0;
  car.body.angle = -90;

  if (cursors.left.isDown) {car.body.rotateLeft(100);}   //car movement
    else if (cursors.right.isDown){car.body.rotateRight(100);}
    else {car.body.setZeroRotation();}
    if (cursors.up.isDown){car.body.moveForward(400);}
    else if (cursors.down.isDown){car.body.moveBackward(400);}

  // if (cursors.up.isDown) {
  //   game.physics.p2.velocityFromAngle(car.angle, 300, car.body.velocity);
  //   leftRight(true);
  // } else if (cursors.down.isDown) {
  //   game.physics.p2.velocityFromAngle(car.angle, -100, car.body.velocity);
  //   leftRight(false);
  // }
  // console.log(car.body.rotateLeft)
}

function render() {
}

// HELPER FUNCTIONS

function leftRight(forward) {
  if (cursors.left.isDown) {
    car.body.angularVelocity = forward ? -200 : -100;
  } else if (cursors.right.isDown) {
    car.body.angularVelocity = forward ? 200 : 100;
  }
}

function decomposeVelocity(velocity, angle) {
  return velocity * Math.random;
}
