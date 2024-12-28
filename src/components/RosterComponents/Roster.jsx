import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Container } from "reactstrap";
import { getRoster } from "../../Services/DatabaseService";
import { getFranchiseTagDTO } from "../../Services/FranchiseService";
import { calculateLuxaryPotPayout } from "../../Services/FFIFAService";
import PlayerDisplayByPosition from "../reusable/PlayerDisplayByPosition.jsx";
import RosterOwnerCapDisplay from "./RosterOwnerCapDisplay.jsx";
import RosterDataTable from "./RosterDataTable.jsx";

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
 * and a roster table edit keepers
 */

const Roster = (props) => {
  const [roster, setRoster] = useState([]);
  const [penaltyFees, setPenaltyFees] = useState([]);
  const [franchisePrices, setFranchisePrices] = useState({});
  const [changeKeeper, setChangeKeeper] = useState(false);

  const ownerName = props.match.params.name;
  const ownerId = ownersIDByName[ownerName];

  console.log("render cycle");

  const toggleKeeper = useCallback(
    async (e) => {
      console.log("clicked!");
      const newKeep = { keep: e.target.checked };
      setChangeKeeper(!changeKeeper);
      await axios.put(
        `http://localhost:5000/player/updatePlayer/${e.target.id}`,
        newKeep
      );
    },
    [changeKeeper]
  );

  useEffect(() => {
    console.log("fetching penalty data");
    const getOwnerData = async () => {
      await axios.get("http://localhost:5000/owner/").then((response) => {
        const fees = response.data.map((owner) => {
          return { name: owner.name, penaltyFee: owner.penaltyFee };
        });
        setPenaltyFees(fees);
      });
    };

    getOwnerData();
  }, [ownerName, changeKeeper]);

  useEffect(() => {
    console.log("fetching roster info");
    const fetchRosterInfo = async () => {
      const unsortedRoster = await getRoster(ownerId);
      setRoster(
        unsortedRoster.sort((a, b) => (a.position > b.position ? 1 : -1))
      );
    };

    fetchRosterInfo();
  }, [ownerId, toggleKeeper]);

  useEffect(() => {
    const getFranchiseTagInfo = async () => {
      console.log("fetching franchise prices");
      const franchiseDTO = await getFranchiseTagDTO();
      setFranchisePrices(formatFranchisePrices(franchiseDTO));
    };

    getFranchiseTagInfo();
  }, [toggleKeeper]);

  const keptPlayersList = roster.filter((p) => p.keep);
  const payout = calculateLuxaryPotPayout(penaltyFees);

  return (
    <Container>
      <RosterOwnerCapDisplay
        ownerName={ownerName}
        roster={roster}
        franchisePrices={franchisePrices}
        penaltyReward={payout}
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
