import React, { useEffect, useState } from "react";
import { Alert, Container, Table } from "reactstrap";
import { fetchSupermaxPlayers } from "../api/api.service";
import { Player } from "../interfaces/interfaces";
import * as SuperMaxService from "../services/supermax.service";
import { getCurrentSuperMaxYear } from "../services/supermax.service";
import { ownersByID } from "../utilities/id-maps";

const renderSuperPlayerTable = (superMaxPlayers: Player[]) => {
  return superMaxPlayers.map((currentPlayer: Player) => {
    const ownerName = ownersByID[currentPlayer.owner];
    const price = SuperMaxService.calculateSuperMaxPrice(
      currentPlayer.superMax.plan,
      currentPlayer.superMax.signingYear
    );
    const currentYear = getCurrentSuperMaxYear(
      currentPlayer.superMax.signingYear
    );
    return (
      <tr key={currentPlayer._id} className="customRow">
        <td>{currentPlayer.name}</td>
        <td>{ownerName}</td>
        <td>{currentYear}</td>
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
