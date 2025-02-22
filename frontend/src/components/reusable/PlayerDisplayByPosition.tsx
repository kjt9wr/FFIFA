import React from "react";
import { TiDelete } from "react-icons/ti";
import { Table } from "reactstrap";
import { Player } from "../../interfaces/interfaces";
import { POSITION } from "../../utilities/enumerations";

interface PlayerDisplayByPositionProps {
  isEditable: Boolean;
  playerList: Player[];
  removePlayerCallback?: (playerId: string) => void;
}

const filterKeepersByPosition = (keptPlayers: Player[], position: string) => {
  return keptPlayers
    ? keptPlayers.filter((player: Player) => player.position === position)
    : [];
};
/*
 * This component displays a table of players grouped by position
 */
const PlayerDisplayByPosition = (props: PlayerDisplayByPositionProps) => {
  const { removePlayerCallback, isEditable, playerList } = props;

  const keptQBs = filterKeepersByPosition(playerList, POSITION.QB);
  const keptRBs = filterKeepersByPosition(playerList, POSITION.RB);
  const keptWRs = filterKeepersByPosition(playerList, POSITION.WR);
  const keptTEs = filterKeepersByPosition(playerList, POSITION.TE);

  const renderPlayersForPosition = (position: string, players: Player[]) => (
    <Table borderless size="sm" hover responsive>
      <thead className="thead-light">
        <tr>
          <th>{position}</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player: Player) => {
          return (
            <tr key={player.name}>
              {isEditable ? (
                <td
                  onClick={() => {
                    removePlayerCallback(player._id);
                  }}
                >
                  <TiDelete />
                  {player.name} - ${player.price}
                </td>
              ) : (
                <td>{player.name}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );

  return (
    <div style={{ display: "flex" }}>
      {renderPlayersForPosition(POSITION.QB, keptQBs)}
      {renderPlayersForPosition(POSITION.RB, keptRBs)}
      {renderPlayersForPosition(POSITION.WR, keptWRs)}
      {renderPlayersForPosition(POSITION.TE, keptTEs)}
    </div>
  );
};

export default PlayerDisplayByPosition;
