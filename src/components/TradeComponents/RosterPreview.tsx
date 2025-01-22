import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { Button, Col, Container, Form, Row } from "reactstrap";
import {
  fetchAllOwners,
  fetchRoster,
  fetchRosteredPlayers,
} from "../../api/api.service";
import { FranchiseTagDTO, Owner, Player } from "../../interfaces/interfaces";
import { calculateLuxaryPotPayout } from "../../services/ffifa.service";
import { getFranchiseTagDTO } from "../../services/franchise.service";
import { getUpcomingYearIndex } from "../../utilities/constants";
import { ownersIDByName } from "../../utilities/id-maps";
import PlayerDisplayByPosition from "../reusable/PlayerDisplayByPosition";
import RosterOwnerCapDisplay from "../RosterComponents/RosterOwnerCapDisplay";

const ownerName = "Kevin";
const ownerId = ownersIDByName[ownerName];

/*
 * This page allows the user to edit and view a roster without publishing changes
 */

const RosterPreview = () => {
  const [roster, setRoster] = useState<Player[]>([]);
  const [penaltyFees, setPenaltyFees] = useState([]);
  const [franchisePrices, setFranchisePrices] = useState<FranchiseTagDTO>();
  const [maxCap, setMaxCap] = useState();
  const [rosteredPlayerPool, setRosteredPlayerPool] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState();

  useEffect(() => {
    Promise.all([
      fetchRoster(ownerId),
      fetchAllOwners(), // used for penalty fees
      getFranchiseTagDTO(),
      fetchRosteredPlayers(),
    ]).then(([unsortedRoster, owners, franchiseTags, allRosteredPlayers]) => {
      setRoster(unsortedRoster.data.filter((player: Player) => player.keep));
      const initialCap = owners.data.filter(
        (owner: Owner) => ownerName === owner.name
      )[0].cap[getUpcomingYearIndex()];
      setMaxCap(initialCap);
      const fees = owners.data.map((owner: Owner) => {
        return {
          name: owner.name,
          penaltyFee: owner.penaltyFee,
          initialCap: owner.cap[getUpcomingYearIndex()],
        };
      });
      setPenaltyFees(fees);
      setFranchisePrices(franchiseTags);
      setRosteredPlayerPool(allRosteredPlayers.data);
    });
  }, []);

  const updateCap = useCallback((newValue) => {
    setMaxCap(newValue);
  }, []);

  const removePlayer = useCallback(
    (playerId) => {
      setRoster(roster.filter((player) => player._id !== playerId));
    },
    [roster]
  );

  const onChangeSelect = (e: any) => {
    const selection = e ? e.value : "";
    setSelectedPlayer(selection);
  };

  const handleSubmit = (e: any) => {
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
        .filter((player: Player) => !roster.includes(player))
        .map((player: Player) => {
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
    control: (baseStyles: any) => ({
      ...baseStyles,
    }),
    option: (baseStyles: any) => ({
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
