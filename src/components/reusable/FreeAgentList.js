import React from 'react';

const FreeAgentList = (props) => {
  let tableOfKeptPlayers = "";
  if (props.keptPlayers) {
    tableOfKeptPlayers = props.keptPlayers.map(player => 
      <tr key={ player._id }>
        <td> { player.name }</td>
      </tr>
    );
  }

  return (
    <div style={{ flex: '1'}}>
      <h3> {props.position} </h3>
      <table>
        <tbody> { tableOfKeptPlayers } </tbody>
      </table>
    </div>
  );
}

export default FreeAgentList;
