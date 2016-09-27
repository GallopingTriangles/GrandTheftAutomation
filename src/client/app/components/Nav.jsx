import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from '../../styles/Nav.css.js';

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <h2>Grand Theft Automation</h2>
        <ul className="nav navbar-nav navbar-right">
          <li><button>Logout</button></li>
          <li><button>Profile</button></li>
          <li><button>Home</button></li>
        </ul>
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