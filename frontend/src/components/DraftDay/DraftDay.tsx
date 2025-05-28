import { Alert, Badge, Card, CardBody, Col, Container, Row } from "reactstrap";
import { usePenaltyFees } from "../../custom-hooks/custom-hooks";
import { PenaltyFeeInfo } from "../../interfaces/interfaces";
import { calculateFollowingYearBaseCap } from "../../services/ffifa.service";
import { getUpcomingSeasonYear } from "../../utilities/constants";
import SpinnerWrapper from "../reusable/SpinnerWrapper";

const displayOwners = (
  owners: PenaltyFeeInfo[],
  filterFn: (o: PenaltyFeeInfo) => boolean
) =>
  owners.filter(filterFn).map((owner) => (
    <li key={owner.name} className="draftday-owner">
      {owner.name}
      {owner.penaltyFee > 0 && (
        <Badge color="danger" className="ms-2">
          ${owner.penaltyFee}
        </Badge>
      )}
    </li>
  ));

const DraftDay = () => {
  const { loading, error, penaltyFees, totalInPot, payoutPerOwner } =
    usePenaltyFees();
  const followingYear = Number(getUpcomingSeasonYear()) + 1;
  const followingYearCap = calculateFollowingYearBaseCap(penaltyFees);

  return (
    <Container className="py-4">
      <h1 className="page-title">Draft Day Info</h1>
      <SpinnerWrapper loading={loading} />
      {error && <Alert color="danger">Error fetching draft data</Alert>}
      {!error && !loading && (
        <>
          <Row className="mb-4">
            <Col md="4">
              <Card className="draftday-info-card">
                <CardBody>
                  <h5 className="section-title">Total Pot</h5>
                  <span className="draftday-info-value">${totalInPot}</span>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="draftday-info-card">
                <CardBody>
                  <h5 className="section-title">Payout Per Owner</h5>
                  <span className="draftday-info-value">${payoutPerOwner}</span>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="draftday-info-card">
                <CardBody>
                  <h5 className="section-title">{followingYear} Base Cap</h5>
                  <span className="draftday-info-value">
                    ${followingYearCap}
                  </span>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Card className="draftday-tax-card">
                <CardBody>
                  <h5 className="section-title">Under Tax</h5>
                  <ul className="draftday-owner-list">
                    {displayOwners(
                      penaltyFees,
                      (owner) => owner.penaltyFee === 0
                    )}
                  </ul>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card className="draftday-tax-card">
                <CardBody>
                  <h5 className="section-title">Over Tax</h5>
                  <ul className="draftday-owner-list">
                    {displayOwners(
                      penaltyFees,
                      (owner) => owner.penaltyFee > 0
                    )}
                  </ul>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default DraftDay;
