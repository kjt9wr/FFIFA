import React from 'react'
import * as DatabaseService from './DatabaseService';
import * as SuperMaxService from './SuperMaxService';

export const determineFinalPriceOfPlayer = (player) => {
  // TODO : Franchise Tag
  return pickSuperMaxOrKeeperPrice(player);
}

export const pickSuperMaxOrKeeperPrice = (player) => {
  if (player.superMax > 0) {
    return SuperMaxService.calculateSuperMaxPrice2021(player.superMax);
  }
  else {
    return player.price;
  }
}

export const calculateLuxaryTaxLine = (cap) =>  Math.trunc(cap*0.55);

export const calculateTotalKeeperPrice = (roster) => {
  return roster.filter(keptPlayer => keptPlayer.keep)
    .reduce((acc, player) => acc + determineFinalPriceOfPlayer(player), 0);
}

export const calculatePenaltyFee = (totalKeepPrice, luxaryTaxLine) => {
  const penaltyFee = totalKeepPrice - luxaryTaxLine;
  return penaltyFee > 0 ? penaltyFee: 0;
}

export const filterKeepersByPosition = (keptPlayers, position) => {
  return keptPlayers.filter(player => player.position === position && player.keep === true);
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
