import React, { Component } from 'react';

const LevelListEntry = (props) => (
    <tr>
      <td className="text-left">{props.levelData.level}</td>
      <td className="text-left">{props.levelData.time}</td>
      <td className="text-left">{props.levelData.wasted}</td>
    </tr>
)


export default LevelListEntry;
