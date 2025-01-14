export interface SleeperRoster {
  co_owners: string[];
  keepers: null;
  league_id: string;
  metadata: {
    record: string;
    streak: string;
  };
  owner_id: string;
  player_map: null;
  players: string[];
  reserve?: string[];
  roster_id: number;
  settings: {
    division: number;
    fpts: number;
    fpts_against: number;
    fpts_against_decimal: number;
    fpts_decimal: number;
    losses: number;
    ppts: number;
    ppts_decimal: number;
    ties: number;
    total_moves: number;
    waiver_budget_used: number;
    waiver_position: number;
    wins: number;
  };
  starters: string[];
  taxi?: string[];
}

export interface SleeperDraftPick {
  draft_id: string;
  draft_slot: number;
  is_keeper: boolean;
  metadata: {
    amount: string;
    first_name: string;
    injury_status: string;
    last_name: string;
    news_updated: string;
    number: string;
    player_id: string;
    position: string;
    slot: string;
    sport: string;
    status: string;
    team: string;
    years_exp: string;
  };
  pick_no: number;
  picked_by: string;
  player_id: string;
  reactions?: null;
  roster_id: number;
  round: number;
}
