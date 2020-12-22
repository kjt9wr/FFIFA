import React, { Component } from 'react'
import PositionTag from './reusable/PositionTag'
import * as FranchiseService from '../Services/FranchiseService';
import * as Constants from '../Utilities/Constants';

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            franchiseInfo: {}
        };
    }
    componentDidMount = () => {
        this.getFranchiseInformation();
    }

    render() {
        const { franchiseInfo } = this.state; 
        return (
            <div >
               <h1 style={{ textAlign: "center"}}>Franchise Tag Prices </h1> 
               <div style={{ display: 'flex' }}>

               <PositionTag keptPlayers = {franchiseInfo.keptQBs} position = {Constants.QB} tagPrice = {franchiseInfo.qbFranchisePrice} />
               <PositionTag keptPlayers = {franchiseInfo.keptRBs} position = {Constants.RB} tagPrice = {franchiseInfo.rbFranchisePrice} />
               <PositionTag keptPlayers = {franchiseInfo.keptWRs} position = {Constants.WR} tagPrice = {franchiseInfo.wrFranchisePrice} />
               <PositionTag keptPlayers = {franchiseInfo.keptTEs} position = {Constants.TE} tagPrice = {franchiseInfo.teFranchisePrice} />
               </div>
            </div>
        )
    }

    getFranchiseInformation = async () => {
        const franchiseInfo = await FranchiseService.getFranchiseTags();
        this.setState({
            franchiseInfo
        })
    }
}

