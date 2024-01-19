import React from "react";
import { determineFinalPriceOfPlayer } from "../../Services/FFIFAService";

const calculateLuxaryTaxLine = (cap) => Math.trunc(cap * 0.55);

const calculatePenaltyFee = (roster, franchisePrices, maxCap) => {
  const penaltyFee =
    calculateTotalKeeperPrice(roster, franchisePrices) -
    calculateLuxaryTaxLine(maxCap);
  return penaltyFee > 0 ? penaltyFee : 0;
};

const calculateTotalKeeperPrice = (roster, franchisePrices) => {
  return roster
    .filter((keptPlayer) => keptPlayer.keep)
    .reduce(
      (acc, player) =>
        acc + determineFinalPriceOfPlayer(player, franchisePrices),
      0
    );
};

const OwnerDisplay = (props) => {
  const { owner, roster, franchisePrices } = props;
  const MAX_CAP = owner.cap[4];
  const TAX_LINE = calculateLuxaryTaxLine(MAX_CAP);
  const keepPrice = calculateTotalKeeperPrice(roster, franchisePrices);
  const penaltyFee = calculatePenaltyFee(roster, franchisePrices, MAX_CAP);
  const luxaryGainorLoss = penaltyFee > 0 ? penaltyFee * -1 : 0;
  const capRemaining = MAX_CAP - keepPrice + luxaryGainorLoss;
  const isOffender = keepPrice > TAX_LINE;

  return (
    <div>
      <h1 className="text-center">{owner.name}'s Roster </h1>
      <h5>Max Cap: {MAX_CAP}</h5>
      <h5>Luxary Tax Line: {TAX_LINE}</h5>
      <h5>Total Price of Kept Players: {keepPrice} </h5>
      <h5>Budget before violating luxary tax: {TAX_LINE - keepPrice}</h5>
      <h5 style={{ color: isOffender ? "red" : "green" }}>
        {isOffender ? "Penalty Fee: " : "Cap Gained: "} {luxaryGainorLoss}
      </h5>
      <h5>Remaining: {capRemaining}</h5>
    </div>
  );
};

export default OwnerDisplay;
