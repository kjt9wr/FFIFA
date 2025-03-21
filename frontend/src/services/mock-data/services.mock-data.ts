import { Player } from "../../interfaces/interfaces";
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
  loading: false,
  error: null,
  qbList: [],
  rbList: [MOCK_DERRICK_HENRY, MAXED_PLAYER],
  wrList: [],
  teList: [],
  qbPrice: 0,
  rbPrice: 75,
  wrPrice: 0,
  tePrice: 0,
  recalculatePrices: () => {},
};

export const MOCK_FRANCHISE_TAG_DTO = {
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
  { name: "Michael", penaltyFee: 0 },
  { name: "Alex", penaltyFee: 30 },
  { name: "Casey", penaltyFee: 0 },
  { name: "Patrick", penaltyFee: 0 },
  { name: "Brent", penaltyFee: 0 },
  { name: "Jeff", penaltyFee: 0 },
  { name: "Christian", penaltyFee: 0 },
  { name: "Nikos", penaltyFee: 0 },
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

export const MOCK_FREE_AGENTS = [
  MOCK_PATRICK_MAHOMES,
  MOCK_DERRICK_HENRY,
  MOCK_JOSH_JACOBS,
  MOCK_TYREEK_HILL,
  MOCK_JALEN_COKER,
  MOCK_SAM_LAPORTA,
];

export const MOCK_WRS_ORDERED_BY_PRICE = [
  MOCK_DRAKE_LONDON,
  MOCK_AJ_BROWN,
  MOCK_CEEDEE_LAMB,
  MOCK_TYREEK_HILL,
  MOCK_JAMARR_CHASE,
  MOCK_MALIK_NABERS,
  MOCK_JALEN_COKER,
];
