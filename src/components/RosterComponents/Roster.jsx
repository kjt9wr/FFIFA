import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Container } from "reactstrap";
import { getRoster } from "../../Services/DatabaseService";
import { getFranchiseTagDTO } from "../../Services/FranchiseService";
import PlayerDisplayByPosition from "../reusable/PlayerDisplayByPosition.jsx";
import OwnerCapDisplay from "./OwnerCapDisplay.jsx";
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
  const [penaltyFees, setPenaltyFees] = useState({});
  const [reward, setReward] = useState();
  const [franchisePrices, setFranchisePrices] = useState({});
  const [changeKeeper, setChangeKeeper] = useState(false);

  const toggleKeeper = useCallback(
    async (e) => {
      console.log("flipped the switch: " + e.target.checked);
      const newKeep = { keep: e.target.checked };
      await axios.put(
        `http://localhost:5000/player/updatePlayer/${e.target.id}`,
        newKeep
      );
      setChangeKeeper(!changeKeeper);
    },
    [changeKeeper]
  );

  useEffect(() => {
    console.log("get owner info");
    const getOwnerData = async () => {
      await axios.get("http://localhost:5000/owner/").then((response) => {
        setPenaltyFees(
          response.data.map((owner) => {
            return { name: owner.name, penaltyFee: owner.penaltyFee };
          })
        );
        const mycurrentOwner = response.data.find((owner) => {
          return props.match.params.name === owner.name;
        });
        setOwner(mycurrentOwner);
      });
    };

    getOwnerData();
  }, [props.match.params.name, changeKeeper]);

  useEffect(() => {
    const fetchRosterInfo = async () => {
      if (owner.name.length > 0) {
        const allPlayers = await getRoster(owner._id);
        setRoster(
          allPlayers.sort((a, b) => (a.position > b.position ? 1 : -1))
        );
      }
    };

    fetchRosterInfo();
    const getFranchiseTagInfo = async () => {
      const franchiseDTO = await getFranchiseTagDTO();
      setFranchisePrices(formatFranchisePrices(franchiseDTO));
    };

    getFranchiseTagInfo();
  }, [owner._id, owner.name.length, toggleKeeper]);

  /*
  useEffect(() => {
    const calculatePenaltyReward = () => {
      if (penaltyFees.length > 0) {
        const nonOffenders = penaltyFees.filter(
          (owner) => owner.penaltyFee === 0
        ).length;

        const penaltyMoneyInThePot = penaltyFees.reduce(
          (acc, owner) => acc + owner.penaltyFee,
          0
        );
        return Math.trunc(penaltyMoneyInThePot / nonOffenders);
      }
    };
    // const penaltyReward = calculatePenaltyReward();
    // setReward(penaltyReward);
  }, [changeKeeper, penaltyFees]);
*/

  return (
    <Container>
      <OwnerCapDisplay
        owner={owner}
        roster={roster}
        franchisePrices={franchisePrices}
        penaltyReward={reward}
      />
      <h4>Roster:</h4>
      <PlayerDisplayByPosition playerList={roster} />
      <RosterDataTable
        roster={roster}
        franchisePrices={franchisePrices}
        toggleKeeper={toggleKeeper}
      />
    </Container>
  );
};

export default Roster;
