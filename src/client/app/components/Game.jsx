import React, { Component } from 'react';
import styles from '../../styles/ConsoleContainerStyles.js';
import $ from 'jquery';
import createGame from '../game/game.js';

class Game extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // create the default game when the component mounts
    createGame({
      color: 'white',
      speed: 0,
      case: 0, // default case when initially rendering the game
    }, this.props.level)
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