import React from 'react';


const PlayerRow = props => (
    <tr>
      <td>{props.position}</td>
      <td> {props.name} </td>
      <td> {props.price} </td>
      <td> <input type='checkbox' id={props.id} key={props.id} onChange={props.toggleKeeper} checked={props.keep}/> </td>
      <td></td>
      <td></td>
    </tr>
  )

  export default PlayerRow;