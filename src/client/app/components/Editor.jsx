import React, { Component } from 'react';
import { connect } from 'react-redux';
import Codemirror from 'react-codemirror';
import createGame from '../game/game.js';

class Editor extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Codemirror value={'// code'} />
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