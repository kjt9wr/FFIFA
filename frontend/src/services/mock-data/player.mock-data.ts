import { Player } from "../../interfaces/interfaces";
import { START_YEAR } from "./services.mock-data";

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

// Kept Players

const KEPT_PLAYER = {
  keep: true,
  keeperClass: 1,
  owner: "",
  sleeperId: "",
};

export const MOCK_JAYDEN_DANIELS: Player = {
  ...KEPT_PLAYER,
  _id: "jayden_daniels",
  keeperClass: 2,
  name: "Jayden Daniels",
  position: "QB",
  price: 67,
};

export const MOCK_LAMAR_JACKSON: Player = {
  ...KEPT_PLAYER,
  _id: "lamar_jackson",
  name: "Lamar Jackson",
  position: "QB",
  price: 37,
};

export const MOCK_KYLER_MURRAY: Player = {
  ...KEPT_PLAYER,
  _id: "kyler_murray",
  name: "Kyler Murray",
  position: "QB",
  price: 37,
};

export const MOCK_PATRICK_MAHOMES: Player = {
  ...KEPT_PLAYER,
  _id: "patrick_mahomes",
  name: "Patrick Mahomes",
  position: "QB",
  price: 37,
};

export const MOCK_JALEN_HURTS: Player = {
  ...KEPT_PLAYER,
  _id: "jalen_hurts",
  name: "Jalen Hurts",
  position: "QB",
  price: 37,
};

export const MOCK_BIJAN_ROBINSON: Player = {
  ...KEPT_PLAYER,
  _id: "bijan_robison",
  keeperClass: 2,
  name: "Bijan Robinson",
  position: "RB",
  price: 121,
};

export const MOCK_SAQUON_BARKLEY: Player = {
  ...KEPT_PLAYER,
  _id: "saquon_barkley",
  keeperClass: 2,
  name: "Saquon Barkley",
  position: "RB",
  price: 100,
};

export const MOCK_JAHMYR_GIBBS: Player = {
  ...KEPT_PLAYER,
  _id: "jahmyr_gibbs",
  keeperClass: 2,
  name: "Jahmyr Gibbs",
  position: "RB",
  price: 98,
};

export const MOCK_JOSH_JACOBS: Player = {
  ...KEPT_PLAYER,
  ...KEPT_PLAYER,
  _id: "josh_jacobs",
  name: "Josh Jacobs",
  position: "RB",
  price: 81,
};

export const MOCK_DERRICK_HENRY: Player = {
  ...KEPT_PLAYER,
  _id: "derrick_henry",
  name: "Derrick Henry",
  position: "RB",
  price: 79,
};

export const MOCK_NAJEE_HARRIS: Player = {
  ...KEPT_PLAYER,
  _id: "najee_harris",
  keeperClass: 3,
  name: "Najee Harris",
  position: "RB",
  price: 130,
};

export const MOCK_BROCK_BOWERS: Player = {
  ...KEPT_PLAYER,
  _id: "brock_bowers",
  keeperClass: 2,
  name: "Brock Bowers",
  position: "TE",
  price: 37,
};

export const MOCK_SAM_LAPORTA: Player = {
  ...KEPT_PLAYER,
  _id: "sam_laporta",
  name: "Sam Laporta",
  position: "TE",
  price: 12,
};

export const MOCK_DRAKE_LONDON: Player = {
  ...KEPT_PLAYER,
  _id: "drake_london",
  name: "Drake London",
  position: "WR",
  price: 64,
  keeperClass: 2,
};

export const MOCK_AJ_BROWN: Player = {
  ...KEPT_PLAYER,
  _id: "aj_brown",
  name: "AJ Brown",
  position: "WR",
  price: 61,
  keeperClass: 2,
};

export const MOCK_CEEDEE_LAMB: Player = {
  ...KEPT_PLAYER,
  _id: "ceedee_lamb",
  name: "CeeDee Lamb",
  position: "WR",
  price: 56,
};

export const MOCK_TYREEK_HILL: Player = {
  ...KEPT_PLAYER,
  _id: "tyreek_hill",
  name: "Tyreek Hill",
  position: "WR",
  price: 56,
};

export const MOCK_JAMARR_CHASE: Player = {
  ...KEPT_PLAYER,
  _id: "jamarr_chase",
  name: "Jamarr Chase",
  position: "WR",
  price: 52,
};

export const MOCK_MALIK_NABERS: Player = {
  ...KEPT_PLAYER,
  _id: "malik_nabers",
  name: "Malik Nabers",
  position: "WR",
  price: 51,
};

export const MOCK_JALEN_COKER: Player = {
  ...KEPT_PLAYER,
  _id: "jalen_coker",
  name: "Jalen Coker",
  position: "WR",
  price: 10,
};
