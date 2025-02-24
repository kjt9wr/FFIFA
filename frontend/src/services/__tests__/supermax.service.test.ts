import { BASE_CAP, UPCOMING_SEASON_YEAR } from "../../utilities/constants";
import { START_YEAR } from "../mock-data/services.mock-data";
import {
  calculateSuperMaxPrice,
  getCurrentSuperMaxYear,
} from "../supermax.service";

const THREE_YEAR_PERCENT = 0.2375;
const FOUR_YEAR_PERCENT = 0.2256;
const FIVE_YEAR_PERCENT = 0.2138;

describe("Supermax service tests", () => {
  it("calculates current super max year correctly", () => {
    const currentYear = getCurrentSuperMaxYear(START_YEAR);

    expect(currentYear).toEqual(2);
  });

  it("calculates 3 year price correctly", () => {
    const expectedPrice = Math.trunc(
      BASE_CAP[UPCOMING_SEASON_YEAR] * THREE_YEAR_PERCENT
    );

    const price = calculateSuperMaxPrice(3, START_YEAR);

    expect(price).toEqual(expectedPrice);
  });

  it("calculates 4 year price correctly", () => {
    const expectedPrice = Math.trunc(
      BASE_CAP[UPCOMING_SEASON_YEAR] * FOUR_YEAR_PERCENT
    );

    const price = calculateSuperMaxPrice(4, START_YEAR);

    expect(price).toEqual(expectedPrice);
  });

  it("calculates 5 year price correctly", () => {
    const expectedPrice = Math.trunc(
      BASE_CAP[UPCOMING_SEASON_YEAR] * FIVE_YEAR_PERCENT
    );

    const price = calculateSuperMaxPrice(5, START_YEAR);

    expect(price).toEqual(expectedPrice);
  });

  it("invalid year amount returns 0", () => {
    expect(calculateSuperMaxPrice(1, START_YEAR)).toEqual(0);
  });
});
