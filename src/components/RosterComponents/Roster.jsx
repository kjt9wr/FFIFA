import React, { useEffect, useState } from 'react';
import { getPlayersFromDB, getSingleOwnerFromDB } from '../../Services/DatabaseService';
import { getFranchiseTagDTO } from '../../Services/FranchiseService';
import OwnerDisplay from './OwnerDisplay.jsx';
import RosterDataTable from './RosterDataTable.jsx';
import RosterPreview from './RosterPreview';

const formatFranchisePrices = (franchiseDTO) => {
  return {
    qb: franchiseDTO.qbFranchisePrice,
    rb: franchiseDTO.rbFranchisePrice,
    wr: franchiseDTO.wrFranchisePrice,
    te: franchiseDTO.teFranchisePrice,
  }
}

const Roster = (props) => {
  const [owner, setOwner] = useState({ name:'', cap: [0, 100, 0, 0] });
  const [roster, setRoster] = useState([]);
  const [franchisePrices, setFranchisePrices] = useState({});

  useEffect(() => {
    const getOwnerData = async () => {
      const currentOwner = await getSingleOwnerFromDB(props.match.params.name);
      setOwner(currentOwner);
    }

    getOwnerData();
  }, [props.match.params.name])


  useEffect(() => {
    const fetchRosterInfo = async () => {
      if(owner.name.length > 0) {
        const allPlayers = await getPlayersFromDB();
        const currentRoster = allPlayers.filter(player => player.owner === owner._id)
          .sort((a, b) => (a.position > b.position) ? 1 : -1);
        setRoster(currentRoster);
      }
    }
  
    const getFranchiseInfo = async () => {
      const franchiseDTO = await getFranchiseTagDTO();
      setFranchisePrices(formatFranchisePrices(franchiseDTO));
    }

    fetchRosterInfo();
    getFranchiseInfo()
  }, [owner, roster])

  return (
    <div className='container'>
      <OwnerDisplay owner={owner} roster={roster} franchisePrices={franchisePrices} />
      <RosterPreview roster={roster} />
      <RosterDataTable roster={roster} franchisePrices={franchisePrices} />
    </div>
  )
}

export default Roster;
