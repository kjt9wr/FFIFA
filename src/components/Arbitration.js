import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { CURRENT_SEASON_YEAR } from "../Utilities/Constants";
import PlayerDisplayByPosition from "./reusable/PlayerDisplayByPosition";

/*
 * This page displays the players entering Arbitration in the current year
 */
const Arbitration = () => {
  const [arbitratedPlayers, setArbitratedPlayers] = useState([]);

  useEffect(() => {
    const getArbitratedPlayers = async () => {
      const players = await axios
        .get(`http://localhost:5000/player/arbitration/${CURRENT_SEASON_YEAR}`)
        .catch(() => {
          console.error("Unable to get players from the database");
        });

      setArbitratedPlayers(players.data);
    };

    getArbitratedPlayers();
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
