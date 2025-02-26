export interface Player {
  _id: string;
  keep: boolean;
  keeperClass: number;
  name: string;
  owner: string;
  position: string;
  price: number;
  rank?: number;
  sleeperId: string;
  superMax?: SuperMaxData;
  firstKeepYear?: number;
}

export interface Owner {
  cap: number[];
  _id: string;
  name: string;
  sleeperId: string;
  penaltyFee: number;
  active: boolean;
}

export interface TradeInfo {
  owner1: string;
  owner2: string;
  owner1_rec: TradePackage;
  owner2_rec: TradePackage;
  trade_notes?: string;
  years: string[];
  _id: string;
}

export interface TradePackage {
  players: string[];
  cap: Record<string, number>;
}

export interface SuperMaxData {
  plan: number;
  signingYear: number;
}

export interface FreeAgentStorage {
  availableQBs: Player[];
  availableRBs: Player[];
  availableWRs: Player[];
  availableTEs: Player[];
}

export interface PenaltyFeeInfo {
  name: string;
  penaltyFee: number;
}

export interface FranchiseTagDTO {
  qbFranchisePrice: number;
  keptQBs?: Player[];
  rbFranchisePrice: number;
  keptRBs?: Player[];
  wrFranchisePrice: number;
  keptWRs?: Player[];
  teFranchisePrice: number;
  keptTEs?: Player[];
}

export interface RosterDTO {
  players: string[];
  ownerSleeperId: string;
}

export interface DraftDTO {
  price: number;
  sleeperId: string;
}

export interface UpdateKeeperDTO {
  keep: boolean;
}
