import { useState } from "react";
import { Alert, Container } from "reactstrap";
import { ALERT_STATE } from "../../utilities/enumerations";
import UpdateDraftPrices from "./UpdateDraftPrices";
import UpdateRosters from "./UpdateRosters";

const Admin = () => {
  const [rosterUpdateAlert, setRosterUpdateAlert] = useState(ALERT_STATE.NONE);
  const [draftDataAlert, setDraftDataAlert] = useState(ALERT_STATE.NONE);

  const rosterUpdateAlertCallback = (alertType: string) => {
    setRosterUpdateAlert(alertType);
  };

  const draftUpdateAlertCallback = (alertType: string) => {
    setDraftDataAlert(alertType);
  };

  return (
    <Container>
      <h1 className="page-title"> Admin Page </h1>
      {ALERT_STATE.ERROR === rosterUpdateAlert && (
        <Alert color="danger">Error updating rosters</Alert>
      )}
      {ALERT_STATE.SUCCESS === rosterUpdateAlert && (
        <Alert color="success">Successfully Updated Rosters</Alert>
      )}
      {ALERT_STATE.ERROR === draftDataAlert && (
        <Alert color="danger">Error updating player prices</Alert>
      )}
      {ALERT_STATE.SUCCESS === draftDataAlert && (
        <Alert color="success">Successfully updated player draft prices</Alert>
      )}
      <div className=" d-flex d-grid justify-content-center gap-4">
        <UpdateRosters rosterAlertCallback={rosterUpdateAlertCallback} />
        <UpdateDraftPrices priceAlertCallback={draftUpdateAlertCallback} />
      </div>
      <br /> <br />
    </Container>
  );
};

export default Admin;
