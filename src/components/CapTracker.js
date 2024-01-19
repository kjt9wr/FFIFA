import React, { useState, useEffect } from "react";
import * as DatabaseService from "../Services/DatabaseService";
import YearSelector from "./reusable/YearSelector";

const displayCapTable = (year, owners) => {
  return (
    <table className="table">
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
    </table>
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
    <div className="container">
      <h2 className="text-center">Cap Tracker </h2>
      <YearSelector onChange={handleOnChange} selectedYear={selectedYear} />
      <br />
      <br />
      {displayCapTable(selectedYear, owners)}
    </div>
  );
};

export default CapTracker;
