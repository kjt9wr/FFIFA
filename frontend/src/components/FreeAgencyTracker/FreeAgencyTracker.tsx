import React from "react";
import { Col, Row, Table } from "reactstrap";
import { useFreeAgents } from "../../custom-hooks/custom-hooks";
import { Player } from "../../interfaces/interfaces";
import { POSITION } from "../../utilities/enumerations";
import { TRANSPARENT_TABLE_STYLE } from "../../utilities/constants";

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
              <td style={TRANSPARENT_TABLE_STYLE}> {player.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

/*
 * This page displays all free agent players organized by position
 */
const FreeAgency = () => {
  const freeAgents = useFreeAgents();
  return (
    <div>
      <h2 className="text-center"> Free Agents </h2>
      <Row>
        {freeAgents && (
          <>
            <Col>
              <FreeAgentColumn
                availablePlayers={freeAgents.availableQBs}
                position={POSITION.QB}
              />
            </Col>
            <Col>
              <FreeAgentColumn
                availablePlayers={freeAgents.availableRBs}
                position={POSITION.RB}
              />
            </Col>
            <Col>
              <FreeAgentColumn
                availablePlayers={freeAgents.availableWRs}
                position={POSITION.WR}
              />
            </Col>
            <Col>
              <FreeAgentColumn
                availablePlayers={freeAgents.availableTEs}
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
