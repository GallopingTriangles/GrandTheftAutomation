var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    // game.load.tilemap('map', './assets/collision.json', null, Phaser.Tilemap.TILED_JSON);
    // game.load.image('Roads', './assets/map.jpg');
    // game.load.image('walls_1x2', './assets/tilemaps/walls_1x2.png');
    // game.load.image('tiles2', './assets/tilemaps/tiles2.png');

    game.load.tilemap('map', './assets/gameMaps/TestMap_1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tmw_desert_spacing', './assets/gameMaps/tmw_desert_spacing.png');
    game.load.image('ship', './assets/car-blue.png');

}

var ship;
var map;
var layer;
var cursors;
var collisionBodies;

function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);

    // game.stage.backgroundColor = '#2d2d2d';

    map = game.add.tilemap('map');


    // map.addTilesetImage('Roads');
    map.addTilesetImage('tmw_desert_spacing'); // http://phaser.io/docs/2.6.2/Phaser.Tilemap.html#addTilesetImage
    // map.addTilesetImage('walls_1x2');
    // map.addTilesetImage('tiles2');


    // layer.resizeWorld();


    //  Set the tiles for collision.
    //  Do this BEFORE generating the p2 bodies below.

    // layer = map.createLayer('tmw_desert_spacing');
    layer = map.createLayer('Tile Layer 1');
    layer2 = map.createLayer('Tile Layer 2');

    // map.setCollisionBetween(0, 1000, true, 'Tile Layer 1');
    map.setCollision(34, true, 'Tile Layer 1');

    // 34 is collidable

    // game.physics.p2.convertTilemap(map, layer, true);

    //  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
    //  This call returns an array of body objects which you can perform addition actions on if
    //  required. There is also a parameter to control optimising the map build.

    collisionBodies = game.physics.p2.convertTilemap(map, layer); // http://phaser.io/docs/2.6.2/Phaser.Physics.P2.html#convertTilemap

    ship = game.add.sprite(300, 300, 'ship');
    ship.scale.setTo(.2, .2);
    game.physics.p2.enable(ship);

    game.camera.follow(ship);

    //  By default the ship will collide with the World bounds,
    //  however because you have changed the size of the world (via layer.resizeWorld) to match the tilemap
    //  you need to rebuild the physics world boundary as well. The following
    //  line does that. The first 4 parameters control if you need a boundary on the left, right, top and bottom of your world.
    //  The final parameter (false) controls if the boundary should use its own collision group or not. In this case we don't require
    //  that, so it's set to false. But if you had custom collision groups set-up then you would need this set to true.

    // game.physics.p2.setBoundsToWorld(true, true, true, true, false);

    //  Even after the world boundary is set-up you can still toggle if the ship collides or not with this:
    // ship.body.collideWorldBounds = false;

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    if (cursors.left.isDown)
    {
        ship.body.rotateLeft(100);
    }
    else if (cursors.right.isDown)
    {
        ship.body.rotateRight(100);
    }
    else
    {
        ship.body.setZeroRotation();
    }

    if (cursors.up.isDown)
    {
        ship.body.thrust(400);
    }
    else if (cursors.down.isDown)
    {
        ship.body.reverse(400);
    }

}

function render() {

}



    // var tilesCollisionGroup   = this.physics.p2.createCollisionGroup();    
    // var playerCollisionGroup  = this.physics.p2.createCollisionGroup();        
    // for (var i = 0; i < tileObjects.length; i++) {        
    //         var tileBody = tileObjects[i];        
    //         tileBody.setCollisionGroup(tilesCollisionGroup);    
    //     }    
    // var ship = this.add.sprite(200, 200, 'ship');    
    // this.physics.p2.enable(ship, false);    
    // ship.body.setCollisionGroup(playerCollisionGroup);    
    // ship.body.collides(tilesCollisionGroup);




    // map.setCollisionBetween(1, 12, true, layer2);    
    // var tileObjects = this.physics.p2.convertTilemap(map, layer2);    
    // var tilesCollisionGroup = this.physics.p2.createCollisionGroup();    
    // for (var i = 0; i < tileObjects.length; i++) {        
    //         var tileBody = tileObjects[i];        
    //         tileBody.setCollisionGroup(tilesCollisionGroup);        
    //         tileBody.collides(playerCollisionGroup);    
    // }



    // var tilesCollisionGroup   = this.physics.p2.createCollisionGroup();    
    // var playerCollisionGroup  = this.physics.p2.createCollisionGroup();        
    // for (var i = 0; i < tileObjects.length; i++) {
    //         var tileBody = tileObjects[i];        
    //         tileBody.setCollisionGroup(tilesCollisionGroup);        
    //         tileBody.collides(playerCollisionGroup);    
    //     }    
    // var ship = this.add.sprite(200, 200, 'ship');    
    // this.physics.p2.enable(ship, false);    
    // ship.body.setCollisionGroup(playerCollisionGroup);    
    // ship.body.collides(tilesCollisionGroup);
