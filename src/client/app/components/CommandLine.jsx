import React, { Component } from 'react';
import { connect } from 'react-redux';
import createCommand from '../actions/UserCommandAction.js';
import styles from '../../styles/CommandLineStyles.css.js';

class CommandLine extends Component {
  // == REACT METHODS =================================================================
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
  }

  componentWillMount() { // invoked before initial rendering occurs
    this.getLearn();
    this.getInstructions();
    this.getCode();
  }

  componentDidMount() {  // invoked after components are rendered
    this.createEditor();
  }

  // == CUSTOM FUNCTIONS ==============================================================
  getLearn() {           // fetch level specific learnings from server
  }

  getInstructions() {    // fetch level specific instructions from server
  }

  getCode() {            // fetch level specific code from server
    var code = "// turn the engine on\n\nvar engine = 'off';"; // REFACTOR!!
    this.setState({input: code});
  }

  createEditor() {       // converts textarea into code editor after components are rendered 
    var textarea = document.getElementById('editor');
    var editor = CodeMirror.fromTextArea(textarea, {
      lineNumbers: true,
      mode:  'javascript',
      theme: 'monokai',
      tabSize: 2,
      autoCloseBrackets: true,
      lint: true,
      matchBrackets: true,
      viewportMargin: Infinity
    });
    editor.setValue(this.state.input);

    // change input state when editor changes
    editor.on('change', function() {
      this.setState({input: editor.getValue()});
    }.bind(this));
  }

  sendCommand(e) {
    e.preventDefault();
    // tell the store to add the command
    console.log(this.state.input);
    // this.props.sendCommand(this.props.level, this.state.input);
    // this.setState({
    //   input: ''
    // })
  }

  // == CODE EDITOR ===================================================================
  render() { 
    return (
      <div className='editor'>
        <div className='editor-header'>
          <ul className="list-inline">
            <li>
              <a href='#' className="btn btn-default btn-lg">
              <i className="fa fa-book" aria-hidden="true"></i> Learn
              </a>
            </li>
            <li>
              <a href='#' className="btn btn-default btn-lg">
              <i className="fa fa-check-square-o" aria-hidden="true"></i> Instructions
              </a>
            </li>
            <li>
              <a href='#' className="btn btn-default btn-lg">
              <i className="fa fa-code" aria-hidden="true"></i> Code
              </a>
            </li>
            <li>
              <a href='#' className="btn btn-default btn-lg">
              <i className="fa fa-bug" aria-hidden="true"></i> Bug Report
              </a>
            </li>
          </ul>
        </div>
        <div className='editor-container'>
          <textarea id='editor'></textarea>
        </div>
        <div className='editor-footer'>
          <button className='btn btn-primary' onClick={this.sendCommand.bind(this)}>Run</button>
          <button className='btn btn-danger'>Reset</button>
        </div>
      </div>
    );
  }
}

// == REDUX =========================================================================
// maps the current level from store into the props
var mapStateToProps = state => {
  return {
    level: state.level,
  }
}

// adds the user's command to the array of previous commands
var mapDispatchToProps = dispatch => {
  return {
    sendCommand: (level, command) => {
      dispatch(createCommand(level, command));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommandLine);