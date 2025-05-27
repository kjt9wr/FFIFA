import { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { Alert, Button, Col, Container, Form, Row } from "reactstrap";
import { fetchRoster, fetchRosteredPlayers } from "../../api/api.service";
import {
  useFetch,
  useFranchisePrices,
  usePenaltyFees,
} from "../../custom-hooks/custom-hooks";
import { Player } from "../../interfaces/interfaces";
import { getOwnersCap } from "../../services/roster.service";
import { OwnerSleeperIdByName } from "../../utilities/sleeper-ids";
import KeptPlayersDisplay from "../reusable/KeptPlayersDisplay";
import SpinnerWrapper from "../reusable/SpinnerWrapper";
import RosterCapInfo from "../Roster/RosterCapInfo";

const ownerName = "Kevin";
const ownerId = OwnerSleeperIdByName[ownerName];

const selectionStyle = {
  control: (baseStyles: any) => ({
    ...baseStyles,
  }),
  option: (baseStyles: any) => ({
    ...baseStyles,
    color: "black",
  }),
};

/*
 * This page allows the user to edit and view a roster without publishing changes
 */

const RosterPreview = () => {
  const [roster, setRoster] = useState<Player[]>([]);
  const [maxCap, setMaxCap] = useState<number>(0);
  const [selectedPlayer, setSelectedPlayer] = useState();
  const {
    error: franchiseError,
    loading: franchiseLoading,
    qbPrice,
    rbPrice,
    wrPrice,
    tePrice,
  } = useFranchisePrices();

  const {
    error: penaltyError,
    loading: penaltyLoading,
    payoutPerOwner,
  } = usePenaltyFees();

  const { data: rosteredPlayerPool, loading: rosterLoading } =
    useFetch(fetchRosteredPlayers);

  const franchisePrices = {
    qbFranchisePrice: qbPrice,
    rbFranchisePrice: rbPrice,
    wrFranchisePrice: wrPrice,
    teFranchisePrice: tePrice,
  };

  useEffect(() => {
    const getKeptRoster = async () => {
      const unsortedRoster = await fetchRoster(ownerId);
      setRoster(unsortedRoster.data.filter((player: Player) => player.keep));
    };

    getKeptRoster();
  }, []);

  useEffect(() => {
    const getCap = async () => {
      const currentYearCap = await getOwnersCap(ownerName || "");
      setMaxCap(currentYearCap);
    };

    getCap();
  }, []);

  const updateCap = useCallback((newValue: number) => {
    setMaxCap(newValue);
  }, []);

  const removePlayer = useCallback(
    (playerId: string) => {
      setRoster(roster.filter((player) => player.sleeperId !== playerId));
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
      (player) => selectedPlayer === player.sleeperId
    );
    if (fullPlayerObject) {
      fullPlayerObject.keeperClass = 1;
      fullPlayerObject.keep = true;
      setRoster([...roster, fullPlayerObject]);
    }
  };

  const addablePlayers = rosteredPlayerPool
    ? rosteredPlayerPool
        .filter((player: Player) => !roster.includes(player))
        .map((player: Player) => {
          return { label: player.name, value: player.sleeperId };
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

  const pageLoading = rosterLoading || penaltyLoading || franchiseLoading;

  return (
    <Container>
      {(franchiseError || penaltyError) && (
        <Alert color="danger">There was an error loading this page</Alert>
      )}
      <h2 className="page-title"> Roster Preview</h2>
      <RosterCapInfo
        roster={roster}
        franchisePrices={franchisePrices}
        penaltyReward={payoutPerOwner}
        cap={maxCap}
        updateCapCallback={updateCap}
        isEditable={true}
      />
      <SpinnerWrapper loading={pageLoading} />
      {!pageLoading && (
        <>
          <h4 className="section-title">Kept Players:</h4>
          <KeptPlayersDisplay
            playerList={roster}
            removePlayerCallback={removePlayer}
            isEditable={true}
          />
          <Form onSubmit={handleSubmit} className="add-player-form">
            <h5 className="section-title"> Add Player: </h5>
            <Row xs="2" md="4">
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
                <Button
                  type="submit"
                  outline
                  color="primary"
                  className="add-player-btn"
                >
                  + Add Player
                </Button>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </Container>
  );
};

export default RosterPreview;
