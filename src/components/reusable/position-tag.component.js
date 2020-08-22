/* 
    Component that displays the team number, the randomly generated character of individual team, and a history table
*/
import React, { Component } from 'react'

export class PositionTag extends Component {

    render() {
    let table = "";

        if(this.props.keptPlayers){
            console.log("help me")
             table = this.props.keptPlayers.map(player => 
                <tr key={player._id}>
                    <td> {player.name}</td>
                    <td>{player.price}</td>
                </tr>
            );
        }
        


        return (
            <div style={{ flex: '1'}}>
                <h2> {this.props.position} keeper price: {this.props.tagPrice} </h2>
               <table>
                   <thead>
                        <th>Player Name</th>
                        <th>Price</th>
                   </thead>
                   <tbody>
                   {table}
                   </tbody>
              
                   </table>
                
            </div>
        )
    }
}

export default PositionTag
