import React, { Component } from 'react';
import axios from 'axios';
import * as RosterService from '../../Services/RosterService';
import OwnerDisplay from './OwnerDisplay.jsx';
import PlayerRow from './PlayerRow.jsx';
import RosterPreview from './RosterPreview';
import * as Constants from '../../Utilities/Constants';

export default class Roster extends Component {
    constructor(props) {
        super(props);
        this.state = {
          owner: {
            name:'',
            cap: [0,0,0],
          },
          roster: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
          luxaryTaxLine: 0,
          nonOffenderReward: 0,
          isOffender: false
        };
    }

    componentDidMount = () => {
        this.getPlayersFromDB();
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
                  </tr>
                </thead>
                <tbody>
                  {this.getPlayerDataTable()}
                </tbody>
              </table>
            </div>
        )
    }

    getOwnerInfo = () => {
      const taxLine = RosterService.calculateLuxaryTaxLine(this.state.owner.cap[1]);
      const keepPrice = RosterService.calculateTotalKeeperPrice(this.state.roster);
      const isOffender = keepPrice > taxLine;
      const penaltyFee = RosterService.calculatePenaltyFee(keepPrice, taxLine);
      const luxaryGainorLoss = penaltyFee > 0 ? penaltyFee *-1 : this.state.nonOffenderReward;
      const capRemaining = this.state.owner.cap[1] - keepPrice + luxaryGainorLoss;

      return <OwnerDisplay 
              name={this.state.owner.name}
              cap = {this.state.owner.cap[1]}
              isOffender = {isOffender}
              luxaryGainorLoss = {Math.abs(luxaryGainorLoss)}
              remaining = {capRemaining}
              taxLine = {taxLine}
            />;
    }

    getRosterPreview = () => {
      const { roster } = this.state
      const keptQBs = RosterService.filterKeepersByPosition(roster, Constants.QB);
      const keptRBs = RosterService.filterKeepersByPosition(roster, Constants.RB);
      const keptWRs = RosterService.filterKeepersByPosition(roster, Constants.WR);
      const keptTEs = RosterService.filterKeepersByPosition(roster, Constants.TE);
      
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
                  name={currentPlayer.name}
                  key={currentPlayer._id}
                  id={currentPlayer._id}
                  price={currentPlayer.price}
                  keep={keep}
                  toggleKeeper={RosterService.toggleKeeper}
                  position={currentPlayer.position}
                />;
      })
    }

    getPlayersFromDB = () => {
      axios.get('http://localhost:5000/owner/')
          .then(response => {
            const { name } = this.props.match.params
            const owner = response.data.find(currentOwner => name === currentOwner.name);
            axios.get('http://localhost:5000/player/')
            .then(response => {
                const player = response.data.filter(player => player.owner === owner._id)
                  .sort((a, b) => (a.position > b.position || b.position === Constants.TE) ? 1 : -1);
                this.setState({
                  owner,
                  roster: player,
                });
            })
            .catch((error) => {
              console.log(error);
            })
          })
          .catch((error) => {
            console.log(error);
          })
    }
}

