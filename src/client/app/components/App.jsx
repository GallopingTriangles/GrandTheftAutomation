import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from './Nav.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <Nav />
        <p>Hey mang</p>
        <p>Grand Theft Automation</p>
        <button onClick={ () => this.props.click() }>click</button>
        <p>Here{ this.props.command }</p>
      </div>
    )
  }
}

var mapStateToProps = state => {
  return {
    command: state.command
  }
};

var mapDispatchToProps = dispatch => {
  return {
    click: () => {
      dispatch({
        type: 'INPUT_COMMAND',
        command: 'clicked!'
      });
    }
  }
}
// mapping store to prop currently not working
export default connect(mapStateToProps, mapDispatchToProps)(App);