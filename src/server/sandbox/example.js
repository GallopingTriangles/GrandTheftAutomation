response.phaser = {
  level: 1,
  color: 'black',
  speed: 50,
  engine: true,
  sensor: true,
  level3: {
    crashed: {
      
    },
    su
  }

}

// LEVEL 1
color('black');
speed(50);
enable('engine');

// LEVEL 2
enable('sensor');

// LEVEL 3
if (sensor.front === 'on') {
  speed(0);
}

// LEVEL 4
if (sensor.front === 'on' && sensor.right === 'off') {
  speed(30);
  turn('left');
}

if (sensor.left === 'on') {
  speed(30);
  turn('right');
}

if (sensor.front === true && sensor.right === true) {
  speed = speed - 20;
  turn('left');
}

if (sensor.front === true && sensor.left === true) {
  speed = speed - 20;
  turn('right');
}

if (sensor.All === false) {
  // return car to normal speed if no sensors detect an obstacle
  speed = 50;
}

while (distanceGPS.isIncreasing() === true) {
  // the distance to the destination is increasing, which means the
  // car is going in the wrong direction. So we should program the
  // car to keep turning until the car is in the correct direction.
  turn('right');
}
if (distanceGPS.distance === 0) {
  // if the distance to destination is 0, then we can
  // stop the car and end the game. User wins.
  speed = 0;
}

// STAGE 3
enable('sensor'); // enables the use of the sensor for the user
enable(distanceTracker); // keeps track of the distance to the destination
