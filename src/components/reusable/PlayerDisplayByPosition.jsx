import React from "react";
import { Table } from "reactstrap";

const displayPlayers = (playerList) => {
  return playerList.map((player) => {
    return (
      <tr key={player.name}>
        <td> {player.name}</td>
      </tr>
    );
  });
};

const filterKeepersByPosition = (keptPlayers, position) => {
  return keptPlayers
    ? keptPlayers.filter((player) => player.position === position)
    : [];
};

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

/*
 * This component displays a table of players grouped by position
 */
const playerDisplayByPosition = (props) => {
  const keptQBs = filterKeepersByPosition(props.playerList, "QB");
  const keptRBs = filterKeepersByPosition(props.playerList, "RB");
  const keptWRs = filterKeepersByPosition(props.playerList, "WR");
  const keptTEs = filterKeepersByPosition(props.playerList, "TE");

  return (
    <div style={{ display: "flex" }}>
      {renderPlayersForPosition("QB", keptQBs)}
      {renderPlayersForPosition("RB", keptRBs)}
      {renderPlayersForPosition("WR", keptWRs)}
      {renderPlayersForPosition("TE", keptTEs)}
    </div>
  );
};

export default playerDisplayByPosition;
