import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Admin from "./components/Admin/Admin";
import Arbitration from "./components/Arbitration";
import CapTracker from "./components/CapTracker";
import DraftDay from "./components/DraftDay";
import FranchiseTag from "./components/FranchiseComponents/FranchiseTag";
import FreeAgency from "./components/FreeAgencyTracker";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import Roster from "./components/RosterComponents/Roster";
import SuperMax from "./components/SuperMax";
import RosterPreview from "./components/TradeComponents/RosterPreview";
import TradeTracker from "./components/TradeComponents/TradeTracker";

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
