import { render, screen } from "@testing-library/react";
import * as customHooks from "../../custom-hooks/custom-hooks";
import { FRANCHISE_TAG_SAMPLE_DATA } from "../../services/mock-data/services.mock-data";
import FranchiseTag from "./FranchiseTag";

describe("franchise tag page", () => {
  it("renders successfully", async () => {
    jest
      .spyOn(customHooks, "useFranchiseInfo")
      .mockReturnValue(FRANCHISE_TAG_SAMPLE_DATA);

    const view = render(<FranchiseTag />);

    expect(await screen.findByText("RB franchise price: $75")).toBeTruthy();
    expect(view).toMatchSnapshot();
  });
});
