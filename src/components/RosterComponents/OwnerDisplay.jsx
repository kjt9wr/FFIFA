import React from "react";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Progress,
  Row,
} from "reactstrap";
import { determineFinalPriceOfPlayer } from "../../Services/FFIFAService";

const calculateLuxaryTaxLine = (cap) => Math.trunc(cap * 0.55);

const calculatePenaltyFee = (roster, franchisePrices, maxCap) => {
  const penaltyFee =
    calculateTotalKeeperPrice(roster, franchisePrices) -
    calculateLuxaryTaxLine(maxCap);
  return penaltyFee > 0 ? penaltyFee : 0;
};

const calculateTotalKeeperPrice = (roster, franchisePrices) => {
  return roster
    .filter((keptPlayer) => keptPlayer.keep)
    .reduce(
      (acc, player) =>
        acc + determineFinalPriceOfPlayer(player, franchisePrices),
      0
    );
};

const OwnerDisplay = (props) => {
  const { owner, roster, franchisePrices } = props;
  const MAX_CAP = owner.cap[4];
  const TAX_LINE = calculateLuxaryTaxLine(MAX_CAP);
  const keepPrice = calculateTotalKeeperPrice(roster, franchisePrices);
  const penaltyFee = calculatePenaltyFee(roster, franchisePrices, MAX_CAP);
  const luxaryGainorLoss = penaltyFee > 0 ? penaltyFee * -1 : 0;
  const isOffender = keepPrice > TAX_LINE;
  const remaining = MAX_CAP - keepPrice + luxaryGainorLoss;

  const getCardColor = () => {
    if (remaining < 0) {
      return "danger";
    }
    return isOffender ? "warning" : "success";
  };

  return (
    <div>
      <h1 className="text-center">{owner.name}'s Roster </h1>
      <br />
      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h3">Max Cap</CardTitle>
              <CardText tag="h4">${MAX_CAP}</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h3">Luxary Tax Line</CardTitle>
              <CardText tag="h4">${TAX_LINE}</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              <CardTitle tag="h3">Keeper Price</CardTitle>
              <CardText tag="h4">${keepPrice}</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card color={getCardColor()}>
            <CardBody>
              <CardTitle tag="h3">Remaining</CardTitle>
              <CardText tag="h4">${remaining}</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
      <Progress
        multi
        style={{
          height: "60px",
        }}
      >
        <Progress
          bar
          color="success"
          value={isOffender ? 55 : (keepPrice / MAX_CAP) * 100}
        >
          Under the Tax
        </Progress>
        <Progress
          bar
          color="warning"
          value={isOffender ? ((keepPrice - TAX_LINE) / MAX_CAP) * 100 : 0}
        >
          $ Over
        </Progress>
        <Progress
          bar
          color="danger"
          value={isOffender ? ((keepPrice - TAX_LINE) / MAX_CAP) * 100 : 0}
        >
          $ Penalty
        </Progress>
      </Progress>
      <br />
    </div>
  );
};

export default OwnerDisplay;
