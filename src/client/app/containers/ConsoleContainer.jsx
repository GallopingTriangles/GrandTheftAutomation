import React, { Component } from 'react';
import { connect } from 'react-redux';
import Editor from '../components/Editor.jsx';
import Instructions from '../components/Instructions.jsx';
import Bugs from '../components/Bugs.jsx';
import createGame from '../game/game.js';
import setCode from '../actions/setCode.js';
import $ from 'jquery';

class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'editor',
      bugs: []
    };
  }

  componentWillMount() {

    var url = `/game?username=${ this.props.user }`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      res.json().then(response => {

        /* response is an array of submitted solution code per level */
        /* filter out the correct code for the level                 */
        var code = response.filter(levelCode => {
          return levelCode.level === this.props.level;
        })[0].solution || '// Input your code here\n\n';
        console.log(code);

        /* Set the current code in the Redux store to the fetched code on load */
        this.props.setCode(code);

      })

    }).catch(err => {
      console.log('Error fetching code: ', err);
    })
  }

  postSolution() {

    console.log('User submitted solution: ', this.props.currentCode);

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
        log: this.props.currentCode
      })
    }).then(res => {
      console.log('res: ', res);
      res.json().then(response => {

        /* The response from the server is an object that is used to create */
        /* the game create a new game based off of the response object      */
        /* The response also comes with a bug report describing the user's  */
        /* errors in the form of passing or failing a particular test       */
        console.log('phaser response: ', response.phaser);
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
  inputChange(newCode) {
    this.props.setCode(newCode);
  }

  codeReset() {
    this.props.setCode('// Input your code here\n\n');
  }

  /* Decide which component to render based on which tab is currently active */
  renderContent() {
    switch (this.state.tab) {
      case 'instructions': return <Instructions level={ this.props.level }/>;

      case 'editor': return <Editor 
                              code={ this.props.currentCode }
                              inputChange={ this.inputChange.bind(this) } 
                              runCode={ this.postSolution.bind(this) } 
                              resetInput={ this.codeReset.bind(this) } />;
      case 'bugs': return <Bugs bugs={ this.state.bugs } />;
      
      default: return <div>Oops! Something went wrong. Try refreshing the page.</div>;
    }
  }

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

/* Allow access to the redux store through the props */
/*                                                   */
var mapStateToProps = state => {
  return {
    level: state.level,
    user: state.user,
    currentCode: state.currentCode
  }
}

var mapDispatchToProps = dispatch => {
  return {
    setCode: (code) => {
      dispatch(setCode(code));
    }
  }
}
/*                                                   */
/* * * * * * * * * * * * * * * * * * * * * * * * * * */

export default connect(mapStateToProps, mapDispatchToProps)(Console);