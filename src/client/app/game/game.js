var createGame = (userInput) => {
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
    game.load.tilemap('map', './assets/gameMaps/TestMap_1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tmw_desert_spacing', './assets/gameMaps/tmw_desert_spacing.png');

  }

  var car;
  // var obstacles;
  var cursors;
  var text;
  var sensor;
  var startingX = 400;
  var startingY = 300;
  var backgroundColor = '#3e5f96';
  var carForwardSpeed = 200;
  var carBackwardSpeed = 100;
  var carScale = .5;
  var forwardReverseMultiplier = 1 / 2;
  var userSpeedMultiplier = 4;
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

  //////////////// /*
  //////////////// ** An array of tiles from a tilemap layer that should contain collideable tiles
  //////////////// */
  //////////////// var collisionTiles;




  /*
  ** The layers that correspond to the tile layers exported in the JSON tilemap file.
  ** These will be set in the create() function.
  ** layer_1 contains the tiles to be set in collisionBodies that are collideable with the player
  ** layer_2 contains the tiles that are not collideable with the player
  */
  var layer_1;
  var layer_2;




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
    map = game.add.tilemap('map');
    map.addTilesetImage('tmw_desert_spacing');

    /*
    ** Set the layers and their respective tile IDs for collision.
    ** Needs to be done before generating the p2 bodies below.
    ** The layer names must correspond to the layers from the JSON tilemap file
    */
    layer_1 = map.createLayer('Tile Layer 1');
    layer_2 = map.createLayer('Tile Layer 2');

    /*
    ** Set the appropriate tiles of a certain layer to be collideable
    ** http://phaser.io/docs/2.6.2/Phaser.Tilemap.html#setCollision
    */
    map.setCollision(34, true, 'Tile Layer 1');

    /*
    ** Convert the collision-enabled tile layer into Phaser p2 bodies. Only tiles
    ** that collide are created. This returns an array of body objects that can be
    ** controlled by additional actions.
    ** http://phaser.io/docs/2.6.2/Phaser.Physics.P2.html#convertTilemap
    */
    collisionBodies = game.physics.p2.convertTilemap(map, layer_1, true, false);

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
    createSensor();
    createCar();
    setSpeed();
    ////////////////// if (sensor) {
    //////////////////   console.log('sensor x: ', sensor.x);
    //////////////////   console.log('sensor y: ', sensor.y);
    //////////////////   console.log('sensor.getBounds().size(): ', sensor.getBounds().size());
    //////////////////   console.log('sensor width: ', sensor.getBounds().width);
    //////////////////   console.log('sensor height: ', sensor.getBounds().height);
    //////////////////   console.log('sensor center: ', sensor.getBounds().centerX, sensor.getBounds().centerY);
    //////////////////   console.log('sensor contains: ', sensor.getBounds().contains(10, 100));
    ////////////////// }


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
      collisionBody.collides([carCollisionGroup, obstacleCollisionGroup], gameOver);
      collisionBody.static = true;
      // game.add.sprite(collisionBody.x, collisionBody.y, 'object');
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

    //////////////// if (sensor) {
    ////////////////   arr.forEach(function(rect) {
    ////////////////     console.log('sensor.getBounds(): ', sensor.getBounds());
    ////////////////     console.log(sensor.getBounds().contains(rect.centerX, rect.centerY));
    ////////////////   })

    ////////////////   collisionBodies.forEach(function(body) {
    ////////////////     if (sensor.getBounds().contains(body.x, body.y)) {
    ////////////////       game.add.sprite(body.x, body.y, 'car');
    ////////////////       console.log('hit');
    ////////////////     }
    ////////////////   })
    //////////////// }
  }





  function update() {
    /*
    ** Enable sensor functionality if the user has activated the car sensor.
    ** If the sensor detects any overlapping collision bodies, it will turn on.
    */
    if (userInput.sensor) {
      attachSensor(sensor, car.body.x, car.body.y, car.body.angle);

    //////////////// collisionBodies.forEach(function(obstacle) {

      /***************************** TODO ***********************************/
      /*                                                                    */
      /* CHECK ANY OVERLAP OVER THE COLLISION BODIES AND CHANGE TEXT/SENSOR */
      /*                                                                    */
      /***************************** TODO ***********************************/

      //////////////// if (checkOverlap(obstacle, sensor)) {
      ////////////////   overlap = true;
      //////////////// };

      //////////////// if (overlap) {
      ////////////////   text.text = 'Remind me not to let you drive.'
      ////////////////   sensor.alpha = 1;
      //////////////// } else {
      ////////////////   text.text = 'Sensors do not detect any danger.'
      ////////////////   sensor.alpha = .1;
      //////////////// }
    //////////////// });

    //////////////// collisionBodies.forEach(function(tileBody) {
    ////////////////   if (checkOverlap(sensor, tileBody)) {
    ////////////////     overlap = true;
    ////////////////   }
    //////////////// });


    //////////////// console.log(sensor.getBounds());

    //////////////// arr.forEach(function(rect) {
    ////////////////   if (checkOverlap(sensor, rect)) {
    ////////////////     overlap = true;
    ////////////////     console.log('overlap');
    ////////////////   }
    //////////////// })


    /*
    ** In every frame of the game, examine every collision body (tile) and check if
    ** any of its corners are inside the sensor area. This serves as a listener to
    ** detect overlapping between a sensor and collision bodies. If an overlap is
    ** detected, set the variable overlap to true.
    */
    var overlap = false;
    collisionBodies.forEach(function(body) {
      if (sensor.getBounds().contains(body.x, body.y)
       || sensor.getBounds().contains(body.x + 32, body.y)
       || sensor.getBounds().contains(body.x, body.y + 32)
       || sensor.getBounds().contains(body.x + 32, body.y + 32)) {
        overlap = true;
      }
    })

    /*
    ** Increase the opacity of the sensor while a collision body is in its area.
    */
    if (overlap) {
      sensor.alpha = 1;
    } else {
      sensor.alpha = 0.1;
    }
  }

    /*
    ** The car should remain still if no arrow keys are pressed for early levels.
    ** This resets the car's velocity per frame.
    */
    car.body.velocity.x = 0;
    car.body.velocity.y = 0;
    car.body.angularVelocity = 0;
    if (userInput.engine) {
      if (cursors.up.isDown) {
        car.body.moveForward(carForwardSpeed);
        leftRight(true);
      } else if (cursors.down.isDown) {
        car.body.moveBackward(carBackwardSpeed);
        leftRight(false);
      }
    }

  }

  function render() {
    /******* bugs *******/
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

  /*
  ** Attaches a sensor to the coordinate location of the car.
  */
  function attachSensor(sensor, carX, carY, carAngle) {
    sensor.body.x = carX;
    sensor.body.y = carY;
    sensor.body.angle = carAngle;
  }

  ////////////////// function checkOverlap(spriteA, spriteB) {
  //////////////////   var boundsA = spriteA.getBounds();
  //////////////////   var boundsB = spriteB.getBounds();

  //////////////////   return Phaser.Rectangle.intersects(boundsA, boundsB);
  ////////////////// }

  ////////////////// function checkOverlap(carSensor, tileBody) {
  //////////////////   return carSensor.getBounds().contains(null, tileBody.x, tileBody.y);
  ////////////////// }


  ////////////////// function checkOverlap(carSensor, rect) {
  //////////////////   return carSensor.getBounds().contains(rect.centerX, rect.centerY);
  ////////////////// }

  ////////////////// function sensorDetection(body1, body2) {
  //////////////////   if (body1.sprite && !body2.sprite) {
  //////////////////     if (body1.sprite.key === 'sensor') {
  //////////////////       console.log('hit');
  //////////////////       sensor.alpha = 1;
  //////////////////       return true;
  //////////////////     } else {
  //////////////////       console.log('NO HIT');
  //////////////////       sensor.alpha = 0.1;
  //////////////////       return true;
  //////////////////     }
  //////////////////   } else if (body2.sprite && !body1.sprite) {
  //////////////////     if (body2.sprite.key === 'sensor') {
  //////////////////       console.log('hit');
  //////////////////       sensor.alpha = 1;
  //////////////////       return true;
  //////////////////     } else {
  //////////////////       console.log('NO HIT');
  //////////////////       sensor.alpha = 0.1;
  //////////////////       return true;
  //////////////////     }
  //////////////////   } else {
  //////////////////     return false;
  //////////////////   }
  ////////////////// }


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
  ** If the user has activated the sensor:
  ** Create the sensor around the car as a sprite. Scale it to an appropriate size,
  ** and set the anchor point at the center, so it's rotation is relative to that point.
  ** Initialize the starting coordinates to match up with the car's coordinates.
  */
  function createSensor() {
    if (userInput.sensor) {
      sensor = game.add.sprite(startingX, startingY, 'sensor');
      sensor.scale.setTo(.4, .4);
      game.physics.p2.enable(sensor);
      sensor.alpha = .1;
      sensor.anchor.setTo(.5, .5);
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
    if (sensor) {
      sensor.kill();
    }
    wasted = game.add.sprite(400, 300, 'wasted');
    wasted.anchor.setTo(.5, .5);
  }
}


export default createGame;