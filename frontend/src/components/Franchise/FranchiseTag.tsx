import { Alert, Col, Container, Row } from "reactstrap";
import { useFranchisePrices } from "../../custom-hooks/custom-hooks";
import { POSITION } from "../../utilities/enumerations";
import SpinnerWrapper from "../reusable/SpinnerWrapper";
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
    <Container className="py-4">
      <h2 className="page-title">Franchise Tag Prices</h2>
      {error && <Alert color="danger">Error fetching players</Alert>}
      <SpinnerWrapper loading={loading} />
      {!loading && !error && (
        <Row xs="1" md="2" lg="4" className="g-4">
          <Col>
            <h4 className="section-title">QB price: ${qbPrice}</h4>
            <FranchiseTagColumn
              keptPlayers={qbList}
              position={POSITION.QB}
              tagPrice={qbPrice}
            />
          </Col>
          <Col>
            <h4 className="section-title">RB price: ${rbPrice}</h4>
            <FranchiseTagColumn
              keptPlayers={rbList}
              position={POSITION.RB}
              tagPrice={rbPrice}
            />
          </Col>
          <Col>
            <h4 className="section-title">WR price: ${wrPrice}</h4>
            <FranchiseTagColumn
              keptPlayers={wrList}
              position={POSITION.WR}
              tagPrice={wrPrice}
            />
          </Col>
          <Col>
            <h4 className="section-title">TE price: ${tePrice}</h4>
            <FranchiseTagColumn
              keptPlayers={teList}
              position={POSITION.TE}
              tagPrice={tePrice}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default FranchiseTag;
