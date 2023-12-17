import React from 'react';
import * as RosterService from '../../Services/RosterService';
import PlayerRow from './PlayerRow.jsx';

const RosterDataTable = (props) => {
  const getPlayerRows = () => {
    return props.roster.map(currentPlayer => {
      return <PlayerRow 
                player={currentPlayer}
                key={currentPlayer._id}
                id={currentPlayer._id}
                keep={currentPlayer.keep ? 'checked' : ''}
                toggleKeeper={RosterService.toggleKeeper}
                franchisePrices={props.franchisePrices}
              />;
    })
  }

  return (
    <div className='container'>
    <table className='table'>
                <thead className='thead-light'>
                <tr>
                  <th>Position</th>
                  <th>Player</th>
                  <th>Price</th>
                  <th>Keep</th>
                  <th>Keep Class</th>
                  <th>SuperMax</th>
                </tr>
                </thead>
                <tbody> { getPlayerRows() } </tbody>
             </table>
    </div>
  )
}

export default RosterDataTable;
