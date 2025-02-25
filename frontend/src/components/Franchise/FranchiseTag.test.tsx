import { render, screen } from "@testing-library/react";
import FranchiseTag from "./FranchiseTag";
import apiClient from "../../api/apiClient";
import * as FranchiseService from "../../services/franchise.service";
import {
  FRANCHISE_TAG_SAMPLE_DATA,
  KEPT_PLAYERS,
} from "../../services/mock-data/services.mock-data";

describe("franchise tag page", () => {
  it("renders successfully", async () => {
    jest.spyOn(apiClient, "get").mockResolvedValue({ data: KEPT_PLAYERS });
    jest
      .spyOn(FranchiseService, "getFranchiseTagDTO")
      .mockResolvedValue(FRANCHISE_TAG_SAMPLE_DATA);
    const view = render(<FranchiseTag />);

    expect(await screen.findByText("RB franchise price: $75")).toBeTruthy();
    expect(view).toMatchSnapshot();
  });
});
