import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Signup from '../app/containers/SignupContainer.jsx';

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
                    <h4 className="horizontal-divider">Coding</h4>
                    <p>Coding has become a sought after skill, valued for its ability to rapidly create incredible applications. GTAutomation is an entry-point into coding, allowing users to quickly learn through a fun and captivating experience. </p>
                  </div>
                </div>
                <div className="white-text">
                  <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3" style={{paddingTop: '30px'}}>
                    <img className="landing-image" src="http://core0.staticworld.net/images/article/2013/08/edmunds_rides_self_driving_car_diagram_connected_car-100049056-orig.jpg" />
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3" style={{paddingRight: '30px', paddingTop: '30px'}}>
                    <h4 className="horizontal-divider">Autonomous Vehicles</h4>
                    <p>The advent of new technologies produces amazing results. In the past few years, self-driving vehicles have changed our perspective of the roadway. Learn more by signing up above and coding your own autonomous vehicle today. </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer-landing">
          <div className="container">
            <p className="white-text" style={{textAlign: 'center', marginTop: '8px', marginBottom: '8px'}}>© 2016 - Alex Pattison | Chris Chiang | Kevin Chan | Lorenzo Engelen</p>
          </div>
        </footer>
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