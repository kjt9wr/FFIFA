import { Player, FranchisePrices } from "../interfaces/interfaces";
import { determineFinalPriceOfPlayer } from "./ffifa.service";

export const calculateLuxaryTaxLine = (cap: number) => Math.trunc(cap * 0.55);

export const calculatePenaltyFee = (
  roster: Player[],
  franchisePrices: FranchisePrices,
  maxCap: number
) => {
  const penaltyFee =
    calculateTotalKeeperPrice(roster, franchisePrices) -
    calculateLuxaryTaxLine(maxCap);
  return penaltyFee > 0 ? penaltyFee : 0;
};

export const calculateTotalKeeperPrice = (
  roster: Player[],
  franchisePrices: FranchisePrices
) => {
  return roster
    .filter((keptPlayer) => keptPlayer.keep)
    .reduce(
      (acc, player) =>
        acc + determineFinalPriceOfPlayer(player, franchisePrices),
      0
    );
};
