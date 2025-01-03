import React, { useCallback, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { fetchAllOwners, fetchRoster } from "../../api/apiService.js";
import { calculateLuxaryPotPayout } from "../../Services/FFIFAService";
import { getFranchiseTagDTO } from "../../Services/FranchiseService";
import { ownersIDByName } from "../../Utilities/Constants";
import EditablePlayerDisplay from "./EditablePlayerDisplay.jsx";
import EditableCapDisplay from "./EditableCapDisplay.jsx";

const formatFranchisePrices = (franchiseDTO) => {
  return {
    qb: franchiseDTO.qbFranchisePrice,
    rb: franchiseDTO.rbFranchisePrice,
    wr: franchiseDTO.wrFranchisePrice,
    te: franchiseDTO.teFranchisePrice,
  };
};

/*
 * This page allows the user to edit and view a roster without publishing changes
 */

const RosterPreview = (props) => {
  const [roster, setRoster] = useState([]);
  const [penaltyFees, setPenaltyFees] = useState([]);
  const [franchisePrices, setFranchisePrices] = useState({});
  const [maxCap, setMaxCap] = useState();
  const ownerName = "Kevin";
  const ownerId = ownersIDByName[ownerName];

  useEffect(() => {
    Promise.all([
      fetchRoster(ownerId),
      fetchAllOwners(), // used for penalty fees
      getFranchiseTagDTO(),
    ]).then(([unsortedRoster, owners, franchiseTags]) => {
      setRoster(unsortedRoster.data.filter((player) => player.keep));
      const initialCap = owners.data.filter(
        (owner) => ownerName === owner.name
      )[0].cap[5];
      setMaxCap(initialCap);
      const fees = owners.data.map((owner) => {
        return {
          name: owner.name,
          penaltyFee: owner.penaltyFee,
          initialCap: owner.cap[5],
        };
      });
      setPenaltyFees(fees);
      setFranchisePrices(formatFranchisePrices(franchiseTags));
    });
  }, [ownerId]);

  const updateCap = useCallback((newValue) => {
    setMaxCap(newValue);
  }, []);

  const removePlayer = useCallback(
    (playerId) => {
      setRoster(roster.filter((player) => player._id !== playerId));
    },
    [roster]
  );

  const luxaryPotPayout = calculateLuxaryPotPayout(penaltyFees);

  return (
    <Container>
      <EditableCapDisplay
        ownerName={ownerName}
        roster={roster}
        franchisePrices={franchisePrices}
        penaltyReward={luxaryPotPayout}
        maxCap={maxCap}
        updateCapCallback={updateCap}
      />
      <h4>Roster:</h4>
      <EditablePlayerDisplay
        playerList={roster}
        removePlayerCallback={removePlayer}
      />
    </Container>
  );
};

export default RosterPreview;
