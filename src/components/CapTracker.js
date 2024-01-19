import React, { useState, useEffect } from "react";
import * as DatabaseService from "../Services/DatabaseService";
import YearSelector from "./reusable/YearSelector";
import { Container, Table } from "reactstrap";

const displayCapTable = (year, owners) => {
  return (
    <Table responsive>
      <thead className="thead-light">
        <tr>
          <th></th>
          {owners.map((owner) => (
            <th key={owner.name}>{owner.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{year}</td>
          {owners.map((owner) => (
            <td key={owner.name}>{owner.cap[parseInt(year.slice(-1))]}</td>
          ))}
        </tr>
      </tbody>
    </Table>
  );
};

const CapTracker = () => {
  const [owners, setOwners] = useState([]);
  const [selectedYear, setSelectedYearYear] = useState("2024");

  useEffect(() => {
    const getOwnerInfo = async () => {
      const ownersList = await DatabaseService.getOwnersFromDB();
      setOwners(ownersList);
    };

    getOwnerInfo();
  }, []);

  const handleOnChange = (year) => {
    setSelectedYearYear(year);
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
