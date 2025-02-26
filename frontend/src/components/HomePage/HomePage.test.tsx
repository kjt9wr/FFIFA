import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

describe("home page", () => {
  it("renders successfully", () => {
    render(<HomePage />);

    expect(
      screen.getByText("—If you want peace, prepare for war")
    ).toBeTruthy();
  });
});
