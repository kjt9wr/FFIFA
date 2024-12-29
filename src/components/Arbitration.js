import React, { useEffect, useState } from "react";
import { Alert, Container } from "reactstrap";
import { fetchArbitrationData } from "../api/apiService";
import { CURRENT_SEASON_YEAR } from "../Utilities/Constants";
import PlayerDisplayByPosition from "./reusable/PlayerDisplayByPosition";

/*
 * This page displays the players entering Arbitration in the current year
 */
const Arbitration = () => {
  const [arbitratedPlayers, setArbitratedPlayers] = useState([]);
  const [displayErrorAlert, setDisplayErrorAlert] = useState(false);

  useEffect(() => {
    const getArbitratedPlayers = async () => {
      const players = await fetchArbitrationData().catch(() => {
        setDisplayErrorAlert(true);
      });

      setArbitratedPlayers(players.data);
    };

    getArbitratedPlayers();
  }, []);

  return (
    <Container>
      <h1 className="text-center"> Arbitration </h1>
      {displayErrorAlert && (
        <Alert color="danger">Error fetching trade data</Alert>
      )}
      <h4>{CURRENT_SEASON_YEAR}</h4>
      <PlayerDisplayByPosition playerList={arbitratedPlayers} />
    </Container>
  );
};

export default Arbitration;
