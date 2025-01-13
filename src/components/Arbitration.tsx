import React, { useEffect, useState } from "react";
import { Alert, Container } from "reactstrap";
import { fetchArbitrationData } from "../api/api.service";
import { Player } from "../interfaces/interfaces";
import { CURRENT_SEASON_YEAR } from "../utilities/constants";
import PlayerDisplayByPosition from "./reusable/PlayerDisplayByPosition";

/*
 * This page displays the players entering Arbitration in the current year
 */
const Arbitration = () => {
  const [arbitratedPlayers, setArbitratedPlayers] = useState<Player[]>([]);
  const [displayErrorAlert, setDisplayErrorAlert] = useState(false);

  useEffect(() => {
    const getArbitratedPlayers = async () => {
      await fetchArbitrationData()
        .then((response) => setArbitratedPlayers(response.data))
        .catch(() => {
          setDisplayErrorAlert(true);
        });
    };

    getArbitratedPlayers();
  }, []);

  return (
    <Container>
      <h1 className="text-center"> Arbitration </h1>
      {displayErrorAlert && (
        <Alert color="danger">Error fetching arbitration data</Alert>
      )}
      <h4>{CURRENT_SEASON_YEAR}</h4>
      <PlayerDisplayByPosition
        playerList={arbitratedPlayers}
        isEditable={false}
      />
    </Container>
  );
};

export default Arbitration;
