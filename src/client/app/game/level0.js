var createGame = (userInput) => {
  /**********************************************************/
  /**********************************************************/
  /********* SAMPLE USER INPUT TO BASE THIS OFF OF **********/
  /**** REMOVE LATER AFTER WE GET THE REAL INPUT FROM VM ****/
  /**********************************************************/
  /**********************************************************/
  /*
  var FAKE_USER_INPUT = {
    color: 'panda',
    speed: 100,
    sensor: true,
    //* *** NO CASES???
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

    game.load.tilemap('level_0', './assets/gameMaps_v2/level_0.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('GTA_tileset', './assets/gameMaps_v2/GTA_tileset.png');
  }

  var car;
  var cursors;
  var text;

  var sensors = {};
  sensors.left = 'hello';
  sensors.right = 'hello';
  sensors.front = 'hello';
  sensors.back = 'hello';

  var speed = userInput.speed ? userInput.speed * 4 : 0;
  var startingX = 100;
  var startingY = 300;
  var backgroundColor = '#3e5f96';
  var carScale = 0.6;
  var explosion;
  var wasted;


  var map;
  var collisionLayer;
  var carCollisionGroup;
  var obstacleCollisionGroup;

  /*
  ** An array of collision bodies that the car can collide with.
  ** A callback will be invoked upon collisions.
  */
  var collisionBodies;

  var completionTiles;

  //////////////// /*
  //////////////// ** An array of tiles from a tilemap layer that should contain collideable tiles
  //////////////// */
  //////////////// var collisionTiles;




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

  /*************************************** OLD STUFF *************************************/
  /*************************************** OLD STUFF *************************************/
  /*************************************** OLD STUFF *************************************/
  /*************************************** OLD STUFF *************************************/

  ///////////////// function create() {
  /////////////////   // Set initial state of the game
  /////////////////   game.physics.startSystem(Phaser.Physics.P2JS);
  /////////////////   game.physics.p2.setImpactEvents(true);
  /////////////////   game.stage.backgroundColor = backgroundColor;


  /////////////////   if (userInput.engine) {
  /////////////////     cursors = game.input.keyboard.createCursorKeys();
  /////////////////   }

  /////////////////   createSensor();
  /////////////////   createCar();
  /////////////////   setSpeed();

  /////////////////   carCollisionGroup = game.physics.p2.createCollisionGroup();
  /////////////////   obstacleCollisionGroup = game.physics.p2.createCollisionGroup();

  /////////////////   game.physics.p2.updateBoundsCollisionGroup();
  /////////////////   car.body.setCollisionGroup(carCollisionGroup);

  /////////////////   obstacles = game.add.group();
  /////////////////   obstacles.enableBody = true;
  /////////////////   obstacles.physicsBodyType = Phaser.Physics.P2JS;

  /////////////////   for (var i = 0; i < 3; i++) {
  /////////////////     // create an obstacle
  /////////////////     var obstacle = obstacles.create(300, 50+200*i, 'grass');
  /////////////////     obstacle.scale.setTo(0.1, 0.1);
  /////////////////     obstacle.body.setRectangle(obstacle.width, obstacle.height);
  /////////////////     // assign a collision group to the obstacles
  /////////////////     obstacle.body.setCollisionGroup(obstacleCollisionGroup);
  /////////////////     obstacle.body.collides([carCollisionGroup, obstacleCollisionGroup]);
  /////////////////     obstacle.body.static = true;
  /////////////////   }

  /////////////////   car.body.collides(obstacleCollisionGroup, gameOver, this);

  /////////////////   text = game.add.text(16, 16, 'Move the car. Sensor overlap: false', { fill: '#ffffff' });


  ///////////////// }

  /*************************************** OLD STUFF *************************************/
  /*************************************** OLD STUFF *************************************/
  /*************************************** OLD STUFF *************************************/
  /*************************************** OLD STUFF *************************************/


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
    map = game.add.tilemap('level_0');
    map.addTilesetImage('GTA_tileset');

    // map = game.add.tilemap('map');
    // map.addTilesetImage('tmw_desert_spacing');

    /*
    ** Set the layers and their respective tile IDs for collision.
    ** Needs to be done before generating the p2 bodies below.
    ** The layer names must correspond to the layers from the JSON tilemap file
    */
    layer_2 = map.createLayer('road_layer');
    layer_5 = map.createLayer('end_zone_layer');
    layer_6 = map.createLayer('intersection_layer');
    layer_1 = map.createLayer('collision_layer');
    layer_4 = map.createLayer('street_stuff_layer');
    layer_3 = map.createLayer('building_layer');

    // layer_1 = map.createLayer('Tile Layer 1');
    // layer_2 = map.createLayer('Tile Layer 2');

    /*
    ** Set the appropriate tiles of a certain layer to be collideable
    ** http://phaser.io/docs/2.6.2/Phaser.Tilemap.html#setCollision
    */
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

    completionTiles = layer_5.getTiles(0, 0, 1000, 1000).filter(function(tile) {
      return tile.index > 0;
    });

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
    if (userInput.sensor) {
      createSensors();
    }
    createCar();
    // setSpeed();


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

  }





  function update() {

    /*
    ** Enable sensor functionality if the user has activated the car sensor.
    ** If the sensor detects any overlapping collision bodies, it will turn on.
    */
    if (userInput.sensor) {
      enableSensors();
    };

    /*
    ** The car should remain still if no arrow keys are pressed for early levels.
    ** This resets the car's velocity per frame.
    */
    car.body.velocity.x = 0;
    car.body.velocity.y = 0;
    car.body.angularVelocity = 0;
    if (userInput.engine) {

      // checkCompletion();

      if (cursors.up.isDown) {
        car.body.moveForward(speed);
        leftRight(true);
      } else if (cursors.down.isDown) {
        car.body.moveBackward(speed/2);
        leftRight(false);
      }
    }

  }

  function render() {
  }

  /******* HELPER FUNCTIONS **********************/
  /*********** HELPER FUNCTIONS ******************/
  /*************** HELPER FUNCTIONS **************/
  /******************* HELPER FUNCTIONS **********/


  /**************************** NOTE ****************************/
  /* Car angle is accessed by car.body.angle                    */
  /* The angle of objects is 0 while pointing up                */
  /* The angle of objects is 180 while pointing down            */
  /* Clockwise is postive rotation, up to 180 degrees           */
  /* Counterclockwise is negative rotation, up to -180 degrees  */
  /**************************** NOTE ****************************/

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
      angularVelocity = speed / 3;
    } else {
      angularVelocity = -speed / 6;
    }

    if (cursors.left.isDown) {
      car.body.rotateLeft(angularVelocity)
    } else if (cursors.right.isDown) {
      car.body.rotateRight(angularVelocity);
    }
  }

  //////////////////// /*
  //////////////////// ** If the user has activated the sensor:
  //////////////////// ** Create the sensor around the car as a sprite. Scale it to an appropriate size,
  //////////////////// ** and set the anchor point at the center, so it's rotation is relative to that point.
  //////////////////// ** Initialize the starting coordinates to match up with the car's coordinates.
  //////////////////// */
  //////////////////// function createSensor() {
  ////////////////////   if (userInput.sensor) {
  ////////////////////     sensor = game.add.sprite(startingX, startingY, 'sensor');
  ////////////////////     sensor.scale.setTo(.25, .25);
  ////////////////////     game.physics.p2.enable(sensor);
  ////////////////////     sensor.alpha = .1;
  ////////////////////     sensor.anchor.setTo(.5, .5);
  ////////////////////   }
  //////////////////// }

  //////////////////// /*
  //////////////////// ** Attaches a sensor to the coordinate location of the car.
  //////////////////// */
  //////////////////// function attachSensor(sensor, carX, carY, carAngle) {
  ////////////////////   sensor.body.x = carX;
  ////////////////////   sensor.body.y = carY;
  ////////////////////   sensor.body.angle = carAngle;
  //////////////////// }


  function degToRad(num) {
    return num * (Math.PI / 180);
  }

  function convertAngle(angle) {
    return degToRad(90 - angle)
  }


  /* needsChange */

  // function createSensors() {
  //   // Check to make sure the user has turned the sensor on
  //   if (userInput.sensor) {
  //     // Appearace
  //     for (var sensor in sensors) {
  //       sensors[sensor] = game.add.sprite(startingX, startingY, 'sensor')
  //       sensors[sensor].alpha = .1;
  //       sensors[sensor].anchor.setTo(.5, .5);
  //       sensors[sensor].scale.setTo(.5, .5);

  //     }
  //   }
  // }

  // function attachSensors(startingAngle, offset, FLBRArray) {
  //   var index = 0;
  //   for (var sensor in sensors) {
  //     sensors[sensor].angle = car.body.angle;
  //     sensors[sensor].y = (-offset * Math.sin(convertAngle(car.body.angle + 90 * index))) + car.body.y;
  //     sensors[sensor].x = (offset * Math.cos(convertAngle(car.body.angle + 90 * index))) + car.body.x;
  //     index += 1;
  //   }
  // }

  function createSensors() {
    // Appearace
    sensors.left = game.add.sprite(startingX, startingY, 'leftSensor')
    sensors.right = game.add.sprite(startingX, startingY, 'rightSensor')
    sensors.front = game.add.sprite(startingX, startingY, 'frontSensor')
    sensors.back = game.add.sprite(startingX, startingY, 'backSensor')

    for (var sensor in sensors) {
      sensors[sensor].alpha = .1;
      sensors[sensor].anchor.setTo(.5, .5);
      sensors[sensor].scale.setTo(0.8);
    }
  }

  function enableSensors() {
    
    for (var sensor in sensors) {
      sensors[sensor].angle = car.body.angle;
      sensors[sensor].alpha = .3;
    }

    sensors.front.y = (-60 * Math.sin(convertAngle(car.body.angle + 90 * 0))) + car.body.y;
    sensors.front.x = (60 * Math.cos(convertAngle(car.body.angle + 90 * 0))) + car.body.x;

    sensors.right.y = (-30 * Math.sin(convertAngle(car.body.angle + 90 * 1))) + car.body.y;
    sensors.right.x = (30 * Math.cos(convertAngle(car.body.angle + 90 * 1))) + car.body.x;

    sensors.back.y = (-45 * Math.sin(convertAngle(car.body.angle + 90 * 2))) + car.body.y;
    sensors.back.x = (45 * Math.cos(convertAngle(car.body.angle + 90 * 2))) + car.body.x;

    sensors.left.y = (-30 * Math.sin(convertAngle(car.body.angle + 90 * 3))) + car.body.y;
    sensors.left.x = (30 * Math.cos(convertAngle(car.body.angle + 90 * 3))) + car.body.x;

    /*
    ** In every frame of the game, examine every collision body (tile) and check if
    ** any of its corners are inside the sensor area. This serves as a listener to
    ** detect overlapping between a sensor and collision bodies. If an overlap is
    ** detected, set the variable overlap to true.
    */
    collisionBodies.forEach(function(body) {
      for (var sensor in sensors) {
        if (sensors[sensor].getBounds().contains(body.x, body.y)
        || sensors[sensor].getBounds().contains(body.x + 32, body.y)
        || sensors[sensor].getBounds().contains(body.x, body.y + 32)
        || sensors[sensor].getBounds().contains(body.x + 32, body.y + 32)) {
          sensors[sensor].alpha = 1.0;
        }
      }
    });
  }


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
  }

  // /*
  // ** If the user has declared a speed:
  // ** Set the car's speed appropriately.
  // */
  // function setSpeed() {
  //   if (userInput.speed) {
  //     carForwardSpeed = userInput.speed * userSpeedMultiplier;
  //     carBackwardSpeed = carForwardSpeed * forwardReverseMultiplier;
  //   }
  // }

  /*
  ** Checks if the bounds of the car ever overlap with the tiles of the
  ** completion layer. If so, pause the game and render the level completion.
  */
  function checkCompletion() {
    completionTiles.forEach(function(tile) {
      if (car.getBounds().contains(tile.worldX, tile.worldY)
       || car.getBounds().contains(tile.worldX + 32, tile.worldY)
       || car.getBounds().contains(tile.worldX, tile.worldY + 32)
       || car.getBounds().contains(tile.worldX + 32, tile.worldY + 32)) {
        console.log(car.getBounds());
        var style = { font: 'bold 48px Arial', fill: '#ffffff', boundsAlignH: 'center', boundsAlignV: 'middle' };
        var text = game.add.text(400, 300, 'Success!', style);
        game.paused = true;
        console.log('COMPLETED!');

      }
    })
  }

  function levelCompleted() {

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

    setTimeout(() => {
      game.paused = true;
    }, 3000)
  }

}

module.exports = createGame;
