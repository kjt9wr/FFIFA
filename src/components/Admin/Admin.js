import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Container } from "reactstrap";
import { increaseKeeperPrice } from "../../Services/FFIFAService";
import {
  DRAFT_ID_2024,
  OwnerIDBySleeperRosterID,
  SLEEPER_LEAGUE_ID_2024,
} from "../../Utilities/Constants";
import { playersBySleeperID } from "../../Utilities/Sleeper_Ids";

const Admin = () => {
  const [allRosters, setAllRosters] = useState();
  const [draftData, setDraftData] = useState();
  const [rosterUpdateSuccess, setRosterUpdateSuccess] = useState(false);
  const [rosterUpdateError, setRosterUpdateError] = useState(false);
  const [draftDataSuccess, setDraftDataSuccess] = useState(false);
  const [draftDataError, setDraftDataError] = useState(false);

  // get all rosters from Sleeper Api
  useEffect(() => {
    const getAllRosters = async () => {
      const rostersResponse = await axios.get(
        `https://api.sleeper.app/v1/league/${SLEEPER_LEAGUE_ID_2024}/rosters`
      );
      const rosters = rostersResponse.data.map((roster) => {
        return {
          players: roster.players,
          ownerSleeperId: roster.roster_id,
        };
      });

      setAllRosters(rosters);
    };

    getAllRosters();
  }, []);

  // get draft prices for all players
  useEffect(() => {
    const getDraftInfo = async () => {
      const draftResults = await axios.get(
        `https://api.sleeper.app/v1/draft/${DRAFT_ID_2024}/picks`
      );
      const playersToUpdate = draftResults.data
        .filter((player) => player.metadata.player_id in playersBySleeperID)
        .map((player) => ({
          price: player.metadata.amount,
          sleeperId: player.metadata.player_id,
        }));

      setDraftData(playersToUpdate);
    };
    getDraftInfo();
  }, []);

  const updateAllRosters = async () => {
    await axios
      .post(`http://localhost:5000/player/removeAllOwners`)
      .catch((e) => {
        setRosterUpdateError(true);
        console.error(e);
      });

    allRosters.forEach(async (roster) => {
      await axios
        .post(
          `http://localhost:5000/player/update/roster/${
            OwnerIDBySleeperRosterID[roster.ownerSleeperId]
          }`,
          {
            players: roster.players,
          }
        )
        .catch((e) => {
          setRosterUpdateError(true);
          console.error(e);
        });
    });
    setRosterUpdateSuccess(true);
  };

  const addDraftPrices = async () => {
    draftData.forEach(async (player) => {
      await axios
        .put(
          `http://localhost:5000/player/updatePlayer/price/${player.sleeperId}`,
          {
            price: increaseKeeperPrice(player.price),
          }
        )
        .catch((e) => {
          setDraftDataError(true);
          console.error(e);
        });
    });
    setDraftDataSuccess(true);
  };

  return (
    <Container>
      <h1 className="text-center"> Admin Page </h1>
      {rosterUpdateError && (
        <Alert color="danger">Error updating rosters</Alert>
      )}
      {rosterUpdateSuccess && !rosterUpdateError && (
        <Alert color="success">Successfully Updated Rosters</Alert>
      )}
      {draftDataError && (
        <Alert color="danger">Error updating player prices</Alert>
      )}
      {draftDataSuccess && !draftDataError && (
        <Alert color="success">Successfully Updated player Prices</Alert>
      )}
      <Button title="Update All Rosters" onClick={updateAllRosters}>
        Update All Rosters
      </Button>
      <Button title="Add Draft Prices" onClick={addDraftPrices}>
        Add Draft Prices
      </Button>
      <br /> <br />
    </Container>
  );
};

export default Admin;
