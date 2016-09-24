import React, { Component } from 'react';

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

  sendCommand() {
    // tell's the store to change the command
    this.props.dispatchCommand(this.state.input);
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.props.sendCommand } >
          <p>>>><input onChange={ this.updateInput.bind(this) } ></input></p>
        </form>
        <p>
          { this.props.userCommand }
        </p>
      </div>
    )
  }
}

export default CommandLine;