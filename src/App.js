import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Arbitration from './components/Arbitration.js';
import CapTracker from './components/CapTracker.js';
import FranchiseTag from './components/FranchiseTag.js';
import FreeAgency from './components/FreeAgencyTracker.js';
import HomePage from './components/HomePage.js';
import Navbar from './components/Navbar.js';
import Roster from './components/RosterComponents/Roster.jsx';
import SuperMax from './components/SuperMax.js';
import TradeTracker from './components/TradeComponents/TradeTracker.js';
import Admin from './components/Admin.js'

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
    <Route path='/arbitration' component={Arbitration} />
    <Route path='/admin' component={Admin} />
  </Router>
);

export default App;
