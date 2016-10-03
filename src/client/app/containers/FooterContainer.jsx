import React, { Component } from 'react';
import { connect } from 'react-redux';
// import createCommand from '../actions/UserCommandAction.js';
import changeLevel from '../actions/changeLevel.js';

class Footer extends Component {
  // == REACT FUNCTIONS =====================================================
  constructor(props) {
    super(props);
    this.state = {
      // level: this.props.level
    };
  }

  // == CUSTOM FUNCTIONS ====================================================
  // previousLevel(e) {
  //   e.preventDefault();
  //   if (this.props.level > 1) {
  //     this.props.changeLevel(this.props.level - 1);
  //   }
  // }

  // nextLevel(e) {                                                              // go to next level
  //   e.preventDefault();
  //   if (this.props.level < 4) {
  //     this.props.changeLevel(this.props.level + 1);
  //   }
  // }

  changeLevel(e, level) {
    /* Updates the store with the appropriate level                       */
    e.preventDefault();
    if (level >= 1 && level <= 4) {
      this.props.changeLevel(level);
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