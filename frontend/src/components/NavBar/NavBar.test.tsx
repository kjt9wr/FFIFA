import { render } from "@testing-library/react";
import NavBar from "./NavBar";

describe("Nav Bar", () => {
  it("renders successfully", () => {
    const view = render(<NavBar />);

    expect(view).toMatchSnapshot();
  });
});
