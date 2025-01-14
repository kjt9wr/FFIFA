import {
  FranchisePrices,
  PenaltyFeeInfo,
  Player,
} from "../interfaces/interfaces";
import { KEEPER_CLASS_ENUM, POSITION } from "../utilities/enumerations";
import { calculateSuperMaxPrice } from "./supermax.service";

export const determineFinalPriceOfPlayer = (
  player: Player,
  franchisePrices: FranchisePrices
) => {
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

const getFranchisePrice = (playerPosition: string, prices: FranchisePrices) => {
  switch (playerPosition) {
    case POSITION.QB:
      return prices.qb;
    case POSITION.RB:
      return prices.rb;
    case POSITION.WR:
      return prices.wr;
    default:
      return prices.te;
  }
};

export const pickSuperMaxOrKeeperPrice = (player: Player) => {
  return KEEPER_CLASS_ENUM.SUPERMAX === player.keeperClass
    ? calculateSuperMaxPrice(player.superMax.plan, player.superMax.year)
    : player.price;
};

export const increaseKeeperPrice = (draftedPrice: number) => {
  return Math.max(10, Math.trunc(1.2 * draftedPrice));
};

export const calculateLuxaryPotPayout = (penaltyFees: PenaltyFeeInfo[]) => {
  const totalInPot = penaltyFees.reduce(
    (acc, owner) => acc + owner.penaltyFee,
    0
  );

  const nonOffenders = penaltyFees.filter(
    (owner) => owner.penaltyFee === 0
  ).length;

  return Math.trunc(totalInPot / nonOffenders);
};
