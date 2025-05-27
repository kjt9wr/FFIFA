import { useState } from "react";
import { Alert, Container } from "reactstrap";
import { fetchAllTrades } from "../../api/api.service";
import { useFetch } from "../../custom-hooks/custom-hooks";
import { TradeInfo } from "../../interfaces/interfaces";
import {
  getUpcomingSeasonYear,
  RECORDED_YEARS,
} from "../../utilities/constants";
import SpinnerWrapper from "../reusable/SpinnerWrapper";
import YearSelector from "../reusable/YearSelector";
import TradeCard from "./TradeCard";

const displayTrades = (tradeList: TradeInfo[], selectedYear: string) => {
  return tradeList
    .filter((trade) => trade.years.includes(selectedYear))
    .map((currentTrade) => {
      return <TradeCard key={currentTrade._id} currentTrade={currentTrade} />;
    });
};

const isYearEmpty = (tradeList: TradeInfo[], selectedYear: string) => {
  return (
    tradeList.filter((trade) => trade.years.includes(selectedYear)).length === 0
  );
};

/*
 * This page displays a log of all trades
 */
const TradeTracker = () => {
  const [selectedYear, setSelectedYear] = useState(getUpcomingSeasonYear());
  const { data: tradeList, error, loading } = useFetch(fetchAllTrades);

  const handleOnChange = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <Container>
      <h2 className="page-title">Trade Tracker</h2>
      {error && <Alert color="danger">Error fetching trade data</Alert>}
      <div className="trade-tracker-controls">
        <label htmlFor="year-selector" className="section-title">
          Select Year:
        </label>
        <YearSelector
          onChange={handleOnChange}
          selectedYear={selectedYear}
          yearOptions={RECORDED_YEARS}
        />
      </div>
      <SpinnerWrapper loading={loading} />
      {!error && !loading && isYearEmpty(tradeList, selectedYear) && (
        <div className="no-trades-message">No trades found for this year.</div>
      )}
      {!error && !loading && displayTrades(tradeList, selectedYear)}
    </Container>
  );
};

export default TradeTracker;
