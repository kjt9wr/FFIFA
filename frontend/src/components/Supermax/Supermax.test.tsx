import { render, screen } from "@testing-library/react";
import apiClient from "../../api/apiClient";
import { MOCK_NAJEE_HARRIS } from "../../services/mock-data/player.mock-data";
import Supermax from "./Supermax";
import * as SuperMaxService from "../../services/supermax.service";

const ERROR_BANNER_TEXT = "Error fetching supermax data";
describe("supermax page", () => {
  beforeAll(() => {
    jest.spyOn(SuperMaxService, "calculateSuperMaxPrice").mockReturnValue(80);
    jest.spyOn(SuperMaxService, "getCurrentSuperMaxYear").mockReturnValue(4);
  });
  it("renders successfully", async () => {
    jest
      .spyOn(apiClient, "get")
      .mockResolvedValue({ data: [MOCK_NAJEE_HARRIS] });

    const view = render(<Supermax />);

    expect(await screen.findByText("Najee Harris")).toBeTruthy();
    expect(view).toMatchSnapshot();
  });

  it("displays error on render failure", async () => {
    jest.spyOn(console, "error").mockImplementation();
    jest.spyOn(apiClient, "get").mockRejectedValue(new Error("500 error"));

    render(<Supermax />);

    expect(await screen.findByText(ERROR_BANNER_TEXT)).toBeTruthy();
  });
});
