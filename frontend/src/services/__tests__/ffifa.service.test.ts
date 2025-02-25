import { POSITION } from "../../utilities/enumerations";
import {
  calculateLuxaryPotPayout,
  determineFinalPriceOfPlayer,
  increaseKeeperPrice,
  pickSuperMaxOrKeeperPrice,
} from "../ffifa.service";
import {
  ARBITRATED_TE,
  MAXED_PLAYER,
  MOCK_DERRICK_HENRY,
  MOCK_JAHMYR_GIBBS,
  MOCK_JAYDEN_DANIELS,
} from "../mock-data/player.mock-data";
import {
  FRANCHISE_TAG_SAMPLE_DATA,
  MOCKED_PENALTY_FEES,
} from "../mock-data/services.mock-data";
import * as supermaxService from "../supermax.service";

describe("FFifa service", () => {
  it("increases keeper price with min of 10", () => {
    const price = increaseKeeperPrice(5);
    expect(price).toEqual(10);
  });

  it("increases keeper price by 20%", () => {
    const price = increaseKeeperPrice(31);
    expect(price).toEqual(37);
  });

  it("selects supermax price correctly", () => {
    const price = pickSuperMaxOrKeeperPrice(MAXED_PLAYER);
    expect(price).not.toEqual(MAXED_PLAYER.price);
  });

  it("does not pick supermax price for regualar RB", () => {
    const price = pickSuperMaxOrKeeperPrice(MOCK_DERRICK_HENRY);
    expect(price).toEqual(MOCK_DERRICK_HENRY.price);
  });

  it("determines final price for franchised QB", () => {
    const price = determineFinalPriceOfPlayer(
      MOCK_JAYDEN_DANIELS,
      FRANCHISE_TAG_SAMPLE_DATA
    );

    expect(price).toEqual(FRANCHISE_TAG_SAMPLE_DATA.qbFranchisePrice);
  });

  it("determines final price for franchised RB", () => {
    const price = determineFinalPriceOfPlayer(
      MOCK_JAHMYR_GIBBS,
      FRANCHISE_TAG_SAMPLE_DATA
    );

    expect(price).toEqual(FRANCHISE_TAG_SAMPLE_DATA.rbFranchisePrice);
  });

  it("determines final price for franchised WR", () => {
    const price = determineFinalPriceOfPlayer(
      { ...MOCK_JAYDEN_DANIELS, position: POSITION.WR },
      FRANCHISE_TAG_SAMPLE_DATA
    );

    expect(price).toEqual(FRANCHISE_TAG_SAMPLE_DATA.wrFranchisePrice);
  });

  it("determines final price for arbitration", () => {
    const price = determineFinalPriceOfPlayer(
      ARBITRATED_TE,
      FRANCHISE_TAG_SAMPLE_DATA
    );

    expect(price).toEqual(FRANCHISE_TAG_SAMPLE_DATA.teFranchisePrice);
  });

  it("determine final price for Supermax player", () => {
    jest.spyOn(supermaxService, "calculateSuperMaxPrice").mockReturnValue(85);

    const price = determineFinalPriceOfPlayer(
      MAXED_PLAYER,
      FRANCHISE_TAG_SAMPLE_DATA
    );

    expect(price).toEqual(85);
  });

  it("returns negative for final price for Supermax player without supermax field", () => {
    const price = determineFinalPriceOfPlayer(
      { ...MAXED_PLAYER, superMax: undefined },
      FRANCHISE_TAG_SAMPLE_DATA
    );
    expect(price).toEqual(-99);
  });

  it("determine final price for keeper", () => {
    const price = determineFinalPriceOfPlayer(
      MOCK_DERRICK_HENRY,
      FRANCHISE_TAG_SAMPLE_DATA
    );

    expect(price).toEqual(MOCK_DERRICK_HENRY.price);
  });

  it("calculates luxary pot payout", () => {
    const payout = calculateLuxaryPotPayout(MOCKED_PENALTY_FEES);

    expect(payout).toEqual(50);
  });
});
