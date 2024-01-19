import axios from "axios";
import React, { useEffect, useState } from "react";
import YearSelector from "../reusable/YearSelector";
import TradeDetails from "./TradeDetails";

const TradeTracker = () => {
  const [tradeList, setTradeList] = useState([]);
  const [year, setYear] = useState("2024");

  useEffect(() => {
    const getTrades = async () => {
      await axios
        .get("http://localhost:5000/trade/")
        .then((response) => {
          setTradeList(response.data);
        })
        .catch((error) => console.error("Problem"));
    };

    getTrades();
  }, []);

  const displayTrades = () => {
    return tradeList
      .filter((trade) => trade.years.includes(year))
      .map((currentTrade) => {
        return (
          <TradeDetails key={currentTrade._id} currentTrade={currentTrade} />
        );
      });
  };

  const handleOnChange = (year) => {
    setYear(year);
  };

  return (
    <div className="container">
      <h2 className="text-center"> Trade Tracker </h2>
      <YearSelector onChange={handleOnChange} selectedYear={year} />

      {displayTrades()}
    </div>
  );
};

export default TradeTracker;
