import React, { Component } from 'react'

const Log = props => (
  <div>
    { props.text }
  </div>
)

class Logs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        { this.props.commands.map(command => {
          return (
            <div>hi</div>
          )
        })}
      </div>
    )
  }
}