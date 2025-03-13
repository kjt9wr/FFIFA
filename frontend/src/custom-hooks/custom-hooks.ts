import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { fetchAllOwners, fetchKeptPlayers } from "../api/api.service";
import { Owner, Player } from "../interfaces/interfaces";
import {
  calculateFranchisePrice,
  get10MostExpensivePerPosition,
} from "../services/franchise.service";
import { POSITION } from "../utilities/enumerations";
import {
  calculateLuxaryPotPayout,
  calculateTotalInPot,
} from "../services/ffifa.service";

export const useFetch = (
  fetchFunction: () => Promise<AxiosResponse<any, any>>,
  autoFetch = true
) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();
      console.log(result);
      setData(result.data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData([]);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error, refetch: fetchData, reset };
};

export const useFranchisePrices = (autoFetch = true) => {
  const [data, setData] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchKeptPlayers();
      setData(result.data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const qbList = get10MostExpensivePerPosition(data, POSITION.QB);
  const rbList = get10MostExpensivePerPosition(data, POSITION.RB);
  const wrList = get10MostExpensivePerPosition(data, POSITION.WR);
  const teList = get10MostExpensivePerPosition(data, POSITION.TE);
  const qbPrice = calculateFranchisePrice(qbList);
  const rbPrice = calculateFranchisePrice(rbList);
  const wrPrice = calculateFranchisePrice(wrList);
  const tePrice = calculateFranchisePrice(teList);

  return {
    loading,
    error,
    qbList,
    rbList,
    wrList,
    teList,
    qbPrice,
    rbPrice,
    wrPrice,
    tePrice,
    recalculatePrices: fetchData,
  };
};

export const usePenaltyFees = (autoFetch = true) => {
  const [data, setData] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchAllOwners();
      setData(result.data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const penaltyFees = data
    .filter((owner: Owner) => owner.active)
    .map((owner: Owner) => {
      return { name: owner.name, penaltyFee: owner.penaltyFee };
    });
  const totalInPot = calculateTotalInPot(penaltyFees);
  const payoutPerOwner = calculateLuxaryPotPayout(penaltyFees);

  return {
    loading,
    error,
    penaltyFees,
    totalInPot,
    payoutPerOwner,
    recalculatePenaltyFees: fetchData,
  };
};
