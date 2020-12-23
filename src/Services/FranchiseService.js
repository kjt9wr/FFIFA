import * as DatabaseService from './DatabaseService';
import * as FFIFAService from './FFIFAService';
import * as Constants from '../Utilities/Constants';

export const calculateFranchisePriceFromKeptPlayers = (playerList) => {
    const priceOfMostExpensive = playerList.slice(0,5).reduce((acc, player) => acc + player.price, 0)
    return Math.trunc(priceOfMostExpensive / 5);
  }

export const calculateFranchiseTagForPosition = async (position) => {
    const playerList = await DatabaseService.getPlayersFromDB();
    const keptPlayers = playerList.filter(player => player.keep === true);

    const keptByGivenPosition = keptPlayers.filter(player => player.position === position).sort((a,b) => b.price - a.price);

    replaceKeeperPriceWitSuperMax(keptByGivenPosition);
    return calculateFranchisePriceFromKeptPlayers(keptByGivenPosition);
}

export const getFranchiseTags = async () => {
    const playerList = await DatabaseService.getPlayersFromDB();
    const keptPlayers = playerList.filter(player => player.keep === true);

    const keptQBs = keptPlayers.filter(player => player.position === Constants.QB).sort((a,b) => b.price - a.price);
    const keptRBs = keptPlayers.filter(player => player.position === Constants.RB).sort((a,b) => b.price - a.price);
    const keptWRs = keptPlayers.filter(player => player.position === Constants.WR).sort((a,b) => b.price - a.price);
    const keptTEs = keptPlayers.filter(player => player.position === Constants.TE).sort((a,b) => b.price - a.price);
    replaceKeeperPriceWitSuperMax(keptRBs);

    const qbFranchisePrice = calculateFranchisePriceFromKeptPlayers(keptQBs);
    const rbFranchisePrice = calculateFranchisePriceFromKeptPlayers(keptRBs);
    const wrFranchisePrice = calculateFranchisePriceFromKeptPlayers(keptWRs);
    const teFranchisePrice = calculateFranchisePriceFromKeptPlayers(keptTEs);

    return { qbFranchisePrice, keptQBs, rbFranchisePrice, keptRBs,
        wrFranchisePrice, keptWRs, teFranchisePrice, keptTEs
    }
  }

  const replaceKeeperPriceWitSuperMax = (keptRBs) => {
    for(const rb of keptRBs) {
      rb.price = FFIFAService.pickSuperMaxOrKeeperPrice(rb);
    }
    return keptRBs.sort((a,b) => b.price - a.price);
  }