import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { getRoster } from "../../Services/DatabaseService";
import { getFranchiseTagDTO } from "../../Services/FranchiseService";
import PlayerDisplayByPosition from "../reusable/PlayerDisplayByPosition.jsx";
import OwnerDisplay from "./OwnerDisplay.jsx";
import RosterDataTable from "./RosterDataTable.jsx";

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
 * and a roster table edit keepers
 */

const Roster = (props) => {
  const [owner, setOwner] = useState({
    _id: "",
    name: "",
    cap: [0, 0, 0, 0, 0, 0],
  });
  const [roster, setRoster] = useState([]);
  const [franchisePrices, setFranchisePrices] = useState({});
  const [changeKeeper, setChangeKeeper] = useState(false);

  const toggleKeeper = async (e) => {
    const newKeep = { keep: e.target.checked };
    await axios.post(
      "http://localhost:5000/player/update/" + e.target.id,
      newKeep
    );
    setChangeKeeper(!changeKeeper);
  };

  useEffect(() => {
    const getOwnerData = async () => {
      const ownerName = props.match.params.name;
      await axios
        .get(`http://localhost:5000/owner/${ownerName}`)
        .then((response) => {
          const currentOwner = response.data[0];
          setOwner(currentOwner);
        })
        .catch((e) => console.error("Something went wrong"));
    };

    getOwnerData();
  }, [props.match.params.name]);

  useEffect(() => {
    const fetchRosterInfo = async () => {
      if (owner.name.length > 0) {
        const allPlayers = await getRoster(owner._id);
        setRoster(
          allPlayers.sort((a, b) => (a.position > b.position ? 1 : -1))
        );
      }
    };

    const getFranchiseInfo = async () => {
      const franchiseDTO = await getFranchiseTagDTO();
      setFranchisePrices(formatFranchisePrices(franchiseDTO));
    };

    fetchRosterInfo();
    getFranchiseInfo();
  }, [owner._id, owner.name.length, changeKeeper]);

  const keptPlayers = roster.filter((p) => p.keep);
  return (
    <Container>
      <OwnerDisplay
        owner={owner}
        roster={roster}
        franchisePrices={franchisePrices}
      />
      <h4>Roster:</h4>
      <PlayerDisplayByPosition playerList={keptPlayers} />
      <RosterDataTable
        roster={roster}
        franchisePrices={franchisePrices}
        toggleKeeper={toggleKeeper}
      />
    </Container>
  );
};

export default Roster;
