import React, { useEffect, useState } from 'react';
import * as DatabaseService from '../../Services/DatabaseService';
import * as FranchiseService from '../../Services/FranchiseService';
import OwnerDisplay from './OwnerDisplay.jsx';
import RosterDataTable from './RosterDataTable.jsx';
import RosterPreview from './RosterPreview';

const Roster = (props) => {
  const [owner, setOwner] = useState({ name:'', cap: [0,100,0] });
  const [roster, setRoster] = useState([]);
  const [franchisePrices, setFranchisePrices] = useState({});

  useEffect(() => {
    const setOwnerAndRoster = async () => {
      const currentOwner = await DatabaseService.getSingleOwnerFromDB(props.match.params.name);
      const allPlayers = await DatabaseService.getPlayersFromDB();
      const currentRoster = allPlayers.filter(player => player.owner === currentOwner._id)
        .sort((a, b) => (a.position > b.position) ? 1 : -1);
  
      setOwner(currentOwner);
      setRoster(currentRoster);
    }
  
    const getFranchiseInfo = async () => {
      const franchiseDTO = await FranchiseService.getFranchiseTagDTO();
      setFranchisePrices(FranchiseService.getFranchisePrices(franchiseDTO));
    }

    setOwnerAndRoster();
    getFranchiseInfo()
  }, [])

  return (
    <div className='container'>
      <OwnerDisplay owner={owner} roster={roster} franchisePrices={franchisePrices} />
      <RosterPreview roster={roster} />
      <RosterDataTable roster={roster} franchisePrices={franchisePrices} />
    </div>
  )
}

export default Roster;
