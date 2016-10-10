module.exports = {

  one:            'LEVEL 1\n' +
                  'Welcome to GTA\n' +
                  '(a sentence for introducing AV shit...)\n' +
                  'Let\'s turn on your engine, need to use a special tool called "enable"\n' +
                  'Type <code> enable(\'engine\'); </code>\n' +
                  'Now let\'s give the car a speed\n' +
                  'Type <code> setSpeed(30); </code>\n' +
                  'If you want to customize your car... <code> setColor(\'black\'); </code>\n' +
                  'The semicolons are used to separate statements\n' +
                  'Click RUN to see the car you\'ve just programmed!\n',

  two:            'LEVEL 2\n' +
                  'Let\'s give your car a sensor\n' +
                  'Add <code> enable(\'sensor\'); </code> to your previous code\n' +
                  'Allows car to use the sensor\n' +
                  'But it still crashes into the obstacle\n' +
                  'Need to learn about conditional statements, AKA "if" statements\n' +
                  'Write <code> if(sensor.front === true) { setSpeed(0); }; </code>\n' +
                  'If the front sensor is detecting an obstacle, it becomes true\n' +
                  'If it is true, we want to stop the car so we set the speed to 0\n',

  three:          'LEVEL 3\n' +
                  'Introduce INTERSECTIONS\n' +
                  'Need to enable maps\n' +
                  'If we\'re at the intersection, need to turn(\'right\');\n',

  four:           'LEVEL 4\n' +
                  'Combine what we learned from sensors with the intersections\n' +
                  'Enable sensors so code it so that it will stop if \n' +
                  'the front sensor detects any incoming obstacle.\n' +
                  'Also make the car turn right correctly as before.\n',
}