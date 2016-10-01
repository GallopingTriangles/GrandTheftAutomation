import React, { Component } from 'react';
import Signup from '../app/containers/SignupContainer.jsx';
import Login from '../app/containers/LoginContainer.jsx';

/*******************************************************/
/* Renders the landing page as the first page          */
/* This will have the login/signup forms               */
/* as well as AV information for users                 */
/*******************************************************/
  // <Signup />
  // <Login />

const LandingPage = props => {
  return (
    <div>
      <div>
        <div id="carousel-example-generic" className="carousel slide" data-ride="carousel" data-interval="4000" data-wrap="true">
          
          <ol className="carousel-indicators">
            <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
            <li data-target="#carousel-example-generic" data-slide-to="3"></li>
          </ol>
          
          <div className="carousel-inner" role="listbox">
            <div className="item active">
              <img src="https://s3.amazonaws.com/user-media.venngage.com/474435-e92d951587c73dfdad739f592022dabd.jpg" />
              <div className="carousel-caption">
              </div>
            </div>
            <div className="item">
              <img src="https://www.wired.com/wp-content/uploads/2014/05/autonomous-feat.jpg" />
              <div className="carousel-caption">
              </div>
            </div>
            <div className="item">
              <img src="http://static4.techinsider.io/image/570e74ac910584716f8bc37f-1190-625/heres-the-number-one-reason-people-want-driverless-cars.jpg" />
              <div className="carousel-caption">
              </div>
            </div>
            <div className="item">
              <img src="http://o.aolcdn.com/dims-global/dims3/GLOB/legacy_thumbnail/750x422/quality/95/http://www.blogcdn.com/slideshows/images/slides/370/995/0/S3709950/slug/l/volvo-concept-26-02-1.jpg" />
              <div className="carousel-caption">
              </div>
            </div>
          </div>

          <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>

      <div className="container">
        <div className="row white-text" style={{textAlign: 'center'}}>
          <h3 className="horizontal-divider">Welcome to Grand Theft Automation</h3>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 white-text">
            <h4 className="horizontal-divider">Coding</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 white-text">
            <h4 className="horizontal-divider">Autonomous Vehicles</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
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