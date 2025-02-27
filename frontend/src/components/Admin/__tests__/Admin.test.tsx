import { render, screen } from "@testing-library/react";
import Admin from "../Admin";

const UPDATE_ALL_ROSTERS = "Update All Rosters";
describe("admin page", () => {
  it("renders update draft prices and update rosters buttons", () => {
    render(<Admin />);

    expect(
      screen.getByRole("button", { name: UPDATE_ALL_ROSTERS })
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "Update Draft Prices" })
    ).toBeTruthy();
  });
});
