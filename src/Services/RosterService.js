import React from 'react';
import * as DatabaseService from './DatabaseService';
import * as FFIFAService from './FFIFAService';

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
