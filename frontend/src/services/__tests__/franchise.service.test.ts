import { getFranchiseTagDTO } from "../franchise.service";
import { KEPT_PLAYERS } from "../mock-data/services.mock-data";
import apiClient from "../../api/apiClient";

describe("franchise service", () => {
  beforeAll(() => {
    jest.spyOn(apiClient, "get").mockResolvedValue({ data: KEPT_PLAYERS });
  });
  it("creates franchise tag dto", async () => {
    const results = await getFranchiseTagDTO();
    expect(results.qbFranchisePrice).toEqual(3);
    expect(results.rbFranchisePrice).toEqual(19);
    expect(results.teFranchisePrice).toEqual(12);
    expect(results.wrFranchisePrice).toEqual(8);
  });
});
