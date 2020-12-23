import React, { Component } from 'react'
import * as DatabaseService from '../../Services/DatabaseService';
import * as SuperMaxService from '../../Services/SuperMaxService'
import SuperMaxRow from './SuperMaxRow';

export default class SuperMax extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ownersList: [{}],
          superPlayers: [{}],
        };
    }

    componentDidMount = () => {
        this.getSuperMaxPlayers();
      }
    render() {
        return (
            <div className="container">
               <p>Players on SuperMax</p>
               <table className='table'>
                <thead className='thead-light'>
                  <tr>
                    <th>Player</th>
                    <th>Owner</th>
                    <th>Plan</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                    {this.renderSuperPlayerTable()}
                </tbody>
              </table>
            </div>
        )
    }


    getSuperMaxPlayers = async () => {
        const ownersList = await DatabaseService.getOwnersFromDB();
        const players = await DatabaseService.getPlayersFromDB();
        const superPlayers = players.filter(player => player.superMax > 0);
        this.setState({
            ownersList, superPlayers
        })
    }

    renderSuperPlayerTable = () => {
        return this.state.superPlayers.map(currentPlayer => {
            const currentPlayersOwner = this.state.ownersList
              .find(owner => currentPlayer.owner === owner._id);
            const price = SuperMaxService.calculateSuperMaxPrice2021(currentPlayer.superMax);
            return <SuperMaxRow 
              player={currentPlayer.name}
              owner={currentPlayersOwner.name}
              plan={currentPlayer.superMax}
              price={price}
            />;
          })
      }
}

