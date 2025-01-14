import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Admin from "./components/Admin/Admin.tsx";
import Arbitration from "./components/Arbitration.tsx";
import CapTracker from "./components/CapTracker.tsx";
import DraftDay from "./components/DraftDay.tsx";
import FranchiseTag from "./components/FranchiseComponents/FranchiseTag.tsx";
import FreeAgency from "./components/FreeAgencyTracker.tsx";
import HomePage from "./components/HomePage.tsx";
import Navbar from "./components/Navbar.tsx";
import Roster from "./components/RosterComponents/Roster.tsx";
import SuperMax from "./components/SuperMax.tsx";
import RosterPreview from "./components/TradeComponents/RosterPreview.tsx";
import TradeTracker from "./components/TradeComponents/TradeTracker.tsx";

const App = () => (
  <Router>
    <Navbar />
    <Route path="/" exact component={HomePage} />
    <Route path="/roster/:name" component={Roster} />
    <Route path="/trade" component={TradeTracker} />
    <Route path="/tradepreview" component={RosterPreview} />
    <Route path="/cap/" component={CapTracker} />
    <Route path="/franchise" component={FranchiseTag} />
    <Route path="/fa" component={FreeAgency} />
    <Route path="/supermax" component={SuperMax} />
    <Route path="/arbitration" component={Arbitration} />
    <Route path="/draft" component={DraftDay} />
    <Route path="/admin" component={Admin} />
  </Router>
);

export default App;
