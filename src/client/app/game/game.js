var createGame = (userInput) => {
  // change width depends on window width, no dynamically resizing yet
  var width = window.innerWidth;
  var height = window.innerHeight;
  var gameWidth = width * (7 / 12) - 10;
  var gameHeight = gameWidth * (6 / 8);

  // original width = 800, height = 600
  var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser_game', { preload: preload, create: create, update: update, render: render });

  function preload() {
    setCarColor();
    game.load.image('wasted', './assets/wasted.png');
    game.load.image('panda', './assets/panda.png');
    game.load.image('grass', './assets/grass.jpg');
    game.load.image('sensor', './assets/round.png')
    game.load.spritesheet('explosion', './assets/explosion.png', 256, 256, 48)
  }

  var car;
  var obstacles;
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


  var roadLayer;
  var map;
  var collisionLayer;
  var tilesCollisionGroup;
  var carCollisionGroup;
  var obstacleCollisionGroup;
  var tile;

  function create() {
    // Set initial state of the game
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.stage.backgroundColor = backgroundColor;


    if (userInput.engine) {
      cursors = game.input.keyboard.createCursorKeys();
    }

    createSensor();
    createCar();
    setSpeed();

    carCollisionGroup = game.physics.p2.createCollisionGroup();
    obstacleCollisionGroup = game.physics.p2.createCollisionGroup();

    game.physics.p2.updateBoundsCollisionGroup();
    car.body.setCollisionGroup(carCollisionGroup);

    obstacles = game.add.group();
    obstacles.enableBody = true;
    obstacles.physicsBodyType = Phaser.Physics.P2JS;

    for (var i = 0; i < 3; i++) {
      // create an obstacle
      var obstacle = obstacles.create(300, 50+200*i, 'grass');
      obstacle.scale.setTo(0.1, 0.1);
      obstacle.body.setRectangle(obstacle.width, obstacle.height);
      // assign a collision group to the obstacles
      obstacle.body.setCollisionGroup(obstacleCollisionGroup);
      obstacle.body.collides([carCollisionGroup, obstacleCollisionGroup]);
      obstacle.body.static = true;
    }

    car.body.collides(obstacleCollisionGroup, gameOver, this);

    text = game.add.text(16, 16, 'Move the car. Sensor overlap: false', { fill: '#ffffff' });


  }

  function update() {
    //  Reset the cars velocity before rendering next frame;
    if (userInput.sensor) {
      attachSensor(sensor, car.body.x, car.body.y, car.body.angle);

    var overlap = false;
    obstacles.forEach(function(obstacle) {

      if (checkOverlap(obstacle, sensor)) {
        overlap = true;
      };

      if (overlap) {
        text.text = 'Remind me not to let you drive.'
        sensor.alpha = 1;
      } else {
        text.text = 'Sensors do not detect any danger.'
        sensor.alpha = .1;
      }
    });
  }

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
  }

  /*** HELPER FUNCTIONS ***/

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

  function attachSensor(sensor, carX, carY, carAngle) {
    sensor.x = carX;
    sensor.y = carY;
    sensor.angle = carAngle;
  }

  function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);
  }

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

  function createSensor() {
    // Check to make sure the user has turned the sensor on
    if (userInput.sensor) {
      // Appearace
      sensor = game.add.sprite(startingX, startingY, 'sensor');
      sensor.alpha = .1;
      sensor.anchor.setTo(.5, .5);
      sensor.scale.setTo(.5, .5);
    }
  }

  function setSpeed() {
    if (userInput.speed) {
      carForwardSpeed = userInput.speed * userSpeedMultiplier;
      carBackwardSpeed = carForwardSpeed * forwardReverseMultiplier;
    }
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
    }
  }

  function gameOver() {
    explosion = game.add.sprite(400, 300, 'explosion');
    explosion.x = car.x;
    explosion.y = car.y;
    explosion.anchor.setTo(.5, .5);
    explosion.animations.add('explode');
    explosion.animations.play('explode', 24, false);
    text.kill();
    car.kill();
    if (sensor) {
      sensor.kill();
    }
    wasted = game.add.sprite(400, 300, 'wasted');
    wasted.anchor.setTo(.5, .5);
  }
}


export default createGame;
