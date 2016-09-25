import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Nav from './Nav.jsx';
import Console from '../containers/ConsoleContainer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Nav />
        <p>Hey mang</p>
        <p>Grand Theft Automation</p>
        <Console />
      </div>
    )
  }
}

// inject state from store into props of App
var mapStateToProps = state => {
  return {
    command: state.userCommand.command,
  }
};

// // inject dispatch method into props of App
// var mapDispatchToProps = dispatch => {
//   return {
//     click: () => {
//       dispatch({
//         type: 'INPUT_COMMAND',
//         command: 'clicked!'
//       });
//     }
//   }
// }

// connect() provides a link between this component and the store through the props
export default connect(mapStateToProps, mapDispatchToProps)(App);