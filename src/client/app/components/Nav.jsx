import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import changeUser from '../actions/changeUser.js';

import styles from '../../styles/Nav.css.js';

class Nav extends Component {

  /************************* TODO *************************/
  /* The buttons should route users to appropriate places */
  /* with Link components from react-router               */
  /********************************************************/

  logout() {
    fetch('/users/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(data => {
      data.json().then(response => {
        /*
        ** Remove the username from the Redux Store by setting it to an empty string.
        ** The Game Page will check for a user in the Redux Store when mounting,
        ** and cause a redirect back to the landing page if no user is found.
        */
        this.props.eraseUser();
        console.log('Logging out: ', response);
      })
    }).catch(err => {
      console.log('Error logging out: ', err);
    })
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className='navbar-header'>
            <a className='navbar-brand'><span style={{color: 'red'}}>GTA</span>utomation</a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to='/'> Home </Link></li>
            <li><Link to={ this.props.user ? '/game' : '/' }> Game </Link></li>
            <li><Link to='/' onClick={ this.logout.bind(this) }> Logout </Link></li>
            { this.props.user ? <li><Link to='/profile'>{ this.props.user }</Link></li> : null }
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => {
  /* Gives the Nav component access to the logged in user, to render as a Link on the Nav Bar  */
  return {
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  /* A function to dispatch an action that sets the user to an empty string in the Redux Store */
  return {
    eraseUser: () => {
      dispatch(changeUser(''));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
