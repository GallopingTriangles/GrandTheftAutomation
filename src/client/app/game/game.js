var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {
  game.load.image('car', './assets/car-top-view.png');
}



function create() {
  // Use the arcade physics system
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#3e5f96';

  car = game.add.sprite(400, 300, 'car');
  car.scale.setTo(.2, .2);

  //
  car.anchor.setTo(.3, .5);

  // enable physics on the car
  game.physics.arcade.enable(car);

  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  //  Reset the cars velocity before rendering next frame;
  car.body.velocity.x = 0;
  car.body.velocity.y = 0;
  car.body.angularVelocity = 0;

  function leftRight() {
    if (cursors.left.isDown) {
      car.body.angularVelocity = -200;
    } else if (cursors.right.isDown) {
      car.body.angularVelocity = 200;
    }
  }

  if (cursors.up.isDown) {
    game.physics.arcade.velocityFromAngle(car.angle, 300, car.body.velocity);
    leftRight();
  } else if (cursors.down.isDown) {
    game.physics.arcade.velocityFromAngle(car.angle, -100, car.body.velocity);
    leftRight();
  }
}

function render() {
}
