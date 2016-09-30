import React, { Component } from 'react';
import Nav from '../app/components/Nav.jsx';

/*******************************************************/
/* Renders a navigation bar at the top                 */
/* Then depending on the current route,                */
/* the appropriate components are rendered as children */
/*******************************************************/

const PageContainer = props => (
  <div>
    <Nav />
    { props.children }
  </div>
)

export default PageContainer;