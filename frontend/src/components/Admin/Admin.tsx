import { useState } from "react";
import { Alert, Card, CardBody, Col, Container, Row } from "reactstrap";
import { ALERT_STATE } from "../../utilities/enumerations";
import GeneratePriceSheet from "./GeneratePriceSheet";
import UpdateArbitrationClock from "./UpdateArbitrationClock";
import UpdateDraftPrices from "./UpdateDraftPrices";
import UpdateRosters from "./UpdateRosters";
const Admin = () => {
  const [rosterUpdateAlert, setRosterUpdateAlert] = useState(ALERT_STATE.NONE);
  const [arbUpdateAlert, setArbUpdateAlert] = useState(ALERT_STATE.NONE);
  const [draftDataAlert, setDraftDataAlert] = useState(ALERT_STATE.NONE);

  const rosterUpdateAlertCallback = (alertType: string) => {
    setRosterUpdateAlert(alertType);
  };

  const arbUpdateAlertCallback = (alertType: string) => {
    setArbUpdateAlert(alertType);
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
      {ALERT_STATE.ERROR === arbUpdateAlert && (
        <Alert color="danger">Error updating arbitration clock</Alert>
      )}
      {ALERT_STATE.SUCCESS === arbUpdateAlert && (
        <Alert color="success">Successfully updated arbitration clock</Alert>
      )}
      {ALERT_STATE.ERROR === draftDataAlert && (
        <Alert color="danger">Error updating player prices</Alert>
      )}
      {ALERT_STATE.SUCCESS === draftDataAlert && (
        <Alert color="success">Successfully updated player draft prices</Alert>
      )}
      <Row className="g-4 justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <Card className="admin-action-card">
            <CardBody className="d-flex flex-column align-items-center">
              <div className="admin-section-header mb-3">Rosters</div>
              <UpdateRosters rosterAlertCallback={rosterUpdateAlertCallback} />
              <UpdateArbitrationClock
                arbAlertCallback={arbUpdateAlertCallback}
              />
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Card className="admin-action-card">
            <CardBody className="d-flex flex-column align-items-center">
              <div className="admin-section-header mb-3">Draft</div>
              <UpdateDraftPrices
                priceAlertCallback={draftUpdateAlertCallback}
              />
              <GeneratePriceSheet
                rosterAlertCallback={arbUpdateAlertCallback}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <br /> <br />
    </Container>
  );
};

export default Admin;
