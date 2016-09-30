import React, { Component } from 'react';
import Game from '../app/containers/GameContainer.jsx';
import Console from '../app/containers/ConsoleContainer.jsx';

const GamePage = props => (
  <div>
    <Game />
    <Console />
  </div>
)

export default GamePage;