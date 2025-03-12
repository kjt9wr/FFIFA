import { Alert, Col, Row } from "reactstrap";
import { useFranchisePrices } from "../../custom-hooks/custom-hooks";
import { POSITION } from "../../utilities/enumerations";
import FranchiseTagColumn from "./FranchiseTagColumn";

/*
 * This page displays the prices of kept players and the corresponding franchise tag prices
 */

const FranchiseTag = () => {
  const {
    qbList,
    rbList,
    wrList,
    teList,
    qbPrice,
    rbPrice,
    wrPrice,
    tePrice,
    loading,
    error,
  } = useFranchisePrices();

  return (
    <div>
      <h2 className="text-center"> Franchise Tag Prices </h2>
      {error && <Alert color="danger">Error fetching players</Alert>}
      {!loading && !error && (
        <Row>
          <Col>
            <FranchiseTagColumn
              keptPlayers={qbList}
              position={POSITION.QB}
              tagPrice={qbPrice}
            />
          </Col>
          <Col>
            <FranchiseTagColumn
              keptPlayers={rbList}
              position={POSITION.RB}
              tagPrice={rbPrice}
            />
          </Col>
          <FranchiseTagColumn
            keptPlayers={wrList}
            position={POSITION.WR}
            tagPrice={wrPrice}
          />
          <Col>
            <FranchiseTagColumn
              keptPlayers={teList}
              position={POSITION.TE}
              tagPrice={tePrice}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default FranchiseTag;
