import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
// eslint-disable-next-line
import { Button } from 'reactstrap';
import './App.css';
import Navbar from "./components/navbar.component.js";
import HomePage from "./components/home-page.component.js";
import Roster from "./components/roster.component.js";
import TradeTracker from "./components/trade-tracker.component.js";
import CapTracker from "./components/cap-tracker.component.js";
import FranchiseTag from "./components/franchise-tag.component.js";
import FreeAgency from "./components/free-agency.component.js";

export class App extends Component {
  state = {
    penaltyFees: {
      "Kevin": 0,
      "Justin": 0,
      "Luigi": 0,
      "Brent": 0,
      "Alex": 0,
      "Michael": 0,
      "Nikos": 0,
      "Matt": 0,
      "Chinmay": 0,
      "Christian": 0,
      "Patrick": 0,
      "Jeff": 0
    }
  }

  render(){
    return (
      <Router>
        <Navbar />
        <br/>
        <Route path="/" exact component={HomePage} />
        <Route path="/roster/:name" component={Roster} />
        <Route path="/trade" component={TradeTracker} />
        <Route path="/cap" component={CapTracker} />
        <Route path="/franchise" component={FranchiseTag} />
        <Route path="/fa" component={FreeAgency} />
      </Router>
      
    );
  }
}

export default App;
