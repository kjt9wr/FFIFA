import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar.js';
import HomePage from './components/HomePage.js';
import Roster from './components/RosterComponents/Roster.jsx';
import TradeTracker from './components/TradeComponents/TradeTracker.js';
import CapTracker from './components/CapTracker.js';
import FranchiseTag from './components/FranchiseTag.js';
import FreeAgency from './components/FreeAgencyTracker.js';
import SuperMax from './components/SuperMaxComponents/SuperMax.js';

const App = () => (
  <Router>
    <Navbar />
    <Route path='/' exact component={HomePage} />
    <Route path='/roster/:name' component={Roster} />
    <Route path='/trade' component={TradeTracker} />
    <Route path='/cap/' component={CapTracker}/>
    <Route path='/franchise' component={FranchiseTag} />
    <Route path='/fa' component={FreeAgency} />
    <Route path='/supermax' component={SuperMax} />
  </Router>
);

export default App;
