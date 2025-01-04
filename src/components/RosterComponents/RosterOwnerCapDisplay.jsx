import React, { useEffect } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { Card, CardBody, CardText, CardTitle, Col, Row } from "reactstrap";
import { updatePenaltyFee } from "../../api/apiService";
import { determineFinalPriceOfPlayer } from "../../Services/FFIFAService";
import RosterProgressBar from "./RosterProgressBar";

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

const RosterOwnerCapDisplay = (props) => {
  const {
    ownerName,
    roster,
    franchisePrices,
    penaltyReward,
    cap,
    updateCapCallback,
    isEditable,
  } = props;

  const MAX_CAP = cap;
  const TAX_LINE = calculateLuxaryTaxLine(MAX_CAP);
  const keepPrice = calculateTotalKeeperPrice(roster, franchisePrices);
  const penaltyFee = calculatePenaltyFee(roster, franchisePrices, MAX_CAP);
  const luxaryGainorLoss = penaltyFee > 0 ? penaltyFee * -1 : 0;
  const isOffender = keepPrice > TAX_LINE;
  const remaining = MAX_CAP - keepPrice + luxaryGainorLoss;

  useEffect(() => {
    const updatePenalty = async () => {
      await updatePenaltyFee(ownerName, penaltyFee);
    };

    updatePenalty();
  }, [ownerName, penaltyFee]);

  const getCardColor = () => {
    if (remaining < 0) {
      return "danger";
    }
    return isOffender ? "warning" : "success";
  };

  return (
    <div>
      <h1 className="text-center">{ownerName}'s Roster </h1>
      <br />
      <Row>
        <Col>
          {isEditable ? (
            <Card>
              <CardBody>
                <CardTitle tag="h3">Max Cap</CardTitle>
                <CardText tag="h4">
                  <FaMinusCircle
                    onClick={() => updateCapCallback(MAX_CAP - 1)}
                  />{" "}
                  ${MAX_CAP}{" "}
                  <FaPlusCircle
                    onClick={() => updateCapCallback(MAX_CAP + 1)}
                  />
                </CardText>
              </CardBody>
            </Card>
          ) : (
            renderCard("Max Cap", MAX_CAP)
          )}
        </Col>
        <Col>{renderCard("Luxary Tax Line", TAX_LINE)}</Col>
        <Col>{renderCard("Keeper Price", keepPrice)}</Col>
        <Col>
          <Card color={getCardColor()}>
            <CardBody>
              <CardTitle tag="h3">Remaining</CardTitle>
              <CardText tag="h4">
                ${remaining}{" "}
                {!isOffender && (
                  <span>
                    + ${penaltyReward} = ${remaining + penaltyReward}
                  </span>
                )}
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br />
      <RosterProgressBar
        keepPrice={keepPrice}
        isOffender={isOffender}
        TAX_LINE={TAX_LINE}
        MAX_CAP={MAX_CAP}
      />
      <br />
    </div>
  );
};

export default RosterOwnerCapDisplay;
