import { fetchKeptPlayers } from "../api/api.service";
import { FranchiseTagDTO, Player } from "../interfaces/interfaces";
import { POSITION } from "../utilities/enumerations";
import * as FFIFAService from "./ffifa.service";

export const getFranchiseTagDTO = async () => {
  const keptPlayers = await fetchKeptPlayers();
  const keptQBs = keptPlayers.data
    .filter((player: Player) => player.position === POSITION.QB)
    .sort((a: Player, b: Player) => b.price - a.price);
  const keptRBs = keptPlayers.data
    .filter((player: Player) => player.position === POSITION.RB)
    .sort((a: Player, b: Player) => b.price - a.price);
  const keptWRs = keptPlayers.data
    .filter((player: Player) => player.position === POSITION.WR)
    .sort((a: Player, b: Player) => b.price - a.price);
  const keptTEs = keptPlayers.data
    .filter((player: Player) => player.position === POSITION.TE)
    .sort((a: Player, b: Player) => b.price - a.price);
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

const replaceKeeperPriceWithSuperMax = (keptRBs: Player[]) => {
  for (const rb of keptRBs) {
    rb.price = FFIFAService.pickSuperMaxOrKeeperPrice(rb);
  }
  return keptRBs.sort((a, b) => b.price - a.price);
};

const calculateFranchisePriceFromKeptPlayers = (playerList: Player[]) => {
  const priceOfMostExpensive = playerList
    .sort((a, b) => b.price - a.price)
    .slice(0, 5)
    .reduce((acc, player) => acc + player.price, 0);
  return Math.trunc(priceOfMostExpensive / Math.min(playerList.length, 5));
};

export const formatFranchisePrices = (franchiseDTO: FranchiseTagDTO) => {
  return {
    qb: franchiseDTO.qbFranchisePrice,
    rb: franchiseDTO.rbFranchisePrice,
    wr: franchiseDTO.wrFranchisePrice,
    te: franchiseDTO.teFranchisePrice,
  };
};
