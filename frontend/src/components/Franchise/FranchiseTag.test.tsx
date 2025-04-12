import { render, screen } from "@testing-library/react";
import apiClient from "../../api/apiClient";
import * as franchiseService from "../../services/franchise.service";
import { KEPT_PLAYERS } from "../../services/mock-data/services.mock-data";
import FranchiseTag from "./FranchiseTag";

describe("franchise tag page", () => {
  it("renders successfully", async () => {
    jest.spyOn(apiClient, "get").mockResolvedValue({ data: KEPT_PLAYERS });
    jest.spyOn(franchiseService, "calculateFranchisePrice").mockReturnValue(75);

    const view = render(<FranchiseTag />);

    expect(await screen.findByText("RB price: $75")).toBeTruthy();
    expect(view).toMatchSnapshot();
  });

  it("displays error", async () => {
    jest.spyOn(apiClient, "get").mockRejectedValue(new Error("500 error"));
    jest.spyOn(franchiseService, "calculateFranchisePrice").mockReturnValue(75);

    render(<FranchiseTag />);

    expect(await screen.findByText("Error fetching players")).toBeTruthy();
  });
});
