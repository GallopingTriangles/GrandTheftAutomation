import React, { Component } from 'react';

const LevelListEntry = (props) => (
  <div>
    <tr>
      <td>{props.nums[0].level}</td>
      <td>{props.nums[0].time}</td>
    </tr>
  </div>
)


export default LevelListEntry;
