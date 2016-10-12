import React, { Component } from 'react';
import { connect } from 'react-redux';
// import CommandLine from '../components/CommandLine.jsx';
import Editor from '../components/Editor.jsx';
import Learn from '../components/Learn.jsx';
import Instructions from '../components/Instructions.jsx';
import Bugs from '../components/Bugs.jsx';
import LogsContainer from './LogsContainer.jsx';
import _ from 'underscore';
import createGame from '../game/game.js';
import $ from 'jquery';

class Console extends Component {
  // == REACT METHODS ====================================================================
  constructor(props) {
    super(props);
    this.state = {
      tab: 'editor',
      // input: '',
      input: '',
      bugs: []
    };
  }

  componentWillMount() {

    /*************************************************************/
    /* DIRTIEST HACK EVER... NEED TO FIGURE OUT A WORKAROUND     */
    /* This sends the Console component context up to the parent */
    /* So the parent can set the 'currentCode' into this state   */
    /*   because the console wasn't refreshing on its own,       */
    /*   even though the store's state was changing              */
    /*   and the store's currentCode is mapped to props...       */
    /*                                                           */
    /* Why we doing this?? To get the editor to change when      */
    /*  switching levels from the footer                         */
    /*************************************************************/

    var childContext = this;
    this.props.setConsole(childContext);
  }

  postSolution() {

    console.log('User submitted solution: ', this.state.input);

    // remove the currently rendered game so we can create a new one
    $('canvas').remove();

    fetch('/game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.props.user,
        level: this.props.level,
        log: this.state.input
      })
    }).then(res => {
      console.log('res: ', res);
      res.json().then(response => {
        /* The response from the server is an object that is used to create */
        /* the game create a new game based off of the response object      */
        /* The response also comes with a bug report describing the user's  */
        /* errors in the form of passing or failing a particular test       */
        console.log('phaser response: ', response.phaser);
        console.log('phaser bugs: ', response.bugs);
        createGame(response.phaser, this.props.level);
        this.setState({bugs: response.bugs});
      })
    }).catch(err => {
      console.log('Error saving input: ', err);
    });
  }

  setTab(e, tab) {
    e.preventDefault();
    this.setState({ tab })
  }

  /* Keep track of the user's code from the editor by storing it in state */
  codeChange(newCode) {
    this.setState({ input: newCode });
  }

  codeReset() {
    // REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR
    this.setState({input: '// Input your code here\n\n'}); // REFACTOR REFACTOR REFACTOR
    // REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR
  }

  // == RENDER FUNCTIONS =================================================================
  renderContent() {
    switch (this.state.tab) {
      case 'learn': return <Learn />;
      case 'instructions': return <Instructions level={ this.props.level }/>;
      case 'editor': return <Editor 
                            code={ this.state.input } 
                            inputChange={ this.codeChange.bind(this) } 
                            runInput={ this.postSolution.bind(this) } 
                            resetInput={ this.codeReset.bind(this) } />;
      case 'bugs': return <Bugs bugs={ this.state.bugs } />;
      default: return <div>ERROR</div>;
    }
  }

  // == RENDER COMPONENTS ================================================================
  render() {
    return (
      <div className='col-md-5'>
        <div className='console'>

          <div className='console-header'>
            <div className='btn-group' role='group'>
              <button 
                type='button' 
                className='btn btn-default' 
                onClick={ (e) => this.setTab(e, 'instructions') }>
                <i className='fa fa-check-square-o' aria-hidden='true'></i> Instructions
                </button>
              <button 
                type='button' 
                className='btn btn-default' 
                onClick={ (e) => this.setTab(e, 'editor') }>
                <i className='fa fa-code' aria-hidden='true'></i> Code Editor
                </button>
              <button 
                type='button' 
                className='btn btn-default' 
                onClick={ (e) => this.setTab(e, 'bugs') }>
                <i className='fa fa-bug' aria-hidden='true'></i> Bug Report <span className='badge'>{ this.state.bugs.length }</span>
              </button>
            </div>
          </div>

          <div className='console-content'>
            { this.renderContent() }
          </div>

          <div className='console-footer'>
          </div>

        </div>
      </div>
    )
  }
}

// == REDUX ============================================================================
var mapStateToProps = state => {
  return {
    level: state.level,
    user: state.user,
    currentCode: state.currentCode
  }
}

var mapDispatchToProps = dispatch => {
  return {
    // postSolution: (level, command) => {
    //   dispatch(createCommand(level, command));
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Console);