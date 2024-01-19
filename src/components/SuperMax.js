import React, { useState, useEffect } from "react";
import * as DatabaseService from "../Services/DatabaseService";
import * as SuperMaxService from "../Services/SuperMaxService";
import * as Constants from "../Utilities/Constants";

const SuperMax = () => {
  const [supermaxPlayers, setSupermaxPlayers] = useState([]);

  useEffect(() => {
    const getSuperMaxPlayers = async () => {
      const players = await DatabaseService.getPlayersFromDB();
      const list = players.filter((player) => player.keeperClass === 3);
      setSupermaxPlayers(list);
    };

    getSuperMaxPlayers();
  }, []);

  const renderSuperPlayerTable = () => {
    return supermaxPlayers.map((currentPlayer) => {
      const ownerName = Constants.ownersByID[currentPlayer.owner];
      const price = SuperMaxService.calculateSuperMaxPrice(
        currentPlayer.superMax.plan,
        currentPlayer.superMax.year
      );
      return (
        <SuperMaxRow
          player={currentPlayer.name}
          owner={ownerName}
          year={currentPlayer.superMax.year}
          plan={currentPlayer.superMax.plan}
          price={price}
          key={currentPlayer.name}
        />
      );
    });
  };

  return (
    <div className="container">
      <h2 className="text-center"> Players on SuperMax </h2>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Player</th>
            <th>Owner</th>
            <th>Current Year</th>
            <th>Plan</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{renderSuperPlayerTable()}</tbody>
      </table>
    </div>
  );
};

const SuperMaxRow = (props) => (
  <tr className="customRow">
    <td>{props.player}</td>
    <td> {props.owner}</td>
    <td> {props.year} </td>
    <td> {props.plan} </td>
    <td> {props.price} </td>
  </tr>
);

export default SuperMax;
