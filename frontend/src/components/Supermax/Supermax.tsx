import { useEffect, useState } from "react";
import { Alert, Container, Table } from "reactstrap";
import { fetchSupermaxPlayers } from "../../api/api.service";
import { Player } from "../../interfaces/interfaces";
import * as SuperMaxService from "../../services/supermax.service";
import { getCurrentSuperMaxYear } from "../../services/supermax.service";
import { TABLE_STYLE } from "../../utilities/constants";
import { OwnerNameBySleeperId } from "../../utilities/sleeper-ids";

const renderSuperPlayerTable = (superMaxPlayers: Player[]) => {
  return superMaxPlayers.map((currentPlayer: Player) => {
    const ownerName = OwnerNameBySleeperId[currentPlayer.owner];
    const price =
      currentPlayer.superMax &&
      SuperMaxService.calculateSuperMaxPrice(
        currentPlayer.superMax.plan,
        currentPlayer.superMax.signingYear
      );
    const currentYear =
      currentPlayer.superMax &&
      getCurrentSuperMaxYear(currentPlayer.superMax.signingYear);
    return (
      <tr key={currentPlayer._id} className="customRow">
        <td style={TABLE_STYLE}>{currentPlayer.name}</td>
        <td style={TABLE_STYLE}>{ownerName}</td>
        <td style={TABLE_STYLE}>{currentYear}</td>
        <td style={TABLE_STYLE}>
          {currentPlayer.superMax && currentPlayer.superMax.plan}
        </td>
        <td style={TABLE_STYLE}>${price}</td>
      </tr>
    );
  });
};

/*
 * This page displays the details of all the players under a SuperMax Contract
 */
const Supermax = () => {
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

export default Supermax;
