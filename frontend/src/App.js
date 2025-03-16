import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./components/Admin/Admin";
import Arbitration from "./components/Arbitration/Arbitration";
import CapTracker from "./components/CapTracker/CapTracker";
import DraftDay from "./components/DraftDay/DraftDay";
import FranchiseTag from "./components/Franchise/FranchiseTag";
import FreeAgency from "./components/FreeAgencyTracker/FreeAgencyTracker";
import HomePage from "./components/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";
import Roster from "./components/Roster/Roster";
import Supermax from "./components/Supermax/Supermax";
import RosterPreview from "./components/Trade/RosterPreview";
import TradeTracker from "./components/Trade/TradeTracker";
import Login from "./components/Login/Login";
const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/roster/:name" element={<Roster />} />
        <Route path="/trade" element={<TradeTracker />} />
        <Route path="/tradepreview" element={<RosterPreview />} />
        <Route path="/cap/" element={<CapTracker />} />
        <Route path="/franchise" element={<FranchiseTag />} />
        <Route path="/fa" element={<FreeAgency />} />
        <Route path="/supermax" element={<Supermax />} />
        <Route path="/arbitration" element={<Arbitration />} />
        <Route path="/draft" element={<DraftDay />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
