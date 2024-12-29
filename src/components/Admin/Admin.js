import React, { useEffect, useState } from "react";
import { Alert, Button, Container } from "reactstrap";
import {
  clearAllPlayersOwner,
  fetchSleeperDraftResults,
  fetchSleeperRosters,
  updatePlayerPrice,
  updateRoster,
} from "../../api/apiService.js";
import { increaseKeeperPrice } from "../../Services/FFIFAService";
import {
  ALERT_STATE,
  DRAFT_ID_2024,
  OwnerIDBySleeperRosterID,
  SLEEPER_LEAGUE_ID_2024,
} from "../../Utilities/Constants";
import { playersBySleeperID } from "../../Utilities/Sleeper_Ids";
import AddTradeForm from "./AddTradeForm.js";

const Admin = () => {
  const [allRosters, setAllRosters] = useState();
  const [draftData, setDraftData] = useState();
  const [rosterUpdateAlert, setRosterUpdateAlert] = useState(ALERT_STATE.NONE);
  const [draftDataAlert, setDraftDataAlert] = useState(ALERT_STATE.NONE);

  // get all rosters from Sleeper Api
  useEffect(() => {
    const getAllRosters = async () => {
      const rostersResponse = await fetchSleeperRosters(SLEEPER_LEAGUE_ID_2024);
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
      const draftResults = await fetchSleeperDraftResults(DRAFT_ID_2024);
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
    await clearAllPlayersOwner().catch((e) => {
      setRosterUpdateAlert(ALERT_STATE.ERROR);
      console.error(e);
    });

    allRosters.forEach(async (roster) => {
      await updateRoster(
        OwnerIDBySleeperRosterID[roster.ownerSleeperId],
        roster.players
      ).catch((e) => {
        setRosterUpdateAlert(ALERT_STATE.ERROR);
        console.error(e);
      });
    });
    setRosterUpdateAlert(ALERT_STATE.SUCCESS);
  };

  const addDraftPrices = async () => {
    draftData.forEach(async (player) => {
      await updatePlayerPrice(
        player.sleeperId,
        increaseKeeperPrice(player.price)
      ).catch((e) => {
        setDraftDataAlert(ALERT_STATE.ERROR);
        console.error(e);
      });
    });
    setDraftDataAlert(ALERT_STATE.SUCCESS);
  };

  return (
    <Container>
      <h1 className="text-center"> Admin Page </h1>
      {ALERT_STATE.ERROR === rosterUpdateAlert && (
        <Alert color="danger">Error updating rosters</Alert>
      )}
      {ALERT_STATE.SUCCESS === rosterUpdateAlert && (
        <Alert color="success">Successfully Updated Rosters</Alert>
      )}
      {ALERT_STATE.ERROR === draftDataAlert && (
        <Alert color="danger">Error updating player prices</Alert>
      )}
      {ALERT_STATE.SUCCESS === draftDataAlert && (
        <Alert color="success">Successfully updated player draft prices</Alert>
      )}
      <Button title="Update All Rosters" onClick={updateAllRosters}>
        Update All Rosters
      </Button>
      <Button title="Add Draft Prices" onClick={addDraftPrices}>
        Add Draft Prices
      </Button>
      <br /> <br />
      <AddTradeForm />
    </Container>
  );
};

export default Admin;
