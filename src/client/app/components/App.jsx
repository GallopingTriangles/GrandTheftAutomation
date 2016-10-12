import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import PageContainer from '../../views/PageContainer.jsx';
import LandingPage from '../../views/LandingPage.jsx';
import GamePage from '../../views/GamePage.jsx';
import ProfilePage from '../containers/ProfilePage.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    /** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * ***
    *** Routing is done on the client side with react-router, with two pages: ***
    ***  1) The Landing Page, which stands as the main page                   ***
    ***  2) The Game Page, which contains the game itself and the code editor ***
    *** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * **/
    return (
      <Router history={ hashHistory }>
        <Route path='/' component={ PageContainer }>
          <IndexRoute component={ LandingPage } />
          <Route path='game' component={ GamePage } />
          <Route path='profile' component={ ProfilePage } />
        </Route>
      </Router>
    )
  }
}

export default App;
