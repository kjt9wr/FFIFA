const BASE_CAP_2021 = 254
const THREE_YEAR_RATES = [.25, .2375, .2256];
const FOUR_YEAR_RATES = [.2375, .2256, .2143, 2036];
const FIVE_YEAR_RATES = [.2250, .2138, .2031, .1929, .1833];

export const calculateSuperMaxPrice2021 = (durationInYears) => {
    switch(durationInYears) {
        case 3:
            return Math.trunc(BASE_CAP_2021*THREE_YEAR_RATES[0]);
        case 4:
            return Math.trunc(BASE_CAP_2021*FOUR_YEAR_RATES[0]);
        case 5:
            return Math.trunc(BASE_CAP_2021*FIVE_YEAR_RATES[0]);
        default:
            return 0;
    }
}
