import { Alert, Col, Row, Table } from "reactstrap";
import { fetchFreeAgents } from "../../api/api.service";
import { useFetch } from "../../custom-hooks/custom-hooks";
import { Player } from "../../interfaces/interfaces";
import { TRANSPARENT_TABLE_STYLE } from "../../utilities/constants";
import { POSITION } from "../../utilities/enumerations";

interface FreeAgentColumnProps {
  availablePlayers: Player[];
  position: string;
}

const FreeAgentColumn = (props: FreeAgentColumnProps) => {
  const { position, availablePlayers } = props;
  return (
    <div>
      <h3> {position} </h3>
      <Table borderless size="sm">
        <tbody>
          {availablePlayers.map((player: Player) => (
            <tr key={player.sleeperId}>
              <td style={TRANSPARENT_TABLE_STYLE}> {player.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
const getAvailablePlayersPosition = (
  position: string,
  playerList: Player[]
) => {
  return playerList
    .filter(
      (player: Player) =>
        player.position === position && player.rank && player.rank < 80
    )
    .sort((a: Player, b: Player) => {
      return a.rank && b.rank ? a.rank - b.rank : -1;
    });
};

/*
 * This page displays all free agent players organized by position
 */
const FreeAgency = () => {
  const { data: allFreeAgents, loading, error } = useFetch(fetchFreeAgents);

  return (
    <div>
      <h2 className="text-center"> Free Agents </h2>
      {error && <Alert color="danger">Error fetching players</Alert>}
      <Row>
        {!loading && !error && (
          <>
            <Col>
              <FreeAgentColumn
                availablePlayers={getAvailablePlayersPosition(
                  POSITION.QB,
                  allFreeAgents
                )}
                position={POSITION.QB}
              />
            </Col>
            <Col>
              <FreeAgentColumn
                availablePlayers={getAvailablePlayersPosition(
                  POSITION.RB,
                  allFreeAgents
                )}
                position={POSITION.RB}
              />
            </Col>
            <Col>
              <FreeAgentColumn
                availablePlayers={getAvailablePlayersPosition(
                  POSITION.WR,
                  allFreeAgents
                )}
                position={POSITION.WR}
              />
            </Col>
            <Col>
              <FreeAgentColumn
                availablePlayers={getAvailablePlayersPosition(
                  POSITION.TE,
                  allFreeAgents
                )}
                position={POSITION.TE}
              />
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default FreeAgency;
