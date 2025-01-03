import React from "react";
import { Table } from "reactstrap";

const filterKeepersByPosition = (keptPlayers, position) => {
  return keptPlayers
    ? keptPlayers.filter((player) => player.position === position)
    : [];
};
/*
 * This component displays a table of players grouped by position
 */
const editablePlayerDisplay = (props) => {
  const { removePlayerCallback } = props;

  const displayPlayers = (playerList) => {
    return playerList.map((player) => {
      return (
        <tr key={player.name}>
          <td
            onClick={() => {
              removePlayerCallback(player._id);
            }}
          >
            {player.name} - ${player.price}
          </td>
        </tr>
      );
    });
  };

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
      <tbody>{displayPlayers(players)}</tbody>
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

export default editablePlayerDisplay;
