import { Button, Col, Row, Table } from "reactstrap";
import { Player } from "../../interfaces/interfaces";
import { TRANSPARENT_TABLE_STYLE } from "../../utilities/constants";
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
              {isEditable && removePlayerCallback ? (
                <td
                  style={TRANSPARENT_TABLE_STYLE}
                  onClick={() => {
                    removePlayerCallback(player.sleeperId);
                  }}
                >
                  <Button size="sm" outline className="mr-auto">
                    X
                  </Button>
                  {player.name} - ${player.price}
                </td>
              ) : (
                <td style={TRANSPARENT_TABLE_STYLE}>{player.name}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );

  return (
    <Row xs="2" md="4">
      <Col>{renderPlayersForPosition(POSITION.QB, keptQBs)} </Col>
      <Col>{renderPlayersForPosition(POSITION.RB, keptRBs)}</Col>
      <Col>{renderPlayersForPosition(POSITION.WR, keptWRs)}</Col>
      <Col>{renderPlayersForPosition(POSITION.TE, keptTEs)}</Col>
    </Row>
  );
};

export default PlayerDisplayByPosition;
