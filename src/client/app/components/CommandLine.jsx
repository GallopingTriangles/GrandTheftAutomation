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
    this.props.sendCommand(this.props.level, this.state.input);
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
          { this.props.commands[this.props.level] }
        </p>
      </div>
    )
  }
}

// maps the user command from store into props of App
var mapStateToProps = state => {
  return {
    level: state.level,
    commands: state.userCommand
  }
}

// changes the command value in the store to the user's input
var mapDispatchToProps = dispatch => {
  return {
    sendCommand: (level, command) => {
      dispatch(createCommand(level, command));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommandLine);