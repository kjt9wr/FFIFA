export interface Player {
  _id: string;
  arbYear?: string;
  keep: boolean;
  keeperClass: number;
  name: string;
  owner?: string;
  position: string;
  price: number;
  rank?: number;
  sleeperId: string;
  superMax?: number;
}

export interface FreeAgentStorage {
  availableQBs: Player[];
  availableRBs: Player[];
  availableWRs: Player[];
  availableTEs: Player[];
}
