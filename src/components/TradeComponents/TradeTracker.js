import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import YearSelector from "../reusable/YearSelector";
import TradeCard from "./TradeCard";
import { CURRENT_SEASON_YEAR } from "../../Utilities/Constants";

const displayTrades = (tradeList, selectedYear) => {
  return tradeList
    .filter((trade) => trade.years.includes(selectedYear))
    .map((currentTrade) => {
      return <TradeCard key={currentTrade._id} currentTrade={currentTrade} />;
    });
};

/*
 * This page displays a log of all trades
 */
const TradeTracker = () => {
  const [tradeList, setTradeList] = useState([]);
  const [selectedYear, setSelectedYear] = useState(CURRENT_SEASON_YEAR);

  useEffect(() => {
    const getTrades = async () => {
      await axios
        .get("http://localhost:5000/trade/")
        .then((response) => {
          setTradeList(response.data);
        })
        .catch((error) =>
          console.error("Error getting trades from the database")
        );
    };

    getTrades();
  }, []);

  const handleOnChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <Container>
      <h2 className="text-center"> Trade Tracker </h2>
      <YearSelector onChange={handleOnChange} selectedYear={selectedYear} />
      {displayTrades(tradeList, selectedYear)}
    </Container>
  );
};

export default TradeTracker;
