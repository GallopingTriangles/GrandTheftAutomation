import React, { Component } from 'react';
import { connect } from 'react-redux';
// import createCommand from '../actions/UserCommandAction.js';
import $ from 'jquery';
import changeLevel from '../actions/changeLevel.js';
import setCode from '../actions/setCode.js';
import createGame from '../game/game.js';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  changeLevel(e, level) {
    /* Updates the store with the appropriate level between 0 and 11 */
    e.preventDefault();
    if (level >= 0 && level <= 11) {
      this.props.changeLevel(level);

      /* remove the previous game instance and then     */
      /* re-render a new game for the appropriate level */
      $('canvas').remove();
      createGame({
        color: 'white',
        speed: 0,
        /* no "case" property for the default rendering */
      }, level);
    }

    /* Error handling if the level is ever out of bounds: default to 0    */
    if (this.props.level > 11 || this.props.level < 0) {
      this.props.changeLevel(0);
    }

    /* Fetches and renders the user's code for that level into the editor */
    // this.props.getCode();



    this.getCode();

  }

  getCode() {
    /* Fetches the user's solution code from the database and     */
    /* sends the code to the console so the code editor will      */
    /* render with the appropriate text                           */
    var url = `/game?username=${ this.props.user }`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json().then(solutions => {

        /** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ***/

        /** THIS MAY HAVE BEEN FIXED, I'M NOT SURE                                                  **/
        /** Throws an error when it tries to fetch code for a user that has never saved code before **/
        /** This problem may or may not be present anymore... Troubleshooting required              **/ 
        /** The reason is most likely that getCode() was being run when it shouldn't be? Test it    **/

        /** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ***/

        var result = solutions.filter(solution => {
          return solution.level === this.props.level;
        })[0];
        var solution = result ? result.solution : '// Input your code here\n\n';

        /* Update the current code in the Redux Store */
        this.props.setCode(solution);

        // return solution for promise chaining
        return solution;
      })
    }).catch(err => {
      console.log('Error fetching solution code: ', err);
    })
  }

  render() {
    return (
      <footer className='footer'>
        <div className='container'>

          <button 
            className='btn btn-primary col-xs-1'
            onClick={ (e) => this.changeLevel(e, this.props.level - 1) } >
          Back
          </button>

          <h5 className='col-xs-10 text-center'>{ this.props.level } / 11</h5>

          <button 
            className='btn btn-primary col-xs-1'
            onClick={ (e) => this.changeLevel(e, this.props.level + 1) } >
          Next
          </button>

        </div>
      </footer>  
    );
  }
}

var mapStateToProps = state => {
  return {
    user: state.user,
    level: state.level
  }
}

var mapDispatchToProps = dispatch => {
  return {
    changeLevel: (level) => {
      dispatch(changeLevel(level));
    },
    setCode: (code) => {
      /* Function to dispatch an action that will set the current code in the Redux Store             */
      /* This is used for making sure the code in the Redux Store matches with the code in the editor */
      dispatch(setCode(code));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);