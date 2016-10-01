import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Game from '../app/containers/GameContainer.jsx';
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
    if (!this.props.user) {
      this.props.router.push('/');
    }
  }

  render() {
    return this.props.user ? (
      <div>
        <Game />
        <Console />
        <Footer />
      </div>
    ) : null
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(GamePage));