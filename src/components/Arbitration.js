import React, { useEffect, useState } from 'react';
import { getPlayersFromDB } from '../Services/DatabaseService';
import PlayerDisplayByPosition from './reusable/PlayerDisplayByPosition';

const Arbitration = () => {
   const [arbitratedPlayers, setArbitratedPlayers] = useState([]);

  useEffect(() => {
    const getSuperMaxPlayers = async () => {

    const players = await getPlayersFromDB();
    const correctPlayers = players.filter((player) => player.arbYear === "2024");
    setArbitratedPlayers(correctPlayers)
    }

    getSuperMaxPlayers();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center"> Arbitration </h1>
      <h4>2024: </h4>
      <PlayerDisplayByPosition playerList={arbitratedPlayers}/>
    </div>
  )
}

export default Arbitration;
