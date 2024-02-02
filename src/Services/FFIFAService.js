import { calculateSuperMaxPrice } from "./SuperMaxService";
import { KEEPER_CLASS_ENUM } from "../Utilities/KeeperClassEnum";

export const determineFinalPriceOfPlayer = (player, franchisePrices) => {
  switch (player.keeperClass) {
    case 2:
      return getFranchisePrice(player.position, franchisePrices);
    case 3:
      return calculateSuperMaxPrice(player.superMax.plan, player.superMax.year);
    case 4:
      return getFranchisePrice(player.position, franchisePrices);
    default:
      return player.price;
  }
};

const getFranchisePrice = (playerPosition, prices) => {
  switch (playerPosition) {
    case "QB":
      return prices.qb;
    case "RB":
      return prices.rb;
    case "WR":
      return prices.wr;
    default:
      return prices.te;
  }
};

export const pickSuperMaxOrKeeperPrice = (player) => {
  return KEEPER_CLASS_ENUM.SUPERMAX === player.keeperClass
    ? calculateSuperMaxPrice(player.superMax.plan, player.superMax.year)
    : player.price;
};
