import { UpdateKeeperDTO } from "../interfaces/interfaces";
import { getUpcomingSeasonYear } from "../utilities/constants";
import apiClient from "./apiClient";
import sleeperApiClient from "./sleeperApiClient";

export const fetchAllTrades = () => {
  return apiClient.get("/trade");
};

export const fetchArbitrationData = () => {
  return apiClient.get(`/player/arbitration/${getUpcomingSeasonYear()}`);
};

export const fetchFreeAgents = () => {
  return apiClient.get("/player/freeAgents");
};

export const fetchSupermaxPlayers = () => {
  return apiClient.get("/player/superMax");
};

export const fetchKeptPlayers = () => {
  return apiClient.get("/player/keptPlayers");
};

export const fetchRosteredPlayers = () => {
  return apiClient.get("/player/rosteredPlayers");
};

export const updatePlayerKeeperStatus = (
  playerID: string,
  updateDTO: UpdateKeeperDTO
) => {
  return apiClient.put(`player/updatePlayer/${playerID}`, updateDTO);
};

export const clearAllPlayersOwner = () => {
  return apiClient.post("/player/removeAllOwners");
};

export const fetchRoster = (ownerId: string) => {
  return apiClient.get(`/player/roster/${ownerId}`);
};

export const updateRoster = (ownerId: string, playerList: string[]) => {
  return apiClient.post(`/player/update/roster/${ownerId}`, {
    players: playerList,
  });
};

export const updatePlayerPrice = (playerId: string, newPrice: number) => {
  return apiClient.put(`/player/updatePlayer/price/${playerId}`, {
    price: newPrice,
  });
};

export const fetchSingleOwner = (ownerName: string) => {
  return apiClient.get(`/owner/${ownerName}`);
};

export const fetchAllOwners = () => {
  return apiClient.get("/owner");
};

export const updatePenaltyFee = (ownerName: string, updatedFee: number) => {
  return apiClient.put(`owner/updatePenaltyFee/${ownerName}`, {
    penaltyFee: updatedFee,
  });
};

export const fetchSleeperRosters = (sleeperLeagueId: string) => {
  return sleeperApiClient.get(`/league/${sleeperLeagueId}/rosters`);
};

export const fetchSleeperDraftResults = (draftId: string) => {
  return sleeperApiClient.get(`/draft/${draftId}/picks`);
};

export const fetchLogin = (username: string, password: string) => {
  return apiClient.post("/user/login", {
    username,
    password,
  });
};
