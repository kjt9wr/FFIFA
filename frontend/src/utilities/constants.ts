//configurable variable for the upcoming season
const UPCOMING_SEASON_YEAR = "2025";

export const SLEEPER_LEAGUE_ID = "1000436768526741504";
export const SLEEPER_LEAGUE_ID_2024 = "1124841056500727808";

export const DRAFT_ID = "1000436769222967296";
export const DRAFT_ID_2024 = "1124841056500727809";

export const RECORDED_YEARS = ["2020", "2021", "2022", "2023", "2024", "2025"];

export const BASE_CAP: Record<string, number> = {
  "2022": 281,
  "2023": 311,
  "2024": 338,
  "2025": 375,
};

export const getUpcomingSeasonYear = () => UPCOMING_SEASON_YEAR;

export const getUpcomingYearIndex = () => {
  return Number(UPCOMING_SEASON_YEAR) - 2020;
};

export const TABLE_STYLE = {
  color: "#f8f8f2",
  backgroundColor: "#6d728b",
};

export const TRANSPARENT_TABLE_STYLE = {
  backgroundColor: "#45495e",
  color: "#f8f8f2",
};
