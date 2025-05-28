import { Table } from "reactstrap";
import { Player } from "../../interfaces/interfaces";
import { KEEPER_CLASS_ENUM } from "../../utilities/enumerations";

interface FranchiseTagColumnProps {
  position: string;
  tagPrice: number;
  keptPlayers: Player[];
}

/*
 * This component displays a single table with a position's franchise tag information
 */
const FranchiseTagColumn = (props: FranchiseTagColumnProps) => {
  const { keptPlayers } = props;
  return (
    <div className="d-flex-1">
      <Table borderless hover size="sm" responsive striped>
        <thead className="thead-light">
          <tr>
            <th>Kept Player</th>
            <th>Original Price</th>
          </tr>
        </thead>
        <tbody>
          {keptPlayers.map((player: Player, index: number) => (
            <tr
              key={player.sleeperId}
              className={index % 2 ? "player-table-even" : "player-table-odd"}
            >
              <td
                className={
                  KEEPER_CLASS_ENUM.SUPERMAX === player.keeperClass
                    ? "fw-bold"
                    : ""
                }
              >
                {player.name}
              </td>
              <td
                className={
                  KEEPER_CLASS_ENUM.SUPERMAX === player.keeperClass
                    ? "fw-bold"
                    : ""
                }
              >
                {player.price}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default FranchiseTagColumn;
