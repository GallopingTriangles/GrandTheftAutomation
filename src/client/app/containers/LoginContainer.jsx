import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import changeUser from '../actions/changeUser.js';
import changeLevel from '../actions/changeLevel.js';

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
        console.log('login result: ', result.message);

        /** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR **/

        /*********  THIS WILL STILL TAKE THE USER TO THE GAME EVEN IF THE LOGIN IS INVALID  *********/
        /*********  THIS WILL STILL TAKE THE USER TO THE GAME EVEN IF THE LOGIN IS INVALID  *********/
        /*********  THIS WILL STILL TAKE THE USER TO THE GAME EVEN IF THE LOGIN IS INVALID  *********/
        /*********  THIS WILL STILL TAKE THE USER TO THE GAME EVEN IF THE LOGIN IS INVALID  *********/
        /*********  THIS WILL STILL TAKE THE USER TO THE GAME EVEN IF THE LOGIN IS INVALID  *********/
        
        /** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR **/

        /* Dispatch an action to change the current user in the store */
        this.props.changeUser(this.state.username);
        this.props.resetLevel();

        /* clear the form */
        this.setState({
          username: '',
          password: ''
        })

        /* Redirect the user to the game */
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

/*************************************************************/
/*************************************************************/
/********************* CAN WE DELETE?! ***********************/
/********************* CAN WE DELETE?! ***********************/
/********************* CAN WE DELETE?! ***********************/
/*************************************************************/
/*************************************************************/
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  /*
  ** Functions to dispatch actions that will set the current user in the store to the logged in user
  ** and reset the game level to level 0 in case a previously logged in user was on a higher level.
  */
  return {
    changeUser: (user) => {
      dispatch(changeUser(user));
    },
    resetLevel: () => {
      dispatch(changeLevel(0));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));
