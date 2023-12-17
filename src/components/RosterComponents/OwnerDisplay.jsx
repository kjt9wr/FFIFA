import React from 'react';
import * as RosterService from '../../Services/RosterService';

const OwnerDisplay = (props) => {
   const {owner, roster, franchisePrices} = props;
   const MAX_CAP = owner.cap[4];
   const TAX_LINE = RosterService.calculateLuxaryTaxLine(MAX_CAP);
   const keepPrice = RosterService.calculateTotalKeeperPrice(roster, franchisePrices);
   const penaltyFee = RosterService.calculatePenaltyFee(roster, franchisePrices, MAX_CAP);
   const luxaryGainorLoss = penaltyFee > 0 ? penaltyFee *-1 : 0;
   const capRemaining = MAX_CAP - keepPrice + luxaryGainorLoss;
   const isOffender = keepPrice > TAX_LINE;

   return (
      <div>
         <h1 class="text-center">{owner.name}'s Roster </h1>
         <h5>Max Cap: {MAX_CAP}</h5>
         <h5>Luxary Tax Line: {TAX_LINE}</h5>
         <h5>Total Price of Kept Players: {keepPrice} </h5>
         <h5>Budget before violating luxary tax: {TAX_LINE - keepPrice}</h5>
         <h5 style={{ color: isOffender ? 'red' : 'green'}}>
            {RosterService.getLuxaryText(isOffender)} {luxaryGainorLoss}
         </h5>
         <h5>Remaining: {capRemaining}</h5>
      </div>
   )
}

export default OwnerDisplay;