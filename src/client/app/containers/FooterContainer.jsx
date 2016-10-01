import React, { Component } from 'react';
import { connect } from 'react-redux';
import createCommand from '../actions/UserCommandAction.js';
import changeLevel from '../actions/changeLevel.js';

class Footer extends Component {
  // == REACT FUNCTIONS =====================================================
  constructor(props) {
    super(props);
    this.state = {
      level: this.props.level
    };
  }

  // == CUSTOM FUNCTIONS ====================================================
  previousLevel(e) {
    e.preventDefault();
    if (this.state.level > 1) {
      changeLevel(this.state.level - 1);
    }
  }

  nextLevel(e) {                                                              // go to next level
    e.preventDefault();
    if (this.state.level < 4) {
      console.log('hey');
      changeLevel(2);
    }
  }

  // == RENDER FOOTER =======================================================
  render() {
    console.log('props',this.props)
    return (
      <footer className='footer'>
        <div className='container'>
          <button 
            className='btn btn-primary col-xs-1'
            onClick={this.previousLevel.bind(this)} 
          >
          Back
          </button>
          <h5 className='col-xs-10 text-center'>{this.state.level} / 4</h5>
          <button 
            className='btn btn-primary col-xs-1'
            onClick={this.nextLevel.bind(this)}
          >
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
    // previousLevel: (level) => {
    //   // dispatch(changeLevel(level));
    // },
    // nextLevel: (level) => {
    //   // dispatch(changeLevel(level));
    // }
    // sendCommand: (level, command) => {
    //   dispatch(createCommand(level, command));
    // }
    changeLevel: (level) => {
      dispatch(changeLevel(level));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);