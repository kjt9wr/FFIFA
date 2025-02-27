import { useEffect, useState } from "react";
import { Alert, Container, Table } from "reactstrap";
import { fetchAllOwners, fetchAllTrades } from "../../api/api.service";
import { Owner, TradeInfo } from "../../interfaces/interfaces";
import {
  getUpcomingSeasonYear,
  RECORDED_YEARS,
  TRANSPARENT_TABLE_STYLE,
} from "../../utilities/constants";
import YearSelector from "../reusable/YearSelector";

const displayCapTable = (
  year: string,
  owners: Owner[],
  filteredTrades: TradeInfo[]
) => {
  return (
    <Table responsive hover striped>
      <thead className="thead-light">
        <tr>
          <th></th>
          {owners.map((owner: Owner) => (
            <th key={owner.name}>{owner.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={TRANSPARENT_TABLE_STYLE}>{year}</td>
          {owners.map((owner: Owner) => (
            <td style={TRANSPARENT_TABLE_STYLE} key={owner.name}>
              {owner.cap[parseInt(year.slice(-1))]}
            </td>
          ))}
        </tr>
        {filteredTrades.map((trade) => {
          return (
            <tr key={trade._id}>
              <td style={TRANSPARENT_TABLE_STYLE}>Trade</td>
              {owners.map((owner: Owner) =>
                [trade.owner1, trade.owner2].includes(owner.name) ? (
                  <td
                    style={TRANSPARENT_TABLE_STYLE}
                    key={`${trade._id}-${owner.sleeperId}`}
                  >
                    {displayCapAmount(owner.name, trade, year)}
                  </td>
                ) : (
                  <td
                    style={TRANSPARENT_TABLE_STYLE}
                    key={`${trade._id}-${owner.sleeperId}`}
                  />
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
  const [owners, setOwners] = useState<Owner[]>([]);
  const [trades, setTrades] = useState<TradeInfo[]>([]);
  const [selectedYear, setSelectedYear] = useState(getUpcomingSeasonYear());
  const [displayErrorAlert, setDisplayErrorAlert] = useState(false);

  const ownersinSelectedYear = owners
    ? owners.filter(
        (owner: Owner) => owner.cap[parseInt(selectedYear.slice(-1))] !== 0
      )
    : [];
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
      {displayCapTable(selectedYear, ownersinSelectedYear, filteredTrades)}
    </Container>
  );
};

export default CapTracker;
