import { Alert, Col, Row } from "reactstrap";
import { fetchKeptPlayers } from "../../api/api.service";
import { useGetPlayers } from "../../custom-hooks/custom-hooks";
import {
  calculateFranchisePrice,
  get10MostExpensivePerPosition,
} from "../../services/franchise.service";
import { POSITION } from "../../utilities/enumerations";
import FranchiseTagColumn from "./FranchiseTagColumn";

/*
 * This page displays the prices of kept players and the corresponding franchise tag prices
 */

const FranchiseTag = () => {
  const {
    data: allKeptPlayers,
    loading,
    error,
  } = useGetPlayers(fetchKeptPlayers);

  const qbList = get10MostExpensivePerPosition(allKeptPlayers, POSITION.QB);
  const rbList = get10MostExpensivePerPosition(allKeptPlayers, POSITION.RB);
  const wrList = get10MostExpensivePerPosition(allKeptPlayers, POSITION.WR);
  const teList = get10MostExpensivePerPosition(allKeptPlayers, POSITION.TE);

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
              tagPrice={calculateFranchisePrice(qbList)}
            />
          </Col>
          <Col>
            <FranchiseTagColumn
              keptPlayers={rbList}
              position={POSITION.RB}
              tagPrice={calculateFranchisePrice(rbList)}
            />
          </Col>
          <FranchiseTagColumn
            keptPlayers={wrList}
            position={POSITION.WR}
            tagPrice={calculateFranchisePrice(wrList)}
          />
          <Col>
            <FranchiseTagColumn
              keptPlayers={teList}
              position={POSITION.TE}
              tagPrice={calculateFranchisePrice(teList)}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default FranchiseTag;
