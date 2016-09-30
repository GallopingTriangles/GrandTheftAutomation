import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router';

class AllRoutes extends Component {
  contructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router history={ hashHistory } >
        
      </Router>
    )
  }
}