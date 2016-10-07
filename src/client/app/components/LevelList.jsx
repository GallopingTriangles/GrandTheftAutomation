import React, { Component } from 'react';
import LevelListEntry from '../components/LevelListEntry.jsx';

var levelData = [
  {level: 1, time: '00:00', wasted: 30},
  {level: 2, time: '00:00', wasted: 30},
  {level: 3, time: '00:00', wasted: 30},
  {level: 4, time: '00:00', wasted: 30},
  {level: 5, time: '00:00', wasted: 30},
  {level: 6, time: '00:00', wasted: 30},
  {level: 7, time: '00:00', wasted: 30}
]

class LevelList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    
  }

  render() {
    return (
      <div  className='col-xs-12 col-md-8'>
        <table>
          <tbody className="table-hover">
            <tr>
            <th className="text-left">Level</th>
            <th className="text-left">Best Time</th>
            <th className="text-left">Times wasted</th>
            </tr>
            {levelData.map(function(levelDatum, index) {
              return <LevelListEntry levelDatum={levelDatum} key={index}/>
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default LevelList;
