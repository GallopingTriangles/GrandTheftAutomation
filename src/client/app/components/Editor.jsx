import React, { Component } from 'react';
import { connect } from 'react-redux';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';    // JavaScript mode
import 'codemirror/addon/edit/closebrackets';      // automatically close brackets
import 'codemirror/addon/edit/matchbrackets';      // highlight brackets
import 'codemirror/addon/lint/javascript-lint.js'; // LINTER IS NOT WORKING!!!

class Editor extends Component {
	constructor(props) {
		super(props);
	}

  /* Allow the editor to communicate with the parent component */

	inputChange(newCode) { // updates the code in the editor
		this.props.inputChange(newCode);
	}

	runCode() { // runs the user's code by sending it to the server
    this.props.runCode();
	}

	resetInput() { // reset the code editor to the default
    this.props.resetInput();
	}

	render() {
		var options = { // codemirror options
			lineNumbers: true,
			mode:  'javascript',
			theme: 'monokai',
			tabSize: 2,
			autoCloseBrackets: true,
			lint: true,
			matchBrackets: true,
			viewportMargin: Infinity
		}

		return (
			<div>
			  <Codemirror value={ this.props.code } onChange={ this.inputChange.bind(this) } options={ options } />
			  <div className='editor-footer'>
			    <button className='btn btn-primary' onClick={ this.runCode.bind(this) }> Run </button>
			    <button className='btn btn-danger' onClick={ this.resetInput.bind(this) }> Reset </button>
			  </div>
			</div>
		);
	}
}

export default Editor;