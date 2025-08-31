import { useState } from "react";
import { CSVLink } from "react-csv";
import { Button } from "reactstrap";
import { fetchRosteredPlayers } from "../../api/api.service";
import { useFetch } from "../../custom-hooks/custom-hooks";
import { CsvDto, Player } from "../../interfaces/interfaces";
import { pickSuperMaxOrKeeperPrice } from "../../services/ffifa.service";
import {
  getKeeperClassText,
  KEEPER_CLASS_ENUM,
} from "../../utilities/enumerations";
import { OwnerNameBySleeperId } from "../../utilities/sleeper-ids";

interface GeneratePriceSheetProps {
  rosterAlertCallback: (alertType: string) => void;
}

const CSV_HEADERS = [
  { label: "Owner", key: "owner" },
  { label: "Player", key: "player" },
  { label: "Price", key: "price" },
  { label: "Position", key: "position" },
  { label: "Notes", key: "notes" },
];

const GeneratePriceSheet = (props: GeneratePriceSheetProps) => {
  const {
    data: allRosteredPlayers,
    loading,
    error,
  } = useFetch(() => fetchRosteredPlayers());

  const [csvDto, setCsvDTO] = useState<CsvDto[]>([]);

  const onGeneratePriceSheet = async () => {
    const rosterPricesDTO: CsvDto[] = allRosteredPlayers
      .map((player: Player) => {
        return {
          owner: OwnerNameBySleeperId[player.owner],
          player: player.name,
          price: pickSuperMaxOrKeeperPrice(player),
          position: player.position,
          notes: [
            KEEPER_CLASS_ENUM.SUPERMAX,
            KEEPER_CLASS_ENUM.ARBITRATION,
          ].includes(player.keeperClass)
            ? getKeeperClassText(player.keeperClass)
            : "",
        };
      })
      .sort(
        (a: CsvDto, b: CsvDto) =>
          a.owner.localeCompare(b.owner) || a.position.localeCompare(b.position)
      );
    setCsvDTO(rosterPricesDTO);
  };

  return (
    <>
      {!loading && !error && (
        <Button
          color="warning"
          className="admin-btn mb-2"
          title="Generate Price Sheet All Rosters"
          onClick={onGeneratePriceSheet}
        >
          Generate Price Sheet
        </Button>
      )}
      {csvDto.length > 0 && (
        <CSVLink
          data={csvDto}
          headers={CSV_HEADERS}
          filename="ffifa_prices.csv"
        >
          Download CSV
        </CSVLink>
      )}
    </>
  );
};

export default GeneratePriceSheet;
