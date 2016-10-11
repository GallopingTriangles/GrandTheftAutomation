module.exports = {
  
  intersectionCenter: tiles => {
    // returns the center (x,y) pixel of an intersection layer
    var x = 0;
    var y = 0;
    tiles.forEach(function(tile) {
      x += tile.worldX;
      y += tile.worldY;
    })
    x = x / tiles.length;
    y = y / tiles.length;

    // need to offset by 1/2 width and height to find exact centerbecause tile coords start from top left
    return [x + 8, y + 8];
  },

  
}


var route = function(turn, dir, point, turnFunction) {
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


