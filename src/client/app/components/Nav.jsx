import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import styles from '../../styles/Nav.css.js';

class Nav extends Component {
  render() {
    return (
      <div style={ styles.container } >
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