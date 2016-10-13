import React, { Component } from 'react';
import Signup from '../app/containers/SignupContainer.jsx';
import Login from '../app/containers/LoginContainer.jsx';

/*******************************************************/
/* Renders the landing page as the first page          */
/* This will have the login/signup forms               */
/* as well as AV information for users                 */
/*******************************************************/

const LandingPage = props => {
  return (
    <div>
      <div className="jumbotron jumbotron-fluid" style={{backgroundImage: 'url(http://www-tc.pbs.org/wgbh/nova/next/wp-content/uploads/2016/01/chicago-grid.jpg)', backgroundSize: '100%'}}>
        <div className="container">
          <div className="title-image">
            <h1>The Future Is Now</h1>
            <p><strong>Learn the basics of coding & program your own automated vehicle!</strong></p>
          </div>
        </div>
      </div>

      <div className="container">
        <br />
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 white-text">
            <img className="landing-image" src="https://www.expats.com.mt/wp-content/uploads/2016/01/learn-to-code.jpg" />
            <h4 className="horizontal-divider">Coding</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 white-text">
            <img className="landing-image" src="http://core0.staticworld.net/images/article/2013/08/edmunds_rides_self_driving_car_diagram_connected_car-100049056-orig.jpg" />
            <h4 className="horizontal-divider">Autonomous Vehicles</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 " style={{marginTop: '15px'}}>
            <ul className="nav nav-tabs" role="tablist">
                <li role="presentation" className="active"><a href="#login" aria-controls="login" role="tab" data-toggle="tab">Login</a></li>
                <li role="presentation"><a href="#signup" aria-controls="signup" role="tab" data-toggle="tab">Sign Up</a></li>
              </ul>

              <div className="tab-content">
                <br />
                <div role="tabpanel" className="tab-pane active" id="login"> <Login /> </div>
                <div role="tabpanel" className="tab-pane" id="signup"> <Signup /> </div>
              </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;