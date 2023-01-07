import React, { useState, useEffect } from 'react';
import * as RosterService from '../../Services/RosterService';
import * as DatabaseService from '../../Services/DatabaseService';
import OwnerDisplay from './OwnerDisplay.jsx';
import RosterDataTable from './RosterDataTable.jsx'
import RosterPreview from './RosterPreview';
import * as FranchiseService from '../../Services/FranchiseService';

const Roster = (props) => {
  const [owner, setOwner] = useState({ name:'', cap: [0,100,0] });
  const [roster, setRoster] = useState([]);
  const [franchisePrices, setFranchisePrices] = useState({});

  const setOwnerAndRoster = async () => {
    const currentOwner = await DatabaseService.getSingleOwnerFromDB(props.match.params.name);
    const allPlayers = await DatabaseService.getPlayersFromDB();
    const currentRoster = allPlayers.filter(player => player.owner === currentOwner._id)
      .sort((a, b) => (a.position > b.position) ? 1 : -1);

    setOwner(currentOwner);
    setRoster(currentRoster);
    RosterService.updateOwnerLuxaryTax(currentRoster, currentOwner.cap[3], currentOwner.name);
  }

  const getFranchiseInfo = async () => {
    const franchiseDTO = await FranchiseService.getFranchiseTagDTO();
    setFranchisePrices(FranchiseService.getFranchisePrices(franchiseDTO));
  }

  useEffect(() => {
    setOwnerAndRoster();
    getFranchiseInfo()
  }, )

  return (
    <div className='container'>
      <OwnerDisplay owner={owner} roster={roster} franchisePrices={franchisePrices} />
      <RosterPreview roster={roster} />
      <RosterDataTable roster={roster} franchisePrices={franchisePrices} />
    </div>
  )
}

export default Roster;
