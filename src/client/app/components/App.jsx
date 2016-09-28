import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Nav from './Nav.jsx';
import Signup from '../containers/SignupContainer.jsx';
import Login from '../containers/LoginContainer.jsx';
import Game from '../containers/GameContainer.jsx';
import Console from '../containers/ConsoleContainer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Nav />
        <Signup />
        <Login />
        <Game />
        <Console />
      </div>
    )
  }
}

export default App;