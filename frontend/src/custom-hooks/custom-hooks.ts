import { useEffect, useState } from "react";
import { fetchFreeAgents } from "../api/api.service";
import {
  FranchiseTagDTO,
  FreeAgentStorage,
  Player,
} from "../interfaces/interfaces";
import * as FranchiseService from "../services/franchise.service";
import { POSITION } from "../utilities/enumerations";
import { AxiosResponse } from "axios";

export const useFranchiseInfo = () => {
  const [franchiseInfo, setFranchiseInfo] = useState<FranchiseTagDTO>();

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
      (player: Player) =>
        player.position === position && player.rank && player.rank < 80
    )
    .sort((a: Player, b: Player) => {
      return a.rank && b.rank ? a.rank - b.rank : -1;
    });
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

export const useGetPlayers = (
  fetchFunction: () => Promise<AxiosResponse<any, any>>,
  autoFetch = true
) => {
  const [data, setData] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();
      setData(result.data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData([]);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
};
