import React, { Component } from 'react';
import LevelList from '../components/LevelList.jsx';
import Avatar from '../components/Avatar.jsx';


class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
