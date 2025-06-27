import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { FranchiseTagDTO, Player } from "../../interfaces/interfaces";
import {
  calculateLuxaryTaxLine,
  calculatePenaltyFee,
  calculateTotalKeeperPrice,
} from "../../services/roster.service";
import RosterProgressBar from "./RosterProgressBar";

const renderCard = (label: string, value: number) => {
  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle tag="h5" className="text-center">
          {label}
        </CardTitle>
        <CardText tag="h6" className="cap-card-value">
          ${value}
        </CardText>
      </CardBody>
    </Card>
  );
};

interface RosterCapInfoProps {
  roster: Player[];
  franchisePrices: FranchiseTagDTO;
  penaltyReward: number;
  cap: number;
  isEditable: boolean;
  updateCapCallback?: (cap: number) => void;
}

/*
 * This component includes an editable display of an owner's total cap, luxary tax line,
 * keeper price, and final cap values
 */

const RosterCapInfo = (props: RosterCapInfoProps) => {
  const {
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

  const getCardColor = () => {
    if (remaining < 0) {
      return "card-penalty";
    }
    return isOffender ? "card-warning" : "card-success";
  };

  return (
    <div>
      <h4 className="section-title mb-2">Cap Info:</h4>
      <Row xs="2" md="4" className="row-gap-4">
        <Col>
          {isEditable && updateCapCallback ? (
            <Card className="h-100">
              <CardBody>
                <CardTitle tag="h5" className="text-center">
                  Max Cap
                </CardTitle>
                <CardText tag="h6" className="cap-card-value">
                  <div className="max-cap-controls">
                    <Button
                      onClick={() => updateCapCallback(MAX_CAP - 1)}
                      title="Subtract Cap"
                      size="sm"
                      outline
                      color="primary"
                      className="max-cap-btn"
                      aria-label="Decrease cap"
                    >
                      –
                    </Button>
                    <span className="max-cap-value">${MAX_CAP}</span>
                    <Button
                      onClick={() => updateCapCallback(MAX_CAP + 1)}
                      title="Add Cap"
                      size="sm"
                      outline
                      color="primary"
                      className="max-cap-btn"
                      aria-label="Increase cap"
                    >
                      +
                    </Button>
                  </div>
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
          <Card className={`h-100 ${getCardColor()}`}>
            <CardBody>
              <CardTitle tag="h5" className="text-center">
                Remaining
              </CardTitle>
              <CardText tag="h6" className="cap-card-value">
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
        taxLine={TAX_LINE}
        maxCap={MAX_CAP}
      />
      <br />
    </div>
  );
};

export default RosterCapInfo;
