import React, { Component } from 'react';
import * as FFIFAService from '../../Services/FFIFAService'
import * as RosterService from '../../Services/RosterService';

export default class PlayerRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price : 0,
    };
}
componentDidMount = () => {
  this.getFinalPrice(this.props.player);
}
  render() {
    const { player } = this.props
    return (
    <tr className="customRow">
      <td>{player.position}</td>
      <td> {player.name} </td>
      <td> {this.state.price} </td>
      <td> <input type='checkbox' id={this.props.id} key={this.props.id} onChange={this.props.toggleKeeper} checked={this.props.keep}/> </td>
      <td>{player.franchise ? 'Tagged' : ''}</td>
      <td> {RosterService.getSuperMaxText(this.props.player.superMax)} </td>
    </tr>
   )
  }

  getFinalPrice = async (player) => {
    const price = FFIFAService.determineFinalPriceOfPlayer(player, this.props.franchisePrices)
    this.setState({
      price
    });
  }
}