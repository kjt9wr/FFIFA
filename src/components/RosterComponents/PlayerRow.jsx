import React from 'react';
import * as RosterService from '../../Services/RosterService';


const PlayerRow = props => (
    <tr>
      <td>{props.player.position}</td>
      <td> {props.player.name} </td>
      <td> {RosterService.determineFinalPriceOfPlayer(props.player)} </td>
      <td> <input type='checkbox' id={props.id} key={props.id} onChange={props.toggleKeeper} checked={props.keep}/> </td>
      <td></td>
      <td> {RosterService.getSuperMaxText(props.player.superMax)} </td>
    </tr>
  )

  export default PlayerRow;