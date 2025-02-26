import React, { useEffect, useState } from "react";
import { Alert, Card, Col, Container, Row } from "reactstrap";
import {
  calculateFollowingYearBaseCap,
  calculateLuxaryPotPayout,
  calculateTotalInPot,
} from "../../services/ffifa.service";
import { fetchAllOwners } from "../../api/api.service";
import { Owner, PenaltyFeeInfo } from "../../interfaces/interfaces";
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
  const [penaltyFees, setPenaltyFees] = useState<PenaltyFeeInfo[]>([]);
  const [displayErrorAlert, setDisplayErrorAlert] = useState(false);

  useEffect(() => {
    const getPenaltyData = async () => {
      await fetchAllOwners()
        .then((response) => {
          const fees = response.data
            .filter((owner: Owner) => owner.active)
            .map((owner: Owner) => {
              return { name: owner.name, penaltyFee: owner.penaltyFee };
            });
          setPenaltyFees(fees);
        })
        .catch(() => {
          setDisplayErrorAlert(true);
        });
    };

    getPenaltyData();
  }, []);

  const followingYear = Number(getUpcomingSeasonYear()) + 1;
  const totalInPot = calculateTotalInPot(penaltyFees);
  const payoutPerOwner = calculateLuxaryPotPayout(penaltyFees);
  const followingYearCap = calculateFollowingYearBaseCap(penaltyFees);

  return (
    <Container>
      <h1 className="text-center"> Draft Day Info </h1>
      {displayErrorAlert && (
        <Alert color="danger">Error fetching draft data</Alert>
      )}
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
    </Container>
  );
};

export default DraftDay;
