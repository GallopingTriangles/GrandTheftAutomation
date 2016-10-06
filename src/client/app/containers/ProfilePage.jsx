import React, { Component } from 'react';
import LevelList from '../components/LevelList.jsx';
import Avatar from '../components/Avatar.jsx';


class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='white-text'>
        <Avatar />
        <LevelList />
      </div>
    )
  }
}


export default ProfilePage;
