import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
import { fetchFreeAgents } from "../../api/api.service";
import { useFetch } from "../../custom-hooks/custom-hooks";
import { Player } from "../../interfaces/interfaces";
import { POSITIONS } from "../../utilities/constants";
import SpinnerWrapper from "../reusable/SpinnerWrapper";

const FreeAgency = () => {
  const { data: allFreeAgents, loading, error } = useFetch(fetchFreeAgents);
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (pos: string) => setOpen(open === pos ? null : pos);

  const getPlayers = (pos: string) =>
    allFreeAgents
      ? allFreeAgents
          .filter((p: Player) => p.position === pos && p.rank && p.rank < 80)
          .sort((a: Player, b: Player) => (a.rank ?? 0) - (b.rank ?? 0))
      : [];

  return (
    <Container className="py-4">
      <h2 className="page-title">Free Agents</h2>
      {error && <Alert color="danger">Error fetching players</Alert>}
      <SpinnerWrapper loading={loading} />
      {!loading && !error && (
        <Row xs="1" md="2" lg="4" className="g-4">
          {POSITIONS.map((pos) => (
            <Col key={pos}>
              <Card className="h-100 free-agent-card">
                <CardHeader
                  className="free-agent-card-header"
                  onClick={() => toggle(pos)}
                >
                  <span className="free-agent-card-title">{pos}</span>
                  <Button
                    color="link"
                    className="free-agent-card-toggle"
                    tabIndex={-1}
                    aria-label={
                      open === pos ? `Collapse ${pos}` : `Expand ${pos}`
                    }
                  />
                </CardHeader>
                {open === pos && (
                  <CardBody className="p-0">
                    <Table
                      borderless
                      size="sm"
                      hover
                      responsive
                      className="free-agent-table mb-0"
                    >
                      <thead className="thead-light">
                        <tr>
                          <th>Name</th>
                          <th>Rank</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getPlayers(pos).map((player: Player, index) => (
                          <tr
                            key={player.sleeperId}
                            className={
                              index % 2
                                ? "player-table-even"
                                : "player-table-odd"
                            }
                          >
                            <td>{player.name}</td>
                            <td>{player.rank}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </CardBody>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default FreeAgency;
