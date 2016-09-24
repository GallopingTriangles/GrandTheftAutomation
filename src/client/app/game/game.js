var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('car', './assets/car-top-view.png');



}



function create() {
  // game.add.sprite(0, 0, 'arrow');
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#3e5f96';

    car = game.add.sprite(400, 300, 'car');
    car.anchor.setTo(.5, 1);
    car.scale.setTo(.2, .2);
    car.anchor.setTo(.5, .5);

    //  We need to enable physics on the player
    game.physics.arcade.enable(car);

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  //  Reset the cars velocity (movement)
  car.body.velocity.x = 0;
  car.body.velocity.y = 0;
  car.angle += 1;
  // console.log(car.angle);
  if (cursors.left.isDown)
  {
      //  Move to the left
      car.body.velocity.x = -150;

      // car.animations.play('left');
  }
  else if (cursors.right.isDown)
  {
      //  Move to the right
      car.body.velocity.x = 150;

      // car.animations.play('right');
  } else if (cursors.down.isDown) {
    car.body.velocity.y = 150;
  } else if (cursors.up.isDown) {
    car.body.velocity.y = -150;
  }
  {
      //  Stand still
      car.animations.stop();
      car.frame = 4;
  }

}

function render() {

    // game.debug.geom(new Phaser.Point(car.x, car.y), '#ffff00');
    // game.debug.geom(new Phaser.Point(arrow2.x, arrow2.y), '#ffff00');
    // game.debug.geom(new Phaser.Point(arrow3.x, arrow3.y), '#ffff00');
    // game.debug.geom(new Phaser.Point(arrow4.x, arrow4.y), '#ffff00');

}
