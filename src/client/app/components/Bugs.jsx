import React, { Component } from 'react';

class Bugs extends Component {

	render() {
		return (
      <div style={{backgroundColor: '#272822', height: 'calc(100vh - 180px)'}}>

        { this.props.bugs.map(message => {
          return (
            <div style={{color: '#f8f8f2'}}>
              <i className='fa fa-bug' aria-hidden='true'></i>
              { message }
            </div>
          )
        })}

      </div>
		);
	}
}

export default Bugs;
