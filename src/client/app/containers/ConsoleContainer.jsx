import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommandLine from '../components/CommandLine.jsx';
import Editor from '../components/Editor.jsx';
import LogsContainer from './LogsContainer.jsx';
import _ from 'underscore';

class Console extends Component {
  // == REACT METHODS ====================================================================
  constructor(props) {
    super(props);
    this.state = {
      tab: 'learn',
      input: '// code here\nvar engine = false;'
    };
  }

  componentWillMount() {
    this.fetchSolutions();
  }

  // == FETCH FROM SERVER ================================================================
  fetchSolutions() {
    var url = `/game?username=${this.props.user}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      response.json().then(solutions => {
        var solution = (_.filter(solutions, (el) => {
          return el.level === this.props.level;
        }))[0].solution;
        this.setState({input: solution});
      });
    }).catch(err => {
      console.log('error fetching code: ', err);
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
    this.setState({input: newCode});
  }

  codeFetch() {
    console.log('fetch code');
  }

  codeReset() {
    this.setState({input: '// code here\nvar engine = false;'});
  }

  // == RENDER FUNCTIONS =================================================================
  renderContent() {
    switch (this.state.tab) {
      case 'learn': return <div>LEARN</div>;
      case 'instructions': return <div>INSTRUCTIONS</div>;
      case 'editor': return <Editor code={this.state.input} inputChange={this.codeChange.bind(this)} runInput={this.codeFetch.bind(this)} resetInput={this.codeReset.bind(this)} />;
      case 'bugs': return <div>BUGS</div>;
      default: return <div>EDITOR</div>;
    }
  }

  // == RENDER COMPONENTS ================================================================
  render() {
    console.log(this.props);
    return (
      <div className='col-md-5'>
        <div className='console'>
          <div className='console-header'>
            <div className='btn-group' role='group'>
              <button 
                type='button' 
                className='btn btn-default' 
                onClick={this.stateLearn.bind(this)}>
                <i className='fa fa-book' aria-hidden='true'></i> Learn
              </button>
              <button 
                type='button' 
                className='btn btn-default' 
                onClick={this.stateInstructions.bind(this)}>
                <i className='fa fa-check-square-o' aria-hidden='true'></i> Instruction
                </button>
              <button 
                type='button' 
                className='btn btn-default' 
                onClick={this.stateEditor.bind(this)}>
                <i className='fa fa-code' aria-hidden='true'></i> Code
                </button>
              <button 
                type='button' 
                className='btn btn-default' 
                onClick={this.stateBugs.bind(this)}>
                <i className='fa fa-bug' aria-hidden='true'></i> Bug Report <span className='badge'>2</span>
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
    user: state.user
  }
}

var mapDispatchToProps = dispatch => {
  return {
  }
}

// connect() provides a link between the store and the component through the props
export default connect(mapStateToProps)(Console);