import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from '../../styles/Nav.css.js';

class Nav extends Component {
  render() {
    return (
      <div style={ styles.container } >
        <h2 style={ styles.header } >Grand Theft Automation</h2>
        <button style={ styles.button } >Logout</button>
        <button style={ styles.button } >Profile</button>
        <button style={ styles.button } >Home</button>
      </div>
    )
  }
}

Nav.contextTypes = {
  store: PropTypes.object
}

var mapStateToProps = (state) => {
  return {
    store: state
  }
}

export default connect(mapStateToProps)(Nav);