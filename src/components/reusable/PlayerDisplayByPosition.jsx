import React from 'react';

const displayPlayers = (playerList) => {
  return playerList.map(player => {
      return <tr key={player.name}><td> { player.name }</td></tr>
  })
}

const filterKeepersByPosition = (keptPlayers, position) => {
  return keptPlayers.filter(player => player.position === position);
}

const renderPlayersForPosition = (position, players) => (
  <table className='table'>
    <thead className='thead-light'>
        <tr><th>{position}</th></tr>
    </thead>
    <tbody>{ displayPlayers(players) }</tbody>
  </table>
)

const playerDisplayByPosition = (props) => {
  const {playerList} = props;
  const keptQBs = filterKeepersByPosition(playerList, "QB");
  const keptRBs = filterKeepersByPosition(playerList, "RB");
  const keptWRs = filterKeepersByPosition(playerList, "WR");
  const keptTEs = filterKeepersByPosition(playerList, "TE");

  return (
    <div style={{ display: 'flex' }}>
      {renderPlayersForPosition("QB", keptQBs)}
      {renderPlayersForPosition("RB", keptRBs)}
      {renderPlayersForPosition("WR", keptWRs)}
      {renderPlayersForPosition("TE", keptTEs)}
    </div>
  )
}

export default playerDisplayByPosition;
