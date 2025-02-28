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
    <div style={{ flex: "1" }}>
      <h3>
        {position} franchise price: ${tagPrice}
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
                style={
                  KEEPER_CLASS_ENUM.SUPERMAX === player.keeperClass
                    ? { ...TABLE_STYLE, fontWeight: "bold" }
                    : TABLE_STYLE
                }
              >
                {player.name}
              </td>
              <td
                style={
                  KEEPER_CLASS_ENUM.SUPERMAX === player.keeperClass
                    ? { ...TABLE_STYLE, fontWeight: "bold" }
                    : TABLE_STYLE
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
