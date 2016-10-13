import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import changeUser from '../actions/changeUser.js';

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

        /** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ***/
        /*********************************************************************************************/

        /***      THIS WILL THROW A WEIRD ERROR WHEN REDIRECTING TO GAME BECAUSE THERE IS NO      ****
         ************      SAVED SOLUTION CODE IN THE DATABASE FOR THE NEW USER      *****************/

        /***      THIS WILL THROW A WEIRD ERROR WHEN REDIRECTING TO GAME BECAUSE THERE IS NO      ****
         ************      SAVED SOLUTION CODE IN THE DATABASE FOR THE NEW USER      *****************/

        /*********************************************************************************************/
        /** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ** ERROR ***/


        if (result.message !== 'User already exists.') {

          /* Dispatch an action to change the current user in the store */
          this.props.changeUser(this.state.username);            
          this.setState({ invalid: false });

          /* Redirect the logged in user to the game */
          this.props.router.push('/game');

          /********
          ********* should probably be setting the level to 0 for new user?!?!?!
          ********/
          
        } else {
          this.setState({ invalid: true });
        }


        /* clear the form after it has been submitted */
        this.setState({
          email: '',
          username: '',
          password: ''
        })
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
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupContainer));