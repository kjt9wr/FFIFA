import { useState } from "react";
import { Alert, Container, Table } from "reactstrap";
import { fetchAllOwners, fetchAllTrades } from "../../api/api.service";
import { useFetch } from "../../custom-hooks/custom-hooks";
import { Owner, TradeInfo } from "../../interfaces/interfaces";
import {
  getUpcomingSeasonYear,
  RECORDED_YEARS,
} from "../../utilities/constants";
import SpinnerWrapper from "../reusable/SpinnerWrapper";
import YearSelector from "../reusable/YearSelector";

const displayCapTable = (
  year: string,
  owners: Owner[],
  filteredTrades: TradeInfo[]
) => {
  return (
    <Table responsive hover striped borderless>
      <thead className="thead-light">
        <tr>
          <th></th>
          {owners.map((owner: Owner) => (
            <th key={owner.name}>{owner.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className={"player-table-even"}>
          <td>{year}</td>
          {owners.map((owner: Owner) => (
            <td key={owner.name}>{owner.cap[parseInt(year.slice(-1))]}</td>
          ))}
        </tr>
        {filteredTrades.map((trade, index: number) => {
          return (
            <tr
              key={trade._id}
              className={index % 2 ? "player-table-even" : "player-table-odd"}
            >
              <td>Trade</td>
              {owners.map((owner: Owner) =>
                [trade.owner1, trade.owner2].includes(owner.name) ? (
                  <td key={`${trade._id}-${owner.sleeperId}`}>
                    {displayCapAmount(owner.name, trade, year)}
                  </td>
                ) : (
                  <td key={`${trade._id}-${owner.sleeperId}`} />
                )
              )}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const displayCapAmount = (
  ownerName: string,
  trade: TradeInfo,
  year: string
) => {
  let capExchanged: number;
  let recipient: string;

  if (trade.owner1_rec.cap && trade.owner1_rec.cap[year]) {
    capExchanged = trade.owner1_rec.cap[year];
    recipient = trade.owner1;
  } else {
    capExchanged = trade.owner2_rec.cap[year];
    recipient = trade.owner2;
  }

  return <>{ownerName === recipient ? capExchanged : -capExchanged}</>;
};

/*
 * This page displays each owner's cap in a given year
 */
const CapTracker = () => {
  const [selectedYear, setSelectedYear] = useState(getUpcomingSeasonYear());
  const { data: owners, loading, error } = useFetch(fetchAllOwners);
  const {
    data: trades,
    loading: tradeLoading,
    error: tradeError,
  } = useFetch(fetchAllTrades);

  const ownersinSelectedYear = owners
    ? owners.filter(
    ? owners.filter((owner: Owner) => {
        const index = parseInt(selectedYear.slice(-1));
        return owner.cap[index] && owner.cap[index] !== 0;
      })
    : [];

  const handleOnChange = (year: string) => {
    setSelectedYear(year);
  };
  const filteredTrades = trades
    ? trades.filter(
        (trade: TradeInfo) =>
          trade.years.includes(selectedYear) &&
          ((trade.owner1_rec.cap && selectedYear in trade.owner1_rec.cap) ||
            (trade.owner2_rec.cap && selectedYear in trade.owner2_rec.cap))
      )
    : [];

  return (
    <Container>
      <h2 className="page-title">Cap Tracker </h2>
      {(error || tradeError) && (
        <Alert color="danger">Error fetching cap data</Alert>
      )}
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
      {!error &&
        !loading &&
        !tradeError &&
        !tradeLoading &&
        displayCapTable(selectedYear, ownersinSelectedYear, filteredTrades)}

      <SpinnerWrapper loading={loading} />
    </Container>
  );
};

export default CapTracker;
