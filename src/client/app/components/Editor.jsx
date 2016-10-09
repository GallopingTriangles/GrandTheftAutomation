import React, { Component } from 'react';
import { connect } from 'react-redux';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';    // JavaScript mode
import 'codemirror/addon/edit/closebrackets';      // automatically close brackets
import 'codemirror/addon/edit/matchbrackets';      // highlight brackets
import 'codemirror/addon/lint/javascript-lint.js'; // LINTER IS NOT WORKING!!!
// import createGame from '../game/game.js';

class Editor extends Component {
	constructor(props) {
		super(props);
	}

  // == COMMUNICATE WITH CONTAINER ==================================================
	updateCode(newCode) {
		this.props.inputChange(newCode);
	}

	runCode() {
    this.props.runInput();
	}

	resetCode() {
    this.props.resetInput();
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
			  <Codemirror value={this.props.code} onChange={this.updateCode.bind(this)} options={options} />
			  <div className='editor-footer'>
			    <button className='btn btn-primary' onClick={this.runCode.bind(this)}>Run</button>
			    <button className='btn btn-danger' onClick={this.resetCode.bind(this)}>Reset</button>
			  </div>
			</div>
		);
	}
}

export default Editor;