import React from "react";
import { Table } from "reactstrap";
import { TiDelete } from "react-icons/ti";
import { Player } from "../../interfaces/interfaces";

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

  const keptQBs = filterKeepersByPosition(playerList, "QB");
  const keptRBs = filterKeepersByPosition(playerList, "RB");
  const keptWRs = filterKeepersByPosition(playerList, "WR");
  const keptTEs = filterKeepersByPosition(playerList, "TE");

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
      {renderPlayersForPosition("QB", keptQBs)}
      {renderPlayersForPosition("RB", keptRBs)}
      {renderPlayersForPosition("WR", keptWRs)}
      {renderPlayersForPosition("TE", keptTEs)}
    </div>
  );
};

export default PlayerDisplayByPosition;
