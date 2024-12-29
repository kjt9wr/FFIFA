import React, { useEffect, useState } from "react";
import { Container, Table } from "reactstrap";
import { fetchAllOwners } from "../api/apiService";
import { CURRENT_SEASON_YEAR } from "../Utilities/Constants";
import YearSelector from "./reusable/YearSelector";

const displayCapTable = (year, owners) => {
  return (
    <Table responsive>
      <thead className="thead-light">
        <tr>
          <th></th>
          {owners.map(
            (owner) =>
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
            (owner) =>
              owner.cap[parseInt(year.slice(-1))] !== 0 && (
                <td key={owner.name}>{owner.cap[parseInt(year.slice(-1))]}</td>
              )
          )}
        </tr>
      </tbody>
    </Table>
  );
};

/*
 * This page displays each owner's cap in a given year
 */
const CapTracker = () => {
  const [owners, setOwners] = useState([]);
  const [selectedYear, setSelectedYear] = useState(CURRENT_SEASON_YEAR);

  useEffect(() => {
    const getOwnerInfo = async () => {
      await fetchAllOwners().then((response) => {
        setOwners(response.data);
      });
    };

    getOwnerInfo();
  }, []);

  const handleOnChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <Container>
      <h2 className="text-center">Cap Tracker </h2>
      <YearSelector onChange={handleOnChange} selectedYear={selectedYear} />
      <br />
      <br />
      {displayCapTable(selectedYear, owners)}
    </Container>
  );
};

export default CapTracker;
