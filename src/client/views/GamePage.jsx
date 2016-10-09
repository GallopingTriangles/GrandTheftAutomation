import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Game from '../app/containers/GameContainer.jsx';
import Console from '../app/containers/ConsoleContainer.jsx';
import Footer from '../app/containers/FooterContainer.jsx';
import setCode from '../app/actions/setCode.js';

/*******************************************************/
/* Renders the game page that consists of:             */
/* (1) The game container                              */
/* (2) The console (the code editor)                   */
/* (3) The footer container                            */
/*******************************************************/

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      console: {}
    };
  }

  componentWillMount() {
    /* Redirect client to Landing Page if a user is not logged in */
    /* Doing it here handles the case that the user manually      */
    /* tries to access this page by typing in the url             */
    if (!this.props.user) {
      this.props.router.push('/');
    }
    this.getCode();
  }

  getCode() {
    var url = `/game?username=${ this.props.user }`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json().then(solutions => {
        var result = solutions.filter(solution => {
          return solution.level === this.props.level;
        })[0];
        var solution = result ? result.solution : '// iNPuT YouR CoDE HeRe WooOoOOoOooOOoOooO\n\n';
        this.props.setCode(solution);

        /*************************************************************/
        /* DIRTIEST HACK EVER... NEED TO FIGURE OUT A WORKAROUND     */
        /* This sets the state of the CONSOLE                        */
        /*   to make the console re-render itself                    */
        /*   since it wasn't re-rendering on its own                 */
        /* We're forcing it to re-render from up here                */
        /*************************************************************/
        this.state.console.setState({
          input: solution
        })

        // return solution for promise chaining
        return solution;
      })
    }).catch(err => {
      console.log('Error fetching solution code: ', err);
    })
  }

  setConsole (context) {
    /*************************************************************/
    /* DIRTIEST HACK EVER... NEED TO FIGURE OUT A WORKAROUND     */
    /* This stores the Console component context to the state    */
    /* So we can set the console's state from up here            */
    /*   to force it to re-render, since it wasn't working       */
    /*   from the child (console) component                      */
    /*************************************************************/
    this.setState({
      console: context
    })
  }

  render() {
    /* Need a conditional otherwise a game may render itself onto the */
    /* landing page if a redirect occurs before the component mounts  */
    return this.props.user ? (
      <div>
        <Game level={ this.props.level } />
        <Console setConsole={ this.setConsole.bind(this) } />
        <Footer getCode={ this.getCode.bind(this) } />
      </div>
    ) : null
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    level: state.level,
    currentCode: state.currentCode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCode: (code) => {
      dispatch(setCode(code));
    }
  }
}

/* React-Router's 'withRouter' allows manual redirection */
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GamePage));