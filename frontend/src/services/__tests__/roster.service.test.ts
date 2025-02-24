import { FranchiseTagDTO, Player } from "../../interfaces/interfaces";
import {
  MOCK_AJ_BROWN,
  MOCK_CEEDEE_LAMB,
  MOCK_CHRIS_OLAVE,
  MOCK_JALEN_HURTS,
} from "../mock-data/player.mock-data";
import { FRANCHISE_TAG_SAMPLE_DATA } from "../mock-data/services.mock-data";
import {
  calculateLuxaryTaxLine,
  calculatePenaltyFee,
  calculateTotalKeeperPrice,
} from "../roster.service";

const roster = [
  MOCK_AJ_BROWN,
  MOCK_CEEDEE_LAMB,
  MOCK_JALEN_HURTS,
  MOCK_CHRIS_OLAVE,
];
describe("roster service", () => {
  it("calculates luxary tax line", () => {
    const line = calculateLuxaryTaxLine(200);
    expect(110).toEqual(line);
  });

  it("calculates total keeper price from roster", () => {
    const price = calculateTotalKeeperPrice(roster, FRANCHISE_TAG_SAMPLE_DATA);

    expect(price).toEqual(143);
  });

  it("calculates nonoffender penalty fee", () => {
    const penaltyFee = calculatePenaltyFee(
      roster,
      FRANCHISE_TAG_SAMPLE_DATA,
      400
    );

    expect(penaltyFee).toEqual(0);
  });

  it("calculates offender penalty fee", () => {
    const penaltyFee = calculatePenaltyFee(
      roster,
      FRANCHISE_TAG_SAMPLE_DATA,
      200
    );

    expect(penaltyFee).toEqual(33);
  });
});
