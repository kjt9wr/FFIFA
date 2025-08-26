import { POSITION } from "./enumerations";

//configurable variable for the upcoming season
const UPCOMING_SEASON_YEAR = "2026";

export const RECORDED_YEARS = ["2020", "2021", "2022", "2023", "2024", "2025"];

export const BASE_CAP: Record<string, number> = {
  "2022": 281,
  "2023": 311,
  "2024": 338,
  "2025": 375,
  "2026": 416,
};

export const CURRENT_SLEEPER_LEAGUE_ID: Record<number, string> = {
  2023: "1000436768526741504",
  2024: "1124841056500727808",
  2025: "1257029927102849024",
};

const SLEEPER_DRAFT_ID: Record<number, string> = {
  2023: "1000436769222967296",
  2024: "1124841056500727809",
  2025: "1257029927123832832",
};

const getCurrentYear = () => {
  return Number(UPCOMING_SEASON_YEAR) - 1;
};

export const getUpcomingSeasonYear = () => UPCOMING_SEASON_YEAR;

export const getUpcomingYearIndex = () => {
  return Number(UPCOMING_SEASON_YEAR) - 2020;
};

export const getCurrentSleeperLeagueId = () => {
  const currentYear = getCurrentYear();
  return CURRENT_SLEEPER_LEAGUE_ID[currentYear];
};

export const getMostRecentDraftId = () => {
  const currentYear = getCurrentYear();
  return SLEEPER_DRAFT_ID[currentYear];
};

export const POSITIONS = [POSITION.QB, POSITION.RB, POSITION.WR, POSITION.TE];

export const BASE_URL_LOCALHOST = "http://localhost:5000/";
