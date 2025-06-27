import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Button, Container } from "reactstrap";
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
import KeptPlayersDisplay from "../reusable/KeptPlayersDisplay";
import RosterDataTable from "./RosterDataTable";
import RosterCapInfo from "./RosterCapInfo";
import RosterFranchiseTable from "./RosterFranchiseTable";

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
    payoutPerOwner,
    recalculatePenaltyFees,
  } = usePenaltyFees();
  const {
    error: franchiseError,
    qbPrice,
    rbPrice,
    wrPrice,
    tePrice,
    recalculatePrices,
  } = useFranchisePrices();

  const {
    data: roster,
    error: rosterError,
    refetch: refetchRoster,
  } = useFetch(() => fetchRoster(ownerSleeperId));

  const [cap, setCap] = useState<number>(0);
  const [editFranchiseMode, setEditFranchiseMode] = useState<boolean>(false);
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
  return (
    <Container>
      {(rosterError || franchiseError || penaltyError) && (
        <Alert color="danger">There was an error loading this page</Alert>
      )}
      <>
        <h1 className="page-title">{name}'s Roster </h1>
        <RosterCapInfo
          roster={roster}
          franchisePrices={franchisePrices}
          penaltyReward={payoutPerOwner}
          cap={cap}
          isEditable={false}
        />

        <h4 className="section-title mb-2">Kept Players:</h4>
        <KeptPlayersDisplay playerList={keptPlayersList} isEditable={false} />

        <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
          <h4
            className="section-title mb-0"
            style={{ marginTop: 0, marginBottom: 0 }}
          >
            Full Roster:
          </h4>
          {editFranchiseMode ? (
            <Button
              color="secondary"
              outline
              size="sm"
              className="roster-cancel-btn"
              onClick={() => setEditFranchiseMode(false)}
            >
              Cancel
            </Button>
          ) : (
            <Button
              color="primary"
              outline
              size="sm"
              className="apply-franchise-btn"
              onClick={() => {
                setEditFranchiseMode(true);
              }}
            >
              Apply Franchise Tag
            </Button>
          )}
        </div>
        {editFranchiseMode ? (
          <RosterFranchiseTable
            roster={roster
              .filter((player: Player) => ![3, 4].includes(player.keeperClass))
              .sort(
                (a: Player, b: Player) =>
                  a.position.localeCompare(b.position) ||
                  b.price - a.price ||
                  a.name.localeCompare(b.name)
              )}
            franchisePrices={franchisePrices}
          />
        ) : (
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
        )}
      </>
    </Container>
  );
};

export default Roster;
