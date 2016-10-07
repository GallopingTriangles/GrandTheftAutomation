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

    
    /* SAMPLE SOLUTION FOR A HIGHER LEVEL DIFFICULTY */


    /************************************ SAMPLE SOLUTION *****************************************/
    /**********************************************************************************************/
    /**********************************************************************************************/
    /***********************


    // This level involves the sensor working and it will
    // either redirect the car or cause the car to stop;
    // This will be a solution that encompasses most features
    // of the game so we have to figure out how to parse all
    // possibilities that the user could submit.
    // They could have a working solution, in a different way,
    // or an incorrect solution.

    var engine = true;
    var color = 'black';
    var speed = 50;
    enable(sensor); // enables the use of the sensor for the user
    enable(distanceTracker); // keeps track of the distance to the destination

    if (sensor.right === true) {
      speed = speed - 20;
      turn('left');
    }
    if (sensor.left === true) {
      speed = speed - 20;
      turn('right');
    }
    if (sensor.front === true && sensor.right === true) {
      speed = speed - 20;
      turn('left');
    }
    if (sensor.front === true && sensor.left === true) {
      speed = speed - 20;
      turn('right');
    }
    if (sensor.All === false) {
      // return car to normal speed if no sensors detect an obstacle
      speed = 50;
    }

    while (distanceGPS.isIncreasing() === true) {
      // the distance to the destination is increasing, which means the
      // car is going in the wrong direction. So we should program the
      // car to keep turning until the car is in the correct direction.
      turn('right');
    }
    if (distanceGPS === 0) {
      // if the distance to destination is 0, then we can
      // stop the car and end the game. User wins.
      speed = 0;
    }

                                                                            ***********************/
    /**********************************************************************************************/
    /**********************************************************************************************/
    /**********************************************************************************************/
    /**********************************************************************************************/

    console.log('User submitted solution: ', this.state.input);
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

  setTab(e, tab) {
    e.preventDefault();
    this.setState({ tab })
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
      case 'instructions': return <Instructions level={ this.props.level }/>;
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
                onClick={ (e) => this.setTab(e, 'learn') } >
                <i className='fa fa-book' aria-hidden='true'></i> Learn
              </button>
              <button 
                type='button' 
                className='btn btn-default' 
                onClick={ (e) => this.setTab(e, 'instructions') }>
                <i className='fa fa-check-square-o' aria-hidden='true'></i> Instruction
                </button>
              <button 
                type='button' 
                className='btn btn-default' 
                onClick={ (e) => this.setTab(e, 'editor') }>
                <i className='fa fa-code' aria-hidden='true'></i> Code
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