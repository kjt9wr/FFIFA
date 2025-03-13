import { render, screen } from "@testing-library/react";
import Admin from "../Admin";

describe("admin page", () => {
  it("renders update draft prices and update rosters buttons", async () => {
    render(<Admin />);

    expect(
      await screen.findByRole("button", { name: "Update All Rosters" })
    ).toBeTruthy();
    expect(
      await screen.findByRole("button", { name: "Update Draft Prices" })
    ).toBeTruthy();
  });
});
