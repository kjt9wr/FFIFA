import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Container } from "reactstrap";
import {
  fetchRoster,
  updatePenaltyFee,
  updatePlayerKeeperStatus,
} from "../../api/api.service";
import {
  useFetch,
  useFranchisePrices,
  usePenaltyFees,
} from "../../custom-hooks/custom-hooks";
import { Player } from "../../interfaces/interfaces";
import {
  calculatePenaltyFee,
  getOwnersCap,
} from "../../services/roster.service";
import { OwnerSleeperIdByName } from "../../utilities/sleeper-ids";
import PlayerDisplayByPosition from "../reusable/PlayerDisplayByPosition";
import SpinnerWrapper from "../reusable/SpinnerWrapper";
import RosterDataTable from "./RosterDataTable";
import RosterOwnerCapDisplay from "./RosterOwnerCapDisplay";

/*
 * This page displays an owner's available cap information, projected keepers display,
 * and a roster table to edit keepers
 */

interface RosterProps {
  match: {
    params: {
      name: string;
    };
  };
}

const Roster = (props: RosterProps) => {
  const {
    error: penaltyError,
    loading: penaltyLoading,
    payoutPerOwner,
    recalculatePenaltyFees,
  } = usePenaltyFees();
  const {
    error: franchiseError,
    loading: franchiseLoading,
    qbPrice,
    rbPrice,
    wrPrice,
    tePrice,
    recalculatePrices,
  } = useFranchisePrices();

  const {
    data: roster,
    loading: rosterLoading,
    error: rosterError,
    refetch: refetchRoster,
  } = useFetch(() => fetchRoster(ownerSleeperId));

  const [cap, setCap] = useState<number>(0);
  const { name } = useParams();

  const franchisePrices = {
    qbFranchisePrice: qbPrice,
    rbFranchisePrice: rbPrice,
    wrFranchisePrice: wrPrice,
    teFranchisePrice: tePrice,
  };
  const ownerSleeperId = OwnerSleeperIdByName[name || ""];

  const toggleKeeper = async (e: any) => {
    const playertoChange = roster.find(
      (player) => player.sleeperId === e.target.id
    );
    if (playertoChange) {
      playertoChange.keep = e.target.checked;

      await updatePlayerKeeperStatus(e.target.id, { keep: e.target.checked });
      await recalculatePrices();
      await refetchRoster();
      const penaltyFee = calculatePenaltyFee(roster, franchisePrices, cap);
      await updatePenaltyFee(name || "", penaltyFee);
      await recalculatePenaltyFees();
    }
  };

  useEffect(() => {
    const getCap = async () => {
      const currentYearCap = await getOwnersCap(name || "");
      setCap(currentYearCap);
    };

    getCap();
  }, [name]);

  const keptPlayersList = roster.filter((p) => p.keep);

  const pageLoading = rosterLoading || penaltyLoading || franchiseLoading;
  return (
    <Container>
      {(rosterError || franchiseError || penaltyError) && (
        <Alert color="danger">There was an error loading this page</Alert>
      )}
      <>
        <RosterOwnerCapDisplay
          ownerName={name || ""}
          roster={roster}
          franchisePrices={franchisePrices}
          penaltyReward={payoutPerOwner}
          cap={cap}
          isEditable={false}
        />
        <h4>Roster:</h4>
        <SpinnerWrapper loading={pageLoading} />
        {!pageLoading && (
          <>
            <PlayerDisplayByPosition
              playerList={keptPlayersList}
              isEditable={false}
            />
            <RosterDataTable
              roster={roster.sort(
                (a: Player, b: Player) =>
                  a.position.localeCompare(b.position) ||
                  b.price - a.price ||
                  a.name.localeCompare(b.name)
              )}
              franchisePrices={franchisePrices}
              toggleKeeper={toggleKeeper}
            />
          </>
        )}
      </>
    </Container>
  );
};

export default Roster;
