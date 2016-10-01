import React, { Component } from 'react';
import Game from '../app/containers/GameContainer.jsx';
import Console from '../app/containers/ConsoleContainer.jsx';
import Footer from '../app/containers/FooterContainer.jsx';

/*******************************************************/
/* Renders the game page that consists of:             */
/* (1) The game container                              */
/* (2) The console (the code editor)                   */
/* (3) The footer container                            */
/*******************************************************/

const GamePage = props => (
  <div>
    <Game />
    <Console />
    <Footer />
  </div>
)

export default GamePage;