import { Button } from "reactstrap";
import {
  addPlayerToDatabase,
  fetchNflPlayer,
  fetchSleeperRosters,
} from "../../api/api.service";
import { useFetch } from "../../custom-hooks/custom-hooks";
import {
  addPlayerDTO,
  NflPlayerDTO,
  RosterDTO,
} from "../../interfaces/interfaces";
import {
  ALL_POSITIONS,
  getCurrentSleeperLeagueId,
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
    // Combine all filtered players into one array
    const allNeedToAdd: string[] = [];
    allRosters.forEach((roster: RosterDTO) => {
      const needToAdd = roster.players.filter(
        (player) => !(player in playersBySleeperID) && /^\d+$/.test(player)
      );
      allNeedToAdd.push(...needToAdd);
    });

    // Fetch NFL player data for each ID
    const nflPlayerDataArray: NflPlayerDTO[] = [];
    for (const playerId of allNeedToAdd) {
      try {
        const playerData = await fetchNflPlayer(playerId);
        nflPlayerDataArray.push(playerData.data);
      } catch (error) {
        console.error(`Error fetching player ${playerId}:`, error);
      }
    }
    const playersToAdd = nflPlayerDataArray.filter((player) =>
      ALL_POSITIONS.includes(player.position)
    );

    for (const player of playersToAdd) {
      const payload: addPlayerDTO = {
        name: player.full_name,
        price: 10,
        keep: false,
        position: player.position,
        rank: 40,
        keepClass: 1,
        ownerName: "",
        sleeperId: player.player_id,
      };

      try {
        console.log("Adding player with payload:", payload);
        await addPlayerToDatabase(payload);
        console.log(
          `Successfully added player: ${player.player_id}: "${player.full_name}"`
        );
      } catch (error) {
        console.log(
          `Need to add player: ${player.player_id}: "${player.full_name}"`
        );
      }
    }

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
