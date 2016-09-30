import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

import Nav from './Nav.jsx';
import Signup from '../containers/SignupContainer.jsx';
import Login from '../containers/LoginContainer.jsx';
import Game from '../containers/GameContainer.jsx';
import Console from '../containers/ConsoleContainer.jsx';
import PageContainer from '../../views/PageContainer.jsx';
import LandingPage from '../../views/LandingPage.jsx';
import GamePage from '../../views/GamePage.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // return (
    //   <div>
    //     <Nav />
    //     <Signup />
    //     <Login />
    //     <Game />
    //     <Console />
    //   </div>
    // )
    return (
      <Router history={ hashHistory }>
        <Route path='/' component={ PageContainer }>
          <IndexRoute component={ LandingPage } />
          <Route path='game' component={ GamePage } />
        </Route>
      </Router>
    )
  }
}

export default App;