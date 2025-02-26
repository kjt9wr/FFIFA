import { render, screen, waitFor } from "@testing-library/react";
import DraftDay from "./DraftDay";
import * as constants from "../../utilities/constants";
import apiClient from "../../api/apiClient";
import { OWNERS_FROM_DB } from "../__mockdata__/component.mockdata";
import * as ffifaService from "../../services/ffifa.service";

describe("draft day page", () => {
  beforeAll(() => {
    jest.spyOn(constants, "getUpcomingSeasonYear").mockReturnValue("2025");
    jest.spyOn(ffifaService, "calculateTotalInPot").mockReturnValue(100);
    jest.spyOn(ffifaService, "calculateLuxaryPotPayout").mockReturnValue(11);
    jest
      .spyOn(ffifaService, "calculateFollowingYearBaseCap")
      .mockReturnValue(416);
  });

  it("renders successfully", async () => {
    jest.spyOn(apiClient, "get").mockResolvedValue({ data: OWNERS_FROM_DB });
    const view = render(<DraftDay />);

    await waitFor(async () => {
      expect(await screen.findByText("Draft Day Info")).toBeTruthy();
    });

    expect(view).toMatchSnapshot();
  });

  it("displays an error upon fetching failure", async () => {
    jest.spyOn(apiClient, "get").mockRejectedValue({});

    render(<DraftDay />);

    expect(await screen.findByText("Error fetching draft data")).toBeTruthy();
  });
});
