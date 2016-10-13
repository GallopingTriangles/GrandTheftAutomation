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
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 white-text">
              <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">

                <ol className="carousel-indicators">
                  <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
                  <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                  <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                </ol>


                <div className="carousel-inner" role="listbox">
                  <div className="item active">
                    <img src={'http://www.vtti.vt.edu/featured/wp-content/uploads/2016/01/citystreets-1.jpg'} alt="..." />
                    <div className="carousel-caption">
                    </div>
                  </div>
                  <div className="item">
                    <img src={'http://dujs.dartmouth.edu/wp-content/uploads/AV.png'} alt="..." />
                    <div className="carousel-caption">
                    </div>
                  </div>
                  <div className="item">
                    <img src={'http://oc-apa.org/wp-content/uploads/2016/05/connected-vehicles.jpg'} alt="..." />
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
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12" style={{marginTop: '15px'}}>

              { this.props.user ? <button onClick={ () => this.props.router.push('/game') } >TO THE GAME</button> : 

                <div>
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

              }

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