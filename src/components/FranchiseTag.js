import React, { useState, useEffect } from 'react'
import PositionTag from './reusable/PositionTag'
import * as FranchiseService from '../Services/FranchiseService';
import * as Constants from '../Utilities/Constants';

const FranchiseTag = () => {
  const [franchiseInfo, setFranchiseInfo] = useState({});

  useEffect(() => {
    const getFranchiseInformation = async () => {
      const franchiseDTO = await FranchiseService.getFranchiseTagDTO();
      setFranchiseInfo(franchiseDTO)
    }

    getFranchiseInformation();
  }, [])

  return (
    <div>
      <h2 class="text-center"> Franchise Tag Prices </h2> 
        <div class="d-flex pl-4">
          <PositionTag keptPlayers = {franchiseInfo.keptQBs} position = {Constants.QB} tagPrice = {franchiseInfo.qbFranchisePrice} />
          <PositionTag keptPlayers = {franchiseInfo.keptRBs} position = {Constants.RB} tagPrice = {franchiseInfo.rbFranchisePrice} />
          <PositionTag keptPlayers = {franchiseInfo.keptWRs} position = {Constants.WR} tagPrice = {franchiseInfo.wrFranchisePrice} />
          <PositionTag keptPlayers = {franchiseInfo.keptTEs} position = {Constants.TE} tagPrice = {franchiseInfo.teFranchisePrice} />
        </div>
    </div>
  )
}

export default FranchiseTag;
