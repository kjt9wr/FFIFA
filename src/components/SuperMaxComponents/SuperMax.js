import React, { useState, useEffect } from 'react'
import * as DatabaseService from '../../Services/DatabaseService';
import * as SuperMaxService from '../../Services/SuperMaxService'
import SuperMaxRow from './SuperMaxRow';
import * as Constants from '../../Utilities/Constants';

const SuperMax = () => {
  const [superPlayers, setSuperPlayers] = useState([]);

  useEffect(() => {
    const getSuperMaxPlayers = async () => {
      const players = await DatabaseService.getPlayersFromDB();
      const list =  players.filter(player => player.superMax > 0);
      setSuperPlayers(list);
    }

    getSuperMaxPlayers();
  }, []);

  const renderSuperPlayerTable = () => {
    return superPlayers.map(currentPlayer => {
      const ownerName = Constants.ownersByID[currentPlayer.owner];
      const price = SuperMaxService.calculateSuperMaxPrice2021(currentPlayer.superMax);
      return <SuperMaxRow 
        player={currentPlayer.name}
        owner={ownerName}
        plan={currentPlayer.superMax}
        price={price}
      />;
    });
  }

  return (
    <div className="container">
      <h2 class="text-center"> Players on SuperMax </h2>
        <table className='table'>
          <thead className='thead-light'>
            <tr>
              <th>Player</th>
              <th>Owner</th>
              <th>Plan</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody> { renderSuperPlayerTable() } </tbody>
        </table>
    </div>
  )
}

export default SuperMax;
