import React, { useEffect, useState } from "react";
import { Alert, Container, Table } from "reactstrap";
import { fetchAllOwners, fetchAllTrades } from "../api/api.service";
import { Owner, TradeInfo } from "../interfaces/interfaces";
import { RECORDED_YEARS, UPCOMING_SEASON_YEAR } from "../utilities/constants";
import YearSelector from "./reusable/YearSelector";

const displayCapTable = (
  year: string,
  owners: Owner[],
  filteredTrades: TradeInfo[]
) => {
  return (
    <Table responsive>
      <thead className="thead-light">
        <tr>
          <th></th>
          {owners.map(
            (owner: Owner) =>
              owner.cap[parseInt(year.slice(-1))] !== 0 && (
                <th key={owner.name}>{owner.name}</th>
              )
          )}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{year}</td>
          {owners.map(
            (owner: Owner) =>
              owner.cap[parseInt(year.slice(-1))] !== 0 && (
                <td key={owner.name}>{owner.cap[parseInt(year.slice(-1))]}</td>
              )
          )}
        </tr>
        {filteredTrades.map((trade) => {
          return (
            <tr>
              <td>Trade</td>
              {owners.map((owner: Owner) =>
                [trade.owner1, trade.owner2].includes(owner.name) ? (
                  <>{displayCapAmount(owner.name, trade, year)}</>
                ) : (
                  <td />
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
  let capExchanged;
  let recipient;
  if (trade.owner1_rec.cap && trade.owner1_rec.cap[year]) {
    capExchanged = trade.owner1_rec.cap[year];
    recipient = trade.owner1;
  } else {
    capExchanged = trade.owner2_rec.cap[year];
    recipient = trade.owner2;
  }

  return <td>{ownerName === recipient ? capExchanged : -capExchanged}</td>;
};

/*
 * This page displays each owner's cap in a given year
 */
const CapTracker = () => {
  const [owners, setOwners] = useState([]);
  const [trades, setTrades] = useState<TradeInfo[]>([]);
  const [selectedYear, setSelectedYear] = useState(UPCOMING_SEASON_YEAR);
  const [displayErrorAlert, setDisplayErrorAlert] = useState(false);

  useEffect(() => {
    const getOwnerInfo = async () => {
      await fetchAllOwners()
        .then((response) => {
          setOwners(response.data);
        })
        .catch(() => {
          setDisplayErrorAlert(true);
        });
    };

    getOwnerInfo();
  }, []);

  useEffect(() => {
    fetchAllTrades()
      .then((response) => {
        setTrades(response.data);
      })
      .catch(() => {
        setDisplayErrorAlert(true);
      });
  }, []);

  const handleOnChange = (year: string) => {
    setSelectedYear(year);
  };
  const filteredTrades = trades.filter(
    (trade: TradeInfo) =>
      trade.years.includes(selectedYear) &&
      (trade.owner1_rec.cap || trade.owner2_rec.cap)
  );

  return (
    <Container>
      <h2 className="text-center">Cap Tracker </h2>
      {displayErrorAlert && (
        <Alert color="danger">Error fetching cap data</Alert>
      )}
      <YearSelector
        onChange={handleOnChange}
        selectedYear={selectedYear}
        yearOptions={RECORDED_YEARS}
      />
      <br />
      <br />
      {displayCapTable(selectedYear, owners, filteredTrades)}
    </Container>
  );
};

export default CapTracker;
