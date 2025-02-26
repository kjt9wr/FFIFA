import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import apiClient from "../../api/apiClient";
import * as constants from "../../utilities/constants";
import { TRADES_FROM_DB } from "../__mockdata__/component.mockdata";
import TradeTracker from "./TradeTracker";

describe("trade tracker page", () => {
  beforeAll(() => {
    jest.spyOn(constants, "getUpcomingSeasonYear").mockReturnValue("2025");
    jest.spyOn(apiClient, "get").mockResolvedValue({ data: TRADES_FROM_DB });
  });
  it("renders successfully", async () => {
    render(<TradeTracker />);
    expect(await screen.findByText("Trade Tracker")).toBeTruthy();
  });
  it("changes year successfully", async () => {
    render(<TradeTracker />);

    userEvent.click(await screen.findByText("2023"));

    expect(await screen.findByText("Brandon Aiyuk")).toBeTruthy();
  });

  it("displays error alert when fetch fails", async () => {
    jest.spyOn(apiClient, "get").mockRejectedValue(new Error("not found"));
    render(<TradeTracker />);

    expect(await screen.findByText("Error fetching trade data")).toBeTruthy();
  });
});
