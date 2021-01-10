import React from 'react';
import * as RosterService from '../../Services/RosterService';

const OwnerDisplay = props => (
    <div>
       <h1>{props.name}'s Roster </h1>
       <h3>Max Cap: {props.cap}</h3>
       <h5>Luxary Tax Line: {props.taxLine}</h5>
       <h5> Total Price of Kept Players: {props.keepPrice} </h5>
       <h5 style={{ color: props.isOffender ? 'red' : 'green'}}>
          {RosterService.getLuxaryText(props.isOffender)} {props.luxaryGainorLoss}
       </h5>
       <h3>Remaining: {props.remaining}</h3>
    </div>
   )

   export default OwnerDisplay;