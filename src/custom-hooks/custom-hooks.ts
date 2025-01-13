import { useEffect, useState } from "react";
import { fetchFreeAgents } from "../api/api.service";
import { FreeAgentStorage, Player } from "../interfaces/interfaces";
import * as FranchiseService from "../services/franchise.service";
import * as Constants from "../utilities/constants";

export const useFranchiseInfo = () => {
  const [franchiseInfo, setFranchiseInfo] = useState({});

  useEffect(() => {
    const getFranchiseInformation = async () => {
      const franchiseDTO = await FranchiseService.getFranchiseTagDTO();
      setFranchiseInfo(franchiseDTO);
    };

    getFranchiseInformation();
  }, []);

  return franchiseInfo;
};

const getAvailablePlayersPosition = (
  position: string,
  playerList: Player[]
) => {
  return playerList
    .filter(
      (player: Player) => player.position === position && player.rank < 80
    )
    .sort((a: Player, b: Player) => a.rank - b.rank);
};

export const useFreeAgents = () => {
  const [freeAgents, setFreeAgents] = useState<FreeAgentStorage>();

  useEffect(() => {
    const getFreeAgents = async () => {
      const availablePlayers = await fetchFreeAgents();

      const availableQBs = getAvailablePlayersPosition(
        Constants.QB,
        availablePlayers.data
      );

      const availableRBs = getAvailablePlayersPosition(
        Constants.RB,
        availablePlayers.data
      );
      const availableWRs = getAvailablePlayersPosition(
        Constants.WR,
        availablePlayers.data
      );
      const availableTEs = getAvailablePlayersPosition(
        Constants.TE,
        availablePlayers.data
      );

      const allFreeAgents = {
        availableQBs,
        availableRBs,
        availableWRs,
        availableTEs,
      };

      setFreeAgents(allFreeAgents);
    };

    getFreeAgents();
  }, []);

  return freeAgents;
};
