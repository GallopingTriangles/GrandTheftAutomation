import React, { Component } from 'react';
import LevelList from '../components/LevelList.jsx';
import Avatar from '../components/Avatar.jsx';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logsList: []
    };
  }

  // componentWillMount() {
  //   fetch('/game', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(data => {
  //     console.log('Response from /game: ', data);
  //     data.json()
  //   });
  // }

  render() {
    {console.log('In render')}
    return (
      <div className='container white-text'>
        <div className='row'>
          <Avatar />
          <LevelList />
        </div>
      </div>
    )
  }
}


export default ProfilePage;
