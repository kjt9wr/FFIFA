import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Admin from "./components/Admin/Admin.js";
import Arbitration from "./components/Arbitration.js";
import CapTracker from "./components/CapTracker.js";
import Draft from "./components/Draft.js";
import FranchiseTag from "./components/FranchiseTag.js";
import FreeAgency from "./components/FreeAgencyTracker.tsx";
import HomePage from "./components/HomePage.tsx";
import Navbar from "./components/Navbar.tsx";
import Roster from "./components/RosterComponents/Roster.jsx";
import SuperMax from "./components/SuperMax.js";
import RosterPreview from "./components/TradeComponents/RosterPreview.jsx";
import TradeTracker from "./components/TradeComponents/TradeTracker.js";

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
    <Route path="/draft" component={Draft} />
    <Route path="/admin" component={Admin} />
  </Router>
);

export default App;
