import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getRoster, getSingleOwnerFromDB } from '../../Services/DatabaseService';
import { getFranchiseTagDTO } from '../../Services/FranchiseService';
import OwnerDisplay from './OwnerDisplay.jsx';
import RosterDataTable from './RosterDataTable.jsx';
import PlayerDisplayByPosition from '../reusable/PlayerDisplayByPosition.jsx';

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
  const [changeKeeper, setChangeKeeper] = useState(false);

  const toggleKeeper = async (e) => {
    const newKeep = { 'keep': e.target.checked  };
    await axios.post('http://localhost:5000/player/update/' + e.target.id, newKeep);
    setChangeKeeper(!changeKeeper);
  }

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
        const allPlayers = await getRoster(owner._id);
        setRoster(allPlayers.sort((a, b) => (a.position > b.position) ? 1 : -1));
      }
    }

    const getFranchiseInfo = async () => {
      const franchiseDTO = await getFranchiseTagDTO();
      setFranchisePrices(formatFranchisePrices(franchiseDTO));
    }

    fetchRosterInfo();
    getFranchiseInfo()
  }, [owner._id, owner.name.length, changeKeeper])

const keptPlayers = roster.filter((p) => p.keep)

  return (
    <div className='container'>
      <OwnerDisplay owner={owner} roster={roster} franchisePrices={franchisePrices} />
      <PlayerDisplayByPosition playerList={keptPlayers} />
      <RosterDataTable roster={roster} franchisePrices={franchisePrices} toggleKeeper={toggleKeeper}/>
    </div>
  )
}

export default Roster;
