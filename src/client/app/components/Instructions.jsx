import React, { Component } from 'react';
import level from './instructionsTextFile.js';

export default class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      0: level.zero,
      1: level.one,
      2: level.two,
      3: level.three,
      4: level.four,
      5: level.five,
      6: level.six,
      7: level.seven,
      8: level.eight,
      9: level.nine,
      10: level.ten,
      11: level.eleven
    };
  }
	render() {
    return (
      <div style={{backgroundColor: '#272822', height: 'calc(100vh - 180px)'}}>
        { this.state[this.props.level].split('\n').map(line => (
          <p style={{color: '#f8f8f2'}}key={ Math.random() }> { line } </p>
        )) }
      </div>
    )
	}
}
