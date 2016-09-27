var createGame = () => {

  var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser_game', { preload: preload, create: create, update: update, render: render });

  function preload() {
    game.load.image('car', './assets/car-top-view-small.png');
    game.load.image('panda', './assets/panda.png');
    game.load.image('grass', './assets/grass.jpg');
    game.load.image('sensor', './assets/circle.svg')
  }

  var car;
  var static1;
  var static2;
  var cursors;

  function create() {
    // Use the p2 physics system
    game.physics.startSystem(Phaser.Physics.P2JS);
    // Turn on impact events for the world, to allow collision callbacks
    game.physics.p2.setImpactEvents(true);
    game.stage.backgroundColor = '#3e5f96';

    // Add sprites
    car = game.add.sprite(400, 300, 'car');
    sensor = game.add.sprite(200, 300, 'sensor');
    static1 = game.add.sprite(200, 200, 'grass');
    static2 = game.add.sprite(500, 500, 'grass');

    car.anchor.setTo(0.3, 0.5);
    sensor.anchor.setTo(.5, .5);
    sensor.scale.setTo(.3, .3);
    static1.scale.setTo(.1, .1);
    static2.scale.setTo(.1, .1);


    game.physics.p2.enable([car, static1, static2]);

    car.body.collideWorldBounds = true;

    var carCollisionGroup = game.physics.p2.createCollisionGroup();
    var obstacleCollisionGroup = game.physics.p2.createCollisionGroup();

    game.physics.p2.updateBoundsCollisionGroup();
    car.body.setCollisionGroup(carCollisionGroup);

    var obstacles = game.add.group();
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

    // Initialize user control with the keyboard
    cursors = game.input.keyboard.createCursorKeys();

    //  Make static
    static1.body.static = true;
  	static2.body.static = true;

    text = game.add.text(16, 16, 'Move the car. Sensor overlap: false', { fill: '#ffffff' });
  }

  function update() {
    //  Reset the cars velocity before rendering next frame;
    // attachSensor(sensor, car.body.x, car.body.y, car.body.angle);

    car.body.velocity.x = 0;
    car.body.velocity.y = 0;
    car.body.angularVelocity = 0;

    if (cursors.up.isDown) {
      car.body.moveForward(300);
      leftRight(true);
    } else if (cursors.down.isDown) {
      car.body.moveBackward(100);
      leftRight(false);
    }
    console.log("car.body.x: ", car.body.x);

    if (checkOverlap(car, sensor))
    {
        text.text = 'Move the car. Sensor overlap: true';
    }
    else
    {
        text.text = 'Move the car. Sensor overlap: false';
    }
  }

  function render() {
  }

  // HELPER FUNCTIONS

  function leftRight(forward) {
    var angularVelocity;

    if (forward) {
      angularVelocity = 90;
    } else {
      angularVelocity = -30;
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

}

createGame();

// export default createGame;f
