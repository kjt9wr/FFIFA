import React, { Component } from 'react'
import axios from 'axios';


const OwnerDisplay = props => (
 <div>
    <h2>{props.name}'s Roster </h2>
    <h3>Max Cap: {props.cap}</h3>
    <h5 style={{ color: props.offender ? 'red' : 'green'}}>{luxaryText(props.offender)} {props.luxaryGainorLoss}</h5>
    <h5>Remaining: {props.remaining}</h5>
 </div>
)

const luxaryText = (offender) => offender ? "Penalty Fee: " : "Cap Gained: ";


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
          offender: false
        };
    }

    // Get Owner from DB
    componentDidMount = () => {
        axios.get('http://localhost:5000/owner/')
          .then(response => {
            const { name } = this.props.match.params
            const owner = response.data.find(curruser => name === curruser.name);
           
            axios.get('http://localhost:5000/player/')
            .then(response => {
              const player = response.data.filter(player => player.owner === owner._id);
              console.log(player)
 
               // Set State
          this.setState({
            owner,
            roster: player,
          });
            })
            .catch((error) => {
              console.log(error);
            })
            /*
            const others = response.data.filter(curruser => name !== curruser.name).map(currentOwner => ({
                name: currentOwner.name,
                penaltyFee: this.calcPenaltyFee(this.calcKeepPrice(currentOwner.roster), this.calcLuxaryLine(currentOwner.cap[0]))
              })); 
            const penaltyFeesArr = others.filter(owner => owner.penaltyFee > 0);

            // current owner
            const penaltyFee = this.calcPenaltyFee(this.calcKeepPrice(owner.roster), this.calcLuxaryLine(owner.cap[0]));

            // calculate reward for non-offenders of luxary tax
            const numOfOffenders = penaltyFeesArr.length + (penaltyFee > 0 ? 1 : 0);
            const totalPot = penaltyFeesArr.reduce((acc, owner) => acc + owner.penaltyFee, 0) + penaltyFee;
            const reward = Math.trunc(totalPot/(12-numOfOffenders));
*/
           

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

    calcLuxaryLine = (cap) =>  Math.trunc(cap*0.55);

    calcKeepPrice = (roster) =>  roster.filter(keptPlayer => keptPlayer.keep).reduce((acc, player) => acc + player.price, 0);

    calcPenaltyFee = (keepPrice, luxLine) => {
      let penaltyFee = keepPrice - luxLine;
      return penaltyFee > 0 ? penaltyFee: 0;
    }


    changeKeeper = (e) => {
    // TODO: validation

      const newKeep = {  "keep": e.target.checked  }
      axios.post('http://localhost:5000/owner/update/' + this.state.owner._id + "/" + e.target.id, newKeep)
      .then(res => console.log(res.data));
      window.location.reload();
    }

    // return JSX of Owner and cap info
    ownerInfo = () => {
      const keepPrice = this.calcKeepPrice(this.state.roster);
      const penaltyFee = this.calcPenaltyFee(keepPrice, this.state.luxLine);
      const luxaryGainorLoss = penaltyFee > 0 ? penaltyFee *-1 : this.state.reward
      const capRemaining = this.state.owner.cap[0] - keepPrice + luxaryGainorLoss;
      return <OwnerDisplay name={this.state.owner.name} cap = {this.state.owner.cap[0]} 
            offender = {this.state.offender} luxaryGainorLoss = {Math.abs(luxaryGainorLoss)} remaining = {capRemaining}/>;
    }

    
}

