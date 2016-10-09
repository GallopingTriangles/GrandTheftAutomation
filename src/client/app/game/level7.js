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
    case: 1, // success, LEFT turn followed by RIGHT turn to complete the level
    // case: 2, // fail, didn't enable the engine
    // case: 3, // fail, drove STRAIGHT through the FIRST intersection and crashed
    // case: 4, // fail, turned LEFT at FIRST intersection but drove STRAIGHT through the SECOND intersection and crashed
    // case: 5, // fail, turned RIGHT at FIRST intersection and crashed
    // case: 6, // EASTER EGG SUCCESS, turned LEFT at the SECOND intersection into the park and then turned RIGHT on the path
    // case: 7, // EASTER EGG FAIL, turned LEFT at the SECOND intersection into the park and then crashed STRAIGHT
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

    game.load.tilemap('level_7', './assets/gameMaps/level_7.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('GTA_tileset', './assets/gameMaps/GTA_tileset.png');
  }

  var car;
  // var cursors;
  var text;

  var sensors = {};
  sensors.left = 'hello';
  sensors.right = 'hello';
  sensors.front = 'hello';
  sensors.back = 'hello';

  var startingX = 40;
  var startingY = 470;
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

  // var endZoneBodies;

  var completionTiles;

  var intersectionTiles_1;
  var coord_1; // the (x,y) coordinate of the center of the intersectionTiles_1
  var intersectionTiles_2;
  var coord_2;

  var layer_1;
  var layer_2;
  var layer_3;
  var layer_4;
  var layer_5;
  var layer_6;
  var layer_7;

  function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);

    map = game.add.tilemap('level_7');
    map.addTilesetImage('GTA_tileset');

    layer_2 = map.createLayer('road_layer');
    layer_3 = map.createLayer('building_layer');
    layer_4 = map.createLayer('street_stuff_layer');
    layer_5 = map.createLayer('end_zone_layer');
    layer_6 = map.createLayer('intersection_UL_layer');
    layer_7 = map.createLayer('intersection_DR_layer');

    layer_1 = map.createLayer('collision_layer');

    map.setCollisionBetween(0, 2000, true, 'collision_layer');

    collisionBodies = game.physics.p2.convertTilemap(map, layer_1, true, false);

    completionTiles = layer_5.getTiles(0, 0, 2000, 2000).filter(function(tile) { // array of tiles of the completion zone
      return tile.index > 0;
    });

    intersectionTiles_1 = layer_6.getTiles(0, 0, 2000, 2000).filter(function(tile) { // array of tiles for the first intersection
      return tile.index > 0;
    })
    intersectionTiles_2 = layer_7.getTiles(0, 0, 2000, 2000).filter(function(tile) { // array of tiles for the second intersection
      return tile.index > 0;
    })

    if (FAKE_USER_INPUT.sensor) { // create the sensors if the use has enabled them
      createSensors();
    }
    createCar();
    // setSpeed();

    carCollisionGroup = game.physics.p2.createCollisionGroup();
    obstacleCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();
    car.body.setCollisionGroup(carCollisionGroup);

    collisionBodies.forEach(function(collisionBody) {
      collisionBody.setCollisionGroup(obstacleCollisionGroup);
      collisionBody.collides([carCollisionGroup, obstacleCollisionGroup]);
    })

    car.body.collides(obstacleCollisionGroup, gameOver, this);

    // cursors = game.input.keyboard.createCursorKeys();
    coord_1 = intersectionCenter(intersectionTiles_1); // pixel center of the first intersection
    coord_2 = intersectionCenter(intersectionTiles_2); // pixel center of the second intersection
  }

  function update() {

    if (userInput.sensor) {

      attachSensors(0, 100, sensors);

      var overlap = false;
      collisionBodies.forEach(function(body) {
        for (var sensor in sensors) {
          if (sensors[sensor].getBounds().contains(body.x, body.y)
          || sensors[sensor].getBounds().contains(body.x + 32, body.y)
          || sensors[sensor].getBounds().contains(body.x, body.y + 32)
          || sensors[sensor].getBounds().contains(body.x + 32, body.y + 32)) {
            overlap = true;
          }
        }
      })

      // if (overlap) {
      //   sensor.alpha = 0.7;
      // } else {
      //   sensor.alpha = 0.1;
      // }
    }

    if (FAKE_USER_INPUT.case === 1) {
      car.body.moveForward(speed);
      if (Math.abs(coord_1[0] + 65 - car.body.x) < 30 && Math.abs(coord_1[1] + 45 - car.body.y) < 30) {
        car.body.angle = 0;
      }
      if (Math.abs(coord_2[0] + 45 - car.body.x) < 30 && Math.abs(coord_2[1] + 30 - car.body.y) < 30) {
        car.body.angle = 90;
      }
      checkCompletion();
    } else if (FAKE_USER_INPUT.case === 2) {
      car.body.velocity.x = 0;
      car.body.velocity.y = 0;
    } else if (FAKE_USER_INPUT.case === 3) {
      car.body.moveForward(speed);
    } else if (FAKE_USER_INPUT.case === 4) {
      car.body.moveForward(speed);
      if (Math.abs(coord_1[0] + 65 - car.body.x) < 30 && Math.abs(coord_1[1] + 45 - car.body.y) < 30) {
        car.body.angle = 0;
      }
    } else if (FAKE_USER_INPUT.case === 5) {
      car.body.moveForward(speed);
      if (Math.abs(coord_1[0] + 65 - car.body.x) < 30 && Math.abs(coord_1[1] + 45 - car.body.y) < 30) {
        car.body.angle = 180;
      }
    } else if (FAKE_USER_INPUT.case === 6) {
      car.body.moveForward(speed);
      if (Math.abs(coord_1[0] + 65 - car.body.x) < 30 && Math.abs(coord_1[1] + 45 - car.body.y) < 30) {
        car.body.angle = 0;
      }
      if (Math.abs(coord_2[0] + 45 - car.body.x) < 30 && Math.abs(coord_2[1] + 30 - car.body.y) < 30) {
        car.body.angle = -90;
      }
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
    car.scale.setTo(carScale);

    game.physics.p2.enable(car);
    car.body.setRectangle(car.width, car.height);
    car.body.collideWorldBounds = true;
    car.body.angle = 90;
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

  // function setSpeed() {
  //   if (userInput.speed) {
  //     carForwardSpeed = userInput.speed * userSpeedMultiplier;
  //     carBackwardSpeed = carForwardSpeed * forwardReverseMultiplier;
  //   }
  // }

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
  }

  function intersectionCenter(tiles) {
    // returns the center (x,y) pixel of an intersection layer
    var x = 0;
    var y = 0;
    tiles.forEach(function(tile) {
      x += tile.worldX;
      y += tile.worldY;
    })
    x = x / tiles.length;
    y = y / tiles.length;

    return [x, y];
  }
}

module.exports = createGame;
