import React, { Component } from 'react';
import { withRouter } from 'react-router';

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

  createUser(e) { // POST request to create a user
    e.preventDefault();
    fetch('/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => {
      console.log('signup status: ', res.status);
      res.json().then(result => {
        console.log('signup response: ', result.message);

        /** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ***/

        /*********  THIS WILL STILL TAKE THE USER TO THE GAME EVEN IF THE SIGNUP IS INVALID  *********/
        /*********  THIS WILL STILL TAKE THE USER TO THE GAME EVEN IF THE SIGNUP IS INVALID  *********/
        /*********  THIS WILL STILL TAKE THE USER TO THE GAME EVEN IF THE SIGNUP IS INVALID  *********/
        /*********  THIS WILL STILL TAKE THE USER TO THE GAME EVEN IF THE SIGNUP IS INVALID  *********/
        /*********  THIS WILL STILL TAKE THE USER TO THE GAME EVEN IF THE SIGNUP IS INVALID  *********/
        
        /** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ***/

        /* clear the form after it has been submitted */
        this.setState({
          email: '',
          username: '',
          password: ''
        })

        /* Redirect the logged in user to the game */
        this.props.router.push('/game');
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

export default withRouter(SignupContainer);