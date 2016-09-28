import React, { Component } from 'react';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { // altering this state requires altering the POST request FYI
      username: '',
      password: ''
    };
  }

  updateForm(form, e) { // tracks the inputs on username and password form
    e.preventDefault();
    var creds = {};
    creds[form] = e.target.value;
    this.setState(creds);
  }

  createUser(e) { // POST request to create a server
    e.preventDefault();
    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => {
      console.log('login status: ', res.status);
      res.json().then(result => {
        /* decide response base on status codes */
        console.log(result);
      })
    }).catch(err => {
      console.log('Error in signup request');
    })
  }

  render() {
    return (
      <div>
        <h4>Log in</h4>
        <form onSubmit={ this.createUser.bind(this) } >
          <p>Username: <input onChange={ (e) => this.updateForm('username', e) } required/></p><br/>
          <p>Password: <input onChange={ (e) => this.updateForm('password', e) } type='password' required/></p><br/>
          <input type='submit' />
        </form>
      </div>
    )
  }
}

export default LoginContainer;