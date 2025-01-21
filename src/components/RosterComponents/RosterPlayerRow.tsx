import React from "react";
import { Input } from "reactstrap";
import {
  FranchiseTagDTO,
  Player,
  SuperMaxData,
} from "../../interfaces/interfaces";
import { determineFinalPriceOfPlayer } from "../../services/ffifa.service";
import {
  getKeeperClassText,
  KEEPER_CLASS_ENUM,
} from "../../utilities/enumerations";

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
        Year {superMax.year} in {superMax.plan} Year Deal
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
      <td>{player.position}</td>
      <td> {player.name} </td>
      <td>
        {showUnadjustedPrice(player.keeperClass) && (
          <span className="previousValue"> {player.price}</span>
        )}{" "}
        {determineFinalPriceOfPlayer(player, props.franchisePrices)}
      </td>
      <td>
        <Input
          type="checkbox"
          id={props.id}
          key={props.id}
          onChange={props.toggleKeeper}
          checked={props.keep}
        />
      </td>
      <td>
        {player.keeperClass > 1 && getKeeperClassText(player.keeperClass)}
      </td>
      <td>
        {KEEPER_CLASS_ENUM.SUPERMAX === player.keeperClass &&
          getSuperMaxText(player?.superMax)}
      </td>
    </tr>
  );
};

export default RosterPlayerRow;
