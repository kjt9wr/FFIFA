import { Button } from "reactstrap";
import { fetchSleeperRosters } from "../../api/api.service";
import { useFetch } from "../../custom-hooks/custom-hooks";
import { RosterDTO } from "../../interfaces/interfaces";
import { getCurrentSleeperLeagueId } from "../../utilities/constants";

import { ALERT_STATE } from "../../utilities/enumerations";
import { playersBySleeperID } from "../../utilities/sleeper-ids";

interface AddMissingPlayersProps {
  rosterAlertCallback: (alertType: string) => void;
}

const AddMissingPlayers = (props: AddMissingPlayersProps) => {
  const {
    data: allRosters,
    loading,
    error,
  } = useFetch(() => fetchSleeperRosters(getCurrentSleeperLeagueId()));

  const addMissingPlayers = async () => {
    console.log("Add Missing Players Clicked");

    // Combine all filtered players into one array
    const allNeedToAdd: string[] = [];
    allRosters.forEach((roster: RosterDTO) => {
      const needToAdd = roster.players.filter(
        (player) => !(player in playersBySleeperID) && /^\d+$/.test(player)
      );
      allNeedToAdd.push(...needToAdd);
    });

    console.log(allNeedToAdd);
    props.rosterAlertCallback(ALERT_STATE.SUCCESS);
  };

  return (
    <>
      {!loading && !error && (
        <Button
          color="primary"
          className="admin-btn mb-2"
          title="Add Missing Players"
          onClick={addMissingPlayers}
        >
          Add Missing Players
        </Button>
      )}
    </>
  );
};

export default AddMissingPlayers;
