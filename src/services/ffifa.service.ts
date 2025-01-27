import {
  FranchiseTagDTO,
  PenaltyFeeInfo,
  Player,
} from "../interfaces/interfaces";
import { KEEPER_CLASS_ENUM, POSITION } from "../utilities/enumerations";
import { calculateSuperMaxPrice } from "./supermax.service";

export const determineFinalPriceOfPlayer = (
  player: Player,
  franchisePrices: FranchiseTagDTO
) => {
  switch (player.keeperClass) {
    case 2:
      return getFranchisePrice(player.position, franchisePrices);
    case 3:
      return calculateSuperMaxPrice(
        player.superMax.plan,
        player.superMax.signingYear
      );
    case 4:
      return getFranchisePrice(player.position, franchisePrices);
    default:
      return player.price;
  }
};

const getFranchisePrice = (playerPosition: string, prices: FranchiseTagDTO) => {
  switch (playerPosition) {
    case POSITION.QB:
      return prices.qbFranchisePrice;
    case POSITION.RB:
      return prices.rbFranchisePrice;
    case POSITION.WR:
      return prices.wrFranchisePrice;
    default:
      return prices.teFranchisePrice;
  }
};

export const pickSuperMaxOrKeeperPrice = (player: Player) => {
  return KEEPER_CLASS_ENUM.SUPERMAX === player.keeperClass
    ? calculateSuperMaxPrice(player.superMax.plan, player.superMax.signingYear)
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
