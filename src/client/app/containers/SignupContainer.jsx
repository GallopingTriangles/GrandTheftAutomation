import React, { Component } from 'react';

class SignupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { // altering this state requires altering the POST request FYI
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

        // clear the form
        this.setState({
          email: '',
          username: '',
          password: ''
        })

        console.log(result.message);
      })
    }).catch(err => {
      console.log('Error in signup request');
    })
  }

  render() {
    return (
      <div style={{float: 'left'}}>
        <form className="landing-form" onSubmit={ this.createUser.bind(this) } >
          <p className="white-text">Email: <input className="black-text" onChange={ (e) => this.updateForm('email', e) } value={ this.state.email } required/></p>
          <p className="white-text">Username: <input className="black-text" onChange={ (e) => this.updateForm('username', e) } value={ this.state.username } required/></p>
          <p className="white-text">Password: <input className="black-text" onChange={ (e) => this.updateForm('password', e) } value={ this.state.password } type='password' required/></p><br/>
          <button className="btn btn-landing" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default SignupContainer;