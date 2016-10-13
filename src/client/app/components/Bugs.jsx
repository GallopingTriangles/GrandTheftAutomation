import React, { Component } from 'react';

class Bugs extends Component {

	render() {
		return (
      <div>

        { this.props.bugs.map(message => {
          return (
            <div>
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