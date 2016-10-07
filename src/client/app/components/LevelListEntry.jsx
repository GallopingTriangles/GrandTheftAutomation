import React, { Component } from 'react';

const LevelListEntry = (props) => (
    <tr>
      <td className="text-left">{props.levelDatum.level}</td>
      <td className="text-left">{props.levelDatum.time}</td>
      <td className="text-left">{props.levelDatum.wasted}</td>
    </tr>
)


export default LevelListEntry;
