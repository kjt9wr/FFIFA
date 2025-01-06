import apiClient from "./apiClient";
import { CURRENT_SEASON_YEAR } from "../Utilities/Constants";
import sleeperApiClient from "./sleeperApiClient";

export const fetchAllTrades = () => {
  return apiClient.get("/trade");
};

export const fetchArbitrationData = () => {
  return apiClient.get(`/player/arbitration/${CURRENT_SEASON_YEAR}`);
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

export const updatePlayerKeeperStatus = (playerID, keeperStatus) => {
  return apiClient.put(`player/updatePlayer/${playerID}`, keeperStatus);
};

export const clearAllPlayersOwner = () => {
  return apiClient.post("/player/removeAllOwners");
};

export const fetchRoster = (ownerId) => {
  return apiClient.get(`/player/roster/${ownerId}`);
};

export const updateRoster = (ownerId, playerList) => {
  return apiClient.post(`/player/update/roster/${ownerId}`, {
    players: playerList,
  });
};

export const updatePlayerPrice = (playerId, newPrice) => {
  return apiClient.put(`/player/updatePlayer/price/${playerId}`, {
    price: newPrice,
  });
};

export const fetchSingleOwner = (ownerName) => {
  return apiClient.get(`/owner/${ownerName}`);
};

export const fetchAllOwners = () => {
  return apiClient.get("/owner");
};

export const updatePenaltyFee = (ownerName, updatedFee) => {
  return apiClient.put(`owner/updatePenaltyFee/${ownerName}`, {
    penaltyFee: updatedFee,
  });
};

export const fetchSleeperRosters = (sleeperLeagueId) => {
  return sleeperApiClient.get(`/league/${sleeperLeagueId}/rosters`);
};

export const fetchSleeperDraftResults = (draftId) => {
  return sleeperApiClient.get(`/draft/${draftId}/picks`);
};
