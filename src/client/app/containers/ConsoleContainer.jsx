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
    // this.fetchSolutions();

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

  // == FETCH FROM SERVER ================================================================
  // fetchSolutions() {
  //   var url = `/game?username=${this.props.user}`;

  //   fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(response => {
  //     response.json().then(solutions => {
  //       var solution = (_.filter(solutions, (el) => {
  //         return el.level === this.props.level;
  //       }))[0];
  //       this.setState({
  //         input: solution ? solution.solution : '// iNPuT YouR CoDE HeRe WooOoOOoOooOOoOooO\n\n'
  //       });
  //     });
  //   }).catch(err => {
  //     console.log('error fetching code: ', err);
  //   });
  // }

  postSolution() {
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
        createGame(response.phaser);
        this.setState({bugs: response.bugs});
      })
    }).catch(err => {
      console.log('Error saving input: ', err);
    });
  }

  // == TOGGLE STATE =====================================================================
  stateLearn(e) {
    e.preventDefault();
    this.setState({tab: 'learn'});
  }

  stateInstructions(e) {
    e.preventDefault();
    this.setState({tab: 'instructions'});
  }

  stateEditor(e) {
    e.preventDefault();
    this.setState({tab: 'editor'});
  }

  stateBugs(e) {
    e.preventDefault();
    this.setState({tab: 'bugs'})
  }

  // == EDITOR INPUT =====================================================================
  codeChange(newCode) {
    this.setState({ input: newCode });
  }

  codeFetch() {
    this.postSolution();
  }

  codeReset() {
    // REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR
    this.setState({input: '// Input your code here\n\nvar engine = false;'}); // REFACTOR REFACTOR REFACTOR
    // REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR REFACTOR
  }

  // == RENDER FUNCTIONS =================================================================
  renderContent() {
    switch (this.state.tab) {
      case 'learn': return <Learn />;
      case 'instructions': return <Instructions />;
      case 'editor': return <Editor 
                            code={ this.state.input } 
                            inputChange={ this.codeChange.bind(this) } 
                            runInput={ this.codeFetch.bind(this) } 
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
                onClick={ this.stateLearn.bind(this) }>
                <i className='fa fa-book' aria-hidden='true'></i> Learn
              </button>
              <button 
                type='button' 
                className='btn btn-default' 
                onClick={ this.stateInstructions.bind(this) }>
                <i className='fa fa-check-square-o' aria-hidden='true'></i> Instruction
                </button>
              <button 
                type='button' 
                className='btn btn-default' 
                onClick={ this.stateEditor.bind(this) }>
                <i className='fa fa-code' aria-hidden='true'></i> Code
                </button>
              <button 
                type='button' 
                className='btn btn-default' 
                onClick={ this.stateBugs.bind(this) }>
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