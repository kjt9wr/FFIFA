const BASE_CAP_2022 = 281
const THREE_YEAR_RATES = [.25, .2375, .2256];
const FOUR_YEAR_RATES = [.2375, .2256, .2143, 2036];
const FIVE_YEAR_RATES = [.2250, .2138, .2031, .1929, .1833];

export const calculateSuperMaxPrice2021 = (durationInYears) => {
    switch(durationInYears) {
        case 3:
            return Math.trunc(BASE_CAP_2022*THREE_YEAR_RATES[1]);
        case 4:
            return Math.trunc(BASE_CAP_2022*FOUR_YEAR_RATES[1]);
        case 5:
            return Math.trunc(BASE_CAP_2022*FIVE_YEAR_RATES[1]);
        default:
            return 0;
    }
}
