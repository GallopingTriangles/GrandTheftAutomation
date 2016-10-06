import React, { Component } from 'react';

const LevelListEntry = (props) => (
    <tr>
      <td>{props.levelData.level}</td>
      <td>{props.levelData.time}</td>
      <td>{props.levelData.wasted}</td>
    </tr>
)


export default LevelListEntry;
