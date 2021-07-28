import * as SuperMaxService from './SuperMaxService';

export const determineFinalPriceOfPlayer = (player, franchisePrices) => {
  if (!player.franchise) {
    return pickSuperMaxOrKeeperPrice(player);
  } else {
    if(!franchisePrices) {
      return 0;
    }
    switch(player.position) {
      case 'QB':
          return franchisePrices.qb;
      case 'RB':
          return franchisePrices.rb;
      case 'WR':
          return franchisePrices.wr;
      default:
          return franchisePrices.te;
      }
  }
}

export const pickSuperMaxOrKeeperPrice = (player) => {
  if (player.superMax > 0) {
    return SuperMaxService.calculateSuperMaxPrice2021(player.superMax);
  }
  else {
    return player.price;
  }
}

export const filterKeepersByPosition = (keptPlayers, position) => {
  return keptPlayers.filter(player => player.position === position && player.keep === true);
}

