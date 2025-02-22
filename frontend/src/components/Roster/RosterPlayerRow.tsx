import React from "react";
import { Input } from "reactstrap";
import {
  FranchiseTagDTO,
  Player,
  SuperMaxData,
} from "../../interfaces/interfaces";
import { determineFinalPriceOfPlayer } from "../../services/ffifa.service";
import { getCurrentSuperMaxYear } from "../../services/supermax.service";
import {
  getKeeperClassText,
  KEEPER_CLASS_ENUM,
} from "../../utilities/enumerations";
import { TABLE_STYLE } from "../../utilities/constants";

const showUnadjustedPrice = (keeperClass: number) => {
  return [
    KEEPER_CLASS_ENUM.FRANCHISE_TAG,
    KEEPER_CLASS_ENUM.ARBITRATION,
  ].includes(keeperClass);
};

const getSuperMaxText = (superMax: SuperMaxData) => {
  return (
    superMax && (
      <b>
        Year {getCurrentSuperMaxYear(superMax.signingYear)} in {superMax.plan}{" "}
        Year Deal
      </b>
    )
  );
};

interface RosterPlayerRowProps {
  player: Player;
  franchisePrices: FranchiseTagDTO;
  id: string;
  keep: boolean;
  toggleKeeper: (e: any) => void;
}

/*
 * This component displays the an individual Player Row in the Roster Data Table
 */

const RosterPlayerRow = (props: RosterPlayerRowProps) => {
  const { player } = props;
  return (
    <tr className="customRow">
      <td style={TABLE_STYLE}>{player.position}</td>
      <td style={TABLE_STYLE}> {player.name} </td>
      <td style={TABLE_STYLE}>
        {showUnadjustedPrice(player.keeperClass) && (
          <span className="previousValue"> {player.price}</span>
        )}{" "}
        {determineFinalPriceOfPlayer(player, props.franchisePrices)}
      </td>
      <td style={TABLE_STYLE}>
        <Input
          type="checkbox"
          id={props.id}
          key={props.id}
          onChange={props.toggleKeeper}
          checked={props.keep}
          disabled={KEEPER_CLASS_ENUM.SUPERMAX === player.keeperClass}
        />
      </td>
      <td style={TABLE_STYLE}>
        {player.keeperClass > 1 && getKeeperClassText(player.keeperClass)}
      </td>
      <td style={TABLE_STYLE}>
        {KEEPER_CLASS_ENUM.SUPERMAX === player.keeperClass &&
          getSuperMaxText(player?.superMax)}
      </td>
    </tr>
  );
};

export default RosterPlayerRow;
