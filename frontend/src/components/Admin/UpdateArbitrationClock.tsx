import { Button } from "reactstrap";
import {
  fetchAllPlayers,
  fetchArbitrationData,
  updatePlayerStatus,
} from "../../api/api.service";
import { useFetch } from "../../custom-hooks/custom-hooks";
import { Player, UpdatePlayerDTO } from "../../interfaces/interfaces";
import { getUpcomingSeasonYear } from "../../utilities/constants";

import { ALERT_STATE, KEEPER_CLASS_ENUM } from "../../utilities/enumerations";

interface UpdateArbitrationClockProps {
  arbAlertCallback: (alertType: string) => void;
}

const UpdateArbitrationClock = (props: UpdateArbitrationClockProps) => {
  const {
    data: allPlayers,
    loading,
    error,
  } = useFetch(() => fetchAllPlayers());

  const { data: upcomingArbPlayers } = useFetch(() => fetchArbitrationData());

  const oldArbPlayers = allPlayers.filter(
    (player: Player) => KEEPER_CLASS_ENUM.ARBITRATION === player.keeperClass
  );

  const playersToAdd = upcomingArbPlayers.filter(
    (player: Player) =>
      player.firstKeepYear &&
      Number(getUpcomingSeasonYear()) - player.firstKeepYear === 3
  );

  const updateArbClock = async () => {
    try {
      oldArbPlayers.forEach(async (player: Player) => {
        const updateDTO: UpdatePlayerDTO = {
          keeperClass: 1,
        };
        await updatePlayerStatus(player.sleeperId, updateDTO);
      });
      playersToAdd.forEach(async (player: Player) => {
        const updateDTO: UpdatePlayerDTO = {
          keeperClass: 4,
        };
        await updatePlayerStatus(player.sleeperId, updateDTO);
      });
      props.arbAlertCallback(ALERT_STATE.SUCCESS);
    } catch (e) {
      props.arbAlertCallback(ALERT_STATE.ERROR);
      console.error(e);
    }
  };

  return (
    <>
      {!loading && !error && (
        <Button
          color="primary"
          className="admin-btn mb-2"
          title="Update All Rosters"
          onClick={updateArbClock}
        >
          Update Arbitration Clock
        </Button>
      )}
    </>
  );
};

export default UpdateArbitrationClock;
