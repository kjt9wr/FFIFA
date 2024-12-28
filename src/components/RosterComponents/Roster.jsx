import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { getOwnersFromDB, getRoster } from "../../Services/DatabaseService";
import { calculateLuxaryPotPayout } from "../../Services/FFIFAService";
import { getFranchiseTagDTO } from "../../Services/FranchiseService";
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

const ownersIDByName = {
  Kevin: "5e80d724b3bdaf3413316177",
  Justin: "5e80d930b3bdaf3413316189",
  Alex: "5e80dd6ab3bdaf34133161bd",
  Luigi: "5e80da66b3bdaf341331619b",
  Christian: "5e80e173b3bdaf3413316213",
  Matt: "5e80df96b3bdaf34133161ef",
  Brent: "5e80db62b3bdaf34133161ab",
  Michael: "5e80de37b3bdaf34133161cf",
  Nikos: "5e80dedcb3bdaf34133161dd",
  Chinmay: "5e80e07eb3bdaf3413316200",
  Patrick: "5e80e1dab3bdaf3413316225",
  Jeff: "5e80e1deb3bdaf3413316226",
  Casey: "66fb53a23cb8429bd448fd61",
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
      await axios.put(
        `http://localhost:5000/player/updatePlayer/${e.target.id}`,
        newKeepValue
      );
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
