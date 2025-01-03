import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { fetchAllOwners, fetchRoster } from "../../api/apiService.js";
import { calculateLuxaryPotPayout } from "../../Services/FFIFAService";
import { getFranchiseTagDTO } from "../../Services/FranchiseService";
import { ownersIDByName } from "../../Utilities/Constants";
import PlayerDisplayByPosition from "../reusable/PlayerDisplayByPosition.jsx";
import RosterOwnerCapDisplay from "../RosterComponents/RosterOwnerCapDisplay.jsx";

const formatFranchisePrices = (franchiseDTO) => {
  return {
    qb: franchiseDTO.qbFranchisePrice,
    rb: franchiseDTO.rbFranchisePrice,
    wr: franchiseDTO.wrFranchisePrice,
    te: franchiseDTO.teFranchisePrice,
  };
};

/*
 * This page displays an owner's available cap information, projected keepers display,
 * and a roster table to edit keepers
 */

const RosterPreview = (props) => {
  const [roster, setRoster] = useState([]);
  const [penaltyFees, setPenaltyFees] = useState([]);
  const [franchisePrices, setFranchisePrices] = useState({});

  const ownerName = "Kevin";
  const ownerId = ownersIDByName[ownerName];

  useEffect(() => {
    Promise.all([
      fetchRoster(ownerId),
      fetchAllOwners(),
      getFranchiseTagDTO(),
    ]).then(([unsortedRoster, owners, franchiseTags]) => {
      setRoster(
        unsortedRoster.data.sort((a, b) => (a.position > b.position ? 1 : -1))
      );
      const fees = owners.data.map((owner) => {
        return { name: owner.name, penaltyFee: owner.penaltyFee };
      });
      setPenaltyFees(fees);
      setFranchisePrices(formatFranchisePrices(franchiseTags));
    });
  }, [ownerId]);

  const keptPlayersList = roster.filter((p) => p.keep);
  const luxaryPotPayout = calculateLuxaryPotPayout(penaltyFees);

  return (
    <Container>
      <RosterOwnerCapDisplay
        ownerName={ownerName}
        roster={roster}
        franchisePrices={franchisePrices}
        penaltyReward={luxaryPotPayout}
      />
      <h4>Roster:</h4>
      <PlayerDisplayByPosition playerList={keptPlayersList} />
    </Container>
  );
};

export default RosterPreview;
