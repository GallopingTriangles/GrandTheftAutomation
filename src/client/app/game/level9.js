var utils = require('./routeSolver.js');

var createGame = (userInput) => {
  /**********************************************************/
  /**********************************************************/
  /********* SAMPLE USER INPUT TO BASE THIS OFF OF **********/
  /**** REMOVE LATER AFTER WE GET THE REAL INPUT FROM VM ****/
  /**********************************************************/
  /**********************************************************/
  /*
        *** NOTE: cases not in order (2 and 10)

  var FAKE_USER_INPUT = {
    color: 'panda',
    speed: 100,
    sensor: true,
    case: 1 // success: [RIGHT, LEFT, U-TURN, RIGHT, STRAIGHT, RIGHT, RIGHT, LEFT]
    // case: 10 // fail: [RIGHT, LEFT] (crash into the obstacle instead of u-turning)
    // case: 3 // fail: [RIGHT, LEFT, U-TURN, STRAIGHT]
    // case: 4 // fail: BUGGY CASE, DO NOT USE [RIGHT, LEFT, U-TURN, LEFT] // THIS CASE IS BUGGY SO DO NOT USE IT
    // case: 5 // fail: [RIGHT, LEFT, U-TURN, RIGHT, RIGHT]
    // case: 6 // fail: [RIGHT, LEFT, U-TURN, STRAIGHT, STRAIGHT]
    // case: 7 // fail: [RIGHT, LEFT, U-TURN, STRAIGHT, LEFT]
    // case: 8 // fail: [LEFT, STRAIGHT]
    // case: 9 // fail: [LEFT, LEFT]
    // case: 2 // fail: ENGINE IS NOT ENABLED
  }
  */
  /**********************************************************/
  /**********************************************************/

  var width = window.innerWidth;
  var height = window.innerHeight;

  var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser_game', { preload: preload, create: create, update: update, render: render });

  function preload() {
    setCarColor();
    game.load.image('wasted', './assets/wasted.png');
    game.load.image('panda', './assets/panda.png');
    game.load.image('frontSensor', './assets/sensor_front.png');
    game.load.image('backSensor', './assets/sensor_back.png');
    game.load.image('rightSensor', './assets/sensor_right.png');
    game.load.image('leftSensor', './assets/sensor_left.png');


    game.load.spritesheet('explosion', './assets/explosion.png', 256, 256, 48);

    game.load.tilemap('level_9', './assets/gameMaps_v2/level_9.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('GTA_tileset_16', './assets/gameMaps_v2/GTA_tileset_16.png');
  }

  var car;
  var text;

  var sensors = {};
  sensors.front = {};
  sensors.right = {};
  sensors.back = {};
  sensors.left = {};

  var speed = userInput.speed ? userInput.speed * 4 : 0;
  var startingX = 40;
  var startingY = 365;
  var startingAngle = 90;
  var backgroundColor = '#3e5f96';
  var carScale = .5;
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

  function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);

    map = game.add.tilemap('level_9');
    map.addTilesetImage('GTA_tileset_16');

    layer_5 = map.createLayer('end_zone_layer');
    layer_6 = map.createLayer('intersection_DR_layer');
    layer_7 = map.createLayer('intersection_DL_layer');
    layer_8 = map.createLayer('intersection_UDL_layer');
    layer_9 = map.createLayer('intersection_UDR_layer');
    layer_10 = map.createLayer('intersection_UR_layer');
    layer_11 = map.createLayer('intersection_UL_layer');

    layer_2 = map.createLayer('road_layer');
    layer_1 = map.createLayer('collision_layer');
    layer_4 = map.createLayer('street_stuff_layer');
    layer_3 = map.createLayer('building_layer');

    map.setCollisionBetween(0, 2500, true, 'collision_layer');

    collisionBodies = game.physics.p2.convertTilemap(map, layer_1, true, false);

    completionTiles = layer_5.getTiles(0, 0, 2500, 2500).filter(function(tile) { // array of tiles of the completion zone
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


    if (userInput.sensor) { // create the sensors if the use has enabled them
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
    if (userInput.sensor) {
      enableSensors();
    }

    // case: 1 // success: [RIGHT, LEFT, U-TURN, RIGHT, STRAIGHT, RIGHT, RIGHT, LEFT]
    // case: 10 // fail: [RIGHT, LEFT] (crash into the obstacle instead of u-turning)
    // case: 3 // fail: [RIGHT, LEFT, U-TURN, STRAIGHT]
    // case: 4 // fail: [RIGHT, LEFT, U-TURN, LEFT]
    // case: 5 // fail: [RIGHT, LEFT, U-TURN, RIGHT, RIGHT]
    // case: 6 // fail: [RIGHT, LEFT, U-TURN, STRAIGHT, STRAIGHT]
    // case: 7 // fail: [RIGHT, LEFT, U-TURN, STRAIGHT, LEFT]
    // case: 8 // fail: [LEFT, STRAIGHT]
    // case: 9 // fail: [LEFT, LEFT]
    // case: 2 // fail: ENGINE IS NOT ENABLED

    if (userInput.case !== 2) { // engine is enabled in all cases except case 2
      car.body.moveForward(speed);
    } else {
      car.body.velocity.x = 0;
      car.body.velocity.y = 0;
    }

    if (userInput.case === 1) { // u-turn when encountering the obstacle

      utils.turn(car, coord_3, 'east', 'south');
      utils.turn(car, coord_5, 'south', 'east');
      uturn();
      utils.turn(car, coord_5, 'west', 'north');
      utils.turn(car, coord_1, 'north', 'east');
      utils.turn(car, coord_2, 'east', 'south');
      utils.turn(car, coord_4, 'south', 'east');
      checkCompletion();

    } else if (userInput.case === 10) {

      utils.turn(car, coord_3, 'east', 'south');
      utils.turn(car, coord_5, 'south', 'east');

    } else if (userInput.case === 3) {

      utils.turn(car, coord_3, 'east', 'south');
      utils.turn(car, coord_5, 'south', 'east');
      uturn();

    } else if (userInput.case === 4) {

      // THIS CAUSES AN INFINITE LOOP RESET ON THE GAME
      utils.turn(car, coord_3, 'east', 'south');
      utils.turn(car, coord_5, 'south', 'east');
      uturn();
      utils.turn(car, coord_5, 'west', 'south');

    } else if (userInput.case === 5) {

      utils.turn(car, coord_3, 'east', 'south');
      utils.turn(car, coord_5, 'south', 'east');
      uturn();
      utils.turn(car, coord_5, 'west', 'north');
      utils.turn(car, coord_3, 'north', 'east');

    } else if (userInput.case === 6) {

      utils.turn(car, coord_3, 'east', 'south');
      utils.turn(car, coord_5, 'south', 'east');
      uturn();
      utils.turn(car, coord_5, 'west', 'north');

    } else if (userInput.case === 7) {

      utils.turn(car, coord_3, 'east', 'south');
      utils.turn(car, coord_5, 'south', 'east');
      uturn();
      utils.turn(car, coord_5, 'west', 'north');
      utils.turn(car, coord_1, 'north', 'west');

    } else if (userInput.case === 8) {

      utils.turn(car, coord_3, 'east', 'north');

    } else if (userInput.case === 9) {

      utils.turn(car, coord_3, 'east', 'north');
      utils.turn(car, coord_1, 'north', 'west');

    }

  }

  function render() {
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
    // Appearace
    sensors.left = game.add.sprite(startingX, startingY, 'leftSensor')
    sensors.right = game.add.sprite(startingX, startingY, 'rightSensor')
    sensors.front = game.add.sprite(startingX, startingY, 'frontSensor')
    sensors.back = game.add.sprite(startingX, startingY, 'backSensor')

    for (var sensor in sensors) {
      sensors[sensor].alpha = .1;
      sensors[sensor].anchor.setTo(.5, .5);
      sensors[sensor].scale.setTo(0.4);
    }
  }

  function enableSensors() {
    
    for (var sensor in sensors) {
      sensors[sensor].angle = car.body.angle;
      sensors[sensor].alpha = .3;
    }

    sensors.front.y = (-30 * Math.sin(convertAngle(car.body.angle + 90 * 0))) + car.body.y;
    sensors.front.x = (30 * Math.cos(convertAngle(car.body.angle + 90 * 0))) + car.body.x;

    sensors.right.y = (-15 * Math.sin(convertAngle(car.body.angle + 90 * 1))) + car.body.y;
    sensors.right.x = (15 * Math.cos(convertAngle(car.body.angle + 90 * 1))) + car.body.x;

    sensors.back.y = (-22 * Math.sin(convertAngle(car.body.angle + 90 * 2))) + car.body.y;
    sensors.back.x = (22 * Math.cos(convertAngle(car.body.angle + 90 * 2))) + car.body.x;

    sensors.left.y = (-15 * Math.sin(convertAngle(car.body.angle + 90 * 3))) + car.body.y;
    sensors.left.x = (15 * Math.cos(convertAngle(car.body.angle + 90 * 3))) + car.body.x;

    /*
    ** In every frame of the game, examine every collision body (tile) and check if
    ** any of its corners are inside the sensor area. This serves as a listener to
    ** detect overlapping between a sensor and collision bodies. If an overlap is
    ** detected, set the variable overlap to true.
    */
    collisionBodies.forEach(function(body) {
      for (var sensor in sensors) {
        if (sensors[sensor].getBounds().contains(body.x, body.y)
        || sensors[sensor].getBounds().contains(body.x + 16, body.y)
        || sensors[sensor].getBounds().contains(body.x, body.y + 16)
        || sensors[sensor].getBounds().contains(body.x + 16, body.y + 16)) {
          sensors[sensor].alpha = 1.0;
        }
      }
    });
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

  function uturn() { // HARDCODED ONLY FOR THIS LEVEL
    // obstacle collision at [380, 558]... hardcoding a u-turn animation
    if (car.body.x > 345 && car.body.y > 520 && car.body.angle > 80) {
      car.body.angle = 75;
    } else if (car.body.x > 345 && car.body.y > 520 && car.body.angle > 45) {
      car.body.angle = 45;
    } else if (car.body.x > 345 && car.body.y > 520 && car.body.angle > 25) {
      car.body.angle = 25;
    } else if (car.body.x > 345 && car.body.y > 520 && car.body.angle > 5) {
      car.body.angle = 0;
    } else if (car.body.x > 345 && car.body.y > 520 && car.body.angle > -35) {
      car.body.angle = -35;
    } else if (car.body.x > 345 && car.body.y > 520 && car.body.angle > -55 ) {
      car.body.angle = -55;
    } else if (car.body.x > 345 && car.body.y > 520 && car.body.angle > -75 ) {
      car.body.angle = -75;
    } else if (car.body.x > 345 && car.body.y > 520 && car.body.angle > -90 ) {
      car.body.angle = -90;
      car.body.x = 360;
      car.body.y = 515;
    }
  }

}

module.exports = createGame;
