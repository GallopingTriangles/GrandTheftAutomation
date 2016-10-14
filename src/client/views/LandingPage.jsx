import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Signup from '../app/containers/SignupContainer.jsx';
import Login from '../app/containers/LoginContainer.jsx';

/*******************************************************/
/* Renders the landing page as the first page          */
/* This will have the login/signup forms               */
/* as well as AV information for users                 */
/*******************************************************/

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <div>
        <div className="jumbotron container-fluid" style={{backgroundImage: 'url(http://www-tc.pbs.org/wgbh/nova/next/wp-content/uploads/2016/01/chicago-grid.jpg)', backgroundSize: '100%'}}>
          <div className="container">
            <div className="title-image">
              <h1>The Future Is Now</h1>
              <p><strong>Learn the basics of coding & program your own automated vehicle!</strong></p>
            </div>
          </div>
        </div>

        <div className="container">
          <h2 className="white-text" style={{textAlign: 'center', paddingBottom: '5px', borderBottom: '1px solid white'}}>
            Drive into the future.
          </h2>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 white-text">
              <img id="game_gif" src="https://media.giphy.com/media/eThRxELjyuZz2/giphy.gif" style={{height: '416px'}}/>
            </div>
            <div className="row">
              <div className="white-text">
                <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                  <img className="landing-image" src="https://www.expats.com.mt/wp-content/uploads/2016/01/learn-to-code.jpg" />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3" style={{paddingRight: '30px'}}>
                  <h4 className="horizontal-divider">Coding/Programing</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. quis nostrud exercitation </p>
                </div>
              </div>
              <div className="white-text">
                <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3" style={{paddingTop: '30px'}}>
                  <img className="landing-image" src="http://core0.staticworld.net/images/article/2013/08/edmunds_rides_self_driving_car_diagram_connected_car-100049056-orig.jpg" />
                </div>
                <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3" style={{paddingRight: '30px', paddingTop: '30px'}}>
                  <h4 className="horizontal-divider">Autonomous Vehicles</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut. quis nostrud exercitation </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container" style={{marginTop: '15px'}}>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 white-text">
              <h4 className="horizontal-divider">Project Team</h4>
              <p>Alex Pattison</p> 
              <p>Chris Chiang</p> 
              <p>Kevin Chan</p> 
              <p>Lorenzo Engelen</p> 
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 white-text">
                <h4 className="horizontal-divider">Sign Up Here</h4>
                <Signup />
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(LandingPage));