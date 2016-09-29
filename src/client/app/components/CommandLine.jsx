import React, { Component } from 'react';
import { connect } from 'react-redux';
import createCommand from '../actions/UserCommandAction.js';
import styles from '../../styles/CommandLineStyles.css.js';
import createGame from '../game/game.js';
import $ from 'jquery';

/*************************************  TODO  ****************************************/
/********* connect level switch dispatch to props that will change the level *********/

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
    this.getCode(); // populate the editor with the appropriate code
  }

  componentDidMount() {  // invoked after components are rendered
    // this.createEditor();
    /******************** NOTE *********************/
    /***********************************************/
    /* invoking createEditor in componentWillMount */
  }

  // == CUSTOM FUNCTIONS ==============================================================
  getLearn() {           // fetch level specific learnings from server
  }

  getInstructions() {    // fetch level specific instructions from server
  }

  getCode() {            // fetch level specific code from server

    /* construct the url with the username as a query param */
    /* username currently hardcoded as "test" FIX LATER!!!! */
    var url = `/game?username=${'test'}`

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json().then(solutions => {
        /* The server returns an array that contain the user's */
        /* saved solutions for every level.                    */
        /* We will grab the solution for the current level.    */
        var level = this.props.level;
        var code;
        if (solutions.length) {
          /* If the server finds the user's saved solution     */
          /* then set the state with that code                 */
          code = solutions.filter(solution => {
            return solution.level === this.props.level;
          })[0].solution;
        } else {
          /* otherwise write a default message to the editor   */
          code = '// iNPuT YouR CoDE HeRe WooOoOOoOooOOoOooO\n\n';
        }

        /* Store the saved solution onto the component's state */
        this.setState({
          input: code
        })

        /* Fills out the code editor with the saved solution   */
        this.createEditor();
      })
    }).catch(err => {
      console.log('error fetching code: ', err);
    })
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
    /* No need to save the user's code to the store        */
    /* Just need to send it to the server to be translated */
    /* And then run createGame() based on the response to 
         generate a custom game built by the user's code   */
    /* This removes the need to re-hydrate the store       */
    e.preventDefault();

    // remove the current running game from the DOM
    $('canvas').remove();
    // generate a modified game based on the user's code
    // needs to be fetch callback in response to server response object
    createGame();


    console.log(this.state.input);
    // POST request
    // saves the user's code to the database after stringifying it
    fetch('/game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        /******* WARNING ************ WARNING ************* WARNING ********/
        /*********** the username is hardcoded as 'test' for now ***********/
        /* this won't work unless you have 'test' username in the database */
        username: 'test',
        /*******************************************************************/
        /*******************************************************************/
        level: this.props.level,
        log: this.state.input
      })
    }).then(res => {
      console.log('res: ', res);
      res.json().then(response => {
        // acting weird for some reasone
        // but it still is being saved into DB correctly
        // dunno why it throws a weirdass error
        console.log('response: ', response);
      })
    }).catch(err => {
      console.log('Error saving input: ', err);
    });
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