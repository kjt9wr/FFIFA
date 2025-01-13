import React, { useEffect, useState } from "react";
import { Alert, Container, Table } from "reactstrap";
import * as SuperMaxService from "../services/supermax.service";
import * as Constants from "../utilities/constants";
import { fetchSupermaxPlayers } from "../api/api.service";
import { Player } from "../interfaces/interfaces";

const renderSuperPlayerTable = (superMaxPlayers: Player[]) => {
  return superMaxPlayers.map((currentPlayer: Player) => {
    const ownerName = Constants.ownersByID[currentPlayer.owner];
    const price = SuperMaxService.calculateSuperMaxPrice(
      currentPlayer.superMax.plan,
      currentPlayer.superMax.year
    );
    return (
      <tr className="customRow">
        <td>{currentPlayer.name}</td>
        <td>{ownerName}</td>
        <td>{currentPlayer.superMax.year}</td>
        <td>{currentPlayer.superMax.plan}</td>
        <td>${price}</td>
      </tr>
    );
  });
};

/*
 * This page displays the details of all the players under a SuperMax Contract
 */
const SuperMax = () => {
  const [supermaxPlayers, setSupermaxPlayers] = useState<Player[]>([]);
  const [displayErrorAlert, setDisplayErrorAlert] = useState(false);

  useEffect(() => {
    const getSuperMaxPlayers = async () => {
      await fetchSupermaxPlayers()
        .then((response) => setSupermaxPlayers(response.data))
        .catch(() => {
          setDisplayErrorAlert(true);
        });
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
