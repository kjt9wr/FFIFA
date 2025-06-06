import { Card, Col, Row } from "reactstrap";
import { TradeInfo } from "../../interfaces/interfaces";
import { playersBySleeperID } from "../../utilities/sleeper-ids";

const displayPlayers = (playerIds: string[]) => {
  return playerIds.map((currentPlayerID) => {
    return (
      <div key={currentPlayerID}>{playersBySleeperID[currentPlayerID]}</div>
    );
  });
};

const displayCap = (capObject: Record<string, number>) => {
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

const displayAdditionalNotes = (notes?: string) => {
  return (
    notes && (
      <div>
        <h6 className="fw-bold">Additional Notes: </h6> <p>{notes}</p>
      </div>
    )
  );
};

interface TradeCardProps {
  currentTrade: TradeInfo;
}

/*
 * This component creates a card containing the passed trade information
 */
const TradeCard = (props: TradeCardProps) => {
  const { currentTrade } = props;

  return (
    <Card className="trade-card">
      <Row>
        <Col>
          <h6 className="fw-bold">{currentTrade.owner1} Receives: </h6>
          {displayPlayers(currentTrade.owner1_rec.players)}
          {displayCap(currentTrade.owner1_rec.cap)}
        </Col>
        <Col>
          <h6 className="fw-bold">{currentTrade.owner2} Receives: </h6>
          {displayPlayers(currentTrade.owner2_rec.players)}
          {displayCap(currentTrade.owner2_rec.cap)}
        </Col>
        <Col>{displayAdditionalNotes(currentTrade?.trade_notes)}</Col>
      </Row>
    </Card>
  );
};

export default TradeCard;
