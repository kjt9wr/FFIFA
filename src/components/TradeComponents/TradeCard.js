import React from "react";
import * as Constants from "../../Utilities/Constants";
import { Card, Row, Col } from "reactstrap";

const displayPlayers = (players) => {
  return players.map((currentPlayerID) => {
    return (
      <div key={currentPlayerID}>{Constants.playersByID[currentPlayerID]}</div>
    );
  });
};

const displayCap = (capObject) => {
  if (capObject) {
    return Object.entries(capObject).map((capInYear) => {
      return (
        <div key={capInYear[0]}>
          ${capInYear[1]} in {capInYear[0]}
        </div>
      );
    });
  }
};

const displayAdditionalNotes = (notes) => {
  return (
    notes && (
      <div>
        <h5>Additional Notes: </h5> <p>{notes}</p>
      </div>
    )
  );
};

/*
 * This component creates a card containing the passed trade information
 */
const TradeCard = (props) => {
  const { currentTrade } = props;

  return (
    <Card className="p-1 my-2">
      <Row>
        <Col>
          <h5>{currentTrade.owner1} Receives: </h5>
          {displayPlayers(currentTrade.owner1_rec.players)}
          {displayCap(currentTrade.owner1_rec.cap)}
        </Col>
        <Col>
          <h5>{currentTrade.owner2} Receives: </h5>
          {displayPlayers(currentTrade.owner2_rec.players)}
          {displayCap(currentTrade.owner2_rec.cap)}
        </Col>
        <Col>{displayAdditionalNotes(currentTrade.trade_notes)}</Col>
      </Row>
    </Card>
  );
};

export default TradeCard;
