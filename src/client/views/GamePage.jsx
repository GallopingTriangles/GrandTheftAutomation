import React, { Component } from 'react';
import Game from '../app/containers/GameContainer.jsx';
import Console from '../app/containers/ConsoleContainer.jsx';

/*******************************************************/
/* Renders the game page that consists of:             */
/* (1) The game container                              */
/* (2) The console (the code editor)                   */
/*******************************************************/

const GamePage = props => (
  <div>
    <Game />
    <Console />
  </div>
)

export default GamePage;