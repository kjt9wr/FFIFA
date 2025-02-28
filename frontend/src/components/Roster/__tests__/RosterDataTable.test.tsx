import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MOCKED_ROSTER_WITH_SUPERMAX } from "../../../services/mock-data/player.mock-data";
import { FRANCHISE_TAG_SAMPLE_DATA } from "../../../services/mock-data/services.mock-data";
import RosterDataTable from "../RosterDataTable";

const mockToggleKeeper = jest.fn();
describe("roster data table", () => {
  it("renders successfully", () => {
    const view = render(
      <RosterDataTable
        roster={MOCKED_ROSTER_WITH_SUPERMAX}
        franchisePrices={FRANCHISE_TAG_SAMPLE_DATA}
        toggleKeeper={mockToggleKeeper}
      />
    );

    expect(view).toMatchSnapshot();
  });

  it("keeps player on click", async () => {
    render(
      <RosterDataTable
        roster={MOCKED_ROSTER_WITH_SUPERMAX}
        franchisePrices={FRANCHISE_TAG_SAMPLE_DATA}
        toggleKeeper={mockToggleKeeper}
      />
    );

    userEvent.click(await screen.findByTitle("AJ Brown"));

    await waitFor(() => {
      expect(mockToggleKeeper).toHaveBeenCalled();
    });
  });
});
