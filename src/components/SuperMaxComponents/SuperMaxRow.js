import React from 'react';

const SuperMaxRow = props => (
    <tr className="customRow">
      <td>{props.player}</td>
      <td> {props.owner}</td>
      <td> {props.plan} </td>
      <td> {props.price} </td>
    </tr>
  )

  export default SuperMaxRow;