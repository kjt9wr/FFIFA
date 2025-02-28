import { render } from "@testing-library/react";
import RosterProgressBar from "../RosterProgressBar";

describe("roster progress bar", () => {
  it("renders successfully for offender", () => {
    const view = render(
      <RosterProgressBar keepPrice={130} taxLine={110} maxCap={200} />
    );
    expect(view).toMatchSnapshot();
  });

  it("renders successfully for non-offender", () => {
    const view = render(
      <RosterProgressBar keepPrice={100} taxLine={110} maxCap={200} />
    );
    expect(view).toMatchSnapshot();
  });
});
