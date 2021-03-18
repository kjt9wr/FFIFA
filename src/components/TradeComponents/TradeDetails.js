import React, { Component } from 'react';
import * as Constants from '../../Utilities/Constants';

export default class TradeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentTrade } = this.props
    return (
        <div class="d-flex flex-row card p-1 my-2">
            <div class="col-md-4">
                <h5>{Constants.ownersByID[currentTrade.owner1_id]} Receives: </h5>
                {this.displayPlayers(currentTrade.owner1_rec.players)}
                {this.displayCap(currentTrade.owner1_rec.cap)}
            </div>
            <div class="col-md-4">
                <h5>{Constants.ownersByID[currentTrade.owner2_id]} Receives: </h5>
                {this.displayPlayers(currentTrade.owner2_rec.players)}
                {this.displayCap(currentTrade.owner2_rec.cap)}
            </div>
            <div class="col-md-4">
                {this.displayAdditionalNotes(currentTrade.trade_notes)}
            </div>
        </div>
    )
  }

  displayPlayers = (players) => {
    return(players.map(currentPlayerID => {
      return( <div>{Constants.playersByID[currentPlayerID]}</div> )
    }))
  }

  displayCap = (capArray) => {
      // eslint-disable-next-line array-callback-return
      return(capArray.map((capInYear, index) => {
        if (capInYear > 0) {
          return( <div> ${capInYear} in {index + 2020} </div> )
        }
      }))
  }

  displayAdditionalNotes = (notes) => {
    return notes ? <div><h5>Additional Notes: </h5> <p>{notes}</p></div> : <></>;
  }
}