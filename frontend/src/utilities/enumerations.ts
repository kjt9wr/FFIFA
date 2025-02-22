export enum KEEPER_CLASS_ENUM {
  KEEP = 1,
  FRANCHISE_TAG = 2,
  SUPERMAX = 3,
  ARBITRATION = 4,
}

export enum POSITION {
  QB = "QB",
  RB = "RB",
  WR = "WR",
  TE = "TE",
}

export const getKeeperClassText = (keeperClassEnum: number) => {
  switch (keeperClassEnum) {
    case 2:
      return "Franchise Tag";
    case 3:
      return "Supermax";
    case 4:
      return "Arbitration";
    default:
      return "Keep";
  }
};

export const ALERT_STATE = {
  NONE: "none",
  SUCCESS: "sucess",
  ERROR: "error",
};

export enum OWNER_ID_ENUM {
  KEVIN = "5e80d724b3bdaf3413316177",
  JUSTIN = "5e80d930b3bdaf3413316189",
  ALEX = "5e80dd6ab3bdaf34133161bd",
  LUIGI = "5e80da66b3bdaf341331619b",
  CHRISTIAN = "5e80e173b3bdaf3413316213",
  MATT = "5e80df96b3bdaf34133161ef",
  BRENT = "5e80db62b3bdaf34133161ab",
  MICHAEL = "5e80de37b3bdaf34133161cf",
  NIKOS = "5e80dedcb3bdaf34133161dd",
  CHINMAY = "5e80e07eb3bdaf3413316200",
  PATRICK = "5e80e1dab3bdaf3413316225",
  JEFF = "5e80e1deb3bdaf3413316226",
  CASEY = "66fb53a23cb8429bd448fd61",
}
