import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { getPlayersFromDB } from "../Services/DatabaseService";
import { CURRENT_SEASON_YEAR } from "../Utilities/Constants";
import PlayerDisplayByPosition from "./reusable/PlayerDisplayByPosition";

/*
 * This page displays the players entering Arbitration in the current year
 */
const Arbitration = () => {
  const [arbitratedPlayers, setArbitratedPlayers] = useState([]);

  useEffect(() => {
    const getSuperMaxPlayers = async () => {
      const players = await getPlayersFromDB();
      const correctPlayers = players.filter(
        (player) => player.arbYear === CURRENT_SEASON_YEAR
      );
      setArbitratedPlayers(correctPlayers);
    };

    getSuperMaxPlayers();
  }, []);

  return (
    <Container>
      <h1 className="text-center"> Arbitration </h1>
      <h4>{CURRENT_SEASON_YEAR}</h4>
      <PlayerDisplayByPosition playerList={arbitratedPlayers} />
    </Container>
  );
};

export default Arbitration;
