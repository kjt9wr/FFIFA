import {
  FranchiseTagDTO,
  Owner,
  PenaltyFeeInfo,
  Player,
} from "../interfaces/interfaces";
import { BASE_CAP, getUpcomingSeasonYear } from "../utilities/constants";
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
      return player.superMax
        ? calculateSuperMaxPrice(
            player.superMax.plan,
            player.superMax.signingYear
          )
        : -99;
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
  return KEEPER_CLASS_ENUM.SUPERMAX === player.keeperClass && player.superMax
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

export const calculateTotalInPot = (penaltyFees: PenaltyFeeInfo[]) => {
  return penaltyFees.reduce(
    (acc: number, owner: PenaltyFeeInfo) => acc + owner.penaltyFee,
    0
  );
};

export const calculateFollowingYearBaseCap = (
  penaltyFees: PenaltyFeeInfo[]
) => {
  const nonoffendersCount = penaltyFees.filter(
    (owner: Owner) => owner.penaltyFee === 0
  ).length;

  const offendersCount = penaltyFees.length - nonoffendersCount;

  return Math.trunc(
    BASE_CAP[getUpcomingSeasonYear()] *
      (1.05 + 0.01 * (nonoffendersCount - offendersCount))
  );
};
