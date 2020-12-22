export const calculateFranchisePriceFromKeptPlayers = (playerList) => {
    const priceOfMostExpensive = playerList.slice(0,5).reduce((acc, player) => acc + player.price, 0)
    return Math.trunc(priceOfMostExpensive / 5);
  }