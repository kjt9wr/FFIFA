import { FreeAgentStorage, Player } from "../../interfaces/interfaces";
import {
  MAXED_PLAYER,
  MOCK_AJ_BROWN,
  MOCK_BIJAN_ROBINSON,
  MOCK_BROCK_BOWERS,
  MOCK_CEEDEE_LAMB,
  MOCK_DERRICK_HENRY,
  MOCK_DRAKE_LONDON,
  MOCK_JAHMYR_GIBBS,
  MOCK_JALEN_COKER,
  MOCK_JALEN_HURTS,
  MOCK_JAMARR_CHASE,
  MOCK_JAYDEN_DANIELS,
  MOCK_JOSH_JACOBS,
  MOCK_KYLER_MURRAY,
  MOCK_LAMAR_JACKSON,
  MOCK_MALIK_NABERS,
  MOCK_NAJEE_HARRIS,
  MOCK_PATRICK_MAHOMES,
  MOCK_SAM_LAPORTA,
  MOCK_SAQUON_BARKLEY,
  MOCK_TYREEK_HILL,
} from "./player.mock-data";

export const FRANCHISE_TAG_SAMPLE_DATA = {
  qbFranchisePrice: 25,
  keptQBs: [],
  rbFranchisePrice: 75,
  keptRBs: [MOCK_DERRICK_HENRY, MAXED_PLAYER],
  wrFranchisePrice: 50,
  keptWRs: [],
  teFranchisePrice: 30,
  keptTEs: [],
};

export const MOCKED_PENALTY_FEES = [
  { name: "Kevin", penaltyFee: 20 },
  { name: "Justin", penaltyFee: 50 },
  { name: "Matt", penaltyFee: 0 },
  { name: "Luigi", penaltyFee: 0 },
  { name: "Alex", penaltyFee: 30 },
];

export const KEPT_PLAYERS: Player[] = [
  MOCK_JAYDEN_DANIELS,
  MOCK_JALEN_HURTS,
  MOCK_KYLER_MURRAY,
  MOCK_LAMAR_JACKSON,
  MOCK_PATRICK_MAHOMES,
  MOCK_BIJAN_ROBINSON,
  MOCK_SAQUON_BARKLEY,
  MOCK_JAHMYR_GIBBS,
  MOCK_JOSH_JACOBS,
  MOCK_DERRICK_HENRY,
  MOCK_NAJEE_HARRIS,
  MOCK_BROCK_BOWERS,
  MOCK_SAM_LAPORTA,
  MOCK_AJ_BROWN,
  MOCK_DRAKE_LONDON,
  MOCK_CEEDEE_LAMB,
  MOCK_TYREEK_HILL,
  MOCK_JAMARR_CHASE,
  MOCK_MALIK_NABERS,
  MOCK_JALEN_COKER,
];

export const MOCK_FREE_AGENTS: FreeAgentStorage = {
  availableQBs: [MOCK_PATRICK_MAHOMES],
  availableRBs: [MOCK_DERRICK_HENRY, MOCK_JOSH_JACOBS],
  availableWRs: [MOCK_TYREEK_HILL, MOCK_JALEN_COKER],
  availableTEs: [MOCK_SAM_LAPORTA],
};
