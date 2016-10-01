import React, { Component } from 'react';
import Signup from '../app/containers/SignupContainer.jsx';
import Login from '../app/containers/LoginContainer.jsx';

/*******************************************************/
/* Renders the landing page as the first page          */
/* This will have the login/signup forms               */
/* as well as AV information for users                 */
/*******************************************************/

const LandingPage = props => (
  <div>
    <Signup />
    <Login />
  </div>
)

export default LandingPage;