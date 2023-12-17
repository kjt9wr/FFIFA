import React from 'react';
import * as FFIFAService from '../../Services/FFIFAService';
import * as Constants from '../../Utilities/Constants';

const RosterPreview = (props) => {
  const {roster} = props;
  const keptQBs = FFIFAService.filterKeepersByPosition(roster, Constants.QB);
  const keptRBs = FFIFAService.filterKeepersByPosition(roster, Constants.RB);
  const keptWRs = FFIFAService.filterKeepersByPosition(roster, Constants.WR);
  const keptTEs = FFIFAService.filterKeepersByPosition(roster, Constants.TE);

  return (
    <div style={{ display: 'flex' }}>
      {positionList(Constants.QB, keptQBs)}
      {positionList(Constants.RB, keptRBs)}
      {positionList(Constants.WR, keptWRs)}
      {positionList(Constants.TE, keptTEs)}
    </div>
  )
}

const positionList = (position, players) => (
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

const displayPlayers = (playerList) => {
    return playerList.map(player => {
        return <tr> {player.name} </tr>
    })
}

export default RosterPreview;