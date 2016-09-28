import React, { Component } from 'react';
import styles from '../../styles/ConsoleContainerStyles.js';

const Game = props => (
  <div className='col-md-7' id='phaser_game' style={ styles.phaser }></div>
);

export default Game;