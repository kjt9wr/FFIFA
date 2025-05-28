import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as customHooks from "../../custom-hooks/custom-hooks";
import { MOCK_FREE_AGENTS } from "../../services/mock-data/services.mock-data";
import FreeAgency from "./FreeAgencyTracker";

describe("free agency page", () => {
  it("renders successfully", async () => {
    jest
      .spyOn(customHooks, "useFetch")
      .mockReturnValue({ data: MOCK_FREE_AGENTS });

    const view = render(<FreeAgency />);

    expect(await screen.findByText("Free Agents")).toBeTruthy();
    expect(view).toMatchSnapshot();
  });

  it("opens position card", async () => {
    jest
      .spyOn(customHooks, "useFetch")
      .mockReturnValue({ data: MOCK_FREE_AGENTS });

    render(<FreeAgency />);

    userEvent.click(await screen.findByText("RB"));
    expect(await screen.findByText("Derrick Henry")).toBeTruthy();
  });
});
