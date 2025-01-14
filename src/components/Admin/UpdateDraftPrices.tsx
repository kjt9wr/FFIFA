import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import {
  fetchSleeperDraftResults,
  updatePlayerPrice,
} from "../../api/api.service";
import { DraftDTO } from "../../interfaces/interfaces";
import { SleeperDraftPick } from "../../interfaces/sleeper-interfaces";
import { increaseKeeperPrice } from "../../services/ffifa.service";
import { ALERT_STATE, DRAFT_ID_2024 } from "../../utilities/constants";
import { playersBySleeperID } from "../../utilities/sleeper-ids";

interface UpdateDraftPricesProps {
  priceAlertCallback: (alertType: string) => void;
}

const UpdateDraftPrices = (props: UpdateDraftPricesProps) => {
  const [draftData, setDraftData] = useState<DraftDTO[]>([]);

  // get draft prices for all players
  useEffect(() => {
    const getDraftInfo = async () => {
      const draftResults = await fetchSleeperDraftResults(DRAFT_ID_2024);
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
    draftData.forEach(async (player) => {
      await updatePlayerPrice(
        player.sleeperId,
        increaseKeeperPrice(player.price)
      ).catch(() => {
        props.priceAlertCallback(ALERT_STATE.ERROR);
      });
    });
    props.priceAlertCallback(ALERT_STATE.SUCCESS);
  };

  return (
    <Button title="Add Draft Prices" onClick={addDraftPrices}>
      Update Draft Prices
    </Button>
  );
};

export default UpdateDraftPrices;
