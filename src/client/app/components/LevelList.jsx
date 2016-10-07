import React, { Component } from 'react';
import LevelListEntry from '../components/LevelListEntry.jsx';

var nums = [
  {level: 1, time: '00:00', wasted: 30},
  {level: 2, time: '00:00', wasted: 30},
  {level: 3, time: '00:00', wasted: 30},
  {level: 4, time: '00:00', wasted: 30},
  {level: 5, time: '00:00', wasted: 30},
  {level: 6, time: '00:00', wasted: 30},
  {level: 7, time: '00:00', wasted: 30}

]

const LevelList = (props) => (
  <div  className='col-xs-12 col-md-8'>
    <table>
      <tbody class="table-hover">
        <tr>
        <th class="text-left">Level</th>
        <th class="text-left">Best Time</th>
        <th class="text-left">Times wasted</th>
        </tr>
        {nums.map(function(levelData, index) {
          return <LevelListEntry levelData={levelData} key={index}/>
        })}
      </tbody>
    </table>
  </div>
)

export default LevelList;
