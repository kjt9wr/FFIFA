import { Owner, TradeInfo } from "../../interfaces/interfaces";

export const OWNERS_FROM_DB: Owner[] = [
  {
    cap: [160, 271, 296, 319, 338, 375],
    _id: "5e80e1deb3bdaf3413316226",
    name: "Jeff",
    sleeperId: "4",
    penaltyFee: 5,
    active: true,
  },
  {
    cap: [225, 206, 256, 292, 318, 375],
    _id: "5e80e173b3bdaf3413316213",
    name: "Christian",
    sleeperId: "6",
    penaltyFee: 0,
    active: true,
  },
  {
    cap: [252, 275, 276, 307, 325, 375],
    _id: "5e80d724b3bdaf3413316177",
    name: "Kevin",
    sleeperId: "3",
    penaltyFee: 34,
    active: true,
  },
  {
    cap: [240, 250, 284, 328, 348, 375],
    _id: "5e80dedcb3bdaf34133161dd",
    name: "Nikos",
    sleeperId: "7",
    penaltyFee: 22,
    active: true,
  },
  {
    cap: [237, 286, 281, 311, 348, 375],
    _id: "5e80d930b3bdaf3413316189",
    name: "Justin",
    sleeperId: "9",
    penaltyFee: 21,
    active: true,
  },
  {
    cap: [225, 254, 281, 291, 338, 375],
    _id: "5e80db62b3bdaf34133161ab",
    name: "Brent",
    sleeperId: "12",
    penaltyFee: 0,
    active: true,
  },
  {
    cap: [256, 250, 278, 354, 341, 375],
    _id: "5e80da66b3bdaf341331619b",
    name: "Luigi",
    sleeperId: "5",
    penaltyFee: 64,
    active: true,
  },
  {
    cap: [248, 248, 281, 294, 362, 375],
    _id: "5e80dd6ab3bdaf34133161bd",
    name: "Alex",
    sleeperId: "1",
    penaltyFee: 47,
    active: true,
  },
  {
    cap: [225, 268, 308, 330, 338, 375],
    _id: "5e80df96b3bdaf34133161ef",
    name: "Matt",
    sleeperId: "8",
    penaltyFee: 0,
    active: true,
  },
  {
    cap: [184, 242, 287, 333, 338, 375],
    _id: "5e80e1dab3bdaf3413316225",
    name: "Patrick",
    sleeperId: "10",
    penaltyFee: 67,
    active: true,
  },
  {
    cap: [216, 248, 285, 311, 0, 0],
    _id: "5e80e07eb3bdaf3413316200",
    name: "Chinmay",
    sleeperId: "11",
    penaltyFee: 0,
    active: false,
  },
  {
    cap: [213, 250, 259, 267, 338, 375],
    _id: "5e80de37b3bdaf34133161cf",
    name: "Michael",
    sleeperId: "2",
    penaltyFee: 25,
    active: true,
  },
  {
    cap: [0, 0, 0, 0, 324, 375],
    _id: "66fb53a23cb8429bd448fd61",
    name: "Casey",
    active: true,
    penaltyFee: 0,
    sleeperId: "11",
  },
];

export const TRADES_FROM_DB: TradeInfo[] = [
  {
    years: ["2023"],
    _id: "64e6584f12b4e139ab9a814c",
    owner1: "Luigi",
    owner2: "Jeff",
    owner1_rec: {
      players: ["5f401ca260fd9fed1d71bba6"],
      cap: {},
    },
    owner2_rec: {
      players: ["613ffff135ba63172cf2278e"],
      cap: {},
    },
  },
  {
    years: ["2023", "2024"],
    _id: "64ebc5b88d207d4dfdafc003",
    owner1: "Justin",
    owner2: "Alex",
    owner1_rec: {
      players: [],
      cap: {
        "2023": 7,
      },
    },
    owner2_rec: {
      players: [],
      cap: {
        "2024": 10,
      },
    },
  },
  {
    years: ["2023", "2024"],
    _id: "64e4f0f012b4e139ab9a8149",
    owner1: "Kevin",
    owner2: "Luigi",
    owner1_rec: {
      players: ["5ffa6bf7642d6c1069a3ae62"],
      cap: {},
    },
    owner2_rec: {
      players: [],
      cap: {
        "2023": 13,
        "2024": 3,
      },
    },
  },
];
