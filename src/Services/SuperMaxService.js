// eslint-disable-next-line no-unused-vars
const BASE_CAP_2022 = 281;
const BASE_CAP_2023 = 311;
const THREE_YEAR_RATES = [.25, .2375, .2256];
const FOUR_YEAR_RATES = [.2375, .2256, .2143, 2036];
const FIVE_YEAR_RATES = [.2250, .2138, .2031, .1929, .1833];

export const calculateSuperMaxPrice = (durationInYears, currentYear) => {
    switch(durationInYears) {
        case 3:
            return Math.trunc(BASE_CAP_2023*THREE_YEAR_RATES[currentYear-1]);
        case 4:
            return Math.trunc(BASE_CAP_2023*FOUR_YEAR_RATES[currentYear-1]);
        case 5:
            return Math.trunc(BASE_CAP_2023*FIVE_YEAR_RATES[currentYear-1]);
        default:
            return 0;
    }
}
