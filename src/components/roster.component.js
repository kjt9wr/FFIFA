import React, { Component } from 'react'
import axios from 'axios';


const OwnerDisplay = props => (
 <div>
    <h2>{props.name} </h2>
    <h3>{props.cap}</h3>
 </div>
)

const Player = props =>(
  <tr>
    <td> {props.name} </td>
    <td> {props.price} </td>
    <td> {props.keep }</td>
  </tr>
)

export default class Roster extends Component {
    constructor(props) {
        super(props);
        this.state = {
          owner: {
            name:"",
            cap: [0,0,0],
          },
          roster: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
        };
      }
      
    // Get Owner from DB
    componentDidMount() {
        axios.get('http://localhost:5000/owner/')
          .then(response => {
            const { name } = this.props.match.params
            const owner = response.data.find(curruser => name === curruser.name);
            this.setState({owner})
            this.setState({roster: owner.roster})
          })
          .catch((error) => {
            console.log(error);
          })
      }

    render() {
        return (
            <div className="container">
              {this.ownerInfo()}
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>Player</th>
                    <th>Price</th>
                    <th>Keep</th>
                  </tr>
                </thead>
                <tbody>
                  {this.PlayerInfo()}
                </tbody>
              </table>  
            </div>
        )
    }

    PlayerInfo() {
      return this.state.roster.map(currentPlayer => {
        const keep = currentPlayer.keep ? "Yes" : "no"
        return <Player name={currentPlayer.name} price={currentPlayer.price} keep={keep}/>;
      })
    }
    ownerInfo() {
        return <OwnerDisplay name={this.state.owner.name} cap = {this.state.owner.cap[0]} roster = {this.state.roster}/>;
    }
}

