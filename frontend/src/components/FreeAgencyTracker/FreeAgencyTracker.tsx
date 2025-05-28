import { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Alert,
  Container,
  Table,
} from "reactstrap";
import { fetchFreeAgents } from "../../api/api.service";
import { useFetch } from "../../custom-hooks/custom-hooks";
import { Player } from "../../interfaces/interfaces";
import { POSITION } from "../../utilities/enumerations";
import SpinnerWrapper from "../reusable/SpinnerWrapper";

interface FreeAgentAccordionProps {
  availablePlayers: Player[];
  index: string;
  position: string;
}

const FreeAgentAccordion = (props: FreeAgentAccordionProps) => {
  return (
    <AccordionItem>
      <AccordionHeader targetId={props.index}>{props.position}</AccordionHeader>
      <AccordionBody accordionId={props.index}>
        <Table
          className="free-agent-table"
          borderless
          size="sm"
          hover
          responsive
        >
          <tbody>
            {props.availablePlayers.map((player: Player, index: number) => (
              <tr
                key={player.sleeperId}
                className={index % 2 ? "player-table-even" : "player-table-odd"}
              >
                <td>{player.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </AccordionBody>
    </AccordionItem>
  );
};

const getAvailablePlayersByPosition = (
  position: string,
  playerList: Player[]
) => {
  return playerList
    .filter(
      (player: Player) =>
        player.position === position && player.rank && player.rank < 80
    )
    .sort((a: Player, b: Player) => {
      return a.rank && b.rank ? a.rank - b.rank : -1;
    });
};

/*
 * This page displays all free agent players organized by position
 */
const FreeAgency = () => {
  const { data: allFreeAgents, loading, error } = useFetch(fetchFreeAgents);
  const [open, setOpen] = useState("1");
  const toggle = (id: string) => {
    if (open === id) {
      setOpen("0");
    } else {
      setOpen(id);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="page-title">Free Agents</h2>
      {error && <Alert color="danger">Error fetching players</Alert>}
      <SpinnerWrapper loading={loading} />
      {!loading && !error && (
        <Accordion open={open} toggle={toggle} className="free-agent-accordion">
          <FreeAgentAccordion
            availablePlayers={getAvailablePlayersByPosition(
              POSITION.QB,
              allFreeAgents
            )}
            index={"1"}
            position={POSITION.QB}
          />
          <FreeAgentAccordion
            availablePlayers={getAvailablePlayersByPosition(
              POSITION.RB,
              allFreeAgents
            )}
            index={"2"}
            position={POSITION.RB}
          />
          <FreeAgentAccordion
            availablePlayers={getAvailablePlayersByPosition(
              POSITION.WR,
              allFreeAgents
            )}
            index={"3"}
            position={POSITION.WR}
          />
          <FreeAgentAccordion
            availablePlayers={getAvailablePlayersByPosition(
              POSITION.TE,
              allFreeAgents
            )}
            index={"4"}
            position={POSITION.TE}
          />
        </Accordion>
      )}
    </Container>
  );
};

export default FreeAgency;
