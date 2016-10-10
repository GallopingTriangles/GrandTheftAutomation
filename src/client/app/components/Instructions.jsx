import React, { Component } from 'react';
import level from './instructionsTextFile.js';

export default class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      1: level.one,
      2: level.two,
      3: level.three,
      4: level.four
    };
  }
	render() {
		return (
      <div>{ this.state[this.props.level] }</div>
		);
	}
}
