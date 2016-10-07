import React, { Component } from 'react';

export default class Instructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      1: 'Here are the instructions for level 1',
      2: 'Here are the instructions for level 2',
      3: 'Here are the instructions for level 3',
      4: 'Here are the instructions for level 4'
    };
  }
	render() {
		return (
      <div>{ this.state[this.props.level] }</div>
		);
	}
}