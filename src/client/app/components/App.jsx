import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Nav from './Nav.jsx';
import Console from '../containers/ConsoleContainer.jsx';
import SignupContainer from '../containers/SignupContainer.jsx';
import LoginContainer from '../containers/LoginContainer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <SignupContainer />
        <LoginContainer />
        <Nav />
        <Console />
      </div>
    )
  }
}

export default App;