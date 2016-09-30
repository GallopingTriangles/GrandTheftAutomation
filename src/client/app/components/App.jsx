import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

import Nav from './Nav.jsx';
import Signup from '../containers/SignupContainer.jsx';
import Login from '../containers/LoginContainer.jsx';
import Game from '../containers/GameContainer.jsx';
import Console from '../containers/ConsoleContainer.jsx';

const Container = props => (
  <div>
    <Nav />
    { props.children }
  </div>
)

const LandingPage = props => (
  <div>
    <Signup />
    <Login />
  </div>
)

const GamePage = props => (
  <div>
    <Game />
    <Console />
  </div>
)

const AllRoutes = props => (
  <Router history={ hashHistory }>
    <Route path='/' component={ Container }>
      <IndexRoute component={ LandingPage } />
      <Route path='game' component={ GamePage } />
    </Route>
  </Router>
)

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
      <AllRoutes />
    )
  }
}

export default App;