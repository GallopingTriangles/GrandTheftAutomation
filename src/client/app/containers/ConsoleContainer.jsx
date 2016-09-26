import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommandLine from '../components/CommandLine.jsx';
import styles from '../../styles/ConsoleContainerStyles.js';
import LogsContainer from './LogsContainer.jsx';

class Console extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={ styles.container } >
        <CommandLine />
        <LogsContainer level={ this.props.level } />
      </div>
    )
  }
}

var mapStateToProps = state => {
  return {
    level: state.level
  }
}

export default connect(mapStateToProps)(Console);