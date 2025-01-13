import React from "react";
import { Col, Row } from "reactstrap";
import { useFranchiseInfo } from "../../custom-hooks/custom-hooks";
import * as Constants from "../../utilities/constants";
import FranchiseTagColumn from "./FranchiseTagColumn";

/*
 * This page displays the prices of kept players and the corresponding franchise tag prices
 */

const FranchiseTag = () => {
  const franchiseInfo = useFranchiseInfo();

  return (
    <div>
      <h2 className="text-center"> Franchise Tag Prices </h2>
      {franchiseInfo && (
        <Row>
          <Col>
            <FranchiseTagColumn
              keptPlayers={franchiseInfo.keptQBs}
              position={Constants.QB}
              tagPrice={franchiseInfo.qbFranchisePrice}
            />
          </Col>
          <Col>
            <FranchiseTagColumn
              keptPlayers={franchiseInfo.keptRBs}
              position={Constants.RB}
              tagPrice={franchiseInfo.rbFranchisePrice}
            />
          </Col>
          <FranchiseTagColumn
            keptPlayers={franchiseInfo.keptWRs}
            position={Constants.WR}
            tagPrice={franchiseInfo.wrFranchisePrice}
          />
          <Col>
            <FranchiseTagColumn
              keptPlayers={franchiseInfo.keptTEs}
              position={Constants.TE}
              tagPrice={franchiseInfo.teFranchisePrice}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default FranchiseTag;
