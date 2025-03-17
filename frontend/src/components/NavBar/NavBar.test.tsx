import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { AuthContextProvider } from "../../context/AuthContext";
import "./localStorageMock.ts"; // Import the localStorage mock file
import userEvent from "@testing-library/user-event";

const user = { username: "dude" };
describe("Nav Bar", () => {
  it("renders successfully when logged out", () => {
    const view = render(
      <AuthContextProvider>
        <NavBar />
      </AuthContextProvider>
    );

    expect(view).toMatchSnapshot();
  });

  it("renders successfully when logged in", async () => {
    localStorage.setItem("user", JSON.stringify(user));
    render(
      <AuthContextProvider>
        <NavBar />
      </AuthContextProvider>
    );

    expect(await screen.findByText("Cap Tracker")).toBeTruthy();
  });

  it("can logout", async () => {
    localStorage.setItem("user", JSON.stringify(user));
    render(
      <AuthContextProvider>
        <NavBar />
      </AuthContextProvider>
    );

    userEvent.click(await screen.findByText("dude"));
    userEvent.click(await screen.findByText("Logout"));

    expect(screen.queryByText("Cap Tracker")).toBeFalsy();
  });
});
