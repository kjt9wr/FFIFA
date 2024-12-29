import React, { useEffect, useState } from "react";
import { Alert, Container } from "reactstrap";
import { fetchAllTrades } from "../../api/apiService";
import { CURRENT_SEASON_YEAR } from "../../Utilities/Constants";
import YearSelector from "../reusable/YearSelector";
import TradeCard from "./TradeCard";

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
  const [displayErrorAlert, setDisplayErrorAlert] = useState(false);

  useEffect(() => {
    const getTrades = async () => {
      fetchAllTrades()
        .then((response) => {
          setTradeList(response.data);
        })
        .catch((error) => setDisplayErrorAlert(true));
    };

    getTrades();
  }, []);

  const handleOnChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <Container>
      <h2 className="text-center"> Trade Tracker </h2>
      {displayErrorAlert && (
        <Alert color="danger">Error fetching trade data</Alert>
      )}
      <YearSelector onChange={handleOnChange} selectedYear={selectedYear} />
      {displayTrades(tradeList, selectedYear)}
    </Container>
  );
};

export default TradeTracker;
