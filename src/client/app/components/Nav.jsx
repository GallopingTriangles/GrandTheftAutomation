import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from '../../styles/Nav.css.js';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className='navbar-header'>
            <a className='navbar-brand'>Grand Theft Automation</a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><a href='#'>Logout</a></li>
            <li><a href='#'>Profile</a></li>
            <li><a href='#'>Home</a></li>
          </ul>
        </div>
      </nav>
    )
  }
}

// Nav.contextTypes = {
//   store: PropTypes.object
// }

// var mapStateToProps = (state) => {
//   return {
//     store: state
//   }
// }

// export default connect(mapStateToProps)(Nav);
export default Nav;