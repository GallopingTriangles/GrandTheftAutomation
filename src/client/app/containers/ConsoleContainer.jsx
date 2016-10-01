import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommandLine from '../components/CommandLine.jsx';
import styles from '../../styles/ConsoleContainerStyles.js';
import LogsContainer from './LogsContainer.jsx';

class Console extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'editor'
    };
  }

  renderLearn() {
    
  }

  renderEditor() {
    return <CommandLine />;
  }

  render() {
    return (
      <div className='console col-md-5'>
        <div className='console-header'>
          <div className='btn-group' role='group'>
            <button type='button' className='btn btn-default' onClick={this.renderLearn}><i className='fa fa-book' aria-hidden='true'></i> Learn</button>
            <button type='button' className='btn btn-default'><i className='fa fa-check-square-o' aria-hidden='true'></i> Instruction</button>
            <button type='button' className='btn btn-default'><i className='fa fa-code' aria-hidden='true'></i> Code</button>
            <button type='button' className='btn btn-default'><i className='fa fa-bug' aria-hidden='true'></i> Bug Report</button>
          </div>
        </div>
        <div className='console-content'>
          
        </div>
        <div className='console-footer'>
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