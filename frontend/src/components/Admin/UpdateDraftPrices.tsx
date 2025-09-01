import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import {
  clearAllPlayerPrices,
  fetchSleeperDraftResults,
  updatePlayerPrice,
} from "../../api/api.service";
import { DraftDTO } from "../../interfaces/interfaces";
import { SleeperDraftPick } from "../../interfaces/sleeper-interfaces";
import { increaseKeeperPrice } from "../../services/ffifa.service";
import { getMostRecentDraftId } from "../../utilities/constants";

import { ALERT_STATE } from "../../utilities/enumerations";
import { playersBySleeperID } from "../../utilities/sleeper-ids";
import SpinnerWrapper from "../reusable/SpinnerWrapper";

interface UpdateDraftPricesProps {
  priceAlertCallback: (alertType: string) => void;
}

const UpdateDraftPrices = (props: UpdateDraftPricesProps) => {
  const [draftData, setDraftData] = useState<DraftDTO[]>([]);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    await clearAllPlayerPrices()
      .then(async () => {
        console.log("Cleared all player prices");

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
            .then(() => {})
            .catch(() => {
              setLoading(false);
              props.priceAlertCallback(ALERT_STATE.ERROR);
            });
        }
      })
      .catch(() => {
        setLoading(false);
        props.priceAlertCallback(ALERT_STATE.ERROR);
      });
    props.priceAlertCallback(ALERT_STATE.SUCCESS);
    setLoading(false);
  };

  return (
    <>
      <SpinnerWrapper loading={loading} />
      {!loading && (
        <Button
          title="Add Draft Prices"
          color="warning"
          className="admin-btn mb-2"
          onClick={addDraftPrices}
        >
          Update Draft Prices
        </Button>
      )}
    </>
  );
};

export default UpdateDraftPrices;
