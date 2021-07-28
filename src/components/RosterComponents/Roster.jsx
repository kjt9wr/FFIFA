import React, { Component } from 'react';
import * as FFIFAService from '../../Services/FFIFAService';
import * as RosterService from '../../Services/RosterService';
import * as DatabaseService from '../../Services/DatabaseService';
import OwnerDisplay from './OwnerDisplay.jsx';
import PlayerRow from './PlayerRow.jsx';
import RosterPreview from './RosterPreview';
import * as FranchiseService from '../../Services/FranchiseService';
import * as Constants from '../../Utilities/Constants';

export default class Roster extends Component {
    constructor(props) {
        super(props);
        this.state = {
          owner: {
            name:'',
            cap: [0,0,0],
          },
          roster: [{}],
          luxaryTaxLine: 0,
          nonOffenderReward: 0,
          isOffender: false,
          franchisePrices: {}
        };
    }

    componentDidMount = () => {
        this.getOwnersRoster();
        this.getFranchiseInfo()
      }

    render() {
        return (
            <div className='container'>
              {this.getOwnerInfo()}
              {this.getRosterPreview()}
              <table className='table'>
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
                <tbody>
                  {this.getPlayerDataTable()}
                </tbody>
              </table>
            </div>
        )
    }

    getOwnersRoster = async () => {
      const { name } = this.props.match.params
      const ownerList = await DatabaseService.getOwnersFromDB();
      const currentOwner = ownerList.find(currentOwner => name === currentOwner.name);

      const allPlayers = await DatabaseService.getPlayersFromDB();
      const roster = allPlayers.filter(player => player.owner === currentOwner._id)
      .sort((a, b) => (a.position > b.position || b.position === Constants.TE) ? 1 : -1);
      this.setState({
        owner: currentOwner,
        roster: RosterService.positionSort(roster)
      })
    }

    getOwnerInfo = () => {
      const taxLine = RosterService.calculateLuxaryTaxLine(this.state.owner.cap[1]);
      const keepPrice = RosterService.calculateTotalKeeperPrice(this.state.roster, this.state.franchisePrices);
      const penaltyFee = RosterService.calculatePenaltyFee(keepPrice, taxLine);
      const luxaryGainorLoss = penaltyFee > 0 ? penaltyFee *-1 : this.state.nonOffenderReward;
      const capRemaining = this.state.owner.cap[1] - keepPrice + luxaryGainorLoss;

      return <OwnerDisplay 
              name={this.state.owner.name}
              cap = {this.state.owner.cap[1]}
              keepPrice = {keepPrice}
              isOffender = {keepPrice > taxLine}
              luxaryGainorLoss = {Math.abs(luxaryGainorLoss)}
              remaining = {capRemaining}
              taxLine = {taxLine}
            />;
    }

    getRosterPreview = () => {
      const { roster } = this.state
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

    getPlayerDataTable = () => {
      return this.state.roster.map(currentPlayer => {
        const keep = currentPlayer.keep ? 'checked' : ''
        return <PlayerRow 
                  player={currentPlayer}
                  key={currentPlayer._id}
                  id={currentPlayer._id}
                  keep={keep}
                  toggleKeeper={RosterService.toggleKeeper}
                  franchisePrices={this.state.franchisePrices}
                />;
      })
    }

    getFranchiseInfo = async () => {
      const franchiseDTO = await FranchiseService.getFranchiseTagDTO();
      this.setState( { franchisePrices: FranchiseService.getFranchisePrices(franchiseDTO)} );
  }
}
