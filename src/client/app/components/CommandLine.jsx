import React, { Component } from 'react';
import { connect } from 'react-redux';
import createCommand from '../actions/UserCommandAction.js';
import styles from '../../styles/CommandLineStyles.css.js';

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
    // tell the store to add the command
    this.props.sendCommand(this.props.level, this.state.input);
    this.setState({
      input: ''
    })
  }

  render() {
    return (
      <div style={ styles.container } >
        <form style={ styles.form } onSubmit={ this.sendCommand.bind(this) } >
          <p><span style={ styles.input }>>>></span><input onChange={ this.updateInput.bind(this) } value={ this.state.input }></input></p>
        </form>
      </div>
    )
  }
}

// maps the user's previous commands from store into props of App
var mapStateToProps = state => {
  return {
    level: state.level,
    commands: state.userCommand
  }
}

// adds the user's command to the array of previous commands
var mapDispatchToProps = dispatch => {
  return {
    sendCommand: (level, command) => {
      dispatch(createCommand(level, command));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommandLine);