module.exports = function(dir, turn, point, turnFunction) {
  switch (turn) {
    case 'straight':
      if (dir === 'north') {

      } else if (dir === 'east') {

      } else if (dir === 'south') {

      } else if (dir === 'west') {

      }
      /***/
      break;


    case 'right':
      if (dir === 'north') {

      } else if (dir === 'east') {

      } else if (dir === 'south') {

      } else if (dir === 'west') {

      }
      /***/
      break;


    case 'left':
      if (dir === 'north') {

      } else if (dir === 'east') {

      } else if (dir === 'south') {

      } else if (dir === 'west') {

      }
      /***/
      break;


    default:
      console.log('error in your turn');
  }
}

// module.exports = function(list, startNode, startDirection, endNode, endDirection, map) {

//   // list = array of turns
//   // start and end direction = north/south/east/west
//   // start and end nodes = [x, y]

//   var start = startNode;

//   list.forEach(function(turn) {

//   })

// };

// function getDir(dir, turn) {
//   // dir = current direction the car is moving
//   // turn = left/right/straight
//   var angle;
//   switch (dir) {
//     case 'north': angle = 
//   }
// }

/*
[
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
]


[
  [1,0,1,0,0],
  [1,0,1,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
]

[
  [1,1,1],
  [1,1,1]
]
*/










/**********************************************************/
// if (map.intersection...) { // level 5 & 6
//   turn('the appropriate directions');
// }


/**********************************************************/
// route(['left', 'right', 'straight', 'right', 'etc...']); // level 7


/**********************************************************/
// if (gps.intersection ....) { // level 8 & 10
//   turn('the appropriate directions');
// }


/**********************************************************/
// if (sensor.front === true) { // level 9
//   turn('u-turn');
// }


/**********************************************************/
// if (sensor.front === true) { // level 11
//   gps.reroute();
// }


