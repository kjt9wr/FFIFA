import * as SuperMaxService from './SuperMaxService';

export const determineFinalPriceOfPlayer = (player, franchisePrices) => {
  switch(player.keeperClass) {
    case 2:
      return getFranchisePrice(player.position, franchisePrices);
    case 3:
      return SuperMaxService.calculateSuperMaxPrice(player.superMaxPlan, player.superMaxYear);
    case 4: 
      return getFranchisePrice(player.position, franchisePrices);
    default:
      return player.price;
  }
}

const getFranchisePrice = (playerPosition, prices) => {
  switch(playerPosition) {
    case 'QB':
        return prices.qb;
    case 'RB':
        return prices.rb;
    case 'WR':
        return prices.wr;
    default:
        return prices.te;
    }
}

export const pickSuperMaxOrKeeperPrice = (player) => {
  if (player.superMaxPlan > 0) {
    return SuperMaxService.calculateSuperMaxPrice(player.superMaxPlan, player.superMaxYear);
  } else {
    return player.price;
  }
}

export const filterKeepersByPosition = (keptPlayers, position) => {
  return keptPlayers.filter(player => player.position === position && player.keep === true);
}
