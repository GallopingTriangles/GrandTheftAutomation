setTimeout(() => {
  levelFailed();
}, 2000);

function levelCompleted() {
  var text = game.add.sprite(400, 300, 'success');
  text.anchor.setTo(.5, .5)
  game.paused = true;
}

function levelFailed() {
  var text = game.add.sprite(400, 300, 'failure');
  text.anchor.setTo(.5, .5);
  game.paused = true;
}
