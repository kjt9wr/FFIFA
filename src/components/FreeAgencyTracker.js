import React, { Component } from 'react';
import FreeAgentList from './reusable/FreeAgentList';
import * as FreeAgencyService from '../Services/FreeAgencyService';
import * as Constants from '../Utilities/Constants';

export default class FreeAgency extends Component {constructor(props) {
    super(props);
    this.state = {
        freeAgents: {}
    };
}
componentDidMount = () => {
    this.getFreeAgents();
}

render() {
    const { freeAgents } = this.state; 
    return (
        <div>
           <h2 class="text-center"> Free Agents </h2> 
           <div class="d-flex pl-4">

           <FreeAgentList keptPlayers = {freeAgents.availableQBs} position = {Constants.QB} />
           <FreeAgentList keptPlayers = {freeAgents.availableRBs} position = {Constants.RB} />
           <FreeAgentList keptPlayers = {freeAgents.availableWRs} position = {Constants.WR} />
           <FreeAgentList keptPlayers = {freeAgents.availableTEs} position = {Constants.TE} />
           </div>
        </div>
    )
}

getFreeAgents = async () => {
    const freeAgents = await FreeAgencyService.getFreeAgents();
    this.setState({ freeAgents })
  }
}

