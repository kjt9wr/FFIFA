import React from 'react'
import * as DatabaseService from './DatabaseService';
import * as FFIFAService from './FFIFAService'

export const calculateLuxaryTaxLine = (cap) =>  Math.trunc(cap*0.55);

export const calculateTotalKeeperPrice = (roster) => {
  return roster.filter(keptPlayer => keptPlayer.keep)
    .reduce((acc, player) => acc + FFIFAService.determineFinalPriceOfPlayer(player), 0);
}

export const calculatePenaltyFee = (totalKeepPrice, luxaryTaxLine) => {
  const penaltyFee = totalKeepPrice - luxaryTaxLine;
  return penaltyFee > 0 ? penaltyFee: 0;
}

export const toggleKeeper = async (e) => {
  // TODO: validation
    const newKeep = {  'keep': e.target.checked  }
    await DatabaseService.updateKeeper(e.target.id, newKeep)
    window.location.reload();
  }

export const getLuxaryText = (isOffender) => isOffender ? 'Penalty Fee: ' : 'Cap Gained: ';

export const getSuperMaxText = (contractInYears) => {
  return contractInYears > 0 ? (<b> {contractInYears} Year Deal </b>) : '';
}
