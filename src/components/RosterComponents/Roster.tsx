import React, { useCallback, useEffect, useState } from "react";
import { Container } from "reactstrap";
import {
  fetchAllOwners,
  fetchRoster,
  updatePlayerKeeperStatus,
} from "../../api/api.service";
import { FranchisePrices, Owner, Player } from "../../interfaces/interfaces";
import { calculateLuxaryPotPayout } from "../../services/ffifa.service";
import {
  formatFranchisePrices,
  getFranchiseTagDTO,
} from "../../services/franchise.service";
import { ownersIDByName } from "../../utilities/id-maps";
import PlayerDisplayByPosition from "../reusable/PlayerDisplayByPosition";
import RosterDataTable from "./RosterDataTable";
import RosterOwnerCapDisplay from "./RosterOwnerCapDisplay";

/*
 * This page displays an owner's available cap information, projected keepers display,
 * and a roster table to edit keepers
 */

interface RosterProps {
  match: {
    params: {
      name: string;
    };
  };
}

const Roster = (props: RosterProps) => {
  const [roster, setRoster] = useState<Player[]>([]);
  const [penaltyFees, setPenaltyFees] = useState([]);
  const [franchisePrices, setFranchisePrices] = useState<FranchisePrices>({
    qb: 0,
    rb: 0,
    wr: 0,
    te: 0,
  });
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
        unsortedRoster.data.sort((a: Player, b: Player) =>
          a.position > b.position ? 1 : -1
        )
      );

      const currentYearCap = owners.data.filter(
        (owner: Owner) => ownerId === owner._id
      )[0].cap[5];
      setCap(currentYearCap);

      const fees = owners.data.map((owner: Owner) => {
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
      <PlayerDisplayByPosition
        playerList={keptPlayersList}
        isEditable={false}
      />
      <RosterDataTable
        roster={roster}
        franchisePrices={franchisePrices}
        toggleKeeper={toggleKeeper}
      />
    </Container>
  );
};

export default Roster;
