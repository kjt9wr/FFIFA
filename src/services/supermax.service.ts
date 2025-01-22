import { BASE_CAP, UPCOMING_SEASON_YEAR } from "../utilities/constants";

const THREE_YEAR_RATES = [0.25, 0.2375, 0.2256];
const FOUR_YEAR_RATES = [0.2375, 0.2256, 0.2143, 2036];
const FIVE_YEAR_RATES = [0.225, 0.2138, 0.2031, 0.1929, 0.1833];

export const calculateSuperMaxPrice = (
  durationInYears: number,
  currentYear: number
) => {
  switch (durationInYears) {
    case 3:
      return Math.trunc(
        BASE_CAP[UPCOMING_SEASON_YEAR] * THREE_YEAR_RATES[currentYear - 1]
      );
    case 4:
      return Math.trunc(
        BASE_CAP[UPCOMING_SEASON_YEAR] * FOUR_YEAR_RATES[currentYear - 1]
      );
    case 5:
      return Math.trunc(
        BASE_CAP[UPCOMING_SEASON_YEAR] * FIVE_YEAR_RATES[currentYear - 1]
      );
    default:
      return 0;
  }
};
