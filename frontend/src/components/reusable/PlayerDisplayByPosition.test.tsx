import { render, screen } from "@testing-library/react";
import PlayerDisplayByPosition from "./KeptPlayersDisplay";
import { MOCKED_ROSTER } from "../../services/mock-data/player.mock-data";
import userEvent from "@testing-library/user-event";

const removePlayer = jest.fn();
describe("player display by position", () => {
  it("renders static version successfully", () => {
    const view = render(
      <PlayerDisplayByPosition isEditable={false} playerList={MOCKED_ROSTER} />
    );
    expect(view).toMatchSnapshot();
  });

  it("calls removePlayerCallback on clicking the player", async () => {
    render(
      <PlayerDisplayByPosition
        isEditable={true}
        playerList={MOCKED_ROSTER}
        removePlayerCallback={removePlayer}
      />
    );

    userEvent.click(screen.getByText(/AJ Brown/));
    expect(removePlayer).toHaveBeenCalled();
  });
});
