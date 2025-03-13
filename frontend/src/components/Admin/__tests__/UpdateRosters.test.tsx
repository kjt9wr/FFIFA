import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as apiService from "../../../api/api.service";
import apiClient from "../../../api/apiClient";
import sleeperApiClient from "../../../api/sleeperApiClient";
import { ALERT_STATE } from "../../../utilities/enumerations";
import { MOCKED_SLEEPER_ROSTERS } from "../admin.test-data";
import UpdateRosters from "../UpdateRosters";

const displayAlert = jest.fn();
describe("update rosters", () => {
  beforeAll(() => {
    jest
      .spyOn(sleeperApiClient, "get")
      .mockResolvedValue({ data: MOCKED_SLEEPER_ROSTERS });
  });

  it("updates roster when button is clicked", async () => {
    jest.spyOn(apiClient, "post").mockResolvedValue({ status: 200 });
    const mockedUpdate = jest.spyOn(apiService, "updateRoster");
    render(<UpdateRosters rosterAlertCallback={displayAlert} />);
    expect(await screen.findByRole("button")).toBeTruthy();
    userEvent.click(await screen.findByRole("button"));

    await waitFor(() => {
      expect(mockedUpdate).toHaveBeenCalledTimes(MOCKED_SLEEPER_ROSTERS.length);
    });
    expect(displayAlert).toHaveBeenCalledWith(ALERT_STATE.SUCCESS);
  });

  it("displays error alert on failure", async () => {
    jest.spyOn(console, "error").mockImplementation();
    jest.spyOn(apiClient, "post").mockRejectedValue({ status: 400 });
    render(<UpdateRosters rosterAlertCallback={displayAlert} />);

    userEvent.click(await screen.findByText("Update All Rosters"));

    await waitFor(() => {
      expect(displayAlert).toHaveBeenCalledWith(ALERT_STATE.ERROR);
    });
  });
});
