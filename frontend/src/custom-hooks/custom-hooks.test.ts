import { renderHook, waitFor } from "@testing-library/react";
import apiClient from "../api/apiClient";
import * as franchiseService from "../services/franchise.service";
import {
  MOCK_DERRICK_HENRY,
  MOCK_JALEN_COKER,
  MOCK_JOSH_JACOBS,
  MOCK_PATRICK_MAHOMES,
  MOCK_SAM_LAPORTA,
  MOCK_TYREEK_HILL,
} from "../services/mock-data/player.mock-data";
import {
  FRANCHISE_TAG_SAMPLE_DATA,
  MOCK_FREE_AGENTS,
} from "../services/mock-data/services.mock-data";

const faList = [
  MOCK_PATRICK_MAHOMES,
  MOCK_JOSH_JACOBS,
  MOCK_DERRICK_HENRY,
  MOCK_JALEN_COKER,
  MOCK_TYREEK_HILL,
  MOCK_SAM_LAPORTA,
];
describe("custom hooks", () => {
  // it("fetches free agency with useFreeAgents", async () => {
  //   jest.spyOn(apiClient, "get").mockResolvedValue({ data: faList });
  //   const { result } = renderHook(() => useFreeAgents());
  //   await waitFor(() => {
  //     expect(result.current).toEqual(MOCK_FREE_AGENTS);
  //   });
  // });
  // it("fetches franchise info from useFranchiseInfo", async () => {
  //   jest
  //     .spyOn(franchiseService, "getFranchiseTagDTO")
  //     .mockResolvedValue(FRANCHISE_TAG_SAMPLE_DATA);
  //   const { result } = renderHook(() => useFranchiseInfo());
  //   await waitFor(() => {
  //     expect(result.current).toEqual(FRANCHISE_TAG_SAMPLE_DATA);
  //   });
  // });
});
