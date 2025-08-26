import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import {
  fetchSleeperDraftResults,
  updatePlayerPrice,
} from "../../api/api.service";
import { DraftDTO } from "../../interfaces/interfaces";
import { SleeperDraftPick } from "../../interfaces/sleeper-interfaces";
import { increaseKeeperPrice } from "../../services/ffifa.service";
import { getMostRecentDraftId } from "../../utilities/constants";

import { ALERT_STATE } from "../../utilities/enumerations";
import { playersBySleeperID } from "../../utilities/sleeper-ids";

interface UpdateDraftPricesProps {
  priceAlertCallback: (alertType: string) => void;
}

const UpdateDraftPrices = (props: UpdateDraftPricesProps) => {
  const [draftData, setDraftData] = useState<DraftDTO[]>([]);

  // get draft prices for all players
  useEffect(() => {
    const getDraftInfo = async () => {
      const draftResults = await fetchSleeperDraftResults(
        getMostRecentDraftId()
      );
      const playersToUpdate = draftResults.data
        .filter(
          (player: SleeperDraftPick) =>
            player.metadata.player_id in playersBySleeperID
        )
        .map((player: SleeperDraftPick) => ({
          price: player.metadata.amount,
          sleeperId: player.metadata.player_id,
        }));
      setDraftData(playersToUpdate);
    };
    getDraftInfo();
  }, []);

  const addDraftPrices = async () => {
    for (const player of draftData) {
      console.log(
        `Updating ${player.sleeperId} to price ${increaseKeeperPrice(
          player.price
        )}`
      );
      await updatePlayerPrice(
        player.sleeperId,
        increaseKeeperPrice(player.price)
      )
        .then(() => {
          props.priceAlertCallback(ALERT_STATE.SUCCESS);
        })
        .catch(() => {
          props.priceAlertCallback(ALERT_STATE.ERROR);
        });
    }
  };

  return (
    <Button title="Add Draft Prices" onClick={addDraftPrices}>
      Update Draft Prices
    </Button>
  );
};

export default UpdateDraftPrices;
