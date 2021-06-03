import * as DatabaseService from './DatabaseService';
import * as Constants from '../Utilities/Constants';

export const getFreeAgents = async () => {
    const playerList = await DatabaseService.getPlayersFromDB();
    console.log(playerList)
    const availablePlayers = playerList.filter(player => !player.keep);
    console.log(availablePlayers)
    const availableQBs = availablePlayers.filter(player => player.position === Constants.QB).sort((a,b) => a.rank - b.rank);
    const availableRBs = availablePlayers.filter(player => player.position === Constants.RB).sort((a,b) => a.rank - b.rank);
    const availableWRs = availablePlayers.filter(player => player.position === Constants.WR).sort((a,b) => a.rank - b.rank);
    const availableTEs = availablePlayers.filter(player => player.position === Constants.TE).sort((a,b) => a.rank - b.rank);

    return { availableQBs, availableRBs, availableWRs, availableTEs }
  }
