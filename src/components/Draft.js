import React, { useEffect, useState } from "react";
import { Alert, Card, Col, Container, Row } from "reactstrap";
import { calculateLuxaryPotPayout } from "../services/ffifa.service";
import { fetchAllOwners } from "../api/api.service";

const displayOwnersUnderTax = (ownerData) => {
  return ownerData
    .filter((owner) => owner.penaltyFee === 0)
    .map((currentOwner) => {
      return <div key={currentOwner.name}>{currentOwner.name}</div>;
    });
};

const displayOwnersInTax = (ownerData) => {
  return ownerData
    .filter((owner) => owner.penaltyFee > 0)
    .map((currentOwner) => {
      return (
        <div key={currentOwner.name}>
          {currentOwner.name} ${currentOwner.penaltyFee}
        </div>
      );
    });
};

const Draft = () => {
  const [penaltyFees, setPenaltyFees] = useState([]);
  const [displayErrorAlert, setDisplayErrorAlert] = useState(false);

  useEffect(() => {
    const getPenaltyData = async () => {
      await fetchAllOwners()
        .then((response) => {
          const fees = response.data.map((owner) => {
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

  const totalInPot = penaltyFees.reduce(
    (acc, owner) => acc + owner.penaltyFee,
    0
  );

  const nonOffenders = penaltyFees.filter(
    (owner) => owner.penaltyFee === 0
  ).length;

  const offenders = 12 - nonOffenders;

  const baseCap2025 =
    338 + (0.05 + 0.01 * nonOffenders - 0.01 * offenders) * 338;
  return (
    <Container>
      <h1 className="text-center"> Draft Day Info </h1>
      {displayErrorAlert && (
        <Alert color="danger">Error fetching draft data</Alert>
      )}
      <h4>2025 Base Cap: ${Math.trunc(baseCap2025)}</h4>
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
      <h4>Total Money in the Pot: ${totalInPot}</h4>
      <h4>Payout Per Owner: ${calculateLuxaryPotPayout(penaltyFees)}</h4>
    </Container>
  );
};

export default Draft;
