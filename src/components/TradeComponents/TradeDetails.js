import React from 'react';
import * as Constants from '../../Utilities/Constants';

const TradeDetails = (props) => {
  const displayPlayers = (players) => {
    return(players.map(currentPlayerID => {
      return( <div>{Constants.playersByID[currentPlayerID]}</div> );
    }));
  }

  const displayCap = (capObject) => {
    if (capObject) {
      return (Object.entries(capObject).map((capInYear) => {
        return ( <div> ${capInYear[1]} in {capInYear[0]} </div> ) ;
      }));
    }
  }

  const displayAdditionalNotes = (notes) => {
    return notes ? <div><h5>Additional Notes: </h5> <p>{notes}</p></div> : <></>;
  }

  const { currentTrade } = props

  return (
    <div class="d-flex flex-row card p-1 my-2">
      <div class="col-md-4">
        <h5>{currentTrade.owner1} Receives: </h5>
            {displayPlayers(currentTrade.owner1_rec.players)}
            {displayCap(currentTrade.owner1_rec.cap)}
      </div>
      <div class="col-md-4">
        <h5>{currentTrade.owner2} Receives: </h5>
            {displayPlayers(currentTrade.owner2_rec.players)}
            {displayCap(currentTrade.owner2_rec.cap)}
      </div>
      <div class="col-md-4">
        {displayAdditionalNotes(currentTrade.trade_notes)}
      </div>
    </div>
  )
}

export default TradeDetails;
