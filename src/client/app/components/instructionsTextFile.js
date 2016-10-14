module.exports = {

  zero:           'LEVEL 0\n' +
                  'Welcome to GTA!\n' +

                  'We know you\'re excited to program you\'re first automated vehicle, but first we have to make sure you know how to drive a regular old car. In GTA we start our car with with the command:\n' +
                  "enable('engine');\n" +
                  'Think of this as turning the key in the ignition. We also need to set our speed:\n' +
                  "setSpeed(20);\n" +
                  'Start out slow. We\'re in a small parking lot. Click run and your car should start right up. Always remember to put semicolons at the end of each command. This tells the car\'s computer that you finished an instruction. Have fun!',


  one:            'LEVEL 1\n' +

                  'If you want to customize your car:\nsetColor(\'black\');\n' +
                  'The quotes around the color indicate that the word(s) are to be interpretted as a \'STRING\' data type. Strings are JavaScript\'s way of representing plain text.' ,

  two:            'LEVEL 2\n' +
                  'If our automated vehicle is going to do more then just drive in straight lines all day, we need to give it a way of detecting obstructions. Every automated vehicle has a built in sensor for detecting other objects. How should we enable our \'sensor\'? If you can\'t figure it out on your own, be sure to check the bugs tab.' +

                  'The sensor will light up if it detects anything in it\'s path, but the car will keep driving forward unless you program it to stop. You\'ve learned quite a bit about programming already, but there are a few more key concepts we need to go over you will be able to program you\'re car to stop.' +

                  'But it still crashes into the obstacle\n' +
                  'Need to learn about conditional statements, AKA "if" statements\n' +
                  'Use "if" to specify a block of code to be executed, if a specified condition is true\n' +
                  'Write <code> if(sensor.front === true) { setSpeed(0); }; </code>\n' +
                  'If the front sensor is detecting an obstacle, it becomes true\n' +
                  'If it is true, we want to stop the car so we set the speed to 0\n sa;ldfjka;lsdjf;ladjflasjdf;ajsd;l fjas;dlfja;lsdjf;alsdkjfa;lsdjf;lasjf;lasjdf;lasdjf;lasjf;lajf;lajd;flajsd;lfjas;ldfja;lkfja;ldjfa ;  l sdjf;aldsjfalksdjf;lasdjf;lakjf;laksdjf;ladsjf;lkasdjf;lakdjflaksjdf;lajsdf;lkasjdf;lkasjdf;lkasjf;lajf;lajf;lakjf;lafj;lajf;laksjdf;lajf;lajf;lakjdf;lajf',

  three:          'LEVEL 3\n' +
                  'Introduce INTERSECTIONS\n' +
                  'Need to enable maps\n' +
                  'If we\'re at the intersection, need to turn(\'right\');\n' +
                  '<code> if (map.intersection === true) { turn(\'right\'); } </code>\n' +
                  'Your car will execute it\'s right turn only if its in an intersection\n',

  four:           'LEVEL 4\n' +
                  'Combine what we learned from sensors with the intersections\n' +
                  'Enable sensors so code it so that it will stop if \n' +
                  'the front sensor detects any incoming obstacle.\n' +
                  'Also make the car turn right correctly as before.\n',

  five:           'LEVEL 5\n' +
                  'DisneyLand is on the left.\n' +
                  'Complete the level by making a LEFT turn\n',

  six:            'LEVEL 6\n' +
                  'introduce ROUTES\n' +
                  'When dealing with multiple intersections\n' +
                  'It can get too tedious to hard code every turn at every intersection and\n' +
                  'we may want to program our car to handle a certain route.\n' +
                  'Add <code> enable(\'routes\'); </code>\n' +
                  'In order to use our routes, we must give it a list of commands\n' +
                  'Use brackets <code> [] </code> to create the list, \n' +
                  'and send it into our routing tool that the car can understand.\n' +
                  '<code> route([\'left\', \'right\']); </code>\n' +
                  'notice the quotation marks, the directions must be \n' +
                  'sent to the computer in a STRING form\n' +
                  'This bracket notation is called an ARRAY,\n' +
                  'It is a format of storing data in code\n' +
                  'We can say that our routing function accepts an \'array\' of directions\n.',

  seven:          'LEVEL 7\n' +
                  'Create a route path that will complete this level\n',

  eight:          'LEVEL 8\n' +
                  'Our vehicle is getting more automated, but it wouldnt be\n' +
                  'very practicle if we had to tell an exact route for the car\n' +
                  'at every intersection.\n' +
                  'Let\'s enable the GPS to direct our car all by itself!\n' +
                  '<code> enable(\'gps\'); </code>\n' +
                  'We need to program the car what to do when the gps\n' +
                  'notifies you with some instructions\n' +
                  '<code> if (gps.intersection === \'left\') { turn(\'left\'); } </code>\n' +
                  'This will tell your car to turn left if the gps informs you of a left turn.\n' +
                  'Fill in the remaining two directions: \'right\' and \'straight\'\n' +
                  'to complete the level.\n' +
                  'Hint: <code> turn(\'straight\'); </code> is a valid command\n',

  nine:           'LEVEL 9\n' +
                  'You can also make u-turns\n' +
                  '<code> turn(\'uturn\'); </code> \n' +
                  'These are useful if there is some kind of obstacle in the way\n' +
                  'that the gps may be unaware of.\n' +
                  'In this level, the car will hit an obstruction by following\n' +
                  'the gps, so let\'s program the car to make a u-turn if that\'s the case.\n' +
                  '<code> if (sensor.front === true) { turn(\'uturn\'); } </code>\n' +
                  'The car will make a u-turn when the front sensor detects\n' +
                  'an incoming obstacle and make a u-turn, thus rerouting the car.\n',

  ten:            'LEVEL 10\n' +
                  'Solve this level ok cool noice\n',

  eleven:         'LEVEL 11\n' +
                  'Use rerouter function to reroute from an obstacle\n' +
                  'Useful because the gps cannot detect some obstructions\n' +
                  'Enable rerouter\n',
}
