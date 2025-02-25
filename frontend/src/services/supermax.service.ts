import { BASE_CAP, getUpcomingSeasonYear } from "../utilities/constants";

const THREE_YEAR_RATES = [0.25, 0.2375, 0.2256];
const FOUR_YEAR_RATES = [0.2375, 0.2256, 0.2143, 2036];
const FIVE_YEAR_RATES = [0.225, 0.2138, 0.2031, 0.1929, 0.1833];
const upcomingYear = getUpcomingSeasonYear();
export const getCurrentSuperMaxYear = (signingYear: number) => {
  return Number(upcomingYear) - signingYear;
};

export const calculateSuperMaxPrice = (
  durationInYears: number,
  signingYear: number
) => {
  const currentYear = getCurrentSuperMaxYear(signingYear);

  switch (durationInYears) {
    case 3:
      return Math.trunc(
        BASE_CAP[upcomingYear] * THREE_YEAR_RATES[currentYear - 1]
      );
    case 4:
      return Math.trunc(
        BASE_CAP[upcomingYear] * FOUR_YEAR_RATES[currentYear - 1]
      );
    case 5:
      return Math.trunc(
        BASE_CAP[upcomingYear] * FIVE_YEAR_RATES[currentYear - 1]
      );
    default:
      return 0;
  }
};
