import React from "react";
import { Table } from "reactstrap";
import { TiDelete } from "react-icons/ti";

const filterKeepersByPosition = (keptPlayers, position) => {
  return keptPlayers
    ? keptPlayers.filter((player) => player.position === position)
    : [];
};
/*
 * This component displays a table of players grouped by position
 */
const PlayerDisplayByPosition = (props) => {
  const { removePlayerCallback, isEditable } = props;

  const keptQBs = filterKeepersByPosition(props.playerList, "QB");
  const keptRBs = filterKeepersByPosition(props.playerList, "RB");
  const keptWRs = filterKeepersByPosition(props.playerList, "WR");
  const keptTEs = filterKeepersByPosition(props.playerList, "TE");

  const renderPlayersForPosition = (position, players) => (
    <Table borderless size="sm" hover responsive>
      <thead className="thead-light">
        <tr>
          <th>{position}</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => {
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
