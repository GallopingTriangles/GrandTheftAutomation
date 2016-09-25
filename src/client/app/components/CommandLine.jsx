import React, { Component } from 'react';
import { connect } from 'react-redux';
import createCommand from '../actions/UserCommandAction.js';

class CommandLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
  }

  updateInput(e) {
    e.preventDefault();
    this.setState({
      input: e.target.value
    })
  }

  sendCommand(e) {
    e.preventDefault();
    // tell the store to change the command
    this.props.sendCommand(this.state.input);
    this.setState({
      input: ''
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.sendCommand.bind(this) } >
          <p>>>><input onChange={ this.updateInput.bind(this) } value={ this.state.input }></input></p>
        </form>
        <p>
          { this.props.command }
        </p>
      </div>
    )
  }
}

// inject state from store into props of App
var mapStateToProps = state => {
  return {
    command: state.userCommand.command
  }
}

// inject dispatch method into props of App
var mapDispatchToProps = dispatch => {
  return {
    sendCommand: (command) => {
      dispatch(createCommand(command));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommandLine);