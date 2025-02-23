import { Player } from "../../interfaces/interfaces";
import { UPCOMING_SEASON_YEAR } from "../../utilities/constants";

export const START_YEAR = Number(UPCOMING_SEASON_YEAR) - 2;

export const MAXED_PLAYER: Player = {
  _id: "abc",
  keep: true,
  keeperClass: 3,
  name: "Najee Harris",
  owner: "",
  position: "RB",
  superMax: {
    plan: 5,
    signingYear: START_YEAR,
  },
  price: 10,
  sleeperId: "",
};

export const REGULAR_RB: Player = {
  _id: "kyr",
  keep: true,
  keeperClass: 1,
  name: "Kyren Williams",
  owner: "",
  position: "RB",
  price: 16,
  sleeperId: "",
};

export const FRANCHISED_QB: Player = {
  _id: "def",
  keep: true,
  keeperClass: 2,
  name: "Jayden Daniels",
  owner: "",
  position: "QB",
  price: 16,
  sleeperId: "",
};

export const ARBITRATED_TE: Player = {
  _id: "kittle",
  keep: true,
  keeperClass: 4,
  name: "George Kittle",
  owner: "",
  position: "TE",
  price: 50,
  sleeperId: "",
};

export const KEPT_TE: Player = {
  _id: "LAP",
  keep: true,
  keeperClass: 1,
  name: "Sam Laporta",
  owner: "",
  position: "TE",
  price: 12,
  sleeperId: "",
};

export const KEPT_WR: Player = {
  _id: "BTJ",
  keep: true,
  keeperClass: 1,
  name: "Brian Thomas",
  owner: "",
  position: "WR",
  price: 40,
  sleeperId: "",
};

export const FRANCHISE_TAG_SAMPLE_DATA = {
  qbFranchisePrice: 25,
  keptQBs: [],
  rbFranchisePrice: 75,
  keptRBs: [REGULAR_RB, MAXED_PLAYER],
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

export const KEPT_PLAYERS = [
  MAXED_PLAYER,
  FRANCHISED_QB,
  ARBITRATED_TE,
  KEPT_TE,
  KEPT_WR,
  REGULAR_RB,
];
