import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, ButtonGroup, Form, Input, Table } from "reactstrap";
import { FranchiseTagDTO, Player } from "../../interfaces/interfaces";
import { POSITION } from "../../utilities/enumerations";

interface RosterFranchiseTableProps {
  roster: Player[];
  franchisePrices: FranchiseTagDTO;
  editFranchiseMode?: boolean;
  onSubmitFranchise: (playerId: string | null) => void;
  onClear: () => void;
  onCancel: () => void;
}
const renderFranchisePrice = (
  position: string,
  franchisePrices: FranchiseTagDTO
) => {
  switch (position) {
    case POSITION.TE:
      return <span>{franchisePrices.teFranchisePrice}</span>;
    case POSITION.RB:
      return <span>{franchisePrices.rbFranchisePrice}</span>;
    case POSITION.WR:
      return <span>{franchisePrices.wrFranchisePrice}</span>;
    default:
      return <span>{franchisePrices.qbFranchisePrice}</span>;
  }
};

/*
 * This component displays the table used for applying franchise tags to a roster
 */
const RosterFranchiseTable = (props: RosterFranchiseTableProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(
    props.roster.find((player) => player.keeperClass === 2)?.sleeperId || null
  );
  const { handleSubmit } = useForm({});

  return (
    <Form
      onSubmit={handleSubmit(() => props.onSubmitFranchise(selectedPlayer))}
    >
      <Table responsive size="md" hover borderless>
        <thead className="thead-light">
          <tr>
            <th>Position</th>
            <th>Player</th>
            <th>Keeper Price</th>
            <th>Franchise Price</th>
            <th>Apply Tag</th>
          </tr>
        </thead>
        <tbody>
          {props.roster.map((currentPlayer, index) => {
            const { name, position, price, sleeperId } = currentPlayer;
            return (
              <tr
                className={index % 2 ? "player-table-even" : "player-table-odd"}
                key={`${sleeperId}-row`}
              >
                <td>{position}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>{renderFranchisePrice(position, props.franchisePrices)}</td>
                <td>
                  <Input
                    type="radio"
                    id={`${sleeperId}-${name}`}
                    onChange={(e) => {
                      setSelectedPlayer(e.target.value);
                    }}
                    name="player"
                    defaultChecked={
                      !selectedPlayer && currentPlayer.keeperClass === 2
                    }
                    value={String(sleeperId)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end mt-3">
        <ButtonGroup className="roster-btn-group">
          <Button
            color="secondary"
            outline
            size="sm"
            className="roster-cancel-btn"
            onClick={() => {
              props.onCancel();
            }}
            type="button"
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            outline
            size="sm"
            className="roster-clear-btn"
            onClick={() => {
              props.onClear();
            }}
            type="button"
          >
            Clear
          </Button>
          <Button
            color="primary"
            size="sm"
            className="apply-franchise-btn"
            type="submit"
          >
            Apply Franchise Tag
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  );
};

export default RosterFranchiseTable;
