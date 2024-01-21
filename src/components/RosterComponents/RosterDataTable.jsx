import React from "react";
import { Table } from "reactstrap";
import { determineFinalPriceOfPlayer } from "../../Services/FFIFAService";
import { KeeperClassEnum } from "../../Utilities/KeeperClassEnum";

const populatePlayerRows = (roster, franchisePrices, toggleKeeper) => {
  return roster.map((currentPlayer) => {
    return (
      <PlayerRow
        player={currentPlayer}
        key={currentPlayer._id}
        id={currentPlayer._id}
        keep={currentPlayer.keep ? "checked" : ""}
        toggleKeeper={toggleKeeper}
        franchisePrices={franchisePrices}
      />
    );
  });
};

const getSuperMaxText = (superMax) => {
  return (
    superMax && (
      <b>
        Year {superMax.year} in {superMax.plan} Year Deal
      </b>
    )
  );
};
/*
 * This component displays the roster table
 */
const RosterDataTable = (props) => {
  return (
    <Table responsive size="md">
      <thead className="thead-light">
        <tr>
          <th>Position</th>
          <th>Player</th>
          <th>Price</th>
          <th>Keep</th>
          <th>Keep Class</th>
          <th>SuperMax</th>
        </tr>
      </thead>
      <tbody>
        {populatePlayerRows(
          props.roster,
          props.franchisePrices,
          props.toggleKeeper
        )}
      </tbody>
    </Table>
  );
};

const PlayerRow = (props) => {
  const { player } = props;
  return (
    <tr className="customRow">
      <td>{player.position}</td>
      <td> {player.name} </td>
      <td> {determineFinalPriceOfPlayer(player, props.franchisePrices)} </td>
      <td>
        <input
          type="checkbox"
          className="form-check-input"
          id={props.id}
          key={props.id}
          onChange={props.toggleKeeper}
          checked={props.keep}
        />
      </td>
      <td>{player.keeperClass > 1 && KeeperClassEnum[player.keeperClass]}</td>
      <td> {player.keeperClass === 3 && getSuperMaxText(player?.superMax)} </td>
    </tr>
  );
};

export default RosterDataTable;
