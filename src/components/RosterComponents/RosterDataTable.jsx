import React from "react";
import { Table } from "reactstrap";
import RosterPlayerRow from "./RosterPlayerRow";

const populatePlayerRows = (roster, franchisePrices, toggleKeeper) => {
  return roster.map((currentPlayer) => {
    return (
      <RosterPlayerRow
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

export default RosterDataTable;
