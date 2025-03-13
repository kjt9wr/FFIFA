import { renderHook, waitFor } from "@testing-library/react";
import { fetchFreeAgents } from "../api/api.service";
import apiClient from "../api/apiClient";
import { OWNERS_FROM_DB } from "../components/__mockdata__/component.mockdata";
import * as ffifaService from "../services/ffifa.service";
import * as franchiseService from "../services/franchise.service";
import {
  MOCK_DERRICK_HENRY,
  MOCK_JALEN_COKER,
  MOCK_JOSH_JACOBS,
  MOCK_PATRICK_MAHOMES,
  MOCK_SAM_LAPORTA,
  MOCK_TYREEK_HILL,
} from "../services/mock-data/player.mock-data";
import { useFetch, useFranchisePrices, usePenaltyFees } from "./custom-hooks";

const faList = [
  MOCK_PATRICK_MAHOMES,
  MOCK_JOSH_JACOBS,
  MOCK_DERRICK_HENRY,
  MOCK_JALEN_COKER,
  MOCK_TYREEK_HILL,
  MOCK_SAM_LAPORTA,
];
describe("custom hooks", () => {
  it("fetches with useFetch", async () => {
    jest.spyOn(apiClient, "get").mockResolvedValue({ data: faList });
    const { result } = renderHook(() => useFetch(fetchFreeAgents));
    await waitFor(() => {
      expect(result.current.data).toEqual(faList);
    });
  });
  it("returns error with useFetch", async () => {
    jest.spyOn(apiClient, "get").mockRejectedValue(new Error("500 error"));
    jest.spyOn(console, "error").mockImplementation();
    const { result } = renderHook(() => useFetch(fetchFreeAgents));
    await waitFor(() => {
      expect(result.current.error).not.toBeNull();
    });
  });

  it("fetches franchise info from useFranchiseInfo", async () => {
    jest.spyOn(apiClient, "get").mockResolvedValue({ data: faList });
    jest.spyOn(franchiseService, "calculateFranchisePrice").mockReturnValue(50);
    const { result } = renderHook(() => useFranchisePrices());
    await waitFor(() => {
      expect(result.current.rbPrice).toEqual(50);
    });
  });

  it("returns error from useFranchiseInfo", async () => {
    jest.spyOn(apiClient, "get").mockRejectedValue(new Error("500 error"));
    jest.spyOn(console, "error").mockImplementation();
    jest.spyOn(franchiseService, "calculateFranchisePrice").mockReturnValue(50);
    const { result } = renderHook(() => useFranchisePrices());
    await waitFor(() => {
      expect(result.current.error).not.toBeNull();
    });
  });

  it("fetches penalty info from usePenaltyInfo", async () => {
    jest.spyOn(apiClient, "get").mockResolvedValue({ data: OWNERS_FROM_DB });
    jest.spyOn(ffifaService, "calculateTotalInPot").mockReturnValue(50);
    jest.spyOn(ffifaService, "calculateLuxaryPotPayout").mockReturnValue(10);
    const { result } = renderHook(() => usePenaltyFees());

    await waitFor(() => {
      expect(result.current.totalInPot).toEqual(50);
    });

    expect(result.current.payoutPerOwner).toEqual(10);
    expect(result.current.penaltyFees).not.toBeNull();
  });

  it("returns error from usePenaltyFees", async () => {
    jest.spyOn(apiClient, "get").mockRejectedValue(new Error("500 error"));
    jest.spyOn(console, "error").mockImplementation();
    jest.spyOn(ffifaService, "calculateTotalInPot").mockReturnValue(50);
    jest.spyOn(ffifaService, "calculateLuxaryPotPayout").mockReturnValue(10);
    const { result } = renderHook(() => usePenaltyFees());
    await waitFor(() => {
      expect(result.current.error).not.toBeNull();
    });
  });
});
