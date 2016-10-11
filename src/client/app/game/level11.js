var utils = require('./routeSolver.js');

var createGame = (userInput) => {
  /**********************************************************/
  /**********************************************************/
  /********* SAMPLE USER INPUT TO BASE THIS OFF OF **********/
  /**** REMOVE LATER AFTER WE GET THE REAL INPUT FROM VM ****/
  /**********************************************************/
  /**********************************************************/
  var FAKE_USER_INPUT = {
    color: 'panda',
    speed: 100,
    sensor: true,
    case: 1 // success: []
  }
  /**********************************************************/
  /**********************************************************/

  var width = window.innerWidth;
  var height = window.innerHeight;
  // var gameWidth = width * (7 / 12) - 10;
  // var gameHeight = gameWidth * (6 / 8);

  var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser_game', { preload: preload, create: create, update: update, render: render });

  function preload() {
    setCarColor();
    game.load.image('wasted', './assets/wasted.png');
    game.load.image('panda', './assets/panda.png');
    game.load.image('grass', './assets/grass.jpg');
    game.load.image('sensor', './assets/round.png');

    game.load.spritesheet('explosion', './assets/explosion.png', 256, 256, 48);

    game.load.tilemap('level_11', './assets/gameMaps_v2/level_11.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('GTA_tileset_16', './assets/gameMaps_v2/GTA_tileset_16.png');
  }

  var car;
  var text;

  var sensors = {};
  sensors.left = 'hello';
  sensors.right = 'hello';
  sensors.front = 'hello';
  sensors.back = 'hello';

  var startingX = 50;
  var startingY = 18;
  var startingAngle = 180;
  var backgroundColor = '#3e5f96';
  var speed = FAKE_USER_INPUT.speed * 4;
  // var carForwardSpeed = 200;
  // var carBackwardSpeed = 100;
  var carScale = .5;
  // var forwardReverseMultiplier = 1 / 2;
  // var userSpeedMultiplier = 4;
  var explosion;
  var wasted;


  var map;
  var collisionLayer;
  var carCollisionGroup;
  var obstacleCollisionGroup;

  var collisionBodies;

  var completionTiles;
  var failureTiles;

  var intersectionTiles_1;
  var coord_1; // the (x,y) coordinate of the center of the intersectionTiles_1
  var intersectionTiles_2;
  var coord_2;
  var intersectionTiles_3;
  var coord_3;
  var intersectionTiles_4;
  var coord_4;
  var intersectionTiles_5;
  var coord_5;
  var intersectionTiles_6;
  var coord_6;

  var layer_1;
  var layer_2;
  var layer_3;
  var layer_4;
  var layer_5;
  var layer_6;
  var layer_7;
  var layer_8;
  var layer_9;
  var layer_10;
  var layer_11;
  var layer_12;

  function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);

    map = game.add.tilemap('level_11');
    map.addTilesetImage('GTA_tileset_16');

    layer_5 = map.createLayer('end_success_layer');
    layer_6 = map.createLayer('intersection_1_layer');
    layer_7 = map.createLayer('intersection_2_layer');
    layer_8 = map.createLayer('intersection_3_layer');
    layer_9 = map.createLayer('intersection_4_layer');
    layer_10 = map.createLayer('intersection_5_layer');
    layer_11 = map.createLayer('intersection_6_layer');
    layer_12 = map.createLayer('end_failure_layer');

    layer_2 = map.createLayer('road_layer');
    layer_1 = map.createLayer('collision_layer');
    layer_4 = map.createLayer('street_stuff_layer');
    layer_3 = map.createLayer('building_layer');

    map.setCollisionBetween(0, 2500, true, 'collision_layer');

    collisionBodies = game.physics.p2.convertTilemap(map, layer_1, true, false);

    completionTiles = layer_5.getTiles(0, 0, 2500, 2500).filter(function(tile) { // array of tiles of the completion zone
      return tile.index > 0;
    });

    failureTiles = layer_12.getTiles(0, 0, 2000, 2000).filter(function(tile) {
      return tile.index > 0;
    });

    intersectionTiles_1 = layer_6.getTiles(0, 0, 2500, 2500).filter(function(tile) { // array of tiles for the first intersection
      return tile.index > 0;
    })
    intersectionTiles_2 = layer_7.getTiles(0, 0, 2500, 2500).filter(function(tile) { // array of tiles for the second intersection
      return tile.index > 0;
    })
    intersectionTiles_3 = layer_8.getTiles(0, 0, 2500, 2500).filter(function(tile) {
      return tile.index > 0;
    })
    intersectionTiles_4 = layer_9.getTiles(0, 0, 2500, 2500).filter(function(tile) {
      return tile.index > 0;
    })
    intersectionTiles_5 = layer_10.getTiles(0, 0, 2500, 2500).filter(function(tile) {
      return tile.index > 0;
    })
    intersectionTiles_6 = layer_11.getTiles(0, 0, 2500, 2500).filter(function(tile) {
      return tile.index > 0;
    })
    

    if (FAKE_USER_INPUT.sensor) { // create the sensors if the use has enabled them
      createSensors();
    }
    createCar();

    carCollisionGroup = game.physics.p2.createCollisionGroup();
    obstacleCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();
    car.body.setCollisionGroup(carCollisionGroup);

    collisionBodies.forEach(function(collisionBody) {
      collisionBody.setCollisionGroup(obstacleCollisionGroup);
      collisionBody.collides([carCollisionGroup, obstacleCollisionGroup]);
    })

    car.body.collides(obstacleCollisionGroup, gameOver, this);

    coord_1 = utils.intersectionCenter(intersectionTiles_1); // 
    coord_2 = utils.intersectionCenter(intersectionTiles_2); // 
    coord_3 = utils.intersectionCenter(intersectionTiles_3); // 
    coord_4 = utils.intersectionCenter(intersectionTiles_4); // 
    coord_5 = utils.intersectionCenter(intersectionTiles_5); // 
    coord_6 = utils.intersectionCenter(intersectionTiles_6); // 
  }

  function update() {

    // case: 1 // success: []

    car.body.moveForward(speed);
    if (FAKE_USER_INPUT.case === 1) { // success: [STRAIGHT, LEFT, STRAIGHT, RIGHT]
      utils.turn(car, coord_4, 'south', 'east');
      utils.turn(car, coord_6, 'east', 'south');
      checkCompletion();
    } else if (FAKE_USER_INPUT.case === 2) {
      utils.turn(car, coord_4, 'south', 'east');
      utils.turn(car, coord_6, 'east', 'north');
    } else if (FAKE_USER_INPUT.case === 3) {
      utils.turn(car, coord_4, 'south', 'east');
    } else if (FAKE_USER_INPUT.case === 4) {
      utils.turn(car, coord_4, 'south', 'east');
      utils.turn(car, coord_5, 'east', 'south');
      checkFailure();
    } else if (FAKE_USER_INPUT.case === 5) {
      /*** no turning, just crashing ***/
    } else if (FAKE_USER_INPUT.case === 6) {
      utils.turn(car, coord_4, 'south', 'west');
    } else if (FAKE_USER_INPUT.case === 7) {
      utils.turn(car, coord_1, 'south', 'east');
      utils.turn(car, coord_2, 'east', 'north');
    } else if (FAKE_USER_INPUT.case === 8) {
      utils.turn(car, coord_1, 'south', 'west');
    }

    // if (userInput.sensor) {

    //   attachSensors(0, 100, sensors);

    //   var overlap = false;
    //   collisionBodies.forEach(function(body) {
    //     for (var sensor in sensors) {
    //       if (sensors[sensor].getBounds().contains(body.x, body.y)
    //       || sensors[sensor].getBounds().contains(body.x + 32, body.y)
    //       || sensors[sensor].getBounds().contains(body.x, body.y + 32)
    //       || sensors[sensor].getBounds().contains(body.x + 32, body.y + 32)) {
    //         overlap = true;
    //       }
    //     }
    //   })
    // }

  }

  function render() {
    car.body.debug = true;
  }

  /******* HELPER FUNCTIONS **********************/
  /*********** HELPER FUNCTIONS ******************/
  /*************** HELPER FUNCTIONS **************/
  /******************* HELPER FUNCTIONS **********/

  function createCar() {
    car = game.add.sprite(startingX, startingY, 'car');
    car.anchor.setTo(.3, .5);
    car.scale.setTo(0.2);

    game.physics.p2.enable(car);
    car.body.setRectangle(10, 10);
    car.body.collideWorldBounds = true;
    car.body.angle = startingAngle;
  }

  function setCarColor() {
    switch(userInput.color) {
      case 'white':
        game.load.image('car', './assets/car-top-view-small.png');
        break;
      case 'panda':
        game.load.image('car', './assets/panda.png');
        break;
      case 'black':
        game.load.image('car', './assets/car-black.png');
        break;
      case 'red':
        game.load.image('car', './assets/car-red.png');
        break;
      case 'blue':
        game.load.image('car', './assets/car-blue.png');
        break;
      default:
        game.load.image('car', './assets/car-top-view-small.png');
    }
  }

  function degToRad(num) {
    return num * (Math.PI / 180);
  }

  function convertAngle(angle) {
    return degToRad(90 - angle)
  }

  function createSensors() {
    if (userInput.sensor) {
      for (var sensor in sensors) {
        sensors[sensor] = game.add.sprite(startingX, startingY, 'sensor')
        sensors[sensor].alpha = .1;
        sensors[sensor].anchor.setTo(.5, .5);
        sensors[sensor].scale.setTo(.5, .5);
      }
    }
  }

  function attachSensors(startingAngle, offset, FLBRArray) {
    var index = 0;
    for (var sensor in sensors) {
      sensors[sensor].angle = car.body.angle;
      sensors[sensor].y = (-offset * Math.sin(convertAngle(car.body.angle + 90 * index))) + car.body.y;
      sensors[sensor].x = (offset * Math.cos(convertAngle(car.body.angle + 90 * index))) + car.body.x;
      index += 1;
    }
  }

  function checkCompletion() {
    completionTiles.forEach(function(tile) {
      if (Math.abs(tile.worldX + 16 - car.body.x) < 25 && Math.abs(tile.worldY +16 - car.body.y) < 25) {
        levelCompleted();
      }
    })
  }

  function levelCompleted() {
    var style = { font: 'bold 48px Arial', fill: '#ffffff', boundsAlignH: 'center', boundsAlignV: 'middle' };
    var text = game.add.text(400, 300, 'Success!', style);
    game.paused = true;
    console.log('COMPLETED!');
  }

  function checkFailure() {
    failureTiles.forEach(function(tile) {
      if (Math.abs(tile.worldX + 16 - car.body.x) < 25 && Math.abs(tile.worldY +16 - car.body.y) < 25) {
        levelFailed();
      }
    })
  }

  function levelFailed() {
    var style = { font: 'bold 64px Arial', fill: '#ffffff', boundsAlignH: 'center', boundsAlignV: 'middle' };
    var text = game.add.text(400, 300, 'FAIL!', style);
    game.paused = true;
  }

  function gameOver() {
    explosion = game.add.sprite(400, 300, 'explosion');
    explosion.x = car.x;
    explosion.y = car.y;
    explosion.anchor.setTo(.5, .5);
    explosion.animations.add('explode');
    explosion.animations.play('explode', 24, false);
    // text.kill();
    car.kill();
    if (sensors.right) {
      // sensor.kill();
    }
    wasted = game.add.sprite(400, 300, 'wasted');
    wasted.anchor.setTo(.5, .5);
    setTimeout(() => {
      game.paused = true;
    }, 3000)
  }

  function turn(direction) {
    switch (direction) {
      case 'north': 
        car.body.angle = 0;
        break;
      case 'east': 
        car.body.angle = 90;
        break;
      case 'south': 
        car.body.angle = 180;
        break;
      case 'west': 
        car.body.angle = -90;
        break;
      default: car.body.angle = 0;
    }
  }
}

module.exports = createGame;