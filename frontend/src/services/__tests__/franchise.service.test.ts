import apiClient from "../../api/apiClient";
import { Player } from "../../interfaces/interfaces";
import * as FFIFAService from "../ffifa.service";
import {
  formatFranchisePrices,
  getFranchiseTagDTO,
} from "../franchise.service";
import {
  FRANCHISE_TAG_SAMPLE_DATA,
  KEPT_PLAYERS,
} from "../mock-data/services.mock-data";

const EXPECTED_QB_FRANCHISE_PRICE = 43;
const EXPECTED_RB_FRANCHISE_PRICE = 95;
const EXPECTED_WR_FRANCHISE_PRICE = 57;
const EXPECTED_TE_FRANCHISE_PRICE = 24;
const EXPECTED_FORMATTED_PRICES = {
  qb: 25,
  rb: 75,
  wr: 50,
  te: 30,
};
describe("franchise service", () => {
  beforeAll(() => {
    jest.spyOn(apiClient, "get").mockResolvedValue({ data: KEPT_PLAYERS });
  });

  it("creates franchise tag dto", async () => {
    jest
      .spyOn(FFIFAService, "pickSuperMaxOrKeeperPrice")
      .mockImplementation((player: Player) => {
        return 3 === player.keeperClass ? 72 : player.price;
      });
    const results = await getFranchiseTagDTO();
    expect(results.qbFranchisePrice).toEqual(EXPECTED_QB_FRANCHISE_PRICE);
    expect(results.rbFranchisePrice).toEqual(EXPECTED_RB_FRANCHISE_PRICE);
    expect(results.teFranchisePrice).toEqual(EXPECTED_TE_FRANCHISE_PRICE);
    expect(results.wrFranchisePrice).toEqual(EXPECTED_WR_FRANCHISE_PRICE);
  });

  it("formats franchise prices", () => {
    const result = formatFranchisePrices(FRANCHISE_TAG_SAMPLE_DATA);
    expect(EXPECTED_FORMATTED_PRICES).toEqual(result);
  });
});
