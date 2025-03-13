import apiClient from "../../../api/apiClient";
import sleeperApiClient from "../../../api/sleeperApiClient";
import { MOCKED_DRAFT_RESULTS } from "../admin.test-data";
import * as apiService from "../../../api/api.service";
import UpdateDraftPrices from "../UpdateDraftPrices";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ALERT_STATE } from "../../../utilities/enumerations";

const displayAlert = jest.fn();
describe("update draft prices", () => {
  beforeAll(() => {
    jest
      .spyOn(sleeperApiClient, "get")
      .mockResolvedValue({ data: MOCKED_DRAFT_RESULTS });
  });

  it("updates draft prices when button is clicked", async () => {
    jest.spyOn(apiClient, "put").mockResolvedValue({ status: 200 });
    const mockedUpdate = jest.spyOn(apiService, "updatePlayerPrice");
    render(<UpdateDraftPrices priceAlertCallback={displayAlert} />);
    expect(await screen.findByRole("button")).toBeTruthy();
    userEvent.click(await screen.findByRole("button"));

    await waitFor(() => {
      expect(mockedUpdate).toHaveBeenCalledTimes(MOCKED_DRAFT_RESULTS.length);
    });
    expect(displayAlert).toHaveBeenCalledWith(ALERT_STATE.SUCCESS);
  });

  it("displays error alert on failure", async () => {
    jest.spyOn(console, "error").mockImplementation();
    jest.spyOn(apiClient, "put").mockRejectedValue(new Error("500 error"));
    render(<UpdateDraftPrices priceAlertCallback={displayAlert} />);
    expect(await screen.findByRole("button")).toBeTruthy();
    userEvent.click(await screen.findByRole("button"));

    await waitFor(() => {
      expect(displayAlert).toHaveBeenCalledWith(ALERT_STATE.ERROR);
    });
  });
});
