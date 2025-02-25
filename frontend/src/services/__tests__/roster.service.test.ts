import { MOCKED_ROSTER } from "../mock-data/player.mock-data";
import { FRANCHISE_TAG_SAMPLE_DATA } from "../mock-data/services.mock-data";
import {
  calculateLuxaryTaxLine,
  calculatePenaltyFee,
  calculateTotalKeeperPrice,
} from "../roster.service";

describe("roster service", () => {
  it("calculates luxary tax line", () => {
    const line = calculateLuxaryTaxLine(200);
    expect(110).toEqual(line);
  });

  it("calculates total keeper price from roster", () => {
    const price = calculateTotalKeeperPrice(
      MOCKED_ROSTER,
      FRANCHISE_TAG_SAMPLE_DATA
    );

    expect(price).toEqual(143);
  });

  it("calculates 0 for penalty fee of a nonoffender", () => {
    const penaltyFee = calculatePenaltyFee(
      MOCKED_ROSTER,
      FRANCHISE_TAG_SAMPLE_DATA,
      400
    );

    expect(penaltyFee).toEqual(0);
  });

  it("calculates penalty fee for offender", () => {
    const penaltyFee = calculatePenaltyFee(
      MOCKED_ROSTER,
      FRANCHISE_TAG_SAMPLE_DATA,
      200
    );

    expect(penaltyFee).toEqual(33);
  });
});
