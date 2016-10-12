import React, { Component } from 'react';
import { connect } from 'react-redux';
// import createCommand from '../actions/UserCommandAction.js';
import $ from 'jquery';
import changeLevel from '../actions/changeLevel.js';
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
    this.props.getCode();

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
    level: state.level
  }
}

var mapDispatchToProps = dispatch => {
  return {
    changeLevel: (level) => {
      dispatch(changeLevel(level));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);