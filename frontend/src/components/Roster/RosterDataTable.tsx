import React from "react";
import { Table } from "reactstrap";
import { FranchiseTagDTO, Player } from "../../interfaces/interfaces";
import RosterPlayerRow from "./RosterPlayerRow";

interface RosterDataTableProps {
  roster: Player[];
  franchisePrices: FranchiseTagDTO;
  toggleKeeper: (e: Event) => void;
}

/*
 * This component displays the roster table
 */
const RosterDataTable = (props: RosterDataTableProps) => {
  return (
    <Table responsive size="md" hover striped>
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
        {props.roster.map((currentPlayer) => {
          return (
            <RosterPlayerRow
              player={currentPlayer}
              key={currentPlayer._id}
              id={currentPlayer._id}
              keep={currentPlayer.keep}
              toggleKeeper={props.toggleKeeper}
              franchisePrices={props.franchisePrices}
            />
          );
        })}
      </tbody>
    </Table>
  );
};

export default RosterDataTable;
