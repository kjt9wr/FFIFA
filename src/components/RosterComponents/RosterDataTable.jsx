import React from "react";
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

const getSuperMaxText = (currentYear, plan) => {
  return plan > 0 ? (
    <b>
      {" "}
      Year {currentYear} in {plan} Year Deal{" "}
    </b>
  ) : (
    ""
  );
};
/*
 * This component displays the roster table
 */
const RosterDataTable = (props) => {
  return (
    <div className="container">
      <table className="table">
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
      </table>
    </div>
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
        {" "}
        <input
          type="checkbox"
          id={props.id}
          key={props.id}
          onChange={props.toggleKeeper}
          checked={props.keep}
        />{" "}
      </td>
      <td>{player.keeperClass > 1 && KeeperClassEnum[player.keeperClass]}</td>
      <td> {getSuperMaxText(player.superMaxYear, player.superMaxPlan)} </td>
    </tr>
  );
};

export default RosterDataTable;
