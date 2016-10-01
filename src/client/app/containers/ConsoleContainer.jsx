import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommandLine from '../components/CommandLine.jsx';
import styles from '../../styles/ConsoleContainerStyles.js';
import LogsContainer from './LogsContainer.jsx';

class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'learn'
    };
  }

  // == CHANGE STATE =====================================================================
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

  // == RENDER FUNCTIONS =================================================================
  renderContent() {
    switch (this.state.tab) {
      case 'learn': return <div>LEARN</div>;
      case 'instructions': return <div>INSTRUCTIONS</div>;
      case 'editor': return <CommandLine />;
      case 'bugs': return <div>BUGS</div>;
      default: return <div>EDITOR</div>;
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

// REMOVED COMMANDLINE
// render() {
//   return (
//       <div className='col-md-5'>
//         <CommandLine />
//       </div>
//   )
// } 

var mapStateToProps = state => {
  return {
    level: state.level
  }
}

// connect() provides a link between the store and the component through the props
export default connect(mapStateToProps)(Console);