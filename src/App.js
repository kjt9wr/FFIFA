import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
// eslint-disable-next-line
import { Button } from 'reactstrap';
import axios from 'axios';
import './App.css';
import Navbar from './components/navbar.component.js';
import HomePage from './components/home-page.component.js';
import Roster from './components/RosterComponents/Roster.jsx';
import TradeTracker from './components/trade-tracker.component.js';
import CapTracker from './components/cap-tracker.component.js';
import FranchiseTag from './components/franchise-tag.component.js';
import FreeAgency from './components/free-agency.component.js';
import * as FranchiseService from './Services/FranchiseService';
import * as SuperMaxService from './Services/SuperMaxService';
import * as Constants from './Utilities/Constants';

export class App extends Component {
  state = {
    penaltyFees: {
      'Kevin': 0,
      'Justin': 0,
      'Luigi': 0,
      'Brent': 0,
      'Alex': 0,
      'Michael': 0,
      'Nikos': 0,
      'Matt': 0,
      'Chinmay': 0,
      'Christian': 0,
      'Patrick': 0,
      'Jeff': 0
    },
    rbFranchisePrice: 0
  }

  render(){
    return (
      <Router>
        <Navbar />
        <br/>
        <Route path='/' exact component={HomePage} />
        <Route path='/roster/:name' component={Roster} />
        <Route path='/trade' component={TradeTracker} />
        <Route path='/cap' component={CapTracker}/>
        <Route path='/franchise'  render={() => <FranchiseTag info={this.state} />} />
        <Route path='/fa' component={FreeAgency} />
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
            const keptQBs = keptPlayers.filter(player => player.position === Constants.QB).sort((a,b) => b.price - a.price);
            const keptRBs = keptPlayers.filter(player => player.position === Constants.RB).sort((a,b) => b.price - a.price);
            const keptWRs = keptPlayers.filter(player => player.position === Constants.WR).sort((a,b) => b.price - a.price);
            const keptTEs = keptPlayers.filter(player => player.position === Constants.TE).sort((a,b) => b.price - a.price);
            
            const qbFranchisePrice = FranchiseService.calculateFranchisePriceFromKeptPlayers(keptQBs);
            const rbFranchisePrice = FranchiseService.calculateFranchisePriceFromKeptPlayers(keptRBs);
            const wrFranchisePrice = FranchiseService.calculateFranchisePriceFromKeptPlayers(keptWRs);
            const teFranchisePrice = FranchiseService.calculateFranchisePriceFromKeptPlayers(keptTEs);
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
          })
          .catch((error) => {
            console.log(error);
          })
      }
}

export default App;
