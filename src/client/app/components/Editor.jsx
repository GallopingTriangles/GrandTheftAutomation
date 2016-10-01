import React, { Component } from 'react';
import { connect } from 'react-redux';
import createGame from '../game/game.js';

class Editor extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>Hello</div>
		);
	}
}

// == REDUX =========================================================================
var mapStateToProps = state => {
  return {
    level: state.level,
    user: state.user
  }
}

var mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);