import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import {
  clearAllPlayersOwner,
  fetchSleeperRosters,
  updateRoster,
} from "../../api/api.service";
import { RosterDTO } from "../../interfaces/interfaces";
import { SleeperRoster } from "../../interfaces/sleeper-interfaces";
import {
  ALERT_STATE,
  OwnerIDBySleeperRosterID,
  SLEEPER_LEAGUE_ID_2024,
} from "../../utilities/constants";

interface UpdateRosterProps {
  rosterAlertCallback: (alertType: string) => void;
}

const UpdateRosters = (props: UpdateRosterProps) => {
  const [allRosters, setAllRosters] = useState<RosterDTO[]>([]);

  // get all rosters from Sleeper Api
  useEffect(() => {
    const getAllRosters = async () => {
      const rostersResponse = await fetchSleeperRosters(SLEEPER_LEAGUE_ID_2024);
      const rosters = rostersResponse.data.map((roster: SleeperRoster) => {
        return {
          players: roster.players,
          ownerSleeperId: roster.roster_id,
        };
      });

      setAllRosters(rosters);
    };

    getAllRosters();
  }, []);

  const updateAllRosters = async () => {
    await clearAllPlayersOwner().catch(() => {
      props.rosterAlertCallback(ALERT_STATE.ERROR);
    });

    allRosters.forEach(async (roster: RosterDTO) => {
      await updateRoster(
        OwnerIDBySleeperRosterID[roster.ownerSleeperId],
        roster.players
      ).catch(() => {
        props.rosterAlertCallback(ALERT_STATE.ERROR);
      });
    });
    props.rosterAlertCallback(ALERT_STATE.SUCCESS);
  };

  return (
    <Button title="Update All Rosters" onClick={updateAllRosters}>
      Update All Rosters
    </Button>
  );
};

export default UpdateRosters;
