import React, { useState, useEffect } from "react";
import * as FreeAgencyService from "../Services/FreeAgencyService";
import * as Constants from "../Utilities/Constants";
import { Col, Row, Table } from "reactstrap";

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
/*
 * This page displays all free agent players organized by position
 */
const FreeAgency = () => {
  const [freeAgents, setFreeAgents] = useState({});

  useEffect(() => {
    const getFreeAgents = async () => {
      const allFreeAgents = await FreeAgencyService.getFreeAgents();
      setFreeAgents(allFreeAgents);
    };

    getFreeAgents();
  });

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
