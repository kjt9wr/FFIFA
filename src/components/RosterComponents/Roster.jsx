import React, { useState, useEffect } from 'react';
import * as FFIFAService from '../../Services/FFIFAService';
import * as RosterService from '../../Services/RosterService';
import * as DatabaseService from '../../Services/DatabaseService';
import OwnerDisplay from './OwnerDisplay.jsx';
import PlayerRow from './PlayerRow.jsx';
import RosterPreview from './RosterPreview';
import * as FranchiseService from '../../Services/FranchiseService';
import * as Constants from '../../Utilities/Constants';

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
      RosterService.updateOwnerLuxaryTax(currentRoster, currentOwner.cap[3], currentOwner.name);
    }

    const getFranchiseInfo = async () => {
      const franchiseDTO = await FranchiseService.getFranchiseTagDTO();
      setFranchisePrices(FranchiseService.getFranchisePrices(franchiseDTO));
    }

    setOwnerAndRoster();
    getFranchiseInfo()
  }, [props])

  const getOwnerInfo = () => {
    const taxLine = RosterService.calculateLuxaryTaxLine(owner.cap[3]);
    const keepPrice = RosterService.calculateTotalKeeperPrice(roster, franchisePrices);
    const penaltyFee = RosterService.calculatePenaltyFee(roster, franchisePrices, owner.cap[3]);
    const luxaryGainorLoss = penaltyFee > 0 ? penaltyFee *-1 : 0;
    const capRemaining = owner.cap[3] - keepPrice + luxaryGainorLoss;

    return <OwnerDisplay 
              name={owner.name}
              cap = {owner.cap[3]}
              keepPrice = {keepPrice}
              isOffender = {keepPrice > taxLine}
              luxaryGainorLoss = {Math.abs(luxaryGainorLoss)}
              remaining = {capRemaining}
              taxLine = {taxLine}
            />;
  }
  
  const getRosterPreview = () => {
    const keptQBs = FFIFAService.filterKeepersByPosition(roster, Constants.QB);
    const keptRBs = FFIFAService.filterKeepersByPosition(roster, Constants.RB);
    const keptWRs = FFIFAService.filterKeepersByPosition(roster, Constants.WR);
    const keptTEs = FFIFAService.filterKeepersByPosition(roster, Constants.TE);
  
    return <RosterPreview 
              keptQBs={keptQBs} 
              keptRBs={keptRBs} 
              keptWRs={keptWRs} 
              keptTEs={keptTEs} 
            />
    }
  
    const getPlayerDataTable = () => {
      return <table className='table'>
                <thead className='thead-light'>
                <tr>
                  <th>Position</th>
                  <th>Player</th>
                  <th>Price</th>
                  <th>Keep</th>
                  <th>Franchise</th>
                  <th>SuperMax</th>
                </tr>
                </thead>
                <tbody> { getPlayerRows() } </tbody>
             </table>
    }

  const getPlayerRows = () => {
    return roster.map(currentPlayer => {
      return <PlayerRow 
                player={currentPlayer}
                key={currentPlayer._id}
                id={currentPlayer._id}
                keep={currentPlayer.keep ? 'checked' : ''}
                toggleKeeper={RosterService.toggleKeeper}
                franchisePrices={franchisePrices}
              />;
    })
  }

  return (
    <div className='container'>
      {getOwnerInfo()}
      {getRosterPreview()}
      {getPlayerDataTable()}
    </div>
  )
}

export default Roster;
