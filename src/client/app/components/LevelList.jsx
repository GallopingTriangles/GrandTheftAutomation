import React, { Component } from 'react';
import LevelListEntry from '../components/LevelListEntry.jsx';

const LevelList = (props) => (
  <div  className='col-xs-12 col-md-8'>
    <table>
      <tbody className="table-hover">
        <tr>
        <th className="text-left">Level</th>
        <th className="text-left">Best Time</th>
        <th className="text-left">Times wasted</th>
        </tr>
        {props.levelData.map(function(levelDatum, index) {
          return <LevelListEntry levelDatum={levelDatum} key={index}/>
        })}
      </tbody>
    </table>
  </div>
)

export default LevelList;
