import React from "react";
import { Table } from "reactstrap";
import { Player } from "../../interfaces/interfaces";
import { KEEPER_CLASS_ENUM } from "../../utilities/enumerations";
import { TABLE_STYLE } from "../../utilities/constants";

interface FranchiseTagColumnProps {
  position: string;
  tagPrice: number;
  keptPlayers: Player[];
}

/*
 * This component displays a single table with a position's franchise tag information
 */
const FranchiseTagColumn = (props: FranchiseTagColumnProps) => {
  const { position, tagPrice, keptPlayers } = props;
  return (
    <div className="d-flex-1">
      <h3>
        {position} price: ${tagPrice}
      </h3>
      <Table borderless hover size="sm" responsive striped>
        <thead>
          <tr>
            <th>Kept Player</th>
            <th>Original Price</th>
          </tr>
        </thead>
        <tbody>
          {keptPlayers.map((player: Player) => (
            <tr key={player.sleeperId}>
              <td
                style={TABLE_STYLE}
                className={
                  KEEPER_CLASS_ENUM.SUPERMAX === player.keeperClass
                    ? "fw-bold"
                    : ""
                }
              >
                {player.name}
              </td>
              <td
                style={TABLE_STYLE}
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
