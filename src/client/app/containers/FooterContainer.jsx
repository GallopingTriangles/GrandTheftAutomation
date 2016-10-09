import React, { Component } from 'react';
import { connect } from 'react-redux';
// import createCommand from '../actions/UserCommandAction.js';
import $ from 'jquery';
import changeLevel from '../actions/changeLevel.js';
import createGame from '../game/game.js';

class Footer extends Component {
  // == REACT FUNCTIONS =====================================================
  constructor(props) {
    super(props);
    this.state = {};
  }


  changeLevel(e, level) {
    /* Updates the store with the appropriate level                       */
    e.preventDefault();
    if (level >= 1 && level <= 4) {
      this.props.changeLevel(level);

      // re-render a new game for the appropriate level
      $('canvas').remove();
      createGame({
        color: 'white',
        speed: 0,
        /* no "case" property yet because this is just the initial rendering of the game */
      }, level);
    }

    /* Error handling if the level is ever out of bounds: default to 1    */
    if (this.props.level > 4 || this.props.level < 1) {
      this.props.changeLevel(1);
    }

    /* Fetches and renders the user's code for that level into the editor */
    this.props.getCode();

  }

  // == RENDER FOOTER =======================================================
  render() {
    return (
      <footer className='footer'>
        <div className='container'>

          <button 
            className='btn btn-primary col-xs-1'
            onClick={ (e) => this.changeLevel(e, this.props.level - 1) } >
          Back
          </button>

          <h5 className='col-xs-10 text-center'>{ this.props.level } / 4</h5>

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