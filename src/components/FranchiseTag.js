import React, { useState, useEffect } from "react";
// import PositionTag from './reusable/PositionTag'
import * as FranchiseService from "../Services/FranchiseService";
import * as Constants from "../Utilities/Constants";

const FranchiseTag = () => {
  const [franchiseInfo, setFranchiseInfo] = useState({});

  useEffect(() => {
    const getFranchiseInformation = async () => {
      const franchiseDTO = await FranchiseService.getFranchiseTagDTO();
      setFranchiseInfo(franchiseDTO);
    };

    getFranchiseInformation();
  }, []);

  return (
    <div>
      <h2 className="text-center"> Franchise Tag Prices </h2>
      <div className="d-flex pl-4">
        <FranchiseTagTable
          keptPlayers={franchiseInfo.keptQBs}
          position={Constants.QB}
          tagPrice={franchiseInfo.qbFranchisePrice}
        />
        <FranchiseTagTable
          keptPlayers={franchiseInfo.keptRBs}
          position={Constants.RB}
          tagPrice={franchiseInfo.rbFranchisePrice}
        />
        <FranchiseTagTable
          keptPlayers={franchiseInfo.keptWRs}
          position={Constants.WR}
          tagPrice={franchiseInfo.wrFranchisePrice}
        />
        <FranchiseTagTable
          keptPlayers={franchiseInfo.keptTEs}
          position={Constants.TE}
          tagPrice={franchiseInfo.teFranchisePrice}
        />
      </div>
    </div>
  );
};

const populateKeptPlayers = (keptPlayersList) => {
  if (keptPlayersList) {
    return keptPlayersList.map((player) => (
      <tr key={player._id}>
        <td style={player.keeperClass === 3 ? { fontWeight: "bold" } : {}}>
          {" "}
          {player.name}
        </td>
        <td style={player.keeperClass === 3 ? { fontWeight: "bold" } : {}}>
          {" "}
          {player.price}
        </td>
      </tr>
    ));
  }
};

const FranchiseTagTable = (props) => {
  return (
    <div style={{ flex: "1" }}>
      <h3>
        {" "}
        {props.position} franchise price: {props.tagPrice}{" "}
      </h3>
      <table>
        <thead>
          <tr>
            <th>Kept Player</th>
            <th>Original Price</th>
          </tr>
        </thead>
        <tbody>{populateKeptPlayers(props.keptPlayers)}</tbody>
      </table>
    </div>
  );
};

export default FranchiseTag;
