import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import YearSelector from "./YearSelector";

const TEST_YEARS = ["2023", "2024", "2025"];
const onChangeMock = jest.fn();

describe("Year Selector Tests", () => {
  it("can change active year", async () => {
    render(
      <YearSelector
        selectedYear={"2023"}
        onChange={onChangeMock}
        yearOptions={TEST_YEARS}
      />
    );
    userEvent.click(screen.getByRole("button", { name: "2024" }));

    expect(onChangeMock).toHaveBeenCalled();
  });
});
