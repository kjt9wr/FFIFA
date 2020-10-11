import React, { Component } from 'react'
import axios from 'axios';


const OwnerDisplay = props => (
 <div>
    <h1>{props.name}'s Roster </h1>
    <h3>Max Cap: {props.cap}</h3>
    <h5>Luxary Tax Line: {props.taxLine}</h5>
    <h5 style={{ color: props.isOffender ? 'red' : 'green'}}>{luxaryText(props.isOffender)} {props.luxaryGainorLoss}</h5>
    <h3>Remaining: {props.remaining}</h3>
 </div>
)

const luxaryText = (isOffender) => isOffender ? "Penalty Fee: " : "Cap Gained: ";


const PlayerRow = props => (
  <tr>
    <td>{props.position}</td>
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
          luxLine: 0,
          reward: 0,
          isOffender: false
        };
    }

    // Get Owner/Players from DB
    componentDidMount = () => {
        axios.get('http://localhost:5000/owner/')
          .then(response => {
            const { name } = this.props.match.params
            const owner = response.data.find(curruser => name === curruser.name);
           
            axios.get('http://localhost:5000/player/')
            .then(response => {
                const player = response.data.filter(player => player.owner === owner._id).sort((a, b) => (a.position > b.position || b.position == "TE") ? 1 : -1);
 
                // Set State
                this.setState({
                  owner,
                  roster: player,
                });
            })
            .catch((error) => {
              console.log(error);
            })

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
                    <th>Position</th>
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
        return <PlayerRow name={currentPlayer.name} key={currentPlayer._id} id={currentPlayer._id} price={currentPlayer.price} keep={keep} changeKeeper={this.changeKeeper} position={currentPlayer.position}/>;
      })
    }


    /*
      Helper Functions
    */
    calcLuxaryLine = (cap) =>  Math.trunc(cap*0.55);

    calcKeepPrice = (roster) =>  roster.filter(keptPlayer => keptPlayer.keep).reduce((acc, player) => acc + player.price, 0);

    calcPenaltyFee = (keepPrice, luxLine) => {
      let penaltyFee = keepPrice - luxLine;
      return penaltyFee > 0 ? penaltyFee: 0;
    }


    changeKeeper = (e) => {
    // TODO: validation

      const newKeep = {  "keep": e.target.checked  }
      axios.post('http://localhost:5000/player/update/' + e.target.id, newKeep)
      .then(res => console.log(res.data));
      window.location.reload();
    }

    // return JSX of Owner and cap info
    ownerInfo = () => {
      const taxLine = this.calcLuxaryLine(this.state.owner.cap[1]);
      const keepPrice = this.calcKeepPrice(this.state.roster);
      const isOffender = keepPrice > taxLine;
      const penaltyFee = this.calcPenaltyFee(keepPrice, taxLine);

      const luxaryGainorLoss = penaltyFee > 0 ? penaltyFee *-1 : this.state.reward;
      const capRemaining = this.state.owner.cap[1] - keepPrice + luxaryGainorLoss;

      return <OwnerDisplay name={this.state.owner.name} cap = {this.state.owner.cap[1]} 
            isOffender = {isOffender} luxaryGainorLoss = {Math.abs(luxaryGainorLoss)} remaining = {capRemaining}
            taxLine = {taxLine}
            />;
    }

    
}

