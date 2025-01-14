import { useEffect, useState } from "react";
import { fetchFreeAgents } from "../api/api.service";
import {
  FranchiseInfo,
  FreeAgentStorage,
  Player,
} from "../interfaces/interfaces";
import * as FranchiseService from "../services/franchise.service";
import { POSITION } from "../utilities/enumerations";

export const useFranchiseInfo = () => {
  const [franchiseInfo, setFranchiseInfo] = useState<FranchiseInfo>();

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
        POSITION.QB,
        availablePlayers.data
      );

      const availableRBs = getAvailablePlayersPosition(
        POSITION.RB,
        availablePlayers.data
      );
      const availableWRs = getAvailablePlayersPosition(
        POSITION.WR,
        availablePlayers.data
      );
      const availableTEs = getAvailablePlayersPosition(
        POSITION.TE,
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
