import React from 'react'
import * as DatabaseService from './DatabaseService';
import * as FranchiseService from './FranchiseService';
import * as FFIFAService from './FFIFAService'

export const calculateLuxaryTaxLine = (cap) =>  Math.trunc(cap*0.55);

export const calculateTotalKeeperPrice = (roster, franchisePrices) => {
  return roster.filter(keptPlayer => keptPlayer.keep)
    .reduce((acc, player) => acc + FFIFAService.determineFinalPriceOfPlayer(player, franchisePrices), 0);
}

export const calculatePenaltyFee = (roster, franchisePrices, maxCap) => {
  const penaltyFee = calculateTotalKeeperPrice(roster, franchisePrices) - calculateLuxaryTaxLine(maxCap);
  return penaltyFee > 0 ? penaltyFee: 0;
}

export const toggleKeeper = async (e) => {
  // TODO: validation
    const newKeep = {  'keep': e.target.checked  }
    await DatabaseService.updateKeeper(e.target.id, newKeep)
    window.location.reload();
  }

export const getLuxaryText = (isOffender) => isOffender ? 'Penalty Fee: ' : 'Cap Gained: ';

export const getSuperMaxText = (currentYear, plan) => {
  return plan > 0 ? (<b> Year {currentYear} in {plan} Year Deal </b>) : '';
}

export const positionSort = (list) => {
  return list.sort((a, b) => (a.position > b.position) ? 1 : -1);
}

export const updateOwnerLuxaryTax = async (roster, maxCap, name) => {
  const franchiseDTO = await FranchiseService.getFranchiseTagDTO();
  const franchises = FranchiseService.getFranchisePrices(franchiseDTO);

  const luxaryTaxDTO = {
    tax: calculatePenaltyFee(roster, franchises, maxCap)
  }

  DatabaseService.updateLuxaryTax(name, luxaryTaxDTO);
}