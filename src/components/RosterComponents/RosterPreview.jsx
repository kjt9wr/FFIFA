import React from 'react';
import * as Constants from '../../Utilities/Constants';

const RosterPreview = props => (
  <div style={{ display: 'flex' }}>
    {positionList(Constants.QB, props.keptQBs)}
    {positionList(Constants.RB, props.keptRBs)}
    {positionList(Constants.WR, props.keptWRs)}
    {positionList(Constants.TE, props.keptTEs)}
  </div>
)

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