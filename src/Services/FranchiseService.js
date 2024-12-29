import { fetchKeptPlayers } from "../api/apiService";
import * as Constants from "../Utilities/Constants";
import * as FFIFAService from "./FFIFAService";

export const getFranchiseTagDTO = async () => {
  const keptPlayers = await fetchKeptPlayers();

  const keptQBs = keptPlayers.data
    .filter((player) => player.position === Constants.QB)
    .sort((a, b) => b.price - a.price);
  const keptRBs = keptPlayers.data
    .filter((player) => player.position === Constants.RB)
    .sort((a, b) => b.price - a.price);
  const keptWRs = keptPlayers.data
    .filter((player) => player.position === Constants.WR)
    .sort((a, b) => b.price - a.price);
  const keptTEs = keptPlayers.data
    .filter((player) => player.position === Constants.TE)
    .sort((a, b) => b.price - a.price);
  replaceKeeperPriceWithSuperMax(keptRBs);
  const qbFranchisePrice = calculateFranchisePriceFromKeptPlayers(keptQBs);
  const rbFranchisePrice = calculateFranchisePriceFromKeptPlayers(keptRBs);
  const wrFranchisePrice = calculateFranchisePriceFromKeptPlayers(keptWRs);
  const teFranchisePrice = calculateFranchisePriceFromKeptPlayers(keptTEs);

  return {
    qbFranchisePrice,
    keptQBs,
    rbFranchisePrice,
    keptRBs,
    wrFranchisePrice,
    keptWRs,
    teFranchisePrice,
    keptTEs,
  };
};

const replaceKeeperPriceWithSuperMax = (keptRBs) => {
  for (const rb of keptRBs) {
    rb.price = FFIFAService.pickSuperMaxOrKeeperPrice(rb);
  }
  return keptRBs.sort((a, b) => b.price - a.price);
};

const calculateFranchisePriceFromKeptPlayers = (playerList) => {
  const priceOfMostExpensive = playerList
    .sort((a, b) => b.price - a.price)
    .slice(0, 5)
    .reduce((acc, player) => acc + player.price, 0);
  return Math.trunc(priceOfMostExpensive / 5);
};
