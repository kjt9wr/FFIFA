import React from 'react';
import * as RosterService from '../../Services/RosterService';

const OwnerDisplay = (props) => {
   const {owner, roster, franchisePrices} = props;
   const taxLine = RosterService.calculateLuxaryTaxLine(owner.cap[3]);
   const keepPrice = RosterService.calculateTotalKeeperPrice(roster, franchisePrices);
   const penaltyFee = RosterService.calculatePenaltyFee(roster, franchisePrices, owner.cap[3]);
   const luxaryGainorLoss = penaltyFee > 0 ? penaltyFee *-1 : 0;
   const capRemaining = props.owner.cap[3] - keepPrice + luxaryGainorLoss;
   const isOffender = keepPrice > taxLine;

   return (
      <div>
         <h1 class="text-center">{owner.name}'s Roster </h1>
         <h5>Max Cap: {owner.cap[3]}</h5>
         <h5>Luxary Tax Line: {taxLine}</h5>
         <h5> Total Price of Kept Players: {keepPrice} </h5>
         <h5>Budget before violating luxary tax: {taxLine - keepPrice}</h5>
         <h5 style={{ color: isOffender ? 'red' : 'green'}}>
            {RosterService.getLuxaryText(isOffender)} {luxaryGainorLoss}
         </h5>
         <h5>Remaining: {capRemaining}</h5>
      </div>
   )
}

export default OwnerDisplay;