import { MOCKED_ROSTER } from "../mock-data/player.mock-data";
import { MOCK_FRANCHISE_TAG_DTO } from "../mock-data/services.mock-data";
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
      MOCK_FRANCHISE_TAG_DTO
    );

    expect(price).toEqual(143);
  });

  it("calculates 0 for penalty fee of a nonoffender", () => {
    const penaltyFee = calculatePenaltyFee(
      MOCKED_ROSTER,
      MOCK_FRANCHISE_TAG_DTO,
      400
    );

    expect(penaltyFee).toEqual(0);
  });

  it("calculates penalty fee for offender", () => {
    const penaltyFee = calculatePenaltyFee(
      MOCKED_ROSTER,
      MOCK_FRANCHISE_TAG_DTO,
      200
    );

    expect(penaltyFee).toEqual(33);
  });
});
