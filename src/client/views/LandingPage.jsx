import React, { Component } from 'react';
import Signup from '../app/containers/SignupContainer.jsx';
import Login from '../app/containers/LoginContainer.jsx';

const LandingPage = props => (
  <div>
    <Signup />
    <Login />
  </div>
)

export default LandingPage;