module.exports = {

  zero:
                  'Welcome to GTA!\n\n^' +

                  'We know you\'re excited to program your first automated vehicle, but first we have to make sure you know how to drive a regular old car. In GTA we start our car with the command:^' +
                  "<code>  enable('engine');^" +
                  'Think of this as turning the key in the ignition. Always remember to put semicolons at the end of each command. This tells the car\'s computer that you finished an instruction.\n\nWe also need to set our speed:^' +
                  "<code>  setSpeed(20);^" +
                  'Start out slow. We\'re in a small parking lot. Click run and your car should start right up.  Have fun!',


  one:

                  'If you want to customize your car:^<code>  setColor(\'black\');^The quotes around the color indicate that the word(s) are to be interpretted as a \'STRING\' data type. Strings are JavaScript\'s way of representing plain text.',

  two:
                  'If our automated vehicle is going to do more then just drive in straight lines all day, we need to give it a way of detecting obstructions. Every automated vehicle has a built in sensor for detecting other objects. How should we enable our \'sensor\'? If you can\'t figure it out on your own, be sure to check the bugs tab.' +

                  'The sensor will light up if it detects anything in it\'s path, but the car will keep driving forward unless you program it to stop. You\'ve learned quite a bit about programming already, but there are a few more key concepts we need to go over before you will be able to program your car to stop automatically.^' +
                  '\nConditional statements are how programmers deal with branching logic. A conditional statement looks like this:^' +
                  '<code>  if (sensor.front === true) {\n^<code>    setSpeed(0);\n^<code>  };^' +
                  'The statement inside of the parentheses',

  three:          'LEVEL 3^' +
                  'Introduce INTERSECTIONS^' +
                  'Need to enable maps^' +
                  'If we\'re at the intersection, need to turn(\'right\');^' +
                  '<code> if (map.intersection === true) { turn(\'right\'); } </code>^' +
                  'Your car will execute it\'s right turn only if its in an intersection^',

  four:           'LEVEL 4^' +
                  'Combine what we learned from sensors with the intersections^' +
                  'Enable sensors so code it so that it will stop if ^' +
                  'the front sensor detects any incoming obstacle.^' +
                  'Also make the car turn right correctly as before.^',

  five:           'LEVEL 5^' +
                  'DisneyLand is on the left.^' +
                  'Complete the level by making a LEFT turn^',

  six:            'LEVEL 6^' +
                  'introduce ROUTES^' +
                  'When dealing with multiple intersections^' +
                  'It can get too tedious to hard code every turn at every intersection and^' +
                  'we may want to program our car to handle a certain route.^' +
                  'Add <code> enable(\'routes\'); </code>^' +
                  'In order to use our routes, we must give it a list of commands^' +
                  'Use brackets <code> [] </code> to create the list, ^' +
                  'and send it into our routing tool that the car can understand.^' +
                  '<code> route([\'left\', \'right\']); </code>^' +
                  'notice the quotation marks, the directions must be ^' +
                  'sent to the computer in a STRING form^' +
                  'This bracket notation is called an ARRAY,^' +
                  'It is a format of storing data in code^' +
                  'We can say that our routing function accepts an \'array\' of directions^.',

  seven:          'LEVEL 7^' +
                  'Create a route path that will complete this level^',

  eight:          'LEVEL 8^' +
                  'Our vehicle is getting more automated, but it wouldnt be^' +
                  'very practicle if we had to tell an exact route for the car^' +
                  'at every intersection.^' +
                  'Let\'s enable the GPS to direct our car all by itself!^' +
                  '<code> enable(\'gps\'); </code>^' +
                  'We need to program the car what to do when the gps^' +
                  'notifies you with some instructions^' +
                  '<code> if (gps.intersection === \'left\') { turn(\'left\'); } </code>^' +
                  'This will tell your car to turn left if the gps informs you of a left turn.^' +
                  'Fill in the remaining two directions: \'right\' and \'straight\'^' +
                  'to complete the level.^' +
                  'Hint: <code> turn(\'straight\'); </code> is a valid command^',

  nine:           'LEVEL 9^' +
                  'You can also make u-turns^' +
                  '<code> turn(\'uturn\'); </code> ^' +
                  'These are useful if there is some kind of obstacle in the way^' +
                  'that the gps may be unaware of.^' +
                  'In this level, the car will hit an obstruction by following^' +
                  'the gps, so let\'s program the car to make a u-turn if that\'s the case.^' +
                  '<code> if (sensor.front === true) { turn(\'uturn\'); } </code>^' +
                  'The car will make a u-turn when the front sensor detects^' +
                  'an incoming obstacle and make a u-turn, thus rerouting the car.^',

  ten:            'LEVEL 10^' +
                  'Solve this level ok cool noice^',

  eleven:         'LEVEL 11^' +
                  'Use rerouter function to reroute from an obstacle^' +
                  'Useful because the gps cannot detect some obstructions^' +
                  'Enable rerouter^',
}
