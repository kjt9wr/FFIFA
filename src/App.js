import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
// eslint-disable-next-line
import { Button } from 'reactstrap';
import './App.css';
import Navbar from './components/Navbar.js';
import HomePage from './components/HomePage.js';
import Roster from './components/RosterComponents/Roster.jsx';
import TradeTracker from './components/TradeComponents/TradeTracker.js';
import CapTracker from './components/CapTracker.js';
import FranchiseTag from './components/FranchiseTag.js';
import FreeAgency from './components/FreeAgencyTracker.js';
import SuperMax from './components/SuperMaxComponents/SuperMax.js';

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
    franchisePrices: {
      'qb': 0,
      'rb': 0,
      'wr': 0,
      'te': 0
    },
  }
  updateFranchiseTags = (prices) => {
    this.setState({
      franchisePrices : prices
    })
  }

  render(){
    return (
      <Router>
        <Navbar />
        <br/>
        <Route path='/' exact component={HomePage} />
        <Route path='/roster/:name' component={Roster} />
        <Route path='/trade' component={TradeTracker} />
        <Route path='/cap/' component={CapTracker}/>
        <Route path='/franchise' render={() => <FranchiseTag prices={this.state.franchisePrices} updateTagPrices={this.updateFranchiseTags} />} />
        <Route path='/fa' component={FreeAgency} />
        <Route path='/supermax' component={SuperMax} />
      </Router>
    );
  }
}

export default App;
