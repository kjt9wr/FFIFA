import { Table } from "reactstrap";
import { FranchiseTagDTO, Player } from "../../interfaces/interfaces";
import RosterPlayerRow from "./RosterPlayerRow";

interface RosterDataTableProps {
  roster: Player[];
  franchisePrices: FranchiseTagDTO;
  toggleKeeper: (e: Event) => void;
  editFranchiseMode?: boolean;
  onSubmitFranchise?: (e: Event) => void;
}

/*
 * This component displays the roster table
 */
const RosterDataTable = (props: RosterDataTableProps) => {
  return (
    <Table responsive size="md" hover borderless>
      <thead className="thead-light">
        <tr>
          <th>Position</th>
          <th>Player</th>
          <th>Price</th>
          <th>Keep</th>
          <th>Keep Class</th>
        </tr>
      </thead>
      <tbody>
        {props.roster.map((currentPlayer, index) => {
          return (
            <RosterPlayerRow
              index={index}
              player={currentPlayer}
              key={currentPlayer.sleeperId}
              id={currentPlayer.sleeperId}
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
