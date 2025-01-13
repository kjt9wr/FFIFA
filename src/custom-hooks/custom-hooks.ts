import { useEffect, useState } from "react";
import * as FranchiseService from "../services/franchise.service";

export const useFranchiseInfo = () => {
  const [franchiseInfo, setFranchiseInfo] = useState({});

  useEffect(() => {
    const getFranchiseInformation = async () => {
      const franchiseDTO = await FranchiseService.getFranchiseTagDTO();
      setFranchiseInfo(franchiseDTO);
    };

    getFranchiseInformation();
  }, []);

  return franchiseInfo;
};
