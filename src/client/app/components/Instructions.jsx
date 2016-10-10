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

var levelOne = 'LEVEL 1\n' +
          'Welcome to GTA\n' +
          '(a sentence for introducing AV shit...)\n' +
          'Let\'s turn on your engine, need to use a special tool called "enable"\n' +
          'Type <code> enable(\'engine\'); </code>\n' +
          'Now let\'s give the car a speed\n' +
          'Type <code> setSpeed(30) </code>\n' +
          'If you want to customize your car... <code> setColor(\'black\'); </code>' +
          'The semicolons are used to separate statements';
          'Click RUN to see the car you\'ve just programmed!';