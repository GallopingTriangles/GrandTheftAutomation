module.exports = {

  turn: (car, point, curDir, endDir) => {
    var anchor;
    // if the car hits a certain point with a curDir, make it turn in the endDir
    // must determine which offset (intersection quarter) to use depending on endDir and curDir
    // handle 'straight' dir by not setting a case for curDir === endDir
    if (module.exports.verifyDir(car, curDir)) {

      var quarter = module.exports.determineOffset(car, curDir, endDir);
      anchor = module.exports.offset(quarter, point);
      if (module.exports.positionRange(car, anchor)) {
        module.exports.setAngle(car, endDir);
      }

    }

  },

  verifyDir: (car, dir) => { // checks if the car is traveling in the given direction
    var angle = car.body.angle;
    if (dir === 'north') {
      return module.exports.angleRange(angle, 0);
    } else if (dir === 'east') {
      return module.exports.angleRange(angle, 90);
    } else if (dir === 'south') {
      return module.exports.angleRange(angle, 180) || module.exports.angleRange(angle, -180);
    } else if (dir === 'west') {
      return module.exports.angleRange(angle, -90);
    }
  },

  angleRange: (carAngle, angle) => { // helper function for verifyDir
    if (Math.abs(carAngle - angle) < 10) {
      return true;
    }
  },

  setAngle: (car, dir) => {
    switch (dir) {
      case 'north': 
        car.body.angle = 0;
        break;
      case 'east': 
        car.body.angle = 90;
        break;
      case 'south': 
        car.body.angle = 180;
        break;
      case 'west': 
        car.body.angle = -90;
        break;
      default: car.body.angle = 0;
    }
  },

  positionRange: (car, point) => { // check if the car is within 10 pixels (x and y) of a point
    if (Math.abs(car.body.x - point[0]) < 10 && Math.abs(car.body.y - point[1]) < 10) {
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


// SOLUTIONS
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


