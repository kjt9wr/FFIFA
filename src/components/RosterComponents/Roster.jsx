import React, { useCallback, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { updatePlayerKeeperStatus } from "../../api/apiService.js";
import { getOwnersFromDB, getRoster } from "../../Services/DatabaseService";
import { calculateLuxaryPotPayout } from "../../Services/FFIFAService";
import { getFranchiseTagDTO } from "../../Services/FranchiseService";
import { ownersIDByName } from "../../Utilities/Constants";
import PlayerDisplayByPosition from "../reusable/PlayerDisplayByPosition.jsx";
import RosterDataTable from "./RosterDataTable.jsx";
import RosterOwnerCapDisplay from "./RosterOwnerCapDisplay.jsx";

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

const Roster = (props) => {
  const [roster, setRoster] = useState([]);
  const [penaltyFees, setPenaltyFees] = useState([]);
  const [franchisePrices, setFranchisePrices] = useState({});
  const [changeKeeper, setChangeKeeper] = useState(false);

  const ownerName = props.match.params.name;
  const ownerId = ownersIDByName[ownerName];

  const toggleKeeper = useCallback(
    async (e) => {
      const newKeepValue = { keep: e.target.checked };
      setChangeKeeper(!changeKeeper);
      await updatePlayerKeeperStatus(e.target.id, newKeepValue);
    },
    [changeKeeper]
  );

  useEffect(() => {
    Promise.all([
      getRoster(ownerId),
      getOwnersFromDB(),
      getFranchiseTagDTO(),
    ]).then(([unsortedRoster, owners, franchiseTags]) => {
      setRoster(
        unsortedRoster.sort((a, b) => (a.position > b.position ? 1 : -1))
      );
      const fees = owners.map((owner) => {
        return { name: owner.name, penaltyFee: owner.penaltyFee };
      });
      setPenaltyFees(fees);
      setFranchisePrices(formatFranchisePrices(franchiseTags));
    });
  }, [ownerId, toggleKeeper]);

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
      <RosterDataTable
        roster={roster}
        franchisePrices={franchisePrices}
        toggleKeeper={toggleKeeper}
      />
    </Container>
  );
};

export default Roster;
