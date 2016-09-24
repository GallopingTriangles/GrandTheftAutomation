import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommandLine from '../components/CommandLine.jsx';
import createCommand from '../actions/UserCommandAction';

class ConsoleContainer extends Component {
  render() {
    return (
      <div>
        <CommandLine 
          sendCommand={ this.props.sendCommand } 
          userCommand={ this.props.state.userCommand.command } />
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    state: state
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // update the user's command in the store
    dispatchCommand: (command) => {
      dispatch(createCommand(command));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConsoleContainer);