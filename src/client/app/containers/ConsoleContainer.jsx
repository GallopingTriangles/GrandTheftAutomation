import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommandLine from '../components/CommandLine.jsx';

class Console extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CommandLine />
      </div>
    )
  }
}

export default Console;