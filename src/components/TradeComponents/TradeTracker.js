import axios from "axios";
import React, { useEffect, useState } from "react";
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

  return (
    <div className="container">
      <h2 className="text-center"> Trade Tracker </h2>
      <div className="btn-group" role="group">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setYear("2020")}
        >
          2020
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setYear("2021")}
        >
          2021
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setYear("2022")}
        >
          2022
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setYear("2023")}
        >
          2023
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setYear("2024")}
        >
          2024
        </button>
      </div>
      {displayTrades()}
    </div>
  );
};

export default TradeTracker;
