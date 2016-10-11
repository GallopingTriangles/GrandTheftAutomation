var createGame = (userInput) => {
  /* debugTools */
  // userInput.case = 2;

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
    case: 1, // success right turn
    // case: 2, // fail, car did not start engine
    // case: 3, // fail, crashed straight
    // case: 4, // fail, crash left
    // case: 5, // fail, stalls at intersection
  }
  /**********************************************************/
  /**********************************************************/

  // change width depends on window width, no dynamically resizing yet
  var width = window.innerWidth;
  var height = window.innerHeight;
  var gameWidth = width * (7 / 12) - 10;
  var gameHeight = gameWidth * (6 / 8);

  var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser_game', { preload: preload, create: create, update: update, render: render });

  /*
  ** The preload() function runs before the game initially renders.
  ** It loads up all the necessary assets the game needs while running
  */
  function preload() {
    setCarColor();
    game.load.image('wasted', './assets/wasted.png');
    game.load.image('panda', './assets/panda.png');
    game.load.image('grass', './assets/grass.jpg');
    game.load.image('sensor', './assets/round.png');

    /*
    ** A spritesheet contains a bunch of frames stitched together to create an animation effect
    */
    game.load.spritesheet('explosion', './assets/explosion.png', 256, 256, 48);

    /*
    ** Tilemap is the json file that contains the tile IDs of every tile in each map layer.
    ** It sets up the map. The tile IDs correspond to the tile in a loaded image through addTilesetImage()
    */
    game.load.tilemap('level_3', './assets/gameMaps_v2/level_3.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('GTA_tileset', './assets/gameMaps_v2/GTA_tileset.png');
  }

  var car;
  // var obstacles;
  var cursors;
  var text;

  /* needsChange */

  var sensors = {};
  sensors.left = 'hello';
  sensors.right = 'hello';
  sensors.front = 'hello';
  sensors.back = 'hello';


  var startingX = 280;
  var startingY = 550;
  var backgroundColor = '#3e5f96';
  var carForwardSpeed = 200;
  var carBackwardSpeed = 100;
  var carScale = .5;
  var forwardReverseMultiplier = 1 / 2;
  var userSpeedMultiplier = 4;
  var explosion;
  var wasted;

  /* debugTools */
  var intersection = false;


  var map;
  var collisionLayer;
  var carCollisionGroup;
  var obstacleCollisionGroup;

  /*
  ** An array of collision bodies that the car can collide with.
  ** A callback will be invoked upon collisions.
  */
  var collisionBodies;

  /*
  ** An array of endZone bodies that will trigger a success callback
  ** when the car hits them, and the level is considered completed.
  */
  // var endZoneBodies;

  var completionTiles;

  var intersectionTiles_1;
  var coord_1; // the (x,y) coordinate of the center of the intersectionTiles_1
  
  /*
  ** The layers that correspond to the tile layers exported in the JSON tilemap file.
  ** These will be set in the create() function.
  ** layer_1 contains the tiles to be set in collisionBodies that are collideable with the player
  */
  var layer_1;
  var layer_2;
  var layer_3;
  var layer_4;
  var layer_5;
  var layer_6;

  /*
  ** The create() function is called automatically after preload() has finished.
  ** Sprite, particles, and most everything else can be created here that has access to
  ** the assets initialized from the preload(). The create() function contains the bulk
  ** of the set-up code, such as creating game objects.
  */
  function create() {
    /*
    ** Set the initial state and physics engine for the game.
    ** Enable impact event handling before any impact events are dispatched.
    */
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);

    /*
    ** Set the tilemap for the game, which creates a grid system.
    ** Tiles can be added on top in different layers,
    ** and collisions can be specific for certain tiles in certain layers.
    ** http://phaser.io/docs/2.6.2/Phaser.Tilemap.html#addTilesetImage
    */
    map = game.add.tilemap('level_3');
    map.addTilesetImage('GTA_tileset');

    // map = game.add.tilemap('map');
    // map.addTilesetImage('tmw_desert_spacing');

    /*
    ** Set the layers and their respective tile IDs for collision.
    ** Needs to be done before generating the p2 bodies below.
    ** The layer names must correspond to the layers from the JSON tilemap file
    */
    layer_2 = map.createLayer('road_layer');
    layer_3 = map.createLayer('building_layer');
    layer_4 = map.createLayer('street_stuff_layer');
    layer_5 = map.createLayer('end_zone_layer');
    layer_6 = map.createLayer('intersection_R_layer');

    layer_1 = map.createLayer('collision_layer');

    /*
    ** Set the appropriate tiles of a certain layer to be collideable
    ** http://phaser.io/docs/2.6.2/Phaser.Tilemap.html#setCollision
    */

    /* debugTools */
    map.setCollisionBetween(0, 2000, true, 'collision_layer');
    // map.setCollision(34, true, 'Tile Layer 1');

    // map.setCollisionBetween(0, 2000, true, 'end_zone_layer');

    /*
    ** Convert the collision-enabled tile layer into Phaser p2 bodies. Only tiles
    ** that collide are created. This returns an array of body objects that can be
    ** controlled by additional actions.
    ** http://phaser.io/docs/2.6.2/Phaser.Physics.P2.html#convertTilemap
    */
    collisionBodies = game.physics.p2.convertTilemap(map, layer_1, true, false);

    /*
    ** Convert the endZoneBodies into Phaser p2 bodies so the game can detect when
    ** the car has entered any of these tiles, which will be interpreted as a level completion.
    */
    // endZoneBodies = game.physics.p2.convertTilemap(map, layer_5, true, false);
    // console.log(endZoneBodies);

    completionTiles = layer_5.getTiles(0, 0, 2000, 2000).filter(function(tile) {
      return tile.index > 0;
    });

    intersectionTiles_1 = layer_6.getTiles(0, 0, 2000, 2000).filter(function(tile) {
      return tile.index > 0;
    })

    /*
    ** Gather all tiles from layer_1 into an array of tiles,
    ** and assign a callback function to when these tiles are hit by anything.
    */
    // collisionTiles = layer_1.getTiles(0, 0, 800, 600).filter(function(tile) {
    //   return tile.index > 0;
    // });


    /*
    ** Initiates the car sensor, the car body, and sets the speed based on the user input
    */
    if (FAKE_USER_INPUT) {
      createSensors();
    }
    createCar();
    setSpeed();

    /*
    ** Create two collision groups. One for the car and one for everything else.
    ** A collision will be detected for items in collision groups, which will invoke a callback.
    ** Update Bounds Collision Group will allow objects to collide with the world bounds.
    */
    carCollisionGroup = game.physics.p2.createCollisionGroup();
    obstacleCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();
    car.body.setCollisionGroup(carCollisionGroup);

    /*
    ** Assign each tile from the collisionBodies into the obstacleCollisionGroup.
    ** These tiles will be set to collide with other tile bodies and the car, since
    ** the car is set to collide with objects in the obstacleCollisionGroup.
    ** http://phaser.io/docs/2.6.2/Phaser.Physics.P2.Body.html#setCollisionGroup
    */
    collisionBodies.forEach(function(collisionBody) {
      collisionBody.setCollisionGroup(obstacleCollisionGroup);
      collisionBody.collides([carCollisionGroup, obstacleCollisionGroup]);
      // collisionBody.debug = true;

    })

    /*
    ** The gameOver callback is called when a collision is detected
    ** between the car and any body in the obstacleCollisionGroup (the tiles).
    */
    car.body.collides(obstacleCollisionGroup, gameOver, this);


    /*
    ** Enables the user to have control over the car through their cursor keys
    */
    cursors = game.input.keyboard.createCursorKeys();

    coord_1 = intersectionCenter(intersectionTiles_1);

  }





  function update() {
    /*
    ** Enable sensor functionality if the user has activated the car sensor.
    ** If the sensor detects any overlapping collision bodies, it will turn on.
    */


    if (userInput.sensor) {

      attachSensors(0, 100, sensors);

      /*
      ** In every frame of the game, examine every collision body (tile) and check if
      ** any of its corners are inside the sensor area. This serves as a listener to
      ** detect overlapping between a sensor and collision bodies. If an overlap is
      ** detected, set the variable overlap to true.
      */
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

      /*
      ** Increase the opacity of the sensor while a collision body is in its area.
      */
      // if (overlap) {
      //   sensor.alpha = 1;
      // } else {
      //   sensor.alpha = 0.1;
      // }
    }

    /* debugTools */
    // THIS MUST BE HERE FOR TURNS TO RENDER SMOOTHLY
    car.body.velocity.x = 0;
    car.body.velocity.y = 0;
    car.body.angularVelocity = 0;
    // if (userInput.engine) {
    //   if (cursors.up.isDown) {
    //     car.body.moveForward(carForwardSpeed);
    //     leftRight(true);
    //   } else if (cursors.down.isDown) {
    //     car.body.moveBackward(carBackwardSpeed);
    //     leftRight(false);
    //   }
    // }

    /*
    ** The car should remain still if no arrow keys are pressed for early levels.
    ** This resets the car's velocity per frame.
    */
    checkCompletion();



    /******************************************************/
    /** TEMPORARILIY COMMENTED OUT TO GET MVP CASES DONE **/
    /******************************************************/
    /******************************************************/
    // if (userInput.case === 1) {

    // } else {
    //   car.body.moveForward(userInput.speed * userSpeedMultiplier);
    // }
    // if (userInput.case === 2) {
    //   turnRight(180, car.body.y < 244);
    // } else if (userInput.case === 3) {
    //   turnLeft(-90, car.body.y < 164)
    // }
    /******************************************************/
    /******************************************************/
    /** TEMPORARILIY COMMENTED OUT TO GET MVP CASES DONE **/
    /******************************************************/

    if (FAKE_USER_INPUT.case === 1) {
      car.body.moveForward(400);
      if (Math.abs(coord_1[0] + 32 - car.body.x) < 30 && Math.abs(coord_1[1] + 30 - car.body.y) < 30) {
        car.body.angle = 90;
      }
      checkCompletion();
    } else if (FAKE_USER_INPUT.case === 2) {
      car.body.velocity.x = 0;
      car.body.velocity.y = 0;
    } else if (FAKE_USER_INPUT.case === 3) { 
      car.body.moveForward(400);
    } else if (FAKE_USER_INPUT.case === 4) {
      car.body.moveForward(400);
      if (Math.abs(coord_1[0] + 32 - car.body.x) < 30 && Math.abs(coord_1[1] - 40 - car.body.y) < 30) {
        car.body.angle = -90;
      }
    } else if (FAKE_USER_INPUT.case === 5) {
      car.body.moveForward(400);
      if (Math.abs(coord_1[0] + 32 - car.body.x) < 30 && Math.abs(coord_1[1] + 30 - car.body.y) < 30) {
        car.body.velocity.x = 0;
        car.body.velocity.y = 0;
      }
    }

  }

  function render() {
    // game.debug.spriteInfo(car, 32, 32);
    // car.body.debug = true;

  }

  /******* HELPER FUNCTIONS **********************/
  /*********** HELPER FUNCTIONS ******************/
  /*************** HELPER FUNCTIONS **************/
  /******************* HELPER FUNCTIONS **********/

  /*
  ** Generates the car as a Phaser sprite object. Enable it to be a Phaser body object.
  ** Sets a rectangle to the size of the car to interpret collisions.
  ** Initialize the starting coordinates to match up with the sensor's coordinates.
  */
  function createCar() {
    // Appearance
    car = game.add.sprite(startingX, startingY, 'car');
    car.anchor.setTo(.3, .5);
    car.scale.setTo(carScale);

    // Physics
    game.physics.p2.enable(car);
    car.body.setRectangle(car.width, car.height);
    car.body.collideWorldBounds = true;
    /* debugTools */
    // if (userInput.engine) {
    //   car.body.moveForward(userInput.speed * userSpeedMultiplier);
    // }
  }

  /*
  ** Determine which image to load as the car sprite, based on user input.
  */
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

  /*
  ** Dictates which direction the car should rotate based on if the car
  ** is moving in a forward or reverse direction.
  */
  function leftRight(forward) {
    var angularVelocity;

    if (forward) {
      angularVelocity = carForwardSpeed / 3;
    } else {
      angularVelocity = -carBackwardSpeed / 3;
    }

    if (cursors.left.isDown) {
      car.body.rotateLeft(angularVelocity)
    } else if (cursors.right.isDown) {
      car.body.rotateRight(angularVelocity);
    }
  }

  function degToRad(num) {
    return num * (Math.PI / 180);
  }

  function convertAngle(angle) {
    return degToRad(90 - angle)
  }


  /* needsChange */

  function createSensors() {
    // Check to make sure the user has turned the sensor on
    if (userInput.sensor) {
      // Appearace
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

  /*
  ** If the user has declared a speed:
  ** Set the car's speed appropriately.
  */
  function setSpeed() {
    if (userInput.speed) {
      carForwardSpeed = userInput.speed * userSpeedMultiplier;
      carBackwardSpeed = carForwardSpeed * forwardReverseMultiplier;
    }
  }

  /*
  ** Checks if the bounds of the car ever overlap with the tiles of the
  ** completion layer. If so, pause the game and render the level completion.
  */
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

  /*
  ** Called when the car collides with a collision body (tile)
  ** The car gloriously bursts into flames while the classic WASTED
  ** text renders onto the screen. Pure awesomeness.
  ** How it's done: remove the car from the game, and add the explosion
  ** spritesheet. Animate it by going through the frames of the spritesheet.
  */
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

  function turnRight(endingAngle, intersection) {
    if (intersection) {
      if (car.body.angle < endingAngle) {
        car.body.moveForward(userInput.speed * 4);
        car.body.rotateRight(userInput.speed * 4 / 3);
      } else {
        car.body.angle = endingAngle;
      }
    }
  }

  function turnLeft(endingAngle, intersection) {
    if (intersection) {
      if (car.body.angle > endingAngle) {
        car.body.moveForward(userInput.speed * 4);
        car.body.rotateLeft(userInput.speed * 4 / 3);
      } else {
        car.body.angle = endingAngle;
      }
    }
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
