import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import styles from '../../styles/Nav.css.js';

class Nav extends Component {

  /************************* TODO *************************/
  /* The buttons should route users to appropriate places */
  /********************************************************/

  render() {
    return (
      <nav className="navbar navbar-default" style={styles.navbar}>
        <div className="container-fluid">
          <div className='navbar-header'>
            <a className='navbar-brand'>Grand Theft Automation</a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to='/'> Landing </Link></li>
            <li><Link to='/game'> Game </Link></li>
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