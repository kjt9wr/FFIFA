import { render, screen } from "@testing-library/react";
import * as customHooks from "../../custom-hooks/custom-hooks";
import { MOCK_FREE_AGENTS } from "../../services/mock-data/services.mock-data";
import FreeAgency from "./FreeAgencyTracker";

describe("free agency page", () => {
  it("renders successfully", async () => {
    jest
      .spyOn(customHooks, "useFetch")
      .mockReturnValue({ data: MOCK_FREE_AGENTS });

    const view = render(<FreeAgency />);

    expect(await screen.findByText("Derrick Henry")).toBeTruthy();
    expect(view).toMatchSnapshot();
  });
});
