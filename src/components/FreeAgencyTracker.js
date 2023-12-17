import React, { useState, useEffect } from 'react'
import FreeAgentList from './reusable/FreeAgentList';
import * as FreeAgencyService from '../Services/FreeAgencyService';
import * as Constants from '../Utilities/Constants';

const FreeAgency = () =>  {
  const [freeAgents, setFreeAgents] = useState({});

  useEffect(()  => {
    const getFreeAgents = async () => {
        const allFreeAgents = await FreeAgencyService.getFreeAgents();
        setFreeAgents(allFreeAgents);
      }

    getFreeAgents();
  });
  
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
  );
}

export default FreeAgency;
