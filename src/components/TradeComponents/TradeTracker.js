import React, { useState, useEffect } from 'react'
import * as DatabaseService from '../../Services/DatabaseService';
import TradeDetails from './TradeDetails';

const TradeTracker = () => {
  const [tradeList, setTradeList] = useState([]);

  useEffect(() => {
    const getTrades = async () => {
        const allTradeList = await DatabaseService.getTradesFromDB();
        setTradeList(allTradeList);
    }

    getTrades();
    }, []);


  const displayTrades = () => {
    return tradeList.map(currentTrade => {
      return <TradeDetails currentTrade={currentTrade} />;
    });
  }

  return (
    <div className="container">
      <h2 class="text-center"> Trade Tracker </h2>
        {displayTrades()}
    </div>
  )
}

export default TradeTracker;
