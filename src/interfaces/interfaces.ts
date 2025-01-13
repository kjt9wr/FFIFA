export interface Player {
  _id: string;
  arbYear?: string;
  keep: boolean;
  keeperClass: number;
  name: string;
  owner: string;
  position: string;
  price: number;
  rank?: number;
  sleeperId: string;
  superMax?: SuperMaxData;
}

export interface Owner {
  cap: number[];
  _id: string;
  name: string;
  sleeperId: string;
  penaltyFee: number;
  active: boolean;
}

export interface SuperMaxData {
  plan: number;
  year: number;
}

export interface FreeAgentStorage {
  availableQBs: Player[];
  availableRBs: Player[];
  availableWRs: Player[];
  availableTEs: Player[];
}
export interface FranchiseInfo {
  qbFranchisePrice: number;
  keptQBs: any;
  rbFranchisePrice: number;
  keptRBs: any;
  wrFranchisePrice: number;
  keptWRs: any;
  teFranchisePrice: number;
  keptTEs: any;
}

export interface PenaltyFeeInfo {
  name: string;
  penaltyFee: number;
}

export interface FranchiseTagDTO {
  qbFranchisePrice: number;
  keptQBs: Player[];
  rbFranchisePrice: number;
  keptRBs: Player[];
  wrFranchisePrice: number;
  keptWRs: Player[];
  teFranchisePrice: number;
  keptTEs: Player[];
}

export interface FranchisePrices {
  qb: number;
  rb: number;
  wr: number;
  te: number;
}
