import React from 'react';

const PositionTag = (props) => {
  let tableOfKeptPlayers = "";
  if (props.keptPlayers) {
    tableOfKeptPlayers = props.keptPlayers.map(player => 
      <tr key={ player._id }>
        <td style={player.superMax > 0 ? {'font-weight': 'bold'} : {} }> { player.name }</td>
        <td style={player.superMax > 0 ? {'font-weight': 'bold'} : {} }> { player.price }</td>
      </tr>
    );
  }

  return (
    <div style={{ flex: '1'}}>
      <h3> {props.position} franchise price: {props.tagPrice} </h3>
      <table>
        <thead>
          <th>Kept Player</th>
          <th>Original Price</th>
        </thead>
        <tbody> { tableOfKeptPlayers } </tbody>
      </table>
    </div>
  )
}

export default PositionTag
