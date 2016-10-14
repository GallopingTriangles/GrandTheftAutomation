import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Game from '../app/components/Game.jsx';
import Console from '../app/containers/ConsoleContainer.jsx';
import Footer from '../app/containers/FooterContainer.jsx';

/*******************************************************/
/* Renders the game page that consists of:             */
/* (1) The game container                              */
/* (2) The console (the code editor)                   */
/* (3) The footer container                            */
/*******************************************************/

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    /* Redirect client to Landing Page if a user is not logged in */
    /* Doing it here handles the case that the user manually      */
    /* tries to access this page by typing in the url             */
    if (!this.props.user) {
      this.props.router.push('/');
    } 
  }

  render() {
    /* Need a conditional otherwise a game may render itself onto the */
    /* landing page if a redirect occurs before the component mounts  */
    return this.props.user ? (
      <div className='game-page'>
        <Game level={ this.props.level } />
        <Console />
        <Footer/>
      </div>
    ) : null
  }
}

const mapStateToProps = state => {
  /* Gives this component access to the current logged in user, game level, and code from Redux Store */
  return {
    user: state.user,
    level: state.level,
  }
}

/* React-Router's 'withRouter' allows manual redirection */
export default withRouter(connect(mapStateToProps)(GamePage));