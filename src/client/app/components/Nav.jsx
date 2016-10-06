import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import changeUser from '../actions/changeUser.js';

import styles from '../../styles/Nav.css.js';

class Nav extends Component {

  /************************* TODO *************************/
  /* The buttons should route users to appropriate places */
  /********************************************************/

  logout() {
    fetch('/users/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => {
      data.json().then(response => {
        this.props.eraseUser();
        console.log('Logging out: ', response);
      })
    }).catch(err => {
      console.log('Error logging out: ', err);
    })
  }

  render() {
    return (
      <nav className="navbar navbar-default" style={styles.navbar}>
        <div className="container-fluid">
          <div className='navbar-header'>
            <a className='navbar-brand'>Grand Theft Automation</a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to='/'> Landing </Link></li>
            <li><Link to={ this.props.user ? '/game' : '/' }> Game </Link></li>
            <li><Link to='/' onClick={ this.logout.bind(this) }> Logout </Link></li>
            { this.props.user ? <li><Link to='/profile'>Logged in as { this.props.user }</Link></li> : null }
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    eraseUser: () => {
      dispatch(changeUser(''));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
