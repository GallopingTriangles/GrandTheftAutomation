import React, { Component } from 'react';

class SignupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <form>
          <p>Email: <input required/></p><br/>
          <p>Username: <input required/></p><br/>
          <p>Password: <input type='password' required/></p><br/>
          <input type='submit' />
        </form>
      </div>
    )
  }
}