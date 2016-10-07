import React, { Component } from 'react';
import LevelList from '../components/LevelList.jsx';
import Avatar from '../components/Avatar.jsx';

var levelData = [
  {level: 1, time: '00:00', wasted: 30},
  {level: 2, time: '00:00', wasted: 30},
  {level: 3, time: '00:00', wasted: 30},
  {level: 4, time: '00:00', wasted: 30},
  {level: 5, time: '00:00', wasted: 30},
  {level: 6, time: '00:00', wasted: 30},
  {level: 7, time: '00:00', wasted: 30}
]

class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    fetch
  }

  render() {
    {console.log('In render')}
    return (
      <div className='container white-text'>
        <div className='row'>
          <Avatar />
          <LevelList levelData={levelData} />
        </div>
      </div>
    )
  }
}


export default ProfilePage;
