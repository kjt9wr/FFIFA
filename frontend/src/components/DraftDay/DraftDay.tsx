import { Alert, Card, Col, Container, Row, Spinner } from "reactstrap";
import { usePenaltyFees } from "../../custom-hooks/custom-hooks";
import { PenaltyFeeInfo } from "../../interfaces/interfaces";
import { calculateFollowingYearBaseCap } from "../../services/ffifa.service";
import { getUpcomingSeasonYear } from "../../utilities/constants";

const displayOwnersUnderTax = (penaltyFeeData: PenaltyFeeInfo[]) => {
  return penaltyFeeData
    .filter((owner: PenaltyFeeInfo) => owner.penaltyFee === 0)
    .map((currentOwner: PenaltyFeeInfo) => {
      return <div key={currentOwner.name}>{currentOwner.name}</div>;
    });
};

const displayOwnersInTax = (ownerData: PenaltyFeeInfo[]) => {
  return ownerData
    .filter((owner: PenaltyFeeInfo) => owner.penaltyFee > 0)
    .map((currentOwner: PenaltyFeeInfo) => {
      return (
        <div key={currentOwner.name}>
          {currentOwner.name} ${currentOwner.penaltyFee}
        </div>
      );
    });
};
/*
 * This component displays draft day information
 */
const DraftDay = () => {
  const { loading, error, penaltyFees, totalInPot, payoutPerOwner } =
    usePenaltyFees();

  const followingYear = Number(getUpcomingSeasonYear()) + 1;
  const followingYearCap = calculateFollowingYearBaseCap(penaltyFees);

  return (
    <Container>
      <h1 className="text-center"> Draft Day Info </h1>
      {loading && (
        <div className="text-center">
          <Spinner />
        </div>
      )}
      {error && <Alert color="danger">Error fetching draft data</Alert>}
      {!error && !loading && (
        <>
          <h4>Total Money in the Pot: ${totalInPot}</h4>
          <h4>Payout Per Owner: ${payoutPerOwner}</h4>
          <h4>
            {followingYear} Base Cap: ${followingYearCap}
          </h4>
          <Card className="p-1 my-2">
            <Row>
              <Col>
                <h3>Under Tax: </h3>
                <h5>{displayOwnersUnderTax(penaltyFees)}</h5>
              </Col>
              <Col>
                <h3>Over Tax: </h3>
                <h5>{displayOwnersInTax(penaltyFees)}</h5>
              </Col>
            </Row>
          </Card>
        </>
      )}
    </Container>
  );
};

export default DraftDay;
