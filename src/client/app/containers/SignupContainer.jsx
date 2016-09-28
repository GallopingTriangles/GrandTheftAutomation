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

  updateForm(form, e) { // tracks the inputs on email, username, password form
    e.preventDefault();
    var creds = {};
    creds[form] = e.target.value;
    this.setState(creds);
  }

  createUser(e) { // POST request to create a server
    e.preventDefault();
    fetch('/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => {
      console.log('signup status: ', res.status);
      res.json().then(result => {
        /* process result based on the status code  */
        /* 201 for creating a new user successfully */
        /* 200 for pre-existing user error          */
        /* 400 for error in user                    */
        console.log(result);
      })
    }).catch(err => {
      console.log('Error in signup request');
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={ this.createUser.bind(this) } >
          <p>Email: <input onChange={ (e) => this.updateForm('email', e) } required/></p><br/>
          <p>Username: <input onChange={ (e) => this.updateForm('username', e) } required/></p><br/>
          <p>Password: <input onChange={ (e) => this.updateForm('password', e) } type='password' required/></p><br/>
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default SignupContainer;