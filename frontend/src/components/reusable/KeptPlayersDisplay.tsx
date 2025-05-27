import { Button, Col, Row, Table } from "reactstrap";
import { Player } from "../../interfaces/interfaces";
import { POSITION } from "../../utilities/enumerations";

interface KeptPlayersDisplayProps {
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
const KeptPlayersDisplay = (props: KeptPlayersDisplayProps) => {
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
            <tr className="roster-display-table" key={player.name}>
              {isEditable && removePlayerCallback ? (
                <td
                  onClick={() => {
                    removePlayerCallback(player.sleeperId);
                  }}
                >
                  <Button
                    size="sm"
                    outline
                    color="primary"
                    className="remove-player-btn"
                    title="Remove player"
                    aria-label={`Remove ${player.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      removePlayerCallback(player.sleeperId);
                    }}
                  >
                    &times;
                  </Button>
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
    <>
      <h4 className="section-title">Kept Players:</h4>
      <Row xs="2" md="4">
        <Col>{renderPlayersForPosition(POSITION.QB, keptQBs)} </Col>
        <Col>{renderPlayersForPosition(POSITION.RB, keptRBs)}</Col>
        <Col>{renderPlayersForPosition(POSITION.WR, keptWRs)}</Col>
        <Col>{renderPlayersForPosition(POSITION.TE, keptTEs)}</Col>
      </Row>
    </>
  );
};

export default KeptPlayersDisplay;
