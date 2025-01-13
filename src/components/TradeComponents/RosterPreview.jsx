import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { Button, Col, Container, Form, Row } from "reactstrap";
import {
  fetchAllOwners,
  fetchRoster,
  fetchRosteredPlayers,
} from "../../api/api.service.ts";
import { calculateLuxaryPotPayout } from "../../services/ffifa.service.js";
import {
  formatFranchisePrices,
  getFranchiseTagDTO,
} from "../../services/franchise.service.js";
import { ownersIDByName } from "../../utilities/constants";
import PlayerDisplayByPosition from "../reusable/PlayerDisplayByPosition.jsx";
import RosterOwnerCapDisplay from "../RosterComponents/RosterOwnerCapDisplay.jsx";

/*
 * This page allows the user to edit and view a roster without publishing changes
 */

const RosterPreview = (props) => {
  const [roster, setRoster] = useState([]);
  const [penaltyFees, setPenaltyFees] = useState([]);
  const [franchisePrices, setFranchisePrices] = useState({});
  const [maxCap, setMaxCap] = useState();
  const [rosteredPlayerPool, setRosteredPlayerPool] = useState();
  const [selectedPlayer, setSelectedPlayer] = useState();
  const ownerName = "Kevin";
  const ownerId = ownersIDByName[ownerName];

  useEffect(() => {
    Promise.all([
      fetchRoster(ownerId),
      fetchAllOwners(), // used for penalty fees
      getFranchiseTagDTO(),
      fetchRosteredPlayers(),
    ]).then(([unsortedRoster, owners, franchiseTags, allRosteredPlayers]) => {
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
      setRosteredPlayerPool(allRosteredPlayers.data);
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

  const onChangeSelect = (e) => {
    const selection = e ? e.value : "";
    setSelectedPlayer(selection);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullPlayerObject = rosteredPlayerPool.find(
      (player) => selectedPlayer === player._id
    );
    fullPlayerObject.keeperClass = 1;
    fullPlayerObject.keep = true;
    setRoster([...roster, fullPlayerObject]);
  };

  const addablePlayers = rosteredPlayerPool
    ? rosteredPlayerPool
        .filter((player) => !roster.includes(player))
        .map((player) => {
          return { label: player.name, value: player._id };
        })
        .sort((a, b) => {
          const nameA = a.label;
          const nameB = b.label;
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        })
    : [];

  const selectionStyle = {
    control: (baseStyles, state) => ({
      ...baseStyles,
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      color: "black",
    }),
  };

  const luxaryPotPayout = calculateLuxaryPotPayout(penaltyFees);

  return (
    <Container>
      <RosterOwnerCapDisplay
        ownerName={ownerName}
        roster={roster}
        franchisePrices={franchisePrices}
        penaltyReward={luxaryPotPayout}
        cap={maxCap}
        updateCapCallback={updateCap}
        isEditable={true}
      />
      <h4>Roster:</h4>
      <PlayerDisplayByPosition
        playerList={roster}
        removePlayerCallback={removePlayer}
        isEditable={true}
      />
      <br /> <br />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <h5> Add a Player to the roster: </h5>
          </Col>
          <Col>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable={true}
              isSearchable={true}
              name="playerToAdd"
              options={addablePlayers}
              onChange={onChangeSelect}
              styles={selectionStyle}
            />
          </Col>
          <Col>
            <Button type="submit">Add Player</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default RosterPreview;
