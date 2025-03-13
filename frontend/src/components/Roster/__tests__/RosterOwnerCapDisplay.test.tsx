import { render, screen, waitFor } from "@testing-library/react";
import RosterOwnerCapDisplay from "../RosterOwnerCapDisplay";
import { MOCK_FRANCHISE_TAG_DTO } from "../../../services/mock-data/services.mock-data";
import {
  MOCKED_ROSTER,
  MOCKED_ROSTER_WITH_SUPERMAX,
} from "../../../services/mock-data/player.mock-data";
import userEvent from "@testing-library/user-event";

const updateCap = jest.fn();
describe("owner cap display", () => {
  it("renders non offender successfully", () => {
    const view = render(
      <RosterOwnerCapDisplay
        ownerName={"Kevin"}
        roster={MOCKED_ROSTER}
        franchisePrices={MOCK_FRANCHISE_TAG_DTO}
        penaltyReward={20}
        cap={300}
        isEditable={false}
      />
    );

    expect(view).toMatchSnapshot();
  });

  it("renders offender successfully", () => {
    const view = render(
      <RosterOwnerCapDisplay
        ownerName={"Kevin"}
        roster={MOCKED_ROSTER_WITH_SUPERMAX}
        franchisePrices={MOCK_FRANCHISE_TAG_DTO}
        penaltyReward={0}
        cap={200}
        isEditable={false}
      />
    );

    expect(view).toMatchSnapshot();
  });

  it("can increase cap", async () => {
    render(
      <RosterOwnerCapDisplay
        ownerName={"Kevin"}
        roster={MOCKED_ROSTER_WITH_SUPERMAX}
        franchisePrices={MOCK_FRANCHISE_TAG_DTO}
        penaltyReward={0}
        cap={300}
        updateCapCallback={updateCap}
        isEditable={true}
      />
    );

    expect(await screen.findByText("$300")).toBeTruthy();

    userEvent.click(await screen.findByTitle("Add Cap"));

    await waitFor(() => {
      expect(updateCap).toHaveBeenCalledWith(301);
    });
  });

  it("can decrease cap", async () => {
    render(
      <RosterOwnerCapDisplay
        ownerName={"Kevin"}
        roster={MOCKED_ROSTER_WITH_SUPERMAX}
        franchisePrices={MOCK_FRANCHISE_TAG_DTO}
        penaltyReward={0}
        cap={300}
        updateCapCallback={updateCap}
        isEditable={true}
      />
    );

    expect(await screen.findByText("$300")).toBeTruthy();

    userEvent.click(await screen.findByTitle("Subtract Cap"));

    await waitFor(() => {
      expect(updateCap).toHaveBeenCalledWith(299);
    });
  });
});
