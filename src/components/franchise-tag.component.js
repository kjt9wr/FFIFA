import React, { Component } from 'react'
import PositionTag from './reusable/position-tag.component'
export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }
    render() {
        const {info} = this.props; 
        return (
            <div >
               <h1 style={{ textAlign: "center"}}>Franchise Tag Prices </h1> 
               <div style={{ display: 'flex' }}>
                
               <PositionTag keptPlayers = {info.keptQBs} position = "QB" tagPrice = {info.qbFranchisePrice} />
               <PositionTag keptPlayers = {info.keptRBs} position = "RB" tagPrice = {info.rbFranchisePrice}  />
               <PositionTag keptPlayers = {info.keptWRs} position = "WR" tagPrice = {info.wrFranchisePrice}  />
               <PositionTag keptPlayers = {info.keptTEs} position = "TE" tagPrice = {info.teFranchisePrice}  />
               </div>

            </div>
        )
    }
}

