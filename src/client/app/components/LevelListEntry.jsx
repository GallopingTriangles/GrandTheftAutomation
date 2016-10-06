import React, { Component } from 'react';

const LevelListEntry = (props) => (
    <tr>
      <td class="text-left">{props.levelData.level}</td>
      <td class="text-left">{props.levelData.time}</td>
      <td class="text-left">{props.levelData.wasted}</td>
    </tr>
)


export default LevelListEntry;
