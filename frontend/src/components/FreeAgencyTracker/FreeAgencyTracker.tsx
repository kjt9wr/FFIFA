import { useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Alert,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import { fetchFreeAgents } from "../../api/api.service";
import { useFetch } from "../../custom-hooks/custom-hooks";
import { Player } from "../../interfaces/interfaces";
import { TRANSPARENT_TABLE_STYLE } from "../../utilities/constants";
import { POSITION } from "../../utilities/enumerations";

interface FreeAgentColumnProps {
  availablePlayers: Player[];
}

const FreeAgentColumn = (props: FreeAgentColumnProps) => {
  const { availablePlayers } = props;
  return (
    <Table borderless size="sm">
      <tbody>
        {availablePlayers.map((player: Player) => (
          <tr key={player.sleeperId}>
            <td style={TRANSPARENT_TABLE_STYLE}> {player.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
const getAvailablePlayersPosition = (
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
    <div>
      <h2 className="text-center"> Free Agents </h2>
      {error && <Alert color="danger">Error fetching players</Alert>}
      <Row xs="1" md="1">
        {loading && (
          <div className="text-center">
            <Spinner />
          </div>
        )}
        {!loading && !error && (
          <Accordion open={open} toggle={toggle}>
            <AccordionItem style={TRANSPARENT_TABLE_STYLE}>
              <AccordionHeader targetId="1">QB</AccordionHeader>
              <AccordionBody accordionId="1">
                <FreeAgentColumn
                  availablePlayers={getAvailablePlayersPosition(
                    POSITION.QB,
                    allFreeAgents
                  )}
                />
              </AccordionBody>
            </AccordionItem>
            <AccordionItem style={TRANSPARENT_TABLE_STYLE}>
              <AccordionHeader targetId="2">RB</AccordionHeader>
              <AccordionBody accordionId="2">
                <FreeAgentColumn
                  availablePlayers={getAvailablePlayersPosition(
                    POSITION.RB,
                    allFreeAgents
                  )}
                />
              </AccordionBody>
            </AccordionItem>
            <AccordionItem style={TRANSPARENT_TABLE_STYLE}>
              <AccordionHeader targetId="3">WR</AccordionHeader>
              <AccordionBody accordionId="3">
                <FreeAgentColumn
                  availablePlayers={getAvailablePlayersPosition(
                    POSITION.WR,
                    allFreeAgents
                  )}
                />
              </AccordionBody>
            </AccordionItem>
            <AccordionItem style={TRANSPARENT_TABLE_STYLE}>
              <AccordionHeader targetId="4">TE</AccordionHeader>
              <AccordionBody accordionId="4">
                <FreeAgentColumn
                  availablePlayers={getAvailablePlayersPosition(
                    POSITION.TE,
                    allFreeAgents
                  )}
                />
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        )}
      </Row>
    </div>
  );
};

export default FreeAgency;
