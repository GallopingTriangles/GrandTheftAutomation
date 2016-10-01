import React, { Component } from 'react';

export default class Bugs extends Component {
	render() {
		return (
      <div>
      	<i className='fa fa-bug' aria-hidden='true'></i>
      	{this.props.bugs}
      </div>
		);
	}
}