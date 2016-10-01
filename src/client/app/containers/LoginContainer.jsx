import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import changeUser from '../actions/changeUser.js';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  loginUser(e) { // POST request to create a server
    e.preventDefault();
    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => {
      res.json().then(result => {

        /* Dispatch an action to change the current user in the store */
        this.props.changeUser(this.state.username);
        console.log(result.message);
        
        // clear the form
        this.setState({
          username: '',
          password: ''
        })
        this.props.router.push('/game');
      })
    }).catch(err => {
      console.log('Error in signup request');
    })
  }

  render() {
    return (
      <div style={{float: 'left'}}>
        <form className="landing-form" onSubmit={ this.loginUser.bind(this) } >
          <p className="white-text">Username: <input className="black-text" onChange={ (e) => this.updateForm('username', e) } value={ this.state.username } required/></p>
          <p className="white-text">Password: <input className="black-text" onChange={ (e) => this.updateForm('password', e) } value={ this.state.password } type='password' required/></p><br/>
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
    changeUser: (user) => {
      dispatch(changeUser(user));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));