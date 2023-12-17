import React from 'react';

const displayPlayers = (playerList) => {
  return playerList.map(player => {
      return <tr> {player.name} </tr>
  })
}

const filterKeepersByPosition = (keptPlayers, position) => {
  return keptPlayers.filter(player => player.position === position && player.keep === true);
}

const renderPlayersForPosition = (position, players) => (
  <table className='table'>
    <thead className='thead-light'>
        <tr>
          <th>{position}</th>
        </tr>
    </thead>
    <tbody>
        { displayPlayers(players) }
    </tbody>
  </table>
)

const RosterPreview = (props) => {
  const {roster} = props;
  const keptQBs = filterKeepersByPosition(roster, "QB");
  const keptRBs = filterKeepersByPosition(roster, "RB");
  const keptWRs = filterKeepersByPosition(roster, "WR");
  const keptTEs = filterKeepersByPosition(roster, "TE");

  return (
    <div style={{ display: 'flex' }}>
      {renderPlayersForPosition("QB", keptQBs)}
      {renderPlayersForPosition("RB", keptRBs)}
      {renderPlayersForPosition("WR", keptWRs)}
      {renderPlayersForPosition("TE", keptTEs)}
    </div>
  )
}

export default RosterPreview;