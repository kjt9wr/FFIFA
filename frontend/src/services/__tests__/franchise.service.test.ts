import apiClient from "../../api/apiClient";
import { POSITION } from "../../utilities/enumerations";
import {
  calculateFranchisePrice,
  get10MostExpensivePerPosition,
} from "../franchise.service";
import {
  KEPT_PLAYERS,
  MOCK_WRS_ORDERED_BY_PRICE,
} from "../mock-data/services.mock-data";

describe("franchise service", () => {
  beforeAll(() => {
    jest.spyOn(apiClient, "get").mockResolvedValue({ data: KEPT_PLAYERS });
  });

  it("gets ten most expensive players per position", () => {
    const wrList = get10MostExpensivePerPosition(KEPT_PLAYERS, POSITION.WR);
    expect(wrList).toEqual(MOCK_WRS_ORDERED_BY_PRICE);
  });

  it("calculates franchise price", () => {
    const wrPrice = calculateFranchisePrice(MOCK_WRS_ORDERED_BY_PRICE);

    expect(wrPrice).toEqual(57);
  });
});
