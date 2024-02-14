export const KEEPER_CLASS_ENUM = {
  KEEP: 1,
  FRANCHISE_TAG: 2,
  SUPERMAX: 3,
  ARBITRATION: 4,
};

export const getKeeperClass = (keeperClassEnum) => {
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
