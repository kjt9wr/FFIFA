import React from 'react';
import * as RosterService from '../../Services/RosterService';

const OwnerDisplay = props => (
   <div>
       <h1 class="text-center">{props.name}'s Roster </h1>
       <h5>Max Cap: {props.cap}</h5>
       <h5>Luxary Tax Line: {props.taxLine}</h5>
       <h5> Total Price of Kept Players: {props.keepPrice} </h5>
       <h5>Budget before violating luxary tax: {props.taxLine - props.keepPrice}</h5>
       <h5 style={{ color: props.isOffender ? 'red' : 'green'}}>
          {RosterService.getLuxaryText(props.isOffender)} {props.luxaryGainorLoss}
       </h5>
       <h5>Remaining: {props.remaining}</h5>
   </div>
)

export default OwnerDisplay;