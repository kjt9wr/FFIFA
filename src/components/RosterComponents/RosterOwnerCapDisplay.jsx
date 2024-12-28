import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardText, CardTitle, Col, Row } from "reactstrap";
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
  const { ownerName, roster, franchisePrices, penaltyReward } = props;

  const [owner, setOwner] = useState({
    _id: "",
    name: "",
    cap: [0, 0, 0, 0, 0, 0],
  });

  const MAX_CAP = owner.cap[5];
  const TAX_LINE = calculateLuxaryTaxLine(MAX_CAP);
  const keepPrice = calculateTotalKeeperPrice(roster, franchisePrices);
  const penaltyFee = calculatePenaltyFee(roster, franchisePrices, MAX_CAP);
  const luxaryGainorLoss = penaltyFee > 0 ? penaltyFee * -1 : 0;
  const isOffender = keepPrice > TAX_LINE;
  const remaining = MAX_CAP - keepPrice + luxaryGainorLoss;

  useEffect(() => {
    console.log("fetching owner data");
    const getOwnerData = async () => {
      await axios
        .get(`http://localhost:5000/owner/${ownerName}`)
        .then((response) => {
          setOwner(response.data[0]);
        });
    };

    getOwnerData();
  }, [ownerName]);

  useEffect(() => {
    const updatePenalty = async () => {
      if (owner.name) {
        await axios
          .put(`http://localhost:5000/owner/updatePenaltyFee/${owner.name}`, {
            penaltyFee: penaltyFee,
          })
          .catch((e) => console.error(e));
      }
    };

    updatePenalty();
  }, [owner.name, penaltyFee]);

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
