// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BASE_CAP_2022 = 281;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BASE_CAP_2023 = 311;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BASE_CAP_2024 = 338;
const BASE_CAP_2025 = 375;
const THREE_YEAR_RATES = [0.25, 0.2375, 0.2256];
const FOUR_YEAR_RATES = [0.2375, 0.2256, 0.2143, 2036];
const FIVE_YEAR_RATES = [0.225, 0.2138, 0.2031, 0.1929, 0.1833];

export const calculateSuperMaxPrice = (
  durationInYears: number,
  currentYear: number
) => {
  switch (durationInYears) {
    case 3:
      return Math.trunc(BASE_CAP_2025 * THREE_YEAR_RATES[currentYear - 1]);
    case 4:
      return Math.trunc(BASE_CAP_2025 * FOUR_YEAR_RATES[currentYear - 1]);
    case 5:
      return Math.trunc(BASE_CAP_2025 * FIVE_YEAR_RATES[currentYear - 1]);
    default:
      return 0;
  }
};
