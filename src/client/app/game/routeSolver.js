module.exports = {

  turn: (car, corner, point, curDir, endDir) => {
    var anchor;
    // if the car hits the point with a curDir, make it turn in the endDir
    // must determine which offset (intersection quarter) to use depending on endDir and curDir
    if (verifyDir(car, 'north')) {
      var quarter = determineOffset(car, 'north', endDir);
      anchor = offset(quarter, point);
    } else if (verifyDir(car, 'east')) {
      
    } else if (verifyDir(car, 'south')) {
      
    } else if (verifyDir(car, 'west')) {
      
    }

    // handle 'straight' dir
  },

  positionRange: (car, point) => { // check if the car is within 7 pixels (x and y) of a point
    if (Math.abs(car.body.x - point[0]) < 7 && Math.abs(car.body.y - point[1]) < 7) {
      return true;
    } else {
      return false;
    }
  },

  determineOffset: (car, curDir, endDir) => { // determine which intersection quarter to use for turning
    if (curDir === 'north' && endDir === 'east') {
      return 'LR';
    } else if (curDir === 'north' && endDir === 'west') {
      return 'UR';
    } else if (curDir === 'east' && endDir === 'north') {
      return 'LR';
    } else if (curDir === 'east' && endDir === 'south') {
      return 'LL';
    } else if (curDir === 'south' && endDir === 'east') {
      return 'LL';
    } else if (curDir === 'south' && endDir === 'west') {
      return 'UL';
    } else if (curDir === 'west' && endDir === 'north') {
      return 'UR';
    } else if (curDir === 'west' && endDir === 'south') {
      return 'UL';
    }

  },

  verifyDir: (car, dir) => { // checks if the car is traveling in the given direction
    var angle = car.body.angle;
    if (dir === 'north') {
      return angleRange(angle, 0);
    } else if (dir === 'east') {
      return angleRange(angle, 90);
    } else if (dir === 'south') {
      return angleRange(angle, 180) || angleRange(angle, -180);
    } else if (dir === 'west') {
      return angleRange(angle, -90);
    }
  },

  angleRange: (carAngle, angle) => { // helper function for verifyDir
    if (Math.abs(carAngle - angle) < 10) {
      return true;
    }
  },
  
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

  offset: (corner, coord) => { // returns the center coord of the intersection quarters
    var x = coord[0];
    var y = coord[1];
    if (corner === 'UL') {
      return [x - 20, y - 20];
    }
    if (corner === 'LL') {
      return [x - 20, y + 20];
    }
    if (corner === 'UR') {
      return [x + 20, y - 20];
    }
    if (corner === 'LR') {
      return [x + 20, y + 20];
    }
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


