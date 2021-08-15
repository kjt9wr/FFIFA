import React, { useState, useEffect } from 'react';
import * as FFIFAService from '../../Services/FFIFAService'
import * as RosterService from '../../Services/RosterService';

const PlayerRow = (props) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const getFinalPrice = async (player) => {
      const finalPrice = FFIFAService.determineFinalPriceOfPlayer(player, props.franchisePrices)
      setPrice(finalPrice);
    }

    getFinalPrice(props.player);
  }, [props]);

    const { player } = props
    return (
    <tr className="customRow">
      <td>{player.position}</td>
      <td> {player.name} </td>
      <td> {price} </td>
      <td> <input type='checkbox' id={props.id} key={props.id} onChange={props.toggleKeeper} checked={props.keep}/> </td>
      <td>{player.franchise ? 'Tagged' : ''}</td>
      <td> {RosterService.getSuperMaxText(player.superMax)} </td>
    </tr>
   )
}

export default PlayerRow;
