import { useState } from "react";
import { Alert, Container } from "reactstrap";
import { fetchArbitrationData } from "../../api/api.service";
import { useFetch } from "../../custom-hooks/custom-hooks";
import { Player } from "../../interfaces/interfaces";
import { getUpcomingSeasonYear } from "../../utilities/constants";
import PlayerDisplayByPosition from "../reusable/KeptPlayersDisplay";
import SpinnerWrapper from "../reusable/SpinnerWrapper";
import YearSelector from "../reusable/YearSelector";

/*
 * This page displays the players entering Arbitration in the current year
 */
const upcomingYear = getUpcomingSeasonYear();
const Arbitration = () => {
  const [selectedYear, setSelectedYear] = useState(upcomingYear);

  const {
    data: arbitratedPlayers,
    error,
    loading,
  } = useFetch(fetchArbitrationData);

  const handleOnChange = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <Container>
      <h1 className="page-title"> Arbitration </h1>
      {error && <Alert color="danger">Error fetching arbitration data</Alert>}
      <div className="trade-tracker-controls">
        <label htmlFor="year-selector" className="section-title">
          Select Year:
        </label>
        <YearSelector
          onChange={handleOnChange}
          selectedYear={selectedYear}
          yearOptions={[
            upcomingYear,
            String(Number(upcomingYear) + 1),
            String(Number(upcomingYear) + 2),
          ]}
        />
      </div>
      <SpinnerWrapper loading={loading} />
      <h4 className="section-title mb-3">
        Players Entering Arbitration in {selectedYear}
      </h4>
      {loading && (
        <div className="loading-message">Loading arbitration players...</div>
      )}
      {!loading &&
        arbitratedPlayers.filter(
          (player: Player) =>
            player.firstKeepYear &&
            Number(selectedYear) - player.firstKeepYear === 3
        ).length === 0 && (
          <div className="no-trades-message">
            No players entering arbitration for {selectedYear}.
          </div>
        )}
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
