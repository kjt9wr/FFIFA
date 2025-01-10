import React from "react";
import { Col, Row, Table } from "reactstrap";
import * as Constants from "../utilities/constants";
import { KEEPER_CLASS_ENUM } from "../utilities/enumerations";
import { useFranchiseInfo } from "../custom-hooks/custom-hooks";

const populateKeptPlayers = (keptPlayersList) => {
  if (keptPlayersList) {
    return keptPlayersList.map((player) => (
      <tr key={player._id}>
        <td
          style={
            KEEPER_CLASS_ENUM.SUPERMAX === player.keeperClass
              ? { fontWeight: "bold" }
              : {}
          }
        >
          {player.name}
        </td>
        <td
          style={
            KEEPER_CLASS_ENUM.SUPERMAX === player.keeperClass
              ? { fontWeight: "bold" }
              : {}
          }
        >
          {player.price}
        </td>
      </tr>
    ));
  }
};

const FranchiseTagTable = (props) => {
  return (
    <div style={{ flex: "1" }}>
      <h3>
        {props.position} franchise price: ${props.tagPrice}
      </h3>
      <Table borderless hover size="sm" responsive striped>
        <thead>
          <tr>
            <th>Kept Player</th>
            <th>Original Price</th>
          </tr>
        </thead>
        <tbody>{populateKeptPlayers(props.keptPlayers)}</tbody>
      </Table>
    </div>
  );
};

/*
 * This page displays the prices of kept players and the corresponding franchise tag prices
 */

const FranchiseTag = () => {
  const franchiseInfo = useFranchiseInfo();

  return (
    <div>
      <h2 className="text-center"> Franchise Tag Prices </h2>
      <Row>
        <Col>
          <FranchiseTagTable
            keptPlayers={franchiseInfo.keptQBs}
            position={Constants.QB}
            tagPrice={franchiseInfo.qbFranchisePrice}
          />
        </Col>
        <Col>
          <FranchiseTagTable
            keptPlayers={franchiseInfo.keptRBs}
            position={Constants.RB}
            tagPrice={franchiseInfo.rbFranchisePrice}
          />
        </Col>
        <FranchiseTagTable
          keptPlayers={franchiseInfo.keptWRs}
          position={Constants.WR}
          tagPrice={franchiseInfo.wrFranchisePrice}
        />
        <Col>
          <FranchiseTagTable
            keptPlayers={franchiseInfo.keptTEs}
            position={Constants.TE}
            tagPrice={franchiseInfo.teFranchisePrice}
          />
        </Col>
      </Row>
    </div>
  );
};

export default FranchiseTag;
