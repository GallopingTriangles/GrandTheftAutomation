import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from './Nav.jsx';

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
      </div>
    )
  }
}

export default connect()(App);