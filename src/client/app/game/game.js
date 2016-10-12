var level0 = require('./level0.js');
var level1 = require('./level1.js');
var level2 = require('./level2.js');
var level3 = require('./level3.js');
var level4 = require('./level4.js');
var level5 = require('./level5.js');
var level6 = require('./level6.js');
var level7 = require('./level7.js');
var level8 = require('./level8.js');
var level9 = require('./level9.js');
var level10 = require('./level10.js');
var level11 = require('./level11.js');

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
* *                                                                               *
 *    Contains all functionality for rendering the game utilizing the            * *
* *   javascript gaming library Phaser: * * * * * https://phaser.io/ * * * * *    *
 *    Each level is imported as a createGame() function.                         * *
* *   Every re-rendering of a level or rendering of a new level                   *
 *    would remove the HTML canvas the previous Phaser instance was running in,  * *
* *   and instantiate a brand new HTML canvas for a new Phaser instance by        *
 *    invoking the createGame() function. The differences in game logic is       * *
* *   interpreted by createGame() through the userInput parameter sent from       *
 *    the client, but all things related to the rendering and updating of the    * *
* *   game is contained in each createGame() function.                            *
 *                                                                               * *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export default function(userInput, level) {
  /* create the game for the appropriate level */
  if (level === 0) {
    level0(userInput);
  } else if (level === 1) {
    level1(userInput);
  } else if (level === 2) {
    level2(userInput);
  } else if (level === 3) {
    level3(userInput);
  } else if (level === 4) {
    level4(userInput);
  } else if (level === 5) {
    level5(userInput);
  } else if (level === 6) {
    level6(userInput);
  } else if (level === 7) {
    level7(userInput);
  } else if (level === 8) {
    level8(userInput);
  } else if (level === 9) {
    level9(userInput);
  } else if (level === 10) {
    level10(userInput);
  } else if (level === 11) {
    level11(userInput);
  }

  // hardcoding which level to render for troubleshooting
  // level0(userInput);
  // level1(userInput);
  // level2(userInput);
  // level3(userInput);
  // level4(userInput);
  // level5(userInput);
  // level6(userInput);
  // level7(userInput);
  // level8(userInput);
  // level9(userInput);
  // level10(userInput);
  // level11(userInput);
}