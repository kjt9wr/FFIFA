import { render, screen } from "@testing-library/react";
import apiClient from "../../api/apiClient";
import { KEPT_PLAYERS } from "../../services/mock-data/services.mock-data";
import Arbitration from "./Arbitration";
import * as constants from "../../utilities/constants";
import userEvent from "@testing-library/user-event";

const ERROR_BANNER_TEXT = "Error fetching arbitration data";
describe("arbitration page", () => {
  beforeAll(() => {
    jest.spyOn(constants, "getUpcomingSeasonYear").mockReturnValue("2025");
    jest.spyOn(apiClient, "get").mockResolvedValue({ data: [...KEPT_PLAYERS] });
  });
  it("renders successfully", async () => {
    render(<Arbitration />);

    expect(await screen.findByText("Jamarr Chase")).toBeTruthy();
    expect(screen.queryByText("Derrick Henry")).toBeFalsy();
  });

  it("renders next year successfully", async () => {
    render(<Arbitration />);

    userEvent.click(screen.getByText("2026"));

    expect(screen.queryByText("Jamarr Chase")).toBeFalsy();
    expect(await screen.findByText("Derrick Henry")).toBeTruthy();
  });

  it("displays error on render failure", async () => {
    jest.spyOn(console, "error").mockImplementation();
    jest.spyOn(apiClient, "get").mockRejectedValue(new Error("500 error"));

    render(<Arbitration />);

    expect(await screen.findByText(ERROR_BANNER_TEXT)).toBeTruthy();
  });
});
