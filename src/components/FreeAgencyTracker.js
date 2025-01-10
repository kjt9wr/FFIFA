import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "reactstrap";
import * as Constants from "../utilities/constants";
import { fetchFreeAgents } from "../api/api.service";

const populateFreeAgents = (freeAgentsForPosition) => {
  if (freeAgentsForPosition) {
    return freeAgentsForPosition.map((player) => (
      <tr key={player._id}>
        <td> {player.name}</td>
      </tr>
    ));
  }
};

const FreeAgentList = (props) => {
  return (
    <div>
      <h3> {props.position} </h3>
      <Table borderless size="sm">
        <tbody>{populateFreeAgents(props.availablePlayers)}</tbody>
      </Table>
    </div>
  );
};

const getFreeAgentsFromDB = async () => {
  const availablePlayers = await fetchFreeAgents().catch(() => {});

  const availableQBs = availablePlayers.data
    .filter((player) => player.position === Constants.QB && player.rank < 80)
    .sort((a, b) => a.rank - b.rank);
  const availableRBs = availablePlayers.data
    .filter((player) => player.position === Constants.RB && player.rank < 80)
    .sort((a, b) => a.rank - b.rank);
  const availableWRs = availablePlayers.data
    .filter((player) => player.position === Constants.WR && player.rank < 80)
    .sort((a, b) => a.rank - b.rank);
  const availableTEs = availablePlayers.data
    .filter((player) => player.position === Constants.TE && player.rank < 80)
    .sort((a, b) => a.rank - b.rank);

  return { availableQBs, availableRBs, availableWRs, availableTEs };
};

/*
 * This page displays all free agent players organized by position
 */
const FreeAgency = () => {
  const [freeAgents, setFreeAgents] = useState({});

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
        <Col>
          <FreeAgentList
            availablePlayers={freeAgents.availableQBs}
            position={Constants.QB}
          />
        </Col>
        <Col>
          <FreeAgentList
            availablePlayers={freeAgents.availableRBs}
            position={Constants.RB}
          />
        </Col>
        <Col>
          <FreeAgentList
            availablePlayers={freeAgents.availableWRs}
            position={Constants.WR}
          />
        </Col>
        <Col>
          <FreeAgentList
            availablePlayers={freeAgents.availableTEs}
            position={Constants.TE}
          />
        </Col>
      </Row>
    </div>
  );
};

export default FreeAgency;
