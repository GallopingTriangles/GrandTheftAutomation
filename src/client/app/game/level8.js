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
    case: 1, // success, the upper route ([LEFT, RIGHT, RIGHT, LEFT])
    // case: 2, // success, the lower route ([RIGHT, LEFT, LEFT, RIGHT])
    // case: 3, // fail, didn't enable the engine
    // case: 4, // fail, drove STRAIGHT through the FIRST intersection and crashed ([STRAIGHT])
    // case: 5, // fail, turned LEFT then STRAIGHT and crashed ([LEFT, STRAIGHT])
    // case: 6, // fail, ([LEFT, LEFT])
    // case: 7, // fail, ([LEFT, RIGHT, STRAIGHT])
    // case: 8, // fail, ([LEFT, RIGHT, LEFT])
    // case: 9, // fail, ([LEFT, RIGHT, RIGHT, STRAIGHT])
    // case: 10, // fail, ([LEFT, RIGHT, RIGHT, RIGHT])
    // case: 11, // fail, ([RIGHT, STRAIGHT])
    // case: 12, // fail, ([RIGHT, RIGHT])
    // case: 13, // fail, ([RIGHT, LEFT, STRAIGHT])
    // case: 14, // fail, ([RIGHT, LEFT, RIGHT])
    // case: 15, // fail, ([RIGHT, LEFT, LEFT, STRAIGHT])
    // case: 16, // fail, ([RIGHT, LEFT, LEFT, LEFT])
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

    game.load.tilemap('level_8', './assets/gameMaps_v2/level_8.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('GTA_tileset_16', './assets/gameMaps_v2/GTA_tileset_16.png');
  }

  var car;
  // var cursors;
  var text;

  var sensors = {};
  // These must be declared in this order. We iterate through them later.
  sensors.front = {};
  sensors.right = {};
  sensors.back = {};
  sensors.left = {};
  
  var startingX = 40;
  var startingY = 365;
  var startingAngle = 90;
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

    map = game.add.tilemap('level_8');
    map.addTilesetImage('GTA_tileset_16');

    layer_5 = map.createLayer('end_zone_layer');
    layer_6 = map.createLayer('intersection_UDL_layer');
    layer_7 = map.createLayer('intersection_DR_layer');
    layer_8 = map.createLayer('intersection_DL_layer');
    layer_9 = map.createLayer('intersection_UR_layer');
    layer_10 = map.createLayer('intersection_UL_layer');
    layer_11 = map.createLayer('intersection_UDR_layer');

    layer_1 = map.createLayer('collision_layer');
    layer_2 = map.createLayer('road_layer');
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

    coord_1 = intersectionCenter(intersectionTiles_1); //
    coord_2 = intersectionCenter(intersectionTiles_2); //
    coord_3 = intersectionCenter(intersectionTiles_3); //
    coord_4 = intersectionCenter(intersectionTiles_4); //
    coord_5 = intersectionCenter(intersectionTiles_5); //
    coord_6 = intersectionCenter(intersectionTiles_6); //
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
    }

    if (FAKE_USER_INPUT.case === 3) {
      car.body.velocity.x = 0;
      car.body.velocity.y = 0;
    } else {
      car.body.moveForward(speed);
    }

    if (FAKE_USER_INPUT.case === 1
      || FAKE_USER_INPUT.case === 5
      || FAKE_USER_INPUT.case === 6
      || FAKE_USER_INPUT.case === 7
      || FAKE_USER_INPUT.case === 8
      || FAKE_USER_INPUT.case === 9
      || FAKE_USER_INPUT.case === 10) { // handle all upper route cases
      car.body.moveForward(speed);
      if (Math.abs(coord_1[0] + 32 - car.body.x) < 10) {
        turn('north');
      }
      if (FAKE_USER_INPUT.case === 6) {
        if (Math.abs(coord_2[1] - 20 - car.body.y) < 10) {
          turn('west');
        }
      } else if (FAKE_USER_INPUT.case !== 5) {
        if (Math.abs(coord_2[1] + 25 - car.body.y) < 10) {
          turn('east');
        }
        if (FAKE_USER_INPUT.case === 8) {
          if (Math.abs(coord_3[0] + 40 - car.body.x) < 10) {
            turn('north');
          }
        } else if (FAKE_USER_INPUT.case === 9
          || FAKE_USER_INPUT.case === 10
          || FAKE_USER_INPUT.case === 1) {
          if (Math.abs(coord_3[0] - 10 - car.body.x) < 10) {
            turn('south');
          }
          if (FAKE_USER_INPUT.case === 10) {
            if (Math.abs(coord_6[1] - 10 - car.body.y) < 10 && Math.abs(coord_6[0] - car.body.x) < 150) {
              turn('west');
            }
          } else if (FAKE_USER_INPUT.case === 1) {
            if (Math.abs(coord_6[1] + 25 - car.body.y) < 10 && Math.abs(coord_6[0] - car.body.x) < 150) {
              turn('east');
            }
            checkCompletion();
          }
        }
      }
    } else if (FAKE_USER_INPUT.case === 2
      || FAKE_USER_INPUT.case === 11
      || FAKE_USER_INPUT.case === 12
      || FAKE_USER_INPUT.case === 13
      || FAKE_USER_INPUT.case === 14
      || FAKE_USER_INPUT.case === 15
      || FAKE_USER_INPUT.case === 16) {
      car.body.moveForward(speed);
      if (Math.abs(coord_1[0] - 10 - car.body.x) < 10) {
        turn('south');
      }
      if (FAKE_USER_INPUT.case === 12) {
        if (Math.abs(coord_4[1] - 15 - car.body.y) < 10) {
          turn('west');
        }
      } else if (FAKE_USER_INPUT.case !== 11) {
        if (Math.abs(coord_4[1] + 28 - car.body.y) < 10) {
          turn('east');
        }
        if (FAKE_USER_INPUT.case === 14) {
          if (Math.abs(coord_5[0] - 20 - car.body.x) < 10) {
            turn('south');
          }
        } else if (FAKE_USER_INPUT.case !== 13) {
          if (Math.abs(coord_5[0] + 30 - car.body.x) < 10) {
            turn('north');
          }
          if (FAKE_USER_INPUT.case === 16) {
            if (Math.abs(coord_6[1] - 20 - car.body.y) < 10 && Math.abs(coord_6[0] - car.body.x) < 150) {
              turn('west');
            }
          } else if (FAKE_USER_INPUT.case === 2) {
            if (Math.abs(coord_6[1] + 30 - car.body.y) < 10 && Math.abs(coord_6[0] - car.body.x) < 150) {
              turn('east');
            }
            checkCompletion();
          }
        }
      }
    }

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
    setTimeout(() => {
      game.paused = true;
    }, 3000)
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
