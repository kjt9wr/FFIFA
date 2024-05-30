import axios from "axios";
import React, { useEffect, useState } from "react";
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

const renderCard = (label, value) => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h3">{label}</CardTitle>
        <CardText tag="h4">${value}</CardText>
      </CardBody>
    </Card>
  );
};

const OwnerCapDisplay = (props) => {
  const { owner, roster, franchisePrices, penaltyReward } = props;
  const [currentOwnerPenalty, setCurrentOwnerPenalty] = useState();

  const MAX_CAP = owner.cap[4];
  const TAX_LINE = calculateLuxaryTaxLine(MAX_CAP);
  const keepPrice = calculateTotalKeeperPrice(roster, franchisePrices);
  const penaltyFee = calculatePenaltyFee(roster, franchisePrices, MAX_CAP);
  const luxaryGainorLoss = penaltyFee > 0 ? penaltyFee * -1 : 0;
  const isOffender = keepPrice > TAX_LINE;
  const remaining = MAX_CAP - keepPrice + luxaryGainorLoss;

  useEffect(() => {
    setCurrentOwnerPenalty(penaltyFee);
  }, [penaltyFee]);

  useEffect(() => {
    const updatePenalty = async () => {
      if (owner.name) {
        await axios
          .put(`http://localhost:5000/owner/updatePenaltyFee/${owner.name}`, {
            penaltyFee: currentOwnerPenalty,
          })
          .catch((e) => console.error(e));
      }
    };

    updatePenalty();
  }, [currentOwnerPenalty, owner.name]);

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
        <Col>{renderCard("Max Cap", MAX_CAP)}</Col>
        <Col>{renderCard("Luxary Tax Line", TAX_LINE)}</Col>
        <Col>{renderCard("Keeper Price", keepPrice)}</Col>
        <Col>
          <Card color={getCardColor()}>
            <CardBody>
              <CardTitle tag="h3">Remaining</CardTitle>
              <CardText tag="h4">
                ${remaining} {!isOffender && <span>+ ${penaltyReward}</span>}
              </CardText>
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

export default OwnerCapDisplay;
