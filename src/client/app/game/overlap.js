var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('car', 'assets/car-top-view-small.png');
    game.load.image('panda', 'assets/panda.png');

}

var sprite1;
var sprite2;
var text;

function create() {

    sprite1 = game.add.sprite(100, 200, 'car');
    sprite1.inputEnabled = true;
    sprite1.input.enableDrag();

    sprite2 = game.add.sprite(400, 400, 'panda');
    sprite2.inputEnabled = true;
    sprite2.input.enableDrag();

    text = game.add.text(16, 16, 'Drag the sprites. Overlapping: false', { fill: '#ffffff' });

}

function update() {

    if (checkOverlap(sprite1, sprite2))
    {
        text.text = 'Drag the sprites. Overlapping: true';
    }
    else
    {
        text.text = 'Drag the sprites. Overlapping: false';
    }

}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}
