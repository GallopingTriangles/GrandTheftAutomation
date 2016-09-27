import React, { Component } from 'react';

class SignupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: ''
    };
  }

  updateForm(form, e) {
    
  }

  createUser(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.createUser.bind(this) } >
          <p>Email: <input required/></p><br/>
          <p>Username: <input required/></p><br/>
          <p>Password: <input type='password' required/></p><br/>
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default SignupContainer;