import * as constants from "../../utilities/constants";
import {
  calculateSuperMaxPrice,
  getCurrentSuperMaxYear,
} from "../supermax.service";

describe("Supermax service tests", () => {
  beforeAll(() => {
    jest.spyOn(constants, "getUpcomingSeasonYear").mockReturnValue("2025");
  });
  it("calculates current super max year correctly", () => {
    const currentYear = getCurrentSuperMaxYear(2023);

    expect(currentYear).toEqual(2);
  });

  it("calculates 3 year price correctly", () => {
    const expectedPrice = 89;

    const price = calculateSuperMaxPrice(3, 2023);

    expect(price).toEqual(expectedPrice);
  });

  it("calculates 4 year price correctly", () => {
    const expectedPrice = 84;

    const price = calculateSuperMaxPrice(4, 2023);

    expect(price).toEqual(expectedPrice);
  });

  it("calculates 5 year price correctly", () => {
    const expectedPrice = 80;

    const price = calculateSuperMaxPrice(5, 2023);

    expect(price).toEqual(expectedPrice);
  });

  it("invalid year amount returns 0", () => {
    expect(calculateSuperMaxPrice(1, 2023)).toEqual(0);
  });
});
