import React, { Component } from 'react';
import styles from '../../styles/ConsoleContainerStyles.js';

import $ from 'jquery';
import createGame from '../game/game.js';

// const Game = props => (
//   <div className='col-md-7' id='phaser_game' style={ styles.phaser }></div>
// );

class Game extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // create the game when the component mounts
    createGame({engine: false, sensor: false, speed: false, color: 'white'});
  }

  componentWillUnmount() {
    // remove the game when the component unmounts
    $('canvas').remove();
  }

  render() {
    return (
      <div className='col-md-7'>
        <div id='phaser_game'></div>
      </div>
    )
  }
}

export default Game;