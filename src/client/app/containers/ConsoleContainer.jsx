import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommandLine from '../components/CommandLine.jsx';
import styles from '../../styles/ConsoleContainerStyles.js';

class Console extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={ styles.container } >
        <CommandLine />
      </div>
    )
  }
}

export default Console;