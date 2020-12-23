import React, { Component } from 'react';
import * as RosterService from '../../Services/RosterService'

export class PositionTag extends Component {
    render() {
        let tableOfKeptPlayers = "";
        if (this.props.keptPlayers) {
            tableOfKeptPlayers = this.props.keptPlayers.map(player => 
                <tr key={player._id}>
                    <td> {player.name}</td>
                    <td>{RosterService.pickSuperMaxOrKeeperPrice(player)}</td>
                </tr>
            );
        }

        return (
            <div style={{ flex: '1'}}>
                <h2> {this.props.position} franchise price: {this.props.tagPrice} </h2>
               <table>
                   <thead>
                        <th>Kept Player</th>
                        <th>Original Price</th>
                   </thead>
                   <tbody>
                   {tableOfKeptPlayers}
                   </tbody>
                </table>
            </div>
        )
    }
}

export default PositionTag
