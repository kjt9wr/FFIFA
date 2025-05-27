import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./components/Admin/Admin";
import Arbitration from "./components/Arbitration/Arbitration";
import CapTracker from "./components/CapTracker/CapTracker";
import DraftDay from "./components/DraftDay/DraftDay";
import FranchiseTag from "./components/Franchise/FranchiseTag";
import FreeAgency from "./components/FreeAgencyTracker/FreeAgencyTracker";
import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar";
import Roster from "./components/Roster/Roster";
import Supermax from "./components/Supermax/Supermax";
import RosterPreview from "./components/Trade/RosterPreview";
import TradeTracker from "./components/Trade/TradeTracker";
import { useAuthContext } from "./custom-hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/roster/:name"
          element={user ? <Roster /> : <Navigate to="/" />}
        />
        <Route
          path="/trade"
          element={user ? <TradeTracker /> : <Navigate to="/" />}
        />
        <Route
          path="/tradepreview"
          element={user ? <RosterPreview /> : <Navigate to="/" />}
        />
        <Route
          path="/cap/"
          element={user ? <CapTracker /> : <Navigate to="/" />}
        />
        <Route
          path="/franchise"
          element={user ? <FranchiseTag /> : <Navigate to="/" />}
        />
        <Route
          path="/fa"
          element={user ? <FreeAgency /> : <Navigate to="/" />}
        />
        <Route
          path="/supermax"
          element={user ? <Supermax /> : <Navigate to="/" />}
        />
        <Route
          path="/arbitration"
          element={user ? <Arbitration /> : <Navigate to="/" />}
        />
        <Route
          path="/draft"
          element={user ? <DraftDay /> : <Navigate to="/" />}
        />
        <Route path="/admin" element={user ? <Admin /> : <Navigate to="/" />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
