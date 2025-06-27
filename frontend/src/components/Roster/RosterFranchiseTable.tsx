import { Table } from "reactstrap";
import { FranchiseTagDTO, Player } from "../../interfaces/interfaces";
import { POSITION } from "../../utilities/enumerations";

interface RosterFranchiseTableProps {
  roster: Player[];
  franchisePrices: FranchiseTagDTO;
  editFranchiseMode?: boolean;
  onSubmitFranchise?: (e: Event) => void;
}
const renderFranchisePrice = (
  position: string,
  franchisePrices: FranchiseTagDTO
) => {
  switch (position) {
    case POSITION.TE:
      return <span>{franchisePrices.teFranchisePrice}</span>;
    case POSITION.RB:
      return <span>{franchisePrices.rbFranchisePrice}</span>;
    case POSITION.WR:
      return <span>{franchisePrices.wrFranchisePrice}</span>;
    default:
      return <span>{franchisePrices.qbFranchisePrice}</span>;
  }
};

/*
 * This component displays the roster table
 */
const RosterFranchiseTable = (props: RosterFranchiseTableProps) => {
  console.log(props.franchisePrices);
  return (
    <Table responsive size="md" hover borderless>
      <thead className="thead-light">
        <tr>
          <th>Position</th>
          <th>Player</th>
          <th>Keeper Price</th>
          <th>Franchise Price</th>
          <th>Apply Tag</th>
        </tr>
      </thead>
      <tbody>
        {props.roster.map((currentPlayer, index) => {
          return (
            <tr
              className={index % 2 ? "player-table-even" : "player-table-odd"}
            >
              <td>{currentPlayer.position}</td>
              <td> {currentPlayer.name} </td>
              <td>{currentPlayer.price}</td>
              <td>
                {renderFranchisePrice(
                  currentPlayer.position,
                  props.franchisePrices
                )}
              </td>
              <td></td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default RosterFranchiseTable;
