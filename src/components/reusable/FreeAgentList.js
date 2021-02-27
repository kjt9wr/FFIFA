import React, { Component } from 'react';

export default class FreeAgentList extends Component {
    render() {
        let tableOfKeptPlayers = "";
        if (this.props.keptPlayers) {
          tableOfKeptPlayers = this.props.keptPlayers.map(player => 
            <tr key={ player._id }>
              <td> { player.name }</td>
            </tr>
          );
        }

        return (
            <div style={{ flex: '1'}}>
                <h3> {this.props.position} </h3>
               <table>
                   <tbody>
                   {tableOfKeptPlayers}
                   </tbody>
                </table>
            </div>
        )
    }
}
