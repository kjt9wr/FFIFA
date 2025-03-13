import { Player } from "../interfaces/interfaces";
import * as FFIFAService from "./ffifa.service";

export const get10MostExpensivePerPosition = (
  allKeptPlayers: Player[],
  position: string
) => {
  return allKeptPlayers
    .filter((player: Player) => player.position === position)
    .map((player: Player) => ({
      ...player,
      price: FFIFAService.pickSuperMaxOrKeeperPrice(player),
    }))
    .sort((a: Player, b: Player) => b.price - a.price)
    .slice(0, 10);
};

export const calculateFranchisePrice = (sortedPositionList: Player[]) => {
  const sum = sortedPositionList
    .slice(0, 5)
    .reduce((acc, player) => acc + player.price, 0);
  return Math.trunc(sum / Math.min(sortedPositionList.length, 5));
};
