import React, { Component } from 'react';
import * as Constants from '../../Utilities/Constants';

export default class TradeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
}
componentDidMount = () => {
}
  render() {
    const { currentTrade } = this.props
    return (
        <div>
            <h2>{Constants.ownersByID[currentTrade.owner1_id]} Receives: </h2>
            {this.displayPlayers(currentTrade.owner1_rec.players)}
            {currentTrade.owner1_rec.cap[0]}, 
            {currentTrade.owner1_rec.cap[1]},
            {currentTrade.owner1_rec.cap[2]}
            <h2>{Constants.ownersByID[currentTrade.owner2_id]} Receives: </h2>
            {this.displayPlayers(currentTrade.owner2_rec.players)}
            {currentTrade.owner2_rec.cap[0]},
            {currentTrade.owner2_rec.cap[1]},
            {currentTrade.owner2_rec.cap[2]}
            <h2>Additional Notes: </h2> <h5>{currentTrade.trade_notes}</h5>
            ------------------
        </div>
    )
  }

  displayPlayers = (players) => {
      return(
          players.map(currentPlayerID => {
            return(
                <b>{Constants.playersByID[currentPlayerID]}</b>
            )
          }
            )
      )
  }

}