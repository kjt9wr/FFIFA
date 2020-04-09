import React, { Component } from 'react'
import axios from 'axios';


const OwnerDisplay = props => (
 <div>
    <h2>{props.name}'s Roster </h2>
    <h3>Max Cap: {props.cap}</h3>
    <h5>Penalty Fee: {props.penaltyFee}</h5>

    <h5>Remaining: {props.remaining}</h5>
 </div>
)

const PlayerRow = props =>(
  <tr>
    <td> {props.name} </td>
    <td> {props.price} </td>
    <td> <input type="checkbox" id={props.id} key={props.id} onChange={props.changeKeeper} checked={props.keep}/> </td>
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
          roster: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
          luxLine: 0
        };
      }
      

      
    // Get Owner from DB
    componentDidMount = () => {
        axios.get('http://localhost:5000/owner/')
          .then(response => {
            const { name } = this.props.match.params
            const owner = response.data.find(curruser => name === curruser.name);
            this.setState({owner});
            this.setState({roster: owner.roster});
            this.calcLuxLine();
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

    //Generate jsx table of players
    PlayerInfo = () => {
      return this.state.roster.map(currentPlayer => {
        const keep = currentPlayer.keep ? "checked" : ""
        return <PlayerRow name={currentPlayer.name} key={currentPlayer._id} id={currentPlayer._id} price={currentPlayer.price} keep={keep} changeKeeper={this.changeKeeper}/>;
      })
    }

    calcLuxLine = () => {
      let line = Math.trunc(this.state.owner.cap[0]*0.55)
      this.setState({
        luxLine: line
      })
    }

    changeKeeper = (e) => {
      const newKeep = {  "keep": e.target.checked  }
      axios.post('http://localhost:5000/owner/update/' + this.state.owner._id + "/" + e.target.id, newKeep)
      .then(res => console.log(res.data));
      window.location.reload();
    }

    // return JSX of Owner and cap info
    ownerInfo = () => {
      const keepPrice = this.state.roster.filter(keptPlayer => keptPlayer.keep).reduce((acc, player) => acc + player.price, 0);
        let penaltyFee = keepPrice - this.state.luxLine;
        penaltyFee = penaltyFee > 0 ? penaltyFee: 0;
        let remaining = this.state.owner.cap[0] - keepPrice - penaltyFee;
        return <OwnerDisplay name={this.state.owner.name} cap = {this.state.owner.cap[0]} roster = {this.state.roster} penaltyFee = {penaltyFee} remaining = {remaining}/>;
    }

    
}

