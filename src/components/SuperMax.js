import React, { useEffect, useState } from "react";
import { Alert, Container, Table } from "reactstrap";
import * as SuperMaxService from "../services/supermax.service";
import * as Constants from "../utilities/constants";
import { fetchSupermaxPlayers } from "../api/api.service";

const renderSuperPlayerTable = (superMaxPlayers) => {
  return superMaxPlayers.map((currentPlayer) => {
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

const SuperMaxRow = (props) => (
  <tr className="customRow">
    <td>{props.player}</td>
    <td>{props.owner}</td>
    <td>{props.year}</td>
    <td>{props.plan}</td>
    <td>${props.price}</td>
  </tr>
);

/*
 * This page displays the details of all the players under a SuperMax Contract
 */
const SuperMax = () => {
  const [supermaxPlayers, setSupermaxPlayers] = useState([]);
  const [displayErrorAlert, setDisplayErrorAlert] = useState(false);

  useEffect(() => {
    const getSuperMaxPlayers = async () => {
      const players = await fetchSupermaxPlayers().catch(() => {
        setDisplayErrorAlert(true);
      });
      setSupermaxPlayers(players.data);
    };

    getSuperMaxPlayers();
  }, []);

  return (
    <Container>
      {displayErrorAlert && (
        <Alert color="danger">Error fetching supermax data</Alert>
      )}
      <h2 className="text-center"> Players on SuperMax </h2>
      <Table responsive hover>
        <thead className="thead-light">
          <tr>
            <th>Player</th>
            <th>Owner</th>
            <th>Current Year</th>
            <th>Plan</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{renderSuperPlayerTable(supermaxPlayers)}</tbody>
      </Table>
    </Container>
  );
};

export default SuperMax;
