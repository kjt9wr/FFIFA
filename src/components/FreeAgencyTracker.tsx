import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "reactstrap";
import * as Constants from "../utilities/constants";
import { fetchFreeAgents } from "../api/api.service";
import { Player, FreeAgentStorage } from "../interfaces/interfaces";

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
            <tr key={player._id}>
              <td> {player.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const getFreeAgentsFromDB = async () => {
  const availablePlayers = await fetchFreeAgents();

  const availableQBs: Player[] = availablePlayers.data
    .filter(
      (player: Player) => player.position === Constants.QB && player.rank < 80
    )
    .sort((a: Player, b: Player) => a.rank - b.rank);
  const availableRBs: Player[] = availablePlayers.data
    .filter(
      (player: Player) => player.position === Constants.RB && player.rank < 80
    )
    .sort((a: Player, b: Player) => a.rank - b.rank);
  const availableWRs: Player[] = availablePlayers.data
    .filter(
      (player: Player) => player.position === Constants.WR && player.rank < 80
    )
    .sort((a: Player, b: Player) => a.rank - b.rank);
  const availableTEs: Player[] = availablePlayers.data
    .filter(
      (player: Player) => player.position === Constants.TE && player.rank < 80
    )
    .sort((a: Player, b: Player) => a.rank - b.rank);

  return { availableQBs, availableRBs, availableWRs, availableTEs };
};

/*
 * This page displays all free agent players organized by position
 */
const FreeAgency = () => {
  const [freeAgents, setFreeAgents] = useState<FreeAgentStorage>();

  useEffect(() => {
    const getFreeAgents = async () => {
      const allFreeAgents = await getFreeAgentsFromDB();
      setFreeAgents(allFreeAgents);
    };

    getFreeAgents();
  }, []);

  return (
    <div>
      <h2 className="text-center"> Free Agents </h2>
      <Row>
        {freeAgents && (
          <>
            <Col>
              <FreeAgentColumn
                availablePlayers={freeAgents.availableQBs}
                position={Constants.QB}
              />
            </Col>
            <Col>
              <FreeAgentColumn
                availablePlayers={freeAgents.availableRBs}
                position={Constants.RB}
              />
            </Col>
            <Col>
              <FreeAgentColumn
                availablePlayers={freeAgents.availableWRs}
                position={Constants.WR}
              />
            </Col>
            <Col>
              <FreeAgentColumn
                availablePlayers={freeAgents.availableTEs}
                position={Constants.TE}
              />
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default FreeAgency;
