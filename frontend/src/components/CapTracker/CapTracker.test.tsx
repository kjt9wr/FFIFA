import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import apiClient from "../../api/apiClient";
import * as constants from "../../utilities/constants";
import {
  OWNERS_FROM_DB,
  TRADES_FROM_DB,
} from "../__mockdata__/component.mockdata";
import CapTracker from "./CapTracker";

describe("cap tracker page", () => {
  beforeAll(() => {
    jest.spyOn(constants, "getUpcomingSeasonYear").mockReturnValue("2025");
    jest.spyOn(apiClient, "get").mockImplementation((path: string) => {
      switch (path) {
        case "/trade":
          return Promise.resolve({ data: TRADES_FROM_DB });
        case "/owner":
          return Promise.resolve({ data: OWNERS_FROM_DB });
        default:
          return Promise.reject(new Error("not found"));
      }
    });
  });
  it("renders successfully", async () => {
    render(<CapTracker />);

    expect(await screen.findByText("Cap Tracker")).toBeTruthy();
  });

  it("changes year successfully", async () => {
    render(<CapTracker />);
    expect(await screen.findByText("Cap Tracker")).toBeTruthy();

    userEvent.click(await screen.findByText("2023"));

    expect(await screen.findByText("13")).toBeTruthy();
  });

  it("displays error alert when fetch fails", async () => {
    jest.spyOn(apiClient, "get").mockImplementation((path: string) => {
      switch (path) {
        case "/trade":
          return Promise.reject(new Error("not found"));
        case "/owner":
          return Promise.reject(new Error("not found"));
        default:
          return Promise.reject(new Error("not found"));
      }
    });
    render(<CapTracker />);

    expect(await screen.findByText("Error fetching cap data")).toBeTruthy();
  });
});
