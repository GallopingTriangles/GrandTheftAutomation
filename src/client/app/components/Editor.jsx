import React, { Component } from 'react';
import { connect } from 'react-redux';
import Codemirror from 'react-codemirror';
require('codemirror/mode/javascript/javascript');    // JavaScript mode
require('codemirror/addon/edit/closebrackets');      // automatically close brackets
require('codemirror/addon/edit/matchbrackets');      // highlight brackets
require('codemirror/addon/lint/javascript-lint.js'); // LINTER IS NOT WORKING!!!
import createGame from '../game/game.js';

class Editor extends Component {
	constructor(props) {
		super(props);
	}

	updateCode(newCode) {
		console.log(newCode);
	} 

  // == CODEMIRROR ==================================================================
	render() {
		// codemirror options
		var options = {
			lineNumbers: true,
			mode:  'javascript',
			theme: 'monokai',
			tabSize: 2,
			autoCloseBrackets: true,
			lint: true,
			matchBrackets: true,
			viewportMargin: Infinity
		}
		// return codemirror
		return (
			<div>
			  <Codemirror value={'// code'} onChange={this.updateCode.bind(this)} options={options} />
			  <div className='editor-footer'>
			    <button className='btn btn-primary'>Run</button>
			    <button className='btn btn-danger'>Reset</button>
			  </div>
			</div>
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