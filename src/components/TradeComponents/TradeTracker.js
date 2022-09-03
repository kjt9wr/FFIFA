import React, { useState, useEffect } from 'react'
import * as DatabaseService from '../../Services/DatabaseService';
import TradeDetails from './TradeDetails';

const TradeTracker = () => {
  const [tradeList, setTradeList] = useState([]);
  const [year, setYear] = useState('2023');

  useEffect(() => {
    const getTrades = async () => {
        const allTradeList = await DatabaseService.getTradesFromDB();
        setTradeList(allTradeList);
    }

    getTrades();
    }, []);


  const displayTrades = () => {
    return tradeList.filter(trade => trade.years.includes(year))
      .map(currentTrade => {
        return <TradeDetails currentTrade={currentTrade} />;
      });
  }

  return (
    <div className="container">
      <h2 class="text-center"> Trade Tracker </h2>
      <div class="btn-group" role="group">
            <button type="button" class="btn btn-secondary" onClick={() => setYear('2020')}>2020</button>
            <button type="button" class="btn btn-secondary" onClick={() => setYear('2021')}>2021</button>
            <button type="button" class="btn btn-secondary" onClick={() => setYear('2022')}>2022</button>
            <button type="button" class="btn btn-secondary" onClick={() => setYear('2023')}>2023</button>
          </div>
        {displayTrades()}
    </div>
  )
}

export default TradeTracker;
