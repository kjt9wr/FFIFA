import React, { Component } from 'react'
import PositionTag from './reusable/PositionTag'
import * as FranchiseService from '../Services/FranchiseService';
import * as Constants from '../Utilities/Constants';

export default class FranchiseTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            franchiseDTO: {}
        };
    }
    componentDidMount = () => {
        this.getFranchiseInformation();
    }

    render() {
        const { franchiseDTO } = this.state; 
        return (
            <div>
               <h2 class="text-center"> Franchise Tag Prices </h2> 
               <div class="d-flex pl-4">

               <PositionTag keptPlayers = {franchiseDTO.keptQBs} position = {Constants.QB} tagPrice = {franchiseDTO.qbFranchisePrice} />
               <PositionTag keptPlayers = {franchiseDTO.keptRBs} position = {Constants.RB} tagPrice = {franchiseDTO.rbFranchisePrice} />
               <PositionTag keptPlayers = {franchiseDTO.keptWRs} position = {Constants.WR} tagPrice = {franchiseDTO.wrFranchisePrice} />
               <PositionTag keptPlayers = {franchiseDTO.keptTEs} position = {Constants.TE} tagPrice = {franchiseDTO.teFranchisePrice} />
               </div>
            </div>
        )
    }

    getFranchiseInformation = async () => {
        const franchiseDTO = await FranchiseService.getFranchiseTagDTO();
        this.setState({
            franchiseDTO
        })
        
        this.props.updateTagPrices(FranchiseService.getFranchisePrices(franchiseDTO));
    }
}

