import axios from 'axios';

export const calculateLuxaryTaxLine = (cap) =>  Math.trunc(cap*0.55);

export const calculateTotalKeeperPrice = (roster) =>  roster.filter(keptPlayer => keptPlayer.keep).reduce((acc, player) => acc + player.price, 0);

export const calculatePenaltyFee = (totalKeepPrice, luxaryTaxLine) => {
  const penaltyFee = totalKeepPrice - luxaryTaxLine;
  return penaltyFee > 0 ? penaltyFee: 0;
}

export const getLuxaryText = (isOffender) => isOffender ? 'Penalty Fee: ' : 'Cap Gained: ';

export const filterKeepersByPosition = (keptPlayers, position) => {
  return keptPlayers.filter(player => player.position === position && player.keep === true);
}

export const toggleKeeper = (e) => {
  // TODO: validation
    const newKeep = {  'keep': e.target.checked  }
    axios.post('http://localhost:5000/player/update/' + e.target.id, newKeep)
    .then(res => console.log(res.data));
    window.location.reload();
  }