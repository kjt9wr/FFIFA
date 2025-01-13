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
