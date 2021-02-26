import * as SuperMaxService from './SuperMaxService';
// eslint-disable-next-line
import * as FranchiseService from './FranchiseService';

export const determineFinalPriceOfPlayer =  (player) => {
    // TODO : Fix Franchise Tag 
    return pickSuperMaxOrKeeperPrice(player)

  /*
  if (!player.franchise) {
    return pickSuperMaxOrKeeperPrice(player)
  }
  else {
      return await FranchiseService.calculateFranchiseTagForPosition(player.position);
  }
  */
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

