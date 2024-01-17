import React, { useState, useEffect } from 'react'
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
      <h2 className="text-center"> Free Agents </h2> 
      <div className="d-flex pl-4">
        <FreeAgentList availablePlayers = {freeAgents.availableQBs} position = {Constants.QB} />
        <FreeAgentList availablePlayers = {freeAgents.availableRBs} position = {Constants.RB} />
        <FreeAgentList availablePlayers = {freeAgents.availableWRs} position = {Constants.WR} />
        <FreeAgentList availablePlayers = {freeAgents.availableTEs} position = {Constants.TE} />
      </div>
    </div>
  );
}

const populateFreeAgents = (freeAgentsForPosition) => {
  if(freeAgentsForPosition) {
    return freeAgentsForPosition.map(player => 
    <tr key={ player._id }>
      <td> { player.name }</td>
    </tr>
  );
  }
}

const FreeAgentList = (props) => {
  return (
    <div style={{ flex: '1'}}>
      <h3> {props.position} </h3>
      <table>
        <tbody>{ populateFreeAgents(props.availablePlayers) }</tbody>
      </table>
    </div>
  );
}

export default FreeAgency;
