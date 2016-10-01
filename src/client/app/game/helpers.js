export function gameOver() {
  explosion = game.add.sprite(400, 300, 'explosion');
  explosion.x = car.x;
  explosion.y = car.y;
  explosion.anchor.setTo(.5, .5);
  explosion.animations.add('explode');
  explosion.animations.play('explode', 24, false);
  text.kill();
  car.kill();
  sensor.kill();
  wasted = game.add.sprite(400, 300, 'wasted');
  wasted.anchor.setTo(.5, .5);
}
