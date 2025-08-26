import { Button } from "reactstrap";
import {
  clearAllPlayersOwner,
  fetchSleeperRosters,
  updateRoster,
} from "../../api/api.service";
import { useFetch } from "../../custom-hooks/custom-hooks";
import { RosterDTO } from "../../interfaces/interfaces";
import { getCurrentSleeperLeagueId } from "../../utilities/constants";

import { ALERT_STATE } from "../../utilities/enumerations";

interface UpdateRosterProps {
  rosterAlertCallback: (alertType: string) => void;
}

const UpdateRosters = (props: UpdateRosterProps) => {
  const {
    data: allRosters,
    loading,
    error,
  } = useFetch(() => fetchSleeperRosters(getCurrentSleeperLeagueId()));

  const updateAllRosters = async () => {
    await clearAllPlayersOwner()
      .then(() => {
        allRosters.forEach(async (roster: RosterDTO) => {
          await updateRoster(roster.owner_id, roster.players).catch(() => {
            props.rosterAlertCallback(ALERT_STATE.ERROR);
          });
        });
        props.rosterAlertCallback(ALERT_STATE.SUCCESS);
      })
      .catch(() => {
        props.rosterAlertCallback(ALERT_STATE.ERROR);
      });
  };

  return (
    <>
      {!loading && !error && (
        <Button title="Update All Rosters" onClick={updateAllRosters}>
          Update All Rosters
        </Button>
      )}
    </>
  );
};

export default UpdateRosters;
