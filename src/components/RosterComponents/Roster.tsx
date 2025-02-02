import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import {
  fetchAllOwners,
  fetchRoster,
  updatePlayerKeeperStatus,
} from "../../api/api.service";
import { FranchiseTagDTO, Owner, Player } from "../../interfaces/interfaces";
import { calculateLuxaryPotPayout } from "../../services/ffifa.service";
import { getFranchiseTagDTO } from "../../services/franchise.service";
import { getUpcomingYearIndex } from "../../utilities/constants";
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
  const [franchisePrices, setFranchisePrices] = useState<FranchiseTagDTO>({
    qbFranchisePrice: 0,
    rbFranchisePrice: 0,
    wrFranchisePrice: 0,
    teFranchisePrice: 0,
  });
  const [cap, setCap] = useState();

  const ownerName = props.match.params.name;
  const ownerId = ownersIDByName[ownerName];

  const toggleKeeper = async (e: any) => {
    const playertoChange = roster.find((player) => player._id === e.target.id);
    playertoChange.keep = e.target.checked;
    const restOfRoster = roster.filter(
      (player) => player._id !== playertoChange._id
    );
    setRoster([...restOfRoster, playertoChange]);

    await updatePlayerKeeperStatus(e.target.id, { keep: e.target.checked });
  };

  useEffect(() => {
    Promise.all([
      fetchRoster(ownerId),
      fetchAllOwners(),
      getFranchiseTagDTO(),
    ]).then(([unsortedRoster, owners, franchiseTags]) => {
      setRoster(unsortedRoster.data);

      const currentYearCap = owners.data.filter(
        (owner: Owner) => ownerId === owner._id
      )[0].cap[getUpcomingYearIndex()];
      setCap(currentYearCap);

      const fees = owners.data.map((owner: Owner) => {
        return { name: owner.name, penaltyFee: owner.penaltyFee };
      });
      setPenaltyFees(fees);
      setFranchisePrices(franchiseTags);
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
        cap={cap}
        isEditable={false}
      />
      <h4>Roster:</h4>
      <PlayerDisplayByPosition
        playerList={keptPlayersList}
        isEditable={false}
      />
      <RosterDataTable
        roster={roster.sort(
          (a: Player, b: Player) =>
            a.position.localeCompare(b.position) ||
            b.price - a.price ||
            a.name.localeCompare(b.name)
        )}
        franchisePrices={franchisePrices}
        toggleKeeper={toggleKeeper}
      />
    </Container>
  );
};

export default Roster;
