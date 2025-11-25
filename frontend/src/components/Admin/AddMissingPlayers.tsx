import { Button } from "reactstrap";
import { fetchSleeperRosters, fetchNflPlayer } from "../../api/api.service";
import { useFetch } from "../../custom-hooks/custom-hooks";
import { RosterDTO } from "../../interfaces/interfaces";
import {
  getCurrentSleeperLeagueId,
  POSITIONS,
} from "../../utilities/constants";

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

    // Fetch NFL player data for each ID
    const nflPlayerDataArray: any[] = [];
    for (const playerId of allNeedToAdd) {
      try {
        const playerData = await fetchNflPlayer(playerId);
        nflPlayerDataArray.push(playerData.data);
      } catch (error) {
        console.error(`Error fetching player ${playerId}:`, error);
      }
    }
    const playersToAdd = nflPlayerDataArray.filter((player) =>
      POSITIONS.includes(player.position)
    );

    for (const player of playersToAdd) {
      console.log(
        `Need to add: ${player.player_id}: ${player.full_name} (${player.position})`
      );
      // Here you would typically call an API to add the player to your database
      // For example: await addPlayerToDatabase(player);
    }
    console.log("Final List:", playersToAdd);

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
