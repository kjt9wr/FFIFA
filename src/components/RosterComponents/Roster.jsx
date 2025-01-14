import React, { useCallback, useEffect, useState } from "react";
import { Container } from "reactstrap";
import {
  fetchAllOwners,
  fetchRoster,
  updatePlayerKeeperStatus,
} from "../../api/api.service.ts";
import { calculateLuxaryPotPayout } from "../../services/ffifa.service.ts";
import {
  formatFranchisePrices,
  getFranchiseTagDTO,
} from "../../services/franchise.service.ts";
import { ownersIDByName } from "../../utilities/constants";
import PlayerDisplayByPosition from "../reusable/PlayerDisplayByPosition.tsx";
import RosterDataTable from "./RosterDataTable.jsx";
import RosterOwnerCapDisplay from "./RosterOwnerCapDisplay";

/*
 * This page displays an owner's available cap information, projected keepers display,
 * and a roster table to edit keepers
 */

const Roster = (props) => {
  const [roster, setRoster] = useState([]);
  const [penaltyFees, setPenaltyFees] = useState([]);
  const [franchisePrices, setFranchisePrices] = useState({});
  const [changeKeeper, setChangeKeeper] = useState(false);
  const [cap, setCap] = useState();

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
      fetchRoster(ownerId),
      fetchAllOwners(),
      getFranchiseTagDTO(),
    ]).then(([unsortedRoster, owners, franchiseTags]) => {
      setRoster(
        unsortedRoster.data.sort((a, b) => (a.position > b.position ? 1 : -1))
      );

      const currentYearCap = owners.data.filter(
        (owner) => ownerId === owner._id
      )[0].cap[5];
      setCap(currentYearCap);

      const fees = owners.data.map((owner) => {
        return { name: owner.name, penaltyFee: owner.penaltyFee };
      });
      setPenaltyFees(fees);
      setFranchisePrices(formatFranchisePrices(franchiseTags));
    });
  }, [ownerId, changeKeeper]);

  const keptPlayersList = roster.filter((p) => p.keep);
  const luxaryPotPayout = calculateLuxaryPotPayout(penaltyFees);

  return (
    <Container>
      <RosterOwnerCapDisplay
        ownerName={ownerName}
        roster={roster}
        franchisePrices={franchisePrices}
        penaltyReward={luxaryPotPayout}
        cap={cap}
        isEditable={false}
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
