import React, { useEffect, useState } from "react";
import { Alert, Container } from "reactstrap";
import { fetchArbitrationData } from "../../api/api.service";
import { Player } from "../../interfaces/interfaces";
import { getUpcomingSeasonYear } from "../../utilities/constants";
import PlayerDisplayByPosition from "../reusable/PlayerDisplayByPosition";
import YearSelector from "../reusable/YearSelector";

/*
 * This page displays the players entering Arbitration in the current year
 */
const upcomingYear = getUpcomingSeasonYear();
const Arbitration = () => {
  const [arbitratedPlayers, setArbitratedPlayers] = useState<Player[]>([]);
  const [displayErrorAlert, setDisplayErrorAlert] = useState(false);
  const [selectedYear, setSelectedYear] = useState(upcomingYear);

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

  const handleOnChange = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <Container>
      <h1 className="text-center"> Arbitration </h1>
      {displayErrorAlert && (
        <Alert color="danger">Error fetching arbitration data</Alert>
      )}
      <YearSelector
        onChange={handleOnChange}
        selectedYear={selectedYear}
        yearOptions={[
          upcomingYear,
          String(Number(upcomingYear) + 1),
          String(Number(upcomingYear) + 2),
        ]}
      />
      <br /> <br />
      <h4>{selectedYear}</h4>
      <PlayerDisplayByPosition
        playerList={arbitratedPlayers.filter(
          (player: Player) =>
            player.firstKeepYear &&
            Number(selectedYear) - player.firstKeepYear === 3
        )}
        isEditable={false}
      />
    </Container>
  );
};

export default Arbitration;
