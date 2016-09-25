import React, { Component } from 'react';
import Log from './Log.jsx';

class Logs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        { this.props.commands.map(command => {
          return <Log command={ command } />
        })}
      </div>
    )
  }
}

export default Logs;