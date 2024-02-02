import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Container } from "reactstrap";
import {
  OwnerIDBySleeperRosterID,
  SLEEPER_LEAGUE_ID,
} from "../Utilities/Constants";

const Admin = () => {
  const [allRosters, setAllRosters] = useState();
  const [successAlert, setSuccessAlert] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getAllRosters = async () => {
      const rostersResponse = await axios.get(
        `https://api.sleeper.app/v1/league/${SLEEPER_LEAGUE_ID}/rosters`
      );
      const rosters = rostersResponse.data.map((roster) => {
        return {
          players: roster.players,
          ownerSleeperId: roster.roster_id,
        };
      });

      setAllRosters(rosters);
    };

    getAllRosters();
  }, []);

  const updateAllRosters = async () => {
    await axios
      .post(`http://localhost:5000/player/removeAllOwners`)
      .catch((e) => {
        setError(true);
        console.log(e);
      });
    allRosters.map(async (roster) => {
      await axios
        .post(
          `http://localhost:5000/player/update/roster/${
            OwnerIDBySleeperRosterID[roster.ownerSleeperId]
          }`,
          {
            players: roster.players,
          }
        )
        .catch((e) => {
          setError(true);
          console.log(e);
        });
    });
    setSuccessAlert(true);
  };

  return (
    <Container>
      <h1 className="text-center"> Admin Page </h1>
      {error && <Alert color="danger">Error Occurred</Alert>}
      {successAlert && !error && (
        <Alert color="success">Successfully Updated Rosters</Alert>
      )}
      <Button title="Update All Rosters" onClick={updateAllRosters}>
        Update All Rosters
      </Button>
    </Container>
  );
};

export default Admin;
