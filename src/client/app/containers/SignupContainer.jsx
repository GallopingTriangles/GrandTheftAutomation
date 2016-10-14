import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import changeUser from '../actions/changeUser.js';
import changeLevel from '../actions/changeLevel.js';
import setCode from '../actions/setCode.js';

class SignupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      invalid: false
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

        if (result.message !== 'User already exists.') {

          /* Reset the current items in the store to accomadate the new user */
          this.props.changeUser(this.state.username);
          this.props.resetLevel();

          this.setState({ invalid: false });

          /* Redirect the logged in user to the game */
          this.props.router.push('/game');
          
        } else {
          /* clear the form after it has been submitted */
          /* and render an error message for invalid submission */
          this.setState({
            email: '',
            username: '',
            password: '',
            invalid: true
          })
        }

      })
    }).catch(err => {
      console.log('Error in signup request');
    })
  }

  render() {
    return (
      <div style={{float: 'left'}}>
        <form className="landing-form" onSubmit={ this.createUser.bind(this) } >
          <p className="white-text">Email: <input className="black-text" onChange={ (e) => this.updateForm('email', e) } value={ this.state.email } type='email' required/></p>
          <p className="white-text">Username: <input className="black-text" onChange={ (e) => this.updateForm('username', e) } value={ this.state.username } required/></p>
          <p className="white-text">Password: <input className="black-text" onChange={ (e) => this.updateForm('password', e) } value={ this.state.password } type='password' required/></p>
          { this.state.invalid ? <p style={{ color: 'red' }} > Sorry, that username already exists. </p> : null }
          <button className="btn btn-landing" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeUser: user => {
      dispatch(changeUser(user));
    },
    resetLevel: () => {
      dispatch(changeLevel(0));
    },
    resetCode: () => {
      dispatch(setCode('// Input your code here\n\n'));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupContainer));