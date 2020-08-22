import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
// eslint-disable-next-line
import { Button } from 'reactstrap';
import axios from 'axios';
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
    },
    rbFranchisePrice: 0
  }

  render(){
    return (
      <Router>
        <Navbar />
        <br/>
        <Route path="/" exact component={HomePage} />
        <Route path="/roster/:name" component={Roster} />
        <Route path="/trade" component={TradeTracker} />
        <Route path="/cap" component={CapTracker}/>
        <Route path="/franchise"  render={() => <FranchiseTag info={this.state} />} />
        <Route path="/fa" component={FreeAgency} />
      </Router>
      
    );
  }

      // Get Owner/Players from DB
      componentDidMount = () => {
          this.getFranchiseTags();
      }

      getFranchiseTags = () => {
        axios.get('http://localhost:5000/player/')
          .then(response => {
            const keptPlayers = response.data.filter(player => player.keep === true);
            const keptQBs = keptPlayers.filter(player => player.position === "QB").sort((a,b) => b.price - a.price);
            const keptRBs = keptPlayers.filter(player => player.position === "RB").sort((a,b) => b.price - a.price);
            const keptWRs = keptPlayers.filter(player => player.position === "WR").sort((a,b) => b.price - a.price);
            const keptTEs = keptPlayers.filter(player => player.position === "TE").sort((a,b) => b.price - a.price);
            
            const qbFranchisePrice = this.calculateFranchisePrice(keptQBs);
            const rbFranchisePrice = this.calculateFranchisePrice(keptRBs);
            const wrFranchisePrice = this.calculateFranchisePrice(keptWRs);
            const teFranchisePrice = this.calculateFranchisePrice(keptTEs);
            this.setState({
              keptQBs,
              keptRBs,
              keptWRs,
              keptTEs,
              qbFranchisePrice,
              rbFranchisePrice,
              wrFranchisePrice,
              teFranchisePrice
            })
           console.log(keptQBs)

          })
          .catch((error) => {
            console.log(error);
          })
      }

      calculateFranchisePrice = (playerList) => {
        const totalPrice = playerList.slice(0,5).reduce((acc, player) => acc + player.price, 0)
        return Math.trunc(totalPrice / 5);
      }
}

export default App;
