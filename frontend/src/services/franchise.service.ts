import { updatePlayerStatus } from "../api/api.service";
import { Player, UpdatePlayerDTO } from "../interfaces/interfaces";
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

export const removeAllFranchiseTags = async (roster: Player[]) => {
  roster
    .filter((player) => player.keeperClass === 2)
    .forEach(async (player) => {
      const updateDTO: UpdatePlayerDTO = {
        keeperClass: 1,
      };
      await updatePlayerStatus(player.sleeperId, updateDTO);
    });
};

export const getFranchiseEligiblePlayers = (roster: Player[]) => {
  return roster
    .filter((player: Player) => ![3, 4].includes(player.keeperClass))
    .sort(
      (a: Player, b: Player) =>
        a.position.localeCompare(b.position) ||
        b.price - a.price ||
        a.name.localeCompare(b.name)
    );
};
