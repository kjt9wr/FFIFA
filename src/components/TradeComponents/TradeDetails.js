import React from 'react';
import * as Constants from '../../Utilities/Constants';

const TradeDetails = (props) => {
  const displayPlayers = (players) => {
    return(players.map(currentPlayerID => {
      return( <div>{Constants.playersByID[currentPlayerID]}</div> );
    }));
  }

  const displayCap = (capArray) => {
    return (capArray.map((capInYear, index) => {
        return capInYear > 0
        ? ( <div> ${capInYear} in {index + 2020} </div> )
        : <></>;
    }));
  }

  const displayAdditionalNotes = (notes) => {
    return notes ? <div><h5>Additional Notes: </h5> <p>{notes}</p></div> : <></>;
  }

  const { currentTrade } = props

  return (
    <div class="d-flex flex-row card p-1 my-2">
      <div class="col-md-4">
        <h5>{Constants.ownersByID[currentTrade.owner1_id]} Receives: </h5>
            {displayPlayers(currentTrade.owner1_rec.players)}
            {displayCap(currentTrade.owner1_rec.cap)}
      </div>
      <div class="col-md-4">
        <h5>{Constants.ownersByID[currentTrade.owner2_id]} Receives: </h5>
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
