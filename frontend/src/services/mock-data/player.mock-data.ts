import { Player } from "../../interfaces/interfaces";

export const MAXED_PLAYER: Player = {
  _id: "abc",
  keep: true,
  keeperClass: 3,
  name: "Najee Harris",
  owner: "",
  position: "RB",
  superMax: {
    plan: 5,
    signingYear: 2023,
  },
  price: 10,
  sleeperId: "abc",
};

export const ARBITRATED_TE: Player = {
  _id: "kittle",
  keep: true,
  keeperClass: 4,
  name: "George Kittle",
  owner: "",
  position: "TE",
  price: 50,
  sleeperId: "kittle",
};

// Kept Players

const KEPT_PLAYER = {
  keep: true,
  keeperClass: 1,
  owner: "",
};

export const MOCK_JAYDEN_DANIELS: Player = {
  ...KEPT_PLAYER,
  _id: "jayden_daniels",
  keeperClass: 2,
  name: "Jayden Daniels",
  position: "QB",
  price: 67,
  sleeperId: "jayden_daniels",
};

export const MOCK_LAMAR_JACKSON: Player = {
  ...KEPT_PLAYER,
  _id: "lamar_jackson",
  name: "Lamar Jackson",
  position: "QB",
  price: 37,
  sleeperId: "lamar_jackson",
};

export const MOCK_KYLER_MURRAY: Player = {
  ...KEPT_PLAYER,
  _id: "kyler_murray",
  name: "Kyler Murray",
  position: "QB",
  price: 37,
  sleeperId: "kyler_murray",
};

export const MOCK_PATRICK_MAHOMES: Player = {
  ...KEPT_PLAYER,
  _id: "patrick_mahomes",
  name: "Patrick Mahomes",
  position: "QB",
  price: 37,
  rank: 10,
  sleeperId: "patrick_mahomes",
};

export const MOCK_JALEN_HURTS: Player = {
  ...KEPT_PLAYER,
  _id: "jalen_hurts",
  name: "Jalen Hurts",
  position: "QB",
  price: 37,
  sleeperId: "jalen_hurts",
};

export const MOCK_BIJAN_ROBINSON: Player = {
  ...KEPT_PLAYER,
  _id: "bijan_robison",
  keeperClass: 2,
  name: "Bijan Robinson",
  position: "RB",
  price: 121,
  sleeperId: "bijan_robison",
};

export const MOCK_SAQUON_BARKLEY: Player = {
  ...KEPT_PLAYER,
  _id: "saquon_barkley",
  keeperClass: 2,
  name: "Saquon Barkley",
  position: "RB",
  price: 100,
  sleeperId: "saquon_barkley",
};

export const MOCK_JAHMYR_GIBBS: Player = {
  ...KEPT_PLAYER,
  _id: "jahmyr_gibbs",
  keeperClass: 2,
  name: "Jahmyr Gibbs",
  position: "RB",
  price: 98,
  sleeperId: "jahmyr_gibbs",
};

export const MOCK_JOSH_JACOBS: Player = {
  ...KEPT_PLAYER,
  ...KEPT_PLAYER,
  _id: "josh_jacobs",
  name: "Josh Jacobs",
  position: "RB",
  price: 81,
  rank: 12,
  sleeperId: "josh_jacobs",
};

export const MOCK_DERRICK_HENRY: Player = {
  ...KEPT_PLAYER,
  _id: "derrick_henry",
  name: "Derrick Henry",
  position: "RB",
  price: 79,
  firstKeepYear: 2023,
  rank: 6,
  sleeperId: "derrick_henry",
};

export const MOCK_NAJEE_HARRIS: Player = {
  ...KEPT_PLAYER,
  _id: "najee_harris",
  keeperClass: 3,
  name: "Najee Harris",
  sleeperId: "najee_harris",
  position: "RB",
  owner: "Patrick",
  superMax: {
    plan: 5,
    signingYear: 2022,
  },
  price: 130,
};

export const MOCK_BROCK_BOWERS: Player = {
  ...KEPT_PLAYER,
  _id: "brock_bowers",
  keeperClass: 2,
  name: "Brock Bowers",
  position: "TE",
  price: 37,
  sleeperId: "brock_bowers",
};

export const MOCK_SAM_LAPORTA: Player = {
  ...KEPT_PLAYER,
  _id: "sam_laporta",
  name: "Sam Laporta",
  position: "TE",
  price: 12,
  rank: 4,
  sleeperId: "sam_laporta",
};

export const MOCK_DRAKE_LONDON: Player = {
  ...KEPT_PLAYER,
  _id: "drake_london",
  name: "Drake London",
  position: "WR",
  price: 64,
  keeperClass: 2,
  sleeperId: "drake_london",
};

export const MOCK_AJ_BROWN: Player = {
  ...KEPT_PLAYER,
  _id: "aj_brown",
  name: "AJ Brown",
  position: "WR",
  price: 61,
  keeperClass: 2,
  sleeperId: "aj_brown",
};

export const MOCK_CEEDEE_LAMB: Player = {
  ...KEPT_PLAYER,
  _id: "ceedee_lamb",
  name: "CeeDee Lamb",
  position: "WR",
  price: 56,
  sleeperId: "ceedee_lamb",
};

export const MOCK_TYREEK_HILL: Player = {
  ...KEPT_PLAYER,
  _id: "tyreek_hill",
  name: "Tyreek Hill",
  position: "WR",
  price: 56,
  rank: 10,
  sleeperId: "tyreek_hill",
};

export const MOCK_JAMARR_CHASE: Player = {
  ...KEPT_PLAYER,
  _id: "jamarr_chase",
  name: "Jamarr Chase",
  position: "WR",
  price: 52,
  firstKeepYear: 2022,
  sleeperId: "jamarr_chase",
};

export const MOCK_MALIK_NABERS: Player = {
  ...KEPT_PLAYER,
  _id: "malik_nabers",
  name: "Malik Nabers",
  position: "WR",
  price: 51,
  sleeperId: "malik_nabers",
};

export const MOCK_JALEN_COKER: Player = {
  ...KEPT_PLAYER,
  _id: "jalen_coker",
  name: "Jalen Coker",
  position: "WR",
  price: 10,
  rank: 30,
  sleeperId: "jalen_coker",
};

export const MOCK_CHRIS_OLAVE: Player = {
  _id: "chris_olave",
  keep: false,
  keeperClass: 1,
  name: "Chris Olave",
  owner: "",
  position: "WR",
  price: 62,
  sleeperId: "chris_olave",
};

export const MOCKED_ROSTER = [
  MOCK_AJ_BROWN,
  MOCK_CEEDEE_LAMB,
  MOCK_JALEN_HURTS,
  MOCK_CHRIS_OLAVE,
];

export const MOCKED_ROSTER_WITH_SUPERMAX = [
  ...MOCKED_ROSTER,
  MOCK_NAJEE_HARRIS,
];
