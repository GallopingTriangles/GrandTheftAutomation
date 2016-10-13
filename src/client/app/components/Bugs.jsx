import React, { Component } from 'react';

class Bugs extends Component {

	render() {
		return (
      <div className='instructions'>

        { this.props.bugs.map(message => {
          return (
            <div>
              <p className='fa fa-bug' aria-hidden='true'></p>
              { message }
            </div>
          )
        })}

      </div>
		);
	}
}

export default Bugs;
