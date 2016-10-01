import React, { Component } from 'react';
import { connect } from 'react-redux';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.state);
    return (
      <footer className='footer'>
        <div className='container'>
          <button className='btn btn-primary col-md-1' disabled>Back</button>
          <h5 className='col-md-10 text-center'>1 / 4</h5>
          <button className='btn btn-primary col-md-1'>Next</button>
        </div>
      </footer>  
    );
  }
}

var mapStateToProps = state => {
  return {
    level: state.level
  }
}

// connect() provides a link between the store and the component through the props
export default connect(mapStateToProps)(Footer);